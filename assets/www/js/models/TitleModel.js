define([
    'lib/i18n'
], function (
    i18n
) {
    var TitleModel = Backbone.Model.extend({
        defaults: {
            title: i18n.t('title.default')
        }
    });
    return TitleModel;
});
