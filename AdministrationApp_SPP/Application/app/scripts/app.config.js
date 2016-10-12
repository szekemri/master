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
      return 'login';
    });

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'login.html',
        controller: 'loginController'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'home.html',
        controller: 'homeController'
      });
  }
})();
