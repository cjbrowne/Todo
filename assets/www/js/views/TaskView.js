define([
    'lib/i18n'
], function (
    i18n
) {
    var TaskView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'change .task-name-input': 'inputChanged',
            'click .taskDone': 'toggleDone'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.addClass("task");
            this.$el.html(_.template($('.templates .task').html(), {
                name: this.model.get('name')
            }));
        },
        inputChanged: function () {
            this.model.set('name', this.$el.find('.task-name-input').val());
            this.model.save();
        },
        toggleDone: function () {
            var $taskDone = this.$el.find('.taskDone');
            $taskDone.toggleClass('selected');
            $taskDone.html(
                $taskDone.html() == " " ?
                "&#10004;" :
                " "
            );
        }
    });
    return TaskView;
});