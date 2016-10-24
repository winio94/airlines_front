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

  $scope.selectedAirport = {
    from : null,
    to: null
  };
  
  $scope.swapFlightLocations = function() {
    var temp = $scope.selectedAirport.from;
    $scope.selectedAirport.from = $scope.selectedAirport.to;
    $scope.selectedAirport.to = temp;
  };
}]);
