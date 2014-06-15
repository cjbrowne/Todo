define([
], function (
) {
    var TaskModel = Backbone.Model.extend({
        defaults: {
            tags: [],
            name: ""
        }
    });
    return TaskModel;
});
