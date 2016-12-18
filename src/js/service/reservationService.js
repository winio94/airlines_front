app.service('ReservationService',['$http', '$q', 'PathService', '$location', '$localStorage', function($http, $q, PathService, $location, $localStorage) {
  var o = {
  };

  o.makeReservation = function(reservation) {
    return findCustomer().then(function(response) {
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
          "reservationDate" : (new Date).format('YYYY-MM-DD HH:mm'),
          "customer" : response !== null ? response.data._links.self.href : null
        }
      }).then(
        function(response) {
          $localStorage.reservation = response.data;
          $localStorage.reservation.flightInfo = reservation.flightInfo;
          $location.path('reservation_summary')
        }, function(data) {
          $localStorage.reservationError = data;
        });
      });
    };

    // TODO: implement sending tickets
    // o.createTicket = function(reservation) {
    //   return $http({
    //     method: 'POST',
    //     url: PathService.getPath() + 'tickets',
    //     data:reservation.reservationCode
    //   }).then(function(response){
    //     $location.path('flights')
    //   }, function(data) {
    //     $location.path('/')
    //   })
    // };

    o.confirmReservation = function(reservation) {
      $location.path('flights');
    };

    o.removeReservation = function(reservation, reservationCode) {
      return $http({
        method: 'DELETE',
        url: PathService.getPath() + 'reservations/' + reservation.id,
        data :  reservationCode
      }).then(
        function(response) {
          return response;
        }, function(data) {
          return data;
        });
      };

      o.getReservation = function() {
        return $localStorage.reservation;
      };

      o.getReservationError = function() {
        return $localStorage.reservationError;
      };

      function findCustomer() {
        var principal = $localStorage.principal;
        if(principal && principal.id) {
          return $http.get(PathService.getPath() + 'customers/search/findCustomerByUserId?id=' + principal.id);
        }
        return $q.when(null);
      }

      return o;
    }]);
