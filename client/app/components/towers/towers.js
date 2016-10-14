import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCache from 'angular-cache';
import ngTranslate from 'angular-translate';
import 'ng-table';
import towersComponent from './towers.component';
import Services from '../../services/services'

let towersModule = angular.module('towers', [
  uiRouter,
  Services,
  ngCache,
  ngTranslate,
  'ngTable',
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('towers', {
      url: '/towers',
      component: 'towers'
    });
})

.component('towers', towersComponent)

.name;

export default towersModule;
