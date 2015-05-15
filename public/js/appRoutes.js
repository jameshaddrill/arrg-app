 angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'mainController'
		});

	$locationProvider.html5Mode(true);
}]);