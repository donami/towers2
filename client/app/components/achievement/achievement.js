import angular from 'angular';
import uiRouter from 'angular-ui-router';
import achievementComponent from './achievement.component';

let achievementModule = angular.module('achievement', [
  uiRouter
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
