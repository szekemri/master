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

    var url = '/api/Users';

    $resource(url).get(
      {id: 1},
      function (response) {
        var userDetails = {
          emailAddress: response.emailAddress,
          firstName: response.firstName,
          isDeleted: response.isDeleted,
          lastName: response.lastName,
          loginName: response.loginName,
          userId: response.userID
        };
        $scope.userDetails = userDetails;
      });

    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
  }
})();
