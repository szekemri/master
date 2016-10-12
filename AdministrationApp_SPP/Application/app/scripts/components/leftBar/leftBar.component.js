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

  leftBarController.$inject = ['$scope', '$interval'];
  function leftBarController($scope, $interval) {

    // $interval(updateTime, 1000);
    //
    // function updateTime() {
    //   $scope.currentTime = moment(new Date()).format('DD MM YYYY HH:mm');
    // }
  }
})();
