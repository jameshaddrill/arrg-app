 angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/admin', {
			templateUrl: 'views/admin.html',
			controller: 'MainController'
		})

		.when('/attendance', {
			templateUrl: 'views/attendance.html',
			controller: 'AttendanceController'
		});



	$locationProvider.html5Mode(false);
}]);
