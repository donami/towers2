import MeModule from './me';

describe('Me', () => {
  let $rootScope, $state, $location, $componentController, $compile, $httpBackend;

  beforeEach(window.module(MeModule));
  beforeEach(window.module('templates'));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('Module', () => {
    it('state name to be me.main', () => {
      $location.url('/');
      $rootScope.$digest();

      expect($state.current.name).to.eq('me.main');
    });
  });

  describe('Controller', () => {
    let controller;

    beforeEach(() => {
      controller = $componentController('me', {
        $scope: $rootScope.$new(),
      });
    });

    it('has a claimedTowers property', () => {
      expect(controller).to.have.property('claimedTowers');
    });

    it('has a state property', () => {
      expect(controller).to.have.property('state');
    });

  });

  describe('View', () => {
    let scope, template;

    beforeEach(() => {
      $httpBackend.whenGET('/api/me').respond([]);
      $httpBackend.expectGET('/api/me');
      $httpBackend.whenGET('/api/me/latest-claim').respond([]);
      $httpBackend.expectGET('/api/me/latest-claim');
      $httpBackend.whenGET('/api/tower/all').respond([]);
      $httpBackend.expectGET('/api/tower/all');

      scope = $rootScope.$new();
      template = $compile('<me></me>')(scope);
      scope.$apply();

      $httpBackend.flush();
    });

    it('has a h1 element', () => {
      assert.isAtLeast(template.find('h1').length, 1, 'it should have atleast one h1 element');
    });
  });

});
