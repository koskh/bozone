'use strict';

var template = require('../template/day.ejs');

module.exports = Marionette.ItemView.extend({
    template: template,

    className:'calendar__day',

    templateHelpers : function() {
        return {
            day: this.model.getDate()
        }
    },

    events: {
        'click': '_clickHandler'
    },

    getDate: function() {
        return this.model.get('date');
    },

    _clickHandler: function() {
        this.trigger('day:click');
    }
});
