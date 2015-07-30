"use strict";

app.controller("LoginCtrl", function(API, $scope, $http, $location, $session, Session) {

	$scope.user = {};

	Session.isAuth().then(function(response) {
		if(response.data) {
			console.log("logged");
		}
	});

	$scope.login = function() {
		$http.post(API.HOST + '/login', $scope.user)
			.success(function(data) {
				$session.put("token", data.token);
				$session.put("id", data.id);
			})
            .error(function() {
                console.error("Login fail");
            });
	}
});
