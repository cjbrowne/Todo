define([
    'lib/i18n'
], function (
    i18n
) {
    var AddTaskView = Backbone.View.extend({
        tagName: 'form',
        events: {
            'click .taskDone' : 'toggleDone',
            'click .submitAddTaskForm'  : 'addTask'
        },
        render: function () {
            this.$el.addClass("new-task");
            this.$el.html(_.template($('.templates .edit-task').html(), {
                name: i18n.t('task.new'),
                priority: {
                    label  : i18n.t('task.priority'),
                    low    : i18n.t('priority.low'),
                    medium : i18n.t('priority.medium'),
                    high   : i18n.t('priority.high')
                },
                startDate: {
                    label: i18n.t('task.startDate')
                },
                tag: {
                    label: i18n.t('tag.new')
                },
                addTask: i18n.t('task.add')
            }));
            this.$nameEl = this.$el.find('.task-name-input');
            this.$taskDoneEl = this.$el.find('.taskDone');
            this.$priorityEl = this.$el.find('select.priority');
            this.$startDateEl = this.$el.find('.date-picker');
            this.delegateEvents();
            // this is kinda hacky and not x-browser
            this.$el.find('.tags')[0].addEventListener('DOMNodeInsertedIntoDocument', _.bind(this.setupTags, this));
        },
        setupTags: function () {
            this.$el.find('.tags').tagsInput();
        },
        addTask: function () {
            var startDate = this.$el.find('.date-picker').val();
            this.collection.create({
                name      : this.$nameEl.val(),
                done      : this.$taskDoneEl.hasClass('selected'),
                startTime : Date.parse(startDate).getTime(),
                priority  : this.$priorityEl.val()
            });
            Backbone.history.navigate('/sprint', {trigger: true});
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
