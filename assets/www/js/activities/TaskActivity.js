define([
    'views/TitleView',
    'models/TitleModel',
    'views/AddTaskView',
    'models/TaskModel',
    'lib/i18n'
], function (
    TitleView,
    TitleModel,
    AddTaskView,
    TaskModel,
    i18n
) {
    var TaskActivity = Backbone.Activity.extend({
        onStart: function (routeParams) {
            this.titleView = new TitleView({
                model: new TitleModel({
                    title: i18n.t('task.add')
                })
            });
            this.addTaskView = new AddTaskView({
                model: new TaskModel()
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
