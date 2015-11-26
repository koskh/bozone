'use strict';

var express = require('express');
var router = express.Router();

//var localize = require('../modules/localization/index');
//var locale = '[ru-RU]'; //TODO: Брать локаль из req
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express MVC '});
});

module.exports = router;
