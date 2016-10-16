import TowersModule from './towers';

describe('Towers', () => {
  let $rootScope, $state, $location, $componentController, $compile, $httpBackend;

  beforeEach(window.module(TowersModule));
  // beforeEach(window.module('templates'));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('Module', () => {
    it('state name to be towers', () => {
      $location.url('/towers');
      $rootScope.$digest();

      expect($state.current.name).to.eq('towers');
    });
  });

  describe('Controller', () => {
    let controller;

    beforeEach(() => {
      controller = $componentController('towers', {
        $scope: $rootScope.$new(),
      });
    });

    it('has a towers property', () => {
      expect(controller).to.have.property('towers');
    });

    it('has a init method', () => {
      expect(controller.init).to.be.a('function');
    });

  });

  describe('View', () => {
    let scope, template;

    beforeEach(() => {
      scope = $rootScope.$new();
      template = $compile('<towers></towers>')(scope);
      scope.$apply();
    });

    it('has a h1 element', () => {
      assert.isAtLeast(template.find('h1').length, 1, 'it should have atleast one h1 element');
    });

    it('should have a table', () => {
      expect(template.find('table').length).to.eq(1);
    });

  });

});
