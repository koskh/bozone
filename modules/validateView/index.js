'use strict';

const ValidateView = require('./view/index.view');
const ValidateModel = require('./model/index.model');

var validateView = new ValidateView({
    el: '#validateView',
    model: new ValidateModel()
});

validateView.render();
