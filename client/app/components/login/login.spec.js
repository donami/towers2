import LoginModule from './login';

var sinon = require('sinon');

describe('Login', () => {
  let $rootScope, $state, $location, $componentController, $compile, $httpBackend, $q, deferred, fakeAuthService, authed;

  beforeEach(window.module(LoginModule));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $q = $injector.get('$q');
  }));

  beforeEach(() => {
    localStorage.clear();

    fakeAuthService = new (function() {
      this.authed = true;
      this.getAuthed = function() {
        return this.authed;
      };
      this.setAuthed = function(authed) {
        this.authed = authed;
      };
      this.auth = function() {
        deferred = $q.defer();
        return deferred.promise;
      };
    });

  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Module', () => {
    // code
  });


  describe('Controller', () => {
    let controller;

    beforeEach(() => {
      controller = $componentController('login', {
        $scope: $rootScope.$new(),
        AuthService: fakeAuthService
      });
    });

    it('should redirect user if already authed', () => {
      let spy = sinon.spy($state, 'go');
      controller.AuthService.setAuthed(true);
      controller.redirectIfAuthed();

      expect(spy.called).to.be.true;
    });

    it('should not redirect user if not authed', () => {
      let spy = sinon.spy($state, 'go');
      controller.AuthService.setAuthed(false);
      controller.redirectIfAuthed();

      expect(spy.called).not.to.be.true;
    });

    it('should send authed true to AuthService if authentication succeded', () => {
      let response = {data: {"playerId":"tN5p7SSvzb30fIRtA6tp2aQn0Y9YTOZQ4k3MFjw3t/I=","alias":"David","lastClaimedTowerId":386}};
      let spy = sinon.spy(controller.AuthService, 'setAuthed');

      controller.submitApiKey();
      deferred.resolve(response);
      $rootScope.$digest();

      expect(spy.called).to.be.true;
    });

    it('should show a toastr message if authed fail', () => {
      let spy = sinon.spy(controller.toastr, 'error');

      controller.submitApiKey();
      deferred.reject('Invalid credentials');
      $rootScope.$digest();

      expect(spy.called).to.be.true;
    });

  });
});
