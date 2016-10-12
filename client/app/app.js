import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angular-translate';
import 'angular-cookies';
import 'angular-cache';
import 'angular-ui-bootstrap';
import 'angular-toastr';
import 'chart.js';
import 'angular-chart.js';
import Common from './common/common';
import Components from './components/components';
import Directives from './directives/directives';
import Services from './services/services';
import Filters from './filters/filters';
import AppComponent from './app.component';

import { langEnglish, langSwedish } from './common/languages';
import 'bootstrap/dist/css/bootstrap.min.css';
import './common/smoothScroll';
import './app.scss';

angular.module('app', [
    'pascalprecht.translate',
    'ngCookies',
    'ui.bootstrap',
    'ngCookies',
    'toastr',
    'chart.js',
    'pascalprecht.translate',
    'angular-cache',
    'smoothScroll',
    uiRouter,
    Common,
    Components,
    Filters,
    Services.name,
    Directives.name
  ])
  .config(($locationProvider) => {
    "ngInject";

    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .config(($translateProvider) => {
    'ngInject';

    $translateProvider.translations('en', langEnglish);

    $translateProvider.translations('se', langSwedish);

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
  })

  .run(($rootScope, $state) => {
    'ngInject';

    // If parent state has redirectTo property, use it to change state
    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params);
      }
    });
  })

  .run(($cookies, $state, $rootScope) => {
    'ngInject';

    $rootScope.$on('$stateChangeStart', (e, toState, toParams, fromState, fromParams) => {

      // Don't redirect if user is trying to access login page
      if (toState.name === 'login')
        return;

      // Check if user has provided api key in cookie
      if (!$cookies.get('userApiKey')) {
        console.log('User has not provided API key');

        // Prevent default state
        e.preventDefault();
        // Set state to login
        $state.go('login');
      }

    });
  })

  .config((CacheFactoryProvider) => {
    'ngInject';

    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
  })

  .run(($cookies, $translate) => {
    'ngInject';

    if ($cookies.get('language')) {
      $translate.use($cookies.get('language'));
    }
  })

  .factory('httpRequestInterceptor', ($cookies, $injector, $state, $q, $rootScope) => {
    'ngInject';
    return {
      responseError: (responseRejection) => {

        if(responseRejection.status === 403) {
          $state.go('login');
        }

        return $q.reject( responseRejection );
      },

      request: (config) => {
        if (config.url.indexOf('http://localhost') == 0) {
          if ($cookies.get('userApiKey')) {
            config.headers['Authorization'] = $cookies.get('userApiKey');
          }
          else {
            config.headers['Authorization'] = undefined;
          }
        }

        return config;
      }
    };
  })

  .config(function ($httpProvider) {
    'ngInject';
    $httpProvider.interceptors.push('httpRequestInterceptor');
  })

  .component('app', AppComponent);
