<?php

namespace App;
use App\Task;
use App\User;

use Illuminate\Database\Eloquent\Model as Eloquent;

class Project extends Eloquent{
    public $timestamps = false;
    protected $primaryKey = 'id';

    public function tasks() {
        return $this->belongsToMany('App\Task', 'tasks_project', 'id_task', 'id_project');
    }

    public function users() {
        return $this->belongsToMany('App\User', 'users_project', 'id_user', 'id_project');
    }

    static function getAllProjects() {
      return Project::all();
    }

    static function getProject($id) {
      return Project::find($id);
    }

	  static function getUserProjectsNumber ($id) {
		  return User::getUserProjects($id)->count();
	  }

    static function getTasksByProject($id) {
      return Project::find($id)->tasks;
    }
}

?>
