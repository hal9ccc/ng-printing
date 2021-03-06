'use strict';

angular.module('ngPrintingApp')
  .provider('jobProvider', function () {

    /*
    ** Dieses Singleton-Objekt dient als Vermittler zwischen Navbar, Refresh-Timer und Dokumentenanzeige
    **
    ** Es speichert außerdem alle bisher geladenen Jobs
    */

    var jobNr       = 1;
    var firstJobNr  = 1;
    var lastJobNr   = 1;
    var jobs        = [];
    var status      = undefined;

    // Private constructor
    function JobProvider($injector) {

      var self = this;

      this.$rootScope   = $injector.get('$rootScope');
      this.$http        = $injector.get('$http');
      this.$location    = $injector.get('$location');

      this.jobNr        = function ()   { return jobNr;        };
      this.data         = function ()   { return jobs[jobNr];  };
      this.first        = function ()   { return this.setJobId(firstJobNr); };
      this.prev         = function ()   { return this.setJobId(--jobNr);    };
      this.next         = function ()   { return this.setJobId(++jobNr);    };
      this.last         = function ()   { return this.setJobId(lastJobNr);  };

      this.setLastJobNr = function (n)  { lastJobNr = n;  this.validate(); this.broadcastRefresh(); };
      this.setFirstJobNr= function (n)  { firstJobNr = n; this.validate(); this.broadcastRefresh(); };


      this.setJobId     = function (n)  {
        jobNr = n;
        this.validate();
        this.loadJob();
        this.broadcastRefresh();
      };

      this.validate= function() {
        if (jobNr < firstJobNr)   jobNr = firstJobNr;
        if (jobNr > lastJobNr)    jobNr = lastJobNr;
        if (!jobNr && firstJobNr) jobNr = firstJobNr;
        if (!jobNr && lastJobNr)  jobNr = lastJobNr;
      };

      this.loadJob= function() {
        if (!this.data()) {
          this.$http.get('jobs/job-'+jobNr+'.json')
            .success(function(data, status, headers, config) {
              self.setData(data || "empty", status);
            })
            .error(function(data, status, headers, config) {
              self.setData(data || "Request failed", status);
            })
        };
      }

      this.broadcastRefresh = function() {
        this.validate();
        this.$rootScope.$broadcast('doRefresh');
        this.$location.path('/job/'+jobNr)
      };

      this.setData = function (data, numStatus) {
        jobs[jobNr] = data;
        status = numStatus;
        this.broadcastRefresh();
      };

      this.$http.get('job.json').success(function(data) {
        self.setLastJobNr(data.nr);
        self.setJobId(data.nr);
      });
    }

    // Public API for configuration
    //this.setJobId = function (n) {
    //  jobNr = n;
    //};

    // Method for instantiating
    this.$get = function ($injector) {
      return new JobProvider($injector);
    };
  });
