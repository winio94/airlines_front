app.controller("FlightCtrl", function($scope, $http, PathService){
  $http.get(PathService.getPath() + 'flights')
    .then(function(response) {
        $scope.flights = response.data._embedded.flights;
    });
});
