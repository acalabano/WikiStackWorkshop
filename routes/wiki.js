var express = require('express');
var router = express.Router();

//retrieve all wiki pages
router.get('/', function(req, res, next) {
  res.redirect('/');
});

//retrieve the "add a page" form
router.get('/add', function(req, res, next) {
  res.render('addpage');
});

//submit a new page to the database
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.post('/', function(req, res, next) {

  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    // status: req.body.status
  });

  page.save()
  .then(function() {});
  res.json(req.body);
  // res.redirect('/');
});

module.exports = router;
