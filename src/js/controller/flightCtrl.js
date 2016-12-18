app.controller("FlightCtrl", ['$scope', '$location', 'FlightService', 'AirportService', 'Flight', function($scope, $location, FlightService, AirportService, Flight){

  //-------------------------------VARIABLES-------------------------------//
  $scope.flightClasses = ["Economy", "Premium Economy", "Business class", "First class"];
  $scope.isClassEnabled = false;
  $scope.selectedFlight = Flight.getSelectedFlight();


  $scope.dateOptions = {
    "dateDisabled": disabled,
    "formatYear": 'dd.MM.yyyy',
    "startingDay": 1
  };

  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.openDepartCalendar = function() {
    $scope.departCalendarPopup.opened = true;
  };

  $scope.openReturnCalendar = function() {
    $scope.returnCalendarPopup.opened = true;
  };

  $scope.departCalendarPopup = {
    opened: false
  };

  $scope.returnCalendarPopup = {
    opened: false
  };

  //-------------------------------FUNCTIONS-------------------------------//

  $scope.getAirportsByCityName = function(cityName)  {
    AirportService.findAirportsByCityName(cityName).then(function(response) {
      $scope.airports = response;
    });
  };

  $scope.swapFlightLocations = function() {
    var temp = $scope.selectedFlight.from;
    $scope.selectedFlight.from = $scope.selectedFlight.to;
    $scope.selectedFlight.to = temp;
  };

  $scope.showClassOption = function() {
    $scope.isClassEnabled = !$scope.isClassEnabled;
  };

  $scope.disableReturnDate = function() {
    $scope.returnFlight=false;
    $scope.selectedFlight.return=null
  };

  $scope.searchFlight = function(flightCredentials) {
    if(flightCredentials) {
      FlightService.findFlightsByLocations(flightCredentials.from.city, flightCredentials.to.city)
      .then(function(response) {
        Flight.setSelectedFlight($scope.selectedFlight);
        Flight.setFlights(response);
        Flight.setFlightFrom($scope.selectedFlight.from);
        Flight.setFlightTo($scope.selectedFlight.to);
        $location.path('/flight_choose');
      });
    }
  };

  $scope.addOne = function() {
    $scope.selectedFlight.passengers++;
  };

  $scope.subtractOne = function() {
    $scope.selectedFlight.passengers--;
  };
}]);
