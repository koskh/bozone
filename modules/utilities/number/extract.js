'use strict';

const regex = /^[+-]?\d+([.,]\d+)?$/;


export default function (value) {
    value = value.trim(); // IE9+ only

    if (value.length === 0) {
        return null;
    }

    if (!regex.test(value)) {
        return NaN;
    }

    return parseFloat(value.replace(',', '.'));
}