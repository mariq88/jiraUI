/*global define */

if (typeof Object.assign != 'function') {
    Object.assign = function (target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

define(['plugins/http', 'jquery'],
    function (http, $) {
        'use strict';

        var TIMEOUT = 30000;
        var userInfoUrl = 'account/userinfo';

        var httpServiceApiLinks = "https://jira.atlassian.com/rest/api/latest/"

        var requestsCount = 0;
        var _queryTimeout = undefined;
        var loadingMaskDelay = 200;
        var resetLoadingMaskTimer;

        var getUrl = function (url, host) {
            var requestUrl;
            if (host) {
                requestUrl = host + url;
            } else {
                requestUrl = httpServiceApiLinks + url;
            }

            return requestUrl;
        }

        return {
            post: function (url, data, host) {
                var requestUrl = getUrl(url, host);
                var req = http.post(requestUrl, data);

                return req;
            },
            get: function (url, data, host) {
                var requestUrl = getUrl(url, host);
                var req = http.get(requestUrl, data);

                return req;
            },
            put: function (url, data, host) {
                var requestUrl = getUrl(url, host);
                var req = http.put(requestUrl, data);
                return req;
            },
            remove: function (url, data, host) {
                var requestUrl = getUrl(url, host);
                var req = $.ajax({
                    type: 'DELETE',
                    url: requestUrl,
                    contentType: 'application/json',
                    dataType: 'json',
                    traditional: true,
                    data: JSON.stringify(data)
                });
                return req;
            },

            getListTable: function (startAt) {
                var url = "search?jql=issuetype%20in%20(Bug%2C%20Documentation%2C%20Enhancement)%20and%20updated%20%3E%20startOfWeek()"
                var requestUrl = getUrl(url);
                var data = { startAt: startAt }
                var req = http.get(requestUrl, data);
                return req;
            },
        };
    });
