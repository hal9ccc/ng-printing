'use strict';

angular.module('ngPrintingApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        //$locationProvider.html5Mode(true);
    })

    /*    .directive('vda', function () {
     return { templateUrl: 'templates/doc-vda.html' };
     })
     .directive('uwa', function () {
     return { templateUrl: 'templates/doc-uwa.html' };
     })
     .directive('hu', function () {
     return { templateUrl: 'templates/doc-hu.html'  };
     })*/

    .run(function ($rootScope, $http, jobProvider) {
        //$rootScope.someData = {message: "hello"};

        //generateBarcode();

    });


function generateBarcode(pValue, pType, pRenderer) {
    var value = pValue || 'undefined';
    var btype = pType || 'code39';
    var renderer = pRenderer || 'css';
    var quietZone = false;

    var settings = {
        output: renderer,
        bgColor: "#FFFFFF",
        color: "#000000",
        barWidth: 1,
        barHeight: 50,
        moduleSize: 5,
        posX: 10,
        posY: 20,
        addQuietZone: 1
    };
    //if ($("#rectangular").is(':checked') || $("#rectangular").attr('checked')){
    //  value = {code:value, rect: true};
    //}

    //if (renderer == 'canvas'){
    //  clearCanvas();
    //  $("#barcodeTarget").hide();
    //  $("#canvasTarget").show().barcode(value, btype, settings);
    //} else {
    //  $("#canvasTarget").hide();
    $("#barcodeTarget").html("").show().barcode(value, btype, settings);
    //}
}

function showConfig1D() {
    $('.config .barcode1D').show();
    $('.config .barcode2D').hide();
}

function showConfig2D() {
    $('.config .barcode1D').hide();
    $('.config .barcode2D').show();
}

function clearCanvas() {
    var canvas = $('#canvasTarget').get(0);
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;
    ctx.lineCap = 'butt';
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}
