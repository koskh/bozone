'use strict';

// Get all behaviours

const Behaviours = {
    oneWayBinding: require('./oneWayBinding'), // one way data binding, from model to view
    modelValidate: require('./modelValidate') // behaviour on  this.model.event 'invalid'
};

Marionette.Behaviors.behaviorsLookup = function() {
    return Behaviours;
};