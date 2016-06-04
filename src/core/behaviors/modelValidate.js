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
        this._behaviorState.hintEl = this.options.hintEl || '.js-form-field-hint'; // куда выводить подсказку
        this._behaviorState.errorEl = this.options.errorEl || '.js-form-field-error'; // соглашение о классе ошибки
        this._behaviorState.fields = this.options.fields;
    },

    /**
     * Показываем тултип об ошибке валидации, ошибочным может стать несколько полей сразу
     * @param model
     * @param validationError
     * @private
     */
    _modelInvalidHandler(model, validationError) {
        _.each(validationError, (messages, field) => {
                this.ui[field].siblings(this._behaviorState.hintEl).hide(); // у строки ошибки приоритет выше подсказки
                this.ui[field].siblings(this._behaviorState.errorEl).html(messages.toString());
        });
    },

    /**
     * Убираем тултип об ошибке валидации на поле
     * @param field Прошедшее проверку поле
     * @private
     */
    _modelValidFieldHandler(field) {
        this.ui[field].siblings(this._behaviorState.errorEl).html('');
        this.ui[field].siblings(this._behaviorState.hintEl).show(); // если ошибки ушли, то должна показаться подсказка
    }
});
