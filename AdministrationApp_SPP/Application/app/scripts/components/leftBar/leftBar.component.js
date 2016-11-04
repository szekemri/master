/**
 * Created by Razvan on 06.10.2016.
 */
'use strict';

(function () {
  angular.module('administrationApp')
    .component('leftBar',{
      templateUrl: 'scripts/components/leftBar/leftBar.template.html',
      controller: leftBarController
    });

  leftBarController.$inject = ['$scope', '$resource', 'administrationService'];
  function leftBarController($scope, $resource, administrationService) {

    $scope.userDetails = administrationService.getUserDetails();

    var urlMenu = '/api/MenuItems';

    $resource(urlMenu).get(
      {id: 2},
      function (response) {
        var results = response.results;

        $scope.leftMenu = results.LeftMenuItems;
        $scope.userMenu = results.UserConfigurationItems;
      });

    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
  }
})();
