'use strict';

var template = require ('../template/template.ejs');

module.exports =  Marionette.ItemView.extend({
    template: template,
    modelEvents: {
      'change': 'render'
    },
    initialize: function(options){
        console.log('view init');
        this.model.on('change', function(){ console.log('123')});
    }
});

