app.controller("CustomerCtrl", function($scope, $http){
  $http.get('http://localhost:8080/customers')
    .then(function(response) {
        $scope.customers = response.data._embedded.customers;
    });
});
