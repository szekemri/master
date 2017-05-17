/**
 * Created by Razvan on 15.05.2017.
 */
'use strict';
(function () {
  angular.module('administrationApp')
    .controller('loginController', loginController);

  loginController.$inject = ['$scope', '$state'];
  function loginController($scope, $state) {
    $scope.loginUser = function () {
      debugger;
      if ($scope.username === 'test' && $scope.password === 'test') {
        $state.go('generalInformation');
      }
    }
  }
})();
