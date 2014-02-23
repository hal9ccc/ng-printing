'use strict';

describe('Directive: mydoc', function () {

  // load the directive's module
  beforeEach(module('ngPrintingApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mydoc></mydoc>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mydoc directive');
  }));
});
