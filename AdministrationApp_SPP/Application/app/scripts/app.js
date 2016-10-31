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
      'ui.router',
      'ngMaterial'
    ])

    .run(['$rootScope', '$state', '$resource', 'administrationService', function ($rootScope, $state, $resource, administrationService) {
        var url = '/api/Users';
        $resource(url).get(
            { id: 1 },
            function (response) {
          administrationService.setUserDetails(response.results);
        });
      // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      //   debugger;
      //   if (toState.name !== fromState.name) {
      //     event.preventDefault();
      //     var url = 'resources/userDetails.json';
      //     $resource(url).get(
      //       function (response) {
      //         administrationService.setUserDetails(response.results);
      //         $state.reload();
      //       }
      //     );
      //   }
      //
      // });
    }]);
})();
