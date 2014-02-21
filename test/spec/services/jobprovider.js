'use strict';

describe('Service: jobProvider', function () {

  // load the service's module
  beforeEach(module('ngPrintingApp'));

  // instantiate service
  var jobProvider;
  beforeEach(inject(function (_jobProvider_) {
    jobProvider = _jobProvider_;
  }));

  it('should do something', function () {
    expect(!!jobProvider).toBe(true);
  });

});
