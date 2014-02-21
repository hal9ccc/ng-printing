'use strict';

var printingApp = angular.module('printingApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])

.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        })
        .when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'SettingsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
})

.directive('vda', function() { return { templateUrl: 'templates/label-vda.html' }; })
.directive('uwa', function() { return { templateUrl: 'templates/label-uwa.html' }; })
.directive('hu',  function() { return { templateUrl: 'templates/label-hu.html'  }; })

.factory('jobService', function($rootScope) {
    var jobService = {};

    jobService.message = '';
    jobService.jobNr = 1;
    jobService.firstJobNr = 1;
    jobService.lastJobNr = 2;
    jobService.jobs = [];

    jobService.first = function() { this.jobNr =  this.firstJobNr; this.fetch();  }
    jobService.prev  = function() { this.jobNr++; this.fetch();  }
    jobService.next  = function() { this.jobNr--; this.fetch();  }
    jobService.last  = function() { this.jobNr =  this.lastJobNr; this.fetch();  }

    jobService.broadcastRefresh = function() { $rootScope.$broadcast('doRefresh'); }

    jobService.fetch = function() {

        this.jobData = this.jobs[this.jobNr];

        if (this.jobData) {
            this.broadcastRefresh();
        }
        else {
            $http.get('jobs/job-'+this.jobNr+'.json')
                .success(function(data, status) {
                    this.status = status;
                    this.jobData = this.jobs[this.jobNr] = data;
                    this.broadcastRefresh();
                })
                .error(function(data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        }
    }

    return jobService;
});




function generateBarcode(){
  var value = $("#barcodeValue").val();
  var btype = $("input[name=btype]:checked").val();
  var renderer = $("input[name=renderer]:checked").val();
  
  var quietZone = false;
  if ($("#quietzone").is(':checked') || $("#quietzone").attr('checked')){
    quietZone = true;
  }

  var settings = {
    output:renderer,
    bgColor: $("#bgColor").val(),
    color: $("#color").val(),
    barWidth: $("#barWidth").val(),
    barHeight: $("#barHeight").val(),
    moduleSize: $("#moduleSize").val(),
    posX: $("#posX").val(),
    posY: $("#posY").val(),
    addQuietZone: $("#quietZoneSize").val()
  };
  if ($("#rectangular").is(':checked') || $("#rectangular").attr('checked')){
    value = {code:value, rect: true};
  }
  if (renderer == 'canvas'){
    clearCanvas();
    $("#barcodeTarget").hide();
    $("#canvasTarget").show().barcode(value, btype, settings);
  } else {
    $("#canvasTarget").hide();
    $("#barcodeTarget").html("").show().barcode(value, btype, settings);
  }
}
    
function showConfig1D(){
  $('.config .barcode1D').show();
  $('.config .barcode2D').hide();
}

function showConfig2D(){
  $('.config .barcode1D').hide();
  $('.config .barcode2D').show();
}

function clearCanvas(){
  var canvas = $('#canvasTarget').get(0);
  var ctx = canvas.getContext('2d');
  ctx.lineWidth = 1;
  ctx.lineCap = 'butt';
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle  = '#000000';
  ctx.clearRect (0, 0, canvas.width, canvas.height);
  ctx.strokeRect (0, 0, canvas.width, canvas.height);
}

$(function(){
  $('input[name=btype]').click(function(){
    if ($(this).attr('id') == 'datamatrix') showConfig2D(); else showConfig1D();
  });
  $('input[name=renderer]').click(function(){
    if ($(this).attr('id') == 'canvas') $('#miscCanvas').show(); else $('#miscCanvas').hide();
  });
  generateBarcode();
});
