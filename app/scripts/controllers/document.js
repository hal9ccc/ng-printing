printingApp.controller('DocumentCtrl', function ($scope, $http, $templateCache, jobService) {

    $scope.$on('doRefresh', function() {
        $scope.data = jobService.jobData;
    });

    $scope.orderProp = 'age';
});


