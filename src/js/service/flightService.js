app.service('FlightService', ['$http', 'PathService', function ($http, PathService) {
  var o = {};

  o.getFlights = function () {
    return $http.get(PathService.getPath() + 'flights')
      .then(function (response) {
        return response.data._embedded.flights;
      });
  };

  o.findFlightsByLocations = function (from, to) {
    return $http.get(PathService.getPath() + 'flights/search/findFlightsByFromCityAndToCityOrderByPrice?from=' + from + '&to=' + to)
      .then(function (response) {
        return response.data._embedded.flights;
      });
  };

  return o;
}]);