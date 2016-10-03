app.controller("CustomerCtrl", function($scope, $http){
  $http.get('http://45.55.95.217:8080/customers')
    .then(function(response) {
        $scope.customers = response.data._embedded.customers;
    });
});
