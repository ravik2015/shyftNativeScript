webpackJsonp([4],{

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

/***/ 304:
/*!***********************************************!*\
  !*** ./selectservice/selectservice.module.ts ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var nativescript_module_1 = __webpack_require__(/*! nativescript-angular/nativescript.module */ 165);
var selectservice_routing_module_1 = __webpack_require__(/*! ./selectservice-routing.module */ 512);
var selectservice_component_1 = __webpack_require__(/*! ./selectservice.component */ 479);
var angular_1 = __webpack_require__(/*! nativescript-checkbox/angular */ 515);
var SelectserviceModule = (function () {
    function SelectserviceModule() {
    }
    SelectserviceModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                selectservice_routing_module_1.SelectserviceRoutingModule,
                angular_1.TNSCheckBoxModule
            ],
            declarations: [
                selectservice_component_1.SelectserviceComponent,
            ],
            bootstrap: [
                selectservice_component_1.SelectserviceComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], SelectserviceModule);
    return SelectserviceModule;
}());
exports.SelectserviceModule = SelectserviceModule;


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

/***/ 325:
/*!**********************************************!*\
  !*** ../node_modules/angular2-uuid/index.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var UUID = (function () {
    function UUID() {
        // no-op
    }
    UUID.UUID = function () {
        if (typeof (window) !== "undefined" && typeof (window.crypto) !== "undefined" && typeof (window.crypto.getRandomValues) !== "undefined") {
            // If we have a cryptographically secure PRNG, use that
            // http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
            var buf = new Uint16Array(8);
            window.crypto.getRandomValues(buf);
            return (this.pad4(buf[0]) + this.pad4(buf[1]) + "-" + this.pad4(buf[2]) + "-" + this.pad4(buf[3]) + "-" + this.pad4(buf[4]) + "-" + this.pad4(buf[5]) + this.pad4(buf[6]) + this.pad4(buf[7]));
        }
        else {
            // Otherwise, just use Math.random
            // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
            // https://stackoverflow.com/questions/11605068/why-does-jshint-argue-against-bitwise-operators-how-should-i-express-this-code
            return this.random4() + this.random4() + "-" + this.random4() + "-" + this.random4() + "-" +
                this.random4() + "-" + this.random4() + this.random4() + this.random4();
        }
    };
    UUID.pad4 = function (num) {
        var ret = num.toString(16);
        while (ret.length < 4) {
            ret = "0" + ret;
        }
        return ret;
    };
    UUID.random4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return UUID;
}());
exports.UUID = UUID;
//# sourceMappingURL=index.js.map

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

/***/ 327:
/*!***************************************************************!*\
  !*** ../node_modules/nativescript-permissions/permissions.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**********************************************************************************
 * (c) 2016, Master Technology
 * Licensed under the MIT license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 1.1.3                                      Nathan@master-technology.com
 *********************************************************************************/


/* jshint camelcase: false */
/* global UIDevice, UIDeviceOrientation, getElementsByTagName, android, Promise, java, require, exports */

var application = __webpack_require__(/*! application */ 5);

//noinspection JSUnresolvedVariable,JSUnresolvedFunction
if (typeof application.AndroidApplication.activityRequestPermissionsEvent === 'undefined') {
	throw new Error("You must be using at least version 2.0 of the TNS runtime and core-modules!");
}

// Variables to track any pending promises
var pendingPromises = {}, promiseId = 3000;


//noinspection JSUnresolvedVariable,JSUnresolvedFunction
/**
 * This handles the results of getting the permissions!
 */
application.android.on(application.AndroidApplication.activityRequestPermissionsEvent, function (args) {

	// get current promise set
	//noinspection JSUnresolvedVariable
	var promises = pendingPromises[args.requestCode];

	// We have either gotten a promise from somewhere else or a bug has occurred and android has called us twice
	// In either case we will ignore it...
	if (!promises || typeof promises.granted !== 'function') {
		return;
	}

	// Delete it, since we no longer need to track it
	//noinspection JSUnresolvedVariable
	delete pendingPromises[args.requestCode];

	var trackingResults = promises.results;

	//noinspection JSUnresolvedVariable
	var length = args.permissions.length;
	for (var i = 0; i < length; i++) {
		// Convert back to JS String
		//noinspection JSUnresolvedVariable
		var name = args.permissions[i].toString();

		//noinspection RedundantIfStatementJS,JSUnresolvedVariable,JSUnresolvedFunction
		if (args.grantResults[i] === android.content.pm.PackageManager.PERMISSION_GRANTED) {
			trackingResults[name] = true;
		} else {
			trackingResults[name] = false;
		}
	}

	// Any Failures
	var failureCount = 0;
	for (var key in trackingResults) {
		if (!trackingResults.hasOwnProperty(key)) continue;
		if (trackingResults[key] === false) failureCount++;
	}

	if (failureCount === 0) {
		promises.granted(trackingResults);
	} else {
		promises.failed(trackingResults);
	}

});


exports.hasPermission = hasPermission;
exports.requestPermission = request;
exports.requestPermissions = request;


/**
 * Checks to see if v4 is installed and has the proper calls with it
 * @returns {boolean}
 */
function hasSupportVersion4() {
	//noinspection JSUnresolvedVariable
	if (!android.support || !android.support.v4 || !android.support.v4.content || !android.support.v4.content.ContextCompat || !android.support.v4.content.ContextCompat.checkSelfPermission) {
		console.log("No v4 support");
		return false;
	}
	return true;
}


/**
 *
 * @param perm
 * @returns {boolean}
 */
function hasPermission(perm) {
	// If we don't have support v4 loaded; then we can't run any checks and have to assume
	// that they have put the permission in the manifest and everything is good to go
	if (!hasSupportVersion4()) return true;

	// Check for permission
	// Interesting, this actually works on API less than 23 and will return false if the manifest permission was forgotten...
	//noinspection JSUnresolvedVariable,JSUnresolvedFunction
	var hasPermission = android.content.pm.PackageManager.PERMISSION_GRANTED ==
		android.support.v4.content.ContextCompat.checkSelfPermission(getContext(), perm);

	return (hasPermission);
}

function getContext() {
	//noinspection JSUnresolvedVariable,JSUnresolvedFunction
	var ctx = java.lang.Class.forName("android.app.AppGlobals").getMethod("getInitialApplication", null).invoke(null, null);
	if (ctx) { return ctx; }

	//noinspection JSUnresolvedVariable,JSUnresolvedFunction
	return java.lang.Class.forName("android.app.ActivityThread").getMethod("currentApplication", null).invoke(null, null);
}


function request(inPerms, explanation) {
	var perms;
	if (Array.isArray(inPerms)) {
		perms = inPerms;
	} else {
		perms = [inPerms];
	}

	return new Promise(function (granted, failed) {
		var totalFailures = 0, totalSuccesses = 0;
		var totalCount = perms.length;
		var permTracking = [], permResults = {};
		for (var i = 0; i < totalCount; i++) {
			// Check if we already have permissions, then we can grant automatically
			if (hasPermission(perms[i])) {
				permTracking[i] = true;
				permResults[perms[i]] = true;
				totalSuccesses++;
			} else {
				permTracking[i] = false;
				permResults[perms[i]] = false;
				totalFailures++;
			}
		}

		// If we have all perms, we don't need to continue
		if (totalSuccesses === totalCount) {
			granted(permResults);
			return;
		}

		//noinspection JSUnresolvedVariable
		if (totalFailures > 0 && android.os.Build.VERSION.SDK_INT < 23) {
			// If we are on API < 23 and we get a false back, then this means they forgot to put a manifest permission in...
			failed(permResults);
			return;
		}

		handleRequest(granted, failed, perms, explanation, permResults, permTracking);
	});
}

function handleRequest(granted, failed, perms, explanation, permResults, permTracking) {
	//noinspection JSUnresolvedVariable
	var activity = application.android.foregroundActivity || application.android.startActivity;
	if (activity == null) {
		// Throw this off into the future since an activity is not available....
		setTimeout(function() {
			handleRequest(granted, failed, perms, explanation, permResults, permTracking);
		}, 250);
		return;
	}

	var totalCount = perms.length;
	// Check if we need to show a explanation , if so show it only once.
	for (var i = 0; i < totalCount; i++) {
		if (permTracking[i] === false) {
			//noinspection JSUnresolvedVariable,JSUnresolvedFunction
			if (android.support.v4.app.ActivityCompat.shouldShowRequestPermissionRationale(activity, perms[i])) {
				if (typeof explanation === "function") {
					explanation();
				} else if (explanation && explanation.length) {
					//noinspection JSUnresolvedVariable,JSUnresolvedFunction
					var toast = android.widget.Toast.makeText(getContext(), explanation, android.widget.Toast.LENGTH_LONG);
					//noinspection JSUnresolvedFunction
					toast.setGravity((49), 0, 0);
					toast.show();
				}

				// We don't need to show the explanation more than one time, if we even need to at all
				break;
			}
		}
	}

	// Build list of Perms we actually need to request
	var requestPerms = [];
	for (i = 0; i < totalCount; i++) {
		if (permTracking[i] === false) {
			requestPerms.push(perms[i]);
		}
	}

	// Ask for permissions
	promiseId++;
	pendingPromises[promiseId] = {granted: granted, failed: failed, results: permResults};

	//noinspection JSUnresolvedVariable,JSUnresolvedFunction
	android.support.v4.app.ActivityCompat.requestPermissions(activity, requestPerms, promiseId);

}


/***/ }),

/***/ 328:
/*!*************************************************!*\
  !*** ./selectservice/selectservice.services.ts ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var http_1 = __webpack_require__(/*! @angular/http */ 49);
var ApplicationSettings = __webpack_require__(/*! application-settings */ 318);
var Observable_1 = __webpack_require__(/*! rxjs/Observable */ 4);
__webpack_require__(/*! rxjs/add/operator/do */ 320);
__webpack_require__(/*! rxjs/add/operator/map */ 319);
var utils = __webpack_require__(/*! ../shared/utils */ 324);
var angular2_uuid_1 = __webpack_require__(/*! angular2-uuid */ 325);
__webpack_require__(/*! rxjs/add/observable/of */ 329);
var SelectService = (function () {
    function SelectService(http) {
        this.http = http;
        this.servicesSelections = Array();
        this.test = Array();
        var date = new Date();
        var isoDate = date.toISOString();
        this.customerAppointment = {
            "id": "",
            "datetime": isoDate,
            "status": "Pending",
            "vendor": ""
        };
    }
    //---------------------- Service GET Request ----------------------------//
    SelectService.prototype.servicesGet = function (ID) {
        this.vendorID = ID.replace(/["']/g, "");
        var ServiceGetUrl = utils.baseurl + "vendor/" + this.vendorID;
        var headers = this.servicesHeader();
        return this.http.get(ServiceGetUrl, { headers: headers })
            .map(function (res) {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                return res.json();
            }
        });
    };
    SelectService.prototype.servicesHeader = function () {
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    SelectService.prototype.createCustomerAppointment = function (uuid, vendorId) {
        this.customerAppointment.id = uuid;
        this.customerAppointment.vendor = vendorId;
        console.log("uuid: ", uuid, "vendorId: ", " this.customerAppointment: ", JSON.stringify(this.customerAppointment));
        return Observable_1.Observable.of(this.customerAppointment);
    };
    SelectService.prototype.createAppointment = function (uuid, vendorId, date) {
        var _this = this;
        console.log("appointmentid : ", uuid, "vendorid", vendorId, "date : ", date);
        ApplicationSettings.setString("appointmentid", JSON.stringify(uuid));
        this.appointmentid = uuid;
        var appointmentCreateURL = "https://uat.futuredms.com/shyft-api/appointment/" + this.appointmentid;
        // if (isIOS) {     
        //     this.id_token = localStorage.getItem("IOSToken")
        //             }
        // else
        // {
        //     this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        // }
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        var appointment = {
            "id": this.appointmentid,
            "datetime": date,
            "status": "Pending",
            "vendor": vendorId
        };
        console.log("Appointment Create Url --> ", appointmentCreateURL);
        console.log("Appointment PUT Data Testing-----> ", JSON.stringify(appointment));
        headers.append("Authorization", this.id_token);
        return this.http.put(appointmentCreateURL, appointment, { headers: headers })
            .subscribe(function (result) {
            console.log("Appointment Create Success : ", (JSON.stringify(result)));
            var services = JSON.parse(ApplicationSettings.getString("servicesSelections"));
            services.map(function (item) {
                console.log("Service parse are : ", JSON.stringify(item));
            });
        }, function (error) {
            console.log("Appointment Create Error : ", error);
            _this.vehicleAdd();
            var services = JSON.parse(ApplicationSettings.getString("servicesSelections"));
            services.map(function (item) {
                console.log("service are", item.service);
                _this.serviceAdd(item.service);
            });
        });
    };
    SelectService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Observable_1.Observable.throw(error);
    };
    SelectService.prototype.serviceAdd = function (servicesId) {
        var serviceid = angular2_uuid_1.UUID.UUID();
        var serviceSelectionURL = "https://uat.futuredms.com/shyft-api/appointment/" + this.appointmentid + "/service-selection/" + serviceid;
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        headers.append("Authorization", this.id_token);
        ;
        var serviceBody = {
            "id": serviceid,
            "status": "pending",
            "service": servicesId
        };
        return this.http.put(serviceSelectionURL, serviceBody, { headers: headers })
            .subscribe(function (result) {
            console.log("Service added to Appointment : ", JSON.stringify(result));
        }, function (error) {
            console.log("Service add Error : ", error);
        });
    };
    SelectService.prototype.addServiceSelectionIntoAppointment = function (servicesSelection) {
        this.customerAppointment.serviceSelections = servicesSelection;
    };
    SelectService.prototype.getCustomerAppointment = function () {
        return Observable_1.Observable.of(this.customerAppointment);
    };
    SelectService.prototype.addServiceSelection = function (serviceSelection) {
        this.servicesSelections.push(serviceSelection);
        this.customerAppointment.serviceSelections.push(serviceSelection);
    };
    SelectService.prototype.getServicesSelections = function () {
        console.log("this.selectService.getServicesSelections()", this.servicesSelections);
        return this.servicesSelections;
    };
    SelectService.prototype.serviceSelection = function (serviceID, uuid) {
        this.serviceID = serviceID;
        this.appointmentid = uuid;
        var serviceid = angular2_uuid_1.UUID.UUID();
        var serviceBody = {
            "id": serviceid,
            "status": "pending",
            "service": this.serviceID
        };
        this.servicesSelections.push(serviceBody);
        this.customerAppointment.serviceSelections = this.servicesSelections;
        ApplicationSettings.setString("servicesSelections", JSON.stringify(this.servicesSelections));
    };
    SelectService.prototype.vehicleAdd = function () {
        var vehicleUUID = angular2_uuid_1.UUID.UUID();
        var vehicleaddURL = "https://uat.futuredms.com/shyft-api/appointment/" + this.appointmentid + "/vehicle";
        // if (isIOS) {     
        //     this.id_token = localStorage.getItem("IOSToken")
        //             }
        // else
        // {
        //     this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        // }
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        var date = new Date();
        var isoDate = date.toISOString();
        console.log(" this is my iso date ------> ", isoDate);
        var vehicleadd = {
            "id": vehicleUUID,
            "vehicleId": JSON.parse(ApplicationSettings.getString("vehicleid")),
            "miles": 123
        };
        console.log("vehicleadd create url --> ", vehicleaddURL);
        console.log("vehicleadd PUT Data Testing-----> ", JSON.stringify(vehicleadd));
        headers.append("Authorization", this.id_token);
        return this.http.put(vehicleaddURL, vehicleadd, { headers: headers })
            .subscribe(function (result) {
            console.log("Vehicle Add Success ------------> ", JSON.stringify(result));
        }, function (error) {
            console.log("Vehicle Add Error ------------>", error);
        });
    };
    SelectService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], SelectService);
    return SelectService;
}());
exports.SelectService = SelectService;


/***/ }),

/***/ 329:
/*!*************************************************!*\
  !*** ../node_modules/rxjs/add/observable/of.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(/*! ../../Observable */ 4);
var of_1 = __webpack_require__(/*! ../../observable/of */ 174);
Observable_1.Observable.of = of_1.of;
//# sourceMappingURL=of.js.map

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

/***/ 469:
/*!***************************************************!*\
  !*** ../node_modules/nativescript-phone/index.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

const app = __webpack_require__(/*! application */ 5);
const permissions = __webpack_require__(/*! nativescript-permissions */ 327);

const CurrentContext = app.android.currentContext;
const Intent = android.content.Intent;
const ContextCompat = android.support.v4.content.ContextCompat;
const CALL_PHONE = android.Manifest.permission.CALL_PHONE;
const PERMISSION_GRANTED = android.content.pm.PackageManager.PERMISSION_GRANTED;

function dial(telNum, prompt) {
  try {
    if (prompt === void 0) { prompt = true; }
    var intentType = Intent.ACTION_DIAL;

    if (prompt === false) {
      // check permissions
      var hasPerms = permissions.hasPermission(CALL_PHONE);
      if (hasPerms === false) {
        return "Application does not have permission to call directly.";
      }

      intentType = Intent.ACTION_CALL;
    }

    var intent = new Intent(intentType);

    // support for ussd numbers with # on android
    telNum = telNum.replace("#", encodeURIComponent("#"));

    intent.setData(android.net.Uri.parse("tel:" + telNum));

    app.android.foregroundActivity.startActivity(intent);

    return true;
  } catch (ex) {
    console.log(ex);
    return ex;
  }
}

function sms(smsNum, messageText) {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(smsNum)) {
      smsNum = [smsNum];
    }

    try {
      var SEND_SMS = 1001;
      // var intent = new Intent(Intent.ACTION_SENDTO);
      var intent = new Intent(Intent.ACTION_VIEW);
      // intent.addCategory(Intent.CATEGORY_DEFAULT);
      intent.putExtra("sms_body", messageText);
      intent.setType("vnd.android-dir/mms-sms");
      intent.setData(android.net.Uri.parse("sms:" + smsNum.join(";")));

      app.android.foregroundActivity.startActivityForResult(intent, SEND_SMS);

      // var previousResult = app.android.onActivityResult;
      app.android.onActivityResult = function(requestCode, resultCode, data) {
        // Check which request we're responding to
        if (requestCode === SEND_SMS) {
          if (resultCode === android.app.Activity.RESULT_OK) {
            return resolve({
              response: "success"
            });
          } else if (resultCode === android.app.Activity.RESULT_CANCELED) {
            return resolve({
              response: "cancelled"
            });
          } else {
            return resolve({
              response: "failed"
            });
          }
        }
      };
    } catch (ex) {
      reject(ex.toString());
    }
  });
}

function requestCallPermission(explanation) {
  if (explanation !== "") {
    permissions.requestPermission(CALL_PHONE, explanation).then(
      function(result) {
        return result;
      },
      function(error) {
        return error;
      }
    );
  }
}

function hasCallPermission() {
  var result = permissions.hasPermission(CALL_PHONE);
  return result;
}

exports.dial = dial;
exports.sms = sms;
exports.requestCallPermission = requestCallPermission;


/***/ }),

/***/ 479:
/*!**************************************************!*\
  !*** ./selectservice/selectservice.component.ts ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var router_2 = __webpack_require__(/*! nativescript-angular/router */ 75);
var page_1 = __webpack_require__(/*! ui/page */ 20);
var dialogs_1 = __webpack_require__(/*! nativescript-angular/directives/dialogs */ 166);
var angular_1 = __webpack_require__(/*! nativescript-pro-ui/sidedrawer/angular */ 466);
var selectservice_services_1 = __webpack_require__(/*! ./selectservice.services */ 328);
var ApplicationSettings = __webpack_require__(/*! application-settings */ 318);
var Phone = __webpack_require__(/*! nativescript-phone */ 469);
var platform = __webpack_require__(/*! platform */ 7);
var application = __webpack_require__(/*! application */ 5);
var SelectserviceComponent = (function () {
    function SelectserviceComponent(router, route, _page, modal, vcRef, selectService, routerExtension) {
        var _this = this;
        this.router = router;
        this.route = route;
        this._page = _page;
        this.modal = modal;
        this.vcRef = vcRef;
        this.selectService = selectService;
        this.routerExtension = routerExtension;
        this.state1 = true;
        this.state2 = true;
        this.state3 = true;
        this.state4 = true;
        this.state5 = true;
        this.state6 = true;
        this.state7 = true;
        this.state8 = true;
        this.servicesstate = true;
        this.buttonstate = true;
        this.vendorServices = Array();
        this.selectedServices = Array();
        this.datastate = true;
        this.vendorAddress = Object();
        this.vendorCategories = Array();
        if (this.route.queryParams) {
            this.route.queryParams.subscribe(function (params) {
                _this.vendorID = params["serviceID"];
                _this.vehicleID = params["vehicleID"];
                _this.appointmentUUID = params["appointmentUUID"];
                _this.deliveryfee = params["deliveryfee"];
            });
        }
        var vendor = JSON.parse(ApplicationSettings.getString("vendor"));
        this.vendorName = vendor.name;
        this.vendorEmail = vendor.email;
        this.vendorPhone = vendor.phoneNumber;
        this.vendorLogo = vendor.logo;
        this.vendorAddress = vendor.location.address;
        this.user = JSON.parse(ApplicationSettings.getString("user", "{}"));
        if (this.vendorCategories.length > 0) {
            console.log("if", this.vendorCategories.length);
            this.buttonstate = true;
        }
        else {
            console.log("else", this.vendorCategories.length);
            this.buttonstate = false;
        }
    }
    SelectserviceComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        this.getServiceStation();
        // this.createAppointment();
        this.user = JSON.parse(ApplicationSettings.getString("user", "{}"));
        ApplicationSettings.setString("vendorLogo", JSON.stringify(this.vendorLogo));
    };
    Object.defineProperty(SelectserviceComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    SelectserviceComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    SelectserviceComponent.prototype.getServiceStation = function () {
        var _this = this;
        this.selectService.servicesGet(this.vendorID)
            .subscribe(function (result) {
            result.categories.map(function (category) {
                console.log("Category : ", JSON.stringify(category));
                _this.vendorCategories.push(category);
                // category.services.map((service) => {
                //     console.log("Services : ", JSON.stringify(service))        
                //     this.vendorServices.push(service)                  
                // })       
                _this.buttonstate = true;
            });
            _this.datastate = false;
        }, function (error) {
            console.log("Vendor Details Get Error : ", error);
        });
    };
    SelectserviceComponent.prototype.createAppointment = function () {
        this.selectService.createCustomerAppointment(this.appointmentUUID, this.vendorID);
    };
    SelectserviceComponent.prototype.vehicleHistory = function () {
        // this.state1 = !this.state1
        // setTimeout(() => {
        //     this.state1 = true;
        // }, 1000);
        // this.router.navigate(["appointmentlisting"]);
        this.router.navigate(["status"]);
    };
    SelectserviceComponent.prototype.vehicleService = function () {
        var _this = this;
        this.createAppointment();
        setTimeout(function () {
            _this.state2 = true;
        }, 1000);
        var navigationExtras = {
            queryParams: {
                "appointmentUUID": this.appointmentUUID,
                "vendorCategories": JSON.stringify(this.vendorCategories),
                "vendorID": this.vendorID,
                "vehicleID": this.vehicleID,
                "deliveryfee": this.deliveryfee
            }
        };
        this.router.navigate(["servicecategory"], navigationExtras);
    };
    SelectserviceComponent.prototype.vehicleHealth = function () {
        var _this = this;
        this.state3 = !this.state3;
        setTimeout(function () {
            _this.state3 = true;
        }, 1000);
    };
    SelectserviceComponent.prototype.checkForRecalls = function () {
    };
    SelectserviceComponent.prototype.valueInventory = function () {
        var _this = this;
        this.state5 = !this.state5;
        setTimeout(function () {
            _this.state5 = true;
        }, 1000);
    };
    SelectserviceComponent.prototype.warranties = function () {
        var _this = this;
        this.state6 = !this.state6;
        setTimeout(function () {
            _this.state6 = true;
        }, 1000);
    };
    SelectserviceComponent.prototype.navigation = function () {
        var _this = this;
        this.state7 = !this.state7;
        setTimeout(function () {
            _this.state7 = true;
        }, 1000);
    };
    SelectserviceComponent.prototype.priceVehicleRepairs = function () {
        var _this = this;
        this.state8 = !this.state8;
        setTimeout(function () {
            _this.state8 = true;
        }, 1000);
    };
    SelectserviceComponent.prototype.back = function () {
        this.routerExtension.back();
    };
    SelectserviceComponent.prototype.callDealer = function () {
        Phone.dial(this.vendorPhone, true);
    };
    SelectserviceComponent.prototype.scheduleService = function () {
        this.routerExtension.navigate(["/carlist"], { clearHistory: true });
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], SelectserviceComponent.prototype, "drawerComponent", void 0);
    SelectserviceComponent = __decorate([
        core_1.Component({
            selector: "Selectservice",
            /*duleId: module.i*/
            styles: [__webpack_require__(/*! ./selectservice.css */ 513)],
            template: __webpack_require__(/*! ./selectservice.component.html */ 514),
            providers: [selectservice_services_1.SelectService]
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, page_1.Page, dialogs_1.ModalDialogService, core_1.ViewContainerRef, selectservice_services_1.SelectService, router_2.RouterExtensions])
    ], SelectserviceComponent);
    return SelectserviceComponent;
}());
exports.SelectserviceComponent = SelectserviceComponent;


/***/ }),

/***/ 512:
/*!*******************************************************!*\
  !*** ./selectservice/selectservice-routing.module.ts ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! nativescript-angular/router */ 75);
var selectservice_component_1 = __webpack_require__(/*! ./selectservice.component */ 479);
var routes = [
    { path: "", component: selectservice_component_1.SelectserviceComponent },
];
var SelectserviceRoutingModule = (function () {
    function SelectserviceRoutingModule() {
    }
    SelectserviceRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], SelectserviceRoutingModule);
    return SelectserviceRoutingModule;
}());
exports.SelectserviceRoutingModule = SelectserviceRoutingModule;


/***/ }),

/***/ 513:
/*!*****************************************!*\
  !*** ./selectservice/selectservice.css ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = ".V1{background-color:black;border-color:black}.V3{background-color:#7cafe5;border-color:black}\n"

/***/ }),

/***/ 514:
/*!****************************************************!*\
  !*** ./selectservice/selectservice.component.html ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<!-- <StackLayout tkDrawerContent>\r\n                <RightDrawer></RightDrawer>\r\n        </StackLayout> -->\r\n<GridLayout columns=\"*\" rows=\"*,6*,3*\">\r\n        <StackLayout col=\"0\" row=\"0\" style=\"background-color: black\">\r\n                <GridLayout columns=\"*,8*,*\" rows=\"*\">\r\n                        <StackLayout col=\"0\" row=\"0\" [visibility]=\"!this.buttonstate ? 'visible' : 'collapsed'\">\r\n                        </StackLayout>\r\n                        <StackLayout col=\"0\" row=\"0\" [visibility]=\"this.buttonstate ? 'visible' : 'collapsed'\">\r\n                                <Label class=\"h2 fa\" text=\"&#xf053;\" (onTap)=\"back()\" style=\"horizontal-align: left; color: white; padding: 20 0 0 10 \"></Label>\r\n                        </StackLayout>\r\n                        <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\r\n                                <Label class=\"h2\" text=\"Schedule your vehicle\" style=\" color: white; text-align: center\"></Label>\r\n                        </StackLayout>\r\n                        <StackLayout col=\"2\" row=\"0\"></StackLayout>\r\n                </GridLayout>\r\n        </StackLayout>\r\n        <StackLayout col=\"0\" row=\"1\" style=\"background-color: white\">\r\n                <GridLayout columns=\"*\" rows=\"2*,8*\">\r\n                        <StackLayout col=\"0\" row=\"0\" style=\"background-color: white; border-bottom-width: 1; border-color: #404040\">\r\n                                <Image src=\"res://shyftlogo\"></Image>\r\n                        </StackLayout>\r\n                        <StackLayout col=\"0\" row=\"1\" style=\"background-color: white\">\r\n                                <GridLayout columns=\"*\" rows=\"3.5*,3*,3.5*\">\r\n                                        <StackLayout col=\"0\" row=\"0\">\r\n                                                <GridLayout columns=\"3.5*,3*,3.5*\" rows=\"*\">\r\n                                                        <StackLayout col=\"0\" row=\"0\">\r\n\r\n                                                        </StackLayout>\r\n                                                        <StackLayout col=\"1\" row=\"0\" (onTap)=\"scheduleService()\" style=\"text-align: center; font-weight: bold\">\r\n                                                                <Image src=\"res://caroil\" style=\"color: black; height:50; width: 50\"></Image>\r\n                                                                <Label text=\"Select\"></Label>\r\n                                                                <Label text=\"Maintenance\"></Label>\r\n                                                        </StackLayout>\r\n                                                        <StackLayout col=\"2\" row=\"0\">\r\n\r\n                                                        </StackLayout>\r\n                                                </GridLayout>\r\n                                        </StackLayout>\r\n                                        <StackLayout col=\"0\" row=\"1\">\r\n                                                <GridLayout columns=\"3.5*,3*,3.5*\" rows=\"*\">\r\n                                                        <StackLayout col=\"0\" row=\"0\" (onTap)=\"callDealer()\" style=\"text-align: center; font-weight: bold\">\r\n                                                                <Image src=\"res://call\" style=\"color: black; height:50; width: 50;\"></Image>\r\n                                                                <Label text=\"Call\"></Label>\r\n                                                                <Label text=\"Dealer\"></Label>\r\n                                                        </StackLayout>\r\n                                                        <StackLayout col=\"1\" row=\"0\">\r\n                                                                <Image [src]=\"'https://s3.amazonaws.com/img.futuredms.com/vendors/logos/'+vendorLogo\"></Image>\r\n                                                        </StackLayout>\r\n                                                        <StackLayout col=\"2\" (onTap)=\"vehicleService()\" [visibility]=\"this.buttonstate ? 'visible' : 'collapsed'\" row=\"0\" style=\"text-align: center; font-weight: bold\">\r\n                                                                <Image src=\"res://service\" style=\"color: black; height:50; width: 50\"></Image>\r\n                                                                <Label text=\"Recommended\"></Label>\r\n                                                                <Label text=\"Services\"></Label>\r\n                                                        </StackLayout>\r\n                                                        <StackLayout col=\"2\" [visibility]=\"!this.buttonstate ? 'visible' : 'collapsed'\" row=\"0\" style=\"text-align: center; font-weight: bold\">\r\n                                                                <Image src=\"res://service\" style=\"color: black; height:50; width: 50\"></Image>\r\n                                                                <Label text=\"No\"></Label>\r\n                                                                <Label text=\"Services\"></Label>\r\n                                                        </StackLayout>\r\n                                                </GridLayout>\r\n                                        </StackLayout>\r\n                                        <StackLayout col=\"0\" row=\"2\">\r\n                                                <GridLayout columns=\"3.5*,3*,3.5*\" rows=\"*\">\r\n                                                        <StackLayout col=\"0\" row=\"0\">\r\n\r\n                                                        </StackLayout>\r\n                                                        <StackLayout col=\"1\" row=\"0\" (onTap)=\"vehicleHistory()\" style=\"text-align: center; font-weight: bold\">\r\n                                                                <Image src=\"res://briefcase\" style=\"color: black; height:50; width: 50\"></Image>\r\n                                                                <Label text=\"Vehicle\"></Label>\r\n                                                                <Label text=\"History\"></Label>\r\n                                                        </StackLayout>\r\n                                                        <StackLayout col=\"2\" row=\"0\">\r\n\r\n                                                        </StackLayout>\r\n                                                </GridLayout>\r\n                                        </StackLayout>\r\n                                </GridLayout>\r\n                        </StackLayout>\r\n                </GridLayout>\r\n        </StackLayout>\r\n        <GridLayout col=\"0\" row=\"2\" columns=\"*\" rows=\"2*,8*\" style=\"border-color: #404040; border-top-width: 2;\">\r\n                <StackLayout col=\"0\" row=\"0\" style=\"vertical-align: center\">\r\n                        <Label text=\"Our Mission\" style=\"font-weight: bold; text-align: center;\"></Label>\r\n                </StackLayout>\r\n                <StackLayout col=\"0\" row=\"1\" style=\"vertical-align: center; padding-top:5; border-color: #170095; border-width: 2; margin:0 5 10 5\">\r\n                        <Label text=\"Eliminate the need of taking your vehicle into a service facility for repairs or maintenance. We service over 40 states and have 2000 certified service facilities sign up to use our service. In the end the goal is to make your life easier by offering a no brainer product.\" textWrap=\"true\" style=\"text-align: center;\"></Label>\r\n                </StackLayout>\r\n\r\n                <!-- <Label class=\"fa\" text=\"&#xf155;\" style=\"color: black; background-color: white; border-width: 1; border-radius: 75; padding: 5\"></Label>\r\n                <Label text=\"1/5 Shyft Coins Earned for Free Pickup\" style=\"color: white; margin-left: 5; font-weight: bold; vertical-align: center;\"></Label> -->\r\n        </GridLayout>\r\n</GridLayout>\r\n<!-- <GridLayout columns=\"*\" rows=\"4*,*,3*,2*\" tkMainContent>\r\n        <StackLayout col=0 row=0>\r\n                <GridLayout rows=\"2*,8*\" columns=\"*\">\r\n                        <StackLayout col=0 row=0 orientation=\"horizontal\">\r\n                                <GridLayout rows=\"*\" columns=\"6*,*,3*\">\r\n                                        <StackLayout col=0 row=0>\r\n                                                <Label [text]=\"'Welcome, '+user\" style=\"padding: 10; background-color: black; color: white;\"></Label>\r\n                                        </StackLayout>\r\n                                        <StackLayout col=1 row=0>\r\n                                        </StackLayout>\r\n                                        <StackLayout col=2 row=0 style=\"horizontal-align: right; margin: 5 5 0 0;\">\r\n                                        </StackLayout>\r\n                                </GridLayout>\r\n                        </StackLayout>\r\n                        <StackLayout col=0 row=2 style=\"border-width: 1; border-color: #404040\">\r\n                                <GridLayout rows=\"*\" columns=\"4*,6*\">\r\n                                        <StackLayout col=0 row=0 style=\"vertical-align: center\">\r\n                                                <Image [src]=\"'https://s3.amazonaws.com/img.futuredms.com/vendors/logos/'+vendorLogo\" style=\"horizontal-align: center; \"></Image>\r\n                                        </StackLayout>\r\n                                        <StackLayout col=1 row=0 marginLeft=5 style=\"vertical-align: center\">\r\n                                                <Label [text]=\"vendorName\" style=\"font-weight: bold\"></Label>\r\n                                                <Label [text]=\"vendorEmail\" style=\"font-weight: bold\"></Label>\r\n                                                <Label [text]=\"vendorPhone\" style=\"font-weight: bold\"></Label>\r\n                                                <Label [text]=\"vendorAddress.addressLine1+', '+vendorAddress.addressLine2\"  textWrap=\"true\" style=\"font-weight: bold;\"></Label>\r\n                                                <Label [text]=\"vendorAddress.addressLine3+', '+vendorAddress.city\" style=\"font-weight: bold\"></Label>\r\n                                                <Label [text]=\"vendorAddress.state+', '+vendorAddress.zip\" style=\"font-weight: bold\"></Label>\r\n                                        </StackLayout>\r\n                                </GridLayout>\r\n                        </StackLayout>\r\n                </GridLayout>\r\n        </StackLayout>\r\n        <StackLayout col=0 row=1 style=\"border-bottom-width: 1; border-color: #909090\">\r\n                <GridLayout cols=\"7*,3*\" rows=\"*\" orientation=\"horizontal\">\r\n                        <StackLayout col=0 row=0 style=\"horizontal-align: left; vertical-align: center;\">\r\n                                <Label class=\"h2\" text=\"Dashboard\" style=\"padding-left: 10; font-weight: bold;\"></Label>\r\n                        </StackLayout>\r\n                        <StackLayout col=1 row=0 style=\"horizontal-align: right; vertical-align: center;\">\r\n                                <Label class=\"h3\" text=\"More >\" style=\"padding-right: 10; font-weight: bold; color: black\"></Label>\r\n                        </StackLayout>\r\n                </GridLayout>\r\n        </StackLayout>\r\n                <GridLayout col=0 row=2 columns=\"*\" rows=\"*,*\">\r\n                <Stacklayout orientation=\"horizontal\" style=\"vertical-align: center\" [class]=\"state1 ? 'V1' : 'V3'\" column=\"0\" row=\"0\" padding=\"20\"\r\n                        margin=\"20 20 10 20\" (onTap)=\"vehicleHistory()\">\r\n                        <Label class=\"fa\" text=\"&#xf1b9;\" style=\"text-align: center; margin-left: 10; color:white;\"></Label>\r\n                        <Label text=\"Appointment History\" style=\" font-weight: bold; margin-left: 10;  color:white;\"></Label>\r\n                </Stacklayout>\r\n                <Stacklayout orientation=\"horizontal\" style=\"vertical-align: center\" [class]=\"state2 ? 'V1' : 'V3'\" column=\"0\" row=\"1\" padding=\"20\"\r\n                        margin=\"10 20 20 20\" (onTap)=\"vehicleService()\" [visibility]=\"!this.datastate ? 'visible' : 'collapsed'\">\r\n                        <Label class=\"fa\" text=\"&#xf013;\" style=\"text-align: center; margin-left: 10; color:white;\"></Label>\r\n                        <Label text=\"Vehicle Service\" style=\" font-weight: bold; margin-left: 10;  color:white;\"></Label>\r\n                </Stacklayout>\r\n                <Stacklayout orientation=\"horizontal\" style=\"vertical-align: center\" [class]=\"state2 ? 'V1' : 'V3'\" column=\"0\" row=\"1\" padding=\"20\"\r\n                        margin=\"10 20 20 20\" [visibility]=\"this.datastate ? 'visible' : 'collapsed'\">\r\n                        <Label class=\"fa\" text=\"&#xf013;\" style=\"text-align: center; margin-left: 10; color:white;\"></Label>\r\n                        <Label text=\"No Services\" style=\" font-weight: bold; margin-left: 10;  color:white;\"></Label>\r\n                </Stacklayout>\r\n        </GridLayout>\r\n        <GridLayout col=0 row=3 columns=\"*\" rows=\"2*,8*\">\r\n                <StackLayout col=0 row=0 style=\" border-width: 1; border-color: black; background-color: #7cafe5\">\r\n                        <Label text=\"Shyft Coins\" style=\"color: white; horizontal-align: center; \"></Label>\r\n                </StackLayout>\r\n                <StackLayout col=0 row=1>\r\n                        <GridLayout columns=\"2*,6*,2*\" rows=\"*\" style=\"padding: 3;\">\r\n                                <Stacklayout col=\"0\" row=\"0\" (onTap)=\"back()\" style=\"vertical-align: bottom\">\r\n                                        <Label class=\"fa h2\" text=\"&#xf060;\" style=\" color:black; horizontal-align: left;\"></Label>\r\n                                </Stacklayout>\r\n                                <Stacklayout col=\"1\" row=\"0\" style=\"border-color: black; border-width: 2\">\r\n                                        <Label text=\"12,479\" style=\"padding: 2; font-weight: bold; color:white; background-color: #7cafe5; horizontal-align: center; boder-width: 1; border-color: black \"></Label>\r\n                                        <Label text=\"341\" style=\"font-weight: bold; color:black; horizontal-align: center;\"></Label>\r\n                                        <Label text=\"Shyft Coins \" style=\"font-weight: bold; color:black; horizontal-align: center;\"></Label>\r\n                                        <Label text=\"to earn \" style=\"font-weight: bold; color:black; horizontal-align: center;\"></Label>\r\n                                        <Label text=\"FREE Oil Change \" style=\"font-weight: bold; color:black; horizontal-align: center;\"></Label>\r\n                                </Stacklayout>\r\n                                <Stacklayout col=\"2\" row=\"0\"></Stacklayout>\r\n                        </GridLayout>\r\n                </StackLayout>\r\n        </GridLayout>\r\n</GridLayout> -->"

/***/ }),

/***/ 515:
/*!**************************************************************!*\
  !*** ../node_modules/nativescript-checkbox/angular/index.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var forms_1 = __webpack_require__(/*! @angular/forms */ 18);
var element_registry_1 = __webpack_require__(/*! nativescript-angular/element-registry */ 29);
var base_value_accessor_1 = __webpack_require__(/*! nativescript-angular/forms/value-accessors/base-value-accessor */ 23);
var lang_facade_1 = __webpack_require__(/*! nativescript-angular/lang-facade */ 41);
function convertToInt(value) {
    var normalizedValue;
    if (lang_facade_1.isBlank(value)) {
        normalizedValue = 0;
    }
    else {
        if (typeof value === "number") {
            normalizedValue = value;
        }
        else {
            var parsedValue = parseInt(value.toString(), 10);
            normalizedValue = isNaN(parsedValue) ? 0 : parsedValue;
        }
    }
    return Math.round(normalizedValue);
}
element_registry_1.registerElement("CheckBox", function () { return __webpack_require__(/*! ../checkbox */ 516).CheckBox; });
var CHECKED_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CheckedValueAccessor; }),
    multi: true
};
var CheckedValueAccessor = (function (_super) {
    __extends(CheckedValueAccessor, _super);
    function CheckedValueAccessor(elementRef) {
        var _this = _super.call(this, elementRef.nativeElement) || this;
        _this.onTouched = function () { };
        return _this;
    }
    CheckedValueAccessor.prototype.checkedChangeListener = function (event) {
        this.onChange(event.value);
    };
    CheckedValueAccessor.prototype.writeValue = function (value) {
        this.view.checked = value;
    };
    CheckedValueAccessor.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return CheckedValueAccessor;
}(base_value_accessor_1.BaseValueAccessor));
__decorate([
    core_1.HostListener("checkedChange", ["$event"])
], CheckedValueAccessor.prototype, "checkedChangeListener", null);
CheckedValueAccessor = __decorate([
    core_1.Directive({
        selector: "CheckBox[ngModel], CheckBox[formControlName], CheckBox[formControl], checkBox[ngModel], checkBox[formControlName], checkBox[formControl], check-box[ngModel], check-box[formControlName], check-box[formControl]",
        providers: [CHECKED_VALUE_ACCESSOR]
    }),
    __param(0, core_1.Inject(core_1.ElementRef))
], CheckedValueAccessor);
exports.CheckedValueAccessor = CheckedValueAccessor;
var TNSCheckBoxModule = (function () {
    function TNSCheckBoxModule() {
    }
    return TNSCheckBoxModule;
}());
TNSCheckBoxModule = __decorate([
    core_1.NgModule({
        declarations: [CheckedValueAccessor],
        providers: [],
        imports: [forms_1.FormsModule],
        exports: [forms_1.FormsModule, CheckedValueAccessor]
    })
], TNSCheckBoxModule);
exports.TNSCheckBoxModule = TNSCheckBoxModule;


/***/ }),

/***/ 516:
/*!*********************************************************!*\
  !*** ../node_modules/nativescript-checkbox/checkbox.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = __webpack_require__(/*! tns-core-modules/color */ 39);
var platform_1 = __webpack_require__(/*! tns-core-modules/platform */ 7);
var app = __webpack_require__(/*! tns-core-modules/application */ 5);
var view_1 = __webpack_require__(/*! tns-core-modules/ui/core/view */ 0);
var checkbox_common_1 = __webpack_require__(/*! ./checkbox-common */ 517);
exports.checkedProperty = new view_1.Property({
    name: "checked",
    defaultValue: false,
    valueConverter: view_1.booleanConverter,
    valueChanged: onCheckedPropertyChanged
});
exports.textProperty = new view_1.Property({
    name: "text",
    defaultValue: "",
    valueChanged: onTextPropertyChanged
});
exports.fillColorProperty = new view_1.CssProperty({
    name: "fillColor",
    cssName: "fill-color",
    valueConverter: function (v) {
        return String(v);
    }
});
exports.tintColorProperty = new view_1.CssProperty({
    name: "tintColor",
    cssName: "tint-color",
    defaultValue: "#0075ff",
    valueConverter: function (v) {
        return String(v);
    }
});
var CheckBox = (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CheckBox.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "boxType", {
        get: function () {
            return this._boxType;
        },
        set: function (value) {
            this._boxType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkStyle", {
        get: function () {
            return this._checkStyle;
        },
        set: function (style) {
            this._checkStyle = style;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPadding", {
        get: function () {
            return this._checkPadding;
        },
        set: function (padding) {
            this._checkPadding = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPaddingLeft", {
        get: function () {
            return this._checkPaddingLeft;
        },
        set: function (padding) {
            this._checkPaddingLeft = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPaddingTop", {
        get: function () {
            return this._checkPaddingTop;
        },
        set: function (padding) {
            this._checkPaddingTop = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPaddingRight", {
        get: function () {
            return this._checkPaddingRight;
        },
        set: function (padding) {
            this._checkPaddingRight = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPaddingBottom", {
        get: function () {
            return this._checkPaddingBottom;
        },
        set: function (padding) {
            this._checkPaddingBottom = padding;
        },
        enumerable: true,
        configurable: true
    });
    CheckBox.prototype[exports.checkedProperty.getDefault] = function () {
        return false;
    };
    CheckBox.prototype[exports.checkedProperty.setNative] = function (value) {
        this.nativeView.setChecked(Boolean(value));
    };
    CheckBox.prototype[exports.textProperty.getDefault] = function () {
        return "";
    };
    CheckBox.prototype[exports.textProperty.setNative] = function (value) {
        this.nativeView.setText(java.lang.String.valueOf(value));
    };
    Object.defineProperty(CheckBox.prototype, "fillColor", {
        get: function () {
            return this.style.fillColor;
        },
        set: function (color) {
            this.style.fillColor = color;
            if (this._android && platform_1.device.sdkVersion >= "21") {
                this._android.setButtonTintList(android.content.res.ColorStateList.valueOf(new color_1.Color(color).android));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "tintColor", {
        get: function () {
            return this.style.fillColor;
        },
        set: function (color) {
            this.style.fillColor = color;
        },
        enumerable: true,
        configurable: true
    });
    CheckBox.prototype.createNativeView = function () {
        this._android = new android.support.v7.widget[checkbox_common_1.BoxType[this.boxType] === checkbox_common_1.BoxType.circle
            ? "AppCompatRadioButton"
            : "AppCompatCheckBox"](this._context, null);
        if (this.checkPaddingLeft) {
            this._android.setPadding(parseInt(this.checkPaddingLeft), this._android.getPaddingTop(), this._android.getPaddingRight(), this._android.getPaddingBottom());
        }
        if (this.checkPaddingTop) {
            this._android.setPadding(this._android.getPaddingLeft(), parseInt(this.checkPaddingTop), this._android.getPaddingRight(), this._android.getPaddingBottom());
        }
        if (this.checkPaddingRight) {
            this._android.setPadding(this._android.getPaddingLeft(), this._android.getPaddingTop(), parseInt(this.checkPaddingRight), this._android.getPaddingBottom());
        }
        if (this.checkPaddingBottom) {
            this._android.setPadding(this._android.getPaddingLeft(), this._android.getPaddingTop(), this._android.getPaddingRight(), parseInt(this.checkPaddingBottom));
        }
        if (this.checkPadding) {
            var pads = this.checkPadding.toString().split(",");
            switch (pads.length) {
                case 1:
                    this._android.setPadding(parseInt(pads[0]), parseInt(pads[0]), parseInt(pads[0]), parseInt(pads[0]));
                    break;
                case 2:
                    this._android.setPadding(parseInt(pads[0]), parseInt(pads[1]), parseInt(pads[0]), parseInt(pads[1]));
                    break;
                case 3:
                    this._android.setPadding(parseInt(pads[0]), parseInt(pads[1]), parseInt(pads[2]), parseInt(pads[1]));
                    break;
                case 4:
                    this._android.setPadding(parseInt(pads[0]), parseInt(pads[1]), parseInt(pads[2]), parseInt(pads[3]));
                    break;
            }
        }
        if (this.style.color) {
            this._android.setTextColor(this.style.color.android);
        }
        if (!this.style.fontSize) {
            this.style.fontSize = 15;
        }
        this._android.setTextSize(this.style.fontSize);
        var typeface = this.style.fontInternal.getAndroidTypeface();
        if (typeface) {
            this._android.setTypeface(typeface);
        }
        if (this._checkStyle) {
            var drawable = app.android.context
                .getResources()
                .getIdentifier(this._checkStyle, "drawable", app.android.context.getPackageName());
            this._android.setButtonDrawable(drawable);
        }
        if (this._android) {
            if (this.fillColor) {
                android.support.v4.widget.CompoundButtonCompat.setButtonTintList(this._android, android.content.res.ColorStateList.valueOf(new color_1.Color(this.fillColor).android));
            }
        }
        return this._android;
    };
    CheckBox.prototype.initNativeView = function () {
        var that = new WeakRef(this);
        this.nativeView.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
            get owner() {
                return that.get();
            },
            onCheckedChanged: function (sender, isChecked) {
                if (this.owner) {
                    exports.checkedProperty.nativeValueChange(this.owner, isChecked);
                }
            }
        }));
    };
    CheckBox.prototype.disposeNativeView = function () {
        this.nativeView.setOnCheckedChangeListener(null);
    };
    CheckBox.prototype.toggle = function () {
        this.nativeView.toggle();
    };
    CheckBox.prototype._onCheckedPropertyChanged = function (checkbox, oldValue, newValue) {
        if (!this.nativeView) {
            return;
        }
        exports.checkedProperty.nativeValueChange(this, newValue);
    };
    CheckBox.prototype._onTextPropertyChanged = function (checkbox, oldValue, newValue) {
        if (!this.nativeView) {
            return;
        }
        exports.textProperty.nativeValueChange(this, newValue);
    };
    return CheckBox;
}(view_1.View));
exports.CheckBox = CheckBox;
function onCheckedPropertyChanged(checkbox, oldValue, newValue) {
    checkbox._onCheckedPropertyChanged(checkbox, oldValue, newValue);
}
function onTextPropertyChanged(checkbox, oldValue, newValue) {
    checkbox._onTextPropertyChanged(checkbox, oldValue, newValue);
}
exports.checkedProperty.register(CheckBox);
exports.textProperty.register(CheckBox);
exports.fillColorProperty.register(view_1.Style);
exports.tintColorProperty.register(view_1.Style);


/***/ }),

/***/ 517:
/*!****************************************************************!*\
  !*** ../node_modules/nativescript-checkbox/checkbox-common.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BoxType;
(function (BoxType) {
    BoxType[BoxType["circle"] = "circle"] = "circle";
    BoxType[BoxType["square"] = "square"] = "square";
})(BoxType = exports.BoxType || (exports.BoxType = {}));


/***/ })

});