app.controller('FlightDetailsCtrl', ['$scope', 'Flight', 'PathService', 'DateUtil', function($scope, Flight, PathService, DateUtil) {
  $scope.flight = Flight.getChoosenFlight();
  $scope.passengersAmmount = Flight.getSelectedFlight().passengers;
  PathService.retrieveDataFrom($scope.flight._links.from.href).then(function(result) {
    $scope.from = result;
  });
  PathService.retrieveDataFrom($scope.flight._links.to.href).then(function(result) {
    $scope.to = result;
  });

  var departureDate = new Date($scope.flight.departureDate);
  var arrivalDate = new Date($scope.flight.arrivalDate);
  $scope.departureHour = DateUtil.getHour(departureDate);
  $scope.departureMinutes = DateUtil.getMinutes(departureDate);
  $scope.departureDayMonthYear = DateUtil.getDayMonthYear(departureDate);
  $scope.arrivalHour = DateUtil.getHour(arrivalDate);
  $scope.arrivalMinutes = DateUtil.getMinutes(arrivalDate);
  $scope.arrivalDayMonthYear = DateUtil.getDayMonthYear(arrivalDate);
  $scope.duration = DateUtil.getHoursAndMinutesFromMinutes($scope.flight.duration);

  console.log("DATE : ", new Date($scope.flight.departureDate));
  console.log("FLIGHT : ", $scope.flight);
  console.log("passengersAmmount : ", $scope.passengersAmmount);

  $scope.getPassengers = function() {
    $scope.passengers = new Array($scope.passengersAmmount)
    return $scope.passengers;
  };

  $scope.payments = [
    {
      "name" : "Bank transfer",
      "price" : 0,
      "description": "Tranfer money into bank account."
    },
    {
      "name" : "Pay Pal",
      "price" : 9.63,
      "description": "For PayPal account owners."
    },
    {
      "name" : "Cash",
      "price" : 0,
      "description": "Deposit money."
    }
  ];

}]);
