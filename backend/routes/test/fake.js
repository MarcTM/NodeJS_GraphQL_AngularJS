let router = require('express').Router();
let faker = require('faker');
let mongoose = require('mongoose');
let User = mongoose.model('User');
var Food = mongoose.model('Food');
var Comment = mongoose.model('Comment');
var auth = require('../auth');

faker.locale = 'es';


// Register a random user
router.post('/users', async function(req, res, next){
 
        let username = faker.internet.userName();
        let email = faker.internet.email();

        await User.find({$or: [{ email: email }, { username: username }]})
        .then(async function(user) {
          if (user[0]) {
            return res.status(422).json("The email or username already exists");

          }else{
            let user = await new User();
            user.idsocial = username;
            user.username = username;
            user.email = email;
            user.setPassword("holahola123");
            
            await user.save();
            return res.sendStatus(200);

          }
        });

});


// Register a number of random users
router.post('/users/:qty', async function(req, res, next){
 
    let qty = req.params.qty;
    let username;
    let email;

    for (let i = 0; i < qty; i++) {
        username = faker.internet.userName();
        email = faker.internet.email();

        await User.find({$or: [{ email: email }, { username: username }]})
        .then(async function(user) {
          if (user[0]) {
              i-=1;

          }else{
              try{
                  let user = await new User();
                  user.idsocial = username;
                  user.username = username;
                  user.email = email;
                  user.setPassword("holahola123");
                  
                  await user.save();
                  
              }catch(e){
                next(e);
              }

          }
        });

    }
    return res.sendStatus(200);

});



module.exports = router;