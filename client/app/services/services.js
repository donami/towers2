import angular from 'angular';

import MeFactory from './me.factory';
import TowerFactory from './tower.factory';
import AchievementFactory from './achievement.factory';
import MoonFactory from './moon.factory';
import DataFactory from './data.factory';
import DataCache from './datacache.factory';
import AuthService from './auth.service';
import MapService from './map.service';
import DateService from './date.service';
import GraphFilter from './graph-filter.service';
import LanguageService from './language.service';

export default angular
  .module('app.services', [])

  .factory('MeFactory', ['$http', 'DataCache', ($http, DataCache) => new MeFactory($http, DataCache)])
  .factory('TowerFactory', ['$http', 'DataCache', ($http, DataCache) => new TowerFactory($http, DataCache)])
  .factory('MoonFactory', ['$http', 'DataCache', ($http, DataCache) => new MoonFactory($http, DataCache)])
  .factory('DataFactory', ['TowerFactory', '$q', (TowerFactory, $q) => new DataFactory(TowerFactory, $q)])
  .factory('AchievementFactory', ['$http', ($http) => new AchievementFactory($http)])
  .factory('DataCache', ['CacheFactory', (CacheFactory) => new DataCache(CacheFactory)])
  .service('AuthService', AuthService)
  .service('DateService', DateService)
  .service('MapService', MapService)
  .service('GraphFilter', GraphFilter)
  .service('LanguageService', LanguageService)

  .name;
