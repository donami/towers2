import angular from 'angular';
import uiRouter from 'angular-ui-router';
import leaderboardComponent from './leaderboard.component';
import Services from '../../services/services';
import ngCache from 'angular-cache';
import toastr from 'angular-toastr';

let leaderboardModule = angular.module('leaderboard', [
  uiRouter,
  ngCache,
  toastr,
  Services
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
