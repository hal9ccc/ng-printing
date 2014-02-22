'use strict';

angular.module('ngPrintingApp')
  .provider('jobProvider', function () {

    /*
    ** Dieses Singleton-Objekt dient als Vermittler zwischen Navbar, Refresh-Timer und Dokumentenanzeige
    **
    ** Es speichert außerdem alle bisher geladenen Jobs
    */

    var jobNr = 1;
    var firstJobNr = 1;
    var lastJobNr = 1;
    var jobs = [];

    // Private constructor
    function JobProvider($injector) {
      this.rScope       = $injector.get('$rootScope');
      this.setJobNr     = function (n)  { jobNr = n;              this.broadcastRefresh(); };
      this.setLastJobNr = function (n)  { lastJobNr = n;          this.broadcastRefresh(); };
      this.first        = function ()   { jobNr =  firstJobNr;    this.broadcastRefresh(); };
      this.prev         = function ()   { jobNr--;                this.broadcastRefresh(); };
      this.next         = function ()   { jobNr++;                this.broadcastRefresh(); };
      this.last         = function ()   { jobNr =  lastJobNr;     this.broadcastRefresh(); };

      this.jobNr        = function ()   { return jobNr; };
      this.data         = function ()   { return jobs[jobNr]; };

      this.validate= function() {
        if (jobNr < firstJobNr)   jobNr = firstJobNr;
        if (jobNr > lastJobNr)    jobNr = lastJobNr;
        if (!jobNr && firstJobNr) jobNr = firstJobNr;
        if (!jobNr && lastJobNr)  jobNr = lastJobNr;
      };

      this.broadcastRefresh = function() {
        this.validate();
        this.rScope.$broadcast('doRefresh');
      };

      this.setData = function (data, status) {
        jobs[jobNr] = data;
        status = status;
        this.broadcastRefresh();
      };

    }

    // Public API for configuration
    this.setJobNr = function (n) {
      jobNr = n;
    };

    // Method for instantiating
    this.$get = function ($injector) {
      return new JobProvider($injector);
    };
  });
