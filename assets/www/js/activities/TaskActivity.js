define([
], function () {
    var TaskActivity = Backbone.Activity.extend({
        onStart: function (routeParams) {
            $("#container").append(_.template($(".templates .home")));
            console.log('foo');
        }
    });
    return TaskActivity;
});
