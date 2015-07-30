"use strict";

app.controller("ProjectsCtrl", function(API, $scope, $routeParams, $http, Session, $session, $location) {

	$scope.display = false;
	$scope.id = $session.get("id") ? $session.get("id") : null;

	Session.isAuth().then(function(response) {
		if(response.data) {
			$scope.display = true;
		} else {
			$scope.display = false;
		}
	});

	$scope.getProjectsByUser = function() {
    	$http.get(API.HOST + "/users/" + $scope.id + "/projects") // +$routeParams.id //
			.success(function(data){
				$scope.projectsByUser = data;
			});
	}
	$scope.getProjectsByUser();

  $scope.getProject = function() {
    $http.get(API.HOST + "/projects/" + $routeParams.id) // +$routeParams.id //
    .success(function(data){
      $scope.project = data;
    });
  }
  $scope.getProject();

	$scope.getProjects = function() {
    	$http.get(API.HOST + "/projects")
			.success(function(data){
				$scope.projects = data;
			});
	}
	$scope.getProjects();

  $scope.getProjects = function() {
    	$http.get(API.HOST + "/projects/"+$routeParams.id+"/tasks")
			.success(function(data){
				$scope.tasks = data;
			});
	}
	$scope.getProjects();

	$scope.submit = function() {
    	$http.post(API.HOST + "/projects", $scope.project)
			.success(function(data){
				$location.path('/');
		});
	}

	$scope.getNumberProjects = function() {

    	$http.get(API.HOST + "/users/" + $scope.id + "/projects/number")
			.success(function(data){
				$scope.number = data;
			});
	}
	$scope.getNumberProjects();

});
