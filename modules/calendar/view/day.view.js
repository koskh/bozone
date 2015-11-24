'use strict';

var template = require('../template/day.ejs');

module.exports = Marionette.ItemView.extend({
    template: template,
    tagName: 'td'
});
