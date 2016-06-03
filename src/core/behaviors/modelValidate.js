'use strict';

const _ = require('underscore');

module.exports = Marionette.Behavior.extend({
    modelEvents: {
        'invalid': '_modelInvalidHandler', // инвалидными могут стать сразу несколько полей
        'valid:field': '_modelValidFieldHandler' // а валидными только по одному
    },

    initialize() {
        //console.log('Behaver initialize.' + this.options);
        this._behaviorState = {};
        this._behaviorState.errorEl = this.options.errorEl; // куда выводить ошибку
    },

    /**
     * Показываем тултип об ошибке валидации, ошибочным может стать несколько полей сразу
     * @param model
     * @param validationError
     * @private
     */
    _modelInvalidHandler(model, validationError) {
        _.each(validationError, (messages, field) => {
            if (this._behaviorState.errorEl) {
                this.ui[field].siblings(this._behaviorState.errorEl).html(messages.toString());
            } else {
                // TODO: вменяемая генерация строки ошибки
                this.ui[field].next().remove();
                this.ui[field].after(`<span class ="form-field__tooltip--error">${messages.toString()}</span></span>`);
            }

        });
    },

    /**
     * Убираем тултип об ошибке валидации на поле
     * @param field Прошедшее проверку поле
     * @private
     */
    _modelValidFieldHandler(field) {
        if (this._behaviorState.errorEl) {
            this.ui[field].siblings(this._behaviorState.errorEl).html('');
        } else {
            //TODO: Вменяемый тултип об ошибке, требует вменяемой очистки
            this.ui[field].next().remove();
        }
    }
});
