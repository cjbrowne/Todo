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
                    return taskStart >= sprintStart &&
                        taskStart < sprintEnd;
                });
            return new TaskCollection(sprintTasks);
        }
    });
    return TaskCollection;
});
