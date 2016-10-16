app.controller("HeaderCtrl", ['$scope', '$rootScope', '$http', '$location', 'authService', function($scope, $rootScope, $http, $location, authService) {

  var authenticate = function(credentials, callback) {
    $rootScope.headers = credentials ? {authorization : "Basic " + btoa(credentials.username + ":" + credentials.password)} : {};
    $http.get('http://localhost:8080/user', {headers : $rootScope.headers})
    .success(function(data) {
      if (data.name) {
        $rootScope.authenticated = true;
        authService.setAuthorizationHeader($rootScope.headers);
      } else {
        $rootScope.authenticated = false;
      }
      callback && callback();
    }).error(function() {
      $rootScope.authenticated = false;
      authService.setAuthorizationHeader("");
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
        authService.setAuthorizationHeader($rootScope.headers);
        $location.path("/");
        $scope.error = false;
      } else {
        authService.setAuthorizationHeader("");
        $location.path("/login");
        $scope.error = true;
      }
    });
  };

  $scope.logout = function() {
    $http.post('logout', {}).success(function() {
      $rootScope.authenticated = false;
      authService.setAuthorizationHeader("");
      $location.path("/");
    }).error(function(data) {
      $rootScope.authenticated = false;
    });
  };
}]);
