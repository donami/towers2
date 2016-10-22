class LeaderboardController {
  constructor($scope, TowerFactory, MoonFactory, $state, toastr, $q, $timeout) {
    'ngInject';

    this.TowerFactory = TowerFactory;
    this.MoonFactory = MoonFactory;
    this.toastr = toastr;
    this.$timeout = $timeout;
    this.$q = $q;

    this.state = {
      view: $state.current.name,
      loading: true,
    };
    this.leaderboard = [];
    this.selectedNewMoon = {};
    this.orderBy = 'claim_count';
    this.reverseOrder = false;

    $scope.$watch(() => $state.current.name, (newValue) => {
      this.state.loading = true;
      this.state.view = newValue;

      this.init();
    });
  }

  init() {
    switch (this.state.view) {
      case 'leaderboard.new-moons':
          this.loadNewMoons().then(() => this.state.loading = false);
          this.getLeaderboardMoons();
        break;

      case 'leaderboard.main':
        this.getLeaderboard()
          .then(() => this.state.loading = false);
        break;
    }
  }

  setSort(property, asFloat) {
    this.sort(property, asFloat);
  }

  sort(property, asFloat) {
    if (property == this.orderBy) this.reverseOrder = !this.reverseOrder;

    // Parse as float if needed
    if (asFloat) {
      this.leaderboard.map(function(obj) {
        obj[property] = parseFloat(obj[property]);
        return obj;
      });
    }

    this.orderBy = property;
  }

  getLeaderboard() {
    return this.TowerFactory.getLeaderboard()
      .then((response) => this.leaderboard = response.data)
      .then(() => this.sort(this.orderBy, true))
      .catch(error => console.log(error));
  }

  loadNewMoons() {
    return this.MoonFactory.getNewMoons()
      .then((response) => {
        let today = new Date();
        let date;
        let minimumDate = new Date('2015-08-15');            // Only get new moons after this date
        let newMoons = response.data.filter(function(obj) {
          date = new Date(obj.iso8601);
          return today > date && date > minimumDate;
        });

        this.newMoons = newMoons;
      })
      .catch(error => console.log(error));
  }

  getLeaderboardMoons(date) {
    if (!date) {
      this.leaderboard = [];
      return false;
    }

    return this.TowerFactory.getLeaderboardMoons(date)
      .then((response) => {
        if (response.data.response) {
          if (response.data.response.statusCode == 404) {
            this.state.error = response.data.response.body.error;
            this.toastr.error(response.data.response.body.error.message);
            this.leaderboard = [];
          }
          else return Promise.reject(response);
        }
        else {
          this.leaderboard = response.data;
        }
      })
      .catch(error => console.log(error));
  }

  selectNewMoon() {
    if (this.selectedNewMoon) {
      this.getLeaderboardMoons(this.selectedNewMoon.iso8601);
    }
  }

}

export default LeaderboardController;
