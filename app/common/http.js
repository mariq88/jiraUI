define(['durandal/app', 'plugins/http', 'knockout'],
    function (app, http, ko) {
        'use strict';

        var ajaxRequester = (function () {
            var baseUrl = "https://jira.atlassian.com/rest/api/2/";

            var headers =
                {
                  "contentType" : "application/json"
                };

            function login(username, password, success, error) {
                $.ajax({
                    type: "GET",
                    headers: headers,
                    url: baseUrl + "login",
                    contentType: 'application/ajax',
                    data: { username: username, password: password },
                    success: success,
                    error: error
                })
            }

            function loadPhones(success, error) {
                $.ajax({
                    type: "GET",
                    headers: headers,
                    url: baseUrl + "classes/Phone/",
                    contentType: 'application/ajax',
                    success: success,
                    error: error
                })
            }

            function register(username, password, fullName, success, error) {
                $.ajax({
                    type: "POST",
                    headers: headers,
                    url: baseUrl + "users",
                    contentType: 'application/ajax',
                    data: JSON.stringify({ username: username, password: password, name: fullName }),
                    success: success,
                    error: error
                });
            }

            function createPhone(name, number, success, error) {
                var bookmark = { person: name, number: number };
                $.ajax({
                    type: "POST",
                    headers: headers,
                    url: baseUrl + "classes/Phone",
                    contentType: 'application/ajax',
                    data: JSON.stringify(bookmark),
                    success: success,
                    error: error
                })
            }

            function deletePhone(bookmarkId, success, error) {
                $.ajax({
                    type: "DELETE",
                    headers: headers,
                    url: baseUrl + "classes/Phone/" + bookmarkId,
                    contentType: 'application/ajax',
                    success: success,
                    error: error
                })
            }

            function editePhone(name, number, bookmarkId, success, error) {
                var bookmark = { person: name, number: number };
                $.ajax({
                    type: "PUT",
                    headers: headers,
                    url: baseUrl + "classes/Phone/" + bookmarkId,
                    contentType: 'application/ajax',
                    data: JSON.stringify(bookmark),
                    success: success,
                    error: error
                })
            }

            return {
                login: login,
                register: register,
                loadPhones: loadPhones,
                createPhone: createPhone,
                deletePhone: deletePhone,
                editePhone: editePhone
            }

            //Note: This module exports a function. That means that you, the developer, can create multiple instances.
            //This pattern is also recognized by Durandal so that it can create instances on demand.
            //If you wish to create a singleton, you should export an object instead of a function.
            //See the "flickr" module for an example of object export.


        });