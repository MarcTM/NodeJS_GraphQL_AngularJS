let router = require('express').Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
var Food = mongoose.model('Food');
var Comment = mongoose.model('Comment');
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



// Delete recipe and comments
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



module.exports = router;