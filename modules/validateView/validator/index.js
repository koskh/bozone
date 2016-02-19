'use strict';

const _ = require('underscore');

module.exports = Validator;

function Validator() {
    //this.answerObject = this.getAnswerObject();
}

const _p = Validator.prototype;

//_p.validate = function(){
//    console.log('exec Validator.validate()');
//};

/**
 * Ответ валидатора
 * @type {{isValid: boolean, msg: string}}
 */
_p._answerObjectTemplate = {
    isValid: false,
    message: ''
};

_p._getAnswerObject = function(){
    return _.extend({}, this._answerObjectTemplate);
};

/**
 * Создает объект валидного объекта
 */
_p.getValidAnswer = function() {
    const answer = this._getAnswerObject();
    return (answer.isValid = true, answer.message = '', answer);
};

/**
 * СОздает объект невалидного объекта
 * @param msg: string
 */
_p.getInvalidAnswer = function(message) {
    const answer = this._getAnswerObject();
    return (answer.isValid = false, answer.message = message, answer);
};


//_p.setAnswerObject = function(answerObject){
//    this.answerObject = answerObject;
//};



_p.validate = function(value, schema) {
    for (let i = 0; i <= schema.length; i++) {
        let rule = schema[i];
        if (!rule.validate(value)) {
            return this.getInvalidAnswer(rule.message);
        }
    }

    return this.getValidAnswer();
};

// Helpers
//_p.isLength = function(value, min, max) {
//    return this.;
//}