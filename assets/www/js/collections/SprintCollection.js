define([
    'models/SprintModel'
], function (
    SprintModel
) {
    var SprintCollection = Backbone.Collection.extend({
        model: SprintModel,
        localStorage: new Backbone.LocalStorage('sprint')
    });
    return SprintCollection;
});
