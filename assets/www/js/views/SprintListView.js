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
        tagName: 'ul',
        sprintViews: null,
        events: {
            'click .addTask': 'onAddTaskClick'
        },
        initialize: function () {
            this.sprintViews = {};
            this.collection.fetch();
            this.render();
        },
        render: function () {
            var tmpl = $('.templates .sprintlist').html();
            this.$el.html(_.template(tmpl, {
                addTask: i18n.t('task.add')
            }));
            this.$el.addClass("sprintlist");
            var createSprintView = _.bind(function (sprint, startTime) {
                var sprintModel, sprintView, taskCollection;
                sprintModel =
                    (this.collection.findWhere({sprint: sprint})) ||
                    new SprintModel({
                        sprint: sprint,
                        startTime: startTime
                    });
                taskCollection = new TaskCollection();
                taskCollection.fetch();
                if(taskCollection.length > 0) {
                    sprintView = new SprintView({
                        model: sprintModel,
                        collection: taskCollection
                    });
                    this.$el.append(sprintView.el);
                    this.sprintViews[sprint] = sprintView;
                }
            }, this);
            _.each([
                'today',
                'tomorrow',
                'currentWeek'
            ], function (sprint) {
                var startTime;
                switch(sprint) {
                    case 'today':
                        startTime = Date.today().getTime();
                        break;
                    case 'tomorrow':
                        startTime = Date.parse("tomorrow").getTime();
                        break;
                    case 'currentWeek':
                        startTime = Number.POSITIVE_INFINITY;
                        break;
                }
                createSprintView(sprint, startTime);
            }, this);
        },
        onAddTaskClick: function () {
            Backbone.history.navigate('/task/new', {trigger: true});
        }
    });
    return SprintListView;
});
