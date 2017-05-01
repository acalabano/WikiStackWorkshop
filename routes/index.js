var express = require('express');
var router = express.Router();
var userRouter = require('./user.js');
var wikiRouter = require('./wiki.js');
var models = require('../models');
var Page = models.Page;
var User = models.User;


//retrieve all pages
router.get('/', function(req, res, next) {
  return Page.findAll()
  .then(function(allPages) {
    res.render('index', {pages: allPages});
  })
  .catch(next);

});

router.use('/wiki', wikiRouter);
router.use('user', userRouter);

module.exports = router;
