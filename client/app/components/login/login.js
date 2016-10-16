import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginComponent from './login.component';
import ngCookies from 'angular-cookies';
import toastr from 'angular-toastr';
import Services from '../../services/services';

let loginModule = angular.module('login', [
  uiRouter,
  ngCookies,
  toastr,
  Services
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('login', {
      url: '/login',
      component: 'login'
    });
})

.component('login', loginComponent)

.name;

export default loginModule;
