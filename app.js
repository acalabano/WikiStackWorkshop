var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var env = nunjucks.configure('views', {noCache: true});
var models = require('./models');
var routes = require('./routes');
var path = require('path');

// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);
app.use(morgan('dev'));

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // for AJAX requests

//static file handling middleware
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);

//sync database
models.User.sync()
.then(function () {
  return models.Page.sync()
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
