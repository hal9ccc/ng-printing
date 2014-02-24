'use strict';

describe('Directive: datamatrix', function () {

  // load the directive's module
  beforeEach(module('ngPrintingApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<datamatrix></datamatrix>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the datamatrix directive');
  }));
});
