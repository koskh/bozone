'use strict';

const _ = require('underscore');
const helpers = require('./helpers');

/**
 * Валидатор. использует схему валидации, из которой забирает по имени поля стратегии валидации.
 * @type {Validator}
 */

module.exports = Validator;

function Validator(schema){
    if (!schema) {
        throw new Error('Validator need schema');
    }

    this.schema = schema;
}

const _p = Validator.prototype;

/**
 * ВАлидация ввода
 * @param value
 * @param field
 * @param options
 * @returns {*}
 */
_p.validateInput = function (value, field, options) {
    //
    // ситуация отсутсвия правил валидации для этого поля
    if (!this.schema[field]) {
        return undefined;
    }

    //ситуация с пустым значением, если разрешено пустое значение. не валидируем
    if (helpers.isEmptyValue(value) && !this.schema[field].required) {
        return;
    }

    // ситуация с требованием заполненности.
    const requireErrors = this.schema[field].required && this._checkRequired(value, field, options);
    if (requireErrors) {
        return requireErrors;
    }

    // ситуация с типом данных
    const dataTypeErrors = this.schema[field].type && this._checkDataType(value, field, options);
    if (dataTypeErrors) {
        return dataTypeErrors;
    }

    /* Сконвертировать в требуемый тип удалось, прогоняем по правилам валидации*/
    const ruleErrors = this.schema[field].inputRules && this._checkInputRules(value, field, {forceAllRules: options.forceAllRules});
    if (ruleErrors) {
        return ruleErrors;
    }
};

_p._checkRequired = function (value, field,  options) {
    const isEmpty = this.schema[field].required.isEmpty || helpers.isEmptyValue;
    const msg = this.schema[field].required.message || helpers.getMessage('emptyNotAllowed');

    return isEmpty(value) ? [msg] : undefined;
};

_p._checkDataType = function (value, field, options) {
    const convert = this.schema[field].type.convert || helpers.noConvert;
    const msg = this.schema[field].type.message || helpers.getMessage('dataTypeError');

    return _.isNaN(convert(value)) ? [msg] : undefined;
};

_p._checkInputRules = function (value, field, options) {
    //
    const answer = [];

    const convert = this.schema[field].type && this.schema[field].type.convert || helpers.noConvert;
    value = convert(value);

    const inputRules = this.schema[field].inputRules; // массив-список правил валидации

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
 * @param options
 * @returns {*}
 */
_p.validateLogic = function (attrs, field, options) {
    //
    // ситуация отсутсвия правил логик валидации для этого поля
    if (!this.schema[field]) {
        return undefined;
    }

    /* Прогоняем по правилам логик- валидации*/
    const logicErrors = this.schema[field].logicRules && this._checkLogicRules(attrs, field);
    return logicErrors ? logicErrors : undefined;
};

_p._checkLogicRules = function(attrs, field) {
    //
    const answer = [];
    const logicRules = this.schema[field].logicRules; // массив-список правил валидации

    for (let i = 0; i < logicRules.length; i++) {
        let rule = logicRules[i];
        if (!rule.validate(attrs)) {
            answer.push(rule.message); // до первой ошибки
            break;
        }
    }

    return answer.length ? answer : undefined;
};