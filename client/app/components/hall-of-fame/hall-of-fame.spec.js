import hallOfFameModule from './hall-of-fame';

var sinon = require('sinon');

describe('Hall of Fame', () => {
  let $rootScope, $state, $location, $componentController, $compile, $httpBackend, $q, fakeTowerFactory, deferred;

  beforeEach(window.module(hallOfFameModule));

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
      getFirstInCountry: () => {
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
      controller = $componentController('hallOfFameComponent', {
        $scope: $rootScope.$new(),
        TowerFactory: fakeTowerFactory,
      });
    });

    it('should have a init method', () => {
      expect(controller.init).to.be.a('function');
    });

    it('should have a countries property', () => {
      expect(controller).to.have.property('countries');
    });

    it('should have a TowerFactory property', () => {
      expect(controller).to.have.property('TowerFactory');
    });

    it('should fetch a list of first claims in country', () => {
      let response = {data: [{"tower_id":"28","longitude":15.633252,"latitude":56.201009,"created_on":"0000-00-00T00:00:00Z","player_id":"tN5p7SSvzb30fIRtA6tp2aQn0Y9YTOZQ4k3MFjw3t/I=","player_alias":"David","tower_name":"Automek","country_code":"SE","country":"Sweden","formatted_address":"Verkstadsgatan 6, 371 47 Karlskrona, Sweden"},{"tower_id":"39","longitude":12.650714,"latitude":55.629438,"created_on":"0000-00-00T00:00:00Z","player_id":"tN5p7SSvzb30fIRtA6tp2aQn0Y9YTOZQ4k3MFjw3t/I=","player_alias":"David","tower_name":null,"country_code":"DK","country":"Denmark","formatted_address":"Kastrup Tværvej C 3, 2770 Kastrup, Denmark"},{"tower_id":"41","longitude":3.921721,"latitude":49.012609,"created_on":"0000-00-00T00:00:00Z","player_id":"tN5p7SSvzb30fIRtA6tp2aQn0Y9YTOZQ4k3MFjw3t/I=","player_alias":"David","tower_name":null,"country_code":"FR","country":"France","formatted_address":"6-8 Rue de la République, 51530 Moussy, France"},{"tower_id":"100","longitude":23.909301,"latitude":35.517176,"created_on":"0000-00-00T00:00:00Z","player_id":"+6V0LTmM3p/wUiELP+c0Z1hAZl2J6YlQq3vfYY+RfVo=","player_alias":"Mr Olsson","tower_name":null,"country_code":"GR","country":"Greece","formatted_address":"PEO Kissamou Chanion 123, Platanias 730 14, Greece"},{"tower_id":"278","longitude":32.003307,"latitude":36.539605,"created_on":"2015-10-30T07:39:35Z","player_id":"PzESlN6l5VwfBJCBgiYhd2X0MM4F8rTZIGovIV6pEBo=","player_alias":"Stoffisimo","tower_name":null,"country_code":"TR","country":"Turkey","formatted_address":"Güller Pınarı, Rıhtım Cd., 07460 Alanya/Antalya, Turkey"},{"tower_id":"544","longitude":-80.119844,"latitude":25.942675,"created_on":"2015-12-18T01:56:41Z","player_id":"P5SM02xD5XLGNwSpz7WAasxSp34m689BFrm/eFJv/oU=","player_alias":"Hmmm","tower_name":null,"country_code":"US","country":"United States","formatted_address":"18001 Collins Ave, Sunny Isles Beach, FL 33160, USA"},{"tower_id":"614","longitude":-15.598725,"latitude":27.736119,"created_on":"2016-01-25T15:33:52Z","player_id":"mi14tyySRcpcRivQHngsPscW4SkOFO6xDz6ThF3vUSU=","player_alias":"IterBis","tower_name":null,"country_code":"ES","country":"Spain","formatted_address":"Plaza del Faro, 1, 35100 San Bartolomé de Tirajana, Las Palmas, Spain"},{"tower_id":"623","longitude":-0.253313,"latitude":51.492912,"created_on":"2016-01-27T12:52:24Z","player_id":"P5SM02xD5XLGNwSpz7WAasxSp34m689BFrm/eFJv/oU=","player_alias":"Hmmm","tower_name":null,"country_code":"GB","country":"United Kingdom","formatted_address":"136 Chiswick High Rd, Chiswick, London W4 1PU, UK"},{"tower_id":"751","longitude":25.284764,"latitude":54.69554,"created_on":"2016-03-19T11:36:03Z","player_id":"9phTE5el/Egrcim0/Qe6cbXPKD7hDfik2bJiHfksA40=","player_alias":"SunYour","tower_name":null,"country_code":"LT","country":"Lithuania","formatted_address":"Slucko g. 8, Vilnius 09312, Lithuania"},{"tower_id":"782","longitude":12.154127,"latitude":61.323493,"created_on":"2016-03-28T04:23:46Z","player_id":"p7XtJBWiuou7EOgu6D5yTBSQvxNcHXmT6OwNMseADT8=","player_alias":"85annp","tower_name":"Trysil Høyfjellsenter","country_code":"NO","country":"Norway","formatted_address":"Fageråsveien, 2420 Trysil, Norway"},{"tower_id":"984","longitude":11.218751,"latitude":54.4702,"created_on":"2016-06-12T19:21:03Z","player_id":"j5ozAm2e+C7tnE4hR8+3P6+iA08n9s9EUouuEhHOwlA=","player_alias":"Maqqan","tower_name":"Bannesdorf","country_code":"DE","country":"Germany","formatted_address":"Bürgermeister-Scheffler-Straße 2, 23769 Fehmarn, Germany"},{"tower_id":"1062","longitude":20.88235,"latitude":69.016852,"created_on":"2016-07-15T16:44:16Z","player_id":"9phTE5el/Egrcim0/Qe6cbXPKD7hDfik2bJiHfksA40=","player_alias":"SunYour","tower_name":null,"country_code":"FI","country":"Finland","formatted_address":"Naalintie 6, 99490 Enontekiö, Finland"},{"tower_id":"1064","longitude":18.895802,"latitude":46.56726,"created_on":"2016-07-16T14:34:57Z","player_id":"LrN6Gbub2XuylfrsqlR+M7w6Tq9t1UVipGYHuqbf3ZM=","player_alias":"ahotiK","tower_name":"Uszod-Danube","country_code":"HU","country":"Hungary","formatted_address":"Uszód, Árpád u. 57, 6332 Hungary"},{"tower_id":"1083","longitude":9.832774,"latitude":46.481256,"created_on":"2016-07-21T16:59:25Z","player_id":"4KLpNwwqTRvVH/JSscUnieBAIimLU9MEbyq6NE1LYX0=","player_alias":"Scoli","tower_name":"St Moritz Tennis & Squash Center","country_code":"CH","country":"Switzerland","formatted_address":"Via Mezdi 31, 7500 St. Moritz, Switzerland"},{"tower_id":"1101","longitude":16.691967,"latitude":43.163606,"created_on":"2016-07-27T19:46:07Z","player_id":"bcmOcqohpW/vpC0dKvGzhIvqk89K99/eLJetXuwrf00=","player_alias":"Albin","tower_name":"Jelsa","country_code":"HR","country":"Croatia","formatted_address":"burkovo, 21465, Jelsa, Croatia"},{"tower_id":"1206","longitude":19.941436,"latitude":50.065137,"created_on":"2016-09-17T07:58:45Z","player_id":"tN5p7SSvzb30fIRtA6tp2aQn0Y9YTOZQ4k3MFjw3t/I=","player_alias":"David","tower_name":null,"country_code":"PL","country":"Poland","formatted_address":"Floriańska 57, Kraków, Poland"},{"tower_id":"1209","longitude":24.113508,"latitude":56.943344,"created_on":"2016-09-17T09:50:36Z","player_id":"bcmOcqohpW/vpC0dKvGzhIvqk89K99/eLJetXuwrf00=","player_alias":"Albin","tower_name":"Saluhallen","country_code":"LV","country":"Latvia","formatted_address":"Rīgas Centrāltirgus, Latgales priekšpilsēta, Rīga, LV-1050, Latvia"}]};
      controller.init();

      deferred.resolve(response);

      $rootScope.$digest();
      expect(controller.countries).not.to.be.empty;
    });

  });
});
