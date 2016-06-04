'use strict';

// Get all behaviours

const Behaviours = {
    oneWayBinding: require('./oneWayBinding'), // one way data binding, from model to view
    inputValidate: require('./inputValidate'), // behaviour on  this.model.event 'invalid'
    inputHint: require('./inputHint') // behaviour on  this.model.event 'invalid'
};

Marionette.Behaviors.behaviorsLookup = function() {
    return Behaviours;
};