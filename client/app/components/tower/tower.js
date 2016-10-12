import angular from 'angular';
import uiRouter from 'angular-ui-router';
import towerComponent from './tower.component';

let towerModule = angular.module('tower', [
  uiRouter
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
