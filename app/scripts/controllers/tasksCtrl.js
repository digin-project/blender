"use strict";

app.controller("tasksCtrl", function(API, $scope, $routeParams, $http, Session, $session, $location) {

	$scope.display = false;
    $scope.open = false;
	$scope.id = $session.get("id") ? $session.get("id") : null;

    $scope.range = function(n) {
        n = n > 0 ? n : 1;
        return new Array(n);
    }

  $scope.isFinished = function(task) {
    $http.put(API.HOST + "/tasks/" + task.id + "/state", JSON.stringify(task))
			.success(function(data){
			});
  }

	Session.isAuth().then(function(response) {
		if(response.data) {
			$scope.display = true;
		} else {
			$scope.display = false;
		}
	});

	$scope.getTasksByProject = function() {
    	$http.get(API.HOST + "/tasks/project/" + $routeParams.id)
    			.success(function(data){
              $scope.tasksByProject = data;
    			});
	}
	$scope.getTasksByProject();

	$scope.getTasks = function() {
    	$http.get(API.HOST + "/tasks")
			.success(function(data){
				$scope.tasks = data;
			});
	}
	$scope.getTasks();

	$scope.getUsers = function() {
    	$http.get(API.HOST + "/users")
			.success(function(data){
				$scope.users = data;
			});
	}
	$scope.getUsers();

	$scope.getTasksByUser = function() {
    	$http.get(API.HOST + "/users/"+$scope.id+"/tasks")
			.success(function(data){
        // OMG, I'm so sorryyyyy !!!! JESUS
        for(var t in data) { data[t].finish = data[t].finish == "1" ? true : false; }
				$scope.tasksByUser = data;
			});
	}
	$scope.getTasksByUser();

  $scope.getProjects = function() {
    	$http.get(API.HOST + "/projects")
			.success(function(data){
				$scope.projects = data;
			});
	}
	$scope.getProjects();



//------------- POST ---------- //

$scope.submit = function() {
    $http.post(API.HOST + "/tasks", $scope.task)
			.success(function(data){
        console.log();
            alert("La tâche a bien été créée.");
				    $location.path('/tasks');
		});
}

$scope.delete = function($id) {
		$http.delete(API.HOST + "/tasks/"+$id)
			.success(function(data){
        console.log(data);
				alert("Vous avez bien supprimé la tâche");
          $scope.tasks
			});
	}
});
