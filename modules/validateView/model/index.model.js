'use strict';

const _ = require('underscore');

const Validator = require('../validator/index');
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
     *  - валидация тоько по выбранным полям не дает полную  валидацию автоматом, потому запусти вручную при сейве формы.
     *
     * @param attrs поля имя-значение модели, пришедшие на изменение {name1:value1, name2:value2, ...}
     * @param options опции валидации: setOnError: сохранять не смотря на ошибку валидации, forceAllRules: проверить по всему списку правил.
     * @returns {*}
     */
    validate: function (attrs, options) {
        // TODO: использовать es6 options= {}; babel не хочет дефолтные значений функции прописывать.
        options = _.extend({checkOnly: [], setOnError: false, forceAllRules: false}, options);

        const validationErrors = {}; // объект ошибок, {field:[errorMsg, errorMsg, ...}, ...]

        if (options.checkOnly.length > 0) {
            // валидация только переданных полей
            _.each(options.checkOnly, (fieldName) => {  //TODO: рефакторинг нид
                let errors = this._validateValue(attrs[fieldName], fieldName, options);
                errors && (validationErrors[fieldName] = errors) || this.trigger('valid:field', fieldName);
                if (options.setOnError) {
                    this.set(fieldName, attrs[fieldName]);
                }
            });
        } else {
            // валидация всех полей
            _.each(attrs, (value, fieldName) => {
                let errors = this._validateValue(value, fieldName, options);
                errors && (validationErrors[fieldName] = errors) || this.trigger('valid:field', fieldName);
                if (options.setOnError) {
                    this.set(fieldName, attrs[fieldName]);
                }
            });
        }

        // по спекам, возращаемое значение будет доступне в model.validateErrors
        return _.keys(validationErrors).length > 0 ? validationErrors : undefined;

    },

    _validateValue(value, key, options) {
        // Конвертация в требуемый тип. Конвертор берется из схемы валидации
        value = schema[key] && schema[key].toType ? schema[key].toType.convert(value) : value;

        if (_.isNaN(value)) {
            /* Не смогли сконвертировать в треуемый тип.*/
            return [schema[key].toType.message]; // в массиве, для соблюбдения спецификац
        } else {
            /* Сконвертировать в требуемый тип удалось, прогоняем по правилам валидации*/
            let answer = validator.validate(value, key, schema, {forceAllRules: options.forceAllRules});
            if (answer) {
                return answer;
            }
        }
    }
});
