'use strict';

/**
 * Схема валидации:
 * - во что конвертировать значения поля
 * - как валидировать это значение
 */

const extractFloat = require('../../utilities/number/extract');

module.exports = {
    'name': {
        required: {
            isEmpty: function(value) {
                return !value.trim().length;
            },
            message: 'не может быть пустым'
        },

        type: {
            convert: function (value) {
                return extractFloat(value);
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
        ]
    },
    'surname': {
        //required: {
        //
        //},

        type: {
            convert: function (value) {
                return extractFloat(value);
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
                    return false;
                    //return validator.isLength(value, 1, 9);
                },
                message: 'Число должно быть от 1 до 9 символов'
            }
        ]
    }
}
