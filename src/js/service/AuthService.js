app.service('AuthService', ['$http', '$localStorage', function($http, $localStorage){
  var o = {

    adminAuthority :'ADMIN'
  };

  o.getAuthorizationHeader = function() {
    return $localStorage.authorizationHeader;
  };

  o.setAuthorizationHeader = function(authHeader) {
    $localStorage.authorizationHeader = authHeader;
  };

  o.isAuthenticated = function() {
    return $localStorage.isAuthenticated;
  };

  o.setAuthenticated = function(isAuth) {
    $localStorage.isAuthenticated = isAuth;
  };

  o.isErrorActive = function() {
    return $localStorage.isError;
  };

  o.setError = function(isErr) {
    $localStorage.isError = isErr;
  };

  o.isAdmin = function() {
    return $localStorage.isAdmin;
  };

  o.setIsAdmin = function(isAdmin) {
    $localStorage.isAdmin = isAdmin;
  };

  o.checkIfAdmin = function(authorities) {
    if(authorities) {
      return authorities.find(function(ele) {
        return ele.authority === o.adminAuthority;
      });
    }
    return false;
  };

  return o;
}]);
