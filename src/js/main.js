'use strict'

// Application object available globally

global.app = {}
var app = global.app

// Including npm modules
var $ = require('jquery')
global.jQuery = global.$ = $
global.Tether = require('tether')
global.Popper = require('popper.js')
global.bootstrap = require('bootstrap')
//global.Popper = require('popper.js')


// Including app modules
var dom = require('./modules/dom')
var actions = require('./modules/actions')

// Initializing app modules
$(document).ready(function() {
  app.dom = dom();
  app.actions = actions(app.dom);
});
