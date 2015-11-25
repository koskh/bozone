'use strict';

var languageResourse = require ('../localization/index');
var locale = window.locale || '[ru-RU]';

//var MonthCollection = require('../collection/month.collection');

var DayView = require('./day.view');
var template = require('../template/index.ejs');

module.exports = Marionette.CompositeView.extend({
    template: template,

    childView: DayView,

    childViewContainer: ".calendar__body",

    templateHelpers : function() {
        return {
            month: languageResourse[locale].months[this.collection.date.getMonth()],
            year: this.collection.date.getFullYear()
        }
    },
});
