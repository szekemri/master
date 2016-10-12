/**
 * Created by Razvan on 11.10.2016.
 */
'use strict';

(function () {
  angular.module('administrationApp')
    .service('administrationService', administrationService);

  function administrationService() {
    var me = this;
    me.userDetails = '';

    me.setUserDetails = function (userDetails) {
      me.userDetails = userDetails;
    };

    me.getUserDetails = function () {
      return me.userDetails;
    };

  }
})();
