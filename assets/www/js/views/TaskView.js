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
            this.$el.addClass("priority-" + this.model.get('priority'));
            this.$el.html(_.template($('.templates .task').html(), {
                name: this.model.get('name')
            }));
            if(this.model.get('done')) {
                this.$el.find('.taskDone').addClass('selected');
            }
        },
        inputChanged: function () {
            this.model.set('name', this.$el.find('.task-name-input').val());
            this.model.save();
        },
        toggleDone: function () {
            var $taskDone = this.$el.find('.taskDone');
            $taskDone.toggleClass('selected');
            this.model.set('done', $taskDone.hasClass('selected'));
        }
    });
    return TaskView;
});
