define([
    'lib/i18n'
], function (
    i18n
) {
    var TaskView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'change .task-name-input': 'inputChanged'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(_.template($('.templates .task').html(), {
                name: this.model.get('name')
            }));
        },
        inputChanged: function () {
            this.model.set('name', this.$el.find('.task-name-input').val());
            this.model.save();
        }
    });
    return TaskView;
});
