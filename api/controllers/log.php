<?php

use App\User;
use App\Task;
use App\Project;

$app->post('/login', function() use($app) {
	$req = $app->request();

	$body = json_decode($req->getBody());

//	$user = new User();
//	$user->mail = $body->mail;
//	$user->password = $body->password;

	$user = User::where('mail', '=',  $body->mail)->where('password', '=', $body->password)->first();

	function generateToken($mail) {
		$salt = substr(md5(rand()), 0, 7);
		return base64_encode($salt . sha1($mail) . time());
	}

	if($user) {
		// ton user existe
		// tu crée un token (càd un truc long en sha1 de préférence)
		$token = generateToken($body->mail);

		// tu stock le token dans la bdd
		// ta table user à une entrée token, null à la création et qui à chaque connexion fais un update du 				champ
		 $user->token = $token;
		 $user->save();

		// tu envoies le token au front

		$response = array();
		$response['token'] = $token;
		$response['id'] = $user->id;

		$app->response()->status(500);
		$app->response()->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		echo json_encode($response);
	} else {
		if (User::where('mail', '=', $body->mail)->first()) {

		} else {
			echo "Le mail ou le mot de passe n'existe pas</br>";
		}

		if (User::where('password', '=', $body->password)->first()) {

		} else {
			echo "Mot de passe incorrect !";
		}
	}
});

$app->post('/isauth', function() use ($app) {
	$req = $app->request();
    $body = json_decode($req->getBody());
	$token = $body->token;

	// if(isEmpty($token) { echo false };
	// si il y a pas de token tu renvoies faux

	$user = User::where('token', '=', $token)->first();

	if($user) {
		echo "bien joué";
	}
});

?>
