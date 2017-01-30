define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.
    function Data(data) {

    }
    
    return {
        displayName: 'Jira-UI',
        issues: ko.observableArray([]),
        description: ko.observable(),
        summary: ko.observable("asdd"),
        key: ko.observable(),
        keyUrl: ko.observable(),
        issueType: ko.observable(),
        issuePriority: ko.observable(),

        activate: function () {
            //the router's activator calls this function and waits for it to complete before proceeding
            if (this.issues().length > 0) {
                return;
            }
            var that = this;
            http.get("https://jira.atlassian.com/rest/api/latest/search?jql=issuetype%20in%20(Bug%2C%20Documentation%2C%20Enhancement)%20and%20updated%20%3E%20startOfWeek()",
                { startAt: 0, maxResults: 20 }).then((res) => {
                    that.issues(res.issues)
                    console.log(that.issues())
                })


            // return http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne',
            //     { tags: 'mount ranier', tagmode: 'any', format: 'json' },
            //     'jsoncallback').then(function (response) {
            //         that.images(response.items);
            //         response.items.url = ""
            //     });
        },
        select: function (item) {
            data(item, true)
            var self = this
            this.description = item.fields.description
            this.summary(item.fields.summary)
            debugger
            this.key = item.key
            this.issueType = item.fields.issueType //name & iconUrl
            this.issuePriority = item.fields.priority

            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            // item.viewUrl = 'views/detail';
            // app.showDialog(item);
        },

    };
});