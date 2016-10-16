app.service('authService', ['$http', function($http){
  var o = {
    authorizationHeader : "",
    isAuthenticated : false,
    isError : false
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

  return o;
}]);
