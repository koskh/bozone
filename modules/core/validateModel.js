'use strict';

const _ = require('underscore');

let validationErrorsObj = {};  // объект ошибок, {field:[errorMsg, errorMsg, ...], ...}

module.exports = Backbone.Model.extend({
    /**
     * Стратегии проверки
     */
    schema: undefined, // schema abstract interface
    validator: undefined, //validator's abstract interface

    /**
     * Валидация модели.
     * Стратегия валидации (все поля/ тоько опредленные поля) зависит от options.checkOnly массива
     * Помни:
     *  -  model.save() запускает полную ( по всем полям) валидацию сам
     *  - валидация только по выбранным полям не дает полную  валидацию автоматом, потому запусти вручную при сейве формы.
     *
     * Логики проверка запускается только на полностью валидных полях.
     *
     * @param attrs поля имя-значение модели, пришедшие на изменение {name1:value1, name2:value2, ...}
     * @param options опции валидации: setOnError: сохранять не смотря на ошибку валидации, forceAllRules: проверить по всему списку правил.
     * @returns {*}
     */
    validate: function (attrs, options) {
        // TODO: использовать es6 options= {}; babel не хочет дефолтные значений функции прописывать.
        options = _.extend({checkOnly: [], setOnError: false, forceAllRules: false, validateLogicRules: true}, options);

        if (!this.schema || !this.validator){
            throw new Error('ValidateModel need schema and validator');
        }

        //
        validationErrorsObj = {}; // объект ошибок, {field:[errorMsg, errorMsg, ...], ...}

        if (options.checkOnly.length > 0) {
            // валидация только переданных полей
            _.each(options.checkOnly, (fieldName) => {
                this._validateInput(attrs[fieldName], fieldName, options);
            });
        } else {
            // валидация всех полей
            _.each(attrs, (value, fieldName) => {
                this._validateInput(attrs[fieldName], fieldName, options);
            });
            //валидация бизнесс логкики
            if (!_.keys(validationErrorsObj).length && options.validateLogicRules) {
                this._validateLogic(attrs, options);
            }
        }

        // по спекам, возращаемое значение будет доступне в model.validateErrors
        return _.keys(validationErrorsObj).length > 0 ? validationErrorsObj : undefined;
    },

    /**
     * Обработка поля. Валидируем, триггерим и сетим, если требуется.
     * @param value значение
     * @param fieldName имя проверяемого поля
     * @param options опции валидации
     * @private
     */
    _validateInput(value, fieldName, options) {
        let errors = this.schema[fieldName] ? this.validator.validateInput(value, fieldName, options) : undefined;
        errors ? validationErrorsObj[fieldName] = errors : this.trigger('valid:field', fieldName);
        if (options.setOnError) {
            this.set(fieldName, value);
        }
    },
    /**
     * Валидация логики. Происходит после полной проверки ввода
     * @param attrs Объект полей:значений аттрибутов модели
     * @param options
     * @private
     */
    _validateLogic(attrs, options) {
        _.each(attrs, (value, fieldName) => {
            let errors = this.schema[fieldName] ? this.validator.validateLogic(attrs, fieldName, options) : undefined;
            errors ? validationErrorsObj[fieldName] = errors : this.trigger('valid:field', fieldName);
        });
    }
});
