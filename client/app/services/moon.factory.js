const API_URL = 'http://localhost:3000';

class MoonFactory {

  constructor($http, DataCache) {
    this.$http = $http;
    this.urlBase = API_URL + '/api/new-moons';
    this.dataCache = DataCache.get();
  }

  getNewMoons() {
    return this.$http.get(this.urlBase, { cache: this.dataCache });
  }

}

export default MoonFactory;
