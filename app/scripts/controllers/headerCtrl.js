"use strict";

app.controller("HeaderCtrl", function(API, $scope, $http, $location, $session, Session) {

	$scope.undisplay = true;

	Session.isAuth().then(function(response) {
		if(response.data) {
			$scope.display = true;
			$scope.undisplay = false;
		} else {
			$scope.display = false;
			$scope.undisplay = true;
		}
	});

	$scope.logout = function() {
		$location.path('/');
		$session.remove("token");
	}
});
