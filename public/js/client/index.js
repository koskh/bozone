(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports =  Backbone.Model.extend({
    defaults: {
        name:'Test name',
        address: 'Red patriots str, 2-22'
    }
});

},{}],2:[function(require,module,exports){
var _ = require('underscore');
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<ul> Template from LayoutView. <p> Name: '+
((__t=( name ))==null?'':__t)+
'</p> <p> Address: '+
((__t=( address ))==null?'':__t)+
'</p> </ul>';
}
return __p;
};

},{"underscore":"underscore"}],3:[function(require,module,exports){
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

},{"../model/model":1,"../template/template.ejs":2}]},{},[3]);
