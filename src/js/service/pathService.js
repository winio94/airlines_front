app.service('PathService', function() {
  var o = {
    digitalOceanRestPath:"http://45.55.95.217:8080/",
    herokuRestPath:"https://michwin-airlines.herokuapp.com/",
    localhostPath:"http://localhost:8080/"
  };

  o.getPath = function() {
    return o.digitalOceanRestPath;
  };

  return o;
});
