var router = require('express').Router();
var mongoose = require('mongoose');
var Food = mongoose.model('Food');


// return a list of tags
router.get('/', async function(req, res, next) {
  await Food.find().distinct('tagList').then(async function(tags){
    return res.json({tags: tags});
  }).catch(next);
});


module.exports = router;
