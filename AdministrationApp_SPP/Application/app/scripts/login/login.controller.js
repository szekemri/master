/**
 * Created by Razvan on 15.05.2017.
 */
'use strict';
(function () {
  angular.module('administrationApp')
    .controller('loginController', loginController);

  loginController.$inject = ['$scope', '$state', '$mdDialog'];
  function loginController($scope, $state, $mdDialog) {
    $scope.loginUser = function (ev) {

      if ($scope.username === 'test' && $scope.password === 'test') {
        $state.go('generalInformation');
      } else {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Login problem!')
            .textContent('The username or password are incorrect! Please try again.')
            .ok('OK')
            .targetEvent(ev)
        );
      }
    }
  }
})();
