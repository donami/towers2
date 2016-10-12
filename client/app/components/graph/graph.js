import angular from 'angular';
import uiRouter from 'angular-ui-router';
import graphComponent from './graph.component';

let graphModule = angular.module('graph', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('graph', {
      url: '/stats',
      component: 'graphs'
    });
})

.component('graphs', graphComponent)

.name;

export default graphModule;
