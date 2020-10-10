var router = require('express').Router();
var mongoose = require('mongoose');
var Food = mongoose.model('Food');
var User = mongoose.model('User');
var auth = require('../auth');


// Preload article objects on routes with ':article'
router.param('food', function(req, res, next, slug) {
  Food.findOne({ slug: slug})
    .populate('author')
    .then(function (food) {
      if (!food) { return res.sendStatus(404); }

      req.food = food;

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

// router.get('/feed', auth.required, function(req, res, next) {
//   var limit = 20;
//   var offset = 0;

//   if(typeof req.query.limit !== 'undefined'){
//     limit = req.query.limit;
//   }

//   if(typeof req.query.offset !== 'undefined'){
//     offset = req.query.offset;
//   }

//   User.findById(req.payload.id).then(function(user){
//     if (!user) { return res.sendStatus(401); }

//     Promise.all([
//       Article.find({ author: {$in: user.following}})
//         .limit(Number(limit))
//         .skip(Number(offset))
//         .populate('author')
//         .exec(),
//       Article.count({ author: {$in: user.following}})
//     ]).then(function(results){
//       var articles = results[0];
//       var articlesCount = results[1];

//       return res.json({
//         articles: articles.map(function(article){
//           return article.toJSONFor(user);
//         }),
//         articlesCount: articlesCount
//       });
//     }).catch(next);
//   });
// });



// create a food
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



 // Favorite a food
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



// Unfavorite an article
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





// update article
// router.put('/:article', auth.required, function(req, res, next) {
//   User.findById(req.payload.id).then(function(user){
//     if(req.article.author._id.toString() === req.payload.id.toString()){
//       if(typeof req.body.article.title !== 'undefined'){
//         req.article.title = req.body.article.title;
//       }

//       if(typeof req.body.article.description !== 'undefined'){
//         req.article.description = req.body.article.description;
//       }

//       if(typeof req.body.article.body !== 'undefined'){
//         req.article.body = req.body.article.body;
//       }

//       if(typeof req.body.article.tagList !== 'undefined'){
//         req.article.tagList = req.body.article.tagList
//       }

//       req.article.save().then(function(article){
//         return res.json({article: article.toJSONFor(user)});
//       }).catch(next);
//     } else {
//       return res.sendStatus(403);
//     }
//   });
// });



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


module.exports = router;
