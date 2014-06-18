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
            var createSprintView = _.bind(function (sprint, startTime, endTime) {
                var sprintModel, sprintView, taskCollection, sprintTasks;
                sprintModel =
                    (this.collection.findWhere({sprint: sprint})) ||
                    new SprintModel({
                        sprint: sprint,
                        startTime: startTime,
                        endTime: endTime
                    });
                taskCollection = new TaskCollection();
                taskCollection.fetch();
                sprintTasks = taskCollection.getTasksForSprint(sprintModel);
                if(sprintTasks.length > 0) {
                    sprintView = new SprintView({
                        model: sprintModel,
                        collection: sprintTasks
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
                        endTime = Date.parse("tomorrow").getTime();
                        break;
                    case 'tomorrow':
                        startTime = Date.parse("tomorrow").getTime();
                        endTime = Date.parse("tomorrow").addDays(1).getTime();
                        break;
                    case 'currentWeek':
                        startTime = Date.today().moveToDayOfWeek(0, -1).getTime();
                        endTime = Date.today().moveToDayOfWeek(0).getTime();
                        break;
                }
                createSprintView(sprint, startTime, endTime);
            }, this);
        },
        onAddTaskClick: function () {
            Backbone.history.navigate('/task/new', {trigger: true});
        }
    });
    return SprintListView;
});
