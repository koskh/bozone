'use strict';

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
            _.each(options.checkOnly, (fieldName) => {
                this._processField(attrs[fieldName], fieldName, options, validationErrors);
            });
        } else {
            // валидация всех полей
            _.each(attrs, (value, fieldName) => {
                this._processField(attrs[fieldName], fieldName, options, validationErrors);
            });
        }

        // по спекам, возращаемое значение будет доступне в model.validateErrors
        return _.keys(validationErrors).length > 0 ? validationErrors : undefined;
    },

    /**
     * Обработка поля. Валидируем, триггерим и сетим, если требуется.
     * @param value значение
     * @param fieldName имя проверяемого поля
     * @param options опции валидации
     * @param validationErrors куда записываем ошибки валидации
     * @private
     */
    _processField(value, fieldName, options, validationErrors) {
        let errors = this.validateValue(value, fieldName, schema, options);
        errors ? validationErrors[fieldName] = errors : this.trigger('valid:field', fieldName);
        if (options.setOnError) {
            this.set(fieldName, value);
        }
    },

    /**
     * Валидация значения в поле модели.
     * @param value
     * @param fieldName
     * @param schema
     * @param options
     * @returns {*[]} массив сообщений об ошибках
     */
    validateValue(value, fieldName, schema, options) {
        let answer = validator.validateInputValue(value, fieldName, schema, options);
        return answer;
    }
});
