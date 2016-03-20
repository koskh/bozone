'use strict';

const _ = require('underscore');

module.exports = Marionette.Behavior.extend({
    modelEvents: {
        'invalid': '_modelInvalidHandler', // инвалидными могут стать сразу несколько полей
        'valid:field': '_modelValidFieldHandler' // а валидными только по одному
    },

    initialize() {
        //console.log('Behaver initialize.' + this.options.message);
    },

    /**
     * Показываем тултип об ошибке валидации, ошибочным может стать несколько полей сразу
     * @param model
     * @param validationError
     * @private
     */
    _modelInvalidHandler(model, validationError) {
        _.each(validationError, (messages, field) => {
            // TODO: вменяемая строка ошибки
            this.ui[field].next().remove();
            this.ui[field].after(`<span class ="form-error-helper">${messages.toString()}</span></span>`);
        });
    },

    /**
     * Убираем тултип об ошибке валидации на поле
     * @param field Прошедшее проверку поле
     * @private
     */
    _modelValidFieldHandler(field) {
        //TODO: Вменяемый тултип об ошибке, требует вменяемой очистки
        this.ui[field].next().remove();
    }
});
