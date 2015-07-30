<?php

use App\User;
use App\Task;
use App\Project;

$app->get('/projects', function() use ($app) {
	$req = Project::getAllProjects();
	$app->render(
		'json.php',
		array("data" => $req)
	);
});

$app->get('/projects/:id', function($id) use ($app) {
	$req = Project::getProject($id);
	$app->render(
		'json.php',
		array("data" => $req)
	);
});

$app->get('/users/:id/projects/number', function($id) use ($app) {
	$req = Project::getUserProjectsNumber($id);
	$app->render(
		'json.php',
		array("data" => $req)
	);
});

$app->post('/projects', function() use ($app) {
    $req = $app->request();

    $body = json_decode($req->getBody());

    $newProject = new Project();
    $newProject->name = $body->name;;
    $newProject->deadline = $body->deadline;
    $newProject->save();
})->name('createTask');

?>
