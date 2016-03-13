'use strict';
const _ = require ('underscore');
const errorMessages = require ('./messages');

module.exports = {
    isEmptyValue: function(value) { //TODO: вменяемую стратегию проверки "пустого" значения?
        if (_.isString(value)) {
            return !Boolean(value.trim().length > 0);
        }
    },
    noConvert: function(value) {
        return value;
    },

    getMessage: function(key) {
        return errorMessages[key];
    }
};