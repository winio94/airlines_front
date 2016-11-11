app.controller('ReservationCtrl', ['$scope', 'ReservationService', function($scope, ReservationService) {
  $scope.reservation = ReservationService.getReservation();
}]);
