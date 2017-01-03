app.controller('CustomerCtrl', ['customer', '$scope', '$http', 'ReservationService', '$route', '$routeParams', 'PathService', 'AuthService', '$location',
function(customer, $scope, $http, ReservationService, $route, $routeParams, PathService, AuthService, $location) {
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

  $scope.removeReservation = function(reservation, reservationCode) {
    ReservationService.removeReservation(reservation, reservationCode)
    .then(function(data) {
      if(badRequest(data)) {
        $scope.error = true;
      } else {
        $scope.error = false;
        $route.reload();
      }
    });
  };

  $scope.updatePassword = function(account) {
    $http({
      method: "PUT",
      url: PathService.getPath() + 'customers/' + $scope.principal.id,
      data: {
        "oldPassword" : account.oldPassword,
        "newPassword" : account.newPassword,
        "newPasswordRetype" : account.newPasswordRetype
      }
    }).then(function(data) {
      if(badRequest(data)) {
        $scope.error = true;
      } else {
        $scope.error = false;
        AuthService.logout();
      }
    }, function(response) {
      $scope.error = true;
    })
  };

  function badRequest(data) {
    return data && data.status === 400;
  };

  function onlyActiveFilter(reservation) {
    return reservation.active === true;
  };

  function notActiveFilter(reservation) {
    return reservation.active === false;
  };
}]);
