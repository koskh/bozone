'use strict';

/**
 * Схема валидации:
 * - во что конвертировать значения поля
 * - как валидировать это значение
 */

module.exports = {
    'name': {
        toType: {
            convert: function (value) {
                return parseFloat(value);
            },
            message: 'Неверный формат данных. Разрешено только число.'
        },
        rules: [
            {
                validate: function (value) {
                    return value >= 0 && value <= 100;
                },
                message: 'Число должно находиться в интервале 0-100'
            }
            //{
            //    validate: function (value) {
            //        //return validator.isLength(value, 1, 9);
            //    },
            //    message: 'Число должно быть от 1 до 9 символов'
            //}
        ]
    },
    'surname': {
        toType: {
            convert: function (value) {
                return parseFloat(value);
            },
            message: 'Неверный формат данных. Разрешено только число.'
        },
        rules: [
            {
                validate: function (value) {
                    return value >= 0 && value <= 100;
                },
                message: 'Число должно находиться в интервале 0-100'
            },
            {
                validate: function (value) {
                    //return validator.isLength(value, 1, 9);
                },
                message: 'Число должно быть от 1 до 9 символов'
            }
        ]
    }
}
