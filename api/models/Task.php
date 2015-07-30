<?php
namespace App;
use DB;
use App\Project;
use App\User;
use Illuminate\Database\Eloquent\Model as Eloquent;

define("BULLSHIT_PWD", "");

class Task extends Eloquent{
    public $timestamps = false;
    protected $primaryKey = 'id';

    static function serialize($data) {
        return print json_encode(array(
            "id" => $data["id"],
            "name" => $data["name"],
            "content" => $data["content"],
            "created" => $data["created"],
            "deadline" => $data["deadline"],
            "importance" => $data["importance"]
        ));
    }

    public function projects() {
        return $this->belongsToMany('App\Project', 'tasks_project', 'id_task', 'id_project');
    }

    public function tasks() {
        return $this->belongsToMany('App\Task', 'tasks_project', 'id_task', 'id_project');
    }

    public function users() {
        return $this->belongsToMany('App\Users', 'tasks_user', 'id_user', 'id_task');
    }

    public function getChild() {
        return $this->belongsToMany('App\Task', 'tasks_task','id_task_mere','id_task_fille');
    }

    public function getParent() {
        return $this->belongsToMany('App\Task', 'tasks_task','id_task_fille','id_task_mere');
    }

    static function getTask($id) {
        return Task::find($id);
    }

    static function getUserTasks($id) {
        return User::find($id)->tasks;
    }

    static function getAllTasks() {
        return Task::orderBy("importance", "ASC")->get();
    }

    static function getProjectByTask($id) {
        return Task::find($id)->projects;
    }

    // static function getTasksByProject($id) {
    //     return Project::find($id)->tasks;
    // }

    static function getUserTasksNumber ($id) {
  		  return Task::getUserTasks($id)->count();
  	}

    static function getTasksByUser ($id) {
        return User::find($id)->tasks;
    }

	static function deletee($id) {
		$bdd = new \PDO('mysql:host=localhost;dbname=gestionnaire;charset=utf8', 'root', BULLSHIT_PWD);

		$sql = 'DELETE FROM `tasks_user` WHERE `id_task` LIKE ' . $id;
    $sql2 = 'DELETE FROM `tasks_project` WHERE `id_task` LIKE ' . $id;
    $sql3 = 'DELETE FROM `tasks_task` WHERE `id_task_fille` LIKE ' . $id;


		$query = $bdd->prepare($sql);
    $query2 = $bdd->prepare($sql2);
    $query3 = $bdd->prepare($sql3);
    	$query->execute();
      $query2->execute();
      $query3->execute();
    	return self::getAllTasks();
	}

	static function addToTasks_user($id, $id_user) {
		$bdd = new \PDO('mysql:host=localhost;dbname=gestionnaire;charset=utf8', 'root', BULLSHIT_PWD);

		$sql = 'INSERT INTO tasks_user (id_user, id_task) VALUES (' . $id_user . ', ' . $id . ')';
		$query = $bdd->prepare($sql);
    	$query->execute();
	}

  static function addToTasks_task($id_task_fille, $id_task_mere) {
		$bdd = new PDO('mysql:host=localhost;dbname=gestionnaire;charset=utf8', 'root', BULLSHIT_PWD);

		$sql = 'INSERT INTO tasks_task (id_task_mere, id_task_fille) VALUES (' . $id_task_mere . ', ' . $id_task_fille . ')';
		$query = $bdd->prepare($sql);
    	$query->execute();
	}

  static function addToTasks_project($id, $id_project) {
		$bdd = new PDO('mysql:host=localhost;dbname=gestionnaire;charset=utf8', 'root', BULLSHIT_PWD);

		$sql = 'INSERT INTO tasks_project (id_task, id_project) VALUES (' . $id . ', ' . $id_project . ')';
		$query = $bdd->prepare($sql);
    	$query->execute();
	}

  static function putTasks_user($id_task, $id_user) {
		$bdd = new PDO('mysql:host=localhost;dbname=gestionnaire;charset=utf8', 'root', BULLSHIT_PWD);

		$sql = 'UPDATE tasks_user SET id_user = ' . $id_user . ' WHERE id_task LIKE '. $id_task .'';
		$query = $bdd->prepare($sql);
    	$query->execute();
	}

    /* My test */

    static function getFormatedTasksByUser($id_user) {
        $bdd = new PDO('mysql:host=localhost;dbname=gestionnaire;charset=utf8', 'root', BULLSHIT_PWD);

        $tasks = "SELECT tasks.id, tasks.deadline, tasks.created, tasks.importance, projects.name
                FROM tasks
                INNER JOIN tasks_user ON tasks_user.id_user = ${id_user}
                INNER JOIN tasks_project ON tasks_project.id_task = tasks.id
                INNER JOIN projects ON projects.id = tasks_project.id_project";

        $query = $bdd->prepare($tasks);
    	$query->execute();
    	$result = $query->fetchAll(PDO::FETCH_ASSOC);
        var_dump($result);
    }

    /**
     * For example, I'm Pierre ! Hi !
     *
     * NOT NOW MOUAHHAHAHAHAHA
     * So $id_user = 7
     */
    static function oldShit($id_user = 7) {

        print json_encode($fake);
        exit();

        // var_dump(self::getFormatedTasksByUser($id_user));
        $data = array(
            "tasks" => array(),
            "projects" => array()
        );

        foreach (self::getTasksByUser($id_user) as $k => $task) {
            array_push($data["tasks"], $task);
            foreach(self::getProjectByTask($task["id"]) as $i => $project) {
                array_push($data["projects"], $project);
            }
        };
        var_dump($data);
        exit();

        /**
         * First, define default state
         */
        $__tasks = array(
            "collection" => array(),
            "length" => 0,
            "state" => array()
        );

        $__me = array(
            "id" => $id_user,
            "tasks" => 0,
            "percent" => 0
        );

        $__user = array(
            "length" => 0,
        );

        /**
         * Sorry for this bullshit
         * but I don't know Eloquent and I need data
         *
         * So after my script success, I clean this !
         *
         *
         * SORRY JESUS !
         */
        $bdd = new PDO('mysql:host=localhost;dbname=gestionnaire;charset=utf8', 'root', BULLSHIT_PWD);

        /**
         * So now, I need porn data
         * Let's go
         */

        /**
         * I get users length here
         */
        $users = "SELECT id FROM users";
        $query = $bdd->prepare($users);
        $query->execute();
        $__user["length"] = count($query->fetchAll(PDO::FETCH_ASSOC));

        /**
         * I get tasks length here
         */
        $tasks = "SELECT * FROM tasks";
        $query = $bdd->prepare($tasks);
        $query->execute();
        $tmp_tasks = $query->fetchAll(PDO::FETCH_ASSOC);
        $__tasks["collection"] = $tmp_tasks;
        $__tasks["length"] = count($tmp_tasks);

        /**
         * So I need all my tasks
         * Magic of "self" scope
         */
        $__me["tasks"] = count(self::getTasksByUser($id_user));

        /**
         * I have XX % of all tasks for me
         *
         * OMG I'M KING OF MATH
         */
        $__me["percent"] = ($__tasks["length"] / $__me["tasks"]) * 100;

        foreach ($__tasks["collection"] as $k => $t) {
            $created = strtotime($t["created"]);
            $now = time();
            $deadline = strtotime($t["deadline"]);
            $percent = round(($now - $created) / ($deadline - $created) * 100, 2);

            array_push($__tasks["state"], array(
                "id" => $t["id"],
                "percent" => $percent
            ));
        }

        var_dump($__user);
        var_dump($__tasks);
        var_dump($__me);
        exit();
    }

    static function oldOldShit() {

        $fake = array(
            array(
                "id" => "109",
                "created" => "2015-07-21 17:46:37",
                "deadline" => "2015-10-14",
                "importance" => 1,
                "child" => 0,
                "parent" => 0,
                "project" => array(
                    "name" => "projectmanager",
                    "tasks" => 3
                )
            ),
            array(
                "id" => "108",
                "created" => "2015-07-21 17:44:59",
                "deadline" => "2015-08-10",
                "importance" => 2,
                "child" => 0,
                "parent" => 1,
                "project" => array(
                    "name" => "projectmanager",
                    "tasks" => 3
                )
            ),
            array(
                "id" => "110",
                "created" => "2015-07-21 17:47:12",
                "deadline" => "2015-07-30",
                "importance" => 3,
                "child" => 1,
                "parent" => 0,
                "project" => array(
                    "name" => "otherproject",
                    "tasks" => 2
                )
            ),
            array(
                "id" => "111",
                "created" => "2015-07-22 11:43:39",
                "deadline" => "2015-07-30",
                "importance" => 2,
                "child" => 1,
                "parent" => 1,
                "project" => array(
                    "name" => "projectmanager",
                    "tasks" => 3
                )
            )
        );

        $data = $fake;
        $tmp = array();

        foreach ($data as $i => $task) {

            (float)$tmp[$task["id"]] = 0;

            /**
             * Calc between now and deadline
             */
            $created = strtotime($task["created"]);
            $now = time();
            $deadline = strtotime($task["deadline"]);
            $percent = ($deadline > $now) ? round(($now - $created) / ($deadline - $created) * 100, 2) : 0;

            print "lol " . $percent . "<br>";

            /**
             * Add float result for each task
             */
            $tmp[$task["id"]] = $tmp[$task["id"]] + $percent;

            if($task["child"] !== 0) $tmp[$task["id"]] = $tmp[$task["id"]] + ($task["child"] * 1.5);
            if($task["parent"] !== 0) $tmp[$task["id"]] = $tmp[$task["id"]] + $task["parent"];

            // cette tâche représente XX % du total des tâches de ce projet
            $tmp[$task["id"]] = $tmp[$task["id"]] * (1 / $task["project"]["tasks"] * 100);
        }

        arsort($tmp);
        var_dump($tmp);
        var_dump($fake);

        exit();

    }

    static function analyse() {

        $fake = array(
            array(
                "id" => "109",
                "days" => 5,
                "importance" => 1,
                "child" => 0,
                "project" => array(
                    "name" => "projectmanager",
                    "tasks" => 3
                )
            ),
            array(
                "id" => "108",
                "created" => "2015-07-21 17:44:59",
                "deadline" => "2015-08-10",
                "importance" => 2,
                "child" => 0,
                "parent" => 1,
                "project" => array(
                    "name" => "projectmanager",
                    "tasks" => 3
                )
            ),
            array(
                "id" => "110",
                "created" => "2015-07-21 17:47:12",
                "deadline" => "2015-07-30",
                "importance" => 3,
                "child" => 1,
                "parent" => 0,
                "project" => array(
                    "name" => "otherproject",
                    "tasks" => 2
                )
            ),
            array(
                "id" => "111",
                "created" => "2015-07-22 11:43:39",
                "deadline" => "2015-07-30",
                "importance" => 2,
                "child" => 1,
                "parent" => 1,
                "project" => array(
                    "name" => "projectmanager",
                    "tasks" => 3
                )
            )
        );

    }

}

?>
