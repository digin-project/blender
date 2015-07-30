<?php

use App\User;
use App\Task;
use App\Project;

$app->get('/tasks', function() use ($app) {
	$req = Task::getAllTasks();
	$app->render(
		'json.php',
		array("data" => $req)
	);
});

$app->get('/projects/:id/tasks', function($id) use ($app) {
	$req = Project::getTasksByProject($id);
	$app->render(
		'json.php',
		array("data" => $req)
	);
});

$app->get('/users/:id/tasks', function($id) use ($app) {
	$req = Task::getTasksByUser($id);
	$app->render(
		'json.php',
		array("data" => $req)
	);
});

$app->get('/tasks/:id', function($id) use ($app) {
	$req = Task::getTask($id);
	$app->render(
		'json.php',
		array("data" => $req)
	);
});

$app->get('/users/:id_user/tasks/number', function($id) use ($app) {
	$req = Task::getUserTasksNumber($id);
	$app->render(
		'json.php',
		array("data" => $req)
	);
});

$app->post('/tasks', function() use ($app) {
    $req = $app->request();
    $body = json_decode($req->getBody());

    $newTask = new Task();
    $newTask->name = $body->name;
    $newTask->content = $body->content;
    $newTask->importance = $body->importance;
    $newTask->save();

    $id = $body->id_user;
    $id_task = $newTask->id;
    Task::addToTasks_user($id_task, $id);

	if(isset($body->id_task_mere)) {
		$id_task_mere = $body->id_task_mere;
		Task::addToTasks_task($id_task_mere, $id_task);
	}

	$id_project = $body->id_project;
	Task::addToTasks_project($id_task, $id_project);
})->name('createTask');

$app->put('/tasks/:id', function($id) use ($app) {
    $req = $app->request();
    $body = json_decode($req->getBody());

		$putTask = Task::find($id);

    $putTask->name = $body->name;
    $putTask->content = $body->content;
    $putTask->deadline = $body->deadline;
    $putTask->importance = $body->importance;
    $putTask->save();

     $id_user = $body->id_user;
     $id_task = $putTask->id;
     Task::putTasks_user($id_task, $id_user);
})->name('createTask');

$app->put("/tasks/:id/state", function($id) use ($app) {
	$req = $app->request();
	$body = json_decode($req->getBody());

	$putTask = Task::find($id);
	$putTask->finish = $body->finish;
	$putTask->save();

	print true;
});

$app->post('/tasks/user', function() use ($app) {
    $req = $app->request();

    $body = json_decode($req->getBody());

    $newUser = new User();
    $newUser->id_user = $body->id_user;

    Task::addToTasks_user($body->id_task, $body->id_user);
})->name('createTask');

$app->delete('/tasks/:id', function($id) use ($app) {
    Task::destroy($id);
    Task::deletee($id);

})->name('delete');

/* Test algo */

$app->get("/tasks/algo/lol", function(){
	$output = exec("python ../blender.py");
	var_dump($output);
})->name("algo");

?>
