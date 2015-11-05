(function () {
  'use strict';


//All we do here is define the modules 
///this module DEPENDS on the following controllers, services... and wraps around the other two... the goal is to only have one module called 'thinkster'

  angular
    .module('thinkster.authentication', [
      'thinkster.authentication.controllers',
      'thinkster.authentication.services'
    ]);

  angular
    .module('thinkster.authentication.controllers', []);

  angular
    .module('thinkster.authentication.services', ['ngCookies']);
    
    
})();