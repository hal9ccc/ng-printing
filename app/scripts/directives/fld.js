'use strict';

angular.module('ngPrintingApp')
    .directive('fld', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                label: '=label',
                value: '=value'
            },
            templateUrl: 'templates/fld.html'
        };
    });
