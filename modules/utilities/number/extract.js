'use strict';

const regex = /^[+-]?\d+([.,]\d+)?$/;

module.exports = function (value) {
    value = value.trim(); // IE9+ only

    if (value.length === 0) {
        return NaN;
    }

    if (!regex.test(value)) {
        return NaN;
    }

    return parseFloat(value.replace(',', '.'));
}