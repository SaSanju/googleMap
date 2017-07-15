angular.module('homeCtrl', [])

	// inject the Todo service factory into our controller
	.controller('homeCtrl', ['$scope', '$routeParams', 'Todos', 'NgMap', function ($scope, $routeParams, Todos, NgMap) {

		$scope.origin = "";
		$scope.destination = "";
		$scope.waypoints = [];

		function init() {
			$scope.origin = $routeParams.origin;
			$scope.destination = $routeParams.destination;
		}

		init();


		var detailedPath = [];
		var detailedPathIndex = 0;

		var directionsService = new google.maps.DirectionsService();


		$scope.addNewWaypoints = function () {

			var obj = {
				location: '',
				stopover: true
			};

			$scope.waypoints.push(obj);
		}

		function successMessage() {
			var x = document.getElementById("message")
			x.className = "show";
			setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
		}

		$scope.sync = function () {
			if ($scope.origin && $scope.destination) {
				var formdata = {
					origin: $scope.origin,
					destination: $scope.destination
				}
				//console.log(formdata);
				Todos.syncdata(formdata, '/api/store/location')
					.then(function (data) {
						successMessage();
					});
			}
		};


	}]);