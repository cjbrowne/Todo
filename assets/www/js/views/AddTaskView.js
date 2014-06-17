define([
    'lib/i18n'
], function (
    i18n
) {
    var AddTaskView = Backbone.View.extend({
        tagName: 'form',
        events: {
            'click .taskDone': 'toggleDone',
            'click .addTask': 'addTask'
        },
        initialize: function () {
            this.render();
            this.$nameEl = this.$el.find('.task-name-input');
            this.$taskDoneEl = this.$el.find('.taskDone');
            this.$priorityEl = this.$el.find('select.priority');
            this.$startDateEl = this.$el.find('.date-picker');
        },
        render: function () {
            this.$el.addClass("new-task");
            // hack to disable form submission when button is clicked
            this.$el.on('submit', function () {
                return false;
            });
            this.$el.html(_.template($('.templates .edit-task').html(), {
                name: i18n.t('task.new'),
                priority: {
                    label: i18n.t('task.priority'),
                    low: i18n.t('priority.low'),
                    medium: i18n.t('priority.medium'),
                    high: i18n.t('priority.high')
                },
                startDate: {
                    label: i18n.t('task.startDate')
                },
                addTask: i18n.t('task.add')
            }));
        },
        addTask: function () {
            this.collection.create({
                name: this.$nameEl.val(),
                done: this.$taskDoneEl.hasClass('selected'),
                startTime: Date.parse(this.$startDateEl.val()).getTime(),
                priority: this.$priorityEl.val()
            });
            Backbone.history.navigate('/sprint');
        },
        toggleDone: function () {
            var $taskDone = this.$taskDoneEl;
            $taskDone.toggleClass('selected');
            $taskDone.html(
                $taskDone.html() == " " ?
                "&#10004;" :
                " "
            );
        }
    });
    return AddTaskView;
});
