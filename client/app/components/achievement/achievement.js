import angular from 'angular';
import uiRouter from 'angular-ui-router';
import achievementComponent from './achievement.component';
import Directives from '../../directives/directives';
import Services from '../../services/services';
import toastr from 'angular-toastr';

let achievementModule = angular.module('achievement', [
  uiRouter,
  Services,
  Directives,
  toastr,
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('achievements', {
      url: '/achievements',
      component: 'achievements'
    });
})

.component('achievements', achievementComponent)

.name;

export default achievementModule;
