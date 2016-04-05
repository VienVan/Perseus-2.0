console.log('loaded');
var app = angular.module('PerseusApp', ['ui.router', 'ngResource', 'satellizer']);


app.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function config($stateProvider, $urlRouterProvider, $locationProvider) {
  console.log('config');

  $locationProvider.html5Mode({
    enabled: true,
    requiredBase: false
  });

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      controller: 'LocationController',
      controllerAs: 'perseus',
      templateUrl: 'templates/home.html'
    })
    .state('profile', {
      url:'/users/:id',
      controller: 'ProfileController',
      controllerAs: 'pc',
      templateUrl: 'templates/profile.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupController',
      controllerAs: 'sc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController',
      controllerAs: 'lc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .state('logout', {
      url: '/logout',
      templateUrl: null,
      controller: 'LogoutController',
      resolve: {
        loginRequired: loginRequired
      }
    })

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }

}

app
  .controller('LocationController', LocationController)
  .controller('MainController', MainController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  .controller('ProfileController', ProfileController)


// controllers

MainController.$inject = ["Account"]; // minification protection
function MainController (Account) {
  var vm = this;
  vm.currentUser = function() {
   return Account.currentUser();
  }
}

// function HomeController($http) {
//
// }

ProfileController.$inject = ['$http','$stateParams'];
function ProfileController($http, $stateParams) {
  var vm = this;
  $http.get('/api/users/' + $stateParams.id)
    .then(function(res) {
      vm.profile = res.data;
    })
  vm.location = {};
  // vm.location.loc;

  vm.submitLocationForm = function() {
    vm.geocode(vm.addLocation);
  }

  vm.geocode = function(cb) {
    var apiEndPoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+vm.location.zipcode+'.json?access_token=pk.eyJ1IjoidmllbnZhbiIsImEiOiJjaW1uczNyazYwMDE3dGtseTUxNndqcTEyIn0.fkvvqUjwFKLu5JhdbwKNWw'
    $http.get(apiEndPoint)
      .then(function(res) {
        var longLat = res.data.features[0].center;
        cb(longLat);
        // console.log("vm.location.zipcode", vm.location.zipcode)
        // console.log("res map", res);
        // console.log("longlat", res.data.features[0].center);
        //call add location...
    })
  }

  vm.addLocation = function(longLat) {
    vm.location.loc = longLat;
    console.log("geocode", vm.location.loc)
    $http.post('/api/user/'+$stateParams.id+'/locations', vm.location)
      .then(function(res) {
        console.log("location res", res)
      })
  }
}

LoginController.$inject = ["$location", "Account"]; // minification protection
function LoginController ($location, Account, $stateParams) {
  var vm = this;
  vm.new_user = {}; // form data
  vm.login = function() {
    Account
      .login(vm.new_user)
      .then(function(){
        vm.new_user = {}; // clear sign up form
        $location.path('/');
      })
  };
}

SignupController.$inject = ["$location", "Account"]; // minification protection
function SignupController ($location, Account) {
  var vm = this;
  vm.new_user = {}; // form data

  vm.signup = function() {
    Account
      .signup(vm.new_user)
      .then(
        function (response) {
          vm.new_user = {}; // clear sign up form
          $location.path('/'); // redirect to '/profile'
        }
      );
  };
}

LogoutController.$inject = ["$location", "Account"]; // minification protection
function LogoutController ($location, Account) {
  Account
    .logout()
    .then(function () {
        $location.path('/login');
    });
}

LocationController.$inject = ["Location", "$http"]
function LocationController(Location, $http){
  var self = this;
  self.locations = Location.query();
  self.newLocation = {}

};


app.service('Location', function($resource) {
    return $resource('http://localhost:3000/api/locations/:id', {id: '@_id' }, {
      update: {
        method: 'PATCH' // this method issues a PUT request
    }
  });
});


// service for account and login

app.service('Account', Account);
Account.$inject = ["$http", "$q", "$auth"];
function Account($http, $q, $auth) {
  var self = this;
  self.user = null;

  self.signup = signup;
   self.login = login;
   self.logout = logout;
   self.currentUser = currentUser;
   self.getProfile = getProfile;

   function signup(userData) {
       return (
         $auth
           .signup(userData) // signup (https://github.com/sahat/satellizer#authsignupuser-options)
           .then(
             function onSuccess(response) {
               $auth.setToken(response.data.token); // set token (https://github.com/sahat/satellizer#authsettokentoken)
             },

             function onError(error) {
               console.error(error);
             }
           )
       );
     }

     function login(userData) {
       return (
         $auth
           .login(userData) // login (https://github.com/sahat/satellizer#authloginuser-options)
           .then(
             function onSuccess(response) {
               $auth.setToken(response.data.token); // set token (https://github.com/sahat/satellizer#authsettokentoken)
             },

             function onError(error) {
               console.error(error);
             }
           )
       );
     }

     function logout() {
       return (
         $auth
           .logout() // delete token (https://github.com/sahat/satellizer#authlogout)
           .then(function() {
             self.user = null;
           })
       );
     }


function currentUser() {
  if ( self.user ) { return self.user; }
  if ( !$auth.isAuthenticated() ) { return null; }

  var deferred = $q.defer();
  getProfile().then(
    function onSuccess(response) {
      self.user = response.data;
      deferred.resolve(self.user);
    },

    function onError() {
      $auth.logout();
      self.user = null;
      deferred.reject();
    }
  )
  self.user = promise = deferred.promise;
  return promise;

}

function getProfile() {
    return $http.get('/api/me');
  }

}
