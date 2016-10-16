app.controller("HeaderCtrl",  function($rootScope, $scope, $http, $location) {

  var authenticate = function(credentials, callback) {
    $rootScope.headers = credentials ? {authorization : "Basic " + btoa(credentials.username + ":" + credentials.password)} : {};
    $http.get('http://localhost:8080/user', {headers : $rootScope.headers})
    .success(function(data) {
      if (data.name) {
        $rootScope.authenticated = true;
      } else {
        $rootScope.authenticated = false;
      }
      callback && callback();
    }).error(function() {
      $rootScope.authenticated = false;
      callback && callback();
    });
  };

  if($rootScope.authenticated === false) {
    authenticate();
  }

  if(!$rootScope.credentials) {
    $rootScope.credentials = {};
  }

  $scope.login = function() {
    authenticate($rootScope.credentials, function() {
      if ($rootScope.authenticated) {
        $location.path("/");
        $scope.error = false;
      } else {
        $location.path("/login");
        $scope.error = true;
      }
    });
  };

  $scope.logout = function() {
    $http.post('logout', {}).success(function() {
      $rootScope.authenticated = false;
      $location.path("/");
    }).error(function(data) {
      $rootScope.authenticated = false;
    });
  };
});
