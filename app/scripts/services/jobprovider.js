'use strict';

angular.module('ngPrintingApp')
  .provider('jobProvider', function () {

    /*
    ** loads and buffers data from the jobs subdirectory
    */

    var jobData = undefined;

    var message = '';
    var status = undefined;
    var jobNr = 1;
    var firstJobNr = 1;
    var lastJobNr = 2;
    var jobs = [];

    // Private constructor
    function JobProvider() {
      this.setJobNr = function (n) { jobNr = n; };
      this.data  = function() { return this.jobData; };
      this.first = function() { jobNr =  firstJobNr; this.fetch();  }
      this.prev  = function() { jobNr++; this.fetch();  }
      this.next  = function() { jobNr--; this.fetch();  }
      this.last  = function() { jobNr =  lastJobNr; this.fetch();  }

      this.broadcastRefresh = function() { $rootScope.$broadcast('doRefresh'); }

    }

    // Public API for configuration
    this.setJobNr = function (n) {
      jobNr = n;
    };

    // Method for instantiating
    this.$get = function () {
      return new JobProvider();
    };
  });
