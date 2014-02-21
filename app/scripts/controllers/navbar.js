'use strict';

angular.module('ngPrintingApp')
.controller('NavbarCtrl', function ($scope, $http, $templateCache, jobProvider) {

  $scope.prev = function() { jobProvider.prev(); }
  $scope.next = function() { jobProvider.next() }

  $scope.$on('doRefresh', function() { })

  $http.get('job.json').success(function(data) {
    jobProvider.setJobNr(data.nr);
    jobProvider.last();
  });

  $scope.fetch = function() {
    $http.get('jobs/job-'+jobProvider.jobNr+'.json')
      .success(function(data, statusCode, headers, config) {
        status = statusCode;
        jobData = jobs[jobNr] = data;
        this.broadcastRefresh();
      })
      .error(function(data, statusCode, headers, config) {
        status = statusCode;
        jobData = jobs[jobNr] = data || "Request failed";
        this.broadcastRefresh();
      });
  }


  $scope.orderProp = 'age';
});


