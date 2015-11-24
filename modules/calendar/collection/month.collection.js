'use strict';

var DayModel = require('../model/day.model');

module.exports = Backbone.Collection.extend({

    model: DayModel,

    initialize: function (options) {
        console.log('month initialize ', options);
    }
});

