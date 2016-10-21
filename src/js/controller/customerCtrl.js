app.controller("CustomerCtrl", function($scope, $http, PathService){
  $http.get(PathService.getPath() + 'customers')
  .then(function(response) {
    $scope.customers = response.data._embedded.customers;
  });
});
