/**
* Register controller
* @namespace thinkster.authentication.controllers
*/
/*global angular*/

(function () {
  'use strict';

  angular
    .module('thinkster.authentication.controllers')
    .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'Authentication'];

    /**
    * @namespace RegisterController
    */
    function RegisterController($location, $scope, Authentication) {
      // Tells angular that we want to refer to the controller as vm within the template/view
      // Using this, prevents any clashes or naming conflicts
      // VM NOW BECOMES THE NAME OF THE SCOPE
      var vm = this;
      
      vm.register = register;
  
      /**
      * @name register
      * @desc Register a new user
      * @memberOf thinkster.authentication.controllers.RegisterController
      */
        function register() {
          Authentication.register(vm.email, vm.password, vm.username);
        }
    
    // this function is also in the login.controller - which redirects already logged in users. So if someone has just registered, sent them too.
    // because this is closed in a function, we just repeat it here.
     activate();
    
    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf thinkster.authentication.controllers.RegisterController
     */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }
        
        
        
        
      //closes RegisterController  
      }
      
  
  
  
  
  
})();