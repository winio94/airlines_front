app.controller('ReservationCtrl', ['$scope', 'ReservationService', function($scope, ReservationService) {
  $scope.reservation = ReservationService.getReservation();
  $scope.createTicket = function() {
    ReservationService.createTicket($scope.reservation);
  };
}]);
