require('angular');
require('angular-route');

// create the module
angular.module('mathsApp', ['ngRoute']);

require('./services');
require('./routeConfig');
require('./controllers');

