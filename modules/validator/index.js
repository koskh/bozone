'use strict';

const _ = require('underscore');
const helpers = require('./helpers');

module.exports = Validator;

function Validator() {
    //this.answerObject = this.getAnswerObject();
}

const _p = Validator.prototype;

_p._checkRequired = function (value, field, schema, options) {
    if (!(field && schema[field]) && schema[field].required) {
        throw new Error('Validator.checkRequired() need field, schema and required field');
    }

    const isEmpty = schema[field].required.isEmpty || helpers.isEmptyValue;
    const msg = schema[field].required.message || helpers.getMessage('emptyNotAllowed');

    return isEmpty(value) ? [msg] : undefined;
};

_p._checkDataType = function (value, field, schema, options) {
    // возможна конвертация в требуемый тип ?
    if (!(field && schema[field] && schema[field].type)) {
        throw new Error('Validator.checkDataType() need field, schema and type field');
    }
    const convert = schema[field].type.convert || helpers.noConvert;
    const msg = schema[field].type.message || helpers.getMessage('dataTypeError');

    return _.isNaN(convert(value)) ? [msg] : undefined;
};

_p._checkInputValue = function (value, field, schema, options) {
    if (!(field && schema[field] && schema[field].rules)) {
        throw new Error('Validator.checkDataType() need field, schema and  rules field');
    }

    const answer = [];

    const convert = schema[field].type && schema[field].type.convert || helpers.noConvert;
    value = convert(value);

    const rules = schema[field].rules; // массив-список правил валидации

    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        if (!rule.validate(value)) {
            if (options && options.forceAllRules) {
                answer.push(rule.message); // прогон по всем правилам
            } else {
                answer.push(rule.message); // до первой ошибки
                break;
            }
        }
    }

    return answer.length ? answer : undefined;
};

_p.validateInputValue = function (value, field, schema, options) {
    if (!(field && schema[field])) {
        throw new Error('Validator.ValidateValue() need field and schema');
    }

    //ситуация с пустым значением, если разрешено пустое значение. не валидируем
    //const isEmpty = schema[field].required && schema[field].required.isEmpty || helpers.isEmptyString;
    if (helpers.isEmptyValue(value) && !schema[field].required) {
        return;
    }

    // ситуация с требованием заполненности.
    const requireErrors = schema[field].required && this._checkRequired(value, field, schema, options);
    if (requireErrors) {
        return requireErrors;
    }

    // ситуация с типом данных
    const dataTypeErrors = schema[field].type && this._checkDataType(value, field, schema, options);
    if (dataTypeErrors) {
        return dataTypeErrors;
    }

    /* Сконвертировать в требуемый тип удалось, прогоняем по правилам валидации*/
    const ruleErrors = schema[field].rules && this._checkInputValue(value, field, schema, {forceAllRules: options.forceAllRules});
    if (ruleErrors) {
        return ruleErrors;
    }
};