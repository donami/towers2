import angular from 'angular';
import uiRouter from 'angular-ui-router';
import towerComponent from './tower.component';
import Services from '../../services/services';
import ngCache from 'angular-cache';

let towerModule = angular.module('tower', [
  uiRouter,
  Services,
  ngCache
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('tower', {
      url: '/tower/:id',
      component: 'tower',
      redirectTo: 'tower.main',
    })
    .state('tower.main', {
      url: '/',
      templateUrl: 'app/components/tower/views/tower.main.html',
    })
    .state('tower.log', {
      url: '/log',
      templateUrl: 'app/components/tower/views/tower.log.html',
    })
})

.component('tower', towerComponent)

.name;

export default towerModule;
