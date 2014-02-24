'use strict';

angular.module('ngPrintingApp')
  .directive('code39', function () {
    return {
      template: '<div>333</div>',
      scope: {
        callback : '&exampleFunction',
        v1: '@pstnr',
        v2: '=pstnr',
        v3: '&pstnr'
      },      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var btype     = 'code39';
        var renderer  = 'css';
        var quietZone = false;
        var t = element[0] ? element[0].innerText : '';

        //var num = scope.$eval(attrs.x-pstnr);
        console.log('number=',num);
        scope.callback();  // calls exampleCallback()


        var num = scope.$eval(attrs.txt);

        var settings = {
          output:     renderer,
          bgColor:    "#FFFFFF",
          color:      "#000000",
          barWidth:    1,
          barHeight:  50,
          moduleSize:  5,
          posX:       10,
          posY:       20,
          addQuietZone:1
        };


        //angular.element(element).barcode(scope.$eval(attrs.directiveName));
        angular.element(element).barcode('444444444444', btype, settings);
      }
    };
  });
