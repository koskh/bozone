'use strict';

module.exports = Marionette.Behavior.extend({
    modelEvents: {
        'invalid': '_modelInvalidHandler'
    },

    initialize() {
        //console.log('Behaver initialize.' + this.options.message);
    },

    _modelInvalidHandler(model, validationError) {
        _.each(validationError, (messages, field) => {
            this.showErrorHelper( field, messages.toString()); // TODO: вменяемая строка ошибки
        });
    },

    showErrorHelper(field, message) {
        //TODO: Вменяемый тултип об ошибке.
        this.ui[field].next().remove();
        this.ui[field].after(`<span class ="form-error-helper">${message}</span></span>`);
    }
});
