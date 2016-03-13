'use strict';

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
    const answer = [];

    if (field && schema[field] && schema[field].required) {
        const required = schema[field].required;
        if (!required.validate(value)) {
            answer.push(required.message);
        }
    }

    return answer.length ? answer : undefined;
};

_p.validateValue = function (value, field, schema, options) {
    // поле должно быть заполненно?
    const requiredErrors = this.checkRequired(value, field, schema, options);
    if (requiredErrors) {
        return requiredErrors;
    }

    // конвертация в требуемый тип. Конвертор берется из схемы валидации
    value = schema[fieldName] && schema[fieldName].toType ? schema[fieldName].toType.convert(value) : value;

    if (_.isNaN(value)) {
        /* Не смогли сконвертировать в требуемый тип.*/
        return [schema[fieldName].toType.message]; // в массиве, для соблюбдения спецификац
    } else {
        /* Сконвертировать в требуемый тип удалось, прогоняем по правилам валидации*/
        let answer = validator.validate(value, fieldName, schema, {forceAllRules: options.forceAllRules});
        if (answer) {
            return answer;
        }
    }
};