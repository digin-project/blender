"use strict";

app.controller("EditCtrl", function(API, $scope, $http, $location, $session, Session, $routeParams) {

$scope.getTask = function($id) {
    $http.get(API.HOST + "/tasks/"+$routeParams.id)
    .success(function(data){
      $scope.task = data[0];
      try {
        $scope.task.deadline = new Date(data[0].deadline);
      } catch(e) {
        console.error('Invalid deadline');
      }
    });
}
$scope.getTask();

$scope.editTask = function() {
		$http.put(API.HOST + "/tasks/"+$routeParams.id, JSON.stringify($scope.task))
			.success(function(data){
				$location.path('/tasks');
			});
	}

  $scope.getUsers = function() {
      $http.get(API.HOST + "/users")
      .success(function(data){
        $scope.users = data;
      });
  }
  $scope.getUsers();
});
