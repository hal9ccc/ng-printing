'use strict';

angular.module('ngPrintingApp')
.directive('ngpFormGroup', function () {
    return {
        restrict: 'EA',
        scope:    {
            name:  '=name',
            label: '=label',
            value: '=value'
        },
        template: '<div class="form-group">' +
                  '<label class="col-xs-2 control-label" for="input-{{name}}">{{label}}</label>' +
                  '<span class="col-xs-10"><p id="input-{{name}}" class="form-control-static">{{value}}</span>' +
                  '</div>' +
        ''
    };
});
