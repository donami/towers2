import MeModule from './me';
var sinon = require('sinon');


describe('Me', () => {
  let $rootScope, $state, $location, $componentController, $compile, $httpBackend;

  beforeEach(window.module(MeModule));
  // beforeEach(window.module('templates'));

  beforeEach(() => {
    localStorage.clear();
  });

  beforeEach(inject(($injector) => {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Module', () => {
    it('state name to be me.main', () => {
      $location.url('/');
      $rootScope.$digest();

      expect($state.current.name).to.eq('me.main');
    });
  });

  describe('Controller', () => {
    let controller, apiService, deferred, deferredtwo, q, scope;

    beforeEach(inject(($q) => {
      q = $q;

      scope = $rootScope.$new();
      apiService = {
        getClaims: function() {
          deferred = $q.defer();
          return deferred.promise;
        },
        getLatestClaimedTower: function() {
          deferredtwo = $q.defer();
          return deferredtwo.promise;
        }
      };

      controller = $componentController('me', {
        $scope: scope,
        MeFactory: apiService
      });
    }));

    beforeEach(() => {
      $httpBackend.whenGET('/api/tower/all').respond([]);
      // $httpBackend.expectGET('/api/tower/all');

    });

    it('has a claimedTowers property', () => {
      expect(controller).to.have.property('claimedTowers');
    });

    it('has a state property', () => {
      expect(controller).to.have.property('state');
    });

    it('should call getClaims on MeFactory', () => {
      let spy = sinon.spy(controller.MeFactory, 'getClaims');
      controller.init();
      expect(spy.called).to.be.true;
    });

    it('should call getLatestClaimedTower on MeFactory', () => {
      let spy = sinon.spy(controller.MeFactory, 'getLatestClaimedTower');
      controller.init();
      expect(spy.called).to.be.true;
    });

    it('should update claimedTowers property', () => {
      deferred.resolve({
        data: [
          {"tower_id":"70","formatted_address":"Blasius Königsgatan 31, 372 35 Ronneby, Sweden","claimed_on":"2015-10-23T16:03:57Z","geld_collected":"23.300000","geld_bonus":"0.520000"},
          {"tower_id":"30","formatted_address":"Serpentinvägen 21, 372 31 Ronneby, Sweden","claimed_on":"2015-10-24T05:53:01Z","geld_collected":"48.740000","geld_bonus":"0.000000"},
          {"tower_id":"88","formatted_address":"Stationsgatan 3, 681 30 Kristinehamn, Sweden","claimed_on":"2015-10-24T12:52:40Z","geld_collected":"276.770000","geld_bonus":"0.350000"}
        ]
      });

      scope.$root.$digest();
      $httpBackend.flush();

      expect(controller.claimedTowers).not.to.be.empty;
    });

    it('should expect claimedTowers to be empty if no towers are claimed', () => {
      deferred.resolve({
        data: []
      });

      scope.$root.$digest();

      expect(controller.claimedTowers).to.be.empty;
    });

  });

  describe('View', () => {
    let scope, template;

    beforeEach(() => {
      $httpBackend.whenGET('/api/me').respond([]);
      // $httpBackend.expectGET('/api/me');
      $httpBackend.whenGET('/api/me/latest-claim').respond([]);
      // $httpBackend.expectGET('/api/me/latest-claim');

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
