var router = require('express').Router();

router.use('/fake', require('./fake'));
router.use('/foods', require('./foods'));

module.exports = router;