webpackJsonp([14],{

/***/ 164:
/*!********************************************************!*\
  !*** ../node_modules/nativescript-angular/renderer.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var view_1 = __webpack_require__(/*! tns-core-modules/ui/core/view */ 0);
var application_1 = __webpack_require__(/*! tns-core-modules/application */ 5);
var frame_1 = __webpack_require__(/*! tns-core-modules/ui/frame */ 9);
var profiling_1 = __webpack_require__(/*! tns-core-modules/profiling */ 2);
var platform_providers_1 = __webpack_require__(/*! ./platform-providers */ 26);
var view_util_1 = __webpack_require__(/*! ./view-util */ 76);
var element_registry_1 = __webpack_require__(/*! ./element-registry */ 29);
var trace_1 = __webpack_require__(/*! ./trace */ 11);
// CONTENT_ATTR not exported from NativeScript_renderer - we need it for styles application.
var COMPONENT_REGEX = /%COMP%/g;
exports.COMPONENT_VARIABLE = "%COMP%";
exports.HOST_ATTR = "_nghost-" + exports.COMPONENT_VARIABLE;
exports.CONTENT_ATTR = "_ngcontent-" + exports.COMPONENT_VARIABLE;
var ATTR_SANITIZER = /-/g;
var NativeScriptRendererFactory = (function () {
    function NativeScriptRendererFactory(rootView, device, zone) {
        this.zone = zone;
        this.componentRenderers = new Map();
        this.viewUtil = new view_util_1.ViewUtil(device);
        this.setRootNgView(rootView);
        this.defaultRenderer = new NativeScriptRenderer(this.rootNgView, zone, this.viewUtil);
    }
    NativeScriptRendererFactory.prototype.setRootNgView = function (rootView) {
        if (!rootView) {
            rootView = platform_providers_1.getRootPage() || frame_1.topmost().currentPage;
        }
        rootView.nodeName = "NONE";
        this.rootNgView = rootView;
    };
    NativeScriptRendererFactory.prototype.createRenderer = function (element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        var renderer = this.componentRenderers.get(type.id);
        if (renderer) {
            return renderer;
        }
        if (type.encapsulation === core_1.ViewEncapsulation.None) {
            type.styles.map(function (s) { return s.toString(); }).forEach(addStyleToCss);
            renderer = this.defaultRenderer;
        }
        else {
            renderer = new EmulatedRenderer(type, this.rootNgView, this.zone, this.viewUtil);
            renderer.applyToHost(element);
        }
        this.componentRenderers.set(type.id, renderer);
        return renderer;
    };
    NativeScriptRendererFactory.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NativeScriptRendererFactory.ctorParameters = function () { return [
        { type: view_1.View, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [platform_providers_1.APP_ROOT_VIEW,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [platform_providers_1.DEVICE,] },] },
        { type: core_1.NgZone, },
    ]; };
    return NativeScriptRendererFactory;
}());
exports.NativeScriptRendererFactory = NativeScriptRendererFactory;
var NativeScriptRenderer = (function (_super) {
    __extends(NativeScriptRenderer, _super);
    function NativeScriptRenderer(rootView, zone, viewUtil) {
        var _this = _super.call(this) || this;
        _this.rootView = rootView;
        _this.zone = zone;
        _this.viewUtil = viewUtil;
        _this.data = Object.create(null);
        trace_1.rendererLog("NativeScriptRenderer created");
        return _this;
    }
    NativeScriptRenderer.prototype.appendChild = function (parent, newChild) {
        trace_1.rendererLog("NativeScriptRenderer.appendChild child: " + newChild + " parent: " + parent);
        this.viewUtil.insertChild(parent, newChild);
    };
    NativeScriptRenderer.prototype.insertBefore = function (parent, newChild, _a) {
        var previous = _a.previous, next = _a.next;
        trace_1.rendererLog("NativeScriptRenderer.insertBefore child: " + newChild + " " +
            ("parent: " + parent + " previous: " + previous + " next: " + next));
        this.viewUtil.insertChild(parent, newChild, previous, next);
    };
    NativeScriptRenderer.prototype.removeChild = function (parent, oldChild) {
        trace_1.rendererLog("NativeScriptRenderer.removeChild child: " + oldChild + " parent: " + parent);
        this.viewUtil.removeChild(parent, oldChild);
    };
    NativeScriptRenderer.prototype.selectRootElement = function (selector) {
        trace_1.rendererLog("NativeScriptRenderer.selectRootElement: " + selector);
        return this.rootView;
    };
    NativeScriptRenderer.prototype.parentNode = function (node) {
        trace_1.rendererLog("NativeScriptRenderer.parentNode for node: " + node);
        return node.parentNode;
    };
    NativeScriptRenderer.prototype.nextSibling = function (node) {
        trace_1.rendererLog("NativeScriptRenderer.nextSibling of " + node + " is " + node.nextSibling);
        return {
            previous: node,
            next: node.nextSibling,
        };
    };
    NativeScriptRenderer.prototype.createComment = function (_value) {
        trace_1.rendererLog("NativeScriptRenderer.createComment " + _value);
        return this.viewUtil.createComment();
    };
    NativeScriptRenderer.prototype.createElement = function (name, _namespace) {
        trace_1.rendererLog("NativeScriptRenderer.createElement: " + name);
        return this.viewUtil.createView(name);
    };
    NativeScriptRenderer.prototype.createText = function (_value) {
        trace_1.rendererLog("NativeScriptRenderer.createText " + _value);
        return this.viewUtil.createText();
    };
    NativeScriptRenderer.prototype.createViewRoot = function (hostElement) {
        trace_1.rendererLog("NativeScriptRenderer.createViewRoot " + hostElement.nodeName);
        return hostElement;
    };
    NativeScriptRenderer.prototype.projectNodes = function (parentElement, nodes) {
        var _this = this;
        trace_1.rendererLog("NativeScriptRenderer.projectNodes");
        nodes.forEach(function (node) { return _this.viewUtil.insertChild(parentElement, node); });
    };
    NativeScriptRenderer.prototype.destroy = function () {
        trace_1.rendererLog("NativeScriptRenderer.destroy");
        // Seems to be called on component dispose only (router outlet)
        // TODO: handle this when we resolve routing and navigation.
    };
    NativeScriptRenderer.prototype.setAttribute = function (view, name, value, namespace) {
        trace_1.rendererLog("NativeScriptRenderer.setAttribute " + view + " : " + name + " = " + value + ", namespace: " + namespace);
        return this.viewUtil.setProperty(view, name, value, namespace);
    };
    NativeScriptRenderer.prototype.removeAttribute = function (_el, _name) {
        trace_1.rendererLog("NativeScriptRenderer.removeAttribute " + _el + ": " + _name);
    };
    NativeScriptRenderer.prototype.setProperty = function (view, name, value) {
        trace_1.rendererLog("NativeScriptRenderer.setProperty " + view + " : " + name + " = " + value);
        return this.viewUtil.setProperty(view, name, value);
    };
    NativeScriptRenderer.prototype.addClass = function (view, name) {
        trace_1.rendererLog("NativeScriptRenderer.addClass " + name);
        this.viewUtil.addClass(view, name);
    };
    NativeScriptRenderer.prototype.removeClass = function (view, name) {
        trace_1.rendererLog("NativeScriptRenderer.removeClass " + name);
        this.viewUtil.removeClass(view, name);
    };
    NativeScriptRenderer.prototype.setStyle = function (view, styleName, value, _flags) {
        trace_1.rendererLog("NativeScriptRenderer.setStyle: " + styleName + " = " + value);
        this.viewUtil.setStyle(view, styleName, value);
    };
    NativeScriptRenderer.prototype.removeStyle = function (view, styleName, _flags) {
        trace_1.rendererLog("NativeScriptRenderer.removeStyle: ${styleName}");
        this.viewUtil.removeStyle(view, styleName);
    };
    // Used only in debug mode to serialize property changes to comment nodes,
    // such as <template> placeholders.
    // Used only in debug mode to serialize property changes to comment nodes,
    // such as <template> placeholders.
    NativeScriptRenderer.prototype.setBindingDebugInfo = 
    // Used only in debug mode to serialize property changes to comment nodes,
    // such as <template> placeholders.
    function (renderElement, propertyName, propertyValue) {
        trace_1.rendererLog("NativeScriptRenderer.setBindingDebugInfo: " + renderElement + ", " +
            propertyName + " = " + propertyValue);
    };
    NativeScriptRenderer.prototype.setElementDebugInfo = function (renderElement, _info /*RenderDebugInfo*/) {
        trace_1.rendererLog("NativeScriptRenderer.setElementDebugInfo: " + renderElement);
    };
    NativeScriptRenderer.prototype.invokeElementMethod = function (_renderElement, methodName, args) {
        trace_1.rendererLog("NativeScriptRenderer.invokeElementMethod " + methodName + " " + args);
    };
    NativeScriptRenderer.prototype.setValue = function (_renderNode, _value) {
        trace_1.rendererLog("NativeScriptRenderer.setValue " +
            ("renderNode: " + _renderNode + ", value: " + _value));
    };
    NativeScriptRenderer.prototype.listen = function (renderElement, eventName, callback) {
        var _this = this;
        trace_1.rendererLog("NativeScriptRenderer.listen: " + eventName);
        // Explicitly wrap in zone
        var zonedCallback = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.zone.run(function () {
                callback.apply(undefined, args);
            });
        };
        renderElement.on(eventName, zonedCallback);
        if (eventName === view_1.View.loadedEvent && renderElement.isLoaded) {
            var notifyData = { eventName: view_1.View.loadedEvent, object: renderElement };
            zonedCallback(notifyData);
        }
        return function () { return renderElement.off(eventName, zonedCallback); };
    };
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "appendChild", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "insertBefore", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "removeChild", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Object)
    ], NativeScriptRenderer.prototype, "selectRootElement", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], NativeScriptRenderer.prototype, "parentNode", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], NativeScriptRenderer.prototype, "nextSibling", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", element_registry_1.InvisibleNode)
    ], NativeScriptRenderer.prototype, "createComment", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", Object)
    ], NativeScriptRenderer.prototype, "createElement", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", element_registry_1.InvisibleNode)
    ], NativeScriptRenderer.prototype, "createText", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], NativeScriptRenderer.prototype, "createViewRoot", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Array]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "projectNodes", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "destroy", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, String, String]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "setAttribute", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "removeAttribute", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Object]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "setProperty", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "addClass", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "removeClass", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Object, Number]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "setStyle", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Number]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "removeStyle", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, String]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "setBindingDebugInfo", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "setElementDebugInfo", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Array]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "invokeElementMethod", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", void 0)
    ], NativeScriptRenderer.prototype, "setValue", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Function]),
        __metadata("design:returntype", Function)
    ], NativeScriptRenderer.prototype, "listen", null);
    return NativeScriptRenderer;
}(core_1.Renderer2));
exports.NativeScriptRenderer = NativeScriptRenderer;
var EmulatedRenderer = (function (_super) {
    __extends(EmulatedRenderer, _super);
    function EmulatedRenderer(component, rootView, zone, viewUtil) {
        var _this = _super.call(this, rootView, zone, viewUtil) || this;
        var componentId = component.id.replace(ATTR_SANITIZER, "_");
        _this.contentAttr = replaceNgAttribute(exports.CONTENT_ATTR, componentId);
        _this.hostAttr = replaceNgAttribute(exports.HOST_ATTR, componentId);
        _this.addStyles(component.styles, componentId);
        return _this;
    }
    EmulatedRenderer.prototype.applyToHost = function (view) {
        _super.prototype.setAttribute.call(this, view, this.hostAttr, "");
    };
    EmulatedRenderer.prototype.appendChild = function (parent, newChild) {
        _super.prototype.appendChild.call(this, parent, newChild);
    };
    EmulatedRenderer.prototype.createElement = function (parent, name) {
        var view = _super.prototype.createElement.call(this, parent, name);
        // Set an attribute to the view to scope component-specific css.
        // The property name is pre-generated by Angular.
        _super.prototype.setAttribute.call(this, view, this.contentAttr, "");
        return view;
    };
    EmulatedRenderer.prototype.addStyles = function (styles, componentId) {
        styles.map(function (s) { return s.toString(); })
            .map(function (s) { return replaceNgAttribute(s, componentId); })
            .forEach(addStyleToCss);
    };
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, String]),
        __metadata("design:returntype", void 0)
    ], EmulatedRenderer.prototype, "addStyles", null);
    return EmulatedRenderer;
}(NativeScriptRenderer));
var ɵ0 = function addStyleToCss(style) {
    application_1.addCss(style);
};
exports.ɵ0 = ɵ0;
// tslint:disable-next-line
var addStyleToCss = profiling_1.profile('"renderer".addStyleToCss', ɵ0);
function replaceNgAttribute(input, componentId) {
    return input.replace(COMPONENT_REGEX, componentId);
}
//# sourceMappingURL=renderer.js.map

/***/ }),

/***/ 165:
/*!*******************************************************************!*\
  !*** ../node_modules/nativescript-angular/nativescript.module.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! tns-core-modules/globals */ 35);
// Require application early to work around a circular import
__webpack_require__(/*! tns-core-modules/application */ 5);
__webpack_require__(/*! ./zone-js/dist/zone-nativescript */ 78);
__webpack_require__(/*! reflect-metadata */ 51);
__webpack_require__(/*! ./polyfills/array */ 79);
__webpack_require__(/*! ./polyfills/console */ 80);
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var common_1 = __webpack_require__(/*! ./common */ 77);
var renderer_1 = __webpack_require__(/*! ./renderer */ 164);
var detached_loader_1 = __webpack_require__(/*! ./common/detached-loader */ 50);
function errorHandlerFactory() {
    return new core_1.ErrorHandler();
}
exports.errorHandlerFactory = errorHandlerFactory;
var NativeScriptModule = (function () {
    function NativeScriptModule() {
    }
    NativeScriptModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        detached_loader_1.DetachedLoader,
                    ],
                    providers: [
                        renderer_1.NativeScriptRendererFactory,
                        core_1.SystemJsNgModuleLoader,
                        { provide: core_1.ErrorHandler, useFactory: errorHandlerFactory },
                        { provide: core_1.RendererFactory2, useExisting: renderer_1.NativeScriptRendererFactory },
                    ],
                    entryComponents: [
                        detached_loader_1.DetachedLoader,
                    ],
                    imports: [
                        core_1.ApplicationModule,
                        common_1.NativeScriptCommonModule,
                    ],
                    exports: [
                        core_1.ApplicationModule,
                        common_1.NativeScriptCommonModule,
                        detached_loader_1.DetachedLoader,
                    ],
                    schemas: [core_1.NO_ERRORS_SCHEMA]
                },] },
    ];
    /** @nocollapse */
    NativeScriptModule.ctorParameters = function () { return []; };
    return NativeScriptModule;
}());
exports.NativeScriptModule = NativeScriptModule;
//# sourceMappingURL=nativescript.module.js.map

/***/ }),

/***/ 309:
/*!*****************************!*\
  !*** ./home/home.module.ts ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var nativescript_module_1 = __webpack_require__(/*! nativescript-angular/nativescript.module */ 165);
var home_routing_module_1 = __webpack_require__(/*! ./home-routing.module */ 544);
var home_component_1 = __webpack_require__(/*! ./home.component */ 487);
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                home_routing_module_1.HomeRoutingModule
            ],
            declarations: [
                home_component_1.HomeComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;


/***/ }),

/***/ 326:
/*!**************************************************************!*\
  !*** ../node_modules/tns-core-modules/utils/module-merge.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = function (sourceExports, destExports) {
    for (var key in sourceExports) {
        destExports[key] = sourceExports[key];
    }
};
//# sourceMappingURL=module-merge.js.map

/***/ }),

/***/ 452:
/*!********************************************************************!*\
  !*** ../node_modules/nativescript-pro-ui/sidedrawer/sidedrawer.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var commonModule = __webpack_require__(/*! ./sidedrawer-common */ 468);
var utils = __webpack_require__(/*! tns-core-modules/utils/utils */ 10);
var style_properties_1 = __webpack_require__(/*! tns-core-modules/ui/styling/style-properties */ 15);
var platform = __webpack_require__(/*! tns-core-modules/platform */ 7);
var grid_layout_1 = __webpack_require__(/*! tns-core-modules/ui/layouts/grid-layout */ 86);
__webpack_require__(/*! utils/module-merge */ 326).merge(commonModule, exports);
var RadSideDrawer = (function (_super) {
    __extends(RadSideDrawer, _super);
    function RadSideDrawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._androidViewId = -1;
        return _this;
    }
    Object.defineProperty(RadSideDrawer.prototype, "_nativeView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawer.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        var page = this.page;
        var drawer = this._android;
        var grid = page.nativeView;
        if (this.getSdkVersion() < 21) {
            if (grid) {
                grid.bringChildToFront(this._android);
            }
        }
        if (drawer && this.showOverNavigation) {
            var parent_1 = drawer.getParent();
            var owner_1 = new WeakRef(this);
            this.layoutChangeFunction = new android.view.View.OnLayoutChangeListener({
                onLayoutChange: function (v, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom) {
                    var grid = v.getParent();
                    if (grid.getChildCount() > 1) {
                        var margin = style_properties_1.PercentLength.toDevicePixels(page.actionBar.marginTop) + style_properties_1.PercentLength.toDevicePixels(page.actionBar.marginBottom);
                        var height = v.getBottom() - v.getTop() + margin;
                        var sideDrawer = owner_1.get();
                        if (!sideDrawer) {
                            return;
                        }
                        var mainContent = sideDrawer.mainContent;
                        if (!mainContent || !mainContent.nativeView) {
                            return;
                        }
                        sideDrawer._mainContentNativeView = mainContent.nativeView;
                        if (sideDrawer._actionBarHeight !== height) {
                            sideDrawer._actionBarHeight = height;
                            var lp = sideDrawer._mainContentNativeView.getLayoutParams();
                            lp.topMargin = height;
                            sideDrawer._mainContentNativeView.setLayoutParams(lp);
                        }
                    }
                }
            });
            page.actionBar.nativeView.addOnLayoutChangeListener(this.layoutChangeFunction);
            grid_layout_1.GridLayout.setRow(this, 0);
            grid_layout_1.GridLayout.setRowSpan(this, 2);
        }
    };
    RadSideDrawer.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
        this._actionBarHeight = undefined;
        if (this._mainContentNativeView) {
            var lp = this._mainContentNativeView.getLayoutParams();
            lp.topMargin = 0;
            this._mainContentNativeView.setLayoutParams(lp);
        }
        if (this.page) {
            this.page.actionBar.nativeView.removeOnLayoutChangeListener(this.layoutChangeFunction);
        }
    };
    RadSideDrawer.prototype._addViewToNativeVisualTree = function (child) {
        if (this._android && child.android) {
            if (this.mainContent === child) {
                this._android.setMainContent(child.android);
                return true;
            }
            if (this.drawerContent === child) {
                this._android.setDrawerContent(child.android);
                return true;
            }
        }
        return false;
    };
    RadSideDrawer.prototype._removeViewFromNativeVisualTree = function (child) {
        if (this._android && child.android) {
            //TODO: Remove listener
            if (this.mainContent === child) {
                this._android.setMainContent(null);
                child._isAddedToNativeVisualTree = false;
            }
            if (this.drawerContent === child) {
                this._android.setDrawerContent(null);
                child._isAddedToNativeVisualTree = false;
            }
        }
    };
    RadSideDrawer.prototype.initDrawer = function () {
        this._android = new com.telerik.android.primitives.widget.sidedrawer.RadSideDrawer(this._context);
        if (this.getSdkVersion() >= 21 && this.showOverNavigation) {
            this._android.setZ(1100);
        }
        var that = new WeakRef(this);
        this._android.addChangeListener(new com.telerik.android.primitives.widget.sidedrawer.DrawerChangeListener({
            onDrawerOpening: function (drawer) {
                if (that.get().hasListeners(commonModule.RadSideDrawer.drawerOpeningEvent)) {
                    var args = {
                        eventName: commonModule.RadSideDrawer.drawerOpeningEvent,
                        object: that.get(),
                        returnValue: false
                    };
                    that.get().notify(args);
                    if (args.returnValue) {
                        return args.returnValue;
                    }
                }
                return false;
            },
            onDrawerOpened: function (drawer) {
                if (that.get().hasListeners(commonModule.RadSideDrawer.drawerOpenedEvent)) {
                    var args = {
                        eventName: commonModule.RadSideDrawer.drawerOpenedEvent,
                        object: that.get()
                    };
                    that.get().notify(args);
                }
            },
            onDrawerClosing: function (drawer) {
                if (that.get().hasListeners(commonModule.RadSideDrawer.drawerClosingEvent)) {
                    var args = {
                        eventName: commonModule.RadSideDrawer.drawerClosingEvent,
                        object: that.get(),
                        returnValue: false
                    };
                    that.get().notify(args);
                    if (args.returnValue) {
                        return args.returnValue;
                    }
                }
                return false;
            },
            onDrawerClosed: function (drawer) {
                if (that.get().hasListeners(commonModule.RadSideDrawer.drawerClosedEvent)) {
                    var args = {
                        eventName: commonModule.RadSideDrawer.drawerClosedEvent,
                        object: that.get()
                    };
                    that.get().notify(args);
                }
            },
            onDrawerPan: function (drawer) {
                if (that.get().hasListeners(commonModule.RadSideDrawer.drawerPanEvent)) {
                    var args = {
                        eventName: commonModule.RadSideDrawer.drawerPanEvent,
                        object: that.get()
                    };
                    that.get().notify(args);
                }
            }
        }));
    };
    RadSideDrawer.prototype.getSdkVersion = function () {
        return parseInt(platform.device.sdkVersion);
    };
    RadSideDrawer.prototype.createNativeView = function () {
        this.page.on("navigatingFrom", this.onNavigatingFrom, this);
        this.initDrawer();
        this._android.setDrawerSize(utils.layout.getDisplayDensity() * this.drawerContentSize);
        this._android.setIsLocked(!this.gesturesEnabled);
        if (this.drawerTransition) {
            this._android.setDrawerTransition(this.drawerTransition.getNativeContent());
        }
        if (this.drawerLocation) {
            this.setDrawerLocation(this.drawerLocation);
        }
        return this._android;
    };
    RadSideDrawer.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._nativeView.setId(this._androidViewId);
    };
    RadSideDrawer.prototype.disposeNativeView = function () {
        this.page.off("navigatingFrom", this.onNavigatingFrom, this);
    };
    RadSideDrawer.prototype.onNavigatingFrom = function (args) {
        if (this.getIsOpen()) {
            this.closeDrawer();
        }
    };
    Object.defineProperty(RadSideDrawer.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawer.prototype._onGesturesEnabledChanged = function (oldValue, newValue) {
        var value = newValue;
        if (!this.android) {
            return;
        }
        this.android.setIsLocked(!value);
    };
    RadSideDrawer.prototype._onDrawerContentSizeChanged = function (oldValue, newValue) {
        if (!this.android) {
            return;
        }
        if (newValue) {
            this.android.setDrawerSize(utils.layout.getDisplayDensity() * newValue);
        }
    };
    RadSideDrawer.prototype._onDrawerTransitionChanged = function (oldValue, newValue) {
        if (!newValue) {
            return;
        }
        var finalVal;
        if (typeof newValue == "string") {
            switch (newValue.toLowerCase()) {
                case commonModule.FadeTransitionString: {
                    finalVal = new FadeTransition();
                    break;
                }
                case commonModule.PushTransitionString: {
                    finalVal = new PushTransition();
                    break;
                }
                case commonModule.RevealTransitionString: {
                    finalVal = new RevealTransition();
                    break;
                }
                case commonModule.ReverseSlideOutTransitionString: {
                    finalVal = new ReverseSlideOutTransition();
                    break;
                }
                case commonModule.ScaleDownPusherTransitionString: {
                    finalVal = new ScaleDownPusherTransition();
                    break;
                }
                case commonModule.ScaleUpTransitionString: {
                    finalVal = new ScaleUpTransition();
                    break;
                }
                case commonModule.SlideAlongTransitionString: {
                    finalVal = new SlideAlongTransition();
                    break;
                }
                case commonModule.SlideInOnTopTransitionString: {
                    finalVal = new SlideInOnTopTransition();
                    break;
                }
                default: {
                    console.log("Error: Not supported value (" + newValue + ") set to 'drawerTransition'");
                    finalVal = new SlideInOnTopTransition();
                    break;
                }
            }
            if (this.drawerTransition !== finalVal) {
                this.drawerTransition = finalVal;
                return;
            }
        }
        else {
            finalVal = newValue;
        }
        if (this.android) {
            this.android.setDrawerTransition(finalVal.getNativeContent());
        }
    };
    RadSideDrawer.prototype._onDrawerLocationChanged = function (oldValue, newValue) {
        _super.prototype._onDrawerLocationChanged.call(this, oldValue, newValue);
        if (!this.android) {
            return;
        }
        if (!newValue) {
            return;
        }
        this.setDrawerLocation(newValue);
    };
    RadSideDrawer.prototype.setDrawerLocation = function (newLocation) {
        var newLocationToLower = newLocation.toLocaleLowerCase();
        switch (newLocationToLower) {
            case commonModule.SideDrawerLocation.Left.toLocaleLowerCase():
                this.android.setDrawerLocation(com.telerik.android.primitives.widget.sidedrawer.DrawerLocation.LEFT);
                break;
            case commonModule.SideDrawerLocation.Right.toLocaleLowerCase():
                this.android.setDrawerLocation(com.telerik.android.primitives.widget.sidedrawer.DrawerLocation.RIGHT);
                break;
            case commonModule.SideDrawerLocation.Top.toLocaleLowerCase():
                this.android.setDrawerLocation(com.telerik.android.primitives.widget.sidedrawer.DrawerLocation.TOP);
                break;
            case commonModule.SideDrawerLocation.Bottom.toLocaleLowerCase():
                this.android.setDrawerLocation(com.telerik.android.primitives.widget.sidedrawer.DrawerLocation.BOTTOM);
                break;
        }
    };
    RadSideDrawer.prototype.closeDrawer = function () {
        if (this.android) {
            this.android.setIsOpen(false);
            _super.prototype.closeDrawer.call(this);
        }
    };
    RadSideDrawer.prototype.showDrawer = function () {
        if (this._android) {
            this._android.setIsOpen(true);
            _super.prototype.showDrawer.call(this);
        }
    };
    return RadSideDrawer;
}(commonModule.RadSideDrawer));
exports.RadSideDrawer = RadSideDrawer;
var DrawerTransitionBase = (function () {
    function DrawerTransitionBase() {
    }
    DrawerTransitionBase.prototype.getNativeContent = function () {
        return undefined;
    };
    return DrawerTransitionBase;
}());
exports.DrawerTransitionBase = DrawerTransitionBase;
var FadeTransition = (function (_super) {
    __extends(FadeTransition, _super);
    function FadeTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FadeTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.FadeTransition();
    };
    return FadeTransition;
}(DrawerTransitionBase));
exports.FadeTransition = FadeTransition;
var PushTransition = (function (_super) {
    __extends(PushTransition, _super);
    function PushTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.PushTransition();
    };
    return PushTransition;
}(DrawerTransitionBase));
exports.PushTransition = PushTransition;
var RevealTransition = (function (_super) {
    __extends(RevealTransition, _super);
    function RevealTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RevealTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.RevealTransition();
    };
    return RevealTransition;
}(DrawerTransitionBase));
exports.RevealTransition = RevealTransition;
var ReverseSlideOutTransition = (function (_super) {
    __extends(ReverseSlideOutTransition, _super);
    function ReverseSlideOutTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReverseSlideOutTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.ReverseSlideOutTransition();
    };
    return ReverseSlideOutTransition;
}(DrawerTransitionBase));
exports.ReverseSlideOutTransition = ReverseSlideOutTransition;
var ScaleDownPusherTransition = (function (_super) {
    __extends(ScaleDownPusherTransition, _super);
    function ScaleDownPusherTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScaleDownPusherTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.ScaleDownPusherTransition();
    };
    return ScaleDownPusherTransition;
}(DrawerTransitionBase));
exports.ScaleDownPusherTransition = ScaleDownPusherTransition;
var ScaleUpTransition = (function (_super) {
    __extends(ScaleUpTransition, _super);
    function ScaleUpTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScaleUpTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.ScaleUpTransition();
    };
    return ScaleUpTransition;
}(DrawerTransitionBase));
exports.ScaleUpTransition = ScaleUpTransition;
var SlideAlongTransition = (function (_super) {
    __extends(SlideAlongTransition, _super);
    function SlideAlongTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlideAlongTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.SlideAlongTransition();
    };
    return SlideAlongTransition;
}(DrawerTransitionBase));
exports.SlideAlongTransition = SlideAlongTransition;
var SlideInOnTopTransition = (function (_super) {
    __extends(SlideInOnTopTransition, _super);
    function SlideInOnTopTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlideInOnTopTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.SlideInOnTopTransition();
    };
    return SlideInOnTopTransition;
}(DrawerTransitionBase));
exports.SlideInOnTopTransition = SlideInOnTopTransition;


/***/ }),

/***/ 466:
/*!***********************************************************************!*\
  !*** ../node_modules/nativescript-pro-ui/sidedrawer/angular/index.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./side-drawer-directives */ 467));


/***/ }),

/***/ 467:
/*!****************************************************************************************!*\
  !*** ../node_modules/nativescript-pro-ui/sidedrawer/angular/side-drawer-directives.js ***!
  \****************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var __1 = __webpack_require__(/*! ./.. */ 452);
var page_1 = __webpack_require__(/*! tns-core-modules/ui/page */ 20);
var element_registry_1 = __webpack_require__(/*! nativescript-angular/element-registry */ 29);
var sideDrawerModule = __webpack_require__(/*! ./.. */ 452);
var TKDRAWERCONTENT = "TKDrawerContent";
var TKMAINCONTENT = "TKMainContent";
var RadSideDrawerComponent = (function () {
    function RadSideDrawerComponent(elementRef, page, viewContainer) {
        this.elementRef = elementRef;
        this.page = page;
        this.viewContainer = viewContainer;
        this.sideDrawerMovedToPage = false;
        this.drawerOpening = new core_1.EventEmitter();
        this.drawerOpen = new core_1.EventEmitter();
        this.drawerClosing = new core_1.EventEmitter();
        this.drawerClosed = new core_1.EventEmitter();
        this.sideDrawer = this.elementRef.nativeElement;
    }
    Object.defineProperty(RadSideDrawerComponent.prototype, "transition", {
        set: function (transition) {
            this.sideDrawer.drawerTransition = transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "nativeElement", {
        get: function () {
            return this.sideDrawer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "drawerContentSize", {
        set: function (value) {
            this._drawerContentSize = value;
            this.updateContentSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "showOverNavigation", {
        set: function (value) {
            this._showOverNavigation = value;
            this.updateShowOverNavigation();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "gesturesEnabled", {
        set: function (value) {
            this._gesturesEnabled = value;
            this.updateGesturesEnabled();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "drawerTransition", {
        set: function (value) {
            this._drawerTransition = value;
            this.updateDrawerTransition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "drawerLocation", {
        set: function (value) {
            this._drawerLocation = value;
            this.updateDrawerLocation();
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawerComponent.prototype.updateDrawerLocation = function () {
        this.sideDrawer.drawerLocation = this._drawerLocation;
    };
    RadSideDrawerComponent.prototype.updateDrawerTransition = function () {
        this.sideDrawer.drawerTransition = this._drawerTransition;
    };
    RadSideDrawerComponent.prototype.updateGesturesEnabled = function () {
        this.sideDrawer.gesturesEnabled = this._gesturesEnabled;
    };
    RadSideDrawerComponent.prototype.updateShowOverNavigation = function () {
        this.sideDrawer.showOverNavigation = this._showOverNavigation;
    };
    RadSideDrawerComponent.prototype.updateContentSize = function () {
        this.sideDrawer.drawerContentSize = this._drawerContentSize;
    };
    RadSideDrawerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'RadSideDrawer',
                    template: "<ng-content></ng-content>"
                },] },
    ];
    /** @nocollapse */
    RadSideDrawerComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
        { type: page_1.Page, decorators: [{ type: core_1.Inject, args: [page_1.Page,] },] },
        { type: core_1.ViewContainerRef, decorators: [{ type: core_1.Inject, args: [core_1.ViewContainerRef,] },] },
    ]; };
    RadSideDrawerComponent.propDecorators = {
        "drawerOpening": [{ type: core_1.Output },],
        "drawerOpen": [{ type: core_1.Output },],
        "drawerClosing": [{ type: core_1.Output },],
        "drawerClosed": [{ type: core_1.Output },],
        "transition": [{ type: core_1.Input },],
    };
    return RadSideDrawerComponent;
}());
exports.RadSideDrawerComponent = RadSideDrawerComponent;
var TKDrawerContentDirective = (function () {
    function TKDrawerContentDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._elementRef.nativeElement.id = TKDRAWERCONTENT;
    }
    TKDrawerContentDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[tkDrawerContent]"
                },] },
    ];
    /** @nocollapse */
    TKDrawerContentDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
    ]; };
    return TKDrawerContentDirective;
}());
exports.TKDrawerContentDirective = TKDrawerContentDirective;
var TKMainContentDirective = (function () {
    function TKMainContentDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._elementRef.nativeElement.id = TKMAINCONTENT;
    }
    TKMainContentDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[tkMainContent]"
                },] },
    ];
    /** @nocollapse */
    TKMainContentDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
    ]; };
    return TKMainContentDirective;
}());
exports.TKMainContentDirective = TKMainContentDirective;
var ɵ0 = function (parent, child) {
    var drawer = parent;
    var childView = child;
    if (childView.id == TKMAINCONTENT) {
        drawer.mainContent = childView;
    }
    if (childView.id == TKDRAWERCONTENT) {
        drawer.drawerContent = childView;
    }
}, ɵ1 = function (parent, child) {
    var drawer = parent;
    var childView = child;
    if (childView.id == TKMAINCONTENT) {
        drawer.mainContent = null;
    }
    if (childView.id == TKDRAWERCONTENT) {
        drawer.drawerContent = null;
    }
};
exports.ɵ0 = ɵ0;
exports.ɵ1 = ɵ1;
var sideDrawerMeta = {
    insertChild: ɵ0,
    removeChild: ɵ1,
};
exports.SIDEDRAWER_DIRECTIVES = [RadSideDrawerComponent, TKDrawerContentDirective, TKMainContentDirective];
element_registry_1.registerElement("RadSideDrawer", function () { return __1.RadSideDrawer; }, sideDrawerMeta);
var NativeScriptUISideDrawerModule = (function () {
    function NativeScriptUISideDrawerModule() {
    }
    NativeScriptUISideDrawerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [exports.SIDEDRAWER_DIRECTIVES],
                    exports: [exports.SIDEDRAWER_DIRECTIVES]
                },] },
    ];
    /** @nocollapse */
    NativeScriptUISideDrawerModule.ctorParameters = function () { return []; };
    return NativeScriptUISideDrawerModule;
}());
exports.NativeScriptUISideDrawerModule = NativeScriptUISideDrawerModule;


/***/ }),

/***/ 468:
/*!***************************************************************************!*\
  !*** ../node_modules/nativescript-pro-ui/sidedrawer/sidedrawer-common.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = __webpack_require__(/*! tns-core-modules/ui/core/view */ 0);
exports.FadeTransitionString = "fadetransition";
exports.PushTransitionString = "pushtransition";
exports.RevealTransitionString = "revealtransition";
exports.ReverseSlideOutTransitionString = "reverseslideouttransition";
exports.ScaleDownPusherTransitionString = "scaledownpushertransition";
exports.ScaleUpTransitionString = "scaleuptransition";
exports.SlideAlongTransitionString = "slidealongtransition";
exports.SlideInOnTopTransitionString = "slideinontoptransition";
var SideDrawerLocation;
(function (SideDrawerLocation) {
    SideDrawerLocation.Left = "Left";
    SideDrawerLocation.Right = "Right";
    SideDrawerLocation.Top = "Top";
    SideDrawerLocation.Bottom = "Bottom";
})(SideDrawerLocation = exports.SideDrawerLocation || (exports.SideDrawerLocation = {}));
var DrawerTransitionBase = (function () {
    function DrawerTransitionBase() {
    }
    DrawerTransitionBase.prototype.getNativeContent = function () {
        return undefined;
    };
    ;
    return DrawerTransitionBase;
}());
exports.DrawerTransitionBase = DrawerTransitionBase;
var DrawerStateChangingEventArgs = (function () {
    function DrawerStateChangingEventArgs() {
    }
    return DrawerStateChangingEventArgs;
}());
exports.DrawerStateChangingEventArgs = DrawerStateChangingEventArgs;
var DrawerStateChangedEventArgs = (function () {
    function DrawerStateChangedEventArgs() {
    }
    return DrawerStateChangedEventArgs;
}());
exports.DrawerStateChangedEventArgs = DrawerStateChangedEventArgs;
var RadSideDrawer = (function (_super) {
    __extends(RadSideDrawer, _super);
    function RadSideDrawer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadSideDrawer.prototype.onShowOverNavigationPropertyChanged = function (oldValue, newValue) {
        // this.checkTransitionCompatibility(); // When issue #851 is implemented, uncomment this
        this._onShowOverNavigationChanged(oldValue, newValue);
    };
    RadSideDrawer.prototype.onGesturesEnabledPropertyChanged = function (oldValue, newValue) {
        this._onGesturesEnabledChanged(oldValue, newValue);
    };
    RadSideDrawer.prototype.onDrawerTransitionChanged = function (oldValue, newValue) {
        this._onDrawerTransitionChanged(oldValue, newValue);
        this.checkTransitionCompatibility();
    };
    RadSideDrawer.prototype.onDrawerContentSizeChanged = function (oldValue, newValue) {
        this._onDrawerContentSizeChanged(oldValue, newValue);
    };
    RadSideDrawer.prototype.onDrawerLocationPropertyChanged = function (oldValue, newValue) {
        this._onDrawerLocationChanged(oldValue, newValue);
    };
    RadSideDrawer.prototype._onMainContentPropertyChanged = function (oldValue, newValue) {
        this._onMainContentChanged(oldValue, newValue);
    };
    RadSideDrawer.prototype._onDrawerContentPropertyChanged = function (oldValue, newValue) {
        this._onDrawerContentChanged(oldValue, newValue);
    };
    RadSideDrawer.prototype._onMainContentChanged = function (oldValue, newValue) {
        if (oldValue) {
            this._removeView(oldValue);
        }
        if (newValue) {
            this._addView(newValue);
        }
    };
    ;
    RadSideDrawer.prototype._onDrawerContentChanged = function (oldValue, newValue) {
        if (oldValue) {
            this._removeView(oldValue);
        }
        if (newValue) {
            this._addView(newValue);
        }
    };
    ;
    RadSideDrawer.prototype._onDrawerLocationChanged = function (oldValue, newValue) { };
    ;
    RadSideDrawer.prototype._onDrawerTransitionChanged = function (oldValue, newValue) { };
    ;
    RadSideDrawer.prototype._onDrawerContentSizeChanged = function (oldValue, newValue) { };
    ;
    RadSideDrawer.prototype._onGesturesEnabledChanged = function (oldValue, newValue) { };
    ;
    RadSideDrawer.prototype._onShowOverNavigationChanged = function (oldValue, newValue) { };
    ;
    RadSideDrawer.prototype.showDrawer = function () {
    };
    RadSideDrawer.prototype.closeDrawer = function () {
    };
    RadSideDrawer.prototype.getIsOpen = function () {
        var androidIsOpen = false;
        var iosIsOpen = false;
        if (this.android) {
            androidIsOpen = this.android.getIsOpen();
        }
        if (this.ios) {
            iosIsOpen = this.ios.defaultSideDrawer.isVisible;
        }
        var result = androidIsOpen || iosIsOpen;
        if (result) {
            return result;
        }
        return false;
    };
    RadSideDrawer.prototype.toggleDrawerState = function () {
        if (this.getIsOpen()) {
            this.closeDrawer();
        }
        else {
            this.showDrawer();
        }
    };
    RadSideDrawer.prototype.checkTransitionCompatibility = function () {
        if (this.showOverNavigation && this.drawerTransition) {
            var className = this.drawerTransition.constructor.name.toLowerCase();
            if (className != exports.PushTransitionString && className != exports.FadeTransitionString && className != exports.SlideInOnTopTransitionString) {
                console.log("Warning: '" + this.drawerTransition.constructor.name + "' is not supported when 'showOverNavigation' is set to 'true'.");
            }
        }
    };
    Object.defineProperty(RadSideDrawer.prototype, "_childrenCount", {
        get: function () {
            var count = 0;
            if (this.drawerContent) {
                count++;
            }
            if (this.mainContent) {
                count++;
            }
            return count;
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawer.prototype.eachChildView = function (callback) {
        var mainContent = this.mainContent;
        if (mainContent) {
            callback(mainContent);
        }
        var drawerContent = this.drawerContent;
        if (drawerContent) {
            callback(drawerContent);
        }
    };
    RadSideDrawer.drawerOpeningEvent = "drawerOpening";
    RadSideDrawer.drawerOpenedEvent = "drawerOpened";
    RadSideDrawer.drawerClosingEvent = "drawerClosing";
    RadSideDrawer.drawerClosedEvent = "drawerClosed";
    RadSideDrawer.drawerPanEvent = "drawerPan";
    RadSideDrawer.showOverNavigationProperty = new view_1.Property({
        name: "showOverNavigation",
        defaultValue: false,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onShowOverNavigationPropertyChanged(oldValue, newValue);
        },
    });
    RadSideDrawer.gesturesEnabledProperty = new view_1.Property({
        name: "gesturesEnabled",
        defaultValue: true,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onGesturesEnabledPropertyChanged(oldValue, newValue);
        },
    });
    RadSideDrawer.drawerTransitionProperty = new view_1.Property({
        name: "drawerTransition",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDrawerTransitionChanged(oldValue, newValue);
        },
    });
    RadSideDrawer.drawerContentSizeProperty = new view_1.Property({
        name: "drawerContentSize",
        defaultValue: 280,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onDrawerContentSizeChanged(oldValue, newValue);
        },
    });
    RadSideDrawer.drawerLocationProperty = new view_1.Property({
        name: "drawerLocation",
        defaultValue: SideDrawerLocation.Left,
        valueChanged: function (target, oldValue, newValue) {
            target.onDrawerLocationPropertyChanged(oldValue, newValue);
        },
    });
    RadSideDrawer.mainContentProperty = new view_1.Property({
        name: "mainContent",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target._onMainContentPropertyChanged(oldValue, newValue);
        },
    });
    RadSideDrawer.drawerContentProperty = new view_1.Property({
        name: "drawerContent",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target._onDrawerContentPropertyChanged(oldValue, newValue);
        },
    });
    return RadSideDrawer;
}(view_1.View));
exports.RadSideDrawer = RadSideDrawer;
RadSideDrawer.showOverNavigationProperty.register(RadSideDrawer);
RadSideDrawer.gesturesEnabledProperty.register(RadSideDrawer);
RadSideDrawer.drawerTransitionProperty.register(RadSideDrawer);
RadSideDrawer.drawerContentSizeProperty.register(RadSideDrawer);
RadSideDrawer.drawerLocationProperty.register(RadSideDrawer);
RadSideDrawer.mainContentProperty.register(RadSideDrawer);
RadSideDrawer.drawerContentProperty.register(RadSideDrawer);


/***/ }),

/***/ 487:
/*!********************************!*\
  !*** ./home/home.component.ts ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var sidedrawer_1 = __webpack_require__(/*! nativescript-pro-ui/sidedrawer */ 452);
var angular_1 = __webpack_require__(/*! nativescript-pro-ui/sidedrawer/angular */ 466);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var HomeComponent = (function () {
    function HomeComponent(router, route) {
        this.router = router;
        this.route = route;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
    };
    Object.defineProperty(HomeComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    HomeComponent.prototype.messageBox = function () {
        alert("Notification Area");
    };
    HomeComponent.prototype.rightButton = function () {
        alert("Right Pressed");
    };
    HomeComponent.prototype.add = function () {
        this.router.navigate(["addcar"]);
    };
    HomeComponent.prototype.intake = function () {
        this.router.navigate(["carlist"]);
    };
    HomeComponent.prototype.servicehistory = function () {
        this.router.navigate(["appointmentlisting"]);
    };
    HomeComponent.prototype.recalls = function () {
        this.router.navigate(["recalls"]);
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], HomeComponent.prototype, "drawerComponent", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            /*duleId: module.i*/
            styles: [__webpack_require__(/*! ./home.css */ 545)],
            template: __webpack_require__(/*! ./home.component.html */ 546)
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;


/***/ }),

/***/ 544:
/*!*************************************!*\
  !*** ./home/home-routing.module.ts ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! nativescript-angular/router */ 75);
var home_component_1 = __webpack_require__(/*! ./home.component */ 487);
var routes = [
    { path: "", component: home_component_1.HomeComponent }
];
var HomeRoutingModule = (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());
exports.HomeRoutingModule = HomeRoutingModule;


/***/ }),

/***/ 545:
/*!***********************!*\
  !*** ./home/home.css ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = ".blueFont{color:#41cdf4;text-align:center;margin-top:10;vertical-align:center}.page-iconSetting{vertical-align:center;horizontal-align:center;color:white;margin-top:10%}.page-iconSetting1{vertical-align:center;horizontal-align:center;color:white;margin-top:35%}.page-iconCar{text-align:center;color:#41cdf4;margin-top:35%}.page-iconMonstar{vertical-align:center;color:#424671;margin-top:20%;horizontal-align:center}.page-iconWarning{vertical-align:center;horizontal-align:center;color:yellow;margin-top:35%}.page-iconmagic{vertical-align:center;horizontal-align:center;color:lightblue;margin-top:10%}.page-right2{margin-left:3%;horizontal-align:center}.you-know{padding-left:5;font-weight:bold;padding-top:5}.below-font{text-align:left;vertical-align:center}.action-bar{background-color:black}.cloud{height:25;width:25}\n"

/***/ }),

/***/ 546:
/*!**********************************!*\
  !*** ./home/home.component.html ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<ActionBar class=\"action-bar\">\r\n    <NavigationButton ios:visibility=\"collapsed\" icon=\"res://menu\" (tap)=\"onDrawerButtonTap()\"></NavigationButton>\r\n    <ActionItem icon=\"res://navigation/menu\" android:visibility=\"collapsed\" (tap)=\"onDrawerButtonTap()\" ios.position=\"left\">\r\n    </ActionItem>\r\n    <StackLayout orientation=\"horizontal\" style=\"horizontal-align: center;\">\r\n        <Image class=\"cloud\" src=\"https://www.manageengine.com.au/fr/mobile-device-management/images/cloud-icon-1.png\" style=\"text-align: center; vertical-align: center;\"></Image>\r\n        <Label text=\"Shyft\" class=\"action-label\" style=\"padding-left: 5\"></Label>\r\n    </StackLayout>\r\n    <ActionItem icon=\"res://dots\" android:visibility=\"collapsed\" (tap)=\"rightButton()\" ios.position=\"right\">\r\n    </ActionItem>\r\n</ActionBar>\r\n\r\n<RadSideDrawer #drawer showOverNavigation=\"true\" [drawerTransition]=\"sideDrawerTransition\">\r\n\r\n    <StackLayout tkDrawerContent>\r\n        <MyDrawer></MyDrawer>\r\n    </StackLayout>\r\n\r\n    <GridLayout class=\"page page-content\" tkMainContent>\r\n        <GridLayout columns=\"*\" rows=\"*,3*,*,*\" style=\"padding: 10;\">\r\n            <StackLayout col=\"0\" row=\"0\" style=\"margin-bottom: 10; border-width: 1; border-color: black;\">\r\n                <GridLayout columns=\"*\" rows=\"*,*\">\r\n                    <StackLayout col=\"0\" row=\"0\" style=\" border-width: 1; border-color: #dadada;\">\r\n                        <Label class=\"p-5\" text=\"Just For You\" textWrap=\"true\" style=\"font-weight: bold\"></Label>\r\n                    </StackLayout>\r\n                    <StackLayout col=\"0\" row=\"1\">\r\n                        <GridLayout columns=\"*, 7*\" rows=\"*\">\r\n                            <StackLayout col=\"0\" row=\"0\" style=\"vertical-align: center;\">\r\n                                <Label class=\"page-iconMonstar fa\" text=\"&#xf23c;\" style=\"padding-left: 10\"></Label>\r\n                            </StackLayout>\r\n                            <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center;\">\r\n                                <Label text=\"Special Offers\" textWrap=\"true\" style=\"color: #dadada; \"></Label>\r\n                            </StackLayout>\r\n                        </GridLayout>\r\n                    </StackLayout>\r\n                </GridLayout>\r\n            </StackLayout>\r\n            <StackLayout col=\"0\" row=\"1\">\r\n                <GridLayout columns=\"*,*\" rows=\"*,4*,4*\" style=\"border-width: 1;\">\r\n                    <StackLayout col=\"0\" row=\"0\" style=\"vertical-align: center;\">\r\n\r\n                    </StackLayout>\r\n                    <StackLayout col=\"1\" row=\"0\" style=\"horizontal-align: right; margin-right: 15; vertical-align: center;\">\r\n                        <Label class=\"page-plus fa\" text=\"&#xf067;\" (onTap)=\"add()\"></Label>\r\n                    </StackLayout>\r\n                    <StackLayout col=\"0\" row=\"1\" style=\"vertical-align: center;\">\r\n                        <GridLayout columns=\"*\" rows=\"2*,*\" style=\"padding-left: 10; padding-right: 10; padding-bottom: 10\">\r\n                            <StackLayout col=\"0\" row=\"0\" style=\"background-color: #4286f4; border-width: 1; border-color: black;\" (tap)=\"intake()\">\r\n                                <Label class=\"page-iconSetting fa\" text=\"&#xf085;\"></Label>\r\n                                <Label text=\"2017 Honda Pilot EX-L\" textWrap=\"true\" style=\"text-align: center; color: white; \"></Label>\r\n                                <Label text=\"11,417 Miles\" textWrap=\"true\" style=\"text-align: center; color: white\"></Label>\r\n                            </StackLayout>\r\n                            <StackLayout col=\"0\" row=\"1\" style=\"background-color: white; border-width: 1; border-color: black;\" (tap)=\"intake()\">\r\n                                <Label class=\" blueFont\" text=\"Schedule Service\" textWrap=\"true\"></Label>\r\n                            </StackLayout>\r\n                        </GridLayout>\r\n                    </StackLayout>\r\n                    <StackLayout col=\"1\" row=\"1\">\r\n                        <GridLayout columns=\"*\" rows=\"2*,*\" style=\" padding-right: 10; padding-bottom: 10\" (tap)=\"recalls()\">\r\n                            <StackLayout col=\"0\" row=\"0\" style=\"background-color: #41e5f4; border-width: 1; border-color: black;\">\r\n                                <Label class=\"page-iconWarning fa\" text=\"&#xf071;\"></Label>\r\n                            </StackLayout>\r\n                            <StackLayout col=\"0\" row=\"1\" style=\"background-color: white; border-width: 1; border-color: black;\">\r\n                                <Label class=\" blueFont\" text=\"Check For Recalls\" textWrap=\"true\"></Label>\r\n                            </StackLayout>\r\n                        </GridLayout>\r\n                    </StackLayout>\r\n                    <StackLayout col=\"0\" row=\"2\">\r\n                        <GridLayout columns=\"*\" rows=\"2*,*\" style=\"padding-left: 10; padding-right: 10; padding-bottom: 10\" (tap)=\"servicehistory()\">\r\n                            <StackLayout col=\"0\" row=\"0\" style=\"background-color: #f4a641; border-width: 1; border-color: black;\">\r\n                                <Label class=\"page-iconSetting1 fa\" text=\"&#xf0c7;\"></Label>\r\n                            </StackLayout>\r\n                            <StackLayout col=\"0\" row=\"1\" style=\"background-color: white; border-width: 1; border-color: black;\">\r\n                                <Label class=\" blueFont\" text=\"Service History\" textWrap=\"true\"></Label>\r\n                            </StackLayout>\r\n                        </GridLayout>\r\n                    </StackLayout>\r\n                    <StackLayout col=\"1\" row=\"2\">\r\n                        <GridLayout columns=\"*\" rows=\"2*,*\" style=\" padding-right: 10; padding-bottom: 10\">\r\n                            <StackLayout col=\"0\" row=\"0\" style=\"background-color: #FFB6C1; border-width: 1; border-color: black;\">\r\n                                <Label class=\"page-iconCar fa\" text=\"&#xf1b9;\"></Label>\r\n                            </StackLayout>\r\n                            <StackLayout col=\"0\" row=\"1\" style=\"background-color: white; border-width: 1; border-color: black;\">\r\n                                <Label class=\" blueFont\" text=\"Get Trade-In Appraisel\" textWrap=\"true\"></Label>\r\n                            </StackLayout>\r\n                        </GridLayout>\r\n                    </StackLayout>\r\n                </GridLayout>\r\n            </StackLayout>\r\n            <StackLayout col=\"0\" row=\"2\" style=\"margin-bottom: 10; margin-top: 10; border-width: 1; border-color: black;\">\r\n                <GridLayout columns=\"*\" rows=\"*\">\r\n                    <StackLayout col=\"0\" row=\"0\" style=\"background-color: white; border-width: 1; border-color: #dadada;\">\r\n                        <Label text=\"Did you know?\" textWrap=\"true\"></Label>\r\n                        <TextView backgroundColor=\"transparent\" text=\"Most newer cars use 0w-20 synthetic Blend Motor Oil. It allows the vehicles to run more efficiently and lasts longer  than normal conventinal oil.\"\r\n                            hint=\"Enter some text\" [editable]=\"editState\"></TextView>\r\n                    </StackLayout>\r\n                </GridLayout>\r\n            </StackLayout>\r\n            <StackLayout col=\"0\" row=\"3\" style=\"background-color: white; padding: 10;margin-bottom: 10; margin-top: 10; border-width: 1; border-color: black;\">\r\n                <GridLayout columns=\"2*, 3*, *\" rows=\"*\" style=\"border-width: 2; border-color: #41cdf4;\">\r\n                    <StackLayout col=\"0\" row=\"0\" style=\"vertical-align: center;\">\r\n                        <Label class=\"page-iconmagic fa\" text=\"&#xf0d0;\" style=\"horizontal-align: right; \"></Label>\r\n                    </StackLayout>\r\n\r\n                    <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center;\">\r\n                        <Label class=\"blueFont\" text=\"Price Car Repairs\" textWrap=\"true\" style=\"text-align: center;\"></Label>\r\n                    </StackLayout>\r\n                    <StackLayout col=\"2\" row=\"0\">\r\n\r\n                    </StackLayout>\r\n                </GridLayout>\r\n            </StackLayout>\r\n        </GridLayout>\r\n    </GridLayout>\r\n</RadSideDrawer>"

/***/ })

});