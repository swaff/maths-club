require('angular');
require('angular-route');

// create the module
angular.module('mathsApp', ['ngRoute']);

require('./services');
require('./directives');
require('./routeConfig');
require('./controllers');

