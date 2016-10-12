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
  angular
    .module('administrationApp', [
      'ngAnimate',
      'ngCookies',
      'ngMessages',
      'ngResource',
      'ngSanitize',
      'ngTouch',
      'ui.router'
    ])

    .run(['$rootScope', '$state', '$resource', 'administrationService', function ($rootScope, $state, $resource, administrationService) {
      var url = 'resources/userDetails.json';
      $resource(url).get(
        function (response) {
          administrationService.setUserDetails(response.results);
        });
      // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      //
      //   if (toState.name !== fromState.name) {
      //     event.preventDefault();
      //     var url = 'resources/userDetails.json';
      //     $resource(url).get(
      //       function (response) {
      //         $state.reload();
      //       }
      //     );
      //   }
      //
      // });
    }]);
})();
