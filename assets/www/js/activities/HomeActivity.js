define([
    'views/TitleView',
    'lib/i18n'
], function (
    TitleView,
    i18n
) {
    var HomeActivity = Backbone.Activity.extend({
        titleView: null,
        onStart: function (routeParams) {
            this.titleView = new TitleView({
                el: _.template($('.templates template.title').html(), {
                    title: i18n.t('title.default')
                })
            });
        },
        onStop: function () {
            this.titleView.remove();
        }
    });
    return HomeActivity;
});
