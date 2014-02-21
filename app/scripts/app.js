'use strict';

var printingApp = angular.module('printingApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'app.scripts.controllers',
  'app.views',
  'app.templates'
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

.factory('jobService', function($rootScope) {
    var jobService = {};

    jobService.message = '';
    jobService.jobNr = 1;
    jobService.firstJobNr = 1;
    jobService.lastJobNr = 2;
    jobService.jobs = [];

    jobService.first = function() { this.jobNr =  this.firstJobNr; this.fetch();  }
    jobService.prev  = function() { this.jobNr++; this.fetch();  }
    jobService.next  = function() { this.jobNr--; this.fetch();  }
    jobService.last  = function() { this.jobNr =  this.lastJobNr; this.fetch();  }

    jobService.broadcastRefresh = function() { $rootScope.$broadcast('doRefresh'); }

    jobService.fetch = function() {

        this.jobData = this.jobs[this.jobNr];

        if (this.jobData) {
            this.broadcastRefresh();
        }
        else {
            $http.get('jobs/job-'+this.jobNr+'.json')
                .success(function(data, status) {
                    this.status = status;
                    this.jobData = this.jobs[this.jobNr] = data;
                    this.broadcastRefresh();
                })
                .error(function(data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        }
    }

    return jobService;
});

