webpackJsonp([5],{

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

/***/ 167:
/*!**********************************************************!*\
  !*** ../node_modules/nativescript-angular/http/index.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./http.module */ 168));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 168:
/*!****************************************************************!*\
  !*** ../node_modules/nativescript-angular/http/http.module.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var http_1 = __webpack_require__(/*! @angular/http */ 49);
var ns_http_1 = __webpack_require__(/*! ./ns-http */ 82);
var ns_file_system_1 = __webpack_require__(/*! ../file-system/ns-file-system */ 37);
var ns_http_2 = __webpack_require__(/*! ./ns-http */ 82);
exports.NSHttp = ns_http_2.NSHttp;
function nsHttpFactory(backend, options, nsFileSystem) {
    return new ns_http_1.NSHttp(backend, options, nsFileSystem);
}
exports.nsHttpFactory = nsHttpFactory;
function nsXSRFStrategyFactory() {
    return new ns_http_1.NSXSRFStrategy();
}
exports.nsXSRFStrategyFactory = nsXSRFStrategyFactory;
var NativeScriptHttpModule = (function () {
    function NativeScriptHttpModule() {
    }
    NativeScriptHttpModule.decorators = [
        { type: core_1.NgModule, args: [{
                    providers: [
                        { provide: http_1.XSRFStrategy, useFactory: nsXSRFStrategyFactory },
                        ns_file_system_1.NSFileSystem,
                        {
                            provide: http_1.Http, useFactory: nsHttpFactory,
                            deps: [http_1.XHRBackend, http_1.RequestOptions, ns_file_system_1.NSFileSystem]
                        }
                    ],
                    imports: [
                        http_1.HttpModule,
                    ],
                    exports: [
                        http_1.HttpModule,
                    ]
                },] },
    ];
    /** @nocollapse */
    NativeScriptHttpModule.ctorParameters = function () { return []; };
    return NativeScriptHttpModule;
}());
exports.NativeScriptHttpModule = NativeScriptHttpModule;
//# sourceMappingURL=http.module.js.map

/***/ }),

/***/ 169:
/*!**********************************************************!*\
  !*** ../node_modules/rxjs/add/observable/fromPromise.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(/*! ../../Observable */ 4);
var fromPromise_1 = __webpack_require__(/*! ../../observable/fromPromise */ 55);
Observable_1.Observable.fromPromise = fromPromise_1.fromPromise;
//# sourceMappingURL=fromPromise.js.map

/***/ }),

/***/ 170:
/*!**********************************************************************!*\
  !*** ../node_modules/nativescript-angular/http-client/http-utils.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(/*! rxjs/Observable */ 4);
var file_system_1 = __webpack_require__(/*! tns-core-modules/file-system/file-system */ 6);
function isLocalRequest(url) {
    return url.indexOf("~") === 0 || url.indexOf("/") === 0;
}
exports.isLocalRequest = isLocalRequest;
function getAbsolutePath(url, nsFileSystem) {
    url = url.replace("~", "").replace("/", "");
    url = file_system_1.path.join(nsFileSystem.currentApp().path, url);
    return url;
}
exports.getAbsolutePath = getAbsolutePath;
function processLocalFileRequest(url, nsFileSystem, successResponse, errorResponse) {
    url = getAbsolutePath(url, nsFileSystem);
    // request from local app resources
    return new Observable_1.Observable(function (observer) {
        if (nsFileSystem.fileExists(url)) {
            var localFile = nsFileSystem.fileFromPath(url);
            localFile.readText()
                .then(function (data) {
                try {
                    var json = JSON.parse(data);
                    observer.next(successResponse(url, json, 200));
                    observer.complete();
                }
                catch (error) {
                    // Even though the response status was 2xx, this is still an error.
                    // The parse error contains the text of the body that failed to parse.
                    var errorResult = { error: error, text: data };
                    observer.error(errorResponse(url, errorResult, 200));
                }
            }, function (err) {
                observer.error(errorResponse(url, err, 400));
            });
        }
        else {
            observer.error(errorResponse(url, "Not Found", 404));
        }
    });
}
exports.processLocalFileRequest = processLocalFileRequest;
//# sourceMappingURL=http-utils.js.map

/***/ }),

/***/ 302:
/*!***********************************!*\
  !*** ./carlist/carlist.module.ts ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var nativescript_module_1 = __webpack_require__(/*! nativescript-angular/nativescript.module */ 165);
var angular_1 = __webpack_require__(/*! nativescript-pro-ui/listview/angular */ 457);
var carlist_routing_module_1 = __webpack_require__(/*! ./carlist-routing.module */ 504);
var carlist_component_1 = __webpack_require__(/*! ./carlist.component */ 477);
var http_1 = __webpack_require__(/*! nativescript-angular/http */ 167);
var CarlistModule = (function () {
    function CarlistModule() {
    }
    CarlistModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.NativeScriptHttpModule,
                nativescript_module_1.NativeScriptModule,
                carlist_routing_module_1.CarlistRoutingModule,
                angular_1.NativeScriptUIListViewModule
            ],
            declarations: [
                carlist_component_1.CarlistComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], CarlistModule);
    return CarlistModule;
}());
exports.CarlistModule = CarlistModule;


/***/ }),

/***/ 318:
/*!*************************************************************************************!*\
  !*** ../node_modules/tns-core-modules/application-settings/application-settings.js ***!
  \*************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var common = __webpack_require__(/*! ./application-settings-common */ 321);
var application_1 = __webpack_require__(/*! ../application */ 5);
var sharedPreferences;
function ensureSharedPreferences() {
    if (!sharedPreferences) {
        sharedPreferences = application_1.getNativeApplication().getApplicationContext().getSharedPreferences("prefs.db", 0);
    }
}
function verify(key) {
    common.checkKey(key);
    ensureSharedPreferences();
}
function hasKey(key) {
    verify(key);
    return sharedPreferences.contains(key);
}
exports.hasKey = hasKey;
function getBoolean(key, defaultValue) {
    verify(key);
    if (hasKey(key)) {
        return sharedPreferences.getBoolean(key, false);
    }
    return defaultValue;
}
exports.getBoolean = getBoolean;
function getString(key, defaultValue) {
    verify(key);
    if (hasKey(key)) {
        return sharedPreferences.getString(key, "");
    }
    return defaultValue;
}
exports.getString = getString;
function getNumber(key, defaultValue) {
    verify(key);
    if (hasKey(key)) {
        return sharedPreferences.getFloat(key, float(0.0));
    }
    return defaultValue;
}
exports.getNumber = getNumber;
function setBoolean(key, value) {
    verify(key);
    common.ensureValidValue(value, "boolean");
    var editor = sharedPreferences.edit();
    editor.putBoolean(key, value);
    editor.apply();
}
exports.setBoolean = setBoolean;
function setString(key, value) {
    verify(key);
    common.ensureValidValue(value, "string");
    var editor = sharedPreferences.edit();
    editor.putString(key, value);
    editor.apply();
}
exports.setString = setString;
function setNumber(key, value) {
    verify(key);
    common.ensureValidValue(value, "number");
    var editor = sharedPreferences.edit();
    editor.putFloat(key, float(value));
    editor.apply();
}
exports.setNumber = setNumber;
function remove(key) {
    verify(key);
    var editor = sharedPreferences.edit();
    editor.remove(key);
    editor.apply();
}
exports.remove = remove;
function clear() {
    ensureSharedPreferences();
    sharedPreferences.edit().clear().apply();
}
exports.clear = clear;
exports.flush = function () {
    return sharedPreferences.edit().commit();
};
//# sourceMappingURL=application-settings.android.js.map

/***/ }),

/***/ 319:
/*!************************************************!*\
  !*** ../node_modules/rxjs/add/operator/map.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(/*! ../../Observable */ 4);
var map_1 = __webpack_require__(/*! ../../operator/map */ 81);
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ }),

/***/ 320:
/*!***********************************************!*\
  !*** ../node_modules/rxjs/add/operator/do.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(/*! ../../Observable */ 4);
var do_1 = __webpack_require__(/*! ../../operator/do */ 322);
Observable_1.Observable.prototype.do = do_1._do;
Observable_1.Observable.prototype._do = do_1._do;
//# sourceMappingURL=do.js.map

/***/ }),

/***/ 321:
/*!********************************************************************************************!*\
  !*** ../node_modules/tns-core-modules/application-settings/application-settings-common.js ***!
  \********************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.checkKey = function (key) {
    if (typeof key !== "string") {
        throw new Error("key: '" + key + "' must be a string");
    }
};
exports.ensureValidValue = function (value, valueType) {
    if (typeof value !== valueType) {
        throw new Error("value: '" + value + "' must be a " + valueType);
    }
};
//# sourceMappingURL=application-settings-common.js.map

/***/ }),

/***/ 322:
/*!*******************************************!*\
  !*** ../node_modules/rxjs/operator/do.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tap_1 = __webpack_require__(/*! ../operators/tap */ 323);
/* tslint:enable:max-line-length */
/**
 * Perform a side effect for every emission on the source Observable, but return
 * an Observable that is identical to the source.
 *
 * <span class="informal">Intercepts each emission on the source and runs a
 * function, but returns an output which is identical to the source as long as errors don't occur.</span>
 *
 * <img src="./img/do.png" width="100%">
 *
 * Returns a mirrored Observable of the source Observable, but modified so that
 * the provided Observer is called to perform a side effect for every value,
 * error, and completion emitted by the source. Any errors that are thrown in
 * the aforementioned Observer or handlers are safely sent down the error path
 * of the output Observable.
 *
 * This operator is useful for debugging your Observables for the correct values
 * or performing other side effects.
 *
 * Note: this is different to a `subscribe` on the Observable. If the Observable
 * returned by `do` is not subscribed, the side effects specified by the
 * Observer will never happen. `do` therefore simply spies on existing
 * execution, it does not trigger an execution to happen like `subscribe` does.
 *
 * @example <caption>Map every click to the clientX position of that click, while also logging the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks
 *   .do(ev => console.log(ev))
 *   .map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link map}
 * @see {@link subscribe}
 *
 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
 * callback for `next`.
 * @param {function} [error] Callback for errors in the source.
 * @param {function} [complete] Callback for the completion of the source.
 * @return {Observable} An Observable identical to the source, but runs the
 * specified Observer or callback(s) for each item.
 * @method do
 * @name do
 * @owner Observable
 */
function _do(nextOrObserver, error, complete) {
    return tap_1.tap(nextOrObserver, error, complete)(this);
}
exports._do = _do;
//# sourceMappingURL=do.js.map

/***/ }),

/***/ 323:
/*!*********************************************!*\
  !*** ../node_modules/rxjs/operators/tap.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(/*! ../Subscriber */ 8);
/* tslint:enable:max-line-length */
/**
 * Perform a side effect for every emission on the source Observable, but return
 * an Observable that is identical to the source.
 *
 * <span class="informal">Intercepts each emission on the source and runs a
 * function, but returns an output which is identical to the source as long as errors don't occur.</span>
 *
 * <img src="./img/do.png" width="100%">
 *
 * Returns a mirrored Observable of the source Observable, but modified so that
 * the provided Observer is called to perform a side effect for every value,
 * error, and completion emitted by the source. Any errors that are thrown in
 * the aforementioned Observer or handlers are safely sent down the error path
 * of the output Observable.
 *
 * This operator is useful for debugging your Observables for the correct values
 * or performing other side effects.
 *
 * Note: this is different to a `subscribe` on the Observable. If the Observable
 * returned by `do` is not subscribed, the side effects specified by the
 * Observer will never happen. `do` therefore simply spies on existing
 * execution, it does not trigger an execution to happen like `subscribe` does.
 *
 * @example <caption>Map every click to the clientX position of that click, while also logging the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks
 *   .do(ev => console.log(ev))
 *   .map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link map}
 * @see {@link subscribe}
 *
 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
 * callback for `next`.
 * @param {function} [error] Callback for errors in the source.
 * @param {function} [complete] Callback for the completion of the source.
 * @return {Observable} An Observable identical to the source, but runs the
 * specified Observer or callback(s) for each item.
 * @name tap
 */
function tap(nextOrObserver, error, complete) {
    return function tapOperatorFunction(source) {
        return source.lift(new DoOperator(nextOrObserver, error, complete));
    };
}
exports.tap = tap;
var DoOperator = (function () {
    function DoOperator(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    DoOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    };
    return DoOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DoSubscriber = (function (_super) {
    __extends(DoSubscriber, _super);
    function DoSubscriber(destination, nextOrObserver, error, complete) {
        _super.call(this, destination);
        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
        safeSubscriber.syncErrorThrowable = true;
        this.add(safeSubscriber);
        this.safeSubscriber = safeSubscriber;
    }
    DoSubscriber.prototype._next = function (value) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.next(value);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.next(value);
        }
    };
    DoSubscriber.prototype._error = function (err) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.error(err);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.error(err);
        }
    };
    DoSubscriber.prototype._complete = function () {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.complete();
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.complete();
        }
    };
    return DoSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=tap.js.map

/***/ }),

/***/ 324:
/*!*************************!*\
  !*** ./shared/utils.ts ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.baseurl = "https://uat.futuredms.com/shyft-api/";


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

/***/ 37:
/*!**************************************************************************!*\
  !*** ../node_modules/nativescript-angular/file-system/ns-file-system.js ***!
  \**************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var file_system_1 = __webpack_require__(/*! tns-core-modules/file-system */ 6);
// Allows greater flexibility with `file-system` and Angular
// Also provides a way for `file-system` to be mocked for testing
var NSFileSystem = (function () {
    function NSFileSystem() {
    }
    NSFileSystem.prototype.currentApp = function () {
        return file_system_1.knownFolders.currentApp();
    };
    NSFileSystem.prototype.fileFromPath = function (path) {
        return file_system_1.File.fromPath(path);
    };
    NSFileSystem.prototype.fileExists = function (path) {
        return file_system_1.File.exists(path);
    };
    NSFileSystem.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NSFileSystem.ctorParameters = function () { return []; };
    return NSFileSystem;
}());
exports.NSFileSystem = NSFileSystem;
//# sourceMappingURL=ns-file-system.js.map

/***/ }),

/***/ 457:
/*!*********************************************************************!*\
  !*** ../node_modules/nativescript-pro-ui/listview/angular/index.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./listview-directives */ 458));


/***/ }),

/***/ 458:
/*!***********************************************************************************!*\
  !*** ../node_modules/nativescript-pro-ui/listview/angular/listview-directives.js ***!
  \***********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var element_registry_1 = __webpack_require__(/*! nativescript-angular/element-registry */ 29);
var _1 = __webpack_require__(/*! ./../ */ 459);
var platform_1 = __webpack_require__(/*! tns-core-modules/platform */ 7);
var observable_array_1 = __webpack_require__(/*! tns-core-modules/data/observable-array */ 36);
var ListItemContext = (function (_super) {
    __extends(ListItemContext, _super);
    function ListItemContext($implicit, item, index, even, odd, category) {
        var _this = _super.call(this, item) || this;
        _this.$implicit = $implicit;
        _this.item = item;
        _this.index = index;
        _this.even = even;
        _this.odd = odd;
        _this.category = category;
        return _this;
    }
    return ListItemContext;
}(core_1.ElementRef));
exports.ListItemContext = ListItemContext;
var NG_VIEW = "ng_view";
var RadListViewComponent = (function () {
    function RadListViewComponent(_elementRef, _iterableDiffers) {
        var _this = this;
        this._elementRef = _elementRef;
        this._iterableDiffers = _iterableDiffers;
        this._itemReordering = false;
        this.doCheckDelay = 5;
        this.setupItemView = new core_1.EventEmitter();
        this._listView = _elementRef.nativeElement;
        // We should consider setting this default value in the RadListView constructor.
        this._listView.listViewLayout = new _1.ListViewLinearLayout();
        var component = this;
        this._listView.itemViewLoader = function (viewType) {
            switch (viewType) {
                case _1.ListViewViewTypes.ItemView:
                    if (component._itemTemplate && _this.loader) {
                        var nativeItem = _this.loader.createEmbeddedView(component._itemTemplate, new ListItemContext(), 0);
                        var typedView = getItemViewRoot(nativeItem);
                        typedView[NG_VIEW] = nativeItem;
                        return typedView;
                    }
                    break;
                case _1.ListViewViewTypes.ItemSwipeView:
                    if (component._itemSwipeTemplate && _this.loader) {
                        var nativeItem = _this.loader.createEmbeddedView(component._itemSwipeTemplate, new ListItemContext(), 0);
                        var typedView = getItemViewRoot(nativeItem);
                        typedView[NG_VIEW] = nativeItem;
                        return typedView;
                    }
                    break;
                case _1.ListViewViewTypes.LoadOnDemandView:
                    if (component._loadOnDemandTemplate && _this.loader) {
                        var viewRef = _this.loader.createEmbeddedView(component._loadOnDemandTemplate, new ListItemContext(), 0);
                        _this.detectChangesOnChild(viewRef, -1);
                        var nativeView = getItemViewRoot(viewRef);
                        nativeView[NG_VIEW] = viewRef;
                        return nativeView;
                    }
                    break;
                case _1.ListViewViewTypes.HeaderView:
                    if (_this._listView.groupingFunction && component._headerTemplate && platform_1.isIOS) {
                        console.log("Warning: Setting custom 'tkListViewHeader' with 'groupingFunction' enabled is not supported on iOS.");
                        break;
                    }
                    if (component._headerTemplate && _this.loader && !_this._listView.groupingFunction) {
                        var viewRef = _this.loader.createEmbeddedView(component._headerTemplate, new ListItemContext(), 0);
                        _this.detectChangesOnChild(viewRef, -1);
                        var nativeView = getItemViewRoot(viewRef);
                        nativeView[NG_VIEW] = viewRef;
                        return nativeView;
                    }
                    break;
                case _1.ListViewViewTypes.FooterView:
                    if (component._footerTemplate && _this.loader) {
                        var viewRef = _this.loader.createEmbeddedView(component._footerTemplate, new ListItemContext(), 0);
                        _this.detectChangesOnChild(viewRef, -1);
                        var nativeView = getItemViewRoot(viewRef);
                        nativeView[NG_VIEW] = viewRef;
                        return nativeView;
                    }
                    break;
            }
        };
    }
    RadListViewComponent.prototype.ngAfterContentInit = function () {
        this.setItemTemplates();
    };
    Object.defineProperty(RadListViewComponent.prototype, "nativeElement", {
        get: function () {
            return this._listView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "listView", {
        get: function () {
            return this._listView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "loadOnDemandTemplate", {
        set: function (value) {
            this._loadOnDemandTemplate = value;
            this._listView.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "headerTemplate", {
        set: function (value) {
            this._headerTemplate = value;
            if (this._listView.ios) {
                this._listView['_updateHeaderFooterAvailability']();
            }
            else if (this._listView.android) {
                this._listView['_updateHeaderFooter']();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "footerTemplate", {
        set: function (value) {
            this._footerTemplate = value;
            if (this._listView.ios) {
                this._listView['_updateHeaderFooterAvailability']();
            }
            else if (this._listView.android) {
                this._listView['_updateHeaderFooter']();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "itemTemplate", {
        set: function (value) {
            this._itemTemplate = value;
            this._listView.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "itemSwipeTemplate", {
        set: function (value) {
            this._itemSwipeTemplate = value;
            this._listView.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "items", {
        set: function (value) {
            this._items = value;
            var needDiffer = true;
            if (value instanceof observable_array_1.ObservableArray) {
                needDiffer = false;
            }
            if (needDiffer && !this._differ && core_1.ɵisListLikeIterable(value)) {
                this._differ = this._iterableDiffers.find(this._items).create(function (index, item) { return item; });
            }
            this._listView.items = this._items;
        },
        enumerable: true,
        configurable: true
    });
    RadListViewComponent.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this._items);
            if (changes) {
                this._listView.refresh();
            }
        }
    };
    RadListViewComponent.prototype.onItemLoading = function (args) {
        var index = args.index;
        var currentItem = args.view.bindingContext;
        var ngView = args.view[NG_VIEW];
        if (ngView) {
            this.setupViewRef(ngView, currentItem, index);
            this.detectChangesOnChild(ngView, index);
        }
    };
    RadListViewComponent.prototype.setupViewRef = function (viewRef, data, index) {
        var context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.category = data ? data.category : "";
        context.index = index;
        context.even = (index % 2 == 0);
        context.odd = !context.even;
        this.setupItemView.next({ view: viewRef, data: data, index: index, context: context });
    };
    RadListViewComponent.prototype.setLayout = function (layout) {
        this._listView.listViewLayout = layout;
    };
    RadListViewComponent.prototype.detectChangesOnChild = function (viewRef, index) {
        // Manually detect changes in child view ref
        // TODO: Is there a better way of getting viewRef's change detector
        var childChangeDetector = viewRef;
        childChangeDetector.markForCheck();
        childChangeDetector.detectChanges();
    };
    RadListViewComponent.prototype.setItemTemplates = function () {
        // The itemTemplateQuery may be changed after list items are added that contain <template> inside,
        // so cache and use only the original template to avoid errors.
        this.itemTemplate = this.itemTemplateQuery;
        if (this._templateMap) {
            var templates_1 = [];
            this._templateMap.forEach(function (value) {
                templates_1.push(value);
            });
            this.listView.itemTemplates = templates_1;
        }
    };
    RadListViewComponent.prototype.registerTemplate = function (key, template) {
        var _this = this;
        if (!this._templateMap) {
            this._templateMap = new Map();
        }
        var keyedTemplate = {
            key: key,
            createView: function () {
                var viewRef = _this.loader.createEmbeddedView(template, new ListItemContext(), 0);
                var resultView = getItemViewRoot(viewRef);
                resultView[NG_VIEW] = viewRef;
                return resultView;
            }
        };
        this._templateMap.set(key, keyedTemplate);
    };
    RadListViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: "RadListView",
                    template: "\n        <DetachedContainer>\n            <Placeholder #loader></Placeholder>\n        </DetachedContainer>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    RadListViewComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
        { type: core_1.IterableDiffers, decorators: [{ type: core_1.Inject, args: [core_1.IterableDiffers,] },] },
    ]; };
    RadListViewComponent.propDecorators = {
        "loader": [{ type: core_1.ViewChild, args: ["loader", { read: core_1.ViewContainerRef },] },],
        "setupItemView": [{ type: core_1.Output },],
        "itemTemplateQuery": [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] },],
        "items": [{ type: core_1.Input },],
        "onItemLoading": [{ type: core_1.HostListener, args: ["itemLoading", ['$event'],] },],
    };
    return RadListViewComponent;
}());
exports.RadListViewComponent = RadListViewComponent;
var ListViewLinearLayoutDirective = (function () {
    function ListViewLinearLayoutDirective() {
    }
    ListViewLinearLayoutDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "ListViewLinearLayout"
                },] },
    ];
    /** @nocollapse */
    ListViewLinearLayoutDirective.ctorParameters = function () { return []; };
    return ListViewLinearLayoutDirective;
}());
exports.ListViewLinearLayoutDirective = ListViewLinearLayoutDirective;
var ListViewGridLayoutDirective = (function () {
    function ListViewGridLayoutDirective() {
    }
    ListViewGridLayoutDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "ListViewGridLayout"
                },] },
    ];
    /** @nocollapse */
    ListViewGridLayoutDirective.ctorParameters = function () { return []; };
    return ListViewGridLayoutDirective;
}());
exports.ListViewGridLayoutDirective = ListViewGridLayoutDirective;
var ListViewStaggeredLayoutDirective = (function () {
    function ListViewStaggeredLayoutDirective() {
    }
    ListViewStaggeredLayoutDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "ListViewStaggeredLayout"
                },] },
    ];
    /** @nocollapse */
    ListViewStaggeredLayoutDirective.ctorParameters = function () { return []; };
    return ListViewStaggeredLayoutDirective;
}());
exports.ListViewStaggeredLayoutDirective = ListViewStaggeredLayoutDirective;
var ReorderHandleDirective = (function () {
    function ReorderHandleDirective() {
    }
    ReorderHandleDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "ReorderHandle"
                },] },
    ];
    /** @nocollapse */
    ReorderHandleDirective.ctorParameters = function () { return []; };
    return ReorderHandleDirective;
}());
exports.ReorderHandleDirective = ReorderHandleDirective;
var TKListViewHeaderDirective = (function () {
    function TKListViewHeaderDirective(owner, template) {
        this.owner = owner;
        this.template = template;
    }
    TKListViewHeaderDirective.prototype.ngOnInit = function () {
        this.owner.headerTemplate = this.template;
    };
    TKListViewHeaderDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[tkListViewHeader]"
                },] },
    ];
    /** @nocollapse */
    TKListViewHeaderDirective.ctorParameters = function () { return [
        { type: RadListViewComponent, decorators: [{ type: core_1.Inject, args: [RadListViewComponent,] },] },
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Inject, args: [core_1.TemplateRef,] },] },
    ]; };
    return TKListViewHeaderDirective;
}());
exports.TKListViewHeaderDirective = TKListViewHeaderDirective;
var TKListViewFooterDirective = (function () {
    function TKListViewFooterDirective(owner, template) {
        this.owner = owner;
        this.template = template;
    }
    TKListViewFooterDirective.prototype.ngOnInit = function () {
        this.owner.footerTemplate = this.template;
    };
    TKListViewFooterDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[tkListViewFooter]"
                },] },
    ];
    /** @nocollapse */
    TKListViewFooterDirective.ctorParameters = function () { return [
        { type: RadListViewComponent, decorators: [{ type: core_1.Inject, args: [RadListViewComponent,] },] },
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Inject, args: [core_1.TemplateRef,] },] },
    ]; };
    return TKListViewFooterDirective;
}());
exports.TKListViewFooterDirective = TKListViewFooterDirective;
var TKListViewItemSwipeDirective = (function () {
    function TKListViewItemSwipeDirective(owner, template) {
        this.owner = owner;
        this.template = template;
    }
    TKListViewItemSwipeDirective.prototype.ngOnInit = function () {
        this.owner.itemSwipeTemplate = this.template;
    };
    TKListViewItemSwipeDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[tkListItemSwipeTemplate]"
                },] },
    ];
    /** @nocollapse */
    TKListViewItemSwipeDirective.ctorParameters = function () { return [
        { type: RadListViewComponent, decorators: [{ type: core_1.Inject, args: [RadListViewComponent,] },] },
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Inject, args: [core_1.TemplateRef,] },] },
    ]; };
    return TKListViewItemSwipeDirective;
}());
exports.TKListViewItemSwipeDirective = TKListViewItemSwipeDirective;
var TKListViewItemDirective = (function () {
    function TKListViewItemDirective(owner, template) {
        this.owner = owner;
        this.template = template;
    }
    TKListViewItemDirective.prototype.ngOnInit = function () {
        this.owner.itemTemplate = this.template;
    };
    TKListViewItemDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[tkListItemTemplate]"
                },] },
    ];
    /** @nocollapse */
    TKListViewItemDirective.ctorParameters = function () { return [
        { type: RadListViewComponent, decorators: [{ type: core_1.Inject, args: [RadListViewComponent,] },] },
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Inject, args: [core_1.TemplateRef,] },] },
    ]; };
    return TKListViewItemDirective;
}());
exports.TKListViewItemDirective = TKListViewItemDirective;
var TKTemplateKeyDirective = (function () {
    function TKTemplateKeyDirective(templateRef, owner) {
        this.templateRef = templateRef;
        this.owner = owner;
    }
    Object.defineProperty(TKTemplateKeyDirective.prototype, "tkTemplateKey", {
        set: function (value) {
            if (this.owner && this.templateRef) {
                this.owner.registerTemplate(value, this.templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    TKTemplateKeyDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[tkTemplateKey]"
                },] },
    ];
    /** @nocollapse */
    TKTemplateKeyDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
        { type: RadListViewComponent, decorators: [{ type: core_1.Host },] },
    ]; };
    TKTemplateKeyDirective.propDecorators = {
        "tkTemplateKey": [{ type: core_1.Input },],
    };
    return TKTemplateKeyDirective;
}());
exports.TKTemplateKeyDirective = TKTemplateKeyDirective;
var TKListViewLoadOnDemandDirective = (function () {
    function TKListViewLoadOnDemandDirective(owner, template) {
        this.owner = owner;
        this.template = template;
    }
    TKListViewLoadOnDemandDirective.prototype.ngOnInit = function () {
        this.owner.loadOnDemandTemplate = this.template;
    };
    TKListViewLoadOnDemandDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[tkListLoadOnDemandTemplate]"
                },] },
    ];
    /** @nocollapse */
    TKListViewLoadOnDemandDirective.ctorParameters = function () { return [
        { type: RadListViewComponent, decorators: [{ type: core_1.Inject, args: [RadListViewComponent,] },] },
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Inject, args: [core_1.TemplateRef,] },] },
    ]; };
    return TKListViewLoadOnDemandDirective;
}());
exports.TKListViewLoadOnDemandDirective = TKListViewLoadOnDemandDirective;
var TKListViewLayoutDirective = (function () {
    function TKListViewLayoutDirective(owner, _elementRef) {
        this.owner = owner;
        this._elementRef = _elementRef;
    }
    TKListViewLayoutDirective.prototype.ngOnInit = function () {
        var layout = this._elementRef.nativeElement;
        this.owner.setLayout(layout);
    };
    TKListViewLayoutDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[tkListViewLayout]"
                },] },
    ];
    /** @nocollapse */
    TKListViewLayoutDirective.ctorParameters = function () { return [
        { type: RadListViewComponent, decorators: [{ type: core_1.Inject, args: [RadListViewComponent,] },] },
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
    ]; };
    return TKListViewLayoutDirective;
}());
exports.TKListViewLayoutDirective = TKListViewLayoutDirective;
function getItemViewRoot(viewRef, rootLocator) {
    if (rootLocator === void 0) { rootLocator = element_registry_1.getSingleViewRecursive; }
    return rootLocator(viewRef.rootNodes, 0);
}
exports.getItemViewRoot = getItemViewRoot;
exports.LISTVIEW_DIRECTIVES = [RadListViewComponent, TKListViewItemDirective, TKListViewItemSwipeDirective, TKListViewHeaderDirective, TKListViewFooterDirective, TKListViewLoadOnDemandDirective, TKListViewLayoutDirective, ListViewGridLayoutDirective, ListViewStaggeredLayoutDirective, ReorderHandleDirective, ListViewLinearLayoutDirective, TKTemplateKeyDirective];
element_registry_1.registerElement("RadListView", function () { return _1.RadListView; });
element_registry_1.registerElement("ListViewLinearLayout", function () { return _1.ListViewLinearLayout; });
element_registry_1.registerElement("ListViewGridLayout", function () { return _1.ListViewGridLayout; });
element_registry_1.registerElement("ListViewStaggeredLayout", function () { return _1.ListViewStaggeredLayout; });
element_registry_1.registerElement("ReorderHandle", function () { return _1.ReorderHandle; });
var NativeScriptUIListViewModule = (function () {
    function NativeScriptUIListViewModule() {
    }
    NativeScriptUIListViewModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [exports.LISTVIEW_DIRECTIVES],
                    exports: [exports.LISTVIEW_DIRECTIVES],
                    schemas: [
                        core_1.NO_ERRORS_SCHEMA
                    ]
                },] },
    ];
    /** @nocollapse */
    NativeScriptUIListViewModule.ctorParameters = function () { return []; };
    return NativeScriptUIListViewModule;
}());
exports.NativeScriptUIListViewModule = NativeScriptUIListViewModule;


/***/ }),

/***/ 459:
/*!****************************************************************!*\
  !*** ../node_modules/nativescript-pro-ui/listview/listview.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var observableArray = __webpack_require__(/*! tns-core-modules/data/observable-array */ 36);
var listViewCommonModule = __webpack_require__(/*! ./listview-common */ 460);
var layoutsModule = __webpack_require__(/*! tns-core-modules/ui/layouts/stack-layout */ 53);
var applicationModule = __webpack_require__(/*! tns-core-modules/application */ 5);
var view_1 = __webpack_require__(/*! tns-core-modules/ui/core/view */ 0);
var color_1 = __webpack_require__(/*! tns-core-modules/color */ 39);
var utilsModule = __webpack_require__(/*! tns-core-modules/utils/utils */ 10);
var lastFiredEvent;
var lastSelectedIndex;
__webpack_require__(/*! utils/module-merge */ 326).merge(listViewCommonModule, exports);
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = "itemTemplate";
    knownTemplates.itemSwipeTemplate = "itemSwipeTemplate";
    knownTemplates.loadOnDemandItemTemplate = "loadOnDemandItemTemplate";
    knownTemplates.headerItemTemplate = "headerItemTemplate";
    knownTemplates.footerItemTemplate = "footerItemTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
var knownMultiTemplates;
(function (knownMultiTemplates) {
    knownMultiTemplates.itemTemplates = "itemTemplates";
})(knownMultiTemplates = exports.knownMultiTemplates || (exports.knownMultiTemplates = {}));
var ReorderHandle = (function (_super) {
    __extends(ReorderHandle, _super);
    function ReorderHandle() {
        return _super.call(this) || this;
    }
    return ReorderHandle;
}(listViewCommonModule.ReorderHandle));
exports.ReorderHandle = ReorderHandle;
var ExtendedReorderWithHandlesBehaviorClass;
function ensureExtendedReorderWithHandlesBehavior() {
    if (ExtendedReorderWithHandlesBehaviorClass) {
        return;
    }
    var ExtendedReorderWithHandlesBehavior = (function (_super) {
        __extends(ExtendedReorderWithHandlesBehavior, _super);
        function ExtendedReorderWithHandlesBehavior(viewId) {
            var _this = _super.call(this, viewId) || this;
            return global.__native(_this);
        }
        ExtendedReorderWithHandlesBehavior.prototype.getReorderHandleOverride = function (itemView) {
            var itemIndex = this.owner().getChildAdapterPosition(itemView);
            var nsViewForItem = this.nsOwner._listViewAdapter.getViewForItem(this.nsOwner.getItemAtIndex(itemIndex));
            var reorderHandle = undefined;
            nsViewForItem.eachChildView(function (view) {
                if (view instanceof ReorderHandle) {
                    reorderHandle = view;
                    return false;
                }
                return true;
            });
            return reorderHandle === undefined ? itemView : reorderHandle.nativeViewProtected;
        };
        return ExtendedReorderWithHandlesBehavior;
    }(com.telerik.widget.list.ReorderWithHandlesBehavior));
    ExtendedReorderWithHandlesBehaviorClass = ExtendedReorderWithHandlesBehavior;
}
var ListViewAdapterClass;
function ensureListViewAdapter() {
    if (ListViewAdapterClass) {
        return;
    }
    // We need this class because it is the point where we plug-in into the listView
    // and use the defined itemTemplate to create the native Android item views and
    // pass it to the control.
    var 
    // We need this class because it is the point where we plug-in into the listView
    // and use the defined itemTemplate to create the native Android item views and
    // pass it to the control.
    ListViewAdapter = (function (_super) {
        __extends(ListViewAdapter, _super);
        function ListViewAdapter(items, listView) {
            var _this = _super.call(this, items) || this;
            _this._selectionViewId = applicationModule.android.context.getResources().getIdentifier("selectable_item_background", "drawable", applicationModule.android.context.getPackageName());
            _this.templateTypeNumberString = new Map();
            _this._currentNativeItemType = 0;
            _this.ownerLv = listView;
            _this._viewHolders = new Array();
            _this._swipeHolders = new Array();
            return global.__native(_this);
        }
        ListViewAdapter.prototype.getKeyByValue = function (inputValue) {
            var result;
            this.templateTypeNumberString.forEach(function (value, key, map) {
                if (value == inputValue) {
                    result = key;
                }
            }, this);
            return result;
        };
        ListViewAdapter.prototype.clearTemplateTypes = function () {
            this._currentNativeItemType = 0;
            this.templateTypeNumberString.clear();
        };
        ListViewAdapter.prototype.onCreateViewHolder = function (parent, viewType) {
            var templateType = this.getKeyByValue(viewType);
            var view = this.ownerLv.getViewForViewType(listViewCommonModule.ListViewViewTypes.ItemView, templateType);
            var parentView = new layoutsModule.StackLayout();
            var layoutParams = this.ownerLv._getViewLayoutParams();
            parentView.orientation = "vertical";
            parentView.addChild(view);
            this.ownerLv._addView(parentView);
            parentView.nativeView.setLayoutParams(layoutParams);
            parentView.nativeView.setBackgroundResource(this._selectionViewId);
            var holder = new com.telerik.widget.list.ListViewHolder(parentView.nativeView);
            holder['nsView'] = parentView;
            this._viewHolders.push(holder);
            return holder;
        };
        ListViewAdapter.prototype.getItemViewType = function (position) {
            var resultType = 0;
            if (this.ownerLv.itemTemplateSelector) {
                var selector = this.ownerLv.itemTemplateSelector;
                if (selector) {
                    var selectorType = selector(this.ownerLv.getItemAtIndex(position), position, this.ownerLv.items);
                    if (!this.templateTypeNumberString.has(selectorType)) {
                        this.templateTypeNumberString.set(selectorType, this._currentNativeItemType);
                        this._currentNativeItemType++;
                    }
                    resultType = this.templateTypeNumberString.get(selectorType);
                }
            }
            return resultType;
        };
        ListViewAdapter.prototype.onBindViewHolder = function (holder, position) {
            holder['nsView'].bindingContext = this.ownerLv.getItemAtIndex(position);
            var args = {
                eventName: listViewCommonModule.RadListView.itemLoadingEvent,
                index: position,
                object: this.ownerLv,
                view: holder['nsView']._subViews[0],
                android: holder
            };
            this.ownerLv.notify(args);
        };
        ListViewAdapter.prototype.onCreateSwipeContentHolder = function (parent) {
            //var swipeView = builder.parse(this.ownerLv.itemSwipeTemplate);
            var swipeView = this.ownerLv.getViewForViewType(listViewCommonModule.ListViewViewTypes.ItemSwipeView);
            this.ownerLv._addView(swipeView);
            var holder = new com.telerik.widget.list.ListViewHolder(swipeView.nativeView);
            holder['nsView'] = swipeView;
            this._swipeHolders.push(holder);
            return holder;
        };
        ListViewAdapter.prototype.onBindSwipeContentHolder = function (holder, position) {
            holder['nsView'].bindingContext = this.ownerLv.getItemAtIndex(position);
        };
        ListViewAdapter.prototype.canReorder = function (itemIndex) {
            var result = _super.prototype.canReorder.call(this, itemIndex);
            var view = this.ownerLv.getViewForItem(this.ownerLv.getItemAtIndex(itemIndex));
            var args = {
                eventName: listViewCommonModule.RadListView.itemReorderStartingEvent,
                object: this.ownerLv,
                index: itemIndex,
                groupIndex: -1,
                data: undefined,
                returnValue: true,
                view: view
            };
            this.ownerLv.notify(args);
            return args.returnValue;
        };
        ListViewAdapter.prototype.reorderItem = function (oldPosition, newPosition) {
            var result = _super.prototype.reorderItem.call(this, oldPosition, newPosition);
            if (result === true) {
                this.ownerLv._reorderItemInSource(oldPosition, newPosition);
            }
            return result;
        };
        ListViewAdapter.prototype.setItems = function (items) {
            this._viewHolders.splice(0, this._viewHolders.length);
            this._swipeHolders.splice(0, this._swipeHolders.length);
            this.ownerLv._resetCurrentId();
            _super.prototype.setItems.call(this, items);
        };
        ListViewAdapter.prototype.canSwipe = function (position) {
            if (!_super.prototype.canSwipe.call(this, position)) {
                return false;
            }
            var args = {
                eventName: listViewCommonModule.RadListView.itemSwipingEvent,
                object: this.ownerLv,
                index: position,
                groupIndex: -1,
                returnValue: true
            };
            this.ownerLv.notify(args);
            return args.returnValue;
        };
        ListViewAdapter.prototype.canSelect = function (position) {
            var canSelect = true;
            if (this.ownerLv.items) {
                var dataItem = this.ownerLv.getItemAtIndex(position);
                var isSelected = this.ownerLv.isItemSelected(dataItem);
                var currentEventName = isSelected === true ? listViewCommonModule.RadListView.itemDeselectingEvent : listViewCommonModule.RadListView.itemSelectingEvent;
                var view = this.ownerLv.getViewForItem(dataItem);
                var args = {
                    eventName: currentEventName,
                    object: this.ownerLv,
                    index: position,
                    groupIndex: -1,
                    returnValue: true,
                    view: view
                };
                if ((lastSelectedIndex != position) || (lastSelectedIndex == position && lastFiredEvent != currentEventName)) {
                    lastSelectedIndex = position;
                    this.ownerLv.notify(args);
                    canSelect = args.returnValue === true;
                    lastFiredEvent = currentEventName;
                }
            }
            return canSelect;
        };
        ListViewAdapter.prototype.getViewForItem = function (item) {
            for (var i = 0; i < this._viewHolders.length; i++) {
                if (this._viewHolders[i]['nsView'] && this._viewHolders[i]['nsView'].bindingContext === item) {
                    return this._viewHolders[i]['nsView'].getChildAt(0);
                }
            }
            return undefined;
        };
        ListViewAdapter.prototype.getSwipeViewForItem = function (item) {
            for (var i = 0; i < this._swipeHolders.length; i++) {
                if (this._swipeHolders[i]['nsView'] && this._swipeHolders[i]['nsView'].bindingContext === item) {
                    return this._swipeHolders[i]['nsView'];
                }
            }
            return undefined;
        };
        return ListViewAdapter;
    }(com.telerik.widget.list.ListViewAdapter));
    ListViewAdapterClass = ListViewAdapter;
}
var ListViewDataSourceAdapterClass;
function ensureListViewDataSourceAdapter() {
    if (ListViewDataSourceAdapterClass) {
        return;
    }
    var ListViewDataSourceAdapter = (function (_super) {
        __extends(ListViewDataSourceAdapter, _super);
        function ListViewDataSourceAdapter(items, listView) {
            var _this = _super.call(this, items) || this;
            _this._selectionViewId = applicationModule.android.context.getResources().getIdentifier("selectable_item_background", "drawable", applicationModule.android.context.getPackageName());
            _this.ownerLv = listView;
            _this._viewHolders = new Array();
            _this._swipeHolders = new Array();
            return global.__native(_this);
        }
        // TODO: Implement this for support for 'group item' template, current stopper is the expand/collapse button that is part of the native template
        // public onCreateGroupViewHolder(parent: android.view.ViewGroup, viewType: number): com.telerik.widget.list.ListViewHolder {
        //     console.log(">>> onCreateGroupViewHolder");
        //     //var view = builder.parse(this.ownerLv.itemTemplate);
        //     var view = this.ownerLv.getViewForViewType(listViewCommonModule.ListViewViewTypes.ItemView);
        //     var parentView = new layoutsModule.StackLayout();
        //     var layoutParams = this.ownerLv._getViewLayoutParams();
        //     parentView.orientation = "vertical";
        //     parentView.addChild(view);
        //     this.ownerLv._addView(parentView);
        //     parentView.android.setLayoutParams(layoutParams);
        //     parentView.android.setBackgroundResource(this._selectionViewId);
        //     var holder = new com.telerik.widget.list.ListViewHolder(parentView.android);
        //     holder['nsView'] = parentView;
        //     this._viewHolders.push(holder);
        //     return holder;
        // }
        // TODO: Implement this for support for 'group item' template, current stopper is the expand/collapse button that is part of the native template
        // public onCreateGroupViewHolder(parent: android.view.ViewGroup, viewType: number): com.telerik.widget.list.ListViewHolder {
        //     console.log(">>> onCreateGroupViewHolder");
        //     //var view = builder.parse(this.ownerLv.itemTemplate);
        //     var view = this.ownerLv.getViewForViewType(listViewCommonModule.ListViewViewTypes.ItemView);
        //     var parentView = new layoutsModule.StackLayout();
        //     var layoutParams = this.ownerLv._getViewLayoutParams();
        //     parentView.orientation = "vertical";
        //     parentView.addChild(view);
        //     this.ownerLv._addView(parentView);
        //     parentView.android.setLayoutParams(layoutParams);
        //     parentView.android.setBackgroundResource(this._selectionViewId);
        //     var holder = new com.telerik.widget.list.ListViewHolder(parentView.android);
        //     holder['nsView'] = parentView;
        //     this._viewHolders.push(holder);
        //     return holder;
        // }
        ListViewDataSourceAdapter.prototype.onCreateItemViewHolder = 
        // TODO: Implement this for support for 'group item' template, current stopper is the expand/collapse button that is part of the native template
        // public onCreateGroupViewHolder(parent: android.view.ViewGroup, viewType: number): com.telerik.widget.list.ListViewHolder {
        //     console.log(">>> onCreateGroupViewHolder");
        //     //var view = builder.parse(this.ownerLv.itemTemplate);
        //     var view = this.ownerLv.getViewForViewType(listViewCommonModule.ListViewViewTypes.ItemView);
        //     var parentView = new layoutsModule.StackLayout();
        //     var layoutParams = this.ownerLv._getViewLayoutParams();
        //     parentView.orientation = "vertical";
        //     parentView.addChild(view);
        //     this.ownerLv._addView(parentView);
        //     parentView.android.setLayoutParams(layoutParams);
        //     parentView.android.setBackgroundResource(this._selectionViewId);
        //     var holder = new com.telerik.widget.list.ListViewHolder(parentView.android);
        //     holder['nsView'] = parentView;
        //     this._viewHolders.push(holder);
        //     return holder;
        // }
        function (parent, viewType) {
            var view = this.ownerLv.getViewForViewType(listViewCommonModule.ListViewViewTypes.ItemView);
            var parentView = new layoutsModule.StackLayout();
            var layoutParams = this.ownerLv._getViewLayoutParams();
            parentView.orientation = "vertical";
            parentView.addChild(view);
            this.ownerLv._addView(parentView);
            parentView.android.setLayoutParams(layoutParams);
            parentView.android.setBackgroundResource(this._selectionViewId);
            var holder = new com.telerik.widget.list.ListViewHolder(parentView.android);
            holder['nsView'] = parentView;
            this._viewHolders.push(holder);
            return holder;
        };
        ListViewDataSourceAdapter.prototype.onBindItemViewHolder = function (holder, position) {
            holder['nsView'].bindingContext = this.ownerLv.getItemAtIndex(position);
            var args = {
                eventName: listViewCommonModule.RadListView.itemLoadingEvent,
                index: position,
                view: holder['nsView']._subViews[0],
                android: holder
            };
            this.ownerLv.notify(args);
        };
        ListViewDataSourceAdapter.prototype.onCreateSwipeContentHolder = function (parent) {
            var swipeView = this.ownerLv.getViewForViewType(listViewCommonModule.ListViewViewTypes.ItemSwipeView);
            this.ownerLv._addView(swipeView);
            var holder = new com.telerik.widget.list.ListViewHolder(swipeView.android);
            holder['nsView'] = swipeView;
            this._swipeHolders.push(holder);
            return holder;
        };
        ListViewDataSourceAdapter.prototype.onBindSwipeContentHolder = function (holder, position) {
            holder['nsView'].bindingContext = this.ownerLv.getItemAtIndex(position);
        };
        ListViewDataSourceAdapter.prototype.reorderItem = function (oldPosition, newPosition) {
            var result = _super.prototype.reorderItem.call(this, oldPosition, newPosition);
            if (result === true) {
                this.ownerLv._reorderItemInSource(oldPosition, newPosition);
            }
            return result;
        };
        ListViewDataSourceAdapter.prototype.setItems = function (items) {
            this._viewHolders.splice(0, this._viewHolders.length);
            this._swipeHolders.splice(0, this._swipeHolders.length);
            this.ownerLv._resetCurrentId();
            _super.prototype.setItems.call(this, items);
        };
        ListViewDataSourceAdapter.prototype.canSwipe = function (position) {
            if (!_super.prototype.canSwipe.call(this, position)) {
                return false;
            }
            var args = {
                eventName: listViewCommonModule.RadListView.itemSwipingEvent,
                object: this.ownerLv,
                index: position,
                groupIndex: -1,
                returnValue: true
            };
            this.ownerLv.notify(args);
            return args.returnValue;
        };
        ListViewDataSourceAdapter.prototype.canSelect = function (position) {
            if (this.ownerLv.items) {
                var isSelected = this.ownerLv.isItemSelected(this.ownerLv.getItemAtIndex(position));
                var currentEventName = isSelected === true ? listViewCommonModule.RadListView.itemDeselectingEvent : listViewCommonModule.RadListView.itemSelectingEvent;
                var args = {
                    eventName: currentEventName,
                    object: this.ownerLv,
                    index: position,
                    groupIndex: -1,
                    returnValue: true
                };
                if ((lastSelectedIndex != position) || (lastSelectedIndex == position && lastFiredEvent != currentEventName)) {
                    lastSelectedIndex = position;
                    this.ownerLv.notify(args);
                    lastFiredEvent = currentEventName;
                }
            }
            return true;
        };
        ListViewDataSourceAdapter.prototype.getViewForItem = function (item) {
            for (var i = 0; i < this._viewHolders.length; i++) {
                if (this._viewHolders[i]['nsView'] && this._viewHolders[i]['nsView'].bindingContext === item) {
                    return this._viewHolders[i]['nsView'].getChildAt(0);
                }
            }
            return undefined;
        };
        ListViewDataSourceAdapter.prototype.getSwipeViewForItem = function (item) {
            for (var i = 0; i < this._swipeHolders.length; i++) {
                if (this._swipeHolders[i]['nsView'] && this._swipeHolders[i]['nsView'].bindingContext === item) {
                    return this._swipeHolders[i]['nsView'];
                }
            }
            return undefined;
        };
        return ListViewDataSourceAdapter;
    }(com.telerik.widget.list.ListViewDataSourceAdapter));
    ListViewDataSourceAdapterClass = ListViewDataSourceAdapter;
}
var RadListView = (function (_super) {
    __extends(RadListView, _super);
    function RadListView() {
        var _this = _super.call(this) || this;
        _this._currentId = 0;
        _this._androidViewId = -1;
        ensureListViewAdapter();
        ensureListViewDataSourceAdapter();
        _this.listViewLayout = new ListViewLinearLayout();
        _this.on("bindingContextChange", _this.bindingContextChanged, _this);
        return _this;
    }
    RadListView.prototype.createNativeView = function () {
        this._android = new com.telerik.widget.list.RadListView(this._context);
        this._rootLayout = new android.widget.FrameLayout(this._context);
        this._rootLayout.addView(this._android);
        if (this.listViewLayout) {
            this.listViewLayout._onOwnerUICreated();
        }
        else {
            this.listViewLayout = new ListViewLinearLayout();
        }
        this.loadData();
        this.subscribeForNativeScrollEvents();
        this.updateSelectionBehavior();
        this.updateReorderBehavior();
        this.updateLoadOnDemandBehavior();
        this.updatePullToRefreshBehavior();
        this.updateSwipeToExecuteBehavior();
        this.updateSwipeActionsBehavior();
        this.updateCollapsibleGroupsBehavior();
        this._updateHeaderFooter();
        var that = new WeakRef(this);
        this._android.addItemClickListener(new com.telerik.widget.list.RadListView.ItemClickListener({
            onItemClick: function (itemPosition, motionEvent) {
                var listView = that.get();
                var tappedView = listView._listViewAdapter.getViewForItem(listView.getItemAtIndex(itemPosition));
                var args = {
                    android: motionEvent,
                    eventName: listViewCommonModule.RadListView.itemTapEvent,
                    object: listView,
                    view: tappedView,
                    index: itemPosition,
                    groupIndex: -1
                };
                that.get().notify(args);
            },
            onItemLongClick: function (itemPosition, motionEvent) {
                var listView = that.get();
                var tappedView = listView._listViewAdapter.getViewForItem(listView.getItemAtIndex(itemPosition));
                var args = {
                    android: motionEvent,
                    eventName: listViewCommonModule.RadListView.itemHoldEvent,
                    object: listView,
                    view: tappedView,
                    index: itemPosition,
                    groupIndex: -1
                };
                that.get().notify(args);
            }
        }));
        return this._rootLayout;
    };
    RadListView.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);
    };
    RadListView.prototype.disposeNativeView = function () {
        if (this._scrollStateListener) {
            this._android.removeOnScrollListener(this._scrollStateListener);
        }
        if (this._selectionBehavior) {
            this._android.removeBehavior(this._selectionBehavior);
            this._selectionBehavior = undefined;
        }
        if (this._reorderBehavior) {
            this._android.removeBehavior(this._reorderBehavior);
            this._reorderBehavior = undefined;
        }
        if (this._loadOnDemandBehavior) {
            this._android.removeBehavior(this._loadOnDemandBehavior);
            this._loadOnDemandBehavior = undefined;
        }
        if (this._swipeExecuteBehavior) {
            this._android.removeBehavior(this._swipeExecuteBehavior);
            this._swipeExecuteBehavior = undefined;
        }
        if (this._swipeActionsBehavior) {
            this._android.removeBehavior(this._swipeActionsBehavior);
            this._swipeActionsBehavior = undefined;
        }
        if (this._pullToRefreshBehavior) {
            this._android.removeBehavior(this._pullToRefreshBehavior);
            this._pullToRefreshBehavior = undefined;
        }
        if (this._android) {
            this._android.setAdapter(null);
        }
        _super.prototype.disposeNativeView.call(this);
    };
    RadListView.prototype._resetCurrentId = function () {
        this._currentId = 0;
    };
    RadListView.prototype._getUniqueItemId = function () {
        return this._currentId++;
    };
    Object.defineProperty(RadListView.prototype, "androidListView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "_childrenCount", {
        get: function () {
            var templatesCount = 0;
            if (this._headerView) {
                templatesCount++;
            }
            if (this._footerView) {
                templatesCount++;
            }
            if (this._listViewAdapter === undefined) {
                return 0;
            }
            if (!this._listViewAdapter._viewHolders) {
                return 0;
            }
            return this._listViewAdapter._viewHolders.length + this._listViewAdapter._swipeHolders.length + templatesCount;
            ;
        },
        enumerable: true,
        configurable: true
    });
    RadListView.prototype.eachChildView = function (callback) {
        if (this._headerView) {
            callback(this._headerView);
        }
        if (this._footerView) {
            callback(this._footerView);
        }
        if (this._listViewAdapter === undefined) {
            return;
        }
        if (this._listViewAdapter._viewHolders) {
            this._listViewAdapter._viewHolders.forEach(function (value, key) {
                callback(value['nsView']);
            }, this);
        }
        if (this._listViewAdapter._swipeHolders) {
            this._listViewAdapter._swipeHolders.forEach(function (value, key) {
                callback(value['nsView']);
            }, this);
        }
    };
    RadListView.prototype._getViewLayoutParams = function () {
        var layoutParams = new org.nativescript.widgets.CommonLayoutParams();
        if (this.listViewLayout instanceof ListViewLinearLayout) {
            if (this.listViewLayout.scrollDirection.toLowerCase() === listViewCommonModule.ListViewScrollDirection.Vertical.toLowerCase()) {
                layoutParams.width = org.nativescript.widgets.CommonLayoutParams.MATCH_PARENT;
                layoutParams.height = org.nativescript.widgets.CommonLayoutParams.WRAP_CONTENT;
            }
            else if (this.listViewLayout.scrollDirection.toLowerCase() === listViewCommonModule.ListViewScrollDirection.Horizontal.toLowerCase()) {
                layoutParams.width = org.nativescript.widgets.CommonLayoutParams.WRAP_CONTENT;
                layoutParams.height = org.nativescript.widgets.CommonLayoutParams.MATCH_PARENT;
            }
        }
        return layoutParams;
    };
    RadListView.prototype.isItemSelected = function (item) {
        if (this._selectionBehavior) {
            var nativeSelectedItems = this._selectionBehavior.selectedItems();
            for (var i = 0; i < nativeSelectedItems.size(); i++) {
                var nativeSelectedItem = nativeSelectedItems.get(i);
                var currentNativeIndex = this._listViewAdapter.getItems().indexOf(nativeSelectedItem);
                var sourceSelectedItem = this.getItemAtIndex(currentNativeIndex);
                if (sourceSelectedItem === item) {
                    return true;
                }
            }
        }
        return false;
    };
    RadListView.prototype.selectAll = function () {
        _super.prototype.selectAll.call(this);
        if (!this.items) {
            return;
        }
        if (this._selectionBehavior) {
            for (var i = 0; i < this.items.length; i++) {
                this._selectionBehavior.changeIsSelected(i, true);
            }
        }
    };
    RadListView.prototype.deselectAll = function () {
        if (!this.items) {
            return;
        }
        if (this._selectionBehavior) {
            for (var i = 0; i < this.items.length; i++) {
                this._selectionBehavior.changeIsSelected(i, false);
            }
        }
    };
    RadListView.prototype.selectItemAt = function (index) {
        if (this._selectionBehavior) {
            this._selectionBehavior.changeIsSelected(index, true);
        }
    };
    RadListView.prototype.deselectItemAt = function (index) {
        if (this._selectionBehavior) {
            this._selectionBehavior.changeIsSelected(index, false);
        }
    };
    RadListView.prototype.getViewForItem = function (item) {
        if (item === undefined) {
            throw new Error("Item must be an object from the currently assigned source.");
        }
        if (this._listViewAdapter === undefined) {
            return undefined;
        }
        return this._listViewAdapter.getViewForItem(item);
    };
    RadListView.prototype.getSelectedItems = function () {
        if (this._selectionBehavior) {
            var selectedItems = new Array();
            var nativeSelectedItems = this._selectionBehavior.selectedItems();
            for (var i = 0; i < nativeSelectedItems.size(); i++) {
                selectedItems.push(this.getItemAtIndex(this._android.getAdapter().getItems().indexOf(nativeSelectedItems.get(i))));
            }
            return selectedItems;
        }
        return _super.prototype.getSelectedItems.call(this);
    };
    RadListView.prototype.onPullToRefreshStyleChanged = function (oldValue, newValue) {
        this.updatePullToRefreshBehavior();
    };
    RadListView.prototype.onItemViewLoaderChanged = function () {
        if (this.itemViewLoader) {
            this.updateSelectionBehavior();
            this.updateReorderBehavior();
            this.updateLoadOnDemandBehavior();
            this.updatePullToRefreshBehavior();
            this.updateSwipeToExecuteBehavior();
            this.loadData();
        }
    };
    RadListView.prototype.onHeaderItemTemplateChanged = function (oldValue, newValue) {
        _super.prototype.onHeaderItemTemplateChanged.call(this, oldValue, newValue);
        if (this._android) {
            this._updateHeaderFooter();
        }
    };
    RadListView.prototype.onFooterItemTemplateChanged = function (oldValue, newValue) {
        _super.prototype.onFooterItemTemplateChanged.call(this, oldValue, newValue);
        if (this._android) {
            this._updateHeaderFooter();
        }
    };
    RadListView.prototype.onListViewLayoutChanged = function (oldValue, newValue) {
        _super.prototype.onListViewLayoutChanged.call(this, oldValue, newValue);
        if (oldValue) {
            var newLayout = oldValue;
            newLayout._reset();
        }
        if (newValue) {
            var newLayout = newValue;
            newLayout._init(this);
        }
    };
    RadListView.prototype.onItemTemplateSelectorChanged = function (oldValue, newValue) {
        _super.prototype.onItemTemplateSelectorChanged.call(this, oldValue, newValue);
        if (this._listViewAdapter) {
            this._listViewAdapter.clearTemplateTypes();
        }
        this.loadData();
    };
    RadListView.prototype.onItemTemplateChanged = function (oldValue, newValue) {
        _super.prototype.onItemTemplateChanged.call(this, oldValue, newValue); //todo: update current template with the new one
        this.loadData();
    };
    RadListView.prototype.onItemTemplatesChanged = function (oldValue, newValue) {
        _super.prototype.onItemTemplatesChanged.call(this, oldValue, newValue);
        this.loadData();
    };
    RadListView.prototype.itemSwipeTemplateChanged = function (oldValue, newValue) {
        _super.prototype.onItemSwipeTemplateChanged.call(this, oldValue, newValue);
        this.updateSwipeToExecuteBehavior();
        this.updateSwipeActionsBehavior();
        this.loadData();
    };
    RadListView.prototype.onMultipleSelectionChanged = function (oldValue, newValue) {
        _super.prototype.onMultipleSelectionChanged.call(this, oldValue, newValue);
        this.updateSelectionBehavior();
    };
    RadListView.prototype.onItemReorderChanged = function (oldValue, newValue) {
        _super.prototype.onItemReorderChanged.call(this, oldValue, newValue);
        this.updateReorderBehavior();
    };
    RadListView.prototype.onItemSwipeChanged = function (oldValue, newValue) {
        _super.prototype.onItemSwipeChanged.call(this, oldValue, newValue);
        this.updateSwipeToExecuteBehavior();
    };
    RadListView.prototype.onSwipeActionsChanged = function (oldValue, newValue) {
        _super.prototype.onSwipeActionsChanged.call(this, oldValue, newValue);
        this.updateSwipeActionsBehavior();
    };
    RadListView.prototype.onPullToRefreshChanged = function (oldValue, newValue) {
        _super.prototype.onPullToRefreshChanged.call(this, oldValue, newValue);
        this.updatePullToRefreshBehavior();
    };
    RadListView.prototype.onLoadOnDemandModeChanged = function (oldValue, newValue) {
        _super.prototype.onLoadOnDemandModeChanged.call(this, oldValue, newValue);
        this.updateLoadOnDemandBehavior();
    };
    RadListView.prototype.onLoadOnDemandBufferSizeChanged = function (oldValue, newValue) {
        _super.prototype.onLoadOnDemandBufferSizeChanged.call(this, oldValue, newValue);
        this.updateLoadOnDemandBehavior();
    };
    RadListView.prototype.onSelectionBehaviorChanged = function (oldValue, newValue) {
        _super.prototype.onSelectionBehaviorChanged.call(this, oldValue, newValue);
        this.updateSelectionBehavior();
    };
    RadListView.prototype.onLoadOnDemandItemTemplateChanged = function (oldValue, newValue) {
        _super.prototype.onLoadOnDemandItemTemplateChanged.call(this, oldValue, newValue);
        this.updateLoadOnDemandBehavior();
    };
    RadListView.prototype.onSourceCollectionChanged = function (data) {
        if (this._android === undefined) {
            return;
        }
        if (data.action === observableArray.ChangeType.Update) {
            var itemValue = this._listViewAdapter.getItem(data.index);
            this._listViewAdapter.remove(data.index);
            this._listViewAdapter.add(data.index, itemValue);
        }
        else if (data.action === observableArray.ChangeType.Delete) {
            this._listViewAdapter.remove(data.index);
        }
        else if (data.action === observableArray.ChangeType.Add) {
            for (var i = 0; i < data.addedCount; i++) {
                if (isNaN(data.index)) {
                    this._listViewAdapter.add(new java.lang.Integer(this._getUniqueItemId()));
                }
                else {
                    this._listViewAdapter.add(data.index, new java.lang.Integer(this._getUniqueItemId()));
                }
            }
        }
        else if (data.action === observableArray.ChangeType.Splice) {
            if (data.removed && (data.removed.length > 0)) {
                for (var i = 0; i < data.removed.length; i++) {
                    this._listViewAdapter.remove(data.index + (data.removed.length - 1) - i);
                }
            }
            else {
                for (var i = 0; i < data.addedCount; i++) {
                    this._listViewAdapter.add(data.index + i, new java.lang.Integer(this._getUniqueItemId()));
                }
            }
        }
    };
    RadListView.prototype.onEnableCollapsibleGroupsChanged = function (oldValue, newValue) {
        this.loadData();
    };
    RadListView.prototype.onGroupingFunctionChanged = function (oldValue, newValue) {
        if (newValue) {
            this.loadData();
        }
        else {
            this.clearGroupDescriptors();
        }
    };
    RadListView.prototype.onFilteringFunctionChanged = function (oldValue, newValue) {
        if (newValue) {
            this.loadData();
        }
        else {
            this.clearFilterDescriptors();
        }
    };
    RadListView.prototype.onSortingFunctionChanged = function (oldValue, newValue) {
        if (newValue) {
            this.loadData();
        }
        else {
            this.clearSortDescriptors();
        }
    };
    RadListView.prototype.subscribeForNativeScrollEvents = function () {
        ensureOnNativeScrollListener();
        this._scrollStateListener = new OnNativeScrollListenerClass(this);
        this._android.addOnScrollListener(this._scrollStateListener);
    };
    RadListView.prototype.bindingContextChanged = function (data) {
        if (this._headerView) {
            this._headerView.bindingContext = data.value;
        }
        if (this._footerView) {
            this._footerView.bindingContext = data.value;
        }
    };
    RadListView.prototype.refresh = function () {
        this.loadData();
    };
    RadListView.prototype.notifyPullToRefreshFinished = function () {
        if (!this._pullToRefreshBehavior) {
            return;
        }
        if (!this._android) {
            return;
        }
        this._android.getAdapter().notifyRefreshFinished();
    };
    RadListView.prototype.notifyLoadOnDemandFinished = function () {
        if (!this._loadOnDemandBehavior) {
            return;
        }
        if (!this._android) {
            return;
        }
        this._android.getAdapter().notifyLoadingFinished();
    };
    RadListView.prototype.notifySwipeToExecuteFinished = function () {
        if (this._swipeActionsBehavior) {
            this._swipeActionsBehavior.endExecute();
        }
        if (!this._swipeExecuteBehavior) {
            return;
        }
        if (!this._android) {
            return;
        }
        if (this._android.getAdapter()) {
            this._android.getAdapter().notifySwipeExecuteFinished();
        }
    };
    RadListView.prototype.retrieveNativeSnapMode = function (snapMode) {
        var nativeSnapMode = com.telerik.widget.list.SnappingSmoothScroller.SNAP_NONE;
        switch (snapMode.toLowerCase()) {
            case listViewCommonModule.ListViewItemSnapMode.Start.toLowerCase():
                nativeSnapMode = com.telerik.widget.list.SnappingSmoothScroller.SNAP_TOP;
                break;
            case listViewCommonModule.ListViewItemSnapMode.End.toLowerCase():
                nativeSnapMode = com.telerik.widget.list.SnappingSmoothScroller.SNAP_BOTTOM;
                break;
            case listViewCommonModule.ListViewItemSnapMode.Center.toLowerCase():
                nativeSnapMode = com.telerik.widget.list.SnappingSmoothScroller.SNAP_CENTER;
                break;
        }
        return nativeSnapMode;
    };
    RadListView.prototype.scrollToIndex = function (index, animate, snapMode) {
        if (animate === void 0) { animate = false; }
        if (snapMode === void 0) { snapMode = listViewCommonModule.ListViewItemSnapMode.Auto; }
        if (this._android) {
            var nativeSnapMode = this.retrieveNativeSnapMode(snapMode);
            if (!animate) {
                this._android.scrollToPosition(index, nativeSnapMode);
            }
            else {
                this._android.smoothScrollToPosition(index, nativeSnapMode);
            }
        }
    };
    RadListView.prototype.getScrollOffset = function () {
        if (!this._android) {
            return _super.prototype.getScrollOffset.call(this);
        }
        if (this.listViewLayout.scrollDirection === listViewCommonModule.ListViewScrollDirection.Vertical) {
            return utilsModule.layout.toDeviceIndependentPixels(this._android.computeVerticalScrollOffset());
        }
        else {
            return utilsModule.layout.toDeviceIndependentPixels(this._android.computeHorizontalScrollOffset());
        }
    };
    RadListView.prototype.scrollWithAmount = function (amount, animate) {
        if (this._android) {
            var layoutVertical = this.listViewLayout.scrollDirection === listViewCommonModule.ListViewScrollDirection.Vertical ? true : false;
            amount = utilsModule.layout.toDevicePixels(amount);
            if (layoutVertical) {
                if (animate) {
                    this._android.smoothScrollBy(0, amount);
                }
                else {
                    this._android.scrollBy(0, amount);
                }
            }
            else {
                if (animate) {
                    this._android.smoothScrollBy(amount, 0);
                }
                else {
                    this._android.scrollBy(amount, 0);
                }
            }
        }
    };
    RadListView.prototype._updateHeaderFooter = function () {
        var headerView = this.getViewForViewType(listViewCommonModule.ListViewViewTypes.HeaderView);
        this._android.setHeaderView(null);
        var layoutParams = this._getViewLayoutParams();
        if (headerView) {
            //var headerView = builder.parse(this.headerItemTemplate, this);
            headerView.bindingContext = this.bindingContext;
            this._addView(headerView);
            headerView.nativeView.setLayoutParams(layoutParams);
            this._android.setHeaderView(headerView.nativeView);
            this._headerView = headerView;
        }
        var footerView = this.getViewForViewType(listViewCommonModule.ListViewViewTypes.FooterView);
        this._android.setFooterView(null);
        if (footerView) {
            //var footerView = builder.parse(this.footerItemTemplate, this);
            footerView.bindingContext = this.bindingContext;
            this._addView(footerView);
            footerView.nativeView.setLayoutParams(layoutParams);
            this._android.setFooterView(footerView.nativeView);
            this._footerView = footerView;
        }
    };
    RadListView.prototype.updateSwipeActionsBehavior = function () {
        if (!this._android || !(this.itemSwipeTemplate || this.itemViewLoader)) {
            return;
        }
        if (this.swipeActions === true) {
            if (!this._swipeActionsBehavior) {
                this._swipeActionsBehavior = new com.telerik.widget.list.SwipeActionsBehavior();
                this._swipeActionsBehavior.setDockMode(com.telerik.widget.list.SwipeActionsBehavior.SwipeDockMode.DockAtLimit);
                this._android.addBehavior(this._swipeActionsBehavior);
                var that = new WeakRef(this);
                var impl = {
                    swipeLimits: { left: that.get().getMeasuredWidth(), top: that.get().getMeasuredHeight(), right: that.get().getMeasuredWidth(), bottom: that.get().getMeasuredHeight(), threshold: 0 },
                    onSwipeStarted: function (event) {
                        var swipeView = that.get()._listViewAdapter.getSwipeViewForItem(that.get().getItemAtIndex(event.swipedItemPosition()));
                        var mainView = that.get()._listViewAdapter.getViewForItem(that.get().getItemAtIndex(event.swipedItemPosition()));
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemSwipeProgressStartedEvent,
                            object: that.get(),
                            swipeView: swipeView,
                            mainView: mainView,
                            index: event.swipedItemPosition(),
                            data: { swipeLimits: this.swipeLimits }
                        };
                        that.get().notify(args);
                        var listView = that.get();
                        if (listView.listViewLayout.scrollDirection === listViewCommonModule.ListViewScrollDirection.Horizontal) {
                            if (this.swipeLimits.top >= 0) {
                                that.get()._swipeActionsBehavior.setSwipeLimitStart(this.swipeLimits.top);
                            }
                            if (this.swipeLimits.bottom >= 0) {
                                that.get()._swipeActionsBehavior.setSwipeLimitEnd(this.swipeLimits.bottom);
                            }
                        }
                        else {
                            if (this.swipeLimits.left >= 0) {
                                that.get()._swipeActionsBehavior.setSwipeLimitStart(this.swipeLimits.left);
                            }
                            if (this.swipeLimits.right >= 0) {
                                that.get()._swipeActionsBehavior.setSwipeLimitEnd(this.swipeLimits.right);
                            }
                        }
                        if (this.swipeLimits.threshold !== undefined) {
                            that.get()._swipeActionsBehavior.setSwipeThresholdEnd(this.swipeLimits.threshold);
                            that.get()._swipeActionsBehavior.setSwipeThresholdStart(this.swipeLimits.threshold);
                        }
                    },
                    onSwipeProgressChanged: function (event) {
                        var swipeView = that.get()._listViewAdapter.getSwipeViewForItem(that.get().getItemAtIndex(event.swipedItemPosition()));
                        var mainView = that.get()._listViewAdapter.getViewForItem(that.get().getItemAtIndex(event.swipedItemPosition()));
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemSwipeProgressChangedEvent,
                            object: that.get(),
                            swipeView: swipeView,
                            mainView: mainView,
                            index: event.swipedItemPosition(),
                            data: {
                                x: that.get().listViewLayout.scrollDirection === "Vertical" ? event.currentOffset() : 0,
                                y: that.get().listViewLayout.scrollDirection === "Vertical" ? 0 : event.currentOffset(),
                                swipeLimits: this.swipeLimits
                            }
                        };
                        that.get().notify(args);
                    },
                    onSwipeEnded: function (event) {
                    },
                    onExecuteFinished: function (event) {
                        var swipeView = that.get()._listViewAdapter.getSwipeViewForItem(that.get().getItemAtIndex(event.swipedItemPosition()));
                        var mainView = that.get()._listViewAdapter.getViewForItem(that.get().getItemAtIndex(event.swipedItemPosition()));
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemSwipeProgressEndedEvent,
                            object: that.get(),
                            swipeView: swipeView,
                            mainView: mainView,
                            index: event.swipedItemPosition(),
                            data: {
                                x: that.get().listViewLayout.scrollDirection === "Vertical" ? event.swipePositionWhenReleased() : 0,
                                y: that.get().listViewLayout.scrollDirection === "Vertical" ? 0 : event.swipePositionWhenReleased(),
                                swipeLimits: this.swipeLimits
                            }
                        };
                        that.get().notify(args);
                    },
                    onSwipeStateChanged: function (oldState, newState) {
                    },
                };
                this._swipeActionsListener = new com.telerik.widget.list.SwipeActionsBehavior.SwipeActionsListener(impl);
                this._swipeActionsBehavior.addListener(this._swipeActionsListener);
            }
        }
    };
    RadListView.prototype.updateSwipeToExecuteBehavior = function () {
        if (!this._android || !(this.itemSwipeTemplate || this.itemViewLoader)) {
            return;
        }
        if (this.itemSwipe === true) {
            if (!this._swipeExecuteBehavior) {
                this._swipeExecuteBehavior = new com.telerik.widget.list.SwipeExecuteBehavior();
                this._swipeExecuteBehavior.setAutoDissolve(false);
                this._android.addBehavior(this._swipeExecuteBehavior);
                var that = new WeakRef(this);
                var impl = {
                    swipeLimits: (that.get().listViewLayout.scrollDirection === "Vertical") ?
                        { left: 150, top: 0, right: 150, bottom: 0, threshold: 75 } :
                        { left: 0, top: 150, right: 0, bottom: 150, threshold: 75 },
                    onSwipeStarted: function (position) {
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemSwipeProgressStartedEvent,
                            object: that.get(),
                            swipeView: that.get()._listViewAdapter.getSwipeViewForItem(that.get().getItemAtIndex(position)),
                            index: position,
                            groupIndex: -1,
                            data: { swipeLimits: this.swipeLimits }
                        };
                        that.get().notify(args);
                        var listView = that.get();
                        if (listView.listViewLayout.scrollDirection === listViewCommonModule.ListViewScrollDirection.Horizontal) {
                            that.get()._swipeExecuteBehavior.setSwipeLimitStart(-this.swipeLimits.top);
                            that.get()._swipeExecuteBehavior.setSwipeLimitEnd(this.swipeLimits.bottom);
                        }
                        else {
                            that.get()._swipeExecuteBehavior.setSwipeLimitStart(-this.swipeLimits.right);
                            that.get()._swipeExecuteBehavior.setSwipeLimitEnd(this.swipeLimits.left);
                        }
                    },
                    onSwipeProgressChanged: function (position, currentOffset, swipeContent) {
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemSwipeProgressChangedEvent,
                            object: that.get(),
                            swipeView: that.get()._listViewAdapter.getSwipeViewForItem(that.get().getItemAtIndex(position)),
                            index: position,
                            data: { x: currentOffset, y: 0, swipeLimits: this.swipeLimits },
                            returnValue: undefined
                        };
                        that.get().notify(args);
                    },
                    onSwipeEnded: function (position, finalOffset) {
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemSwipeProgressEndedEvent,
                            object: that.get(),
                            swipeView: that.get()._listViewAdapter.getSwipeViewForItem(that.get().getItemAtIndex(position)),
                            index: position,
                            data: { x: finalOffset, y: 0, swipeLimits: this.swipeLimits },
                            returnValue: undefined
                        };
                        that.get().notify(args);
                        if (args.data.swipeLimits) {
                            if (Math.abs(finalOffset) > args.data.swipeLimits.threshold) {
                                if (finalOffset < 0) {
                                    if (that.get().listViewLayout.scrollDirection === "Horizontal") {
                                        that.get()._swipeExecuteBehavior.setSwipeOffset(-args.data.swipeLimits.bottom);
                                    }
                                    else if (that.get().listViewLayout.scrollDirection === "Vertical") {
                                        that.get()._swipeExecuteBehavior.setSwipeOffset(-args.data.swipeLimits.right);
                                    }
                                }
                                else if (finalOffset > 0) {
                                    if (that.get().listViewLayout.scrollDirection === "Horizontal") {
                                        that.get()._swipeExecuteBehavior.setSwipeOffset(args.data.swipeLimits.top);
                                    }
                                    else if (that.get().listViewLayout.scrollDirection === "Vertical") {
                                        that.get()._swipeExecuteBehavior.setSwipeOffset(args.data.swipeLimits.left);
                                    }
                                }
                            }
                            else {
                                that.get()._swipeExecuteBehavior.setSwipeOffset(0);
                            }
                        }
                    },
                    onExecuteFinished: function (position) {
                    }
                };
                this._swipeExecuteListener = new com.telerik.widget.list.SwipeExecuteBehavior.SwipeExecuteListener(impl);
                this._swipeExecuteBehavior.addListener(this._swipeExecuteListener);
            }
            else {
                // The this._android reference has been cleared but
                // behaviors exist so we simply re-add them.
                //this._android.addBehavior(this._swipeExecuteBehavior);
            }
        }
        else {
            if (this._swipeExecuteBehavior) {
                this._android.removeBehavior(this._swipeExecuteBehavior);
                this._swipeExecuteBehavior.removeListener(this._swipeExecuteListener);
                this._swipeExecuteBehavior = null;
                this._swipeExecuteListener = null;
            }
        }
    };
    RadListView.prototype.updatePullToRefreshBehavior = function () {
        if (!this._android) {
            return;
        }
        if (this.pullToRefresh === true) {
            if (!this._pullToRefreshBehavior) {
                this._pullToRefreshBehavior = new com.telerik.widget.list.SwipeRefreshBehavior();
                this._android.addBehavior(this._pullToRefreshBehavior);
                var that = new WeakRef(this);
                this._pullToRefreshBehavior.addListener(new com.telerik.widget.list.SwipeRefreshBehavior.SwipeRefreshListener({
                    onRefreshRequested: function () {
                        var args = {
                            eventName: listViewCommonModule.RadListView.pullToRefreshInitiatedEvent,
                            object: that.get(),
                            returnValue: true
                        };
                        that.get().notify(args);
                    }
                }));
            }
            else {
                //this._android.addBehavior(this._pullToRefreshBehavior);
            }
            if (this._pullToRefreshBehavior && this.pullToRefreshStyle !== undefined) {
                var style = this.pullToRefreshStyle;
                if (style.indicatorColor) {
                    var colorsArray = new Array();
                    colorsArray.push(new color_1.Color(style.indicatorColor).android);
                    this._pullToRefreshBehavior.swipeRefresh().setColorSchemeColors(colorsArray);
                }
                if (style.indicatorBackgroundColor) {
                    this._pullToRefreshBehavior.swipeRefresh().setProgressBackgroundColorSchemeColor(new color_1.Color(style.indicatorBackgroundColor).android);
                }
            }
        }
        else {
            if (this._pullToRefreshBehavior) {
                this._android.removeBehavior(this._pullToRefreshBehavior);
                this._pullToRefreshBehavior = null;
            }
        }
    };
    RadListView.prototype.updateCollapsibleGroupsBehavior = function () {
        if (!this._android || !this.enableCollapsibleGroups) {
            return;
        }
        if (this.enableCollapsibleGroups) {
            if (!this._collapsibleGroupsBehavior) {
                this._collapsibleGroupsBehavior = new com.telerik.widget.list.CollapsibleGroupsBehavior();
                this._android.addBehavior(this._collapsibleGroupsBehavior);
            }
        }
        else {
            if (this._collapsibleGroupsBehavior) {
                this._android.removeBehavior(this._collapsibleGroupsBehavior);
                this._collapsibleGroupsBehavior = null;
            }
        }
    };
    RadListView.prototype.updateLoadOnDemandBehavior = function () {
        if (!this._android) {
            return;
        }
        if (!this._loadOnDemandBehavior) {
            this._loadOnDemandBehavior = undefined;
            var loadOnDemandView = this.getViewForViewType(listViewCommonModule.ListViewViewTypes.LoadOnDemandView);
            if (loadOnDemandView) {
                this._addView(loadOnDemandView);
                switch (this.loadOnDemandMode) {
                    case listViewCommonModule.ListViewLoadOnDemandMode.Manual:
                        this._loadOnDemandBehavior = new com.telerik.widget.list.LoadOnDemandBehavior(loadOnDemandView.nativeView, new android.widget.LinearLayout(this._context));
                        break;
                    case listViewCommonModule.ListViewLoadOnDemandMode.Auto:
                    default: {
                        this._loadOnDemandBehavior = new com.telerik.widget.list.LoadOnDemandBehavior(new android.widget.LinearLayout(this._context), loadOnDemandView.nativeView);
                        break;
                    }
                }
            }
            else {
                this._loadOnDemandBehavior = new com.telerik.widget.list.LoadOnDemandBehavior();
            }
            this._android.addBehavior(this._loadOnDemandBehavior);
            var that = new WeakRef(this);
            this._loadOnDemandBehavior.addListener(new com.telerik.widget.list.LoadOnDemandBehavior.LoadOnDemandListener({
                onLoadStarted: function () {
                    var args = {
                        eventName: listViewCommonModule.RadListView.loadMoreDataRequestedEvent,
                        object: that.get(),
                        returnValue: true
                    };
                    that.get().notify(args);
                    if (!args.returnValue) {
                        that.get()._loadOnDemandBehavior.setEnabled(false);
                    }
                },
                onLoadFinished: function () {
                }
            }));
        }
        else {
            //this._android.addBehavior(this._loadOnDemandBehavior);
        }
        if (!isNaN(this.loadOnDemandBufferSize)) {
            this._loadOnDemandBehavior.setMaxRemainingItems(this.loadOnDemandBufferSize);
        }
        switch (this.loadOnDemandMode) {
            case listViewCommonModule.ListViewLoadOnDemandMode.Manual:
                this._loadOnDemandBehavior.setEnabled(true);
                this._loadOnDemandBehavior.setMode(com.telerik.widget.list.LoadOnDemandBehavior.LoadOnDemandMode.MANUAL);
                break;
            case listViewCommonModule.ListViewLoadOnDemandMode.Auto:
                this._loadOnDemandBehavior.setEnabled(true);
                this._loadOnDemandBehavior.setMode(com.telerik.widget.list.LoadOnDemandBehavior.LoadOnDemandMode.AUTOMATIC);
                break;
            default: {
                this._loadOnDemandBehavior.setEnabled(false);
                break;
            }
        }
    };
    RadListView.prototype.updateReorderBehavior = function () {
        if (!this._android) {
            return;
        }
        if (this.itemReorder) {
            if (!this._reorderBehavior) {
                ensureExtendedReorderWithHandlesBehavior();
                this._reorderBehavior = (this.reorderMode.toLowerCase() === listViewCommonModule.ListViewReorderMode.HoldAndDrag) ?
                    new com.telerik.widget.list.ItemReorderBehavior() :
                    new ExtendedReorderWithHandlesBehaviorClass(-1);
                this._reorderBehavior['nsOwner'] = this;
                this._android.addBehavior(this._reorderBehavior);
                var that = new WeakRef(this);
                var impl = {
                    newIndex: -1,
                    oldIndex: -1,
                    onReorderStarted: function (position) {
                        this.oldIndex = position;
                        var view = that.get().getViewForItem(that.get().getItemAtIndex(position));
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemReorderStartedEvent,
                            object: that.get(),
                            index: this.oldIndex,
                            groupIndex: -1,
                            view: view
                        };
                        that.get().notify(args);
                    },
                    onReorderItem: function (fromIndex, toIndex) {
                        this.newIndex = toIndex;
                    },
                    onReorderFinished: function () {
                        if (this.newIndex == -1) {
                            this.newIndex = this.oldIndex;
                        }
                        var view = that.get().getViewForItem(that.get().getItemAtIndex(this.newIndex));
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemReorderedEvent,
                            object: that.get(),
                            index: this.oldIndex,
                            groupIndex: -1,
                            data: { targetIndex: this.newIndex, targetGroupIndex: -1 },
                            view: view
                        };
                        this.newIndex = -1;
                        that.get().notify(args);
                    }
                };
                this._reorderBehavior.addListener(new com.telerik.widget.list.ItemReorderBehavior.ItemReorderListener(impl));
            }
            else {
                //this._android.addBehavior(this._reorderBehavior);
            }
        }
        else {
            if (this._reorderBehavior) {
                this._android.removeBehavior(this._reorderBehavior);
                this._reorderBehavior = undefined;
            }
        }
    };
    RadListView.prototype.updateSelectionBehavior = function () {
        if (!this._android) {
            return;
        }
        if (!this._selectionBehavior) {
            this._selectionBehavior = new com.telerik.widget.list.SelectionBehavior();
            this._android.addBehavior(this._selectionBehavior);
            var that = new WeakRef(this);
            this._selectionBehavior.addListener(new com.telerik.widget.list.SelectionBehavior.SelectionChangedListener({
                onSelectionStarted: function () {
                },
                onItemIsSelectedChanged: function (position, newValue) {
                    var currentEventName = newValue === true ? listViewCommonModule.RadListView.itemSelectedEvent : listViewCommonModule.RadListView.itemDeselectedEvent;
                    var view = that.get().getViewForItem(that.get().getItemAtIndex(position));
                    var args = {
                        eventName: currentEventName,
                        object: that.get(),
                        index: position,
                        groupIndex: -1,
                        view: view
                    };
                    that.get().notify(args);
                },
                onSelectionEnded: function () {
                }
            }));
        }
        else {
            //this._android.addBehavior(this._selectionBehavior);
        }
        if (this.multipleSelection) {
            this._selectionBehavior.setSelectionMode(com.telerik.widget.list.SelectionBehavior.SelectionMode.MULTIPLE);
        }
        else {
            this._selectionBehavior.setSelectionMode(com.telerik.widget.list.SelectionBehavior.SelectionMode.SINGLE);
        }
        switch (this.selectionBehavior) {
            case listViewCommonModule.ListViewSelectionBehavior.None:
                this._android.removeBehavior(this._selectionBehavior);
                this._selectionBehavior = undefined;
                break;
            case listViewCommonModule.ListViewSelectionBehavior.LongPress:
                this._selectionBehavior.setSelectionOnTouch(com.telerik.widget.list.SelectionBehavior.SelectionOnTouch.NEVER);
                break;
            default: {
                //listViewCommonModule.ListViewSelectionBehavior.Press
                this._selectionBehavior.setSelectionOnTouch(com.telerik.widget.list.SelectionBehavior.SelectionOnTouch.ALWAYS);
            }
        }
    };
    RadListView.prototype.clearFilterDescriptors = function () {
        if (!this._listViewAdapter) {
            return;
        }
        this._listViewAdapter.clearFilterDescriptors();
    };
    RadListView.prototype.clearGroupDescriptors = function () {
        if (!this._listViewAdapter) {
            return;
        }
        this._listViewAdapter.clearGroupDescriptors();
    };
    RadListView.prototype.clearSortDescriptors = function () {
        if (!this._listViewAdapter) {
            return;
        }
        this._listViewAdapter.clearSortDescriptors();
    };
    RadListView.prototype.loadData = function () {
        if (!this.items || !this._android) {
            return;
        }
        var nativeSource = new java.util.ArrayList();
        var dsLength = this.items.length;
        this._resetCurrentId();
        for (var i = 0; i < dsLength; i++) {
            var javaObject = new java.lang.Integer(this._getUniqueItemId());
            nativeSource.add(javaObject);
        }
        if (!this.isDataOperationsEnabled) {
            this._listViewAdapter = new ListViewAdapterClass(nativeSource, this);
        }
        else {
            this._listViewAdapter = new ListViewDataSourceAdapterClass(nativeSource, this);
        }
        if (this.isDataOperationsEnabled) {
            var that = this;
            if (that.groupingFunction) {
                this._listViewAdapter.addGroupDescriptor(new com.telerik.android.common.Function({
                    apply: function (object) {
                        var item = that.getItemAtIndex(object);
                        return that.groupingFunction(item);
                    }
                }));
            }
            if (that.filteringFunction) {
                this._listViewAdapter.addFilterDescriptor(new com.telerik.android.common.Function({
                    apply: function (object) {
                        var item = that.getItemAtIndex(object);
                        return (that.filteringFunction(item));
                    }
                }));
            }
            if (that.sortingFunction) {
                this._listViewAdapter.addSortDescriptor(new com.telerik.android.common.Function2({
                    apply: function (object, object2) {
                        var previousItem = that.getItemAtIndex(object);
                        var nextItem = that.getItemAtIndex(object2);
                        var javaRes = that.sortingFunction(nextItem, previousItem);
                        return new java.lang.Integer(javaRes);
                    }
                }));
            }
        }
        this._android.setAdapter(this._listViewAdapter);
        var args = {
            eventName: listViewCommonModule.RadListView.dataPopulatedEvent,
            object: this
        };
        this.notify(args);
    };
    return RadListView;
}(listViewCommonModule.RadListView));
exports.RadListView = RadListView;
var AndroidLVLayoutBase = (function (_super) {
    __extends(AndroidLVLayoutBase, _super);
    function AndroidLVLayoutBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AndroidLVLayoutBase.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    AndroidLVLayoutBase.prototype._init = function (owner) {
        this._owner = owner;
        if (this._owner._android) {
            this._onOwnerUICreated();
        }
    };
    AndroidLVLayoutBase.prototype._reset = function () {
    };
    AndroidLVLayoutBase.prototype._onOwnerUICreated = function () {
        this._android = this.getLayoutManager();
        this._owner._android.setLayoutManager(this._android);
        if (this.scrollDirection) {
            this.setLayoutOrientation(this.scrollDirection);
        }
        if (this.itemInsertAnimation) {
            this.updateItemAnimator(this.itemInsertAnimation);
        }
        if (this.itemDeleteAnimation) {
            this.updateItemAnimator(this.itemDeleteAnimation);
        }
    };
    AndroidLVLayoutBase.prototype.reset = function () {
        this._owner._android.setLayoutManager(null);
        this._owner = null;
    };
    AndroidLVLayoutBase.prototype.getLayoutManager = function () {
        return undefined;
    };
    AndroidLVLayoutBase.prototype.onScrollDirectionChanged = function (oldValue, newValue) {
        if (newValue && this._android) {
            this.setLayoutOrientation(newValue);
        }
    };
    AndroidLVLayoutBase.prototype.onItemInsertAnimationChanged = function (oldValue, newValue) {
        if (this._owner) {
            this.updateItemAnimator(newValue);
        }
    };
    AndroidLVLayoutBase.prototype.onItemDeleteAnimationChanged = function (oldValue, newValue) {
        if (this._owner) {
            this.updateItemAnimator(newValue);
        }
    };
    AndroidLVLayoutBase.prototype.setLayoutOrientation = function (orientation) {
        this._android.setOrientation((orientation === listViewCommonModule.ListViewScrollDirection.Horizontal) ?
            android.support.v7.widget.LinearLayoutManager.HORIZONTAL :
            android.support.v7.widget.LinearLayoutManager.VERTICAL);
    };
    AndroidLVLayoutBase.prototype.updateItemAnimator = function (newAnimator) {
        if (!newAnimator) {
            this._owner._android.setItemAnimator(null);
            return;
        }
        switch (listViewCommonModule.ListViewItemAnimation[newAnimator]) {
            case listViewCommonModule.ListViewItemAnimation.Fade: {
                this._owner._android.setItemAnimator(new com.telerik.widget.list.FadeItemAnimator());
                break;
            }
            case listViewCommonModule.ListViewItemAnimation.Scale: {
                this._owner._android.setItemAnimator(new com.telerik.widget.list.ScaleItemAnimator());
                break;
            }
            case listViewCommonModule.ListViewItemAnimation.Slide: {
                this._owner._android.setItemAnimator(new com.telerik.widget.list.SlideItemAnimator());
                break;
            }
            default:
                this._owner._android.setItemAnimator(null);
        }
    };
    return AndroidLVLayoutBase;
}(listViewCommonModule.ListViewLayoutBase));
exports.AndroidLVLayoutBase = AndroidLVLayoutBase;
var ListViewLinearLayout = (function (_super) {
    __extends(ListViewLinearLayout, _super);
    function ListViewLinearLayout() {
        return _super.call(this) || this;
    }
    ListViewLinearLayout.prototype.getLayoutManager = function () {
        return new android.support.v7.widget.LinearLayoutManager(this._owner._context);
    };
    return ListViewLinearLayout;
}(AndroidLVLayoutBase));
exports.ListViewLinearLayout = ListViewLinearLayout;
var ListViewGridLayout = (function (_super) {
    __extends(ListViewGridLayout, _super);
    function ListViewGridLayout() {
        return _super.call(this) || this;
    }
    ListViewGridLayout.prototype.onSpanCountPropertyChanged = function (oldValue, newValue) {
        this.onSpanCountChanged(oldValue, newValue);
    };
    ListViewGridLayout.prototype.onSpanCountChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue) && this.android) {
            this.android.setSpanCount(newValue);
        }
    };
    ListViewGridLayout.prototype.onItemHeightChanged = function (oldValue, newValue) {
        console.log("Warning: Setting the 'itemHeight' property of 'ListViewGridLayout' is not supported by the Android platform.");
    };
    ListViewGridLayout.prototype.onItemWidthChanged = function (oldValue, newValue) {
        console.log("Warning: Setting the 'itemWidth' property of 'ListViewGridLayout' is not supported by the Android platform.");
    };
    ListViewGridLayout.prototype.getLayoutManager = function () {
        this.spanCount = (this.spanCount ? this.spanCount : 2);
        return new android.support.v7.widget.GridLayoutManager(this._owner._context, this.spanCount);
    };
    //note: this property should be defined in common module, but inheritance will not be possible then
    ListViewGridLayout.spanCountProperty = new view_1.Property({
        name: "spanCount",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onSpanCountPropertyChanged(oldValue, newValue);
        },
    });
    return ListViewGridLayout;
}(ListViewLinearLayout));
exports.ListViewGridLayout = ListViewGridLayout;
ListViewGridLayout.spanCountProperty.register(ListViewGridLayout);
var ListViewStaggeredLayout = (function (_super) {
    __extends(ListViewStaggeredLayout, _super);
    function ListViewStaggeredLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListViewStaggeredLayout.prototype.getLayoutManager = function () {
        var orientation = this.scrollDirection === listViewCommonModule.ListViewScrollDirection.Vertical ?
            android.support.v7.widget.StaggeredGridLayoutManager.VERTICAL : android.support.v7.widget.StaggeredGridLayoutManager.HORIZONTAL;
        this.spanCount = (this.spanCount ? this.spanCount : 2);
        return new android.support.v7.widget.StaggeredGridLayoutManager(this.spanCount, orientation);
    };
    return ListViewStaggeredLayout;
}(ListViewGridLayout));
exports.ListViewStaggeredLayout = ListViewStaggeredLayout;
var OnNativeScrollListenerClass;
function ensureOnNativeScrollListener() {
    if (OnNativeScrollListenerClass) {
        return;
    }
    var OnNativeScrollListener = (function (_super) {
        __extends(OnNativeScrollListener, _super);
        function OnNativeScrollListener(owner) {
            var _this = _super.call(this) || this;
            _this._wasIdle = true;
            _this._wasDragging = false;
            _this._owner = new WeakRef(owner);
            return global.__native(_this);
        }
        OnNativeScrollListener.prototype.onScrolled = function (param0, param1, param2) {
            var owner = this._owner.get();
            var eventData = {
                eventName: listViewCommonModule.RadListView.scrolledEvent,
                object: owner,
                scrollOffset: owner.getScrollOffset()
            };
            owner.notify(eventData);
        };
        OnNativeScrollListener.prototype.onScrollStateChanged = function (param0, scrollState) {
            var owner = this._owner.get();
            var eventData;
            switch (scrollState) {
                case android.support.v7.widget.RecyclerView.SCROLL_STATE_IDLE:
                    if (this._wasDragging) {
                        eventData = {
                            eventName: listViewCommonModule.RadListView.scrollDragEndedEvent,
                            object: owner,
                            scrollOffset: owner.getScrollOffset()
                        };
                        this._wasDragging = false;
                        if (owner.hasListeners(eventData.eventName)) {
                            owner.notify(eventData);
                        }
                    }
                    eventData = {
                        eventName: listViewCommonModule.RadListView.scrollEndedEvent,
                        object: owner,
                        scrollOffset: owner.getScrollOffset()
                    };
                    this._wasIdle = true;
                    break;
                case android.support.v7.widget.RecyclerView.SCROLL_STATE_DRAGGING:
                    this._wasDragging = true;
                    eventData = {
                        eventName: this._wasIdle ? listViewCommonModule.RadListView.scrollStartedEvent : listViewCommonModule.RadListView.scrolledEvent,
                        object: owner,
                        scrollOffset: owner.getScrollOffset()
                    };
                    this._wasIdle = false;
                    break;
                case android.support.v7.widget.RecyclerView.SCROLL_STATE_SETTLING:
                    if (this._wasDragging) {
                        eventData = {
                            eventName: listViewCommonModule.RadListView.scrollDragEndedEvent,
                            object: owner,
                            scrollOffset: owner.getScrollOffset()
                        };
                        this._wasDragging = false;
                        if (owner.hasListeners(eventData.eventName)) {
                            owner.notify(eventData);
                        }
                    }
                    eventData = {
                        eventName: listViewCommonModule.RadListView.scrolledEvent,
                        object: owner,
                        scrollOffset: owner.getScrollOffset()
                    };
                    break;
            }
            if (owner.hasListeners(eventData.eventName)) {
                owner.notify(eventData);
            }
        };
        return OnNativeScrollListener;
    }(android.support.v7.widget.RecyclerView.OnScrollListener));
    OnNativeScrollListenerClass = OnNativeScrollListener;
}


/***/ }),

/***/ 460:
/*!***********************************************************************!*\
  !*** ../node_modules/nativescript-pro-ui/listview/listview-common.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var viewModule = __webpack_require__(/*! tns-core-modules/ui/core/view */ 0);
var observableArray = __webpack_require__(/*! tns-core-modules/data/observable-array */ 36);
var observableModule = __webpack_require__(/*! tns-core-modules/data/observable */ 22);
var weakEvents = __webpack_require__(/*! tns-core-modules/ui/core/weak-event-listener */ 54);
var stackLayoutModule = __webpack_require__(/*! tns-core-modules/ui/layouts/stack-layout */ 53);
var builder = __webpack_require__(/*! tns-core-modules/ui/builder */ 52);
var view_1 = __webpack_require__(/*! tns-core-modules/ui/core/view */ 0);
var label_1 = __webpack_require__(/*! tns-core-modules/ui/label */ 40);
var builder_1 = __webpack_require__(/*! tns-core-modules/ui/builder */ 52);
var ListViewViewTypes;
(function (ListViewViewTypes) {
    ListViewViewTypes.HeaderView = "headerview";
    ListViewViewTypes.ItemView = "itemview";
    ListViewViewTypes.FooterView = "footerview";
    ListViewViewTypes.LoadOnDemandView = "loadondemandview";
    ListViewViewTypes.ItemSwipeView = "ItemSwipeView";
})(ListViewViewTypes = exports.ListViewViewTypes || (exports.ListViewViewTypes = {}));
var ListViewItemSnapMode;
(function (ListViewItemSnapMode) {
    ListViewItemSnapMode.Auto = "Auto";
    ListViewItemSnapMode.Start = "Start";
    ListViewItemSnapMode.End = "End";
    ListViewItemSnapMode.Center = "Center";
})(ListViewItemSnapMode = exports.ListViewItemSnapMode || (exports.ListViewItemSnapMode = {}));
var ListViewScrollDirection;
(function (ListViewScrollDirection) {
    ListViewScrollDirection.Vertical = "Vertical";
    ListViewScrollDirection.Horizontal = "Horizontal";
})(ListViewScrollDirection = exports.ListViewScrollDirection || (exports.ListViewScrollDirection = {}));
var ListViewScrollPosition;
(function (ListViewScrollPosition) {
    ListViewScrollPosition.None = "None";
    ListViewScrollPosition.Top = "Top";
    ListViewScrollPosition.CenteredVertically = "CenteredVertically";
    ListViewScrollPosition.CenteredHorizontally = "CenteredHorizontally";
    ListViewScrollPosition.Bottom = "Bottom";
    ListViewScrollPosition.Left = "Left";
    ListViewScrollPosition.Right = "Right";
})(ListViewScrollPosition = exports.ListViewScrollPosition || (exports.ListViewScrollPosition = {}));
var ListViewItemAlignment;
(function (ListViewItemAlignment) {
    ListViewItemAlignment.Stretch = "Stretch";
    ListViewItemAlignment.Left = "Left";
    ListViewItemAlignment.Center = "Center";
    ListViewItemAlignment.Right = "Right";
})(ListViewItemAlignment = exports.ListViewItemAlignment || (exports.ListViewItemAlignment = {}));
var ListViewReorderMode;
(function (ListViewReorderMode) {
    ListViewReorderMode.HoldAndDrag = "holdanddrag";
    ListViewReorderMode.Drag = "drag";
})(ListViewReorderMode = exports.ListViewReorderMode || (exports.ListViewReorderMode = {}));
var ListViewItemAnimation;
(function (ListViewItemAnimation) {
    ListViewItemAnimation.Default = "Default";
    ListViewItemAnimation.Fade = "Fade";
    ListViewItemAnimation.Scale = "Scale";
    ListViewItemAnimation.Slide = "Slide";
})(ListViewItemAnimation = exports.ListViewItemAnimation || (exports.ListViewItemAnimation = {}));
var ListViewLoadOnDemandMode;
(function (ListViewLoadOnDemandMode) {
    ListViewLoadOnDemandMode.None = "None";
    ListViewLoadOnDemandMode.Manual = "Manual";
    ListViewLoadOnDemandMode.Auto = "Auto";
})(ListViewLoadOnDemandMode = exports.ListViewLoadOnDemandMode || (exports.ListViewLoadOnDemandMode = {}));
;
var ListViewSelectionBehavior;
(function (ListViewSelectionBehavior) {
    ListViewSelectionBehavior.None = "None";
    ListViewSelectionBehavior.Press = "Press";
    ListViewSelectionBehavior.LongPress = "LongPress";
})(ListViewSelectionBehavior = exports.ListViewSelectionBehavior || (exports.ListViewSelectionBehavior = {}));
;
var PullToRefreshStyle = (function (_super) {
    __extends(PullToRefreshStyle, _super);
    function PullToRefreshStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PullToRefreshStyle.prototype.onIndicatorColorPropertyChanged = function (oldValue, newValue) {
    };
    PullToRefreshStyle.prototype.onIndicatorBackgroundColorPropertyChanged = function (oldValue, newValue) {
    };
    PullToRefreshStyle.indicatorColorProperty = new view_1.Property({
        name: "indicatorColor",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onIndicatorColorPropertyChanged(oldValue, newValue);
        }
    });
    PullToRefreshStyle.indicatorBackgroundColorProperty = new view_1.Property({
        name: "indicatorBackgroundColor",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onIndicatorBackgroundColorPropertyChanged(oldValue, newValue);
        }
    });
    return PullToRefreshStyle;
}(viewModule.ViewBase));
exports.PullToRefreshStyle = PullToRefreshStyle;
PullToRefreshStyle.indicatorColorProperty.register(PullToRefreshStyle);
PullToRefreshStyle.indicatorBackgroundColorProperty.register(PullToRefreshStyle);
var ReorderHandle = (function (_super) {
    __extends(ReorderHandle, _super);
    function ReorderHandle() {
        return _super.call(this) || this;
    }
    return ReorderHandle;
}(stackLayoutModule.StackLayout));
exports.ReorderHandle = ReorderHandle;
var ListViewScrollEventData = (function () {
    function ListViewScrollEventData() {
    }
    Object.defineProperty(ListViewScrollEventData.prototype, "object", {
        get: function () {
            return this._object;
        },
        set: function (value) {
            this._object = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewScrollEventData.prototype, "eventName", {
        get: function () {
            return this._eventName;
        },
        set: function (value) {
            this._eventName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewScrollEventData.prototype, "scrollOffset", {
        get: function () {
            return this._scrollOffset;
        },
        set: function (value) {
            this._scrollOffset = value;
        },
        enumerable: true,
        configurable: true
    });
    return ListViewScrollEventData;
}());
exports.ListViewScrollEventData = ListViewScrollEventData;
var ListViewEventData = (function () {
    function ListViewEventData() {
    }
    Object.defineProperty(ListViewEventData.prototype, "android", {
        get: function () {
            return this._android;
        },
        set: function (value) {
            this._android = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "eventName", {
        get: function () {
            return this._eventName;
        },
        set: function (value) {
            this._eventName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "object", {
        get: function () {
            return this._object;
        },
        set: function (value) {
            this._object = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            this._index = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "groupIndex", {
        get: function () {
            return this._groupIndex;
        },
        set: function (value) {
            this._groupIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "returnValue", {
        get: function () {
            return this._returnValue;
        },
        set: function (value) {
            this._returnValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "view", {
        get: function () {
            return this._view;
        },
        set: function (value) {
            this._view = value;
        },
        enumerable: true,
        configurable: true
    });
    return ListViewEventData;
}());
exports.ListViewEventData = ListViewEventData;
var SwipeActionsEventData = (function (_super) {
    __extends(SwipeActionsEventData, _super);
    function SwipeActionsEventData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SwipeActionsEventData.prototype, "mainView", {
        get: function () {
            return this._mainView;
        },
        set: function (value) {
            this._mainView = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwipeActionsEventData.prototype, "swipeView", {
        get: function () {
            return this._swipeView;
        },
        set: function (value) {
            this._swipeView = value;
        },
        enumerable: true,
        configurable: true
    });
    return SwipeActionsEventData;
}(ListViewEventData));
exports.SwipeActionsEventData = SwipeActionsEventData;
var ListViewLayoutBase = (function (_super) {
    __extends(ListViewLayoutBase, _super);
    function ListViewLayoutBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ListViewLayoutBase.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewLayoutBase.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    ListViewLayoutBase.prototype.onScrollDirectionPropertyChanged = function (oldValue, newValue) {
        this.onScrollDirectionChanged(oldValue, newValue);
    };
    ListViewLayoutBase.prototype.onScrollDirectionChanged = function (oldValue, newValue) {
    };
    ListViewLayoutBase.prototype.onItemInsertAnimationPropertyChanged = function (oldValue, newValue) {
        this.onItemInsertAnimationChanged(oldValue, newValue);
    };
    ListViewLayoutBase.prototype.onItemInsertAnimationChanged = function (oldValue, newValue) {
    };
    ListViewLayoutBase.prototype.onItemDeleteAnimationPropertyChanged = function (oldValue, newValue) {
        this.onItemDeleteAnimationChanged(oldValue, newValue);
    };
    ListViewLayoutBase.prototype.onItemDeleteAnimationChanged = function (oldValue, newValue) {
    };
    ListViewLayoutBase.prototype.onItemWidthPropertyChanged = function (oldValue, newValue) {
        this.onItemWidthChanged(oldValue, newValue);
    };
    ListViewLayoutBase.prototype.onItemWidthChanged = function (oldValue, newValue) {
    };
    ListViewLayoutBase.prototype.onItemHeightPropertyChanged = function (oldValue, newValue) {
        this.onItemHeightChanged(oldValue, newValue);
    };
    ListViewLayoutBase.prototype.onItemHeightChanged = function (oldValue, newValue) {
    };
    ListViewLayoutBase.prototype._onOwnerUICreated = function () {
    };
    ListViewLayoutBase.scrollDirectionProperty = new view_1.Property({
        name: "scrollDirection",
        defaultValue: ListViewScrollDirection.Vertical,
        valueChanged: function (target, oldValue, newValue) {
            target.onScrollDirectionPropertyChanged(oldValue, newValue);
        },
    });
    ListViewLayoutBase.itemInsertAnimationProperty = new view_1.Property({
        name: "itemInsertAnimation",
        defaultValue: ListViewItemAnimation.Default,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemInsertAnimationPropertyChanged(oldValue, newValue);
        },
    });
    ListViewLayoutBase.itemDeleteAnimationProperty = new view_1.Property({
        name: "itemDeleteAnimation",
        defaultValue: ListViewItemAnimation.Default,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemDeleteAnimationPropertyChanged(oldValue, newValue);
        },
    });
    ListViewLayoutBase.itemWidthProperty = new view_1.Property({
        name: "itemWidth",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemWidthPropertyChanged(oldValue, newValue);
        },
    });
    ListViewLayoutBase.itemHeightProperty = new view_1.Property({
        name: "itemHeight",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemHeightPropertyChanged(oldValue, newValue);
        },
    });
    return ListViewLayoutBase;
}(viewModule.ViewBase));
exports.ListViewLayoutBase = ListViewLayoutBase;
ListViewLayoutBase.scrollDirectionProperty.register(ListViewLayoutBase);
ListViewLayoutBase.itemInsertAnimationProperty.register(ListViewLayoutBase);
ListViewLayoutBase.itemDeleteAnimationProperty.register(ListViewLayoutBase);
ListViewLayoutBase.itemWidthProperty.register(ListViewLayoutBase);
ListViewLayoutBase.itemHeightProperty.register(ListViewLayoutBase);
var RadListView = (function (_super) {
    __extends(RadListView, _super);
    function RadListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._defaultTemplate = {
            key: "default",
            createView: function () {
                if (_this.itemTemplate) {
                    return builder_1.parse(_this.itemTemplate, _this);
                }
                return undefined;
            }
        };
        _this._itemTemplatesInternal = new Array(_this._defaultTemplate);
        _this._dataUpdatesSuspended = false;
        _this._itemTemplateSelectorBindable = new label_1.Label();
        return _this;
    }
    Object.defineProperty(RadListView.prototype, "itemViewLoader", {
        get: function () {
            return this._itemViewLoader;
        },
        set: function (value) {
            if (this._itemViewLoader !== value) {
                this._itemViewLoader = value;
                this.onItemViewLoaderChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "isDataOperationsEnabled", {
        get: function () {
            var isFilteringEnabled = this.filteringFunction != undefined ? true : false;
            var isSortingEnabled = this.sortingFunction != undefined ? true : false;
            var isGroupingEnabled = this.groupingFunction != undefined ? true : false;
            return isFilteringEnabled || isSortingEnabled || isGroupingEnabled;
        },
        enumerable: true,
        configurable: true
    });
    RadListView.prototype._reorderItemInSource = function (oldPosition, newPosition) {
        this.suspendUpdates();
        var ownerSource = this.items;
        var item = this.getItemAtIndex(oldPosition);
        ownerSource.splice(oldPosition, 1);
        ownerSource.splice(newPosition, 0, item);
        this.resumeUpdates(false);
    };
    RadListView.prototype.suspendUpdates = function () {
        this._dataUpdatesSuspended = true;
    };
    RadListView.prototype.resumeUpdates = function (refresh) {
        this._dataUpdatesSuspended = false;
        if (refresh === true) {
            this.refresh();
        }
    };
    RadListView.prototype.updatesSuspended = function () {
        return this._dataUpdatesSuspended;
    };
    RadListView.prototype.getItemAtIndex = function (index) {
        if (this.items && this.items.getItem) {
            return this.items.getItem(index);
        }
        return this.items[index];
    };
    RadListView.prototype.selectItemAt = function (index) {
    };
    RadListView.prototype.deselectItemAt = function (index) {
    };
    RadListView.prototype.selectAll = function () {
        if (!this.multipleSelection) {
            throw new Error('Select all cannot be called unless multipleSelection is set to be true');
        }
    };
    RadListView.prototype.deselectAll = function () {
    };
    RadListView.prototype.isItemSelected = function (item) {
        return false;
    };
    RadListView.prototype.getSelectedItems = function () {
        return new Array();
    };
    RadListView.prototype.getViewForItem = function (item) {
        return null;
    };
    RadListView.prototype.resolveTemplateView = function (template) {
        return builder.parse(template, this);
    };
    RadListView.prototype.getViewForViewType = function (viewType, templateKey) {
        var newView = undefined;
        if (templateKey) {
            var template = this.getTemplateFromSelector(templateKey);
            newView = template.createView();
        }
        if (!newView && this._itemViewLoader !== undefined) {
            newView = this._itemViewLoader(viewType);
        }
        if (newView) {
            return newView;
        }
        var templateString = undefined;
        switch (viewType) {
            case ListViewViewTypes.ItemView:
                templateString = this.itemTemplate;
                if (templateString === undefined) {
                    return this._getDefaultItemContent();
                }
                break;
            case ListViewViewTypes.ItemSwipeView:
                templateString = this.itemSwipeTemplate;
                break;
            case ListViewViewTypes.LoadOnDemandView:
                templateString = this.loadOnDemandItemTemplate;
                break;
            case ListViewViewTypes.HeaderView:
                templateString = this.headerItemTemplate;
                break;
            case ListViewViewTypes.FooterView:
                templateString = this.footerItemTemplate;
                break;
        }
        return templateString === undefined ? undefined : this.resolveTemplateView(templateString);
    };
    RadListView.prototype.onGroupingFunctionPropertyChanged = function (oldValue, newValue) {
        this.onGroupingFunctionChanged(oldValue, newValue);
    };
    RadListView.prototype.onFilteringFunctionPropertyChanged = function (oldValue, newValue) {
        this.onFilteringFunctionChanged(oldValue, newValue);
    };
    RadListView.prototype.onSortingFunctionPropertyChanged = function (oldValue, newValue) {
        this.onSortingFunctionChanged(oldValue, newValue);
    };
    RadListView.prototype.onEnableCollapsibleGroupsPropertyChanged = function (oldValue, newValue) {
        this.onEnableCollapsibleGroupsChanged(oldValue, newValue);
    };
    RadListView.prototype._getDefaultItemContent = function () {
        var lbl = new label_1.Label();
        lbl.bind({
            targetProperty: "text",
            sourceProperty: "$value"
        });
        return lbl;
    };
    RadListView.prototype.getTemplateFromSelector = function (templateKey) {
        for (var i = 0, length_1 = this._itemTemplatesInternal.length; i < length_1; i++) {
            if (this._itemTemplatesInternal[i].key.toLowerCase() === templateKey.toLowerCase()) {
                return this._itemTemplatesInternal[i];
            }
        }
        // This is the default template
        return this._itemTemplatesInternal[0];
    };
    RadListView.prototype.onPullToRefreshStylePropertyChanged = function (oldValue, newValue) {
        this.onPullToRefreshStyleChanged(oldValue, newValue);
    };
    RadListView.prototype.onHeaderItemTemplatePropertyChanged = function (oldValue, newValue) {
        this.onHeaderItemTemplateChanged(oldValue, newValue);
    };
    RadListView.prototype.onFooterItemTemplatePropertyChanged = function (oldValue, newValue) {
        this.onFooterItemTemplateChanged(oldValue, newValue);
    };
    RadListView.prototype.onLoadOnDemandItemTemplatePropertyChanged = function (oldValue, newValue) {
        this.onLoadOnDemandItemTemplateChanged(oldValue, newValue);
    };
    RadListView.prototype.onListViewReorderModePropertyChanged = function (oldValue, newValue) {
        this.onReorderModeChanged(oldValue, newValue);
    };
    RadListView.prototype.onLayoutPropertyChanged = function (oldValue, newValue) {
        this.onListViewLayoutChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemTemplateSelectorPropertyChanged = function (oldValue, newValue) {
        this.onItemTemplateSelectorChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemTemplatesPropertyChanged = function (oldValue, newValue) {
        this.onItemTemplatesChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemTemplatePropertyChanged = function (oldValue, newValue) {
        this.onItemTemplateChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemSwipeTemplatePropertyChanged = function (oldValue, newValue) {
        this.onItemSwipeTemplateChanged(oldValue, newValue);
    };
    RadListView.prototype.onMultipleSelectionPropertyChanged = function (oldValue, newValue) {
        this.onMultipleSelectionChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemReorderPropertyChanged = function (oldValue, newValue) {
        this.onItemReorderChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemSwipePropertyChanged = function (oldValue, newValue) {
        this.onItemSwipeChanged(oldValue, newValue);
    };
    RadListView.prototype.onSwipeActionsPropertyChanged = function (oldValue, newValue) {
        this.onSwipeActionsChanged(oldValue, newValue);
    };
    RadListView.prototype.onPullToRefreshPropertyChanged = function (oldValue, newValue) {
        this.onPullToRefreshChanged(oldValue, newValue);
    };
    RadListView.prototype.onLoadOnDemandModePropertyChanged = function (oldValue, newValue) {
        this.onLoadOnDemandModeChanged(oldValue, newValue);
    };
    RadListView.prototype.onLoadOnDemandBufferSizePropertyChanged = function (oldValue, newValue) {
        this.onLoadOnDemandBufferSizeChanged(oldValue, newValue);
    };
    RadListView.prototype.onSelectionBehaviorPropertyChanged = function (oldValue, newValue) {
        this.onSelectionBehaviorChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemsPropertyChanged = function (oldValue, newValue) {
        this.onItemsChanged(oldValue, newValue);
    };
    RadListView.prototype.onScrollPositionPropertyChanged = function (oldValue, newValue) {
        this.onScrollPositionChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemViewLoaderChanged = function () {
    };
    RadListView.prototype.onGroupingFunctionChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onFilteringFunctionChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onSortingFunctionChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onEnableCollapsibleGroupsChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onPullToRefreshStyleChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onHeaderItemTemplateChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onFooterItemTemplateChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onLoadOnDemandItemTemplateChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onReorderModeChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onListViewLayoutChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onItemTemplateSelectorChanged = function (oldValue, newValue) {
        var _this = this;
        if (typeof newValue === "string") {
            this._itemTemplateSelectorBindable.bind({
                sourceProperty: null,
                targetProperty: "templateKey",
                expression: newValue
            });
            this.itemTemplateSelector = function (item, index, items) {
                item["$index"] = index;
                _this._itemTemplateSelectorBindable.bindingContext = item;
                return _this._itemTemplateSelectorBindable.get("templateKey");
            };
        }
        else if (typeof newValue === "function") {
            this.itemTemplateSelector = newValue;
        }
    };
    RadListView.prototype.onItemTemplatesChanged = function (oldValue, newValue) {
        this._itemTemplatesInternal = new Array(this._defaultTemplate);
        var newKeyedTemplates = newValue;
        if (newKeyedTemplates) {
            this._itemTemplatesInternal = this._itemTemplatesInternal.concat(newKeyedTemplates);
        }
    };
    RadListView.prototype.onItemTemplateChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onItemSwipeTemplateChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onMultipleSelectionChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onItemReorderChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onItemSwipeChanged = function (oldValue, newValue) {
        console.log("Warning: 'itemSwipe' property is deprecated use 'swipeActions' property instead.");
    };
    RadListView.prototype.onSwipeActionsChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onPullToRefreshChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onLoadOnDemandModeChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onLoadOnDemandBufferSizeChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onSelectionBehaviorChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onSourceCollectionChangedInternal = function (args) {
        if (this._dataUpdatesSuspended === false) {
            this.onSourceCollectionChanged(args);
        }
    };
    RadListView.prototype.onItemsChangedInternal = function (oldValue, newValue) {
        if (oldValue instanceof observableModule.Observable) {
            weakEvents.removeWeakEventListener(oldValue, observableArray.ObservableArray.changeEvent, this.onSourceCollectionChangedInternal, this);
        }
        if (newValue instanceof observableModule.Observable) {
            weakEvents.addWeakEventListener(newValue, observableArray.ObservableArray.changeEvent, this.onSourceCollectionChangedInternal, this);
        }
        this.refresh();
    };
    RadListView.prototype.onItemsChanged = function (oldValue, newValue) {
        this.onItemsChangedInternal(oldValue, newValue);
    };
    RadListView.prototype.onScrollPositionChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onSourceCollectionChanged = function (data) {
        this.refresh();
    };
    RadListView.prototype.refresh = function () {
    };
    RadListView.prototype.getScrollOffset = function () {
        return 0;
    };
    RadListView.prototype.scrollToIndex = function (index, animate, snapMode) {
        if (animate === void 0) { animate = false; }
        if (snapMode === void 0) { snapMode = ListViewItemSnapMode.Auto; }
    };
    RadListView.prototype.scrollWithAmount = function (amount, animate) {
    };
    RadListView.prototype.notifyLoadOnDemandFinished = function () {
    };
    RadListView.prototype.notifyPullToRefreshFinished = function () {
    };
    RadListView.prototype.notifySwipeToExecuteFinished = function () {
    };
    // TODO: get rid of such hacks. This is from code modules ListView implementation
    RadListView.knownFunctions = ["itemTemplateSelector"];
    RadListView.scrolledEvent = "scrolled";
    RadListView.scrollDragEndedEvent = "scrollDragEnded";
    RadListView.scrollStartedEvent = "scrollStarted";
    RadListView.scrollEndedEvent = "scrollEnded";
    RadListView.itemSelectingEvent = "itemSelecting";
    RadListView.itemDeselectingEvent = "itemDeselecting";
    RadListView.itemTapEvent = "itemTap";
    RadListView.itemHoldEvent = "itemHold";
    RadListView.itemSelectedEvent = "itemSelected";
    RadListView.itemDeselectedEvent = "itemDeselected";
    RadListView.itemReorderStartingEvent = "itemReorderStarting";
    RadListView.itemReorderedEvent = "itemReordered";
    RadListView.itemReorderStartedEvent = "itemReorderStarted";
    RadListView.itemSwipingEvent = "itemSwiping";
    RadListView.itemSwipeProgressChangedEvent = "itemSwipeProgressChanged";
    RadListView.itemSwipeProgressStartedEvent = "itemSwipeProgressStarted";
    RadListView.itemSwipeProgressEndedEvent = "itemSwipeProgressEnded";
    RadListView.loadMoreDataRequestedEvent = "loadMoreDataRequested";
    RadListView.pullToRefreshInitiatedEvent = "pullToRefreshInitiated";
    RadListView.itemLoadingEvent = "itemLoading";
    RadListView.dataPopulatedEvent = "dataPopulated";
    RadListView.groupingFunctionProperty = new view_1.Property({
        name: "groupingFunction",
        valueChanged: function (target, oldValue, newValue) {
            target.onGroupingFunctionPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.filteringFunctionProperty = new view_1.Property({
        name: "filteringFunction",
        valueChanged: function (target, oldValue, newValue) {
            target.onFilteringFunctionPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.sortingFunctionProperty = new view_1.Property({
        name: "sortingFunction",
        valueChanged: function (target, oldValue, newValue) {
            target.onSortingFunctionPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.enableCollapsibleGroupsProperty = new view_1.Property({
        name: "enableCollapsibleGroups",
        defaultValue: false,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onEnableCollapsibleGroupsPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.pullToRefreshStyleProperty = new view_1.Property({
        name: "pullToRefreshStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onPullToRefreshStylePropertyChanged(oldValue, newValue);
        }
    });
    RadListView.headerItemTemplateProperty = new view_1.Property({
        name: "headerItemTemplate",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onHeaderItemTemplatePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.footerItemTemplateProperty = new view_1.Property({
        name: "footerItemTemplate",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onFooterItemTemplatePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.reorderModeProperty = new view_1.Property({
        name: "reorderMode",
        defaultValue: ListViewReorderMode.HoldAndDrag,
        valueChanged: function (target, oldValue, newValue) {
            target.onListViewReorderModePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.listViewLayoutProperty = new view_1.Property({
        name: "listViewLayout",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLayoutPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.loadOnDemandItemTemplateProperty = new view_1.Property({
        name: "loadOnDemandItemTemplate",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLoadOnDemandItemTemplatePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemTemplateSelectorProperty = new view_1.Property({
        name: "itemTemplateSelector",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemTemplateSelectorPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemTemplatesProperty = new view_1.Property({
        name: "itemTemplates",
        defaultValue: undefined,
        valueConverter: function (value) {
            if (typeof value === "string") {
                return builder_1.parseMultipleTemplates(value);
            }
            return value;
        },
        valueChanged: function (target, oldValue, newValue) {
            target.onItemTemplatesPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemTemplateProperty = new view_1.Property({
        name: "itemTemplate",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemTemplatePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemSwipeTemplateProperty = new view_1.Property({
        name: "itemSwipeTemplate",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemSwipeTemplatePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.multipleSelectionProperty = new view_1.Property({
        name: "multipleSelection",
        defaultValue: false,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onMultipleSelectionPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemReorderProperty = new view_1.Property({
        name: "itemReorder",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemReorderPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemSwipeProperty = new view_1.Property({
        name: "itemSwipe",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemSwipePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.swipeActionsProperty = new view_1.Property({
        name: "swipeActions",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onSwipeActionsPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.pullToRefreshProperty = new view_1.Property({
        name: "pullToRefresh",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onPullToRefreshPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.loadOnDemandModeProperty = new view_1.Property({
        name: "loadOnDemandMode",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLoadOnDemandModePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.loadOnDemandBufferSizeProperty = new view_1.Property({
        name: "loadOnDemandBufferSize",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onLoadOnDemandBufferSizePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.selectionBehaviorProperty = new view_1.Property({
        name: "selectionBehavior",
        defaultValue: ListViewSelectionBehavior.None,
        valueChanged: function (target, oldValue, newValue) {
            target.onSelectionBehaviorPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemsProperty = new view_1.Property({
        name: "items",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemsPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.scrollPositionProperty = new view_1.Property({
        name: "scrollPosition",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onScrollPositionPropertyChanged(oldValue, newValue);
        },
    });
    return RadListView;
}(viewModule.View));
exports.RadListView = RadListView;
RadListView.enableCollapsibleGroupsProperty.register(RadListView);
RadListView.groupingFunctionProperty.register(RadListView);
RadListView.filteringFunctionProperty.register(RadListView);
RadListView.sortingFunctionProperty.register(RadListView);
RadListView.pullToRefreshStyleProperty.register(RadListView);
RadListView.headerItemTemplateProperty.register(RadListView);
RadListView.footerItemTemplateProperty.register(RadListView);
RadListView.reorderModeProperty.register(RadListView);
RadListView.listViewLayoutProperty.register(RadListView);
RadListView.loadOnDemandItemTemplateProperty.register(RadListView);
RadListView.itemTemplateSelectorProperty.register(RadListView);
RadListView.itemTemplateProperty.register(RadListView);
RadListView.itemTemplatesProperty.register(RadListView);
RadListView.itemSwipeTemplateProperty.register(RadListView);
RadListView.multipleSelectionProperty.register(RadListView);
RadListView.itemReorderProperty.register(RadListView);
RadListView.itemSwipeProperty.register(RadListView);
RadListView.swipeActionsProperty.register(RadListView);
RadListView.pullToRefreshProperty.register(RadListView);
RadListView.loadOnDemandModeProperty.register(RadListView);
RadListView.loadOnDemandBufferSizeProperty.register(RadListView);
RadListView.selectionBehaviorProperty.register(RadListView);
RadListView.itemsProperty.register(RadListView);
RadListView.scrollPositionProperty.register(RadListView);


/***/ }),

/***/ 477:
/*!**************************************!*\
  !*** ./carlist/carlist.component.ts ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var page_1 = __webpack_require__(/*! ui/page */ 20);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var router_2 = __webpack_require__(/*! nativescript-angular/router */ 75);
var carlist_services_1 = __webpack_require__(/*! ./carlist.services */ 505);
var ApplicationSettings = __webpack_require__(/*! application-settings */ 318);
var platform_1 = __webpack_require__(/*! platform */ 7);
var dialogs_1 = __webpack_require__(/*! ui/dialogs */ 84);
var http = __webpack_require__(/*! http */ 83);
var ScreenInfo = (function () {
    function ScreenInfo(heightDIPs, heightPixels, scale, widthDIPs, widthPixels) {
        this.heightDIPs = heightDIPs;
        this.heightPixels = heightPixels;
        this.scale = scale;
        this.widthDIPs = widthDIPs;
        this.widthPixels = widthPixels;
    }
    return ScreenInfo;
}());
var CarlistComponent = (function () {
    function CarlistComponent(router, route, _page, routerExtensions, carlistService) {
        this.router = router;
        this.route = route;
        this._page = _page;
        this.routerExtensions = routerExtensions;
        this.carlistService = carlistService;
        this.vehicles = Array();
        this.count = false;
        this.vehicleLoader = true;
        this.frameworks = Array();
        this.screenInformation = new ScreenInfo(platform_1.screen.mainScreen.heightDIPs, platform_1.screen.mainScreen.heightPixels, platform_1.screen.mainScreen.scale, platform_1.screen.mainScreen.widthDIPs, platform_1.screen.mainScreen.widthPixels);
        console.log("screen Info : ", JSON.stringify(this.screenInformation));
    }
    CarlistComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        this.getVehicle();
        this.user = JSON.parse(ApplicationSettings.getString("user", "{}"));
    };
    CarlistComponent.prototype.getVehicle = function () {
        var _this = this;
        this.carlistService.fleetGet()
            .subscribe(function (result) {
            console.log("Vehicle Get Result : ", JSON.stringify(result));
            if (result.status == 403) {
                console.log("Token Expired .. . . .");
                var refreshToken = JSON.parse(ApplicationSettings.getString("RefreshToken", "{}"));
                _this.tokenRefresh(refreshToken);
            }
            else if (result.length < 1) {
                _this.router.navigate(["addcar"]);
            }
            else {
                _this.vehicleLoader = false;
                _this.vehicles = result;
            }
        }, function (error) {
            dialogs_1.alert("Something went wrong .....");
            _this.router.navigate(["login"]);
            console.log("Vehicle Get Error :", error);
        });
    };
    CarlistComponent.prototype.tokenRefresh = function (refreshToken) {
        var _this = this;
        console.log("refresh token is : ", refreshToken);
        var form = new FormData();
        form.append('grant_type', "refresh_token");
        form.append("client_id", "4qf3c6o1kvo4ufph9jfujamiug");
        form.append("refresh_token", refreshToken);
        http.request({
            url: "https://shyft-auto.auth.us-east-1.amazoncognito.com/oauth2/token",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic NHFmM2M2bzFrdm80dWZwaDlqZnVqYW1pdWc6MXNoN3EwaDIzZmNwa2Y0NmdxbTM5ZGJnM2g2aGI1aGNjdHNocXRiaG1lNzA0Y2JtMzIxZw=="
            },
            content: form
        }).then(function (response) {
            var tokens1 = JSON.stringify(response.content);
            var initial_idToken = tokens1.substr((tokens1.search("id_token") + 11));
            var final_idToken = initial_idToken.substr(0, initial_idToken.indexOf('"'));
            console.log("Id token is : ", final_idToken);
            ApplicationSettings.setString("TOKEN", JSON.stringify(final_idToken));
            ApplicationSettings.setString("IOSToken", JSON.stringify(final_idToken));
            _this.getVehicle();
        }, function (e) {
            console.log("Error occurred in refreshing tokens are : : " + e);
        });
    };
    CarlistComponent.prototype.onVehicleTap = function (args) {
        this.selectedIndexVehicle = args.index;
        var tappedView = args.view, tappedVehicle = tappedView.bindingContext;
        console.log("Selected Vehicle is : " + args.index + " . " + JSON.stringify(tappedVehicle));
        this.vehicle = JSON.stringify(tappedVehicle.id);
        ApplicationSettings.setString("vehicleid", JSON.stringify(tappedVehicle.id));
        var navigationExtras = {
            queryParams: {
                "vehicle": JSON.parse(this.vehicle),
            }
        };
        this.router.navigate(["vendorlist"], navigationExtras);
    };
    CarlistComponent.prototype.submit = function (res) {
        var navigationExtras = {
            queryParams: {}
        };
        this.router.navigate(["pickup"], navigationExtras);
    };
    CarlistComponent.prototype.close = function () {
        this.routerExtensions.back();
    };
    CarlistComponent.prototype.addCar = function () {
        this.router.navigate(["/addcar"]);
    };
    CarlistComponent = __decorate([
        core_1.Component({
            selector: "Carlist",
            /*duleId: module.i*/
            styles: [__webpack_require__(/*! ./carlist.css */ 506)],
            template: __webpack_require__(/*! ./carlist.component.html */ 507),
            providers: [carlist_services_1.CarlistService]
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, page_1.Page, router_2.RouterExtensions, carlist_services_1.CarlistService])
    ], CarlistComponent);
    return CarlistComponent;
}());
exports.CarlistComponent = CarlistComponent;


/***/ }),

/***/ 504:
/*!*******************************************!*\
  !*** ./carlist/carlist-routing.module.ts ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! nativescript-angular/router */ 75);
var carlist_component_1 = __webpack_require__(/*! ./carlist.component */ 477);
var routes = [
    { path: "", component: carlist_component_1.CarlistComponent }
];
var CarlistRoutingModule = (function () {
    function CarlistRoutingModule() {
    }
    CarlistRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], CarlistRoutingModule);
    return CarlistRoutingModule;
}());
exports.CarlistRoutingModule = CarlistRoutingModule;


/***/ }),

/***/ 505:
/*!*************************************!*\
  !*** ./carlist/carlist.services.ts ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var http_1 = __webpack_require__(/*! @angular/http */ 49);
__webpack_require__(/*! rxjs/add/operator/map */ 319);
__webpack_require__(/*! rxjs/add/operator/do */ 320);
var ApplicationSettings = __webpack_require__(/*! application-settings */ 318);
var utils = __webpack_require__(/*! ../shared/utils */ 324);
var CarlistService = (function () {
    function CarlistService(http) {
        this.http = http;
        this.fleetGetUrl = utils.baseurl + "fleet";
        this.vendorGetUrl = utils.baseurl + "vendor";
    }
    //-------------------- fleet GET Request -------------------------------//
    CarlistService.prototype.fleetGet = function () {
        var headers = this.fleetHeader();
        return this.http.get(this.fleetGetUrl, { headers: headers })
            .map(function (res) { return res.json(); });
        // .map((res: Response) => {
        //     console.log("res", JSON.stringify(res))
        //     res.json()
        // if (res) {
        //     if (res.status === 204) {
        //         return [{ status: res.status, json: res }]
        //     }
        //     else if (res.status === 200) {
        //         return [{ status: res.status, json: res }]
        //     }
        // }
        // }).catch((error: any) => {
        //     if (error.status === 500) {
        //         return Observable.throw(new Error(error.status));
        //     }
        //     else if (error.status === 400) {
        //         return Observable.throw(new Error(error.status));
        //     }
        //     else if (error.status === 403) {
        //         return Observable.throw(new Error(error.status));
        //     }
        //     else if (error.status === 406) {
        //         return Observable.throw(new Error(error.status));
        //     }
    };
    CarlistService.prototype.fleetHeader = function () {
        // if (isIOS) {     
        //     this.id_token = localStorage.getItem("IOSToken")
        //             }
        // else
        // {
        //     this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        // }        
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    CarlistService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CarlistService);
    return CarlistService;
}());
exports.CarlistService = CarlistService;


/***/ }),

/***/ 506:
/*!*****************************!*\
  !*** ./carlist/carlist.css ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 507:
/*!****************************************!*\
  !*** ./carlist/carlist.component.html ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<GridLayout columns=\"*\" rows=\"*,8*,*\" >\r\n        <StackLayout col=\"0\" row=\"0\" style=\"background-color: dodgerblue\" >\r\n                        <GridLayout columns=\"*,8*,*\" rows=\"*\">\r\n                                        <StackLayout col=\"0\" row=\"0\">\r\n                                                <Label class=\"h2 fa\" text=\"&#xf053;\" (onTap)=\"close()\" style=\"horizontal-align: left; color: white; padding: 30 0 0 10 \"></Label>                                                             \r\n                                        </StackLayout>\r\n                                        <StackLayout col=\"1\" row=\"0\">\r\n                                                        <Label  [text]='\"Welcome, \"+user'  style=\" color: white; text-align: center\"></Label>                                                                                                                     \r\n                                                        <Label class=\"h2\" text=\"Select Your Vehicle\"  style=\" color: white; text-align: center\"></Label>                                                                                                                                                                             \r\n                                        </StackLayout>\r\n                                        <StackLayout col=\"2\" row=\"0\">\r\n                                                <Label class=\"h2 fa\" text=\"&#xf067;\" (onTap)=\"addCar()\" style=\" color: white; padding: 20 0 0 10 \"></Label>                                                                                                                     \r\n                                        </StackLayout>                                        \r\n                        </GridLayout>                                        \r\n        </StackLayout>\r\n                <RadListView col=\"0\" row=\"1\" [items]=\"vehicles\" (itemTap)=\"onVehicleTap($event)\">\r\n                        <ng-template tkListItemTemplate let-item=\"item\">\r\n                        <GridLayout>\r\n                                <GridLayout columns=\"4*,6*\" rows=\"*\" orientation=\"horizontal\" style=\"border-width: 2; border-color: black\">\r\n                                        <StackLayout col=\"0\" row=\"0\" style=\"border-width: 1; border-color: #dadada\">\r\n                                                <Image [src]=\"'https://s3.amazonaws.com/img.futuredms.com/vehicle/user/'+item?.image\"  style=\"horizontal-align: center; height: 100; width: 100;\"></Image>                                                                        \r\n                                        </StackLayout>\r\n                                        <AbsoluteLayout width=\"45\" height=\"45\" backgroundColor=\"black\" style=\"border-width: 1; border-radius: 50; margin-left: 165\">\r\n                                                <Label class=\"fa\" text=\"&#xf1b9;\" style=\"color: white; font-weight: bold; margin: 10 0 0 10\"></Label>                                                                                                                                                \r\n                                        </AbsoluteLayout>\r\n                                        <StackLayout col=\"1\" row=\"0\" style=\" vertical-align: center;\">\r\n                                                <Label  [text]='item?.year+\" \"+item?.make+\" \"+item?.model' textWrap=\"true\" style=\"text-align: center; font-weight: bold; margin-left: 20\"></Label>\r\n                                                <Label  [text]='\"MILES: \"+item?.miles' textWrap=\"true\" style=\"text-align: center; font-weight: bold\"></Label>  \r\n                                        </StackLayout>\r\n                                </GridLayout>\r\n                        </GridLayout>\r\n                        </ng-template>\r\n                </RadListView>\r\n        <StackLayout col=\"0\" row=\"1\" style=\"vertical-align: center\">\r\n                <ActivityIndicator #activityIndicator [busy]=\"vehicleLoader\"></ActivityIndicator>\r\n        </StackLayout>\r\n        <StackLayout col=\"0\" row=\"2\" style=\"background-color: black\">\r\n        <GridLayout columns=\"*,8*,*\" rows=\"*\">\r\n                <StackLayout col=\"0\" row=\"0\" style=\"vertical-align: center; margin-left: 10\">\r\n                        <Image src=\"res://cloud_icon\" style=\"horizontal-align: center\"></Image>\r\n                </StackLayout>\r\n                <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\r\n                        <Label class=\"h2\" text=\"Shyft Auto By Kloud DMS\"  style=\" color: white; text-align: center\"></Label>                                                                                                                                                                             \r\n                </StackLayout> \r\n                <StackLayout col=\"2\" row=\"0\"></StackLayout>                                    \r\n        </GridLayout> \r\n        </StackLayout>        \r\n</GridLayout>\r\n"

/***/ }),

/***/ 82:
/*!************************************************************!*\
  !*** ../node_modules/nativescript-angular/http/ns-http.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var http_1 = __webpack_require__(/*! @angular/http */ 49);
__webpack_require__(/*! rxjs/add/observable/fromPromise */ 169);
var http_utils_1 = __webpack_require__(/*! ../http-client/http-utils */ 170);
var ns_file_system_1 = __webpack_require__(/*! ../file-system/ns-file-system */ 37);
var NSXSRFStrategy = (function () {
    function NSXSRFStrategy() {
    }
    NSXSRFStrategy.prototype.configureRequest = function (_req) {
        // noop
    };
    return NSXSRFStrategy;
}());
exports.NSXSRFStrategy = NSXSRFStrategy;
var NSHttp = (function (_super) {
    __extends(NSHttp, _super);
    function NSHttp(backend, defaultOptions, nsFileSystem) {
        var _this = _super.call(this, backend, defaultOptions) || this;
        _this.nsFileSystem = nsFileSystem;
        return _this;
    }
    /**
     * Performs a request with `request` http method.
     */
    /**
         * Performs a request with `request` http method.
         */
    NSHttp.prototype.request = /**
         * Performs a request with `request` http method.
         */
    function (req, options) {
        var urlString = typeof req === "string" ? req : req.url;
        if (http_utils_1.isLocalRequest(urlString)) {
            return this.requestLocalFile(urlString);
        }
        else {
            return _super.prototype.request.call(this, req, options);
        }
    };
    /**
     * Performs a request with `get` http method.
     */
    /**
         * Performs a request with `get` http method.
         */
    NSHttp.prototype.get = /**
         * Performs a request with `get` http method.
         */
    function (url, options) {
        if (http_utils_1.isLocalRequest(url)) {
            return this.requestLocalFile(url);
        }
        else {
            return _super.prototype.get.call(this, url, options);
        }
    };
    NSHttp.prototype.requestLocalFile = function (url) {
        return http_utils_1.processLocalFileRequest(url, this.nsFileSystem, createResponse, createResponse);
    };
    NSHttp.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NSHttp.ctorParameters = function () { return [
        { type: http_1.ConnectionBackend, },
        { type: http_1.RequestOptions, },
        { type: ns_file_system_1.NSFileSystem, },
    ]; };
    return NSHttp;
}(http_1.Http));
exports.NSHttp = NSHttp;
function createResponse(url, body, status) {
    return new http_1.Response(new http_1.ResponseOptions({
        body: body,
        status: status,
        statusText: "OK",
        type: status === 200 ? http_1.ResponseType.Default : http_1.ResponseType.Error,
        url: url
    }));
}
//# sourceMappingURL=ns-http.js.map

/***/ })

});