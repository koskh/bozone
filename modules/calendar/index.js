'use strict';

//var  Day = require ('day.model');

var Month = require ('./collection/month.collection');
var month = new Month();

var IndexView = require('./view/index.view');
var indexView = new IndexView({
    collection: month,
    el: '#calendar'
});

indexView.render();

debugger;