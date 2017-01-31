define(['durandal/app', 'common/http', 'knockout'],
    function (app, http, ko) {
        'use strict'

        var JiraUIVM = function () {
            var self = this
            self.issues = ko.observableArray([])
            self.description = ko.observable()
            self.summary = ko.observable()
            self.key = ko.observable()
            self.keyUrl = ko.observable()
            self.issueTypeName = ko.observable()
            self.issueTypeIconUrl = ko.observable()
            self.issuePriorityName = ko.observable()
            self.issuePriorityIconUrl = ko.observable()
            self.showDetails = ko.observable(false)
            self.numberOfPages = ko.observable([])
            self.totalIssueCount = ko.observable()
            self.summaryFilter = ko.observable()
            self.startAt = ko.observable(0)

            self.select = function (item) {
                self.description(item.fields.description)
                self.summary(item.fields.summary)
                self.key(item.key)

                self.issueTypeName(item.fields.issuetype.name)
                self.issueTypeIconUrl(item.fields.issuetype.iconUrl) //name & iconUrl                 //name & iconUrl

                self.issuePriorityName(item.fields.priority.name)
                self.issuePriorityIconUrl(item.fields.priority.iconUrl)

                self.showDetails(true)
            }

            self.pagination = function (index) {
                var startAt = 50 * index
                http.getListTable(startAt).then((res) => {
                    self.issues(res.issues)
                })
            }

        }

        JiraUIVM.prototype = {
            activate: function () {
                var self = this
                var maxResults = 20

                http.getListTable(self.startAt).then((res) => {
                    var show_per_page = 50
                    self.totalIssueCount(res.totalCount)
                    var asdf = Math.ceil(res.total / res.maxResults)
                    self.numberOfPages(asdf)
                    self.issues(res.issues)
                })
            },

            filterItems: function () {
                var self = this
                var filter = self.summaryFilter().toLowerCase()
                var asd = ko.utils.arrayFilter(self.issues(), function (issue) {
                    return (issue.fields.summary.toLowerCase().indexOf(filter) > -1)
                })

                self.issues(asd)
            }
        }

        var jiraUIVM = new JiraUIVM()

        return jiraUIVM
    })