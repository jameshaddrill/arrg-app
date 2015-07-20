// public/core.js
var arrgAttendance = angular.module('arrgAttendance', []);

angular.module('arrgAttendance', ['ngRoute', 'appRoutes', 'MainController', 'HomeController', 'attendanceService']);