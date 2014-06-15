define([
    'models/TaskModel',
    'views/TaskView',
    'lib/i18n'
], function (
    TaskModel,
    TaskView,
    i18n
) {
    var SprintView = Backbone.View.extend({
        events: {
            'click h2': 'toggleSprint',
            'click .addTask': 'doAddTask'
        },
        initialize: function () {
            this.taskViews = [];
            this.collection.localStorage = new Backbone.LocalStorage('sprint.' + this.model.get('sprint'));
            this.collection.fetch();
            this.render();
        },
        render: function () {
            // by default, don't show this sprint
            this.$el.find('.tasks').hide();
            this.collection.each(function (task) {
                var newTaskView = new TaskView({
                    model: task
                });
                this.taskViews.push(newTaskView);
                this.$el.find('.tasklist').append(newTaskView.el);
            }, this);
        },
        doAddTask: function () {
            var taskModel = new TaskModel({
                name: i18n.t('task.new')
            }), newTaskView;
            this.collection.add(taskModel);
            newTaskView = new TaskView({
                model: taskModel
            });
            this.taskViews.push(newTaskView);
            this.$el.find('.tasklist').append(newTaskView.el);
        },
        toggleSprint: function () {
            this.$el.toggleClass('expanded');
            this.$el.find('.tasks').toggle();
        }
    });
    return SprintView;
});
