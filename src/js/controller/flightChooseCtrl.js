app.controller("FlightChooseCtrl", ['$scope', 'Flight', '$location', function ($scope, Flight, $location) {
  $scope.flights = Flight.getFlights();
  $scope.flightFrom = Flight.getFlightFrom();
  $scope.flightTo = Flight.getFlightTo();

  $scope.chooseFlight = function (flight) {
    Flight.setChoosenFlight(flight);
    $location.path('/flight_details');
  };
}]);