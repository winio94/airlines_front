app.controller('CustomerCtrl', ['customer', '$scope', '$http', function(customer, $scope, $http) {
  $scope.customer = customer;
  $scope.activeReservations = $scope.customer.reservations.filter(onlyActiveFilter);
  $scope.finalizedReservations = $scope.customer.reservations.filter(notActiveFilter);

  $scope.showDetails = function () {
    $(function () {
      $('#some-button').on('click', function () {
        $('#overlay, #overlay-back').fadeIn(1000);
      });
    });
  };

  function onlyActiveFilter(reservation) {
    return reservation.active === true;
  };

  function notActiveFilter(reservation) {
    return reservation.active === false;
  };
}]);
