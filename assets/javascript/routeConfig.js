const mathsApp = angular.module('mathsApp');

mathsApp.config(['$routeProvider', "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'javascript/partials/clubs.html'
        }).
        when('/club/:number', {
            templateUrl: 'javascript/partials/club.html'
        }).
        otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);
