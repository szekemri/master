/**
 * Created by Razvan on 11.10.2016.
 */
'use strict';

(function () {
  angular.module('administrationApp')
    .service('administrationService', administrationService);

  function administrationService() {
    var me = this;
    me.userDetails = null;
    me.serverData = null;

    me.setServerData = function (userDetails) {
      me.serverData = userDetails;
    };

    me.getServerData = function () {
      return me.serverData;
    };

    me.setUserDetails = function (userId) {
      me.userDetails = userId;
    };

    me.getUserDetails = function () {
      return me.userDetails;
    };

  }
})();
