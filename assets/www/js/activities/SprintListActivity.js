define([
    'views/TitleView',
    'views/SprintListView',
    'lib/i18n'
], function (
    TitleView,
    SprintListView,
    i18n
) {
    var SprintListActivity = Backbone.Activity.extend({
        sprintListView: null,
        titleView: null,
        onStart: function (routeParams) {
            this.titleView = new TitleView({
                el: _.template($('.templates template.title').html(), {
                    title: i18n.t('title.sprintlist')
                })
            });
            this.sprintListView = new SprintListView({
                el: _.template($('.templates template.sprintlist').html())
            });
        }
    });
    return SprintListActivity;
});
