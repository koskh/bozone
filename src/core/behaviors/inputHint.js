'use strict';
const _ = require('underscore');

/*
    При фокусироввке на Input поле подсказывает подсказку
 */

module.exports = Marionette.Behavior.extend({

    events() {
        let inputs = _.keys(this._behaviorState.hints);
        let ui = _.map(inputs, (value) => {return '@ui.' + value;});
        ui = ui.join(',');

        let eventsHash = {};
        eventsHash[`focus ${ui}`] = '_inputFocusHandler';
        eventsHash[`blur ${ui}`] = '_inputBlurHandler';

        return eventsHash;
    },

    initialize() {
        //console.log('Behaver initialize.' + this.options);
        this._behaviorState = {};
        this._behaviorState.hintEl = this.options.hintEl || '.js-form-field-hint'; // куда выводить подсказку
        this._behaviorState.errorEl = this.options.errorEl || '.js-form-field-error'; // соглашение о классе ошибки
        this._behaviorState.hints = this.options.hints;
    },

    /**
     * Показываем подсказку при focus на input
     * @param event
     * @private
     */
    _inputFocusHandler(event) {
        const name = event.currentTarget.name;
        this.ui[name].siblings(this._behaviorState.hintEl).html(this._behaviorState.hints[name]);
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
