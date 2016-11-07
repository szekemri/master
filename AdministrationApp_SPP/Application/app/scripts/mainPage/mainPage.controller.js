/**
 * Created by Razvan on 04.11.2016.
 */
'use strict';

(function () {
  angular.module('administrationApp')
    .controller('mainPageController', mainPageController);

  mainPageController.$inject = ['serverData', 'administrationService'];
  function mainPageController(serverData, administrationService) {

    if (serverData) {
      administrationService.setServerData(serverData.results);
      administrationService.setUserDetails(serverData.results.userDetails);
    }
  }

})();
