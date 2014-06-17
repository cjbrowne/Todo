define([
], function (
) {
    var TaskModel = Backbone.Model.extend({
        defaults: {
            tags: [],
            name: "",
            startTime: 0,
            priority: "low"
        }
    });
    return TaskModel;
});
