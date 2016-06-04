'use strict';
const _ = require('underscore');

/*
    При фокусироввке на Input поле подсказывает подсказку.
    Если поле имеет  данные в "классе - ошибки",  не показывает подсказку.
 */

module.exports = Marionette.Behavior.extend({

    events() {
        let inputs = _.keys(this._behaviorState.fields);
        let ui = _.map(inputs, (value) => {return '@ui.' + value;});
        ui = ui.join(',');

        let eventsHash = {};
        eventsHash[`focus ${ui}`] = '_inputFocusHandler';
        eventsHash[`blur ${ui}`] = '_inputBlurHandler';

        return eventsHash;
    },

    initialize() {

        this._behaviorState = {};
        this._behaviorState.hintEl = this.options.hintEl || '.js-form-field-hint'; // куда выводить подсказку
        this._behaviorState.errorEl = this.options.errorEl || '.js-form-field-error'; // соглашение о классе ошибки
        this._behaviorState.fields = this.options.fields;
    },

    /**
     * Показываем подсказку при focus на input
     * @param event
     * @private
     */
    _inputFocusHandler(event) {
        const name = event.currentTarget.name;
        this.ui[name].siblings(this._behaviorState.hintEl).html(this._behaviorState.fields[name]);
        // подсказка есть всегда, но если  есть ошибка, то подсказку нужно скрыть и показать позже, когда ошибка уйдет
        if (this.ui[name].siblings(this._behaviorState.errorEl).html()) {
            this.ui[name].siblings(this._behaviorState.hintEl).hide();
        }
    },

    /**
     * Убираем подсказку при blur на input
     * @param event
     * @private
     */
    _inputBlurHandler(event) {
        const name = event.currentTarget.name;
        this.ui[name].siblings(this._behaviorState.hintEl).html('');
    }
});
