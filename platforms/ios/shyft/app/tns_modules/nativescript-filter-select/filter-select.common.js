"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var grid_layout_1 = require("tns-core-modules/ui/layouts/grid-layout");
var stack_layout_1 = require("tns-core-modules/ui/layouts/stack-layout");
var flexbox_layout_1 = require("tns-core-modules/ui/layouts/flexbox-layout");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var label_1 = require("tns-core-modules/ui/label");
var button_1 = require("tns-core-modules/ui/button");
var search_bar_1 = require("tns-core-modules/ui/search-bar");
var grid_layout_2 = require("tns-core-modules/ui/layouts/grid-layout");
var list_view_1 = require("tns-core-modules/ui/list-view");
var page_1 = require("tns-core-modules/ui/page");
var frame = require("tns-core-modules/ui/frame");
var platform_1 = require("tns-core-modules/platform");
var Common = (function (_super) {
    __extends(Common, _super);
    function Common() {
        var _this = _super.call(this) || this;
        _this.searchHint = "Search for item";
        _this.autofocus = false;
        _this.xbtn = "x";
        _this._items = [];
        _this.selected = [];
        _this.disabled = false;
        _this._selected_items = _this.selected;
        _this._selected_layout = null;
        _this._primary_key = "id";
        _this._search_param = "name";
        _this._item_template = null;
        _this._filterd = new observable_array_1.ObservableArray(_this.items);
        _this._term = "";
        _this._lastTerm = null;
        _this.currentPage = null;
        _this.render = "tags";
        _this._modal_title = "Please select items";
        _this._hint = "Please select some items";
        _this.multiple = true;
        _this.allowSearch = true;
        _this.doneText = "Done";
        _this.clearText = "Clear";
        _this.selectText = "Select";
        _this.closeText = "Close";
        _this.modalPage = new page_1.Page();
        var self = _this;
        setTimeout(function () {
            self.init();
        }, 1);
        return _this;
    }
    Object.defineProperty(Common.prototype, "selected_flag", {
        get: function () {
            return this._selected_flag;
        },
        set: function (value) {
            this._selected_flag = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Common.prototype, "search_param", {
        get: function () {
            return this._search_param;
        },
        set: function (value) {
            this._search_param = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Common.prototype, "filterd", {
        get: function () {
            return this._filterd;
        },
        set: function (value) {
            this._filterd = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Common.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (value) {
            this._term = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Common.prototype, "item_template", {
        get: function () {
            return this._item_template;
        },
        set: function (value) {
            this._item_template = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Common.prototype, "gridBase", {
        get: function () {
            return this._gridBase;
        },
        set: function (value) {
            this._gridBase = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Common.prototype, "selected_layout", {
        get: function () {
            return this._selected_layout;
        },
        set: function (value) {
            this._selected_layout = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Common.prototype, "modal_title", {
        get: function () {
            return this._modal_title;
        },
        set: function (value) {
            this._modal_title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Common.prototype, "hint", {
        get: function () {
            return this._hint;
        },
        set: function (value) {
            this._hint = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Common.prototype, "selected_items", {
        get: function () {
            return this._selected_items;
        },
        set: function (value) {
            this._selected_items = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Common.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            this._items = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Common.prototype, "primary_key", {
        get: function () {
            return this._primary_key;
        },
        set: function (value) {
            this._primary_key = value;
        },
        enumerable: true,
        configurable: true
    });
    Common.prototype.isFunction = function (functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    };
    Common.prototype.renderTags = function () {
        var _this = this;
        var self = this;
        var flexboxLayout = new flexbox_layout_1.FlexboxLayout();
        flexboxLayout.flexWrap = "wrap";
        flexboxLayout.alignContent = "flex-start";
        flexboxLayout.flexGrow = 1;
        if (this.selected.length)
            this.selected.forEach(function (item) {
                var grid = new stack_layout_1.StackLayout();
                var btn = new button_1.Button();
                var textFieldBindingOptions = {
                    sourceProperty: "xbtn",
                    targetProperty: "text",
                    twoWay: true
                };
                btn.bind(textFieldBindingOptions, _this);
                btn.text = self.xbtn;
                btn.set("toDelete", item[self.primary_key]);
                var label = new label_1.Label();
                label.text = item[self.search_param];
                label.textWrap = true;
                label.className = "filter-select-tag-label";
                grid.orientation = "horizontal";
                grid.addChild(btn);
                grid.addChild(label);
                flexboxLayout.addChild(grid);
                grid.className = "filter-select-tag";
                btn.className = "fa filter-select-tag-delete";
                btn.on(button_1.Button.tapEvent, function (args) {
                    if (self.disabled == false) {
                        self.selected.forEach(function (item, index) {
                            if (item[self.primary_key] == args.object.get("toDelete"))
                                self.selected.splice(index, 1);
                        });
                        self.clearSelect();
                    }
                }, self);
            });
        else {
            var label = new label_1.Label();
            label.text = self.hint;
            flexboxLayout.addChild(label);
            label.className = "filter-select-hint";
        }
        this.selected_layout = flexboxLayout;
        return flexboxLayout;
    };
    Common.prototype.init = function () {
        var _this = this;
        var self = this;
        if (this.multiple == "false")
            this.multiple = false;
        if (this.multiple == "true")
            this.multiple = true;
        if (this.autofocus == "false")
            this.autofocus = false;
        if (this.autofocus == "true")
            this.autofocus = true;
        if (this.allowSearch == "false")
            this.allowSearch = false;
        if (this.allowSearch == "true")
            this.allowSearch = true;
        if (this.disabled == "true")
            this.disabled = true;
        if (this.disabled == "false")
            this.disabled = false;
        if (this.item_template == null)
            this.item_template = "<Label text=\"{{ " + this._search_param + " }}\" textWrap=\"true\" />";
        if (self.selected_flag)
            this.selected = this.items.filter(function (item) {
                return item[self.selected_flag];
            });
        if (this.render == "tags") {
            this.filterselect = this.renderTagsHolder();
            this.addRow(new grid_layout_2.ItemSpec(1, "auto"));
            this.addChild(this.filterselect);
            grid_layout_1.GridLayout.setRow(this.filterselect, 0);
            this.verticalAlignment = "top";
        }
        else if (this.render == "label") {
            this.multiple = false;
            this.labelselect = this.parseOptions(new label_1.Label(), {
                className: "filter-select-label fa hint",
                text: this.hint
            });
            var textFieldBindingOptions = {
                sourceProperty: "hint",
                targetProperty: "text",
                twoWay: false
            };
            this.labelselect.bind(textFieldBindingOptions, this);
            if (this.selected.length)
                this.labelDone();
            this.on(button_1.Button.tapEvent, function (arg) {
                if (self.disabled == false) {
                    _this.open();
                }
            });
            this.addChild(this.labelselect);
        }
        else if (this.render == "drop") {
            this.multiple = false;
            this.labelselect = this.parseOptions(new label_1.Label(), {
                col: "0",
                className: "filter-select-label fa hint",
                text: this.hint,
                textWrap: "true"
            });
            var textFieldBindingOptions = {
                sourceProperty: "hint",
                targetProperty: "text",
                twoWay: false
            };
            this.labelselect.bind(textFieldBindingOptions, this);
            if (this.selected.length)
                this.labelDone();
            this.on(button_1.Button.tapEvent, function (arg) {
                if (self.disabled == false) {
                    self.open();
                }
            });
            var dropholder = this.parseOptions(new grid_layout_1.GridLayout(), {
                rows: ["auto"],
                columns: ["star", "auto"],
                className: "filter-select-drop-holder"
            });
            dropholder.addChild(this.labelselect);
            var nsicon = this.parseOptions(new label_1.Label(), {
                col: "1",
                className: "fa filter-select-icon",
                text: "\uf0d7"
            });
            dropholder.addChild(nsicon);
            this.addChild(dropholder);
            dropholder.horizontalAlignment = "center";
        }
    };
    Common.prototype.open = function () {
        var self = this;
        self.currentPage = frame.topmost().currentPage;
        self.currentPage.showModal(self.modal(), "", function closeCallback() { }, true);
    };
    Common.prototype.closeModal = function () {
        if (this.isFunction(this.closeCallback))
            this.closeCallback();
    };
    Common.prototype.renderTagsHolder = function () {
        var self = this;
        var button = new button_1.Button();
        button.text = self.selectText;
        button.className = "btn btn-primary btn-filter-select";
        button.on(button_1.Button.tapEvent, function (eventData) {
            if (self.disabled == false) {
                self.open();
            }
        }, this);
        var tags = this.renderTags();
        var filterselect = new grid_layout_1.GridLayout();
        filterselect.addRow(new grid_layout_2.ItemSpec(1, "star"));
        filterselect.addColumn(new grid_layout_2.ItemSpec(1, "star"));
        filterselect.addColumn(new grid_layout_2.ItemSpec(1, "auto"));
        filterselect.addChild(button);
        filterselect.addChild(tags);
        grid_layout_1.GridLayout.setRow(tags, 0);
        grid_layout_1.GridLayout.setRow(button, 0);
        grid_layout_1.GridLayout.setColumn(tags, 0);
        grid_layout_1.GridLayout.setColumnSpan(tags, 1);
        grid_layout_1.GridLayout.setColumn(button, 1);
        tags.className = "filter-select-tags-holder";
        return filterselect;
    };
    Common.prototype.tagsDone = function () {
        var self = this;
        self.filterselect.removeChild(self.selected_layout);
        var tags = self.renderTags();
        self.filterselect.addChild(tags);
        self.filterselect.className = "filter-select-tags-base";
        grid_layout_1.GridLayout.setColumn(tags, 0);
        tags.className = "filter-select-tags-holder";
        this.notify({
            object: self,
            eventName: observable_1.Observable.propertyChangeEvent,
            propertyName: "hint",
            value: self.hint
        });
    };
    Common.prototype.labelDone = function () {
        var self = this;
        if (self.selected.length > 0) {
            this.labelselect.text = self.selected[0][this.search_param];
            this.labelselect.className = "filter-select-label fa selected";
        }
        else {
            this.labelselect.text = self.hint;
            this.notify({
                object: self,
                eventName: observable_1.Observable.propertyChangeEvent,
                propertyName: "hint",
                value: self.hint
            });
        }
    };
    Common.prototype.tagsClear = function () {
        var self = this;
        self.currentPage = frame.topmost().currentPage;
        self.filterselect.removeChild(self.selected_layout);
        var tags = self.renderTags();
        self.filterselect.addChild(tags);
        self.filterselect.className = "filter-select-tags-base";
        grid_layout_1.GridLayout.setColumn(tags, 0);
        tags.className = "filter-select-tags-holder";
    };
    Common.prototype.refresh = function () {
        if (this.render == "tags")
            this.tagsDone();
        else if (this.render == "label" || this.render == "drop")
            this.labelDone();
    };
    Common.prototype.doneSelect = function () {
        var self = this;
        self.selected = self.selected_items;
        if (this.render == "tags")
            this.tagsDone();
        else if (this.render == "label" || this.render == "drop")
            this.labelDone();
        if (self.multiple == true)
            self.notify({
                eventName: Common.changeEvent,
                object: self,
                selected: self.selected
            });
        else
            self.notify({
                eventName: Common.changeEvent,
                object: self,
                selected: self.selected[0]
            });
        self.closeModal();
        setTimeout(function () {
            if (self.searchBar)
                self.searchBar.text = "";
        }, 500);
    };
    Common.prototype.Clear = function (clear) {
        if (clear === void 0) { clear = true; }
        console.log('Clear Function');
        var self = this;
        if (clear)
            self.selected_items = [];
        if (this.multiple == false)
            if (self.render == "tags") {
                self.selected_items.splice(0, self.selected_items.length);
                self.doneSelect();
            }
            else {
                self.selected.splice(0, self.selected.length);
                self.labelselect.text = self.hint;
                self.labelselect.className = "filter-select-label fa hint";
                self.closeModal();
                self.notify({
                    eventName: Common.changeEvent,
                    object: self,
                    selected: self.selected
                });
            }
        else if (self.selected.length)
            self.doneSelect();
    };
    Common.prototype.clearSelect = function () {
        var self = this;
        this.tagsClear();
        if (self.multiple == true)
            self.notify({
                eventName: Common.changeEvent,
                object: self,
                selected: self.selected
            });
        else
            self.notify({
                eventName: Common.changeEvent,
                object: self,
                selected: self.selected[0]
            });
    };
    Common.prototype.modal = function () {
        var self = this;
        var stackLayout = new stack_layout_1.StackLayout();
        var gridLayout = new grid_layout_1.GridLayout();
        var listView = new list_view_1.ListView();
        if (Object.prototype.toString.call(this.items) == "[object Array]")
            this.filterd = new observable_array_1.ObservableArray(this.items);
        else
            this.filterd = this.items;
        var listViewBindingOptions = {
            sourceProperty: "filterd",
            targetProperty: "items",
            twoWay: false
        };
        listView.bind(listViewBindingOptions, this);
        this.selected_items = this.selected;
        listView.itemTemplate = this.item_template;
        listView.on(list_view_1.ListView.itemLoadingEvent, function (args) {
            var selected = self.selected_items.filter(function (item) {
                return (item[self.primary_key] ==
                    self.filterd.getItem(args.index)[self.primary_key]);
            });
            if (selected.length)
                args.view.className = "item filter-select-selected";
            else
                args.view.className = "item";
        });
        listView.on("itemTap", function (args) {
            if (self.multiple == false &&
                args.view.className == "item filter-select-selected")
                return 0;
            if (self.multiple == false)
                self.selected_items.splice(0, self.selected_items.length);
            if (args.view.className != "item filter-select-selected") {
                args.view.className = "item filter-select-selected";
                if (self.selected_flag)
                    args.view.bindingContext[self.selected_flag] = true;
            }
            else {
                args.view.className = "item";
                if (self.selected_flag)
                    args.view.bindingContext[self.selected_flag] = false;
            }
            var selected = self.selected_items.filter(function (item, index) {
                return (args.view.bindingContext[self.primary_key] == item[self.primary_key]);
            });
            if (!selected.length)
                self.selected_items.push(args.view.bindingContext);
            else
                self.selected_items = self.selected_items.filter(function (item, index) {
                    return (args.view.bindingContext[self.primary_key] != item[self.primary_key]);
                });
            if (self.multiple == false)
                self.doneSelect();
            listView.refresh();
            return true;
        });
        var label = new label_1.Label();
        var donebtn = new button_1.Button();
        var closebtn = new button_1.Button();
        label.text = this.modal_title;
        label.className = "action-bar-title filter-select-modal-title text-center";
        closebtn.text = self.closeText;
        closebtn.className = "action-item filter-select-modal-left text-left";
        closebtn.on("tap", function (args) {
            self.selected_items.splice(0, self.selected_items.length);
            self.closeModal();
        });
        if (this.multiple == false)
            donebtn.text = self.clearText;
        else
            donebtn.text = self.doneText;
        donebtn.className = "action-item text-right filter-select-modal-right";
        gridLayout.addRow(new grid_layout_2.ItemSpec(1, "auto"));
        gridLayout.addColumn(new grid_layout_2.ItemSpec(1, "auto"));
        gridLayout.addColumn(new grid_layout_2.ItemSpec(1, "star"));
        gridLayout.addColumn(new grid_layout_2.ItemSpec(1, "auto"));
        gridLayout.addChild(label);
        gridLayout.addChild(closebtn);
        gridLayout.addChild(donebtn);
        grid_layout_1.GridLayout.setColumn(closebtn, 0);
        grid_layout_1.GridLayout.setColumn(label, 1);
        grid_layout_1.GridLayout.setColumn(donebtn, 2);
        gridLayout.className = "action-bar p-10";
        donebtn.on("tap", function (args) {
            self.Clear(false);
        });
        stackLayout.addChild(gridLayout);
        this.searchBar = new search_bar_1.SearchBar();
        this.searchBar.id = "filter-select-search-bar";
        this.searchBar.hint = this.searchHint;
        var searchBindingOptions = {
            sourceProperty: "onSubmit",
            targetProperty: "submit",
            twoWay: true
        };
        this.searchBar.bind(searchBindingOptions, this);
        var searchBindingOptions2 = {
            sourceProperty: "term",
            targetProperty: "text",
            twoWay: true
        };
        this.searchBar.bind(searchBindingOptions2, this);
        if (this.allowSearch)
            stackLayout.addChild(this.searchBar);
        this.searchBar.className = "filter-select-search-bar";
        var hr = new stack_layout_1.StackLayout();
        hr.className = "hr-light";
        stackLayout.addChild(hr);
        listView.height = "100%";
        stackLayout.addChild(listView);
        listView.className = "filter-select-list";
        this.modalPage.content = stackLayout;
        this.modalPage.on("loaded", function (args) {
            var page = args.object;
            var myFilterSelectSearchbar = page.getViewById('filter-select-search-bar');
            if (platform_1.isAndroid && self.autofocus == false && self.allowSearch) {
                myFilterSelectSearchbar.android.clearFocus();
            }
            if (!platform_1.isAndroid && self.autofocus == true && self.allowSearch) {
                myFilterSelectSearchbar.focus();
            }
        });
        this.modalPage.on("showingModally", function (args) {
            self.selected_items = self.selected;
            self.closeCallback = args.closeCallback;
        });
        this.listnToSearch();
        return this.modalPage;
    };
    Common.prototype.onSubmit = function () {
        var _this = this;
        var self = this;
        new Promise(function (resolve, reject) {
            var result = _this.items.filter(function (item) {
                return (item[self.search_param]
                    .toLowerCase()
                    .indexOf(self.term.toLowerCase()) > -1);
            });
            resolve(new observable_array_1.ObservableArray(result));
        })
            .then(function (result) {
            _this.filterd = result;
            self.notify({
                object: self,
                eventName: observable_1.Observable.propertyChangeEvent,
                propertyName: "filterd",
                value: _this.filterd
            });
            _this.listnToSearch();
        })
            .catch(function () {
            _this.listnToSearch();
        });
    };
    Common.prototype.listnToSearch = function () {
        var _this = this;
        setTimeout(function () {
            if (_this._lastTerm != _this.term) {
                _this.onSubmit();
                _this._lastTerm = _this.term;
            }
            else {
                _this.listnToSearch();
            }
        }, 500);
    };
    Common.prototype.parseOptions = function (view, options) {
        Object.keys(options).forEach(function (key, index) {
            if (key === "rows")
                options[key].forEach(function (value, index) {
                    view.addRow(new grid_layout_2.ItemSpec(1, value));
                });
            else if (key === "columns")
                options[key].forEach(function (value, index) {
                    view.addColumn(new grid_layout_2.ItemSpec(1, value));
                });
            else {
                view[key] = options[key];
            }
        });
        return view;
    };
    return Common;
}(grid_layout_1.GridLayout));
Common.changeEvent = "change";
exports.Common = Common;
//# sourceMappingURL=filter-select.common.js.map