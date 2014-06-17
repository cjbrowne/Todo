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
        onCreate: function () {
            this.titleView = new TitleView({
                model: new TitleModel({
                    title: i18n.t('task.add')
                })
            });
            this.addTaskView = new AddTaskView({
                collection: new TaskCollection()
            });
        },
        onStart: function (routeParams) {
            this.titleView.render();
            this.addTaskView.render();
            $("#app").append(this.titleView.el);
            $("#app").append(this.addTaskView.el);
        },
        onStop: function () {
            this.titleView.remove();
            this.addTaskView.remove();
        }
    });
    return TaskActivity;
});
