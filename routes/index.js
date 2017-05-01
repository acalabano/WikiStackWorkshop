var express = require('express');
var router = express.Router();
var userRouter = require('./user.js');
var wikiRouter = require('./wiki.js');

//retrieve all pages
router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/wiki', wikiRouter);
router.use('user', userRouter);

module.exports = router;
