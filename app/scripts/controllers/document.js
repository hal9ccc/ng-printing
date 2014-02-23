'use strict';

angular.module('ngPrintingApp')
.controller('DocumentCtrl', function ($scope, $http, $templateCache, jobProvider) {

  $scope.$on('doRefresh', function() {
    $scope.jobNr   = jobProvider.jobNr();
    $scope.jobData = jobProvider.data();
  });
});


