import AchievementModule from './achievement';

var sinon = require('sinon');

describe('Achievement', () => {
  let $rootScope, $state, $location, $componentController, $compile, $httpBackend, $q, fakeAchievementFactory, deferred;

  beforeEach(window.module(AchievementModule));
  // beforeEach(window.module('templates'));

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
    fakeAchievementFactory = {
      getAchievements: () => {
        deferred = $q.defer();
        return deferred.promise;
      },
      refresh: () => {
        deferred = $q.defer();
        return deferred.promise;
      }
    };
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
      controller = $componentController('achievements', {
        $scope: $rootScope.$new(),
        AchievementFactory: fakeAchievementFactory,
      });
    });

    it('should have a init method', () => {
      expect(controller.init).to.be.a('function');
    });

    it('should have a state property', () => {
      expect(controller).to.have.property('state');
    })

    it('should load achievements', () => {
      let response = { data: [{"id":"STREAK_5","title":"Claim a tower for 5 consecutive days","type":"STREAK_X","value":"5","createdAt":"2016-10-14 20:47:16"},{"id":"STREAK_20","title":"Claim a tower for 20 consecutive days","type":"STREAK_X","value":"20","createdAt":"2016-10-14 20:47:16"},{"id":"STREAK_2","title":"Claim a tower for 2 consecutive days","type":"STREAK_X","value":"2","createdAt":"2016-10-14 20:47:16"},{"id":"STREAK_10","title":"Claim a tower for 10 consecutive days","type":"STREAK_X","value":"10","createdAt":"2016-10-14 20:44:54"},{"id":"BUILDER_10","title":"Build 10 towers","type":"BUILD_X_TOWERS","value":"10","createdAt":"2016-10-14 18:15:14"},{"id":"VISITOR_25","title":"Visit 25 different towers","type":"VISIT_X_DIFFERENT_TOWERS","value":"25","createdAt":"2016-10-14 18:15:14"},{"id":"VISITOR_10","title":"Visit 10 different towers","type":"VISIT_X_DIFFERENT_TOWERS","value":"10","createdAt":"2016-10-14 18:15:14"},{"id":"ON_HALL_OF_FAME","title":"Be awarded a spot on the Hall of Fame","type":"ON_HALL_OF_FAME","value":null,"createdAt":"2016-10-14 18:15:14"},{"id":"FULL_MOON_25","title":"Claim a tower within 25 minutes of a new moon","type":"FULL_MOON_X","value":"25","createdAt":"2016-10-14 18:15:14"},{"id":"FULL_MOON_10","title":"Claim a tower within 10 minutes of a new moon","type":"FULL_MOON_X","value":"10","createdAt":"2016-10-14 18:15:14"},{"id":"CLAIM_50_TOWERS","title":"Claim 50 towers","type":"CLAIM_X_TOWERS","value":"50","createdAt":"2016-10-14 18:15:14"},{"id":"CLAIM_100_TOWERS","title":"Claim 100 towers","type":"CLAIM_X_TOWERS","value":"100","createdAt":"2016-10-14 18:15:14"},{"id":"BUILDER_30","title":"Build 30 towers","type":"BUILD_X_TOWERS","value":"30","createdAt":"2016-10-14 18:15:14"},{"id":"BUILDER_20","title":"Build 20 towers","type":"BUILD_X_TOWERS","value":"20","createdAt":"2016-10-14 18:15:14"},{"id":"VISITOR_50","title":"Visit 50 different towers","type":"VISIT_X_DIFFERENT_TOWERS","value":"50","createdAt":"2016-10-14 18:15:14"},{"id":"BUILD_100_TOWERS","title":"Build 100 towers","type":"BUILD_X_TOWERS","value":"100","createdAt":null}]};

      controller.getAchievements();

      deferred.resolve(response);
      $rootScope.$digest();

      expect(controller.achievements).not.to.be.empty;
    });

    it('should refresh achievements, and show toastr if new achievements earned', () => {
      let spy = sinon.spy(controller.toastr, 'success');
      // Length: 15
      let response = { data: [{"id":"CLAIM_100_TOWERS","title":"Claim 100 towers","value":100,"achieved":true},{"id":"CLAIM_50_TOWERS","title":"Claim 50 towers","value":50,"achieved":true},{"id":"BUILDER_10","title":"Builder 10","value":10,"achieved":true},{"id":"BUILDER_20","title":"Builder 20","value":20,"achieved":true},{"id":"BUILDER_30","title":"Builder 30","value":30,"achieved":true},{"id":"ON_HALL_OF_FAME","title":"Be part of the Hall of Fame","value":null,"achieved":true},{"id":"FULL_MOON_10","title":"Full Moon 10","value":10,"achieved":true},{"id":"FULL_MOON_25","title":"Full Moon 25","value":25,"achieved":true},{"id":"VISITOR_10","title":"Visitor 10","value":10,"achieved":true},{"id":"VISITOR_25","title":"Visitor 25","value":25,"achieved":true},{"id":"VISITOR_50","title":"Visitor 50","value":50,"achieved":true},{"id":"STREAK_2","title":"Streak 2","value":2,"achieved":true},{"id":"STREAK_5","title":"Streak 5","value":5,"achieved":true},{"id":"STREAK_10","title":"Streak 10","value":10,"achieved":true},{"id":"STREAK_20","title":"Streak 20","value":20,"achieved":true}]};

      // Length: 13
      controller.achievements = [{"id":"STREAK_10","title":"Claim a tower for 10 consecutive days","type":"STREAK_X","value":"10","createdAt":"2016-10-14 20:44:54"},{"id":"BUILDER_10","title":"Build 10 towers","type":"BUILD_X_TOWERS","value":"10","createdAt":"2016-10-14 18:15:14"},{"id":"VISITOR_25","title":"Visit 25 different towers","type":"VISIT_X_DIFFERENT_TOWERS","value":"25","createdAt":"2016-10-14 18:15:14"},{"id":"VISITOR_10","title":"Visit 10 different towers","type":"VISIT_X_DIFFERENT_TOWERS","value":"10","createdAt":"2016-10-14 18:15:14"},{"id":"ON_HALL_OF_FAME","title":"Be awarded a spot on the Hall of Fame","type":"ON_HALL_OF_FAME","value":null,"createdAt":"2016-10-14 18:15:14"},{"id":"FULL_MOON_25","title":"Claim a tower within 25 minutes of a new moon","type":"FULL_MOON_X","value":"25","createdAt":"2016-10-14 18:15:14"},{"id":"FULL_MOON_10","title":"Claim a tower within 10 minutes of a new moon","type":"FULL_MOON_X","value":"10","createdAt":"2016-10-14 18:15:14"},{"id":"CLAIM_50_TOWERS","title":"Claim 50 towers","type":"CLAIM_X_TOWERS","value":"50","createdAt":"2016-10-14 18:15:14"},{"id":"CLAIM_100_TOWERS","title":"Claim 100 towers","type":"CLAIM_X_TOWERS","value":"100","createdAt":"2016-10-14 18:15:14"},{"id":"BUILDER_30","title":"Build 30 towers","type":"BUILD_X_TOWERS","value":"30","createdAt":"2016-10-14 18:15:14"},{"id":"BUILDER_20","title":"Build 20 towers","type":"BUILD_X_TOWERS","value":"20","createdAt":"2016-10-14 18:15:14"},{"id":"VISITOR_50","title":"Visit 50 different towers","type":"VISIT_X_DIFFERENT_TOWERS","value":"50","createdAt":"2016-10-14 18:15:14"},{"id":"BUILD_100_TOWERS","title":"Build 100 towers","type":"BUILD_X_TOWERS","value":"100","createdAt":null}];

      controller.refresh();

      deferred.resolve(response);
      $rootScope.$digest();

      expect(spy.called).to.be.true;
    });

    it('should refresh achievements, and if no new achievements earned, toastr should not be displayed', () => {
      let spy = sinon.spy(controller.toastr, 'success');
      // Length: 15
      let response = { data: [{"id":"CLAIM_100_TOWERS","title":"Claim 100 towers","value":100,"achieved":true},{"id":"CLAIM_50_TOWERS","title":"Claim 50 towers","value":50,"achieved":true},{"id":"BUILDER_10","title":"Builder 10","value":10,"achieved":true},{"id":"BUILDER_20","title":"Builder 20","value":20,"achieved":true},{"id":"BUILDER_30","title":"Builder 30","value":30,"achieved":true},{"id":"ON_HALL_OF_FAME","title":"Be part of the Hall of Fame","value":null,"achieved":true},{"id":"FULL_MOON_10","title":"Full Moon 10","value":10,"achieved":true},{"id":"FULL_MOON_25","title":"Full Moon 25","value":25,"achieved":true},{"id":"VISITOR_10","title":"Visitor 10","value":10,"achieved":true},{"id":"VISITOR_25","title":"Visitor 25","value":25,"achieved":true},{"id":"VISITOR_50","title":"Visitor 50","value":50,"achieved":true},{"id":"STREAK_2","title":"Streak 2","value":2,"achieved":true},{"id":"STREAK_5","title":"Streak 5","value":5,"achieved":true},{"id":"STREAK_10","title":"Streak 10","value":10,"achieved":true},{"id":"STREAK_20","title":"Streak 20","value":20,"achieved":true}]};

      // Length: 15
      controller.achievements = [{"id":"CLAIM_100_TOWERS","title":"Claim 100 towers","value":100,"achieved":true},{"id":"CLAIM_50_TOWERS","title":"Claim 50 towers","value":50,"achieved":true},{"id":"BUILDER_10","title":"Builder 10","value":10,"achieved":true},{"id":"BUILDER_20","title":"Builder 20","value":20,"achieved":true},{"id":"BUILDER_30","title":"Builder 30","value":30,"achieved":true},{"id":"ON_HALL_OF_FAME","title":"Be part of the Hall of Fame","value":null,"achieved":true},{"id":"FULL_MOON_10","title":"Full Moon 10","value":10,"achieved":true},{"id":"FULL_MOON_25","title":"Full Moon 25","value":25,"achieved":true},{"id":"VISITOR_10","title":"Visitor 10","value":10,"achieved":true},{"id":"VISITOR_25","title":"Visitor 25","value":25,"achieved":true},{"id":"VISITOR_50","title":"Visitor 50","value":50,"achieved":true},{"id":"STREAK_2","title":"Streak 2","value":2,"achieved":true},{"id":"STREAK_5","title":"Streak 5","value":5,"achieved":true},{"id":"STREAK_10","title":"Streak 10","value":10,"achieved":true},{"id":"STREAK_20","title":"Streak 20","value":20,"achieved":true}];

      controller.refresh();

      deferred.resolve(response);
      $rootScope.$digest();

      expect(spy.called).to.be.false;
    });

  });
});
