class MeFactory {
  constructor($http, DataCache) {
    this.$http = $http;
    this._DataCache = DataCache;

    this.urlBase = 'http://localhost:3000/api/me';
    this.dataCache = DataCache.get();
  }

  getClaims(startDate, endDate) {
    if (startDate && endDate) {
      return this.$http.get(this.urlBase + '/' + startDate + '/' + endDate, { cache: this.dataCache });
    }
    return this.$http.get(this.urlBase, { cache: this.dataCache });
  }

  getLatestClaimedTower() {
    return this.$http.get(this.urlBase + '/latest-claim');
  }
}

export default MeFactory;
