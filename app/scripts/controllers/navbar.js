'use strict';

printingApp.controller('NavbarCtrl', function ($scope, $http, $templateCache, jobService) {

    $scope.prev = function() { jobService.prev(); }
    $scope.next = function() { jobService.next() }

    $scope.$on('doRefresh', function() {

    })

    $scope.orderProp = 'age';
});


