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
    $resource(menuItemsUrl).get({userId: 7}, function (serverData) {
      var results = serverData.results;

      $scope.menuItems = {
        userMenu: results.userMenuItems,
        leftMenu: results.leftMenuItems
      };
    });

    var userDetailsUrl = '/api/Users';
    $resource(userDetailsUrl).get({userId: 7}, function (serverData) {
      var results = serverData.result;

      $scope.user = {
          userDetails: results
      };
    });

    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
  }
})();
