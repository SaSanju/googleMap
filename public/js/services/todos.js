angular.module('appService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http', function ($http) {
		return {
			get: function (apiName) {
				return $http.get(apiName);
			},
			syncdata: function (apiData, apiName) {
				return $http.post(apiName, apiData);
			}

		}
	}]);