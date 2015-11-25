'use strict';


var Month = require ('./collection/month.collection');

var month = new Month();

var IndexView = require('./view/index.view');

var indexView = new IndexView({
    el: '#calendar',
    collection: month
});

indexView.render();
