'use strict';

/**
 * @ngdoc overview
 * @name administrationApp
 * @description
 * # administrationApp
 *
 * Main module of the application.
 */
(function () {
  // agGrid.initialiseAgGridWithAngular1(angular);
  angular
    .module('administrationApp', [
      'ngAnimate',
      'ngCookies',
      'ngMessages',
      'ngResource',
      'ngSanitize',
      'ui.router',
      'ngMaterial',
      'angular-loading-bar',
      // 'agGrid'
    ])

    .run(['$rootScope', '$state', 'administrationService', function ($rootScope, $state, administrationService) {
    }]);
})();
