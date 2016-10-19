import TowerModule from './tower';

describe('Tower', () => {
  let $rootScope, $state, $location, $componentController, $compile, $httpBackend, $q, deferred, fakeTowerFactory, fakeMeFactory;

  beforeEach(window.module(TowerModule));
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
    fakeTowerFactory = {
      findById: () => {
        deferred = $q.defer();
        return deferred.promise;
      }
    };

    fakeMeFactory = {
      getClaims: () => {
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
      controller = $componentController('tower', {
        $scope: $rootScope.$new(),
        TowerFactory: fakeTowerFactory,
        MeFactory: fakeMeFactory
      });
    });

    it('has a state property', () => {
      expect(controller).to.have.property('state');
    });

    it('has a init function', () => {
      expect(controller.init).to.have.a('function');
    });

    it('has a findTower function', () => {
      expect(controller.findTower).to.have.a('function');
    });

    it('has a getLog function', () => {
      expect(controller.getLog).to.have.a('function');
    });

    it('fetches tower data', () => {
      let response = { data: {"tower_id":"1063","longitude":14.874752,"latitude":56.168053,"created_on":"2016-07-16T14:12:02Z","player_id":"TS1hsYn/uLxewabCy+DD0QmbgpvovxoatQknFcdGKcY=","player_alias":"Marlund","tower_name":"Tränings torn","street_name":"Bodestorpsvägen","street_number":"7C","postal_code":"374 37","city":"Karlshamn","level1_long":"Blekinge län","level1_short":"Blekinge län","country":"Sweden","country_code":"SE","formatted_address":"Bodestorpsvägen 7C, 374 37 Karlshamn, Sweden","time_zone_id":"Europe/Stockholm","stats":{"tower_id":"1063","claim_count":1,"player_count":1,"first_claimed_on":"2016-10-15T10:29:43Z","last_claimed_on":"2016-10-15T10:29:43Z","total_geld_collected":200,"total_geld_bonus":100}}};
      controller.findTower(1063);

      deferred.resolve(response)

      $rootScope.$digest();

      expect(controller.tower.tower_id).to.eq('1063');
    });

    it('fetches the log and expect log to be empty if no claims made', () => {
      let response = {data: [{"tower_id":"70","formatted_address":"Blasius Königsgatan 31, 372 35 Ronneby, Sweden","claimed_on":"2015-10-23T16:03:57Z","geld_collected":"23.300000","geld_bonus":"0.520000"},{"tower_id":"30","formatted_address":"Serpentinvägen 21, 372 31 Ronneby, Sweden","claimed_on":"2015-10-24T05:53:01Z","geld_collected":"48.740000","geld_bonus":"0.000000"},{"tower_id":"88","formatted_address":"Stationsgatan 3, 681 30 Kristinehamn, Sweden","claimed_on":"2015-10-24T12:52:40Z","geld_collected":"276.770000","geld_bonus":"0.350000"},{"tower_id":"219","formatted_address":"LINDVALLEN SNÖTORGET 3D, 780 67 Sälen, Sweden","claimed_on":"2015-10-24T17:55:21Z","geld_collected":"2.030000","geld_bonus":"5.920000"},{"tower_id":"219","formatted_address":"LINDVALLEN SNÖTORGET 3D, 780 67 Sälen, Sweden","claimed_on":"2015-10-25T10:24:49Z","geld_collected":"0.860000","geld_bonus":"14.010000"}]};

      controller.getLog(1063);

      deferred.resolve(response);
      $rootScope.$digest();

      expect(controller.log).to.be.empty;
    });

    it('fetches the log and expect log not to be empty', () => {
      let response = {data: [{"tower_id":"70","formatted_address":"Blasius Königsgatan 31, 372 35 Ronneby, Sweden","claimed_on":"2015-10-23T16:03:57Z","geld_collected":"23.300000","geld_bonus":"0.520000"},{"tower_id":"30","formatted_address":"Serpentinvägen 21, 372 31 Ronneby, Sweden","claimed_on":"2015-10-24T05:53:01Z","geld_collected":"48.740000","geld_bonus":"0.000000"},{"tower_id":"88","formatted_address":"Stationsgatan 3, 681 30 Kristinehamn, Sweden","claimed_on":"2015-10-24T12:52:40Z","geld_collected":"276.770000","geld_bonus":"0.350000"},{"tower_id":"219","formatted_address":"LINDVALLEN SNÖTORGET 3D, 780 67 Sälen, Sweden","claimed_on":"2015-10-24T17:55:21Z","geld_collected":"2.030000","geld_bonus":"5.920000"},{"tower_id":"219","formatted_address":"LINDVALLEN SNÖTORGET 3D, 780 67 Sälen, Sweden","claimed_on":"2015-10-25T10:24:49Z","geld_collected":"0.860000","geld_bonus":"14.010000"}]};

      controller.getLog(70);

      deferred.resolve(response);
      $rootScope.$digest();

      expect(controller.log).not.to.be.empty;
    });

    it('should sort the log', () => {
      let response = {data: [{"tower_id":"70","formatted_address":"Blasius Königsgatan 31, 372 35 Ronneby, Sweden","claimed_on":"2014-10-21T16:03:57Z","geld_collected":"23.300000","geld_bonus":"0.520000"},{"tower_id":"70","formatted_address":"Blasius Königsgatan 31, 372 35 Ronneby, Sweden","claimed_on":"2015-10-23T16:03:57Z","geld_collected":"23.300000","geld_bonus":"0.520000"},{"tower_id":"70","formatted_address":"Blasius Königsgatan 31, 372 35 Ronneby, Sweden","claimed_on":"2014-10-23T16:03:57Z","geld_collected":"23.300000","geld_bonus":"0.520000"},{"tower_id":"70","formatted_address":"Blasius Königsgatan 31, 372 35 Ronneby, Sweden","claimed_on":"2015-10-23T16:03:57Z","geld_collected":"23.300000","geld_bonus":"0.520000"},{"tower_id":"70","formatted_address":"Blasius Königsgatan 31, 372 35 Ronneby, Sweden","claimed_on":"2016-10-23T16:03:57Z","geld_collected":"23.300000","geld_bonus":"0.520000"}]};

      controller.getLog(70);

      deferred.resolve(response);
      $rootScope.$digest();

      expect(controller.log[0].claimed_on).to.eql('2016-10-23T16:03:57Z');
      expect(controller.log[1].claimed_on).to.eql('2015-10-23T16:03:57Z');
      expect(controller.log[2].claimed_on).to.eql('2015-10-23T16:03:57Z');
      expect(controller.log[3].claimed_on).to.eql('2014-10-23T16:03:57Z');
      expect(controller.log[4].claimed_on).to.eql('2014-10-21T16:03:57Z');
    });

    it('should set an error message if no tower is found', () => {
      let response = {data: {"message":"Unable to find tower"}, status: 404};

      controller.findTower(1);

      deferred.reject(response);
      $rootScope.$digest();

      expect(controller.error.message).to.eq('This tower is missing data');
    });

    it('should not have loading state after not finding a tower', () => {
      let response = {data: {"message":"Unknown error"}, status: 500};

      controller.findTower(1);

      deferred.reject(response);
      $rootScope.$digest();

      expect(controller.state.loading).to.be.false;
    });

  });
});
