var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('../auth');


// Preload user profile on routes with ':username'
router.param('username', async function(req, res, next, username){
  await User.findOne({username: username}).then(async function(user){
    if (!user) { return res.sendStatus(404); }

    req.profile = user;

    return next();
  }).catch(next);
});


// Get profile by username
router.get('/:username', auth.optional, async function(req, res, next){
  if(req.payload){
    await User.findById(req.payload.id).then(async function(user){
      if(!user){ return res.json({profile: req.profile.toProfileJSONFor(false)}); }

      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  } else {
    return res.json({profile: req.profile.toProfileJSONFor(false)});
  }
});



// Update user's karma when he creates a Product (GraphQL)(Fetch)
router.post('/updatekarma', async function(req, res, next){
  await User.findById(req.body.id).then(
    async (user) => {
      user.karma+=20;
      await user.save();
      return res.status(200);
    }
  )
});


// When a user creates a product, his products count increase by 1 (GraphQL)(Axios)
router.post('/updateproducts', async function(req, res, next){
  await User.findById(req.body.id).then(
    async (user) => {
      user.products+=1;
      await user.save();
      return res.status(200);
    }
  )
});



// Follow user
router.post('/:username/follow', auth.required, async function(req, res, next){
  var profileId = req.profile._id;

  await User.findById(req.payload.id).then(async function(user){
    if (!user) { return res.sendStatus(401); }

    return await user.follow(profileId).then(async function(){
      if(!user.karma){
        user.karma = 30;
      }else{
        user.karma+=30;
      }
      await user.save();

      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  }).catch(next);
});


// Unfollow user
router.delete('/:username/follow', auth.required, async function(req, res, next){
  var profileId = req.profile._id;

  await User.findById(req.payload.id).then(async function(user){
    if (!user) { return res.sendStatus(401); }

    return await user.unfollow(profileId).then(async function(){
      user.karma-=30;
      user.save();
      
      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  }).catch(next);
});


module.exports = router;
