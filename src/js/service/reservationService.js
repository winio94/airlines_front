app.service('ReservationService',['$http', 'PathService', '$location', '$localStorage', function($http, PathService, $location, $localStorage) {
  var o = {
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
        },
        "reservationDate" : getNowInMiliseconds()
      }
    }).then(
      function(response) {
        $localStorage.reservation = response.data;
        $localStorage.reservation.flightInfo = reservation.flightInfo;
        $location.path('reservation_summary')
      }, function(data) {
        $localStorage.reservationError = data;
      });
    };

    o.createTicket = function(reservation) {
      return $http({
        method: 'POST',
        url: PathService.getPath() + 'tickets',
        data:reservation.reservationCode
      }).then(function(response){
        $location.path('flights')
      }, function(data) {
        $location.path('/')
      });
    };

    o.getReservation = function() {
      return $localStorage.reservation;
    };

    o.getReservationError = function() {
      return $localStorage.reservationError;
    };

    function getNowInMiliseconds() {
      return new Date().getTime();
    }

    return o;
  }]);
