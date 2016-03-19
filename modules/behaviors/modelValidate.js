'use strict';

const _ = require('underscore');

module.exports = Marionette.Behavior.extend({
    modelEvents: {
        'invalid': '_modelInvalidHandler',
        //'valid': '_modelValidHandler',
        'valid:field': '_modelValidFieldHandler'
    },

    initialize() {
        //console.log('Behaver initialize.' + this.options.message);
    },

    ///**
    // * Очистка инвалиданой валидации
    // * @private
    // */
    _modelValidFieldHandler(field) {
        //TODO: Вменяемый тултип об ошибке, требует вменяемой очистки
        //debugger;
        this.ui[field].next().remove();
    },

    _modelInvalidHandler(model, validationError) {
        //debugger;
        _.each(validationError, (messages, field) => {
            //this.showErrorHelper( field, messages.toString()); // TODO: вменяемая строка ошибки
            this.ui[field].next().remove();
            this.ui[field].after(`<span class ="form-error-helper">${messages.toString()}</span></span>`);
        });
    },

    //showErrorHelper(field, message) {
    //    //TODO: Вменяемый тултип об ошибке.
    //    this.ui[field].next().remove();
    //    this.ui[field].after(`<span class ="form-error-helper">${message}</span></span>`);
    //}
});
