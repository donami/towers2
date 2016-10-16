import LeaderboardModule from './leaderboard';
var sinon = require('sinon');


describe('Leaderboard', () => {
  let $rootScope, $state, $location, $componentController, $compile, $httpBackend;

  beforeEach(window.module(LeaderboardModule));
  // beforeEach(window.module('templates'));

  beforeEach(() => {
    localStorage.clear();
  })

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
    it('state name to be leaderboard', () => {
      $location.url('/leaderboard');
      $rootScope.$digest();

      expect($state.current.name).to.eq('leaderboard.main');
    });
  });

  describe('Controller', () => {

    let controller, TowerFactory;

    beforeEach(inject((_TowerFactory_) => {
      TowerFactory = _TowerFactory_;

      controller = $componentController('leaderboard', {
        $scope: $rootScope.$new(),
        TowerFactory: TowerFactory
      });

    }));

    it('should have a state property', () => {
      expect(controller.state).to.be.defined;
    })

    it('should add the fetched leaderboard to controllers leaderboard', () => {
      let response = [{"player_id":"PzESlN6l5VwfBJCBgiYhd2X0MM4F8rTZIGovIV6pEBo=","player_alias":"Stoffisimo","claim_count":"1477","tower_count":"60","first_claimed_on":"2015-10-23T04:40:12Z","last_claimed_on":"2016-10-15T10:01:56Z","geld_collected":"230262.561039","geld_bonus":"56594.261007"},{"player_id":"tN5p7SSvzb30fIRtA6tp2aQn0Y9YTOZQ4k3MFjw3t/I=","player_alias":"David","claim_count":"1136","tower_count":"143","first_claimed_on":"2015-10-23T16:03:57Z","last_claimed_on":"2016-10-15T10:29:43Z","geld_collected":"143402.492241","geld_bonus":"42736.028622"},{"player_id":"p7XtJBWiuou7EOgu6D5yTBSQvxNcHXmT6OwNMseADT8=","player_alias":"85annp","claim_count":"475","tower_count":"48","first_claimed_on":"2016-01-16T17:14:11Z","last_claimed_on":"2016-04-29T03:16:40Z","geld_collected":"47443.647742","geld_bonus":"28672.261854"},{"player_id":"4KLpNwwqTRvVH/JSscUnieBAIimLU9MEbyq6NE1LYX0=","player_alias":"Scoli","claim_count":"485","tower_count":"92","first_claimed_on":"2015-10-24T13:14:01Z","last_claimed_on":"2016-10-05T16:53:17Z","geld_collected":"79249.268353","geld_bonus":"22475.598888"},{"player_id":"rtQDeh6TAfqcMpZRACL3Hl9IKNuEMuj46DC8y0UyIqY=","player_alias":"Vasskär","claim_count":"691","tower_count":"42","first_claimed_on":"2015-10-23T05:13:44Z","last_claimed_on":"2016-10-12T16:26:58Z","geld_collected":"96108.207902","geld_bonus":"17731.310068"},{"player_id":"P5SM02xD5XLGNwSpz7WAasxSp34m689BFrm/eFJv/oU=","player_alias":"Hmmm","claim_count":"298","tower_count":"70","first_claimed_on":"2015-10-23T10:59:21Z","last_claimed_on":"2016-05-14T08:27:30Z","geld_collected":"64535.699447","geld_bonus":"7621.518474"},{"player_id":"LrN6Gbub2XuylfrsqlR+M7w6Tq9t1UVipGYHuqbf3ZM=","player_alias":"ahotiK","claim_count":"250","tower_count":"29","first_claimed_on":"2015-10-23T05:01:52Z","last_claimed_on":"2016-10-13T15:34:27Z","geld_collected":"32233.710563","geld_bonus":"7414.391772"},{"player_id":"MFYkNXXlNolKholUKwiEKi/HiSC7+6Pr/jtsXIHw5NY=","player_alias":"Janheden","claim_count":"84","tower_count":"21","first_claimed_on":"2016-04-04T18:32:40Z","last_claimed_on":"2016-10-10T16:07:24Z","geld_collected":"12845.109817","geld_bonus":"7277.380017"},{"player_id":"rIwIcMuBHcIiK3MaBpJVI4TCALAFaCUGln4JBVcePCQ=","player_alias":"Jojje","claim_count":"89","tower_count":"34","first_claimed_on":"2016-03-12T06:49:39Z","last_claimed_on":"2016-10-10T14:42:56Z","geld_collected":"15907.977729","geld_bonus":"6866.942082"},{"player_id":"HMyiKvsJ2VKzQqI27ZbqYR2KmO7pGMZIOyKajUJ+4n0=","player_alias":"Westeras","claim_count":"92","tower_count":"13","first_claimed_on":"2016-04-06T10:47:18Z","last_claimed_on":"2016-10-14T10:57:40Z","geld_collected":"14411.131411","geld_bonus":"6388.752099"},{"player_id":"j5ozAm2e+C7tnE4hR8+3P6+iA08n9s9EUouuEhHOwlA=","player_alias":"Maqqan","claim_count":"225","tower_count":"36","first_claimed_on":"2015-10-26T04:14:11Z","last_claimed_on":"2016-08-21T15:38:33Z","geld_collected":"30681.733798","geld_bonus":"5863.950391"},{"player_id":"oWk1HsXb7fKJIwWwrbgcXONxGjtHuAMcSiIMHHERV7c=","player_alias":"iostream","claim_count":"151","tower_count":"15","first_claimed_on":"2015-10-23T05:18:00Z","last_claimed_on":"2016-06-29T01:15:46Z","geld_collected":"20199.402148","geld_bonus":"5447.487146"},{"player_id":"4bzizCSRcNVfOEsI+gOh5NWOUf7LS0UeMDysyS/VEj4=","player_alias":"TowerQueen","claim_count":"66","tower_count":"14","first_claimed_on":"2016-05-09T15:09:18Z","last_claimed_on":"2016-09-01T15:15:35Z","geld_collected":"11897.619722","geld_bonus":"5120.603767"},{"player_id":"mi14tyySRcpcRivQHngsPscW4SkOFO6xDz6ThF3vUSU=","player_alias":"IterBis","claim_count":"445","tower_count":"46","first_claimed_on":"2015-10-23T05:28:35Z","last_claimed_on":"2016-05-31T09:44:33Z","geld_collected":"43615.433575","geld_bonus":"3238.430875"},{"player_id":"r/nR+nzCgp+4FDW2Mq8VXleCotsX9f7//9xiew30Cu0=","player_alias":"MiaFian","claim_count":"77","tower_count":"31","first_claimed_on":"2016-02-13T15:30:06Z","last_claimed_on":"2016-10-02T16:47:15Z","geld_collected":"10188.265978","geld_bonus":"3226.006664"},{"player_id":"51XAINMlXNhIjewvmoD4I5f0ZVETofr6BE/mVud2heA=","player_alias":"LordChade","claim_count":"46","tower_count":"9","first_claimed_on":"2015-10-28T07:24:18Z","last_claimed_on":"2016-10-01T21:53:57Z","geld_collected":"8348.723763","geld_bonus":"3026.973029"},{"player_id":"CGQmXpbsVSr1CRH63nqOrpg5JlvQq+dHQHBW1GrsL64=","player_alias":"Evamarie","claim_count":"39","tower_count":"22","first_claimed_on":"2015-10-29T17:43:51Z","last_claimed_on":"2016-09-19T15:40:31Z","geld_collected":"6008.678875","geld_bonus":"2897.832656"},{"player_id":"bcmOcqohpW/vpC0dKvGzhIvqk89K99/eLJetXuwrf00=","player_alias":"Albin","claim_count":"98","tower_count":"36","first_claimed_on":"2015-10-24T07:42:17Z","last_claimed_on":"2016-10-01T17:39:19Z","geld_collected":"16980.160362","geld_bonus":"2484.233791"},{"player_id":"9Sga+AAO69QGVsJHt+Dl7OFPE1Aju2ZuSGFCLV6+AcM=","player_alias":"DIProgan","claim_count":"70","tower_count":"11","first_claimed_on":"2015-11-27T14:50:43Z","last_claimed_on":"2016-10-07T20:40:57Z","geld_collected":"8622.616932","geld_bonus":"1595.194570"},{"player_id":"hvOa4rGioN+QLfP+4z4+pNWWZ1J9BwWgnw9jChosbFA=","player_alias":"AmosBurton","claim_count":"31","tower_count":"15","first_claimed_on":"2016-04-09T12:08:46Z","last_claimed_on":"2016-05-15T10:11:08Z","geld_collected":"5445.977915","geld_bonus":"1329.848731"},{"player_id":"bnsW0Fp3gJez6d08TX0B8iEno9wpX0+stnViARpvhyM=","player_alias":"ricjon","claim_count":"13","tower_count":"7","first_claimed_on":"2016-02-28T12:57:38Z","last_claimed_on":"2016-08-03T13:06:55Z","geld_collected":"2948.388094","geld_bonus":"945.197584"},{"player_id":"S9P40VXdXRacJtGVPy5/TMg36BHRY1zSEgzxAYJjqqo=","player_alias":"MysakBest","claim_count":"15","tower_count":"13","first_claimed_on":"2015-10-26T11:52:09Z","last_claimed_on":"2016-08-28T17:43:10Z","geld_collected":"1387.143429","geld_bonus":"841.370000"},{"player_id":"PvlhSPvgnEEScVrRpBMnV18ixan3FB/RTBo3vmnN3LM=","player_alias":"Jocce","claim_count":"18","tower_count":"9","first_claimed_on":"2016-04-05T18:04:46Z","last_claimed_on":"2016-04-14T05:11:50Z","geld_collected":"3095.471708","geld_bonus":"699.233082"},{"player_id":"+6V0LTmM3p/wUiELP+c0Z1hAZl2J6YlQq3vfYY+RfVo=","player_alias":"Mr Olsson","claim_count":"62","tower_count":"15","first_claimed_on":"2015-10-23T07:34:32Z","last_claimed_on":"2016-05-08T21:37:40Z","geld_collected":"6425.114869","geld_bonus":"529.176053"},{"player_id":"HYL3R7V7IiOdJ9kwF5ZAuVlXoCH4/RP2aGz1VdokOCs=","player_alias":"Noilon","claim_count":"17","tower_count":"7","first_claimed_on":"2016-08-05T17:40:20Z","last_claimed_on":"2016-08-07T19:57:27Z","geld_collected":"1937.444064","geld_bonus":"500.000000"},{"player_id":"ll8nXxFW5ZlkIuxEPZB5OZ04BRZChrH7EWT/Phqx8U4=","player_alias":"AceIsAngry79","claim_count":"32","tower_count":"10","first_claimed_on":"2015-11-04T07:04:25Z","last_claimed_on":"2016-02-27T12:46:05Z","geld_collected":"4100.503926","geld_bonus":"406.184701"},{"player_id":"4GXFqkfZc2pASw4t4mSgGWUm+XTQLlZAGQsC9LlwM5g=","player_alias":"Hovis","claim_count":"5","tower_count":"4","first_claimed_on":"2016-04-04T04:51:01Z","last_claimed_on":"2016-09-24T13:30:04Z","geld_collected":"920.101327","geld_bonus":"304.403917"},{"player_id":"/KPkS8OSBcwswx/8Q8QdLhZR3MDiUjrs0hR1Hw8t9uE=","player_alias":"FarbrorGrön","claim_count":"3","tower_count":"3","first_claimed_on":"2016-08-01T11:25:42Z","last_claimed_on":"2016-08-02T10:41:45Z","geld_collected":"761.245603","geld_bonus":"300.000000"},{"player_id":"TSrB1s8GdmQ7ilOiP5XEflxQbQWVgsC8aLBTCAWO6K4=","player_alias":"Carl","claim_count":"2","tower_count":"2","first_claimed_on":"2016-07-30T16:48:37Z","last_claimed_on":"2016-07-30T16:57:19Z","geld_collected":"778.277484","geld_bonus":"108.701917"},{"player_id":"k5R5uQh+jTRmNBxW1Dg7z8rdSDI9bvba8RhR/5pZnP8=","player_alias":"Pär","claim_count":"2","tower_count":"2","first_claimed_on":"2016-02-18T12:12:23Z","last_claimed_on":"2016-02-18T16:41:45Z","geld_collected":"479.568984","geld_bonus":"100.000000"},{"player_id":"ujiyqGIGXvvBu8S867yvV9+lBZwkLZp1RfcqC1f11ks=","player_alias":"","claim_count":"1","tower_count":"1","first_claimed_on":"2016-05-29T08:52:02Z","last_claimed_on":"2016-05-29T08:52:02Z","geld_collected":"100.000000","geld_bonus":"100.000000"},{"player_id":"TS1hsYn/uLxewabCy+DD0QmbgpvovxoatQknFcdGKcY=","player_alias":"Marlund","claim_count":"1","tower_count":"1","first_claimed_on":"2016-07-16T12:34:45Z","last_claimed_on":"2016-07-16T12:34:45Z","geld_collected":"100.000000","geld_bonus":"100.000000"},{"player_id":"oIOnhlcjHJGYq8C4R/jlnTtSZ6xxjNIB6fYckImPM8g=","player_alias":null,"claim_count":"1","tower_count":"1","first_claimed_on":"2016-02-18T08:10:36Z","last_claimed_on":"2016-02-18T08:10:36Z","geld_collected":"11.810831","geld_bonus":"100.000000"},{"player_id":"urMfP3cGRvJi9DbbAPA2e4T5FJOegNryMGtIg1UFmnw=","player_alias":"Gitten","claim_count":"2","tower_count":"2","first_claimed_on":"2016-02-04T14:08:06Z","last_claimed_on":"2016-02-04T14:26:51Z","geld_collected":"693.661808","geld_bonus":"100.000000"},{"player_id":"xE/6ZtdIH/sa11m9bSF45IhQF9ciOvzKuMmNV++/rEw=","player_alias":null,"claim_count":"3","tower_count":"3","first_claimed_on":"2015-12-04T06:21:49Z","last_claimed_on":"2016-01-23T09:58:11Z","geld_collected":"416.522573","geld_bonus":"100.000000"},{"player_id":"ui5/gtczYbsqkH01iPUZlELlcZVf9HmFQA3nKDq7znM=","player_alias":"Kalnins","claim_count":"1","tower_count":"1","first_claimed_on":"2016-03-17T09:25:43Z","last_claimed_on":"2016-03-17T09:25:43Z","geld_collected":"100.000000","geld_bonus":"100.000000"},{"player_id":"9phTE5el/Egrcim0/Qe6cbXPKD7hDfik2bJiHfksA40=","player_alias":"SunYour","claim_count":"179","tower_count":"56","first_claimed_on":"2015-10-29T20:26:18Z","last_claimed_on":"2015-12-09T23:47:44Z","geld_collected":"30091.128555","geld_bonus":"32.531935"},{"player_id":"XRCcjl6JtXlr+pbkmgrmDOMMSdFTWRF3/KXblJQrRXM=","player_alias":"Paragon","claim_count":"32","tower_count":"8","first_claimed_on":"2015-10-23T06:27:27Z","last_claimed_on":"2015-11-13T16:43:48Z","geld_collected":"1877.411954","geld_bonus":"9.688703"},{"player_id":"Q+1X6mxCag3qNLt58gpebSzmb6094C6r0PblSkQ33Lw=","player_alias":"Zlugge","claim_count":"10","tower_count":"4","first_claimed_on":"2015-11-11T12:02:35Z","last_claimed_on":"2015-11-29T19:47:15Z","geld_collected":"760.550753","geld_bonus":"2.800244"},{"player_id":"c3BIwrviqhXFJrLZImaFaE2pi5xK+htCR7SVCTjkwIs=","player_alias":"Martin","claim_count":"4","tower_count":"2","first_claimed_on":"2015-10-23T06:00:25Z","last_claimed_on":"2015-11-10T06:45:52Z","geld_collected":"717.237614","geld_bonus":"0.050000"}]
      $httpBackend.whenGET('/api/leaderboard').respond(response);

      controller.getLeaderboard();
      $httpBackend.flush();
      expect(controller.leaderboard).not.to.be.empty;
    });

    it('should add moons to controllers new moons property', () => {
      let response = [{"timestamp":1439564087714,"iso8601":"2015-08-14T14:54:47+00:00"},{"timestamp":1442126550243,"iso8601":"2015-09-13T06:42:30+00:00"},{"timestamp":1444694799459,"iso8601":"2015-10-13T00:06:39+00:00"},{"timestamp":1447264065805,"iso8601":"2015-11-11T17:47:45+00:00"},{"timestamp":1449829799164,"iso8601":"2015-12-11T10:29:59+00:00"},{"timestamp":1452389476318,"iso8601":"2016-01-10T01:31:16+00:00"},{"timestamp":1454942400692,"iso8601":"2016-02-08T14:40:00+00:00"},{"timestamp":1457488559512,"iso8601":"2016-03-09T01:55:59+00:00"},{"timestamp":1460028320054,"iso8601":"2016-04-07T11:25:20+00:00"},{"timestamp":1462563078600,"iso8601":"2016-05-06T19:31:18+00:00"},{"timestamp":1465095705871,"iso8601":"2016-06-05T03:01:45+00:00"},{"timestamp":1467630203448,"iso8601":"2016-07-04T11:03:23+00:00"},{"timestamp":1470170800538,"iso8601":"2016-08-02T20:46:40+00:00"},{"timestamp":1472720699298,"iso8601":"2016-09-01T09:04:59+00:00"},{"timestamp":1475280794343,"iso8601":"2016-10-01T00:13:14+00:00"},{"timestamp":1477849193000,"iso8601":"2016-10-30T17:39:53+00:00"},{"timestamp":1480421975159,"iso8601":"2016-11-29T12:19:35+00:00"},{"timestamp":1482994458544,"iso8601":"2016-12-29T06:54:18+00:00"},{"timestamp":1485562099774,"iso8601":"2017-01-28T00:08:19+00:00"},{"timestamp":1488121215146,"iso8601":"2017-02-26T15:00:15+00:00"},{"timestamp":1490669966435,"iso8601":"2017-03-28T02:59:26+00:00"},{"timestamp":1493209091374,"iso8601":"2017-04-26T12:18:11+00:00"},{"timestamp":1495741582382,"iso8601":"2017-05-25T19:46:22+00:00"},{"timestamp":1498271563209,"iso8601":"2017-06-24T02:32:43+00:00"},{"timestamp":1500803246135,"iso8601":"2017-07-23T09:47:26+00:00"},{"timestamp":1503340294476,"iso8601":"2017-08-21T18:31:34+00:00"},{"timestamp":1505885446740,"iso8601":"2017-09-20T05:30:46+00:00"},{"timestamp":1508440358978,"iso8601":"2017-10-19T19:12:38+00:00"},{"timestamp":1511005372961,"iso8601":"2017-11-18T11:42:52+00:00"},{"timestamp":1513578689300,"iso8601":"2017-12-18T06:31:29+00:00"},{"timestamp":1516155498524,"iso8601":"2018-01-17T02:18:18+00:00"},{"timestamp":1518728811590,"iso8601":"2018-02-15T21:06:51+00:00"},{"timestamp":1521292459488,"iso8601":"2018-03-17T13:14:19+00:00"},{"timestamp":1523843993720,"iso8601":"2018-04-16T01:59:53+00:00"},{"timestamp":1526384989813,"iso8601":"2018-05-15T11:49:49+00:00"},{"timestamp":1528919104389,"iso8601":"2018-06-13T19:45:04+00:00"},{"timestamp":1531450175599,"iso8601":"2018-07-13T02:49:35+00:00"},{"timestamp":1533981547845,"iso8601":"2018-08-11T09:59:07+00:00"},{"timestamp":1536516161863,"iso8601":"2018-09-09T18:02:41+00:00"},{"timestamp":1539056870457,"iso8601":"2018-10-09T03:47:50+00:00"},{"timestamp":1541606572444,"iso8601":"2018-11-07T16:02:52+00:00"},{"timestamp":1544167302851,"iso8601":"2018-12-07T07:21:42+00:00"},{"timestamp":1546738192458,"iso8601":"2019-01-06T01:29:52+00:00"},{"timestamp":1549314293231,"iso8601":"2019-02-04T21:04:53+00:00"},{"timestamp":1551888327928,"iso8601":"2019-03-06T16:05:27+00:00"},{"timestamp":1554454342925,"iso8601":"2019-04-05T08:52:22+00:00"},{"timestamp":1557010021438,"iso8601":"2019-05-04T22:47:01+00:00"},{"timestamp":1559556179200,"iso8601":"2019-06-03T10:02:59+00:00"},{"timestamp":1562095030471,"iso8601":"2019-07-02T19:17:10+00:00"},{"timestamp":1564629175454,"iso8601":"2019-08-01T03:12:55+00:00"},{"timestamp":1567161500847,"iso8601":"2019-08-30T10:38:20+00:00"},{"timestamp":1569695274328,"iso8601":"2019-09-28T18:27:54+00:00"},{"timestamp":1572234015179,"iso8601":"2019-10-28T03:40:15+00:00"},{"timestamp":1574780861775,"iso8601":"2019-11-26T15:07:41+00:00"},{"timestamp":1577337331442,"iso8601":"2019-12-26T05:15:31+00:00"},{"timestamp":1579902251303,"iso8601":"2020-01-24T21:44:11+00:00"},{"timestamp":1582472024884,"iso8601":"2020-02-23T15:33:44+00:00"},{"timestamp":1585042176923,"iso8601":"2020-03-24T09:29:36+00:00"},{"timestamp":1587608820025,"iso8601":"2020-04-23T02:27:00+00:00"},{"timestamp":1590169189367,"iso8601":"2020-05-22T17:39:49+00:00"},{"timestamp":1592721736843,"iso8601":"2020-06-21T06:42:16+00:00"},{"timestamp":1595266416578,"iso8601":"2020-07-20T17:33:36+00:00"},{"timestamp":1597804935442,"iso8601":"2020-08-19T02:42:15+00:00"}];
      $httpBackend.whenGET('/api/new-moons').respond(response);

      controller.loadNewMoons();

      $httpBackend.flush();
      expect(controller.newMoons).not.to.be.empty;
    });

    it('should return false if no moon date is selected', () => {
      expect(controller.getLeaderboardMoons()).to.be.false;
    });

    it('should update leaderboard for new moons', () => {
      let response = [{"player_id":"mi14tyySRcpcRivQHngsPscW4SkOFO6xDz6ThF3vUSU=","geld":15445.112593858512,"place":1,"player_alias":"IterBis"},{"player_id":"P5SM02xD5XLGNwSpz7WAasxSp34m689BFrm/eFJv/oU=","geld":10560.022088847485,"place":2,"player_alias":"Hmmm"},{"player_id":"tN5p7SSvzb30fIRtA6tp2aQn0Y9YTOZQ4k3MFjw3t/I=","geld":6931.331460411367,"place":3,"player_alias":"David"},{"player_id":"bcmOcqohpW/vpC0dKvGzhIvqk89K99/eLJetXuwrf00=","geld":6084.301657200783,"place":4,"player_alias":"Albin"},{"player_id":"rtQDeh6TAfqcMpZRACL3Hl9IKNuEMuj46DC8y0UyIqY=","geld":5832.840050062546,"place":5,"player_alias":"Vasskär"},{"player_id":"PzESlN6l5VwfBJCBgiYhd2X0MM4F8rTZIGovIV6pEBo=","geld":2596.1633339444993,"place":6,"player_alias":"Stoffisimo"},{"player_id":"4KLpNwwqTRvVH/JSscUnieBAIimLU9MEbyq6NE1LYX0=","geld":2577.7812359992377,"place":7,"player_alias":"Scoli"},{"player_id":"XRCcjl6JtXlr+pbkmgrmDOMMSdFTWRF3/KXblJQrRXM=","geld":2412.5471551201613,"place":8,"player_alias":"Paragon"},{"player_id":"+6V0LTmM3p/wUiELP+c0Z1hAZl2J6YlQq3vfYY+RfVo=","geld":2412.2003464450722,"place":9,"player_alias":"Mr Olsson"},{"player_id":"j5ozAm2e+C7tnE4hR8+3P6+iA08n9s9EUouuEhHOwlA=","geld":2243.0625794039433,"place":10,"player_alias":"Maqqan"},{"player_id":"9phTE5el/Egrcim0/Qe6cbXPKD7hDfik2bJiHfksA40=","geld":2038.1909346238374,"place":11,"player_alias":"SunYour"},{"player_id":"LrN6Gbub2XuylfrsqlR+M7w6Tq9t1UVipGYHuqbf3ZM=","geld":1899.4735682917385,"place":12,"player_alias":"ahotiK"},{"player_id":"ll8nXxFW5ZlkIuxEPZB5OZ04BRZChrH7EWT/Phqx8U4=","geld":1408.6147323588498,"place":13,"player_alias":"AceIsAngry79"},{"player_id":"oWk1HsXb7fKJIwWwrbgcXONxGjtHuAMcSiIMHHERV7c=","geld":1212.271053101032,"place":14,"player_alias":"iostream"},{"player_id":"c3BIwrviqhXFJrLZImaFaE2pi5xK+htCR7SVCTjkwIs=","geld":966.4110679652774,"place":15,"player_alias":"Martin"},{"player_id":"CGQmXpbsVSr1CRH63nqOrpg5JlvQq+dHQHBW1GrsL64=","geld":707.1854957908982,"place":16,"player_alias":"Evamarie"},{"player_id":"51XAINMlXNhIjewvmoD4I5f0ZVETofr6BE/mVud2heA=","geld":591.2015708879818,"place":17,"player_alias":"LordChade"},{"player_id":"S9P40VXdXRacJtGVPy5/TMg36BHRY1zSEgzxAYJjqqo=","geld":208.68195917525105,"place":18,"player_alias":"MysakBest"},{"player_id":"Q+1X6mxCag3qNLt58gpebSzmb6094C6r0PblSkQ33Lw=","geld":121.18742732412969,"place":19,"player_alias":"Zlugge"}];
      let newMoonDate = '2015-10-13T00:06:39+00:00';

      $httpBackend.whenGET('/api/leaderboard/moons/' + newMoonDate).respond(response);
      controller.getLeaderboardMoons(newMoonDate);

      $httpBackend.flush();
      // expect(controller.leaderboard).to.have.lengthOf(19);

    });

    it('should display a toastr error if new moon date is not correct', () => {
      let newMoonDate = '2099-10-13T00:06:39+00:00';
      let spy = sinon.spy(controller.toastr, 'error');

      $httpBackend.whenGET('/api/leaderboard/moons/' + newMoonDate).respond(
        {
          response: {
            statusCode: 404,
            body: {
              error: {
                message: 'Leaderboard not found'
              }
            }
          }
        }
      );
      controller.getLeaderboardMoons(newMoonDate);

      $httpBackend.flush();
      expect(spy.called).to.be.true;

    });

    it('should load new moons depending on state', () => {
      let spy = sinon.spy(controller, 'loadNewMoons');
      controller.state.view = 'leaderboard.new-moons';
      controller.init();
      $rootScope.$digest();
      expect(spy.called).to.be.true;
    });

    it('should get leaderboard for new moons depending on state', () => {
      let spy = sinon.spy(controller, 'getLeaderboardMoons');
      controller.state.view = 'leaderboard.new-moons';
      controller.init();
      $rootScope.$digest();
      expect(spy.called).to.be.true;
    });

    it('should get overall leaderboard depending on state', () => {
      let spy = sinon.spy(controller, 'getLeaderboard');
      controller.state.view = 'leaderboard.main';
      controller.init();
      $rootScope.$digest();
      expect(spy.called).to.be.true;
    });

  });


});
