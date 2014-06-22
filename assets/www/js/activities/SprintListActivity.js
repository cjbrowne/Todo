define([
    'collections/SprintCollection',
    'views/SprintListView',
    'lib/i18n'
], function (
    SprintCollection,
    SprintListView,
    i18n
) {
    var SprintListActivity = Backbone.Activity.extend({
        sprintListView: null,
        onCreate: function (routeParams) {
            this.sprintListView = new SprintListView({
                collection: new SprintCollection()
            });
        },
        onStart: function (routeParams) {
            this.sprintListView.render();
            $("#app").append(this.sprintListView.el);
        },
        onStop: function () {
            this.sprintListView.remove();
        }
    });
    return SprintListActivity;
});
