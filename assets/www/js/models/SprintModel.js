define([
    'lib/i18n'
], function (
    i18n
) {
    var SprintModel = Backbone.Model.extend({
        defaults: {
            sprint: "unknown"
        }
    });
    return SprintModel;
});
