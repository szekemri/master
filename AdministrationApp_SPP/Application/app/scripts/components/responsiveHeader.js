/**
 * Created by Razvan on 13.04.2017.
 */
'use strict';
(function () {
  angular.module('administrationApp')
    .directive("scroll", responsiveHeader);

  function responsiveHeader () {
    return {
      link: function (scope, element, attrs) {
        var $pageHeader = $('.pageHeader');
        element.bind('scroll', function () {
          $pageHeader.css('top', this.scrollTop);
        });
      }
    };
  }

})();
