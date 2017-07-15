angular.module('locationCtrl', [])

	// inject the Todo service factory into our controller
	.controller('locationCtrl', ['$scope', '$location', '$interpolate', 'Todos', function ($scope, $location, $interpolate, Todos) {

		$scope.locations = [];
		$scope.origin = "";
		$scope.destination = "";

		function init() {
			Todos.get('/api/get/location')
				.then(function (response) {
					var result = response.data;
					if(result)
						$scope.locations = response.data;
				});
		}

		init();


		$scope.displayRoute = function (rt) {

			$scope.origin = rt.origin;
			$scope.destination = rt.destination;
			var url = $interpolate('/{{origin}}/{{destination}}')($scope);
			$location.path(url);
			
		}

	}]);