define([
    'lib/i18n'
], function (
    i18n
) {
    var SprintModel = Backbone.Model.extend({
        defaults: {
            sprint: "unknown",
            startTime: 0, // when the sprint is due to begin
            endTime: 0
        },
        localStorage: new Backbone.LocalStorage('sprint'),
        initialize: function () {
            this.save();
        }
    });
    return SprintModel;
});
