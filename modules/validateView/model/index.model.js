'use strict';

const _ = require('underscore');

const Validator = require('../../validator/index');
const validator = new Validator();

/**
 * Схема валидации:
 * - во что конвертировать значения
 * - как валидировать
 */
const schema = require('./validationSchema');

module.exports = Backbone.Model.extend({
    defaults: {
        name: 'Test name',
        surname: 'Red patriots str, 2-22',
        email: ''
    },

    /**
     * Валидация всей модели.
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

        const validationErrorsObj = {}; // объект ошибок, {field:[errorMsg, errorMsg, ...], ...}

        if (options.checkOnly.length > 0) {

            // валидация только переданных полей
            _.each(options.checkOnly, (fieldName) => {
                this._processField(attrs[fieldName], fieldName, options, validationErrorsObj);
            });
        } else {

            // валидация всех полей
            _.each(attrs, (value, fieldName) => {
                this._processField(attrs[fieldName], fieldName, options, validationErrorsObj);
            });
            //валидация бизнесс логкики
            if ( !_.keys(validationErrorsObj).length && options.validateLogicRules) {
                this._validateLogicErrors(attrs, schema, options, validationErrorsObj);
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
     * @param validationErrorsObj куда записываем ошибки валидации
     * @private
     */
    _processField(value, fieldName, options, validationErrorsObj) {

        let errors = schema[fieldName] ? validator.validateInputRule(value, fieldName, schema, options) : undefined;
        errors ? validationErrorsObj[fieldName] = errors : this.trigger('valid:field', fieldName);
        if (options.setOnError) {
            this.set(fieldName, value);
        }
    },

    //_validateInputError(value, fieldName, schema, options) {
    //    let answer = validator.validateInputRule(value, fieldName, schema, options);
    //    return answer;
    //},

    _validateLogicErrors(attrs, schema, options, validationErrorsObj) {

        _.each(attrs, (value, fieldName) => {
            let errors = schema[fieldName] ? validator.validateLogicRule(attrs, fieldName,  schema, options) : undefined;
            errors ? validationErrorsObj[fieldName] = errors :  this.trigger('valid:field', fieldName);
        });
    }
});
