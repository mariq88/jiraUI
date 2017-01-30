define(['durandal/app', 'common/http', 'knockout'],
    function (app, http, ko) {
        'use strict';
        function getListViewTable(requestUrl, data) {

        }
        var JiraUI = function (data) {
            var self = this;
            // this.issues = ko.observableArray([])


            // this.name = ko.observable(data.name)
            // this.fullName = ko.observable(data.fullName);
            // this.admNumber = ko.observable(data.admNumber);
            // this.id = ko.observable(data.id);
            // this.structuralUnitId = ko.observable(data.structuralUnitId);
            // this.parentId = ko.observable(data.parentId);
            // this.structuralUnitName = ko.observable(data.structuralUnitName);
            // this.children = data.children;
            // this.childrenA = ko.observableArray([]);


            // this.editMode = ko.observable(false);

            // this.children.forEach(function (acadStructureSubnodes) {
            //     var acadSubStruct = new AcademyStructure(acadStructureSubnodes);
            //     self.childrenA.push(acadSubStruct);
            // });

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

            self.select = function (item) {
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

            // this.deleteStructure = function (data) {
            //     // var promise = Dialog.showMessage(
            //     //     i18n.t('app:areYouSureYouWantToDelete'),
            //     //     i18n.t('app:delete'),
            //     //     [i18n.t('app:yes'), i18n.t('app:cancel')],
            //     //     true
            //     // );

            //     promise.then(function (dialogResult) {
            //         if (dialogResult === true) {
            //             var req = http.remove('noms/academyStructure/delete/' + data.id());

            //             req.done(function () {
            //                 // logger.success(i18n.t('app:deleteSuccessful'));
            //                 window.location.reload();

            //             });

            //             req.fail(function () {
            //                 // logger.error(i18n.t('app:deleteUsedUnsuccessful'));

            //             });
            //         }
            //     });
            // };
        };

        JiraUIVM.prototype = {
            select: function (data) {
                // if (data !== undefined) {
                //     this.editMode(true);
                // }
            },

            activate: function () {
                var self = this;
                var startAt = 0;
                var maxResults = 20
                http.getListTable(startAt, maxResults).then((res) => {

                        self.issues(res.issues)
                        // console.log(that.issues())
                    })
            }
        };

        var jiraUIVM = new JiraUIVM();

        return jiraUIVM

        //Note: This module exports a function. That means that you, the developer, can create multiple instances.
        //This pattern is also recognized by Durandal so that it can create instances on demand.
        //If you wish to create a singleton, you should export an object instead of a function.
        //See the "flickr" module for an example of object export.


    });