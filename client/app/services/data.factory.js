import * as _ from 'underscore';

class DataFactory {

  constructor(TowerFactory, $q) {
    this.TowerFactory = TowerFactory;
    this.$q = $q;
  }

  attatchMetaToClaims(data) {
    var deferred = this.$q.defer();

    this.TowerFactory.getTowers()
      .then((response) => {
        data = data.map((obj) => {
          var meta = response.data.find(search => search.tower_id == obj.tower_id);

          obj.meta = meta;
          return obj;
        });

        deferred.resolve(data);
      })
      .catch(error => deferred.reject(error));

      return deferred.promise;
  }

  // Handle data to get a sorted list of cities with most towers built
  handleCitiesWithMostTowers(data) {
    data = _.reject(data, (obj) => obj.city === null);

    var result = _.chain(data)
      .countBy('city')
      .pairs()
      .sortBy(1).reverse()
      .slice(0, 10)
      .value();

    result = result.map((obj) => {
      return {
        city: obj[0],
        amount: obj[1]
      };
    });

    return result;
  }

  // Handle data to get the towers with highest player count
  handleTowersPlayerCount(data) {
    // Sort data based on player_count
    data.sort(function(a, b) {
      if (a.player_count < b.player_count) return 1;
      if (a.player_count > b.player_count) return -1;
      return 0;
    });

    // Get only the top of the sorted data
    data = data.slice(0, 10);

    var labels = [];
    var dataset = [];
    var values = [];

    this.TowerFactory.getTowers()
      .then(response => response.data)
      .then((towers) => {
        data.forEach((obj) => {

          // Get the info for the tower to get the tower name
          var tower = towers.find(found => found.tower_id == obj.tower_id);

          // Check if tower is undefind, if it is, display ID instead of name
          if (tower) {
            if (tower.tower_name) {
              labels.push(tower.tower_name);
            }
            else {
              labels.push('Tower#' + obj.tower_id);
            }
          }
          else {
            labels.push('Tower#' + obj.tower_id);
          }

          values.push(obj.player_count);
          dataset.push({link: obj.tower_id});
        });

      });

    return {
      labels: labels,
      dataset: dataset,
      data: values,
    };
  }

  handleTowersTopClaimed(data) {
    // Sort data based on claim_count
    data.sort((a, b) => {
      if (a.claim_count < b.claim_count) return 1;
      if (a.claim_count > b.claim_count) return -1;
      return 0;
    });

    // Get only the top of the sorted data
    data = data.slice(0, 10);

    let labels = [];
    let dataset = [];
    let values = [];

    this.TowerFactory.getTowers()
      .then(response => response.data)
      .then((towers) => {
        data.forEach((obj) => {

          // Get the info for the tower to get the tower name
          let tower = towers.find(found => found.tower_id == obj.tower_id);

          // Check if tower is undefind, if it is, display ID instead of name
          if (tower) {
            if (tower.tower_name) {
              labels.push(tower.tower_name);
            }
            else {
              labels.push('Tower#' + obj.tower_id);
            }
          }
          else {
            labels.push('Tower#' + obj.tower_id);
          }

          dataset.push({link: obj.tower_id});
          values.push(obj.claim_count);
        });
      });

    return {
      labels: labels,
      dataset: dataset,
      data: values,
    };
  }

  // Sort data to get the players with most geld bonus
  handleMostGeldBonus(data) {
    // Sort based on geld bonus
    let sortedData = data.sort((a, b) => b.geld_bonus - a.geld_bonus);

    // Get only the first ten of the sorted data
    sortedData = sortedData.slice(0, 10);

    let values = [];
    let labels = [];

    sortedData.forEach((obj) => {
      values.push(obj.geld_bonus);
      labels.push(obj.player_alias);
    });

    return {
      data: values,
      labels: labels,
    };
  }

  // Sort data to get the players who have built most towers
  handleMostTowersBuilt(data) {
    // Sort based on towers built
    let sortedData = data.sort((a, b) => b.count - a.count);

    // Get only the first ten of the sorted data
    sortedData = sortedData.slice(0, 10);

    let values = [];
    let labels = [];

    sortedData.forEach((obj) => {
      values.push(obj.count);
      labels.push(obj.player_alias);
    });

    return {
      data: values,
      labels: labels,
    };
  }

  // Sort data to get players who collected most geld
  handleMostGeldCollected(data) {
    // Sort based on geld collected count
    let sortedData = data.sort((a, b) => b.geld_collected - a.geld_collected);

    // Get only the first ten of the sorted data
    sortedData = sortedData.slice(0, 10);

    let values = [];
    let labels = [];

    sortedData.forEach((obj) => {
      values.push(obj.geld_collected);
      labels.push(obj.player_alias);
    });

    return {
      data: values,
      labels: labels,
    };
  }

  // Sort data to get players who claimed most towers
  handleTopClaims(data) {
    // Sort based on claim count
    let sortedData = data.sort((a, b) => b.claim_count - a.claim_count);

    // Get only the first ten of the sorted data
    sortedData = sortedData.slice(0, 10);

    let values = [];
    let labels = [];
    sortedData.forEach((obj) => {
      values.push(obj.claim_count);
      labels.push(obj.player_alias);
    });

    return {
      data: values,
      labels: labels,
    };
  }

}

export default DataFactory;
