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
    Services,
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

  .run(($transitions, $cookies, $state) => {
    'ngInject';

    // Redirect user to login page if
    // no api key is set in cookies
    $transitions.onStart( {}, (transition) => {
      let to = transition.to();

      if (!$cookies.get('userApiKey') && to.name !== 'login') {
        return $state.target('login');
      }
    })
  })

  .factory('errorInterceptor', ($q, ErrorFactory) => {
    'ngInject';

    let errorInterceptor = {
      responseError: (response) => {
        if (response.status === 404) {
          ErrorFactory.addErrorMessage(response.data);
        }
        return $q.reject(response.data);
      }
    };
    return errorInterceptor;
  })

  .config(($httpProvider) => {
    'ngInject';
    $httpProvider.interceptors.push('errorInterceptor');
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

  .component('app', AppComponent);
