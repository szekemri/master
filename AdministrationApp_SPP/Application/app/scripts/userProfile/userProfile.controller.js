/**
 * Created by Razvan on 03.11.2016.
 */
'use strict';

(function () {
  angular.module('administrationApp')
    .controller('userProfileController', userProfileController);

  userProfileController.$inject = ['$scope', 'administrationService'];
  function userProfileController($scope, administrationService) {
    $scope.user = administrationService.getUserDetails();
  }
})();

