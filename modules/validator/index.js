'use strict';

const helpers = require('./helpers');

module.exports = Validator;

function Validator() {
    //this.answerObject = this.getAnswerObject();
}

const _p = Validator.prototype;

_p.validate = function (value, field, schema, options) {
    const answer = [];

    if (field && schema[field] && schema[field].rules) {
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
    }

    return answer.length ? answer : undefined;
};

_p.checkRequired = function (value, field, schema, options) {
    if (!(field && schema[field] && schema[field].required)) {
        throw new Error('Validator.checkRequired() need field and schema and required field');
    }

    const isEmpty = schema[field].required.isEmpty || helpers.isEmptyString;
    const msg = schema[field].required.message || helpers.getMessage('emptyNotAllowed');

    return isEmpty(value) ? [msg] : undefined;
};

_p.validateValue = function (value, field, schema, options) {
    if (!(field && schema[field])) {
        throw new Error('Validator.ValidateValue() need field and schema');
    }

    //ситуация с пустым значением, если разрешено пустое значение. не валидируем
    const isEmpty = schema[field].required && schema[field].required.isEmpty || helpers.isEmptyString;
    if (isEmpty(value) && !this._isRequired(value, field, schema)) {
        return;
    }

    // ситуация с требованием заполненности.
    const requireErrors = this.checkRequired(value, field, schema, options);
    if (requireErrors) {
        return requireErrors;
    }

    // конвертация в требуемый тип
    const convert = schema[field].toType.convert || helpers.defaultConvert;
    const msg = schema[field].toType.message  || helpers.getMessage('dataTypeError');

    value = convert(value);

    if (_.isNaN(value)) {
        return [msg]; // в массиве, для соблюбдения спецификац
    }

    /* Сконвертировать в требуемый тип удалось, прогоняем по правилам валидации*/
    let answer = validator.validate(value, fieldName, schema, {forceAllRules: options.forceAllRules});
    if (answer) {
        return answer;
    }

};

_p._isRequired = function (value, field, schema) {
    return Boolean(schema[field].required);
}