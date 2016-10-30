app.service('AirportService', ['$http', 'PathService', function($http, PathService) {
  var o = {

  };

  o.findAirportsByCityName = function(cityName) {
    return $http.get(PathService.getPath() + 'airports/search/findAirportsByCityIgnoreCaseStartingWithOrderByCity?cityName=' + cityName + '&size=5')
    .then(function(response) {
      return response.data._embedded.airports;
    });
  };

  return o;
}]);
