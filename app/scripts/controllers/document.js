'use strict';

angular.module('ngPrintingApp')
.controller('DocumentCtrl', function ($scope, $http, $templateCache, jobProvider) {

  $http.get('job.json').success(function(data) {
    jobProvider.setLastJobNr(data.nr);
    jobProvider.setJobNr(data.nr);
  });

  $scope.$on('doRefresh', function() {
    $scope.jobNr   = jobProvider.jobNr();
    $scope.jobData = jobProvider.data();

    if (!$scope.jobData) {
      $http.get('jobs/job-'+$scope.jobNr+'.json')
        .success(function(data, status, headers, config) {
          jobProvider.setData(data || "empty", status);
        })
        .error(function(data, status, headers, config) {
          jobProvider.setData(data || "Request failed", status);
        })
    };
  });
});


