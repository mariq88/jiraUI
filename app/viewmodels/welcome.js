define(['durandal/app', 'common/http', 'knockout'],
    function (app, http, ko) {
        'use strict';
        function getListViewTable(requestUrl, data) {

        }
        var JiraUI = function (data) {
            var self = this;

            this.select = function (data) {

            };
        };

        var JiraUIVM = function () {
            var self = this;
            self.issues = ko.observableArray([]);
            self.description = ko.observable()
            self.summary = ko.observable()
            self.key = ko.observable()
            self.keyUrl = ko.observable()
            self.issueTypeName = ko.observable()
            self.issueTypeIconUrl = ko.observable()
            self.issuePriorityName = ko.observable()
            self.issuePriorityIconUrl = ko.observable()
            self.showDetails = ko.observable(false)
            self.numberOfPages = ko.observable();
            self.totalIssueCount = ko.observable()

            self.startAt = ko.observable(0);

            self.select = function (item) {
                debugger
                self.description(item.fields.description)
                self.summary(item.fields.summary)
                self.key(item.key)

                self.issueTypeName(item.fields.issuetype.name)
                self.issueTypeIconUrl(item.fields.issuetype.iconUrl) //name & iconUrl                 //name & iconUrl

                self.issuePriorityName(item.fields.priority.name)
                self.issuePriorityIconUrl(item.fields.priority.iconUrl)

                self.showDetails(true)
                console.log(item)
            }

            self.summaryFilter = ko.observable();

        };

        JiraUIVM.prototype = {
            pagination: function (data) {
                http.getListTable(startAt).then((res) => {

                    self.issues(res.issues)
                    
                    // console.log(that.issues())
                })
            },

            activate: function () {
                var self = this;
                var maxResults = 20

                http.getListTable(self.startAt).then((res) => {
                     var show_per_page = 50;  
                     self.totalIssueCount(res.totalCount);
                     self.numberOfPages(Math.ceil(res.totalCount/maxResults))
                     debugger
    // //getting the amount of elements inside content div  
    // var numberOfIitems = $('#content').children().size();  
    // //calculate the number of pages we are going to have  
    // var number_of_pages = Math.ceil(number_of_items/show_per_page);  
  
                    self.issues(res.issues)
                    // console.log(that.issues())
                })

                http.getTotalPageCount().then((res) => {
                    debugger
                })

            },

            filterItems: function () {

                var self = this
                debugger
                var summaryArray = []
                var filter = self.summaryFilter().toLowerCase();
                var asd = ko.utils.arrayFilter(self.issues(), function (issue) {
                    return (issue.fields.summary.toLowerCase().indexOf(filter) > -1);
                });

                self.issues(asd)
            }
        };

        var jiraUIVM = new JiraUIVM();

        return jiraUIVM

    });