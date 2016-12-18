app.controller("HeaderCtrl", ['$scope', '$rootScope', '$http', '$location', 'AuthService', 'PathService', function($scope, $rootScope, $http, $location, AuthService, PathService) {
  $rootScope.authenticated = AuthService.isAuthenticated();
  $rootScope.isAdmin = AuthService.isAdmin();
  $rootScope.principal = AuthService.getPrincipal();
  var authenticate = function(credentials, callback) {
    $rootScope.headers = credentials ? {authorization : "Basic " + btoa(credentials.email + ":" + credentials.password)} : {};
    $http.get(PathService.getPath() + 'user', {headers : $rootScope.headers})
    .success(function(data) {
      if (data.name) {
        AuthService.setPrincipal(data.principal);
        $rootScope.principal = AuthService.getPrincipal();
        AuthService.setAuthenticated(true);
        AuthService.setAuthorizationHeader($rootScope.headers);
        $rootScope.authenticated = true;
        $scope.checkIfAdmin(data.authorities);
      } else {
        AuthService.setPrincipal({});
        $rootScope.principal = {};
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
        $location.path("/flights");
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
      AuthService.setAuthenticated(false);
      AuthService.setAuthorizationHeader("");
      AuthService.setPrincipal({});
      $rootScope.authenticated = false;
      $rootScope.isAdmin = false;
      $location.path("/flights");
      $scope.error = false;

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
