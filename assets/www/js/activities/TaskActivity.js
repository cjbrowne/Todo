define([
    'views/TitleView',
    'models/TitleModel',
    'views/AddTaskView',
    'collections/TaskCollection',
    'lib/i18n'
], function (
    TitleView,
    TitleModel,
    AddTaskView,
    TaskCollection,
    i18n
) {
    var TaskActivity = Backbone.Activity.extend({
        onStart: function (routeParams) {
            var taskCollection = new TaskCollection();
            taskCollection.fetch();
            this.titleView = new TitleView({
                model: new TitleModel({
                    title: i18n.t('task.add')
                })
            });
            this.addTaskView = new AddTaskView({
                collection: taskCollection
            });
            $("#app").append(this.titleView.el);
            $("#app").append(this.addTaskView.el);
        },
        onStop: function () {
            this.addTaskView.remove();
        }
    });
    return TaskActivity;
});
