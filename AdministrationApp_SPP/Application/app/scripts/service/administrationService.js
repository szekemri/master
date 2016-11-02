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
    me.userId = 0;

    me.setUserDetails = function (userDetails) {
      me.userDetails = userDetails;
    };

    me.getUserDetails = function () {
      return me.userDetails;
    };

    me.setUserId = function (userId) {
      me.userId = userId;
    };

    me.getUserId = function () {
      return me.userId;
    };

  }
})();
