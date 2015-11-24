'use strict';

module.exports = Backbone.Model.extend({
    defaults: {
        date: null,
        isActive: false,
        type: null
    },
    getDay: function() {
        return this.get('date').getDate();
    }
})