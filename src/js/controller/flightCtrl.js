app.controller("FlightCtrl", function($scope, $http){
  $http.get('http://45.55.95.217:8080/flights')
    .then(function(response) {
        $scope.flights = response.data._embedded.flights;
    });
});
