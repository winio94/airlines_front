app.controller('ReservationCtrl', ['$scope', 'ReservationService', function($scope, ReservationService) {
  $scope.reservation = ReservationService.getReservation();

  $scope.makePaymentAndSendTicket = function() {
    // TODO:PaymentService.makePayment($scope.reservation);
  };
}]);
