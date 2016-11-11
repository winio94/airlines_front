var app = angular.module("mainModule", ['ngAnimate', 'ngMessages', 'ngRoute','ui.select', 'ngSanitize', 'ui.bootstrap', 'smart-table', 'ngStorage']);

app.factory('airlinesRequestInterceptor', ['$q', '$location', '$injector', function($q, $location,$injector){
	return {
		request: function (config) {
			var authService = $injector.get('AuthService');
			var headers = authService.getAuthorizationHeader().authorization;
			config.headers['Authorization'] = headers;
			return config;
		},

		requestError: function(config) {
			return config;
		},

		responseError: function(res) {
			if(res) {
				if(res.data.errors) {
					return $q.reject(res);
				}
			}
			return res;
		}
	}
}]);

app.config(function($routeProvider, $httpProvider) {
	$routeProvider.when("/", {
		templateUrl : "src/html/home.html",
		controller  : "HomeCtrl"
	})
	.when("/flights", {
		templateUrl : "src/html/flights.html",
		controller  : "FlightCtrl"
	})
	.when("/customers", {
		templateUrl : "src/html/customers.html",
		controller  : "CustomerCtrl"
	})
	.when("/login", {
		templateUrl : "src/html/login.html",
		controller : "HeaderCtrl"
	})
	.when("/flight_choose", {
		templateUrl : "src/html/flight_choose.html",
		controller : "FlightChooseCtrl"
	})
	.when("/flight_details", {
		templateUrl : "src/html/flight_details.html",
		controller : "FlightDetailsCtrl"
	})
	.when("/reservation_summary", {
		templateUrl : "src/html/reservation_summary.html",
		controller : "ReservationCtrl"
	})
	.otherwise({ redirectTo: '/' });

	$httpProvider.interceptors.push('airlinesRequestInterceptor');
});

// for nested ng-view working properly
app.run(['$route', function($route)  {

}]);
