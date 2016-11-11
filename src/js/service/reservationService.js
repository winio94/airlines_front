app.service('ReservationService',['$http', 'PathService', '$location', function($http, PathService, $location) {
  var o = {
    reservation: null,
    reservationError: null
  };

  o.makeReservation = function(reservation) {
    return $http({
      method: 'POST',
      url: PathService.getPath() + 'reservations',
      data : {
        "price" : reservation.price,
        "flight" : reservation.flight._links.self.href,
        "passengers" : reservation.passengers,
        "contact" : {
          "email" : reservation.contact.email,
          "phone" : reservation.contact.phone
        }
      }
    }).then(
      function(response) {
        o.reservation = response.data;
        $location.path('reservation_summary')
      }, function(data) {
        o.reservationError = data;
      });
    };

    o.getReservation = function() {
      return o.reservation;
    };

    o.getReservationError = function() {
      return o.reservationError;
    };

    return o;
  }]);
