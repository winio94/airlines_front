app.controller('FlightDetailsCtrl', ['$scope', 'Flight', 'PathService', 'DateUtil', function($scope, Flight, PathService, DateUtil) {

  //-------------------------------VARIABLES-------------------------------//
  $scope.flight = Flight.getChoosenFlight();
  $scope.departureDate = new Date($scope.flight.departureDate);
  $scope.arrivalDate = new Date($scope.flight.arrivalDate);
  $scope.departureHour = DateUtil.getHour($scope.departureDate);
  $scope.departureMinutes = DateUtil.getMinutes($scope.departureDate);
  $scope.departureDayMonthYear = DateUtil.getDayMonthYear($scope.departureDate);
  $scope.arrivalHour = DateUtil.getHour($scope.arrivalDate);
  $scope.arrivalMinutes = DateUtil.getMinutes($scope.arrivalDate);
  $scope.arrivalDayMonthYear = DateUtil.getDayMonthYear($scope.arrivalDate);
  $scope.duration = DateUtil.getHoursAndMinutesFromMinutes($scope.flight.duration);
  $scope.passengersAmmount = Flight.getSelectedFlight().passengers;
  $scope.flightContact = null;
  $scope.flightPayment = 0;
  $scope.flightLuggage = 0;
  $scope.reservation = {
    "price": $scope.passengersAmmount * $scope.flight.price,
    "passengers" : $scope.passengers,
    "contact" : {},
    "luggage" : null,
    "payment" : null,
    "flight" : $scope.flight
  };
  $scope.payments = [
    {
      "name" : "Bank transfer",
      "price" : 0,
      "description": "Tranfer money into bank account."
    },
    {
      "name" : "Pay Pal",
      "price" : 9,
      "description": "For PayPal account owners."
    },
    {
      "name" : "Cash",
      "price" : 0,
      "description": "Deposit money."
    }
  ];
  PathService.retrieveDataFrom($scope.flight._links.from.href).then(function(result) {
    $scope.from = result;
  });
  PathService.retrieveDataFrom($scope.flight._links.to.href).then(function(result) {
    $scope.to = result;
  });

  //-------------------------------FUNCTIONS-------------------------------//
  $scope.countReservationPrice = function() {
    $scope.reservation = $scope.passengersAmmount * $scope.flight.price + $scope.flightPayment + $scope.flightLuggage;
  };

  $scope.getPassengers = function() {
    return $scope.passengers;
  };

  $scope.makeReservation = function() {
    $scope.reservation.passengers = $scope.passengers;
    $scope.reservation.luggage = $scope.flightLuggage;
    $scope.reservation.payment = $scope.flightPayment;
  };

  $scope.initializeEmptyPassengers = function() {
    $scope.passengers = [];
    for(i=0; i< $scope.passengersAmmount; i++) {
      $scope.passengers.push(
        {}
      );
    };
  };

  //-------------------------------WATCHERS-------------------------------//
  $scope.$watch('flightPayment', function(newValue, oldValue) {
    var result = newValue - oldValue;
    $scope.reservation.price += result;
  });

  $scope.$watch('flightLuggage', function(newValue, oldValue) {
    var result = newValue - oldValue;
    $scope.reservation.price += result;
  });

  $scope.initializeEmptyPassengers();
}]);