define(['durandal/app', 'common/http', 'knockout', 'jquery'],
    function (app, http, ko, $) {
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
            self.summaryFilter = ko.observable()
            self.startAt = ko.observable(0)
            self.unfilteredArray = ko.observable()

            self.selectIssue = function (item, showDetails) {
                self.description(item.fields.description)
                self.summary(item.fields.summary)
                self.key(item.key)
                self.issueTypeName(item.fields.issuetype.name)
                self.issueTypeIconUrl(item.fields.issuetype.iconUrl)

                if (item.fields.priority) {
                    self.issuePriorityName(item.fields.priority.name)
                    self.issuePriorityIconUrl(item.fields.priority.iconUrl)
                }
                showDetails === false ? self.showDetails(showDetails) : self.showDetails(true)
            }

            self.pagination = function (index) {
                AJS.$('.button-spinner').spin()
                var startAt = 50 * index
                http.getListTable(startAt).then((res) => {
                    AJS.$('.button-spinner').spinStop()
                    var showDetails = false
                    if (self.showDetails()) {
                        showDetails = true
                    }
                    self.selectIssue(res.issues[0], showDetails)
                    self.issues(res.issues)
                })
            }
        }

        JiraUIVM.prototype = {
            activate: function () {
                var self = this

                http.getListTable(self.startAt).then((res) => {
                    var pageCount = Math.ceil(res.total / res.maxResults)
                    self.numberOfPages(pageCount)
                    self.issues(res.issues)
                    self.unfilteredArray(res.issues)
                })
            },

            filterItems: function () {
                var self = this
                var filter = self.summaryFilter().toLowerCase()
                var temArr = [];
                if (filter) {
                    var filteredIssues = ko.utils.arrayFilter(self.unfilteredArray(), function (issue) {
                        return (issue.fields.summary.toLowerCase().indexOf(filter) > -1)
                    })
                    self.issues(filteredIssues)
                } else {
                    self.issues(self.unfilteredArray())
                }
            }
        }

        var jiraUIVM = new JiraUIVM()

        return jiraUIVM
    })

