'use strict';

angular.module('ngPrintingApp')
  .directive('mydoc', function () {
    return {
      template: '<div>Trallala</div>',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        element.text('this is the mydoc directive');
      }
    };
  });
