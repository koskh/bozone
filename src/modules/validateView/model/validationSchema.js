'use strict';

/**
 * Схема валидации:
 * - во что конвертировать значения поля
 * - как валидировать это значение
 */

const extractFloat = require('../../../utilities/number/extract');

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
        inputRules: [
            {
                validate: function (value) {
                    return value >= 0 && value <= 100;
                },
                message: 'Число должно находиться в интервале 0-100'
            },
            {
                validate: function (value) {
                    return value >= 50;
                },
                message: 'Число должно быть больше 50'
            }
        ],

        logicRules: [
            {
                validate: function (attrs) {
                    return attrs.name >= attrs.surname;
                },
                message: 'Знечение поля NAME должно быть больше или равно значению поля SURNAME'
            }
        ]
    },
    'surname': {
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
        inputRules: [
            {
                validate: function (value) {
                    return value >= 0 && value <= 100;
                },
                message: 'Число должно находиться в интервале 0-100'
            },
        //    {
        //        validate: function (value) {
        //            return false;
        //            //return validator.isLength(value, 1, 9);
        //        },
        //        message: 'Число должно быть от 1 до 9 символов'
        //    }
        ]
    }
}
