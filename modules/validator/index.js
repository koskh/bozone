'use strict';

const _ = require('underscore');
const helpers = require('./helpers');

module.exports = Validator;

function Validator() {

}

const _p = Validator.prototype;

_p.validateInput = function (value, field, schema, options) {
    // без имени поля и схемы его валидации не позволяем вызывать валадаторы
    if (!(field && schema[field])) {
        throw new Error('Validator.validateInput() need field and schema');
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
    const ruleErrors = schema[field].inputRules && this._checkInputRules(value, field, schema, {forceAllRules: options.forceAllRules});
    if (ruleErrors) {
        return ruleErrors;
    }
};

_p._checkRequired = function (value, field, schema, options) {
    if (!(field && schema[field]) && schema[field].required) {
        throw new Error('Validator.checkRequired() need field, schema and required field');
    }

    const isEmpty = schema[field].required.isEmpty || helpers.isEmptyValue;
    const msg = schema[field].required.message || helpers.getMessage('emptyNotAllowed');

    return isEmpty(value) ? [msg] : undefined;
};

_p._checkDataType = function (value, field, schema, options) {
    if (!(field && schema[field] && schema[field].type)) {
        throw new Error('Validator.checkDataType() need field, schema and type field');
    }
    const convert = schema[field].type.convert || helpers.noConvert;
    const msg = schema[field].type.message || helpers.getMessage('dataTypeError');

    return _.isNaN(convert(value)) ? [msg] : undefined;
};

_p._checkInputRules = function (value, field, schema, options) {
    if (!(field && schema[field] && schema[field].inputRules)) {
        throw new Error('Validator.checkDataType() need field, schema and  inputRules field');
    }

    const answer = [];

    const convert = schema[field].type && schema[field].type.convert || helpers.noConvert;
    value = convert(value);

    const inputRules = schema[field].inputRules; // массив-список правил валидации

    for (let i = 0; i < inputRules.length; i++) {
        let rule = inputRules[i];
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

/**
 * Валидация логики
 * @param attrs Объект аттрибутов модели
 * @param field Имя поля текущей проверки
 * @param schema  Схема с правилами валидации
 * @param options
 * @returns {*}
 */
_p.validateLogic = function (attrs, field, schema, options) { // schema для  упрощенного расширения логик-валидации
    if (!(field && schema[field])) {
        throw new Error('Validator.validateLogic() need field, schema and logicRules field');
    }

    /* Прогоняем по правилам логик- валидации*/
    const logicErrors = schema[field].logicRules && this._checkLogicRules(attrs, field, schema);
    return logicErrors ? logicErrors : undefined;
};

_p._checkLogicRules = function(attrs, field, schema) {
    //
    const answer = [];
    const logicRules = schema[field].logicRules; // массив-список правил валидации

    for (let i = 0; i < logicRules.length; i++) {
        let rule = logicRules[i];
        if (!rule.validate(attrs)) {
            answer.push(rule.message); // до первой ошибки
            break;
        }
    }

    return answer.length ? answer : undefined;
}