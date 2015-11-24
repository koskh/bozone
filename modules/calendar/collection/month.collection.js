'use strict';

//var _  = require ('underscore');
var DayModel = require('../model/day.model');

module.exports = Backbone.Collection.extend({

    model: DayModel,

    initialize: function (options) {
        options = {} || options;

        this._fillMonth(options.date || new Date());
    },

    _fillMonth: function(dateString) {
        var date = new Date(this._parseDateString(dateString));

        /* что бы не путаться с днями недели, числами дней
           day -> monday.. sunday
           date -> 1 ..30
         */
        var year = date.getFullYear();
        var month = date.getMonth();
        var firstMonthsDate = 1; //always 1
        var lastMonthsDate = new Date(year, month + 1 , 0).getDate();

        /* days before month */
        var sunday =  0; // sunday from Date.getDay()
        var daysBeforeSunday = 6;
        var firstDay = (new Date(year, month, firstMonthsDate)).getDay();
        var daysBeforeFirstDay =  firstDay === sunday ? daysBeforeSunday : firstDay -1 ;

        for( var daysBefore = daysBeforeFirstDay -1; daysBefore >= 0; daysBefore--) { //daysBeforeFirstDay -1 тк 0 - это последн день пред месяца
            this.add(new DayModel({date: new Date(year, month, -daysBefore)}));
        }

        debugger;

        /* days of month */
        for (var date = 1; date <= lastMonthsDate; date++) {
            this.add(new DayModel({date: new Date(year, month, date)}));
        }

        /* days after month */

    },
    _parseDateString: function(dateString) {
        var ms = Date.parse(dateString);
        if(isNaN(ms)) { throw new Error(''); }
        return ms;
    }
});

