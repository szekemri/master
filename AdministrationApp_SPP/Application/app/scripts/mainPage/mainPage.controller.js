/**
 * Created by Razvan on 04.11.2016.
 */
'use strict';

(function () {
  angular.module('administrationApp')
    .controller('mainPageController', mainPageController);

  mainPageController.$inject = ['userDetails', 'administrationService'];
  function mainPageController(userDetails, administrationService) {

    if (userDetails) {
      var details = {
        emailAddress: userDetails.EmailAddress,
        firstName: userDetails.FirstName,
        isDeleted: userDetails.IsDeleted,
        lastName: userDetails.LastName,
        loginName: userDetails.LoginName,
        userId: userDetails.UserID
      };

      administrationService.setUserDetails(details);
    }
  }

})();
