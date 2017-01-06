app.controller('FlightDetailsCtrl', ['$scope', 'Flight', 'PathService', 'DateUtil', 'ReservationService', function ($scope, Flight, PathService, DateUtil, ReservationService) {

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
  $scope.emailPattern = new RegExp(/^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/);
  $scope.phonePattern = new RegExp(/^\+(?:[0-9] ?){8,11}[0-9]$/);
  $scope.emailPatternMessage = " has wrong value";
  $scope.phonePatternMessage = " must have directional at the beginning eg '+48'."
  $scope.reservation = {
    "price": $scope.passengersAmmount * $scope.flight.price,
    "passengers": $scope.passengers,
    "contact": {},
    "luggage": null,
    "payment": null,
    "flight": $scope.flight
  };
  $scope.payments = [
    {
      "name": "Bank transfer",
      "price": 0,
      "description": "Tranfer money into bank account."
    },
    {
      "name": "Pay Pal",
      "price": 9,
      "description": "For PayPal account owners."
    },
    {
      "name": "Cash",
      "price": 0,
      "description": "Deposit money."
    }
  ];

  PathService.retrieveDataFrom($scope.flight._links.from.href).then(function (result) {
    $scope.from = result;
  });

  PathService.retrieveDataFrom($scope.flight._links.to.href).then(function (result) {
    $scope.to = result;
  });

  //-------------------------------FUNCTIONS-------------------------------//
  $scope.countReservationPrice = function () {
    $scope.reservation = $scope.passengersAmmount * $scope.flight.price + $scope.flightPayment + $scope.flightLuggage;
  };

  $scope.getPassengers = function () {
    return $scope.passengers;
  };

  $scope.makeReservation = function () {
    $scope.reservation.passengers = $scope.passengers;
    $scope.reservation.luggage = $scope.flightLuggage;
    $scope.reservation.payment = $scope.flightPayment;
    addFlightInfo();
    ReservationService.makeReservation($scope.reservation);
  };

  $scope.initializeEmptyPassengers = function () {
    $scope.passengers = [];
    for (i = 0; i < $scope.passengersAmmount; i++) {
      $scope.passengers.push(
        {}
      );
    }
  };

  function addFlightInfo() {
    var flightInfo = {
      from: $scope.from,
      to: $scope.to,
      date: $scope.departureDayMonthYear
    };
    $scope.reservation.flightInfo = flightInfo;
  }

  //-------------------------------WATCHERS-------------------------------//
  $scope.$watch('flightPayment', function (newValue, oldValue) {
    var result = newValue - oldValue;
    $scope.reservation.price += result;
  });

  $scope.$watch('flightLuggage', function (newValue, oldValue) {
    var result = newValue - oldValue;
    $scope.reservation.price += result;
  });

  $scope.initializeEmptyPassengers();
}]);