app.controller("FlightCtrl", ['$scope', 'FlightService', 'AirportService', function($scope,FlightService, AirportService){

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
  $scope.getFlights = function() {
    FlightService.getFlights().then(function(response) {
      $scope.flights = response;
    });
  };

  $scope.getAirportsByCityName = function(cityName)  {
    AirportService.findAirportsByCityName(cityName).then(function(response) {
      $scope.airports = response;
    })
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
  }

  $scope.searchFlight = function(flightCredentials) {
    console.log("FLIGHT CREDENTIALS : ", flightCredentials);
  };
  
  $scope.getFlights();
}]);
