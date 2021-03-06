import angular from 'angular';
import uiRouter from 'angular-ui-router';
import hallOfFameComponent from './hall-of-fame.component';
import Directives from '../../directives/directives';

let hallOfFameModule = angular.module('hallOfFame', [
  uiRouter,
  Directives,
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('hallOfFame', {
      url: '/hall-of-fame',
      component: 'hallOfFameComponent'
    });

})

.component('hallOfFameComponent', hallOfFameComponent)

.name;

export default hallOfFameModule;
