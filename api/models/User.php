<?php
namespace App;
use App\Task;
use App\Project;
use Illuminate\Database\Eloquent\Model as Eloquent;

class User extends Eloquent{
    public $timestamps = false;
    protected $primaryKey = 'id';

    public function tasks() {
        return $this->belongsToMany('App\Task', 'tasks_user', 'id_user', 'id_task');
    }

    public function projects() {
        return $this->belongsToMany('App\Project', 'users_project', 'id_user', 'id_project');
    }

    static function getAllUsers() {
        return User::all();
    }

    static function getUserProjects ($id) {
      return User::find($id)->projects;
    }

    static function getUserProjectsNumber ($id) {
      return User::find($id)->projects->count();
    }

}

?>
