app.controller("FlightChooseCtrl", ['$scope', 'Flight', function($scope, Flight) {
  $scope.flights = Flight.getFlights();
  $scope.flightFrom = Flight.getFlightFrom();
  $scope.flightTo = Flight.getFlightTo();
}]);
