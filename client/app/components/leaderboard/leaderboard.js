import angular from 'angular';
import uiRouter from 'angular-ui-router';
import leaderboardComponent from './leaderboard.component';
import Services from '../../services/services';
import ngCache from 'angular-cache';
import toastr from 'angular-toastr';
import TemplateMain from './views/leaderboard.main.html';
import TemplateNewMoons from './views/leaderboard.new-moons.html';

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
      template: TemplateMain,
    })
    .state('leaderboard.new-moons', {
      url: '/new-moons',
      template: TemplateNewMoons,
    });
})

.component('leaderboard', leaderboardComponent)

.name;

export default leaderboardModule;
