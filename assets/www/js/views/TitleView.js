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
            var tmpl = $('.templates template.title').html();
            this.$el.html(_.template(tmpl, {
                title: this.model.get('title')
            }));
        },
        nextView: function () {
            Backbone.history.navigate('sprint', {trigger: true});
        }
    });
    return TitleView;
});
