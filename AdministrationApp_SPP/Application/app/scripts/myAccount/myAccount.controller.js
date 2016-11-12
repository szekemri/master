/**
 * Created by Razvan on 03.11.2016.
 */
'use strict';

(function () {
  angular.module('administrationApp')
    .controller('myAccountController', myAccountController);

  myAccountController.$inject = ['$scope', 'administrationService', '$resource'];
  function myAccountController($scope, administrationService, $resource) {
    $scope.user = administrationService.getUserDetails();

    $scope.saveUserDetails = function () {
      $resource('/api/Users').put({
        users: $scope.user,
        id: $scope.user.UserID
      }, function (response) {
      });
    };
  }
})();

