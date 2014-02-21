'use strict';

angular.module('labelApp')
    .controller('MainCtrl', function ($scope, $http, $templateCache) {
        $http.get('job.json').success(function(data) {
            $scope.jobNr = data.nr;
            $scope.jobs = [];
            $scope.data = undefined;

            $scope.fetch = function() {
                $scope.code = null;
                $scope.response = null;

                $http.get('jobs/job-'+$scope.jobNr+'.json').
                    success(function(data, status) {
                        $scope.status = status;
                        $scope.data = data;
                    }).
                    error(function(data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
            };
        });

        $scope.orderProp = 'age';
  });
