var router = require('express').Router();
var mongoose = require('mongoose');
var Food = mongoose.model('Food');


// return a list of tags
router.get('/', function(req, res, next) {
  Food.find().distinct('tagList').then(function(tags){
    return res.json({tags: tags});
  }).catch(next);
});


module.exports = router;
