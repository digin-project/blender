data = [

    {
        "id" : 109,
        "step" : 1,
        "priority" : 2,
        "project" : 1,
        "project_deadline" : "07/08/2015",
        "project_step" : 3
    },
    {
        "id" : 110,
        "step" : 2,
        "priority" : 2,
        "project" : 1,
        "project_deadline" : "07/08/2015",
        "project_step" : 3
    },
    {
        "id" : 113,
        "step" : 3,
        "priority" : 2,
        "project" : 1,
        "project_deadline" : "07/08/2015",
        "project_step" : 3
    },
    {
        "id" : 114,
        "step" : 3,
        "priority" : 3,
        "project" : 1,
        "project_deadline" : "07/08/2015",
        "project_step" : 3
    },

    {
        "id" : 111,
        "step" : 1,
        "priority" : 2,
        "project" : 2,
        "project_deadline" : "19/08/2015",
        "project_step" : 1
    },
    {
        "id" : 112,
        "step" : 1,
        "priority" : 1,
        "project" : 2,
        "project_deadline" : "19/08/2015",
        "project_step" : 1
    },

    {
        "id" : 115,
        "step" : 1,
        "priority" : 2,
        "project" : 3,
        "project_deadline" : "01/09/2015",
        "project_step" : 4
    },
    {
        "id" : 116,
        "step" : 2,
        "priority" : 2,
        "project" : 3,
        "project_deadline" : "01/09/2015",
        "project_step" : 4
    },
    {
        "id" : 118,
        "step" : 3,
        "priority" : 2,
        "project" : 3,
        "project_deadline" : "01/09/2015",
        "project_step" : 4
    },
    {
        "id" : 119,
        "step" : 4,
        "priority" : 2,
        "project" : 3,
        "project_deadline" : "01/09/2015",
        "project_step" : 4
    },
    {
        "id" : 120,
        "step" : 4,
        "priority" : 2,
        "project" : 3,
        "project_deadline" : "01/09/2015",
        "project_step" : 4
    }
]

#!/usr/bin/env python

import sys
import json
import time
from datetime import datetime

class Blender:

    data = {}
    version = "0.0.3"

    def __init__(self, data):
        self.data = data

    @staticmethod
    def terminalDump(data):
        try:
            print(json.dumps(data, sort_keys = True, indent = 4))
            sys.stdout.flush()
        except (Exception, RuntimeError):
            raise

    def getProjectSpan(self, _date):
        try:
            deadline = datetime.strptime(_date, "%d/%m/%Y")
            now = datetime.today()
            return (deadline - now).days
        except ValueError as err:
            raise err

    def getTaskInStep(self, project, step):
        _tasks = 0
        for task in self.data:
            if task["project"] == project and task["step"] == step:
                _tasks += 1

        return _tasks

    def getMaxProjectSpan(self):
        _max_ = 0
        for task in self.data:
            if self.getProjectSpan(task["project_deadline"]) > _max_ : _max_ = self.getProjectSpan(task["project_deadline"])

        return _max_

    def shake(self):
        stime = time.time()
        order = {}
        K1 = K2 = K3 = 1

        try:
            for i,task in enumerate(self.data):

                # Task step
                _TS_ = task["step"]
                # Current project
                _CP_ = task["project"]

                # Task priority
                TP = task["priority"]
                # Total project step
                PS = task["project_step"]
                # (Limit) Project span
                LPS = self.getProjectSpan(task["project_deadline"])
                # Max project span
                MPS = self.getMaxProjectSpan()
                # Task in next step
                TNS = 0
                # Priority global for this task
                PGT = 0

                # If next step exist
                if not _TS_ == PS or _TS_ < PS:
                    try:
                        _NS_ = _TS_ + 1
                        TNS = self.getTaskInStep(_CP_, _NS_)
                    except ValueError as err:
                        raise err

                # DO THE MAGIC
                PGT = ((K1 * TP) * (K2 * ((LPS + 1) / (MPS + 1))) * (K3 * 1 / (TNS + 1))) + pow(3, _TS_)

                order[task["id"]] = PGT

                # print("Task : {0} | Indice : {1}".format(task["id"], PGT))

            Blender.terminalDump(order)

        except (Exception, RuntimeError) as err:
            raise err
        finally:
            print("Finish : {0} seconds".format(time.time() - stime))

"""
RUUUUUUUUUUUUUN BILLY
"""
Blender(data).shake()
