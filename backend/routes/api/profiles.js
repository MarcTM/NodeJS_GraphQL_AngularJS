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




// Follow user
router.post('/:username/follow', auth.required, async function(req, res, next){
  var profileId = req.profile._id;

  await User.findById(req.payload.id).then(async function(user){
    if (!user) { return res.sendStatus(401); }

    return await user.follow(profileId).then(async function(){
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
      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  }).catch(next);
});


module.exports = router;
