'use strict';

var localize = window.localize || require ('../localization/index');
var locale = window.locale || '[ru-RU]';

//var MonthCollection = require('../collection/month.collection');

var DayView = require('./day.view.js');
var template = require('../template/index.ejs');

var Month = require ('../collection/month.collection.js');
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

    templateHelpers() {
        return {
            weekDays: localize[locale].shortDays
        };
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

    onRender() {
        this._collectionResetHandler(); // обновляем заголовок при загрузке
    },

    _prevMonthHandler() {
        this.collection.prevMonth();
    },
    _nextMonthHandler() {
        this.collection.nextMonth();
    },
    _collectionResetHandler() {
        this.ui.month.html(localize[locale].fullMonths[this.collection.date.getMonth()]);
        this.ui.year.html(this.collection.date.getFullYear());
    },

    _dayClickHandler(childView) {
        console.log(childView.getDate());
    }

});
