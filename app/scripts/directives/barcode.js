'use strict';

angular.module('ngPrintingApp')
    .directive('datamatrix', function () {
        return {
            template: '<div>333</div>',
            restrict: 'EA',
            link: function postLink(scope, element, attrs) {
                var btype     = attrs.type     || 'code39';
                var renderer  = attrs.renderer || 'svg';
                var quietZone = false;
                var t = element[0] ? element[0].innerText : '';

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

                angular.element(element).barcode(attrs.value, btype, settings);
            }
        };
    });
