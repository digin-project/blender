var app = angular.module('app', ['ngRoute', 'ngResource', 'ngCookies']);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {templateUrl:'views/tasks/myTasks.html', controller:"tasksCtrl"})
	.when('/submit', {templateUrl:'views/submit.html', controller:"PostUserCtrl"})
	.when('/connect', {templateUrl:'views/connect.html', controller:"LoginCtrl"})
	.when('/profil', {templateUrl:'views/users/profil.html', controller:"profilCtrl"})
	.when('/tasks', {templateUrl:'views/tasks/tasks.html', controller:"tasksCtrl"})
	.when('/user/tasks', {templateUrl:'views/tasks/myTasks.html', controller:"tasksCtrl"})
	.when('/tasks/add', {templateUrl:'views/tasks/addTask.html', controller:"tasksCtrl"})
	.when('/project/:id', {templateUrl:'views/projects/project.html', controller:"projectsCtrl"})
	.when('/projects', {templateUrl:'views/projects/projects.html', controller:"projectsCtrl"})
	.when('/user/projects', {templateUrl:'views/projects/myProjects.html', controller:"projectsCtrl"})
	.when('/projects/add', {templateUrl:'views/projects/addProject.html', controller:"projectsCtrl"})
    .when('/users', {templateUrl:'views/users/users.html', controller:"usersCtrl"})
    .when('/users/add', {templateUrl:'views/users/addUser.html', controller:"usersCtrl"})
	.when('/edit/:id', {templateUrl:'views/edit.html', controller:"editCtrl"})
    .otherwise({redirectTo: '/'});
});

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.useXDomain = true;
//     $httpProvider.defaults.withCredentials = true;
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
// }]);

app.constant("API", {
    "HOST" : "http://localhost:8888/api"
});

app.service("$session", function() {
    this.get = function(key) {
        return localStorage.getItem(key);
    },

    this.set = this.put = function(key,value) {
        return localStorage.setItem(key,value);
    },

    this.remove = function(key) {
        return localStorage.removeItem(key);
    },

    this.removeAll = function() {
        return localStorage.clear();
    }
});

app.directive("tasks", function() {
    return {
        restrict : "E",
        templateUrl : "views/fragments/tasks.html"
    }
});

app.factory("Session", function(API, $http, $session) {
	return {
		isAuth : function() {
			_token = $session.get('token');
			return $http.post(API.HOST + '/isauth', { token : _token });
		}
	}
});

// ----------------------------- PAGE ACCUEIL ----------------------------- //
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
        for(t in data) { data[t].finish = data[t].finish == "1" ? true : false; }
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

app.controller("projectsCtrl", function(API, $scope, $routeParams, $http, Session, $session, $location) {

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

// ----------------------------- PAGE SUBMIT ----------------------------- //
app.controller("PostUserCtrl", function(API, $scope, $http, $location) {

	$scope.submit = function() {
    	$http.post(API.HOST + "/users", $scope.user)
			.success(function(data){
				$location.path('/');
		});
	}
});

// ----------------------------- PAGE LOGIN ----------------------------- //
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

// ----------------------------- HEADER ----------------------------- //
app.controller("headerCtrl", function(API, $scope, $http, $location, $session, Session) {

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
		console.log("Vous vous êtes bien deconnecté !");
	}

});

// ----------------------------- PAGE PROFIL ----------------------------- //
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

app.controller("editCtrl", function(API, $scope, $http, $location, $session, Session, $routeParams) {

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
