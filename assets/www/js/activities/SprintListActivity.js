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
        onStart: function (routeParams) {
            this.titleView = new TitleView({
                model: new TitleModel({
                    title: i18n.t('title.sprintlist')
                })
            });
            this.sprintListView = new SprintListView({
                collection: new SprintCollection()
            });
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
