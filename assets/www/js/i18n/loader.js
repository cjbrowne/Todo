define([
], function (
) {
    function getLanguage(language) {
        var ajaxPromise = new Promise(function (resolve, reject) {
            var langUrl = "/js/i18n/" + language + ".json";
            $.get(langUrl, function (languageResponse) {
                var result = [];
                result[0] = language;
                result[1] = languageResponse;
                resolve(result);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                reject('ajax error retrieving file ' + langUrl + ': ' + textStatus + ' server said: ' + errorThrown);
            });
        });
        return ajaxPromise;
    }
    return getLanguage;
});
