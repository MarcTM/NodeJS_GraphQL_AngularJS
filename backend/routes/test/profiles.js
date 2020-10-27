let router = require('express').Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
var Food = mongoose.model('Food');
var Comment = mongoose.model('Comment');
var auth = require('../auth');



// Increase or decrease user karma (test)
router.put('/karma/user/username/:username/:qty', async(req, res, next) => {
  await User.findOne({username: req.params.username}).then(async function(user){
    if (!user) { return res.sendStatus(404); }

    let qty = parseInt(req.params.qty);
    if(!user.karma){
      user.karma = req.params.qty;
    }else{
      user.karma+=qty;
    }

    return await user.save().then(async function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});



module.exports = router;