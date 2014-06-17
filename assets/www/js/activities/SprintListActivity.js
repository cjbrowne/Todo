define([
    'collections/SprintCollection',
    'models/TitleModel',
    'views/TitleView',
    'views/SprintListView',
    'lib/i18n'
], function (
    SprintCollection,
    TitleModel,
    TitleView,
    SprintListView,
    i18n
) {
    var SprintListActivity = Backbone.Activity.extend({
        sprintListView: null,
        titleView: null,
        onCreate: function (routeParams) {
            this.titleView = new TitleView({
                model: new TitleModel({
                    title: i18n.t('title.sprintlist')
                })
            });
            this.sprintListView = new SprintListView({
                collection: new SprintCollection()
            });
        },
        onStart: function (routeParams) {
            this.titleView.render();
            this.sprintListView.render();
            $("#app").append(this.titleView.el);
            $("#app").append(this.sprintListView.el);
        },
        onStop: function () {
            this.titleView.remove();
            this.sprintListView.remove();
        }
    });
    return SprintListActivity;
});
