var app = angular.module('app', [
    'ngRoute',
    'ngResource',
    'ngCookies'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {templateUrl:'views/tasks/myTasks.html', controller:"TasksCtrl"})
    	.when('/submit', {templateUrl:'views/submit.html', controller:"PostUserCtrl"})
    	.when('/connect', {templateUrl:'views/connect.html', controller:"LoginCtrl"})
    	.when('/profil', {templateUrl:'views/users/profil.html', controller:"ProfilCtrl"})
    	.when('/tasks', {templateUrl:'views/tasks/tasks.html', controller:"TasksCtrl"})
    	.when('/user/tasks', {templateUrl:'views/tasks/myTasks.html', controller:"TasksCtrl"})
    	.when('/tasks/add', {templateUrl:'views/tasks/addTask.html', controller:"TasksCtrl"})
    	.when('/project/:id', {templateUrl:'views/projects/project.html', controller:"ProjectsCtrl"})
    	.when('/projects', {templateUrl:'views/projects/projects.html', controller:"ProjectsCtrl"})
    	.when('/user/projects', {templateUrl:'views/projects/myProjects.html', controller:"ProjectsCtrl"})
    	.when('/projects/add', {templateUrl:'views/projects/addProject.html', controller:"ProjectsCtrl"})
        .when('/users', {templateUrl:'views/users/users.html', controller:"UsersCtrl"})
        .when('/users/add', {templateUrl:'views/users/addUser.html', controller:"UsersCtrl"})
    	.when('/edit/:id', {templateUrl:'views/edit.html', controller:"EditCtrl"})
    .otherwise({redirectTo: '/'});
});


app.constant("API", {
    "HOST" : "http://localhost:8888/api"
});

app.run(function($rootScope, $route) {
    $rootScope.isRoute = function(route){
		return route == $route.current.$$route.originalPath;
	};
});
