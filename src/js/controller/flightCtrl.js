app.controller("FlightCtrl", ['$scope', 'FlightService', 'AirportService', function($scope,FlightService, AirportService){
  $scope.getFlights = function() {
    FlightService.getFlights().then(function(response) {
      $scope.flights = response;
    });
  };

  $scope.getFlights();

  $scope.getAirportsByCityName = function(cityName)  {
    AirportService.findAirportsByCityName(cityName).then(function(response) {
      $scope.airports = response;
    })
  };
}]);
