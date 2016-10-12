import angular from 'angular';
import uiRouter from 'angular-ui-router';
import leaderboardComponent from './leaderboard.component';

let leaderboardModule = angular.module('leaderboard', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('leaderboard', {
      url: '/leaderboard',
      component: 'leaderboard',
      redirectTo: 'leaderboard.main',
    })
    .state('leaderboard.main', {
      url: '/',
      templateUrl: 'app/components/leaderboard/views/leaderboard.main.html',
    })
    .state('leaderboard.new-moons', {
      url: '/new-moons',
      templateUrl: 'app/components/leaderboard/views/leaderboard.new-moons.html',
    });
})

.component('leaderboard', leaderboardComponent)

.name;

export default leaderboardModule;
