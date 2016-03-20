'use strict';

//const _ = require('underscore');
const core = require('../../core/index');

const schema = require('./validationSchema'); // Схема валидации

const Validator = require('../../validator/index');
const validator = new Validator(schema);

module.exports = core.ValidateModel.extend({
    defaults: {
        name: '',
        surname: '',
        email: ''
    },

    schema: schema, // правила валидации
    validator: validator // инстанс валидатора
});
