'use strict';

const _ = require('underscore');
const ValidateModel  = require('./validateModel');

module.exports = ValidateModel.extend({
    /**
     "Заполненость" модели.
     Валидирует всю модель. без триггеринга 'invalid' события
     Используется для возможности разюлокировать кнопку сохранения. без лишних сообщений об ошибках.
     **/
    isFilled() {
        if (!this.validator) {
            throw new Error('ValidateModel need validator instance');
        }

        let attrs = this.keys();

        let validationErrorsObj = {}; // сбор ошибок сюда, {field:[errorMsg, errorMsg, ...], ...}
        let options = {}; // опции для проверки "заполнения"

        // валидация всех полей
        _.each(attrs, (attr) => {
            this._validateInput(this.get(attr), attr, validationErrorsObj, options);
        });

        //валидация бизнесс логкики
        if (!_.keys(validationErrorsObj).length && options.validateLogicRules) {
            this._validateLogic(attrs, validationErrorsObj, options);
        }

        return _.keys(validationErrorsObj).length > 0 ? validationErrorsObj : undefined;
    }
});