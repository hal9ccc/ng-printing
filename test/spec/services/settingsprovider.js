'use strict';

describe('Service: settingsProvider', function () {

  // load the service's module
  beforeEach(module('ngPrintingApp'));

  // instantiate service
  var settingsProvider;
  beforeEach(inject(function (_settingsProvider_) {
    settingsProvider = _settingsProvider_;
  }));

  it('should do something', function () {
    expect(!!settingsProvider).toBe(true);
  });

});
