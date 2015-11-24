'use strict';

var template = require('../template/day.ejs');

module.exports = Marionette.ItemView.extend({
    template: template,
    className:'calendar__day',
    templateHelpers : function() {
        return {
            day: this.model.getDay()
        }
    }
});
