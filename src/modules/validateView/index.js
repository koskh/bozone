'use strict';

const ValidateView = require('./view/index.js');
const ValidateModel = require('./model/index.js');

var validateView = new ValidateView({
    el: '#validateView',
    model: new ValidateModel()
});

validateView.render();
