'use strict';

module.exports = Backbone.Model.extend({
    defaults: {
        date: null,
        isActive: false,
        type: null
    },
    getDate: function() {
        return this.get('date').getDate();
    }
})