'use strict';

var Model = require ('../model/model');
var template = require ('../template/template.ejs');

var App =  Marionette.Application.extend({
    regions: {
        mainRegion: '#container'
    },
    initialize: function(options) {
        console.log('My container. ', options.container);
    }
});

var app = new App({container:'#app'});

var model = new Model();

var View = Marionette.ItemView.extend({
    model: model,
    template: template,
    initialize: function(options){
        console.log('view init');
    }
});

var view = new View({
    //el: "#containe
});

//view.render();
app.mainRegion.show(view);

debugger;
