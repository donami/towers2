import moment from 'moment';

class GraphController {
  constructor(TowerFactory, DataFactory, MoonFactory, $q, $filter, toastr, $state, $location, smoothScroll, GraphFilter) {
    'ngInject';

    this.TowerFactory = TowerFactory;
    this.DataFactory = DataFactory;
    this.MoonFactory = MoonFactory;
    this.smoothScroll = smoothScroll;
    this.GraphFilter = GraphFilter;
    this.$q = $q;
    this.toastr = toastr;

    this.moons = [];
    this.filter = {};
    this.state = {
      loading: true
    };

    this.yearOptions = GraphFilter.getYearOptions();
    this.filterOptions = GraphFilter.getFilterOptions();
    this.filter = this.filterOptions[0];

    this.init();
    this.loadData();
    this.getNewMoons();
  }

  init() {
    this.state.loading = true;

    this.graphData = this.GraphFilter.getGraphData();
  }

  getNewMoons() {
    return this.MoonFactory.getNewMoons()
      .then((response) => {
        let today = new Date();
        this.moons = response.data.filter((obj) => new Date(obj.iso8601) < today);
      })
      .catch((error) => console.log(error));
  }

  loadData(startDate, endDate) {
    if (!startDate) startDate = '2000-01-01';
    if (!endDate) endDate = moment().add(10, 'years').format('YYYY-MM-DD');

    this.$q.all([
      this.TowerFactory.getLeaderboard(startDate, endDate),
      this.TowerFactory.getLeaderboardTowerBuilder(startDate, endDate),
      this.TowerFactory.getStats(startDate, endDate),
      this.TowerFactory.getTowers(startDate, endDate),
    ])
    .then(([leaderboard, towerBuilder, stats, towers]) => {
      // Handle data for players with most claims
      this.graphData.claimCount = Object.assign(this.graphData.claimCount, this.DataFactory.handleTopClaims(leaderboard.data));

      // Get the data for players collecting most geld
      this.graphData.geldCollected = Object.assign(this.graphData.geldCollected, this.DataFactory.handleMostGeldCollected(leaderboard.data));

      // Get data for players with most geld bonus
      this.graphData.geldBonus = Object.assign(this.graphData.geldBonus, this.DataFactory.handleMostGeldBonus(leaderboard.data));

      // Get data for players who built the most towers
      this.graphData.towersBuilt = Object.assign(this.graphData.towersBuilt, this.DataFactory.handleMostTowersBuilt(towerBuilder.data));

      // Filter data to get towerst with most claims
      this.graphData.towerHighestClaim = Object.assign(this.graphData.towerHighestClaim, this.DataFactory.handleTowersTopClaimed(stats.data));

      // Filter out data to get towers with highest player count
      this.graphData.towerPlayerCount = Object.assign(this.graphData.towerPlayerCount, this.DataFactory.handleTowersPlayerCount(stats.data));

      // Filter data to get cities with most towers built
      this.DataFactory.handleCitiesWithMostTowers(towers.data).forEach((obj) => {
        this.graphData.towersByCity.data.push(obj.amount);
        this.graphData.towersByCity.labels.push(obj.city);
      });
    })
    .then(() => this.state.loading = false)
    .catch((error) => console.log(error));
  }

  filterData() {
    let value = this.filter.value;

    let options = {
      selectedYear: this.selectedYear,
      filterByMoonStart: this.filterByMoonStart,
      filterByMoonEnd: this.filterByMoonEnd,
    };

    let filter = this.GraphFilter.applyFilter(value, options);

    if (filter.error) {
      this.toastr.error(filter.error.message, filter.error.title);
    }
    else {
      this.toastr.clear();
      this.init();
      this.loadData(filter.startDate, filter.endDate);
    }
  }

  // Reset filter
  clearFilter() {
    this.init();
    this.loadData();
  }

  // Scroll to anchor
  gotoAnchor(x) {
    let element = document.getElementById('anchor' + x);
    let options = {
      duration: 700,
      easing: 'easeInQuad',
      offset: 0,
    };
    this.smoothScroll(element, options);
  }

}

export default GraphController;
