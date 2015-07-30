"use strict";

app.controller("profilCtrl", function(API, $scope, $http, $location, $session, Session) {

	$scope.id = $session.get("id") ? $session.get("id") : null;
	$scope.display = false;

	Session.isAuth().then(function(response) {
		if(response.data) {
			$scope.display = true;
		} else {
			$scope.display = false;
		}
	});

	$scope.getProfil = function() {

    	$http.get(API.HOST + "/users/" + $scope.id)
			.success(function(data){
				$scope.user = data;
			});
	}

	$scope.editProfil = function() {
		$http.put(API.HOST + "/users/"+$id, JSON.stringify($scope.user))
			.success(function(data){
				$location.path('/profil');
			});
	}
	$scope.getProfil();

	$scope.getNumberProjects = function() {

    	$http.get(API.HOST + "/users/" + $scope.id + "/projects/number")
			.success(function(data){
        console.log(data);
				$scope.number = data;
			});
	}
	$scope.getNumberProjects();

});
