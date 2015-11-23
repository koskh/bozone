'use strict';

var template = require ('../template/template.ejs');

module.exports =  Marionette.ItemView.extend({
    template: template,
    initialize: function(options){
        console.log('view init');
    }
});

