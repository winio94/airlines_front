app.service('AuthService', ['$http', function($http){
  var o = {
    authorizationHeader : "",
    isAuthenticated : false,
    isError : false,
    isAdmin : false,
    adminAuthority :'ROLE_ADMIN'
  };

  o.getAuthorizationHeader = function() {
    return o.authorizationHeader;
  };

  o.setAuthorizationHeader = function(authHeader) {
    o.authorizationHeader = authHeader;
  };

  o.isAuthenticated = function() {
    return o.isAuthenticated;
  };

  o.setAuthenticated = function(isAuth) {
    o.isAuthenticated = isAuth;
  };

  o.isErrorActive = function() {
    return o.isError;
  };

  o.setError = function(isErr) {
    o.isError = isErr;
  };

  o.isAdmin = function() {
    return o.isAdmin;
  };

  o.setIsAdmin = function() {
    o.isAdmin = true;
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
