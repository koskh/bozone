'use strict';

const _ = require('underscore');

module.exports = Marionette.Behavior.extend({
    modelEvents: {
        'change': '_reRender'
    },

    _reRender(model, options) {
        //this.view.render();
        _.each(model.changed, (value, key) =>{
            this.view.ui[key].val(value);
        });
    }
});