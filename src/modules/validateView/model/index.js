'use strict';

const core = require('../../../core/index');

// Схема валидации
const schema = require('./validationSchema');

// Валидатор модели
const Validator = require('../../../core/validator/index');
const validator = new Validator(schema);

module.exports = core.ValidateModel.extend({
    defaults: {
        name: '',
        surname: '',
        email: ''
    },

    validator: validator
});
