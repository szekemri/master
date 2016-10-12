/**
 * Created by Razvan on 06.10.2016.
 */
'use strict';

(function () {
  angular.module('administrationApp')
    .config(stateConfig);

  /**
   * State config injection + method
   * @type {string[]}
   */
  stateConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
  function stateConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise(function () {
      return 'home';
    });

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'scripts/home/home.html',
        controller: 'homeController'
      })
  }
})();
