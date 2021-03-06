/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojinputtext', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
        function (oj, ko, $) {

            function DashboardViewModel() {

                var root = 'https://private-1e11e-rfpcategory.apiary-mock.com/'

                var self = this;
                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */

                var uri = 'departments';

                // Create empty array for the results...
                self.data = ko.observableArray([]);

                console.log("Before fetch...");

                self.fetch = function () {

                    // Get departments...
                    var url = root + uri;
                    console.log("URL = " + url);

                    $.getJSON(url).then(function (records) {
                        var tempArray = [];
                        records.forEach(function (value) {
                            console.log(value.valueOf());

                            // Fill data ko.observableArray with results					
                            tempArray.push({
                                code: value.id,
                                department: value.DepartmentDesc
                            });
                        });
                        self.data(tempArray);
                        $('#table').ojTable('refresh');
                    });
                };

                self.changeHandler = function (event, data) {
                    if (data.option === "value") {
                        console.log(data.value);
                        self.fetch();
                    }
                };

                self.departments = new oj.ArrayTableDataSource(self.data, {idAttribute: 'code'});

                self.handleActivated = function (info) {
                    // Implement if needed
                };

                // cell renderer function
                // Directly append HTML to the cell passed in
                // via context.parentElement
                self.cell_wrap = function (context)
                {
                    console.log("Entered cell_wrap...");
                    var tdDiv = $(document.createElement('div'));
                    //tdDiv.attr('style', 'word-break');
                    tdDiv.text(context.row.department);
                    $(context.cellContext.parentElement).append(tdDiv);
                    $(context.cellContext.parentElement).addClass('wordwrap');
                };

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    // Implement if needed
                    self.fetch();
                };


                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };

                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new DashboardViewModel();
        }
);
