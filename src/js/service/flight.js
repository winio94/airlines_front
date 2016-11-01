app.factory('Flight', function($localStorage){
  var o = {};

  o.setFlights = function(_flights) {
    $localStorage.flights = _flights;
  };

  o.getFlights = function() {
    return $localStorage.flights;
  };

  o.setFlightFrom = function(_from) {
    $localStorage.from = _from;
  };

  o.getFlightFrom = function() {
    return $localStorage.from;
  };

  o.setFlightTo = function(_to) {
    $localStorage.to = _to;
  };

  o.getFlightTo = function() {
    return $localStorage.to;
  };


  return o;
});
