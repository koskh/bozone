'use strict';

var View = require('./view/view');
var Model = require ('./model/model');
var template = require ('./template/template.ejs');
//
var App =  Marionette.Application.extend({
    regions: {
        mainRegion: '#container'
    },
    initialize: function() {
        console.log('module is initialized');
    }
});

var app = new App();

var model = new Model();

var view = new View({model: model });


app.mainRegion.show(view);
