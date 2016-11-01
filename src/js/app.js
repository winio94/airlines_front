var app = angular.module("mainModule", ['ngRoute','ui.select', 'ngSanitize', 'ui.bootstrap', 'smart-table', 'ngStorage']);

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

		response: function(res) {
			if(res.data) {
				if(res.data.errors) {
					return $q.reject(res);
				}
			}
			return res;
		},

		responseError: function(res) {
			if(res.status === 404) {
				$location.path('/home');
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
	}).otherwise({ redirectTo: '/' });

	$httpProvider.interceptors.push('airlinesRequestInterceptor');
});

// for nested ng-view working properly
app.run(['$route', function($route)  {

}]);
