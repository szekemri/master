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
  agGrid.initialiseAgGridWithAngular1(angular);
  angular
    .module('administrationApp', [
      'ngAnimate',
      'ngCookies',
      'ngMessages',
      'ngResource',
      'ngSanitize',
      'ngTouch',
      'ui.router',
      'ngMaterial',
      'angular-loading-bar',
      'agGrid'
    ])

    .run(['$rootScope', '$state', 'administrationService', function ($rootScope, $state, administrationService) {

      // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      //   debugger;
      //   // if (toState.name !== fromState.name) {
      //     event.preventDefault();
      //
      //     if (!administrationService.getUserDetails()) {
      //       $state.reload();
      //     }
      //   // }
      //
      // });

    }]);
})();
