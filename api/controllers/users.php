<?php
// --------------------- GET --------------------- //
use App\User;
use App\Task;
use App\Project;
  // GET /books/:book_id
  $app->get('/users', function () use ($app) {
    $users = User::getAllUsers();

    foreach ($users as $user => $content) {

      $id = $users[$user]->id;
      $content = Task::getUserTasksNumber($id);
      $users[$user]->nbTasks = $content;

    }

    $app->render(
      'json.php',
      array("data" => $users)
    );
  })->name('user'); // named route so I can use with "urlFor" method

  $app->get('/users/tasks', function () use ($app) {
    $users = User::all();

    foreach ($users as $tasks => $content) {
      $id_user = $users[$tasks]->id;

      $content2 = Task::getUsersTasksNumber($id_user);
      $users[$tasks]->nbTasks = $content2[0]["number"];

      $content = Task::getTasksByUser($id_user);
      $users[$tasks]->tasks = $content;

      if(empty($users[$tasks]->tasks)) {
         $users[$tasks]->tasks = "Ne possède pas de tâches";
      }
    }

    $app->render(
      'json.php',
      array("data" => $users)
    );

  })->name('user'); // named route so I can use with "urlFor" method

$app->get('/users/:id', function($id) use ($app) {
    $user = User::find($id);
    $app->render(
      'json.php',
        array("data" => $user)
    );
})->name('userById');

$app->get('/users/:id/projects', function($id) use ($app) {
	 $req = User::getUserProjects($id);

	$app->render(
		'json.php',
		array("data" => $req)
	);
});

// $app->get('/users/:id_user/projects', function($id_user) use ($app) {
// 	$req = User::getProjectsByUser($id_user);
//   $req = User::all();
// 	$app->render(
// 		'json.php',
// 		array("data" => $req)
// 	);
// });

// --------------------- POST --------------------- //

$app->post('/users', function() use ($app) {
    $req = $app->request();

    $body = json_decode($req->getBody());

    $newUser = new User();
	$newUser->mail = $body->mail;
    $newUser->name = $body->name;
    $newUser->firstname = $body->firstname;
    $newUser->password = $body->password;
    $newUser->save();
})->name('createUser');

// --------------------- PUT --------------------- //

$app->put('/users/:id', function($id) use ($app) {
    $req = $app->request();
    $body = json_decode($req->getBody());

    $putUser = User::find($id);

	$putUser->mail = $body->mail;
    $putUser->name = $body->name;
    $putUser->firstname = $body->firstname;
    $putUser->password = $body->password;
    $putUser->save();
})->name('putUser');

// --------------------- DELETE --------------------- //

$app->delete('/users/:id', function($id) use ($app) {
    User::destroy($id);
})->name('delete');


?>
