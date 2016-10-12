import angular from 'angular';
import uiRouter from 'angular-ui-router';
import meComponent from './me.component';

let meModule = angular.module('me', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('me', {
      url: '/',
      component: 'me',
      redirectTo: 'me.main',
    })
    .state('me.main', {
      url: '',
      templateUrl: 'app/components/me/views/me.main.html',
    })
    .state('me.calendar', {
      url: 'me/calendar',
      templateUrl: 'app/components/me/views/me.calendar.html',
    })
    .state('me.graphs', {
      url: 'me/graphs',
      templateUrl: 'app/components/me/views/me.graphs.html',
    });
})

.component('me', meComponent)

.name;

export default meModule;
