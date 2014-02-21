'use strict';

angular.module('ngPrintingApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])

.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/document', {
            templateUrl: 'views/document.html',
            controller: 'DocumentCtrl'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        })
        .when('/settings', {
          templateUrl: 'views/settings.html',
          controller: 'SettingsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
})

.directive('vda', function() { return { templateUrl: 'templates/label-vda.html' }; })
.directive('uwa', function() { return { templateUrl: 'templates/label-uwa.html' }; })
.directive('hu',  function() { return { templateUrl: 'templates/label-hu.html'  }; })

//.run(function ($rootScope, $http, jobProvider) {
//  $rootScope.someData = {message: "hello"};
//});
