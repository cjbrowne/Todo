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
        tagName: 'li',

        events: {
            'click h2': 'toggleSprint',
            'click .addTask': 'doAddTask'
        },

        initialize: function () {
            this.taskViews = [];
            this.model.localStorage = new Backbone.LocalStorage('sprint.' + this.model.get('sprint'));
            this.model.fetch();
            this.render();
        },

        render: function () {
            this.$el.addClass('sprint');
            // by default, don't show this sprint
            this.$el.html(_.template($('.templates .sprint').html(), {
                sprintTitle: i18n.t('sprintNames.' + this.model.get('sprint')),
                startDate: new Date(this.model.get('startTime')).toLocaleDateString(i18n.lng()),
                addTask: i18n.t('task.add')
            }));
            if(this.model.get('startTime') === null) {
                this.$el.find('.start-date').hide();
            }
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
