var router = require('express').Router();
var mongoose = require('mongoose');
var Food = mongoose.model('Food');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');


// Preload food objects on routes with ':food'
router.param('food', async function(req, res, next, slug) {
  await Food.findOne({ slug: slug})
    .populate('author')
    .populate('comments')
    .then(async function (food) {
      if (!food) { return res.sendStatus(404); }

      req.food = food;

      return next();
    }).catch(next);
});


router.param('comment', async function(req, res, next, id) {
  await Comment.findById(id).populate('food').then(async function(comment){
    if(!comment) { return res.sendStatus(404); }

    req.comment = comment;

    return next();
  }).catch(next);
});




// return all foods
router.get('/', auth.optional, async function(req, res, next) {
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
    req.query.author ? await User.findOne({username: req.query.author}) : null,
    req.query.favorited ? await User.findOne({username: req.query.favorited}) : null
  ]).then(async function(results){
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
      await Food.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      await Food.count(query).exec(),
      req.payload ? await User.findById(req.payload.id) : null,
    ]).then(async function(results){
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
router.get('/feed', auth.required, async function(req, res, next) {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  await User.findById(req.payload.id).then(async function(user){
    console.log(user);
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      await Food.find({ author: {$in: user.following}})
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('author')
        .exec(),
      await Food.count({ author: {$in: user.following}})
    ]).then(async function(results){
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
router.post('/', auth.required, async function(req, res, next) {
  await User.findById(req.payload.id).then(async function(user){
    if (!user) { return res.sendStatus(401); }

    var food = await new Food(req.body.food);

    food.author = user;

    return await food.save().then(async function(){
      console.log(food.author);
      return res.json({food: food.toJSONFor(user)});
    });
  }).catch(next);
});


// update recipe/food
router.put('/:food', auth.required, async function(req, res, next) {
  await User.findById(req.payload.id).then(async function(user){
    if(req.food.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.food.title !== 'undefined'){
        req.food.title = req.body.food.title;
      }

      if(typeof req.body.food.description !== 'undefined'){
        req.food.description = req.body.food.description;
      }

      if(typeof req.body.food.body !== 'undefined'){
        req.food.body = req.body.food.body;
      }

      if(typeof req.body.food.tagList !== 'undefined'){
        req.food.tagList = req.body.food.tagList
      }

      await req.food.save().then(async function(food){
        return res.json({food: food.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});


// return a food
router.get('/:food', auth.optional, async function(req, res, next) {
  Promise.all([
    req.payload ? await User.findById(req.payload.id) : null,
    req.food.populate('author').execPopulate()
  ]).then(async function(results){
    var user = results[0];

    return res.json({food: req.food.toJSONFor(user)});
  }).catch(next);
});



// obtain categories
router.get('/food/difficulty', async function(req, res, next) {
  await Food.find().distinct('difficulty').then(async function(difficulty){
    return res.json({difficulty: difficulty});
  }).catch(next);
 });



 // Favorite a recipe
router.post('/:food/favorite', auth.required, async function(req, res, next) {
  var foodId = req.food._id;

  await User.findById(req.payload.id).then(async function(user){
    if (!user) { return res.sendStatus(401); }

    return await user.favorite(foodId).then(async function(){
      if(!user.karma){
        user.karma = 30;
      }else{
        user.karma+=20;
      }
      await user.save();

      return await req.food.updateFavoriteCount().then(async function(food){
        return res.json({food: food.toJSONFor(user)});
      });
    });
  }).catch(next);
});


// Unfavorite a recipe
router.delete('/:food/favorite', auth.required, async function(req, res, next) {
  var foodId = req.food._id;

  await User.findById(req.payload.id).then(async function (user){
    if (!user) { return res.sendStatus(401); }

    return await user.unfavorite(foodId).then(async function(){
      user.karma-=20;
      await user.save();

      return await req.food.updateFavoriteCount().then(async function(food){
        return res.json({food: food.toJSONFor(user)});
      });
    });
  }).catch(next);
});




// delete recipe/food
router.delete('/:food', auth.required, async function(req, res, next) {
  await User.findById(req.payload.id).then(async function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.food.author._id.toString() === req.payload.id.toString()){
      let comments = req.food.comments;

        // Delete recipe comments
        for(let i=0; i<comments.length; i++){
          await Comment.find({_id: comments[i]._id}).remove().exec();
        }

        // Delete recipe finally
        return await req.food.remove().then(function(){
          return res.sendStatus(204);
        });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});



// return recipe's comments
router.get('/:food/comments', auth.optional, function(req, res, next){
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null)
  .then(function(user){
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
router.post('/:food/comments', auth.required, async function(req, res, next) {
  await User.findById(req.payload.id).then(async function(user){
    if(!user){ return res.sendStatus(401); }

    var comment = await new Comment(req.body.comment);
    comment.food = req.food;
    comment.author = user;

    return await comment.save().then(async function(){
      req.food.comments = req.food.comments.concat(comment);

      return await req.food.save().then(async function() {
        if(!user.karma){
          user.karma = 30;
        }else{
          user.karma+=30;
        }
        await user.save();
        res.json({comment: comment.toJSONFor(user)});
      });
    });
  }).catch(next);
});


// delete recipe's comment if you are the author of the comment, or if you are the author of the food
router.delete('/:food/comments/:comment', auth.required, async function(req, res, next) {
  if(req.comment.author.toString() === req.payload.id.toString() || req.comment.food.author.toString() === req.payload.id.toString()){
    await req.food.comments.remove(req.comment._id);
    await req.food.save()
      .then(await Comment.find({_id: req.comment._id}).remove().exec())
      .then(async function(){
        if(req.comment.author.toString() === req.payload.id.toString()){
          await User.findById(req.payload.id).then(async function(user){
            if(!user){ return res.sendStatus(401); }

            user.karma-=30;
            await user.save();
          }).catch(next);
        }
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});


module.exports = router;
