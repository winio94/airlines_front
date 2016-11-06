app.service('PathService', ['$http', function($http) {
  var o = {
    digitalOceanRestPath:"http://45.55.95.217:8080/",
    herokuRestPath:"https://michwin-airlines.herokuapp.com/",
    localhostPath:"http://localhost:8080/",
    from: null
  };

  o.getPath = function() {
    return o.localhostPath;
  };

  o.retrieveDataFrom = function(href) {
    return $http.get(href)
    .then(function(response) {
      o.from = response.data;
      return o.from;
    });
  }

  return o;
}]);
