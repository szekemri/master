/**
 * Created by Razvan on 03.11.2016.
 */
'use strict';

(function () {
  angular.module('administrationApp')
    .controller('myAccountController', myAccountController);

  myAccountController.$inject = ['$scope', 'administrationService'];
  function myAccountController($scope, administrationService) {
    $scope.user = administrationService.getUserDetails();
  }
})();

