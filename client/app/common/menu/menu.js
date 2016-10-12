import angular from 'angular';
import uiRouter from 'angular-ui-router';
import menuComponent from './menu.component';

let menuModule = angular.module('menu', [
  uiRouter
])

.component('navigation', menuComponent)

.name;

export default menuModule;
