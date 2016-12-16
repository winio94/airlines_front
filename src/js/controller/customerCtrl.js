app.controller('CustomerCtrl', ['customer', '$scope', '$http', function(customer, $scope, $http) {
  $scope.customer = customer;
  $scope.activeReservations = $scope.customer.reservations.filter(onlyActiveFilter);
  $scope.finalizedReservations = $scope.customer.reservations.filter(notActiveFilter);

  console.log(customer);
  function onlyActiveFilter(reservation) {
    return true;
    // return reservation.active === true;
  };

  function notActiveFilter(reservation) {
    return true;
    // return reservation.active === false;
  };
}]);
