define([
], function () {
    var SprintActivity = Backbone.Activity.extend({
        onStart: function (routeParams) {
            $("#container").append(_.template($(".templates .home")));
            console.log('foo');
        }
    });
    return SprintActivity;
});
