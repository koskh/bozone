var express = require('express');
var router = express.Router();

//var Localize = require('localize');
//
//var myLocalize = new Localize({
//    'Testing...': {
//        'es': 'Pruebas...',
//        'sr': 'тестирање...',
//        'ru-RU': 'Тестирование...'
//    }});

//console.log(myLocalize.translate("Testing...")); // Testing...
//console.log(myLocalize.translate("Testing...")); // Pruebas...
//myLocalize.setLocale("ru-RU");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express MVC '});
});

module.exports = router;
