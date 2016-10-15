var app = angular.module("mainModule", ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'src/html/home.html',
		controller  : 'HeaderCtrl'
	})
	.when('/home', {
		templateUrl : 'src/html/home.html',
		controller  : 'HeaderCtrl'
	})
	.when('/flights', {
		templateUrl : 'src/html/flights.html',
		controller  : 'FlightCtrl'
	})
	.when('/customers', {
		templateUrl : 'src/html/customers.html',
		controller  : 'CustomerCtrl'
	});
});
