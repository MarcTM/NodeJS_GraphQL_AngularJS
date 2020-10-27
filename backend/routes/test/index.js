var router = require('express').Router();

router.use('/fake', require('./fake'));
router.use('/foods', require('./foods'));
router.use('/profiles', require('./profiles'));

module.exports = router;