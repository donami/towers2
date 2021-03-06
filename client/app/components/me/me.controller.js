import * as _ from 'underscore';
import moment from 'moment';

class MeController {
  constructor($scope, $state, $cookies, $filter, MeFactory, DateService, DataFactory) {
    'ngInject';

    this.MeFactory = MeFactory;
    this.DateService = DateService;
    this.DataFactory = DataFactory;
    this.$filter = $filter;

    this.userApiKey = $cookies.get('userApiKey');
    this.state = {
      view: $state.current.name
    };
    this.claimedTowers = {loading: true};
    this.orderBy = 'claimed_on';
    this.reverse = true;
    this.paginate = this.paginate.bind(this);
    this.sortBy = this.sortBy.bind(this);

    this.pagination = {
      currentPage: 1,
      maxSize: 5,
      totalItems: 0,
    };

    this.favoriteTower = null;
    this.lastClaimedTower = {
      tower_id: 0,
      info: [],
      stats: [],
      loading: true
    };

    // For displaying of graphs
    this.graphData = {
      claimDays: {
        title: '_DAYS_WITH_MOST_CLAIMS',
        type: 'bar',
        data: [],
        labels: [],
        series: ['Days with most claims'],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                min: 0,
              }
            }]
          }
        }
      },
      claimsPerWeekDay: {
        title: '_CLAIMS_PER_WEEK_DAY',
        type: 'bar',
        data: [1, 2, 3, 4, 5, 6, 7],
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        series: ['Claims per week day'],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                min: 0,
              }
            }]
          }
        }
      },
      claimsPerDay: {
        title: 'Claims per day this week',
        type: 'bar',
        data: [],
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        series: ['Claims per day this week'],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 1,
                min: 0,
              }
            }]
          }
        }
      },
      claimsPerHour: {
        title: 'Claims per hour',
        type: 'line',
        data: [],
        labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        series: ['Claims made this hour'],
      }
    };

    $scope.$watch(() => $state.current.name, (newValue) => this.state.view = newValue);

    this.init();
  }

  init() {
    this.getLatestClaimedTower();
    this.getClaims();
  }

  // Get your claims
  getClaims() {
    return this.MeFactory.getClaims()
      .then((response) => {
        this.DataFactory.attatchMetaToClaims(response.data)
          .then((data) => {
            this.claimedTowers = this.$filter('orderBy')(data, this.orderBy, this.reverse);
            this.pagination.totalItems = data.length;
          })
          .catch(error => console.log(error));

        this.getDaysWithMostClaims(response.data);
        this.getClaimsPerDay(response.data);
        this.getClaimsPerWeekDay(response.data);
        this.getClaimsPerHour(response.data);
        this.getFavoriteTower(response.data);
      })
      .catch(error => console.log(error));
  }

  // Get the latest claimed tower
  getLatestClaimedTower() {
    return this.MeFactory.getLatestClaimedTower()
      .then((response) => {

        if (!response.data.length) {
          return Promise.reject();
        }

        let claimedTower = {};

        let towerId = response.data[0].lastClaimedTowerId;

        let info = response.data[1].find((obj) => {
          return obj.tower_id == towerId;
        });

        let stats = response.data[2].find((obj) => {
          return obj.tower_id == towerId;
        });

        claimedTower.tower_id = towerId;
        claimedTower.info = info;
        claimedTower.stats = stats;
        claimedTower.loading = false;

        this.lastClaimedTower = claimedTower;
      })
      .catch(error => console.log(error));
  }

  // Get claims per hour for graph
  getClaimsPerHour(claims) {
    let data = _.map(claims, _.clone);
    let values = [];

    // Format claimed_on to hour format
    data.map(obj => {
      obj.claimed_on = moment(obj.claimed_on).format('H');
      return obj;
    });

    data = _.countBy(data, (obj) => obj.claimed_on);

    // Loop through all hours of day,
    // if there is no matching counts, insert 0
    for (var i = 0; i < 24; i++) {
      let claimCount = 0;

      if (data[i] !== undefined)
        claimCount = data[i];

      values.push(claimCount);
    }

    this.graphData.claimsPerHour.data.push(values);
  }

  getFavoriteTower(data) {
    if (data !== undefined) {
      let geldCollected = 0;

      let claims = _.chain(data)
                    .groupBy('tower_id')
                    .sortBy((obj) => obj.length)
                    .reverse()
                    .first()
                    .value();

      if (claims !== undefined) {
        claims.forEach((obj) => {
          geldCollected += parseInt(obj.geld_collected);
        });

        this.favoriteTower = {
          tower: _.first(claims),
          claims: claims.length,
          geld_collected: geldCollected
        };
      }
    }
    return false;
  }

  // Filter for paginating the results
  paginate(value) {
    let begin, end, index;
    begin = (this.pagination.currentPage - 1) * this.pagination.maxSize;
    end = begin + this.pagination.maxSize;
    index = this.claimedTowers.indexOf(value);
    return (begin <= index && index < end);
  }

  // Sort the table
  sortBy(property, parseFloat) {
    this.reverse = !this.reverse;
    this.orderBy = property;

    if (parseFloat) {
      this.claimedTowers.forEach((obj) => {
        if (obj[property] !== '')
          obj[property] = parseInt(obj[property]);
      });
    }

    this.claimedTowers = this.$filter('orderBy')(this.claimedTowers, this.orderBy, this.reverse);
  }

  // Get data for graph, displaying claims per weekday
  getClaimsPerWeekDay(claims) {
    let data = _.map(claims, _.clone);
    data = data.map(obj => {
      let date = moment(obj.claimed_on);
      obj.claimed_on = date.isoWeekday();

      return obj;
    });

    data = _.chain(data)
              .countBy(obj => obj.claimed_on)
              .pairs()
              .value();

    let values = [];

    data.forEach(obj => values.push(obj[1]));

    this.graphData.claimsPerWeekDay.data = values;
  }

  // Get the days that user has claimed the most towers
  getDaysWithMostClaims(claims) {
    let data = _.map(claims, _.clone);

    data = data.map((obj) => {
      obj.claimed_on = obj.claimed_on.substr(0, 10);
      return obj;
    });

    var counts = _.countBy(data, 'claimed_on');
    var sortable = _.pairs(counts);

    sortable.sort((a, b) => b[1] - a[1]);

    sortable = sortable.slice(0, 10);

    sortable.forEach((obj) => {
      this.graphData.claimDays.labels.push(obj[0]);
      this.graphData.claimDays.data.push(obj[1]);
    });
  }

  // Get data for graph, displaying all claims made current week
  getClaimsPerDay(claims) {
    let data = _.map(claims, _.clone);

    var thisYear = moment().format('YYYY');

    // Get only the day without the time and remove dates from other year
    data = data.filter(function(obj) {
      if (obj.claimed_on.substring(0, 4) !== thisYear)
        return null;

      obj.claimed_on = obj.claimed_on.substring(0, 10);
      return obj;
    });

    // Get the number of claims per day
    data = _.countBy(data, function(obj) {
      return obj.claimed_on;
    });

    var countsByDay = [];

    // Return the count if exists, otherwise return 0
    this.DateService.getDaysInWeek().forEach((obj) => {
      if (obj in data)
        countsByDay.push(data[obj]);
      else
        countsByDay.push(0);
    });

    // Set max value based on max value of week
    this.graphData.claimsPerDay.options.scales.yAxes[0].ticks.max = (Math.max.apply(Math, countsByDay) + 1);
    this.graphData.claimsPerDay.data = [countsByDay];
  }
}

export default MeController;
