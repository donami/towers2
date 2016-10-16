import angular from 'angular';
import uiRouter from 'angular-ui-router';
import meComponent from './me.component';
import 'angular-cookies';
import 'angular-cache';
import 'angular-translate';
import Services from './../../services/services';
import Filters from './../../filters/filters';
import TemplateMain from './views/me.main.html';
import TemplateCalendar from './views/me.calendar.html';
import TemplateGraph from './views/me.graphs.html';

let meModule = angular.module('me', [
  uiRouter,
  Services,
  Filters,
  'pascalprecht.translate',
  'angular-cache',
  'ngCookies',
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
      template: TemplateMain,
    })
    .state('me.calendar', {
      url: 'me/calendar',
      template: TemplateCalendar,
    })
    .state('me.graphs', {
      url: 'me/graphs',
      template: TemplateGraph,
    });
})

.component('me', meComponent)

.name;

export default meModule;
