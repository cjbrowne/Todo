define([
    'models/TitleModel',
    'views/TitleView',
    'lib/i18n'
], function (
    TitleModel,
    TitleView,
    i18n
) {
    var HomeActivity = Backbone.Activity.extend({
        titleView: null,
        onStart: function (routeParams) {
            this.titleView = new TitleView({
                model: new TitleModel({
                    title: i18n.t('title.home')
                })
            });
            $("#app").append(this.titleView.el);
        },
        onStop: function () {
            this.titleView.remove();
        }
    });
    return HomeActivity;
});
