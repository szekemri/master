/**
 * Created by Razvan on 06.10.2016.
 */
'use strict';

(function () {
  angular.module('administrationApp')
    .config(stateConfig)
    .config(httpConfig)
    .config(resourceConfig)
    .config(progressbarConfig);
    // .config(materialThemeConfig);

  /**
   * State config injection + method
   * @type {string[]}
   */
  stateConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
  function stateConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise(function () {
      return 'generalInformation';
    });

    $stateProvider
      .state('generalInformation', {
        url: '/generalInformation',
        templateUrl: 'scripts/generalInformation/generalInformation.html',
        controller: 'generalInformationController'
      })
      .state('myAccount', {
        url: '/userAccount',
        templateUrl: 'scripts/userAccount/userAccount.html',
        controller: 'userAccountController'
      })
      .state('detailedInformation', {
        url: '/detailedInformation',
        templateUrl: 'scripts/detailedInformation/detailedInformation.html',
        controller: 'detailedInformationController'
      });
  }

  httpConfig.$inject = ['$httpProvider'];
  function httpConfig($httpProvider) {
    $httpProvider.defaults.headers.common = {
      'Content-Type': 'application/json; charset=utf-8',
      'Response-Type': 'json'
    };
  }

  resourceConfig.$inject = ['$resourceProvider'];
  function resourceConfig($resourceProvider) {

    $resourceProvider.defaults.actions.put = {
      method: 'PUT'
    };

    $resourceProvider.defaults.actions.post = {
      method: 'POST'
    };
  }

  progressbarConfig.$inject = ['cfpLoadingBarProvider'];
  function progressbarConfig(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.parentSelector = '.topBarContainer';
    cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner"></span></div>';
  }

  materialThemeConfig.$inject = ['$mdThemingProvider'];
  function materialThemeConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'default': '400', // by default use shade 400 from the blue palette for primary intentions
        'hue-1': '500', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })
      // If you specify less than all of the keys, it will inherit from the
      // default shades
      .accentPalette('purple', {
        'default': '200' // use shade 200 for default, and keep all other shades the same
      })

      .backgroundPalette('grey', {
        'default': '400', // by default use shade 400 from the blue palette for primary intentions
        'hue-1': '500', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      });
  }
})();

