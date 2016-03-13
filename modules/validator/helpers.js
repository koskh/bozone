'use strict';

const errorMessages = require ('./messages');

module.exports = {
    isEmptyString: function(value) {
        return value.trim().length > 0;
    },
    defaultConvert: function(value) {
        return value.trim();
    },

    getMessage: function(key) {
        return errorMessages[key];
    }
};