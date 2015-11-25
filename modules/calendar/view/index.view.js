'use strict';

var languageResource = require ('../localization/index');
var locale = window.locale || '[ru-RU]';

//var MonthCollection = require('../collection/month.collection');

var DayView = require('./day.view');
var template = require('../template/index.ejs');

var Month = require ('../collection/month.collection');
var month = new Month();

module.exports = Marionette.CompositeView.extend({
    template: template,

    collection: month,

    childView: DayView,

    childViewContainer: ".calendar__body",

    ui: {
        'month': '.js-header-month',
        'year': '.js-header-year',
        'prevMonthBtn': '.js-prev-month',
        'nextMonthBtn': '.js-next-month'
    },

    childEvents: {
        'day:click': '_dayClickHandler'
    },

    collectionEvents: {
        'reset': '_collectionResetHandler'
    },

    events: {
        'click @ui.prevMonthBtn': '_prevMonthHandler',
        'click @ui.nextMonthBtn': '_nextMonthHandler'
    },


    onRender: function() {
        this._collectionResetHandler(); // обновляем заголовок при загрузке
    },

    _prevMonthHandler: function() {
        this.collection.prevMonth();
    },
    _nextMonthHandler: function() {
        this.collection.nextMonth();
    },
    _collectionResetHandler: function() {
        this.ui.month.html(languageResource[locale].months[this.collection.date.getMonth()]);
        this.ui.year.html(this.collection.date.getFullYear());
    },

    _dayClickHandler: function(childView) {
        console.log(childView.getDate());
    }

});
