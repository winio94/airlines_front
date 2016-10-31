app.factory('Flight', function(){
  var o = {
    flights: [],
    from : null,
    to : null
  };

  o.setFlights = function(_flights) {
    o.flights = _flights;
  };

  o.getFlights = function() {
    return o.flights;
  };

  o.setFlightFrom = function(_from) {
    o.from = _from;
  };

  o.getFlightFrom = function() {
    return o.from;
  };

  o.setFlightTo = function(_to) {
    o.to = _to;
  };

  o.getFlightTo = function() {
    return o.to;
  };


  return o;
});
