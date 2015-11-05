(function () {
  'use strict';
   // handling routes and Csf methods needs to be in a config
  angular
    .module('thinkster.routes')
    .config(config);
    // $routeProvider will let us add routing to the client.
    config.$inject = ['$routeProvider'];

      /**
      * @name config
      * @desc Define valid application routes
      * When someone goes to /register - what needs to happen...
      * $routeProvider.when takes two arguments: a path and an options object. 
      * Here we use /register as the path because thats where we want the registration form to show up.
      * One key you can include in the options object is controller. This will map a certain controller to this route. 
      * Here we use the RegisterController controller we made earlier. controllerAs is another option. This is required to use the vm variable. 
      * In short, we are saying that we want to refer to the controller as vm in the template.
      */
      function config($routeProvider) {
                  $routeProvider
                  
                  .when('/register', {
                    
                  controller: 'RegisterController', 
                  controllerAs: 'vm',
                  templateUrl: '/static/templates/authentication/register.html'
                        })
                  .when('/', {
                        controller: 'IndexController',
                        controllerAs: 'vm',
                        templateUrl: '/static/templates/layout/index.html'
                      })    
                  .when('/login', {
                  controller: 'LoginController',
                  controllerAs: 'vm',
                  templateUrl: '/static/templates/authentication/login.html'
                        })
                 .when('/+:username', {
                  controller: 'ProfileController',
                  controllerAs: 'vm',
                  templateUrl: '/static/templates/profiles/profile.html'
                        })
                .when('/+:username/settings', {
                      controller: 'ProfileSettingsController',
                      controllerAs: 'vm',
                      templateUrl: '/static/templates/profiles/settings.html'
                        })
                .otherwise('/');
  
      }
  
  

  
  
})();