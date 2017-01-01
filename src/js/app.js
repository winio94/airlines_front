var app = angular.module("mainModule", [
	'ngAnimate',
	'ngMessages',
	'ngRoute',
	'ui.select',
	'ngSanitize',
	'ui.bootstrap',
	'smart-table',
	'ngStorage',
	'pascalprecht.translate']);

	app.factory('airlinesRequestInterceptor', ['$q', '$location', '$injector', '$rootScope', function($q, $location, $injector, $rootScope){
		return {
			request: function (config) {
				var authService = $injector.get('AuthService');
				var headers = authService.getAuthorizationHeader();
				config.headers['Authorization'] = getAuthorizationHeader(headers);
				return config;
			},

			requestError: function(config) {
				return config;
			},

			responseError: function(res) {
				if(res) {
					if(res.data.errors) {
						$rootScope.errors = getErrorMessageFrom(res.data.errors);
						return $q.reject(res);
					}
				}
				return res;
			}
		};

		function getAuthorizationHeader(headers) {
			return (headers === null || headers === undefined ? null : headers.authorization)
		};

		function getErrorMessageFrom(errors) {
			var errorMessage = "";
			for (var i = 0; i < errors.length; i++) {
				errorMessage += errors[i].message;
				errorMessage += "\n";
			}
			return errorMessage;
		};

	}]);

	app.config(function($routeProvider, $httpProvider) {
		$routeProvider.when("/flights", {
			templateUrl : "src/html/flights.html",
			controller  : "FlightCtrl"
		})
		.when("/customers", {
			templateUrl : "src/html/customers.html",
			controller  : "CustomersCtrl"
		})
		.when("/login", {
			templateUrl : "src/html/login.html",
			controller : "HeaderCtrl"
		})
		.when("/register", {
			templateUrl : "src/html/register.html",
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
		.when("/customers/:id", {
			templateUrl: "src/html/customer_reservation_page.html",
			controller: "CustomerCtrl",
			resolve: {
				customer: ['CustomerService', '$route', function(CustomerService, $route) {
					return CustomerService.findCustomerByUserId($route.current.params.id);
				}]
			}
		})
		.otherwise({ redirectTo: '/flights' });
		$httpProvider.interceptors.push('airlinesRequestInterceptor');
	}).config(function($translateProvider) {
		$translateProvider.fallbackLanguage('pl');
		$translateProvider.registerAvailableLanguageKeys(['en', 'pl'], {
			'en_*':'en',
			'pl_*':'pl'
		});

		$translateProvider.translations('en', {
			//COMMON VARIABLES
			SEARCH: "Search",
			FROM: "From",
			TO: "To",
			DEPART: "Depart",
			RETURN: "Return",
			TRAVELLERES: "Travellers",
			PASSENGERS: "Passengers",
			PASSENGER: "Passenger",
			PRICE: "Price",
			FIRST_NAME: "First name",
			LAST_NAME: "Last name",
			PHONE_NUMBER: "Phone number",
			EMAIL_ADDRESS: "Email address",
			CONTACT: "Contact",
			LUGGAGE: "Luggage",
			PAYMENT: "Payment",
			CHARACTERS: "characters",
			SUMMARY: "Summary",
			TICKETS: "Tickets",
			ADDITIONAL_CHARGE: "Additional charges",
			PAYMENT_CHARGE: "Payment charge",
			LUGGAGE_CHARGE: "Luggage charge",
			RESERVATION_CODE: "Reservation code",
			GO_TO_FLIGHT_SEARCH_PAGE: "Search flight",
			RESERVATIONS: "Reservations",
			FLIGHTS: "Flights",
			LOGOUT: "Log out",
			LOGIN: "Log in",
			REGISTER: "Sign up",
			CUSTOMERS: "Customers",
			SETTINGS: "Settings",
			FLIGHT_PREFERENCES: "Flight preferences",
			ACCOUNT: "Account",
			REGISTRATION_ERROR: "There was an error with registration.",

			//FLIGHT SEARCH VARIABLES
			FLIGHT_SEARCH_TITLE: "<h1>Best <b>flights</b>. All air carriers.</h1>",
			ONE_WAY_FLIGHT: "One way",
			RETURN_FLIGHT: "Return",
			FLIGHT_CLASS_AND_TRAVELLERES: "Cabin Class & travellers",
			FLIGHT_CLASS_AND_TRAVELLERES_VALUE: "<span>{{passengers}} travellers, {{flightClass}}</span>",
			FLIGHT_SEARCH_ERROR: "There was a problem searching flight. Please try again.",

			//FLIGHT CHHOOSE VARIABLES
			FLIGHT_CHOOSE_TITLE: "<h1>Flights: <b>{{fromCity}}</b> &rarr; <b>{{toCity}}</b></h1>",
			FLIGHT_NUMBER: "Flight number",
			FLIGHT_DEPARTURE_DATE: "Departure date",
			FLIGHT_ARRIVAL_DATE: "Arrival date",

			//RESERVATION CREATE VARIABLES
			RESERVATION_CREATE_TITLE: "<h1>Flight <b>reservation</b> <b>({{fromCity}}</b> &rarr; <b>{{toCity}})</b></h1>",
			REGISTERED_LUGGAGE: "Registered luggage",
			FREE_LUGGAGE: "Free luggage",
			REGISTERED_LUGGAGE_DESCRIPTION: "First passenger may take one registered lugagge with dimentions 149x119x171 cm (23kg).",
			FREE_LUGGAGE_DESCRIPTION: "Each passenger may take one carry-on lugagge with dimentions 42x32x25 cm (15kg).",
			BANK_TRANSFER: "Bank transfer",
			PAY_PAL: "Pay Pal",
			CASH: "Cash",
			MAKE_RESERVATION:"Make reservation.",
			CHARACTERS_MIN_AMOUNT_CONSTRAINT:"must have at least",
			CHARACTERS_MAX_AMOUNT_CONSTRAINT:"must have at most",
			WRONG_VALUE_MESSAGE:"has wrong value",
			PHONE_PATTERN_MESSAGE:"must have directional at the beginning eg +48",

			//RESERVATION CONFIRMATION VARIABLES
			RESERVATION_CONFIRMATION_TITLE: "<h1>Reservation confirmation</h1>",
			RESERVATION_CONFIRMATION_MESSAGE: "Reservation was successfully created. You will get a confirmation with reservation code on <span class='niceSpanFontMedium'>{{address}}</span> address.",

			LOGIN_TITLE: "<h1>Sign <b>in</b></h1>",
			REGISTER_TITLE: "<h1>Sign <b>up</b></h1>",
			CUSTOMERS_PAGE_TITLE: "<h1>Best <b>flights</b>. All air carriers.</h1>",
			SETTINGS_RESERVATIONS_ACTIVE_TITLE: "<h1><b>Active</b> reservations</h1>",
			SETTINGS_RESERVATIONS_NO_ACTIVE_TITLE: "<h1>You have no <b>active</b> reservations</h1>",
			SETTINGS_RESERVATIONS_FINALIZED_TITLE: "<h1><b>Finalized</b> reservations</h1>",
			SETTINGS_RESERVATIONS_NO_FINALIZED_TITLE: "<h1>You have no <b>finalized</b> reservations</h1>",
		});

		$translateProvider.translations('pl', {
			//COMMON VARIABLES
			SEARCH: "Szukaj",
			FROM: "Z",
			TO: "Do",
			DEPART: "Wylot",
			RETURN: "Powrot",
			TRAVELLERES: "Pasazerow",
			PASSENGERS: "Pasazerowie",
			PASSENGER: "Pasazer",
			PRICE: "Cena",
			FIRST_NAME: "Imię",
			LAST_NAME: "Nazwisko",
			PHONE_NUMBER: "Numer telefonu",
			EMAIL_ADDRESS: "Adres email",
			CONTACT: "Kontakt",
			LUGGAGE: "Bagaz",
			PAYMENT: "Sposob zaplaty",
			CHARACTERS: "znaki",
			SUMMARY: "Podsumowanie",
			TICKETS: "Bilety",
			ADDITIONAL_CHARGE: "Dodatkowe opłaty",
			PAYMENT_CHARGE: "Opłata za tranzakcje",
			LUGGAGE_CHARGE: "Opłata za bagaz",
			RESERVATION_CODE: "Kod rezerwacji",
			GO_TO_FLIGHT_SEARCH_PAGE: "Wyszukaj lot",
			RESERVATIONS: "Rezerwacje",
			FLIGHTS: "Loty",
			LOGOUT: "Wyloguj się",
			LOGIN: "Zaloguj się",
			REGISTER: "Zarejestruj się",
			CUSTOMERS: "Uzytkownicy",
			SETTINGS: "Ustawienia",
			FLIGHT_PREFERENCES: "Preferencje lotu",
			ACCOUNT: "Konto",
			REGISTRATION_ERROR: "Wystąpił błąd podczas rejestracji.",

			//FLIGHT SEARCH VARIABLES
			FLIGHT_SEARCH_TITLE: "<h1>Najlepsze <b>loty</b>. Wszyscy przewoźnicy.</h1>",
			ONE_WAY_FLIGHT: "Lot w jedną stronę",
			RETURN_FLIGHT: "Lot w dwie strony",
			FLIGHT_CLASS_AND_TRAVELLERES: "Klasa lotu i pasazerowie",
			FLIGHT_CLASS_AND_TRAVELLERES_VALUE: "<span>{{passengers}} pasazerow, {{flightClass}}</span>",
			FLIGHT_SEARCH_ERROR: "Nie udało się znaleźć lotu. Sprobuj ponownie.",

			//FLIGHT CHHOSE VARIABLES
			FLIGHT_CHOOSE_TITLE: "<h1>Loty: <b>{{fromCity}}</b> &rarr; <b>{{toCity}}</b></h1>",
			FLIGHT_NUMBER: "Numer lotu",
			FLIGHT_DEPARTURE_DATE: "Data wylotu",
			FLIGHT_ARRIVAL_DATE: "Data przylotu",

			//RESERVATION CREATE VARIABLES
			RESERVATION_CREATE_TITLE: "<h1><b>Rezerwacja</b> lotu <b>({{fromCity}}</b> &rarr; <b>{{toCity}})</b></h1>",
			REGISTERED_LUGGAGE: "Bagaz rejestrowany",
			FREE_LUGGAGE: "Darmowy bagaz",
			REGISTERED_LUGGAGE_DESCRIPTION: "Jeden z pasazerow moze przewieźć jedną sztukę bagazu rejestrowanego o wymiarach 149x119x171 cm (23kg).",
			FREE_LUGGAGE_DESCRIPTION: "Kazdy pasazer moze przewiezc jedna sztuke bagazu podręcznego o wymiarach 42x32x25 cm (15kg).",
			BANK_TRANSFER: "Przelew bankowy",
			PAY_PAL: "Pay Pal",
			CASH: "Gotowka",
			MAKE_RESERVATION:"Zarezerwuj.",
			CHARACTERS_MIN_AMOUNT_CONSTRAINT:"musi mieć co najmniej",
			CHARACTERS_MAX_AMOUNT_CONSTRAINT:"moze miec co najawyzej",
			WRONG_VALUE_MESSAGE:"ma złą wartość",
			PHONE_PATTERN_MESSAGE:"musi mieć numer kierunkowy na początku np. +48",


			//RESERVATION CONFIRMATION VARIABLES
			RESERVATION_CONFIRMATION_TITLE: "<h1>Potwierdzenie rezerwacji</h1>",
			RESERVATION_CONFIRMATION_MESSAGE: "Rezerwacja została pomyślnie utworzona. Otrzymasz potwierdzenie z kodem rezerwacji na adres <span class='niceSpanFontMedium'>{{address}}</span>.",

			LOGIN_TITLE: "<h1><b>Zaloguj</b> się</h1>",
			REGISTER_TITLE: "<h1><b>Zarejestruj</b> się</h1>",
			CUSTOMERS_PAGE_TITLE: "<h1>Best <b>flights</b>. All air carriers</h1>",
			SETTINGS_RESERVATIONS_ACTIVE_TITLE: "<h1><b>Aktywne</b> rezerwacje</h1>",
			SETTINGS_RESERVATIONS_NO_ACTIVE_TITLE: "<h1>Brak <b>aktywnych</b> rezerwacji</h1>",
			SETTINGS_RESERVATIONS_FINALIZED_TITLE: "<h1><b>Dokonane</b> rezerwacje</h1>",
			SETTINGS_RESERVATIONS_NO_FINALIZED_TITLE: "<h1>Brak <b>dokonanych</b> rezerwacji</h1>",
		});

		// $translateProvider.useSanitizeValueStrategy('escape');
		$translateProvider.preferredLanguage('pl');
	});

	// for nested ng-view working properly
	app.run(['$route', function($route)  {

	}]);
