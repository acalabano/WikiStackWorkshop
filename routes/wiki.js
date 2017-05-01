var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

//retrieve all wiki pages
router.get('/', function(req, res, next) {
  res.redirect('/');
});

//retrieve the "add a page" form
router.get('/add', function(req, res, next) {
  res.render('addpage');
});

//get a specific wiki page
router.get('/:urlTitle', function(req, res, next) {
  return Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage) {
    res.render("wikipage", {title: foundPage.title, content: foundPage.content});
  })
  .catch(next);
});

//submit a new page to the database
router.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
  }).save()
  .then(function(page) {
    res.redirect('/wiki/' + page.urlTitle);
  });
});

module.exports = router;
