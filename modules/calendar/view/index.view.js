'use strict';

//var MonthCollection = require('../collection/month.collection');
var template = require('../template/index.ejs');

module.exports = Marionette.CompositeView.extend({
    template: template,
    //itemViewContainer: "tbody",
});
