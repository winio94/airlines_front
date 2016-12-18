app.controller('ReservationCtrl', ['$scope', 'ReservationService', function($scope, ReservationService) {
  $scope.reservation = ReservationService.getReservation();
  $scope.confirmReservation = function() {
    ReservationService.confirmReservation($scope.reservation);
  };
}]);
