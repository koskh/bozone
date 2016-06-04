'use strict';

var template = require('../template/index.ejs');

const HINTS = {
    name: 'Ваше имя',
    surname: 'Ваше сурнаме',
    email: 'Почтовый ящик для сообщений'
};

module.exports = Marionette.ItemView.extend({
    template: template,

    behaviors: {
        oneWayBinding: {},
        inputValidate: {errorEl: '.js-form-field-error'},
        inputHint: {hintEl: '.js-form-field-hint', fields: HINTS}
    },

    ui: {
        'name': '[name="name"]',
        'surname': '[name="surname"]',
        'email': '[name="email"]'
    },

    events: {
        'keyup @ui.surname,@ui.email ': '_inputFormHandler',
        'change @ui.name': '_inputFormHandler'
    },

    /*
     В этом методе происходит магия связывания значения поля и его проверки.
     У каждого поля своя магия. Сявзь поле-тип проверки настраиваются раздельно для каждого поля.
     Если у тебя 20 полей в одной вьюхе и ты задумался о получившейся портянке - "что то пошло не так".
     */
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
