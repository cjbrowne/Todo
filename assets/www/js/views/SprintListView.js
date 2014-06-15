define([
    'views/SprintView',
    'models/SprintModel',
    'collections/TaskCollection',
    'lib/i18n'
], function (
    SprintView,
    SprintModel,
    TaskCollection,
    i18n
) {
    var SprintListView = Backbone.View.extend({
        sprintViews: null,
        events: {
        },
        initialize: function () {
            this.sprintViews = {};
            this.render();
        },
        render: function () {
            $("#app").append(this.$el);
            var createSprintView = _.bind(function (sprint) {
                return new SprintView({
                    el: _.template($('.templates .sprint').html(), {
                        sprintTitle: i18n.t('sprintNames.' + sprint),
                        addTask: i18n.t('task.add')
                    }),
                    model: new SprintModel({
                        sprint: sprint
                    }),
                    collection: new TaskCollection()
                });
            }, this);
            _.each([
                'unprioritised',
                'prioritised',
                'today',
                'tomorrow',
                'currentWeek'
            ], function (sprint) {
                this.sprintViews[sprint] = createSprintView(sprint);
                this.$el.append(this.sprintViews[sprint].el);
            }, this);
        }
    });
    return SprintListView;
});
