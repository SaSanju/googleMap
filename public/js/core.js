angular.module('angularApp', ['homeCtrl', 'locationCtrl', 'appService', 'ngRoute', 'ngMap'])

	// angular route for the application
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/:origin/:destination', {
				templateUrl: 'pages/home.html',
				controller: 'homeCtrl'
			})
			.when('/location', {
				templateUrl: 'pages/location.html',
				controller: 'locationCtrl'
			})
			.when('/', {
				templateUrl: 'pages/home.html',
				controller: 'homeCtrl'
			});

		$locationProvider.html5Mode(true);

	})
	.controller('mainController', function ($scope) {

		$scope.home = true;

		$scope.routeChange = function (route) {

			if (route == 'location') {
				$scope.home = false;
				$scope.location = true;
			}

			if (route == 'home') {
				$scope.home = true;
				$scope.location = false;
			}
		}

	});
