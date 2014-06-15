define([
    'lib/i18n'
], function (
    i18n
) {
    var TitleView = Backbone.View.extend({
        events: {
            'click': 'nextView'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            $("#app").append(this.$el);
        },
        nextView: function () {
            Backbone.history.navigate('sprint', {trigger: true});
        }
    });
    return TitleView;
});
