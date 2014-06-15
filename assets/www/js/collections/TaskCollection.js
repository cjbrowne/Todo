define([
    'models/TaskModel'
], function (
    TaskModel
) {
    var TaskCollection = Backbone.Collection.extend({
        model: TaskModel,
        localStorage: new Backbone.LocalStorage('task-collection')
    });
    return TaskCollection;
});
