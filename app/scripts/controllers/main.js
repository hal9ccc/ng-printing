
printingApp.controller('MainCtrl', function ($scope, $http, $templateCache, jobService) {

    $http.get('job.json').success(function(data) {
        jobService.lastJobNr = data.nr;
        jobService.last();
    });

});
