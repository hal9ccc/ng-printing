'use strict';

angular.module('ngPrintingApp')
.directive('vks-doc', function () {
    return {
        replace: true,
        scope:   {
            type: '=type',
            data: '=data'
        },
        link:    function postLink(scope, element, attrs) {
            element.text('this is the mydoc directive');
        }
    };
});
