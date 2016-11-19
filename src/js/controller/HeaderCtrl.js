app.controller("HeaderCtrl", ['$scope', '$rootScope', '$http', '$location', 'AuthService', 'PathService', function($scope, $rootScope, $http, $location, AuthService, PathService) {
  $rootScope.authenticated = AuthService.isAuthenticated();
  $rootScope.isAdmin = AuthService.isAdmin();
  var authenticate = function(credentials, callback) {
    $rootScope.headers = credentials ? {authorization : "Basic " + btoa(credentials.email + ":" + credentials.password)} : {};
    $http.get(PathService.getPath() + 'user', {headers : $rootScope.headers})
    .success(function(data) {
      if (data.name) {
        AuthService.setAuthenticated(true);
        $rootScope.authenticated = true;
        AuthService.setAuthorizationHeader($rootScope.headers);
        $scope.checkIfAdmin(data.authorities);
      } else {
        AuthService.setIsAdmin(false);
        AuthService.setAuthenticated(false);
        $rootScope.authenticated = false;
      }
      callback && callback();
    }).error(function() {
    });
  };

  if(AuthService.isAuthenticated() === false) {
    authenticate();
  };

  if(!$rootScope.credentials) {
    $rootScope.credentials = {};
  };

  $scope.login = function() {
    authenticate($rootScope.credentials, function() {
      if ($rootScope.authenticated) {
        AuthService.setAuthorizationHeader($rootScope.headers);
        $location.path("/");
        $scope.error = false;
      } else {
        $scope.error = true;
      }
    });
  };

  $scope.logout = function() {
    $http({
      method: 'POST',
      url: PathService.getPath() + 'logout'
    }).then(function() {
      AuthService.setAuthenticated(false);
      AuthService.setIsAdmin(false);
      $rootScope.authenticated = false;
      $rootScope.isAdmin = false;
      AuthService.setAuthorizationHeader("");
      AuthService.setAuthenticated(false);
      $location.path("/");
    }, function(data) {
      $scope.error = true;
    });
  };

  $scope.register = function(reservation_credentials) {
    $http({
      method: 'POST',
      url: PathService.getPath() + 'users',
      data: {
        "email": reservation_credentials.email,
        "password" : reservation_credentials.password
      }
    }).then(function(response) {
      $location.path("/login")
    }, function(data) {
      $scope.error = true;
    });
  };

  $scope.checkIfAdmin = function(authorities) {
    if(AuthService.checkIfAdmin(authorities)) {
      $rootScope.isAdmin = true;
      AuthService.setIsAdmin(true);
    } else {
      $rootScope.isAdmin = false;
      AuthService.setIsAdmin(false);
    }
  };
}]);
