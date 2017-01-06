app.service('AuthService', ['$http', '$localStorage', 'PathService', '$rootScope', '$location',
  function ($http, $localStorage, PathService, $rootScope, $location) {
    var o = {
      adminAuthority: 'ADMIN'
    };

    o.getAuthorizationHeader = function () {
      return $localStorage.authorizationHeader;
    };

    o.setAuthorizationHeader = function (authHeader) {
      $localStorage.authorizationHeader = authHeader;
    };

    o.isAuthenticated = function () {
      return $localStorage.isAuthenticated;
    };

    o.setAuthenticated = function (isAuth) {
      $localStorage.isAuthenticated = isAuth;
    };

    o.isErrorActive = function () {
      return $localStorage.isError;
    };

    o.setError = function (isErr) {
      $localStorage.isError = isErr;
    };

    o.isAdmin = function () {
      return $localStorage.isAdmin;
    };

    o.setIsAdmin = function (isAdmin) {
      $localStorage.isAdmin = isAdmin;
    };

    o.checkIfAdmin = function (authorities) {
      if (authorities) {
        return authorities.find(function (ele) {
          return ele.authority === o.adminAuthority;
        });
      }
      return false;
    };

    o.setPrincipal = function (principal) {
      $localStorage.principal = principal;
    };

    o.getPrincipal = function () {
      return $localStorage.principal;
    };

    o.logout = function () {
      return $http({
        method: 'POST',
        url: PathService.getPath() + 'logout'
      }).then(function () {
        o.setAuthenticated(false);
        o.setIsAdmin(false);
        o.setAuthenticated(false);
        o.setAuthorizationHeader("");
        o.setPrincipal({});
        $rootScope.authenticated = false;
        $rootScope.isAdmin = false;
        $location.path("/flights");
      });
    };

    return o;
  }]
);