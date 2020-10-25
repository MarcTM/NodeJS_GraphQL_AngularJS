let router = require('express').Router();
let faker = require('faker');
let mongoose = require('mongoose');
let User = mongoose.model('User');

faker.locale = 'es';


////
// Register a user
////
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