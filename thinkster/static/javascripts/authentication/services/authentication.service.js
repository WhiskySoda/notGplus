/**
* Authentication
* @namespace thinkster.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http'];

      /**
      * @namespace Authentication
      * @returns {Factory}
      */
      function Authentication($cookies, $http) {
        /// exposes each of the methods to the function, which is the factory of the module
        var Authentication = {
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            login: login,
            register: register,
            logout: logout,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate
          };
    
        return Authentication;

    /**
      * @name register
      * @desc Try to register a new user
      * @param {string} email The email entered by the user
      * @param {string} password The password entered by the user
      * @param {string} username The username entered by the user
      * @returns {Promise}
      * @memberOf thinkster.authentication.services.Authentication
      * 
      * 
      * PASSES THE INFORMATION RECEIVED TO THE API VIEW
      */
      
      function register(email, password, username) {
        return $http.post('/api/v1/accounts/', {
          username: username,
          password: password,
          email: email
        }).then(registerSuccessFn, registerErrorFn);
      
        /**
        * @name registerSuccessFn
        * @desc Log the new user in
        */
        function registerSuccessFn(data, status, headers, config) {
          Authentication.login(email, password);
        }
      
        /**
        * @name registerErrorFn
        * @desc Log "Epic failure!" to the console
        */
        function registerErrorFn(data, status, headers, config) {
          console.error('Epic failure!');
        }
      }
    /**
/**
 * @name login
 * @desc Try to log in with email `email` and password `password`
 * @param {string} email The email entered by the user
 * @param {string} password The password entered by the user
 * @returns {Promise}
 * @memberOf thinkster.authentication.services.Authentication
 * POST TO THE URL, e-mail and password as data to the DJANGO URL
 */
    function login(email, password) {
      return $http.post('/api/v1/auth/login/', {
        email: email, password: password
        //what happens after a login attempt
      }).then(loginSuccessFn, loginErrorFn);
    
      /**
       * @name loginSuccessFn
       * @desc Set the authenticated account and redirect to index
       */
      function loginSuccessFn(data, status, headers, config) {
        Authentication.setAuthenticatedAccount(data.data);
        // we want a hard refresh on the page - information on then nav bar must change
        window.location = '/';
      }
    
      /**
       * @name loginErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function loginErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }
    
    
      /**
       * @name getAuthenticatedAccount
       * @desc Return the currently authenticated account
       * @returns {object|undefined} Account if authenticated, else `undefined`
       * @memberOf thinkster.authentication.services.Authentication
       */
      function getAuthenticatedAccount() {
        if (!$cookies.authenticatedAccount) {
          return;
        }
      // it is stored as a string. Can't store Javascript object in a cookie
        return JSON.parse($cookies.authenticatedAccount);
      }
    
          /**
       * @name isAuthenticated
       * @desc Check if the current user is authenticated
       * @returns {boolean} True is user is authenticated, else false.
       * @memberOf thinkster.authentication.services.Authentication
       * RETURNS BOOLEAN VALUE OF COOKIE
       */
      function isAuthenticated() {
        return !!$cookies.authenticatedAccount;
      }


      /**
       * @name setAuthenticatedAccount
       * @desc Stringify the account object and store it in a cookie
       * @param {Object} user The account object to be stored
       * @returns {undefined}
       * @memberOf thinkster.authentication.services.Authentication
       *  it is stored as a string. Can't store Javascript object in a cookie
       */
      function setAuthenticatedAccount(account) {
        $cookies.authenticatedAccount = JSON.stringify(account);
      }

          /**
       * @name unauthenticate
       * @desc Delete the cookie where the user object is stored
       * @returns {undefined}
       * @memberOf thinkster.authentication.services.Authentication
       */
        function unauthenticate() {
        delete $cookies.authenticatedAccount;
      }
    
    /**
     * @name logout
     * @desc Try to log the user out
     * @returns {Promise}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function logout() {
      return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);
    
      /**
       * @name logoutSuccessFn
       * @desc Unauthenticate and redirect to index with page reload
       */
      function logoutSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();
    
        window.location = '/';
      }
    
      /**
       * @name logoutErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function logoutErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }
    
    
  }
  
  
  
  
  
})();