"use strict";

app.controller("usersCtrl", function(API, $scope, $http, Session, $session, $location, $routeParams) {

    $scope.display = false;

    Session.isAuth().then(function(response) {
		    if(response.data) {
			       $scope.display = true;
		    } else {
			       $scope.display = false;
		    }
    });

    $scope.getUsers = function() {
      	$http.get(API.HOST + "/users")
  			.success(function(data){
  				$scope.users = data;
  			});
  	}
  	$scope.getUsers();

    $scope.submit = function() {
        $http.post(API.HOST + "/users", $scope.user)
    			.success(function(data){
            alert("L'utilisateur a bien été créé.");
            location.path('/users');
    		  });
    }
});
