var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');


// Get user
router.get('/user', auth.required, async function(req, res, next){
  await User.findById(req.payload.id).then(async function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});


// Update user
router.put('/user', auth.required, async function(req, res, next){
  await User.findById(req.payload.id).then(async function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.username !== 'undefined'){
      user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.bio !== 'undefined'){
      user.bio = req.body.user.bio;
    }
    if(typeof req.body.user.image !== 'undefined'){
      user.image = req.body.user.image;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    return await user.save().then(async function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});



// Login
router.post('/users/login', async function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json("Email can't be blank");
  }

  if(!req.body.user.password){
    return res.status(422).json("Password can't be blank");
  }

  passport.authenticate('local', {session: false}, async function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json("Email or password is invalid");
    }
  })(req, res, next);
});


// Register
router.post('/users', async function(req, res, next){
  await User.find({$or: [{ email: req.body.user.email }, { username: req.body.user.username }]})
  .then(async function(user) {
    if(user){
        let canRegister=true;
        for(let i=0; i<user.length; i++){
          if(user[i].type==="normal"){
            canRegister=false;
          }
        }

        if(!canRegister){
            return res.status(422).json("The email or username already exists");
        }else{
            var user = await new User();

            user.idsocial = req.body.user.username;
            user.username = req.body.user.username;
            user.email = req.body.user.email;
            user.type = "normal";
            user.setPassword(req.body.user.password);
          
            await user.save().then(async function(){
              return res.json({user: user.toAuthJSON()});
            }).catch(next);
        }
    }else{
        var user = await new User();

        user.idsocial = req.body.user.username;
        user.username = req.body.user.username;
        user.email = req.body.user.email;
        user.type = "normal";
        user.setPassword(req.body.user.password);
      
        await user.save().then(async function(){
          return res.json({user: user.toAuthJSON()});
        }).catch(next);
    }
  });
});


// SOCIALLOGIN
router.post("/users/sociallogin", async function(req, res, next) {
  let memorystore = req.sessionStore;
  let sessions = memorystore.sessions;
  let sessionUser;
  for (var key in sessions) {
    sessionUser = JSON.parse(sessions[key]).passport.user;
  }

  await User.find({ _id: sessionUser }, async function(err, user) {
    user = user[0];

    if (err) return done(err);
    // if the user is found then log them in
    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() }); // user found, return that user
    } else {
      return res.status(422).json(err);
    }
  });
});


// Github
router.get("/auth/github", passport.authenticate("github"));
router.get("/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:4000/#!/auth/sociallogin",
    failureRedirect: "/"
  })
);


// Google
router.get("/auth/googleplus", passport.authenticate("google", {scope: [
  'profile',
  'email']})
);
router.get("/auth/googleplus/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:4000/#!/auth/sociallogin",
    failureRedirect: "/"
  })
);


module.exports = router;
