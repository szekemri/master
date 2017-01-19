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

    var menuItemsUrl = '/api/MenuItems';
    $resource(menuItemsUrl).get({userId: 1}, function (serverData) {
      var results = serverData.results;

      $scope.menuItems = {
        userMenu: results.userMenuItems,
        leftMenu: results.leftMenuItems
      };
    });

    var userDetailsUrl = '/api/UserDetails';
    $resource(userDetailsUrl).get({userId: 1}, function (serverData) {
      var results = serverData.results;

      $scope.user = {
        userDetails: results.userDetails
      };
    });

    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
  }
})();
