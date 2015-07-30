<?php
namespace App;
header("Access-Control-Allow-Origin: http://localhost:9000");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
// header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: Content-Type, x-xsrf-token');
  // require composer autoload (load all my libraries)
  require 'vendor/autoload.php';

  // require database configuration (with Eloquent)
  require 'db/config.php';


  // require my models
	require_once 'models/User.php';
	require_once 'models/Project.php';
	require_once 'models/Task.php';

session_start();

  // Slim initialisation
  $app = new \Slim\Slim(array(
    'view' => '\Slim\LayoutView', // I activate slim layout component
    'layout' => 'layouts/main.php' // I define my main layout
  ));

	require_once 'controllers/log.php';
	require_once 'controllers/projects.php';
	require_once 'controllers/tasks.php';
	require_once 'controllers/users.php';

  // hook before.router, now $app is accessible in my views
  $app->hook('slim.before.router', function () use ($app) {
    $app->view()->setData('app', $app);
  });

  // views initiatilisation
  $view = $app->view();
  $view->setTemplatesDirectory('views');

// --------------------- HOME --------------------- //
  $app->get('/', function() use ($app) {
	  $app->render(
      'layouts/yo.php'
    );
  })->name('root'); // named route so I can use with "urlFor" method



  // always need to be at the bottom of this file !
  $app->run();
