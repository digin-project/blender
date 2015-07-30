var app = angular.module('app', [
    'ngRoute',
    'ngResource',
    'ngCookies'
]);

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


app.constant("API", {
    "HOST" : "http://localhost:8888/api"
});

app.run(function() {
    // do something padawan
});


// ----------------------------- PAGE ACCUEIL ----------------------------- //





// ----------------------------- PAGE SUBMIT ----------------------------- //

// ----------------------------- PAGE LOGIN ----------------------------- //

// ----------------------------- HEADER ----------------------------- //

// ----------------------------- PAGE PROFIL ----------------------------- //
