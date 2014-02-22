'use strict';

angular.module('ngPrintingApp')
.controller('NavbarCtrl', function ($scope, $http, $templateCache, jobProvider) {

  $scope.jobNr = undefined;

  $scope.first = function() { jobProvider.first(); }
  $scope.prev  = function() { jobProvider.prev(); }
  $scope.next  = function() { jobProvider.next() }
  $scope.last  = function() { jobProvider.last() }

  $scope.$on('doRefresh', function() {
    $scope.jobNr   = jobProvider.jobNr();
    $scope.jobData = jobProvider.data();
  });

  $scope.orderProp = 'age';
});


