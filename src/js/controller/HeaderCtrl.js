app.controller("HeaderCtrl", ['$scope', '$rootScope', '$http', '$location', 'AuthService', 'PathService',
function($scope, $rootScope, $http, $location, AuthService, PathService) {

  var authenticate = function(credentials, callback) {
    $rootScope.headers = credentials ? {authorization : "Basic " + btoa(credentials.email + ":" + credentials.password)} : {};
    $http.get(PathService.getPath() + 'user', {headers : $rootScope.headers})
    .success(function(data) {
      if (data.name) {
        $rootScope.authenticated = true;
        AuthService.setAuthorizationHeader($rootScope.headers);
        $scope.checkIfAdmin(data.authorities);
      } else {
        $rootScope.authenticated = false;
      }
      callback && callback();
    }).error(function() {
      $rootScope.authenticated = false;
      AuthService.setAuthorizationHeader("");
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
        AuthService.setAuthorizationHeader($rootScope.headers);
        $location.path("/");
        $scope.error = false;
      } else {
        AuthService.setAuthorizationHeader("");
        $location.path("/login");
        $scope.error = true;
      }
    });
  };

  $scope.logout = function() {
    $http.post('logout', {}).success(function() {
      $rootScope.authenticated = false;
      $rootScope.isAdmin = false;
      AuthService.setAuthorizationHeader("");
      $location.path("/");
    }).error(function(data) {
      $rootScope.authenticated = false;
      $rootScope.isAdmin = false;
    });
  };

  $scope.checkIfAdmin = function(authorities) {
    if(AuthService.checkIfAdmin(authorities)) {
      $rootScope.isAdmin = true;
    } else {
      $rootScope.isAdmin = false;
    }
  };
}]);
