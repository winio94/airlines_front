app.service('CustomerService', ['$http', 'PathService', function ($http, PathService) {
  var o = {};

  o.findCustomerByUserId = function (userId) {
    return $http.get(PathService.getPath() + 'customers/' + userId)
      .then(function (response) {
        return response.data;
      })
  };

  return o;
}]);