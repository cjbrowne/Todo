requirejs.config({
    baseUrl: '/js/',
    paths: {
    },
    shim: {
        'lib/i18n': ['/js/lib/jquery-1.11.1.js']
    }
});

require([
    'activities/HomeActivity',
    'activities/SprintListActivity',
    'activities/SprintActivity',
    'activities/TaskActivity',
    'lib/i18n',
    'i18n/loader'
], function (
    HomeActivity,
    SprintListActivity,
    SprintActivity,
    TaskActivity,
    i18n,
    languageLoader
) {
    var ApplicationRouter, router;
    i18n.init({
        debug: true,
        detectLngQS: 'lang',
        fallbackLng: 'en',
        resGetPath: '/js/i18n/__lng__.json'
    }, function () {
        ApplicationRouter = Backbone.ActivityRouter.extend({
            activities: {
                "home": HomeActivity,
                "sprintlist": SprintListActivity,
                "sprint": SprintActivity,
                "task": TaskActivity
            },
            routes: {
                "": "home",
                "home": "home",
                "sprint": "sprintlist",
                "task(/new)": "task"
            }
        });
        router = new ApplicationRouter();
        Backbone.history.start({pushState: true});
        if(window) {
            window.i18n = i18n;
        }
    });
});
