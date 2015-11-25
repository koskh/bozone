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

    ui: {
        'prevMonthBtn': '.js-prev-month',
        'nextMonthBtn': '.js-next-month'
    },

    events : {
        'click @ui.prevMonthBtn': '_prevMonthHandler',
        'click @ui.nextMonthBtn': '_nextMonthHandler'
    },

    templateHelpers : function() {
        return {
            month: languageResourse[locale].months[this.collection.date.getMonth()],
            year: this.collection.date.getFullYear()
        }
    },

    _prevMonthHandler: function() {
        this.collection.prevMonth();
    },
    _nextMonthHandler: function() {
        this.collection.nextMonth();
    }
});
