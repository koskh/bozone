'use strict';

var template = require('../template/index.ejs');

const HINTS = {
    name: 'Ваше имя',
    surname: 'Ваше сурнаме',
    email: 'Почтовый ящик для сообщений'
}

module.exports = Marionette.ItemView.extend({
    template: template,

    behaviors: {
        oneWayBinding: {},
        modelValidate: {errorEl: '.js-form-field-error'},
        inputHint: {hintEl: '.js-form-field-hint', hints: HINTS}
    },

    ui: {
        'name': '[name="name"]',
        'surname': '[name="surname"]',
        'email': '[name="email"]'
    },

    events: {
        'change @ui.name,@ui.surname,@ui.email': '_inputFormHandler',
        // 'focus @ui.name,@ui.surname,@ui.email': '_inputFocusHandler'
    },

    _inputFormHandler(e) {
        //
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        // устанавливаем значения в модель, проверяя сразу все поля
        this.model.set(name, value, {validate: true, setOnError: true});

        //валидируем только одно поле и решаем, устанавливать в модель или нет.
        //this.model.set(name, value, {validate: true, checkOnly:[name], setOnError: true, forceAllRules: true});
    }
});
