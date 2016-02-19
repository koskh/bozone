'use strict';

var Validator = require('../validator/index');
const validator = new Validator(); // стратегия валидации

var template = require('../template/index.ejs');

module.exports = Marionette.ItemView.extend({
    template: template,

    ui: {
        'name': '[name="name"]',
        'surname': '[name="surname"]',
        'email': '[name="email"]'
    },

    events: {
        'change @ui.name,@ui.surname,@ui.email': '_inputFormHandler'
    },

    modelEvents: {
        'change': 'render'
    },

    onRender() {

    },

    getValidationSchema() {
        return {
            'name': {
                type: 'number',
                schema: [
                    {
                        validate: function (value) {
                            return value >= 0 && value <= 100;
                        },
                        message: 'Число должно находиться в интервале 0-100'
                    },
                    {
                        validate: function (value) {
                            //return validator.isLength(value, 1, 9);
                        },
                        message: 'Число должно быть от 1 до 9 символов'
                    }
                ]
            }
        };
    },

    /**
     * Валидирует поле по name
     *
     * @returns validator.answerObject
     */
    validateField(name, value) {
        const schema = this.getValidationSchema()['name'].schema;
        return validator.validate(value, schema);
    },

    validate() {

    },

    _inputFormHandler(e) {
        const name = e.currentTarget.name;
        //конвертирем значение в тип
        //const type = this.getValidationSchema()[name].type;
        const value = e.currentTarget.value; // TODO:// конвертирем значение в тип

        const validateAnswer = this.validateField(name, value);

        validateAnswer.isValid ? this.model.set(name, value) : this.showErrorHelper(name, validateAnswer.message);
    },

    showErrorHelper(field, message) {
        this.ui[field].after(`<span class ="form-error-helper">${message}</span></span>`);
    }

});
