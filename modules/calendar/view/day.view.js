'use strict';

var template = require('../template/day.ejs');

module.exports = Marionette.ItemView.extend({
    template: template,

    className: function() {
        return this.model.get('isActive') ? 'calendar__day is-active' : 'calendar__day'; // для раскраски активных дней в активные цвета
    },

    templateHelpers() {
        return {
            date: this.model.getDate()
        }
    },

    events: {
        'click': '_clickHandler'
    },

    getDate() {
        return this.model.get('date');
    },

    _clickHandler() {
        this.trigger('day:click');
    }
});
