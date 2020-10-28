var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var GithubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var socialKeys = require('../credentials/credentials.json');


// SOCIALLOGIN
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log(`id: ${id}`);
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
});



passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));




// Github
passport.use(new GithubStrategy({
  clientID: socialKeys.GITHUB_CLIENT_ID,
  clientSecret: socialKeys.GITHUB_CLIENT_SECRET,
  callbackURL: socialKeys.GITHUB_CALLBACK,
  scope: 'user:email',
  passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({idsocial:profile.id.toString()}, function(err, user) {
        if (err)
          return done(err);
        // if the user is found then log them in
        if (user) {
            return done(null, user);
        } else {
          if(!profile.emails[0].value){
            return done("The email is private");
          }else{
            var user = new User({
                idsocial: profile.id,
                username: profile.username,
                email: profile.emails[0].value,
                type: "github",
                image: profile.photos[0].value,
            });
            user.save(function(err) {
                  console.log(err);
                    return done(null, user);
            });
          }
      }
    });
  }
));


// Google
passport.use(new GoogleStrategy({
  clientID: socialKeys.GOOGLEPLUS_CLIENT_ID,
  clientSecret: socialKeys.GOOGLEPLUS_CLIENT_SECRET,
  callbackURL: socialKeys.GOOGLEPLUS_CALLBACK,
  scope: 'user:email',
  passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({idsocial:profile.id.toString()}, function(err, user) {
        if (err)
          return done(err);
        // if the user is found then log them in
        if (user) {
            return done(null, user);
        } else {
          if(!profile.emails[0].value){
            return done("The email is private");
          }else{
            var user = new User({
                idsocial: profile.id,
                username: profile.given_name,
                email: profile.emails[0].value,
                type: "google",
                image: profile.photos[0].value,
            });
            user.save(function(err) {
                  console.log(err);
                    return done(null, user);
            });
          }
      }
    });
  }
));