'use strict';

//var MonthCollection = require('../collection/month.collection');

var DayView = require('./day.view');
var template = require('../template/index.ejs');

module.exports = Marionette.CompositeView.extend({
    template: template,

    childView: DayView,

    itemViewContainer: "tbody",

    attachHtml: function(collectionView, childView, index) {
        debugger;
    }
});
