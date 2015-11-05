(function () {
  'use strict';

  angular
    .module('thinkster.config')
    .config(config);
  
  config.$inject = ['$locationProvider'];

  /**
  * @name config
  * @desc Enable HTML5 routing
  * If HTML5 routing, angular will fall back to this hash routing.
  */
  function config($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }
})();