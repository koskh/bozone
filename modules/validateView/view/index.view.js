'use strict';

var template = require('../template/index.ejs');

module.exports = Marionette.ItemView.extend({
    template: template,

    ui: {
        'name': '[name="name"]',
        'surname': '[name="surname"]',
        'email': '[name="email"]'
    },

    //onRender() {
    //    console.log('validateView  onRender');
    //}

});
