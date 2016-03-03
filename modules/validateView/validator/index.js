'use strict';

module.exports = Validator;

function Validator() {
    //this.answerObject = this.getAnswerObject();
}

const _p = Validator.prototype;

_p.validate = function(value, field, schema, options) {
    const answer = [];

    if (field && schema[field]) {
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

// Helpers
//_p.isLength = function(value, min, max) {
//    return this.;
//}