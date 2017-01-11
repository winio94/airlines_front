//noinspection JSUnresolvedFunction
app.controller('CustomerCtrl', ['customerData', '$scope', '$http', 'ReservationService', '$route', '$routeParams', 'PathService', 'AuthService',
  function (customerData, $scope, $http, ReservationService, $route, $routeParams, PathService, AuthService) {
    $scope.customer = customerData.customer;
    $scope.allReservations = customerData.allReservations._embedded.reservations;
    $scope.activeReservations = $scope.allReservations.filter(onlyActiveFilter);
    $scope.finalizedReservations = $scope.allReservations.filter(notActiveFilter);

    $scope.showDetails = function () {
      $(function () {
        $('#some-button').on('click', function () {
          $('#overlay, #overlay-back').fadeIn(1000);
        });
      });
    };

    $scope.removeReservation = function (reservation, reservationCode) {
      console.log(reservation);
      ReservationService.removeReservation(reservation, reservationCode)
        .then(function (data) {
          if (badRequest(data)) {
            $scope.error = true;
          } else {
            $scope.error = false;
            $route.reload();
          }
        });
    };

    $scope.updatePassword = function (account) {
      $http({
        method: "PUT",
        url: PathService.getPath() + 'customers/' + $scope.principal.id,
        data: {
          "oldPassword": account.oldPassword,
          "newPassword": account.newPassword,
          "newPasswordRetype": account.newPasswordRetype
        }
      }).then(function (data) {
        if (badRequest(data)) {
          $scope.error = true;
        } else {
          $scope.error = false;
          AuthService.logout();
        }
      }, function (response) {
        $scope.error = true;
      })
    };

    $scope.removeAccount = function () {
      $http({
        method: "DELETE",
        url: PathService.getPath() + 'customers/' + $scope.principal.id
      }).then(function (data) {
        if (badRequest(data)) {
          $scope.error = true;
        } else {
          $scope.error = false;
          AuthService.logout();
        }
      }, function (response) {
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