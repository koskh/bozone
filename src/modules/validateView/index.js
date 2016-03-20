'use strict';

const ValidateView = require('./view/index.view.js');
const ValidateModel = require('./model/index.model.js');

var validateView = new ValidateView({
    el: '#validateView',
    model: new ValidateModel()
});

validateView.render();
