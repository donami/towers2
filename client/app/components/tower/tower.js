import angular from 'angular';
import uiRouter from 'angular-ui-router';
import towerComponent from './tower.component';
import Services from '../../services/services';
import ngCache from 'angular-cache';
import TemplateMain from './views/tower.main.html';
import TemplateLog from './views/tower.log.html';

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
      template: TemplateMain,
    })
    .state('tower.log', {
      url: '/log',
      template: TemplateLog,
    });
})

.component('tower', towerComponent)

.name;

export default towerModule;
