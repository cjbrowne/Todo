define([
    'models/TaskModel'
], function (
    TaskModel
) {
    var TaskCollection = Backbone.Collection.extend({
        model: TaskModel,
        localStorage: new Backbone.LocalStorage('task-collection'),
        getTasksForSprint: function (sprintModel) {
            var sprintStart = sprintModel.get('startTime'),
                sprintEnd = sprintModel.get('endTime'),
                sprintTasks = this.filter(function (task) {
                    var taskStart = task.get('startTime');
                    console.log('sprint start:', new Date(sprintStart).toLocaleDateString(), 'task:', new Date(taskStart).toLocaleDateString(), 'sprint end:', new Date(sprintEnd).toLocaleDateString());
                    return taskStart >= sprintStart &&
                        taskStart < sprintEnd;
                });
            return new TaskCollection(sprintTasks);
        }
    });
    return TaskCollection;
});
