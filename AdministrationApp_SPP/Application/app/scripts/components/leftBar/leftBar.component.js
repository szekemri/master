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

    var serverData = administrationService.getServerData();

    $scope.userConfig = {
      userDetails: serverData.userDetails,
      userMenu: serverData.userConfigurationMenuItems,
      leftMenu: serverData.leftMenuItems
    };

    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
  }
})();
