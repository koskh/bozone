'use strict';

var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware');
var sass = require('node-sass-middleware');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sass({
  src: path.join(__dirname, ''),
  dest: path.join(__dirname, 'public'),
  //outputStyle: 'compressed',
  sourceMap: true
  //debug: true
}));

app.use('/js/bundle.js', browserify(['underscore', 'underscore.string', 'jquery', 'backbone', 'backbone.marionette', {'./src/localization/index.js': {expose: 'localize'}}]));
//app.use('/js/localization.js', browserify( [{'./modules/localization/index.js': {expose: 'localize'}}]));
app.use('/js/src/', browserify( __dirname + '/src/', {external: ['underscore'],  transform: ['jstify', 'babelify']}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
