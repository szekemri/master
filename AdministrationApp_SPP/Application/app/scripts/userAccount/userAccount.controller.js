/**
 * Created by Razvan on 03.11.2016.
 */
'use strict';

(function () {
  angular.module('administrationApp')
    .controller('userAccountController', userAccountController);

  userAccountController.$inject = ['$scope', '$resource'];
  function userAccountController($scope, $resource) {

    $scope.saveUserDetails = function () {
      $resource('/api/Users').put({
        users: $scope.user
      }, function (response) {
      });
    };
  }
})();

