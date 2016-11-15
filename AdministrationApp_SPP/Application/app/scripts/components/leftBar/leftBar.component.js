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

  leftBarController.$inject = ['$scope', '$resource'];
  function leftBarController($scope, $resource) {

    var urlUsers = '/api/UserConfiguration';

    $resource(urlUsers).get({id: 1}, function (serverData) {
      $scope.userConfig = {
        userDetails: serverData.results.userDetails,
        userMenu: serverData.results.userConfigurationMenuItems,
        leftMenu: serverData.results.leftMenuItems
      };
    });

    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
  }
})();
