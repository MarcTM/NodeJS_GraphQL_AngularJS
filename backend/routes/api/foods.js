var router = require('express').Router();
var mongoose = require('mongoose');
var Food = mongoose.model('Food');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');


// Preload food objects on routes with ':food'
router.param('food', function(req, res, next, slug) {
  Food.findOne({ slug: slug})
    .populate('author')
    .then(function (food) {
      if (!food) { return res.sendStatus(404); }

      req.food = food;

      return next();
    }).catch(next);
});


router.param('comment', function(req, res, next, id) {
  Comment.findById(id).then(function(comment){
    if(!comment) { return res.sendStatus(404); }

    req.comment = comment;

    return next();
  }).catch(next);
});



// return all foods
router.get('/', auth.optional, function(req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  if( typeof req.query.tag !== 'undefined' ){
    query.tagList = {"$in" : [req.query.tag]};
  }

  Promise.all([
    req.query.author ? User.findOne({username: req.query.author}) : null,
    req.query.favorited ? User.findOne({username: req.query.favorited}) : null
  ]).then(function(results){
    var author = results[0];
    var favoriter = results[1];

    if(author){
      query.author = author._id;
    }

    if(favoriter){
      query._id = {$in: favoriter.favorites};
    } else if(req.query.favorited){
      query._id = {$in: []};
    }

    return Promise.all([
      Food.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Food.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var foods = results[0];
      var foodsCount = results[1];
      var user = results[2];

      return res.json({
        foods: foods.map(function(food){
          return food.toJSONFor(user);
        }),
        foodsCount: foodsCount
      });
    });
  }).catch(next);
});




// return your feed
router.get('/feed', auth.required, function(req, res, next) {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function(user){
    console.log(user);
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      Food.find({ author: {$in: user.following}})
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('author')
        .exec(),
      Food.count({ author: {$in: user.following}})
    ]).then(function(results){
      var foods = results[0];
      var foodsCount = results[1];

      return res.json({
        foods: foods.map(function(food){
          return food.toJSONFor(user);
        }),
        foodsCount: foodsCount
      });
    }).catch(next);
  });
});






// create a recipe/food
router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var food = new Food(req.body.food);

    food.author = user;

    return food.save().then(function(){
      console.log(food.author);
      return res.json({food: food.toJSONFor(user)});
    });
  }).catch(next);
});




// return a food
router.get('/:food', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.food.populate('author').execPopulate()
  ]).then(function(results){
    var user = results[0];

    return res.json({food: req.food.toJSONFor(user)});
  }).catch(next);
});




// obtain categories
router.get('/food/difficulty', function(req, res, next) {
  Food.find().distinct('difficulty').then(function(difficulty){
    return res.json({difficulty: difficulty});
  }).catch(next);
 });





 // Favorite a recipe
router.post('/:food/favorite', auth.required, function(req, res, next) {
  var foodId = req.food._id;

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.favorite(foodId).then(function(){
      return req.food.updateFavoriteCount().then(function(food){
        return res.json({food: food.toJSONFor(user)});
      });
    });
  }).catch(next);
});




// Unfavorite a recipe
router.delete('/:food/favorite', auth.required, function(req, res, next) {
  var foodId = req.food._id;

  User.findById(req.payload.id).then(function (user){
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(foodId).then(function(){
      return req.food.updateFavoriteCount().then(function(food){
        return res.json({food: food.toJSONFor(user)});
      });
    });
  }).catch(next);
});




// delete recipe/food
router.delete('/:food', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.food.author._id.toString() === req.payload.id.toString()){
      return req.food.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});





// return recipe's comments
router.get('/:food/comments', auth.optional, function(req, res, next){
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
    return req.food.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function(food) {
      return res.json({comments: req.food.comments.map(function(comment){
        return comment.toJSONFor(user);
      })});
    });
  }).catch(next);
});



// create a new recipe's comment
router.post('/:food/comments', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    var comment = new Comment(req.body.comment);
    comment.food = req.food;
    comment.author = user;

    return comment.save().then(function(){
      req.food.comments = req.food.comments.concat(comment);

      return req.food.save().then(function(food) {
        res.json({comment: comment.toJSONFor(user)});
      });
    });
  }).catch(next);
});



// delete recipe's comment
router.delete('/:food/comments/:comment', auth.required, function(req, res, next) {
  if(req.comment.author.toString() === req.payload.id.toString()){
    req.food.comments.remove(req.comment._id);
    req.food.save()
      .then(Comment.find({_id: req.comment._id}).remove().exec())
      .then(function(){
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});


module.exports = router;
