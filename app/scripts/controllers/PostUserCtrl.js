"use strict";

app.controller("PostUserCtrl", function(API, $scope, $http, $location) {

	$scope.submit = function() {
    	$http.post(API.HOST + "/users", $scope.user)
			.success(function(data){
				$location.path('/');
		});
	}
});
