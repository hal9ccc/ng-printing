'use strict';

angular.module('ngPrintingApp')
.controller('DocumentCtrl', function ($scope, $http, $templateCache, jobProvider) {
  $scope.$on('doRefresh', function() {
    $scope.data = jobService.jobData;
  });

  $scope.orderProp = 'age';
});


