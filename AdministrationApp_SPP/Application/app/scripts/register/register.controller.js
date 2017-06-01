/**
 * Created by Razvan on 01.06.2017.
 */
'use strict';
(function () {
  angular.module('administrationApp')
    .controller('registerController', registerController);

  registerController.$inject = ['$scope', '$resource'];
  function registerController($scope, $resource) {
    var me = this;

    /**
     * Show to the user the format of username
     * @return {void}
     */
    $scope.showUsername = function () {
      if ($scope.registerForm.firstName.$valid && $scope.registerForm.lastName.$valid) {
        $scope.username = $scope.firstName + '.' + $scope.lastName;
      } else {
        $scope.username = '';
      }
    };

    /**
     * Check the validity of key on the server
     * @return {void}
     */
    $scope.checkKeyValidity = function () {
      var url = 'resources/userDetails.json';

      if ($scope.registerForm.keyCode.$valid) {
        $resource(url).get(
          {
            key: $scope.keyCode
          },
          function (response) {
            if (response.valid){
              me.keyValid = true;
            } else {
              me.keyInvalid = true;
            }
          });
      } else {
        me.keyValid = false;
        me.keyInvalid = false;
      }

    };

  }
})();
