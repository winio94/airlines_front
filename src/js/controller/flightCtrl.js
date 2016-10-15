app.controller("FlightCtrl", function($scope, $http){
  $http.get('http://localhost:8080/flights')
    .then(function(response) {
        $scope.flights = response.data._embedded.flights;
    });
});
