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

  leftBarController.$inject = ['$scope', 'administrationService'];
  function leftBarController($scope, administrationService) {
    $scope.userDetails = administrationService.getUserDetails();
  }
})();
