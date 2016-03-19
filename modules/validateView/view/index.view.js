'use strict';

var template = require('../template/index.ejs');

module.exports = Marionette.ItemView.extend({
    template: template,

    behaviors: {
        oneWayBinding: {},
        modelValidate: {}
    },

    ui: {
        'name': '[name="name"]',
        'surname': '[name="surname"]',
        'email': '[name="email"]'
    },

    events: {
        'change @ui.name,@ui.surname,@ui.email': '_inputFormHandler'
    },

    _inputFormHandler(e) {

        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        // устанавливаем значения в модель, проверяя сразу все поля
        this.model.set(name, value, {validate: true, setOnError: true});

        //валидируем только одно поле и решаем, устанавливать в модель или нет.
        //this.model.set(name, value, {validate: true, checkOnly:[name], setOnError: true, forceAllRules: true});
    }
});
