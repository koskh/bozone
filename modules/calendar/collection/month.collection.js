'use strict';

var DayModel = require('../model/day.model');

module.exports = Backbone.Collection.extend({

    model: DayModel,

    date: null, // объект Date текущего ("рабочего") месяца

    initialize: function (options) {
        options = {} || options;
        this.date = options.date || new Date();

        this._fillMonth(this.date);
    },

    /**
     * Заполнение месяца днями
     * Запонение = дни перед 1 числом + числа месяца + числа следущ месяца
     * @param dateString строка даты, на месяц и год которой заполняем календарь
     * @private
     */
    _fillMonth(dateString) {
        var date = new Date(this._parseDateString(dateString));

        var daysArrayForCollection = []; // для заполнения коллекции

        /* что бы не путаться с днями недели, числами дней
           day -> monday.. sunday
           date -> 1 ..30
         */
        var year = date.getFullYear();
        var month = date.getMonth();
        var lastMonthsDate = new Date(year, month + 1 , 0).getDate();

        var sunday =  0; // sunday из Date.getDay()
        var daysBeforeSunday = 6; // неделя начинается с понедельника
        var daysAfterSunday = 0; // неделя заканчив воскресен

        /* заполн дни предыдущ месяца */
        var firstDay = (new Date(year, month, 1)).getDay();
        var daysBeforeFirstDay =  firstDay === sunday ? daysBeforeSunday : firstDay - 1 ;

        for ( var d = daysBeforeFirstDay - 1; d >= 0; d-- ) { // `daysBeforeFirstDay -1` т.к. 0 - это последн день пред месяца
            daysArrayForCollection.push( new DayModel({date: new Date(year, month, -d)}));
        }

        /* заполн дни месяца */
        for ( d = 1; d <= lastMonthsDate; d++) {
            daysArrayForCollection.push(new DayModel({date: new Date(year, month, d), isActive: true}));
        }

        /* заполн дни после следущ месяца */
        var lastDay = (new Date(year, month, lastMonthsDate)).getDay();
        var daysAfterLastDay = lastDay === sunday ? daysAfterSunday : 7 - lastDay;
        for ( d = 1; d <= daysAfterLastDay; d++) {
            daysArrayForCollection.push(new DayModel({date: new Date(year, month + 1, d)}));
        }

        this.date = date;
        this.reset(daysArrayForCollection); // reset event обрабатывается родителем, сменяя заголовок календаря
    },

    _parseDateString(dateString) {
        var ms = Date.parse(dateString);
        if (isNaN(ms)) {
            throw new Error('');
        }
        return ms;
    },

    prevMonth() {
        var date = this._getAdjacentMonth('prev', this.date);
        this._fillMonth(date);
    },

    nextMonth() {
        var date = this._getAdjacentMonth('next', this.date);
        this._fillMonth(date);
    },

    _getAdjacentMonth(action, date) {
        var adjacentMonth = {
            'prev': function(date) {
                return date.getMonth() === 0 ?  new Date(date.getFullYear() - 1, 11, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1);
            },
            'next': function(date) {
                return date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1);
            }
        };

        return adjacentMonth[action](date);
    }

});

