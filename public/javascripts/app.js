var app = angular.module('PerseusApp', ['ui.router', 'ngResource', 'satellizer', 'leaflet-directive', 'ngAnimate']);

app.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function config($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requiredBase: false
  });

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      templateUrl: "templates/home.html",
      controller: "HomeController",
      controllerAs: "hc"
    })
    .state('profile', {
      url:'/profile/:id',
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
  .controller('HomeController', HomeController)
  .controller('MainController', MainController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  .controller('ProfileController', ProfileController)

// controllers
HomeController.$inject = ["$scope", "$http", "leafletBoundsHelpers", "leafletData"]
function HomeController ($scope, $http, leafletBoundsHelpers, leafletData) {
  var bounds = leafletBoundsHelpers.createBoundsFromArray([
        [ 50.3454604086048, -48.515625],
        [ 23.32208001137843, -130.869140625 ]
    ]);
  var icons = {
    div_icon: {
      type: 'div',
      className: 'marker'
    }
  }
  $scope.geocode = function() {
    var apiEndPoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+$scope.zipcode+'.json?access_token=pk.eyJ1IjoidmllbnZhbiIsImEiOiJjaW1uczNyazYwMDE3dGtseTUxNndqcTEyIn0.fkvvqUjwFKLu5JhdbwKNWw'
    $http.get(apiEndPoint)
    .then(function(res) {
      var longLat = res.data.features[0].center;
      $scope.center.lat = longLat[1];
      $scope.center.lng = longLat[0];
      $scope.center.zoom = 10;
      console.log("longlat", longLat)
      console.log("center",$scope.center)
    })
  }
  angular.extend($scope, {
    bounds: bounds,
    icons: icons,
    center: {},
    defaults: {
      scrollWheelZoom: false,
      maxZoom: 12
    },
    layers: {
      baselayers: {
        mapbox_light: {
          name: 'Mapbox Dark',
          url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
          type: 'xyz',
          layerOptions: {
            opacity: 0.58,
            apikey: 'pk.eyJ1IjoidmllbnZhbiIsImEiOiJjaW1uczNyazYwMDE3dGtseTUxNndqcTEyIn0.fkvvqUjwFKLu5JhdbwKNWw',
            mapid: 'mapbox.dark'
          }
        }
      }
    },
    markers: {}
  });
  $http.get('/api/locations')
    .then(function(response) {
      $scope.locations = response.data;
      $scope.locations.forEach(function(location) {
        $scope.markers[location._id] = {
            lat: location.loc[1],
            lng: location.loc[0],
            message: "<div class='pin-message'><h1><a href="+location.url+">"+location.name+"</a></h1><p>"+location.description+"</p></div>",
            icon: icons.div_icon
        }
      })
    })
}

MainController.$inject = ["Account"]; // minification protection
function MainController (Account) {
  var vm = this;
  vm.showOverlay = true;
  // vm.hideNav = false;
  vm.currentUser = function() {
   return Account.currentUser();
  }
}

ProfileController.$inject = ['$scope','$http', '$stateParams', 'leafletBoundsHelpers'];
function ProfileController($scope, $http, $stateParams, leafletBoundsHelpers) {
  $scope.showForm = false;
  var bounds = leafletBoundsHelpers.createBoundsFromArray([
        [ 50.3454604086048, -48.515625],
        [ 23.32208001137843, -130.869140625 ]
    ]);
  var icons = {
    div_icon: {
      type: 'div',
      className: 'individual-marker'
    }
  }
  $http.get('/api/user/'+$stateParams.id+'/locations')
  .then(function(res) {
    console.log("individual location", res)
    res.data.forEach(function(location) {
      $scope.markers[location._id] = {
        lat: location.loc[1],
        lng: location.loc[0],
        message: "<div class='pin-message'><h1><a href="+location.url+">"+location.name+"</a></h1><p>"+location.description+"</p></div>",
        icon: icons.div_icon
      }
    })
  })
  $scope.addMarker = function(lat, long, message) {
      angular.extend($scope, {
              m1: {
                  lat: lat,
                  lng: long,
                  message: message,
                  icon: icons.div_icon
              }
      });
  };

  angular.extend($scope, {
    bounds: bounds,
    icons: icons,
    center: {
      autoDiscover: true
    },
    defaults: {
      maxZoom: 14
    },
    layers: {
      baselayers: {
        mapbox_light: {
          name: 'Mapbox Dark',
          url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
          type: 'xyz',
          layerOptions: {
            opacity: .6,
            apikey: 'pk.eyJ1IjoidmllbnZhbiIsImEiOiJjaW1uczNyazYwMDE3dGtseTUxNndqcTEyIn0.fkvvqUjwFKLu5JhdbwKNWw',
            mapid: 'mapbox.dark'
          }
        },
        osm: {
            name: 'OpenStreetMap',
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            type: 'xyz'
        }
      }
    },
    markers: {}
  });
  $scope.location = {};
  $http.get('/api/me')
    .then(function(res) {
      console.log("profile res", res.data)
      $scope.profile = res.data;
    })

  $scope.submitLocationForm = function() {
    $scope.geocode($scope.addLocation);
  }

  $scope.geocode = function(cb) {
    var apiEndPoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+$scope.location.zipcode+'.json?access_token=pk.eyJ1IjoidmllbnZhbiIsImEiOiJjaW1uczNyazYwMDE3dGtseTUxNndqcTEyIn0.fkvvqUjwFKLu5JhdbwKNWw'
    $http.get(apiEndPoint)
      .then(function(res) {
        var longLat = res.data.features[0].center;
        cb(longLat);
    })
  }

  $scope.addLocation = function(longLat) {
    $scope.location.loc = longLat;
    $scope.center.lat = longLat[1];
    $scope.center.lng = longLat[0];
    $scope.center.zoom = 10;
    $scope.addMarker($scope.location.loc[1], $scope.location.loc[0], $scope.location.description)
    console.log("geocode", $scope.location.loc)
    $http.post('/api/user/'+$stateParams.id+'/locations', $scope.location)
      .then(function(res) {
        console.log("location res", res)
        $scope.location = {};
      })

  }
}

LoginController.$inject = ["$location", "Account"]; // minification protection
function LoginController ($location, Account) {
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
        $location.path('/');
        window.location.reload();
    });
}


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
