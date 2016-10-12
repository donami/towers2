const API_URL = 'http://localhost:3000';

class AchievementFactory {

  constructor($http) {
    this.$http = $http;
  }

  getAchievements() {
    return this.$http.get(API_URL + '/api/achievement');
  }

  // Scan for new achievements
  refresh() {
    return this.$http.get(API_URL + '/api/achievement/refresh');
  }

}

export default AchievementFactory;
