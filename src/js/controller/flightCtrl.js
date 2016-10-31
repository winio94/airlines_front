app.controller("FlightCtrl", ['$scope', '$location', 'FlightService', 'AirportService', 'Flight', function($scope, $location, FlightService, AirportService, Flight){

  //-------------------------------VARIABLES-------------------------------//
  $scope.flightClasses = ["Economy", "Premium Economy", "Business class", "First class"];
  $scope.isClassEnabled = false;
  $scope.selectedFlight = {
    from : null,
    to: null,
    departure: null,
    return: null,
    flightClass: null,
    passengers: 1
  };

  //-------------------------------FUNCTIONS-------------------------------//

  $scope.getAirportsByCityName = function(cityName)  {
    AirportService.findAirportsByCityName(cityName).then(function(response) {
      $scope.airports = response;
    });
  };

  $scope.swapFlightLocations = function() {
    var temp = $scope.selectedFlight.from;
    $scope.selectedFlight.from = $scope.selectedFlight.to;
    $scope.selectedFlight.to = temp;
  };

  $scope.showClassOption = function() {
    $scope.isClassEnabled = !$scope.isClassEnabled;
  };

  $scope.disableReturnDate = function() {
    $scope.returnFlight=false;
    $scope.selectedFlight.return=null
  };

  $scope.searchFlight = function(flightCredentials) {
    if(flightCredentials) {
      FlightService.findFlightsByLocations(flightCredentials.from.city, flightCredentials.to.city)
      .then(function(response) {
        Flight.setFlights(response);
        Flight.setFlightFrom($scope.selectedFlight.from);
        Flight.setFlightTo($scope.selectedFlight.to);
        $location.path('/flight_choose');
      });
    }
  };
}]);
