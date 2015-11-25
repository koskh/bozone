'use strict';

//var _  = require ('underscore');
var DayModel = require('../model/day.model');

module.exports = Backbone.Collection.extend({

    model: DayModel,


    initialize: function (options) {
        options = {} || options;
        this.date = options.date || new Date();

        this._fillMonth(this.date);
    },

    /**
     * Заполнение месяца днями
     * @param dateString строка даты, на месяц и год которой заполняем календарь
     * @private
     */
    _fillMonth: function(dateString) {
        var date = new Date(this._parseDateString(dateString));

        /* что бы не путаться с днями недели, числами дней
           day -> monday.. sunday
           date -> 1 ..30
         */
        var daysArrayForCollection = [];

        var year = date.getFullYear();
        var month = date.getMonth();
        var firstMonthsDate = 1; //always 1
        var lastMonthsDate = new Date(year, month + 1 , 0).getDate();

        var sunday =  0; // sunday из Date.getDay()
        var daysBeforeSunday = 6; // неделя начинается с понедельника
        var daysAfterSunday = 0; // неделя заканчив воскресен

        /* дни предыдущ месяца */
        var firstDay = (new Date(year, month, firstMonthsDate)).getDay();
        var daysBeforeFirstDay =  firstDay === sunday ? daysBeforeSunday : firstDay -1 ;

        for( var daysBefore = daysBeforeFirstDay -1; daysBefore >= 0; daysBefore--) { // `daysBeforeFirstDay -1` т.к. 0 - это последн день пред месяца
            //this.add(new DayModel({date: new Date(year, month, -daysBefore)}));
            daysArrayForCollection.push( new DayModel({date: new Date(year, month, -daysBefore)}));
        }

        /* дни месяца */
        for (var date = 1; date <= lastMonthsDate; date++) {
            //this.add(new DayModel({date: new Date(year, month, date)}));
            daysArrayForCollection.push(new DayModel({date: new Date(year, month, date)}));
        }

        /* дни после следущ месяца */
        var lastDay = (new Date(year, month, lastMonthsDate)).getDay();
        var daysAfterLastDay = lastDay === sunday ? daysAfterSunday : 7 - lastDay;
        for (var daysAfter = 1; daysAfter <= daysAfterLastDay; daysAfter++) {
            //this.add(new DayModel({date: new Date(year, month + 1, daysAfter)}));
            daysArrayForCollection.push(new DayModel({date: new Date(year, month + 1, daysAfter)}));
        }

        this.reset(daysArrayForCollection);
    },

    _parseDateString: function(dateString) {
        var ms = Date.parse(dateString);
        if(isNaN(ms)) { throw new Error(''); }
        return ms;
    },

    prevMonth: function() {
        //this.reset();
        this.date = this._getAdjacentMonth('prev', this.date);
        this._fillMonth(this.date);
    },

    nextMonth: function() {
        //this.reset();
        this.date = this._getAdjacentMonth('next', this.date);
        this._fillMonth(this.date);
    },

    _getAdjacentMonth: function (action, date) {
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

