'use strict';

module.exports = Marionette.Behavior.extend({
    modelEvents: {
        'change': '_reRender'
    },

    _reRender() {
        this.view.render();
    }
});