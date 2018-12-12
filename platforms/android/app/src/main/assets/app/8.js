webpackJsonp([8],{

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

/***/ 316:
/*!***********************************!*\
  !*** ./connect/connect.module.ts ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var nativescript_module_1 = __webpack_require__(/*! nativescript-angular/nativescript.module */ 165);
var connect_routing_module_1 = __webpack_require__(/*! ./connect-routing.module */ 583);
var connect_component_1 = __webpack_require__(/*! ./connect.component */ 496);
var ConnectModule = (function () {
    function ConnectModule() {
    }
    ConnectModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                connect_routing_module_1.ConnectRoutingModule
            ],
            declarations: [
                connect_component_1.ConnectComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], ConnectModule);
    return ConnectModule;
}());
exports.ConnectModule = ConnectModule;


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

/***/ 496:
/*!**************************************!*\
  !*** ./connect/connect.component.ts ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var router_2 = __webpack_require__(/*! nativescript-angular/router */ 75);
var connect_services_1 = __webpack_require__(/*! ./connect.services */ 584);
var nativescript_mqtt_1 = __webpack_require__(/*! nativescript-mqtt */ 585);
var page_1 = __webpack_require__(/*! ui/page */ 20);
var MQTT_TOPIC = 'futuredms/shyft-auto-dashboard';
var ConnectComponent = (function () {
    function ConnectComponent(router, _page, connectService, route, routerExtensions) {
        this.router = router;
        this._page = _page;
        this.connectService = connectService;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.route.queryParams.subscribe(function (params) {
        });
    }
    ConnectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._page.actionBarHidden = true;
        this.connectService.signature().subscribe(function (signedUrl) {
            console.log("Signature Service : ", signedUrl.url);
            _this.url = signedUrl.url;
            var mqtt_clientOptions = {
                host: _this.url,
                port: 433,
                path: "futuredms/shyft-auto-dashboard",
                useSSL: false
            };
            _this.client = new nativescript_mqtt_1.MQTTClient(mqtt_clientOptions);
            _this.setupHandlers();
        });
    };
    ConnectComponent.prototype.connect = function () {
        console.log("here in connect ");
        try {
            this.client.connect('username', 'password');
            // this.client.connect(this.url, { protocolId: 'MQTT',  protocolVersion: 3});
            this.setupHandlers();
        }
        catch (e) {
            console.log("Caught error: " + e);
        }
    };
    ConnectComponent.prototype.setupHandlers = function () {
        console.log("here in setupHandlers ");
        this.client.onConnectionFailure.on(function (err) {
            console.log("Connection failed: " + err);
        });
        this.client.onConnectionSuccess.on(function () {
            console.log("Connected successfully!");
            // this.subscribe();
        });
        this.client.onConnectionLost.on(function (err) {
            console.log("Connection lost: " + err);
        });
        this.client.onMessageArrived.on(function (message) {
            console.log("Message received: " + message.payload);
        });
    };
    ConnectComponent.prototype.subscribe = function () {
        try {
            this.client.subscribe(MQTT_TOPIC);
        }
        catch (e) {
            console.log("Caught error: " + e);
        }
    };
    ConnectComponent.prototype.onBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    ConnectComponent = __decorate([
        core_1.Component({
            selector: "Connect",
            /*duleId: module.i*/
            styles: [__webpack_require__(/*! ./connect.css */ 589)],
            template: __webpack_require__(/*! ./connect.component.html */ 590),
            providers: [connect_services_1.ConnectService]
        }),
        __metadata("design:paramtypes", [router_1.Router, page_1.Page, connect_services_1.ConnectService, router_1.ActivatedRoute, router_2.RouterExtensions])
    ], ConnectComponent);
    return ConnectComponent;
}());
exports.ConnectComponent = ConnectComponent;


/***/ }),

/***/ 497:
/*!*************************************************************!*\
  !*** ../node_modules/nativescript-websockets/websockets.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*****************************************************************************************
 * (c) 2015-2017, Master Technology
 * Licensed under the MIT license or contact me for a support, changes, enhancements,
 * and/or if you require a commercial licensing
 *
 * Any questions please feel free to email me or put a issue up on github
 *
 * Version 1.4.0                                             Nathan@master-technology.com
 ****************************************************************************************/


/* jshint node: true, browser: true, unused: false, undef: false, camelcase: false, bitwise: false */
/* global android, java, org, require, module */

// --------------------------------------------

var commonWebSockets = __webpack_require__(/*! ./websockets-common */ 588);

/**
 * Checks for running on a emulator
 * @returns {boolean}
 */
var checkForEmulator = function() {
    //noinspection JSUnresolvedVariable
    var res = android.os.Build.FINGERPRINT;
    return res.indexOf("generic") !== -1;
};


// IPV6 doesn't work properly on emulators; so we have to disable it
if (checkForEmulator()) {
    //noinspection JSUnresolvedVariable
    java.lang.System.setProperty("java.net.preferIPv6Addresses", "false");
    //noinspection JSUnresolvedVariable
    java.lang.System.setProperty("java.net.preferIPv4Stack", "true");
}

var toHashMap = function(obj) {
    var map = new java.util.HashMap();

    for (var property in obj) {
        if (!obj.hasOwnProperty) continue;
        if (obj[property] === null) continue;

        var val = obj[property];
        switch (typeof val) {
            case 'object':
                map.put(property, toHashMap(val, map));
                break;

            case 'boolean':
                map.put(property, java.lang.Boolean.valueOf(String(val)));
                break;

            case 'number':
                if (Number(val) === val && val % 1 === 0) {
                    map.put(property, java.lang.Long.valueOf(String(val)));
                } else {
                    map.put(property, java.lang.Double.valueOf(String(val)));
                }
                break;

            case 'string':
                map.put(property, String(val));
                break;
        }
    }

    return map;
};

//noinspection JSUnresolvedVariable
/**
 * This is our extended class that gets the messages back from the Native ANDROID class
 * We use a thin shell to just facilitate communication from ANDROID to our JS code
 * We also use this class to try and standardize the messages
 */
var _WebSocket = org.java_websocket.client.WebSocketClient.extend({
    fragmentInfo: {type: 0, data: [], sizes: 0},
    wrapper: null,
    onOpen: function () {
        if (this.wrapper) {
            this.wrapper._notify("open", [this.wrapper]);
        }
    },
    onClose: function (code, reason) {
        if (this.wrapper) {
            // org.java_websocket.WebSocketImpl.closeConnection() currently executes this callback prior to updating readystate to CLOSED
            // and as such there are cases when the readystate is still showing as OPEN when this called. In short, the websocket connection
            // still appears to be up when it is not which is makes things like coding auto reconnection logic problematic. This seems like
            // an issue/bug in org.java_websocket.WebSocketImpl.closeConnection(). Regardless, as a workaround we pass control back to
            // closeConnection() prior to passing the notification along so that the readystate gets updated to CLOSED.
            // TODO: remove this when the readystate issue gets resolved.
			var self = this;
            setTimeout(function() {
                self.wrapper._notify("close", [self.wrapper, code, reason]);
            }, 1);
        }
    },
    onMessage: function (message) {
        if (this.wrapper) {
            this.wrapper._notify("message", [this.wrapper, message]);
        }
    },
    onMessageBinary: function(binaryMessage) {
        if (this.wrapper) {

            // Make sure binaryMessage is at beginning of buffer
            //noinspection JSUnresolvedFunction
            binaryMessage.rewind();

            // Convert Binary Message into ArrayBuffer/Uint8Array
            //noinspection JSUnresolvedFunction
            var count = binaryMessage.limit();
            var view = new Uint8Array(count);
            for (var i=0;i<count;i++) {
                view[i] = binaryMessage.get(i);
            }
            binaryMessage = null;

            this.wrapper._notify("message", [this.wrapper, view.buffer]); }
    },
    onPong: function(){

    },
    onError: function (err) {
        if (this.wrapper) {
            this.wrapper._notify("error", [this.wrapper, err]);
        }
    },
    onFragment: function (fragment) {
        var optCode = fragment.optcode.toString();
        if (optCode !== "CONTINUOUS") {
            if (this.fragmentInfo.type !== 0) {
                console.log("Missing Fragment info, skipped fragment");
            }
            // Reset our buffer size when we have a new fragment chain
            this.fragmentInfo.sizes = 0;
            if (optCode === "TEXT") {
                this.fragmentInfo.type = 1;
            } else if (optCode === "BINARY") {
                this.fragmentInfo.type = 2;
            } else {
                console.log("Unknown Fragment code: ", optCode);
                this.fragmentInfo.type = 0;
            }
        }

        var data = fragment.getPayloadData();
        this.fragmentInfo.sizes += data.limit();
        this.fragmentInfo.data.push(data);
        if (fragment.fin === true) {
            var view = new Uint8Array(this.fragmentInfo.sizes);
            for (var i = 0, dst = 0; i < this.fragmentInfo.data.length; i++) {
                data = this.fragmentInfo.data[i];
                var count = data.limit();
                for (var src = 0; src < count; src++, dst++) {
                    view[dst] = data.get(src);
                }
            }
            data = null;
            this.fragmentInfo.data = [];

            if (this.wrapper) {
                // Do our final message callback
                if (this.fragmentInfo.type === 2) {
                    this.wrapper._notify("message", [this.wrapper, view.buffer]);
                } else {
                    this.wrapper._notify("message", [this.wrapper, UTF8ArrayToStr(view)]);
                }
                view = null;
            }

            // Reset back to unknown type
            this.fragmentInfo.type = 0;
        }


        if (this.wrapper) {
            this.wrapper._notify("fragment", [this.wrapper, fragment]);
        }
    },
    onWebsocketHandshakeReceivedAsClient: function (handshake) {
        if (this.wrapper) {
            this.wrapper._notify("handshake", [this.wrapper, handshake]);
        }
    }
});

/**
 * This is the Constructor for creating a WebSocket
 * @param url {String} - url to open, "ws://" or "wss://"
 * @param options {Object} - options
 * @constructor
 */
var NativeWebSockets = function(url, options) {
    options = options || {};
    this._callbacks = {open: [], close: [], message: [], error: [], fragment: [], handshake: [], ping: [], pong: []}; // Ping/Pong not supported yet
    this._hasOpened = false;
    this._queue = [];
    this._queueRunner = null;

    // TODO: Replace Hack when we support protocols in Android; we want to "emulate" that the first protocol sent was accepted
    this._protocol = options.protocols && options.protocols[0] || "";

    this._browser = !!options.browser;
    this._timeout = options.timeout;
    this._url = url.replace(/\s/g,'+');

    //noinspection JSUnresolvedVariable
    this._proxy = options.proxy;

    this._timeout = options.timeout || 10000;

    this._headers = options.headers || [];

    this._reCreate();
};

/**
 * This function is used to open and re-open sockets so that you don't have to re-create a whole new websocket class
 * @private
 */
NativeWebSockets.prototype._reCreate = function() {
    var isWSS = (this._url.indexOf("wss:") === 0);

    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    var uri = new java.net.URI(this._url);

    if (!this._headers.hasOwnProperty("Origin")) {
        var originScheme =  uri.getScheme() === "wss" ? "https" : "http";
        var originHost = uri.getPort() !== -1 ? uri.getHost() + ":" + uri.getPort() : uri.getHost();
        this._headers["Origin"] = originScheme + "://" + originHost;
    }

    // TODO: Add Per-message deflate?
	var knownExtensions = new java.util.ArrayList();

    // Must have a protocol, even if it is blank
	var knownProtocols = new java.util.ArrayList();
    if(this._protocol){
       knownProtocols.add(new org.java_websocket.protocols.Protocol(this._protocol));
    } else {
		knownProtocols.add(new org.java_websocket.protocols.Protocol(""));
	}

    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    this._socket = new _WebSocket(uri, new org.java_websocket.drafts.Draft_6455(knownExtensions, knownProtocols), toHashMap(this._headers), this._timeout);

    //noinspection JSValidateTypes
    this._socket.wrapper = this;

    // check for Proxy
    var proxy = null;
    if (this._proxy) {
        if (String.isString(this._proxy)) {
            //noinspection JSUnresolvedVariable,JSUnresolvedFunction
            proxy = new java.net.Proxy(java.net.Proxy.Type.HTTP, new java.net.InetSocketAddress( this._proxy, 80 ) );
        } else {
            //noinspection JSUnresolvedVariable,JSUnresolvedFunction
            proxy = new java.net.Proxy(java.net.Proxy.Type.HTTP, new java.net.InetSocketAddress( this._proxy.address, this._proxy.port || 80 ) );
        }
    }
    if (proxy) {
        //noinspection JSUnresolvedFunction
        this._socket.setProxy(proxy);
    }

    // Check for SSL/TLS
    if (isWSS) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        var sslContext = javax.net.ssl.SSLContext.getInstance( "TLS" );
        sslContext.init( null, null, null );
        //noinspection JSUnresolvedFunction
        var socketFactory = sslContext.getSocketFactory();
        //noinspection JSUnresolvedFunction
        this._socket.setSocket( socketFactory.createSocket() );
    }
};

/**
 * This function is used to send the notifications back to the user code in the Advanced webSocket mode
 * @param event {String} - event name ("message", "open", "close", "error")
 * @param data {String|Array|ArrayBuffer}
 * @private
 */
NativeWebSockets.prototype._notify = function(event, data) {
   var eventCallbacks = this._callbacks[event];
   for (var i=0;i<eventCallbacks.length;i++) {
       if (eventCallbacks[i].t) {
           eventCallbacks[i].c.apply(eventCallbacks[i].t, data);
       } else {
           eventCallbacks[i].c.apply(this, data);
       }
   }
};

/**
 * This function is used to send the notifications back to the user code in the Browser webSocket mode
 * @param event {String} - Event name ("message", "open", "close", "error")
 * @param data {String|Array|ArrayBuffer} - The event Data
 * @private
 */
NativeWebSockets.prototype._notifyBrowser = function(event, data) {
    var eventResult;
    switch (event) {
        case 'open':
            eventResult = new commonWebSockets.Event({currentTarget: this, srcElement: this, target: this, type: event});
            if (typeof this.onopen === "function") {
                this.onopen.call(this, eventResult);
            }
            break;
        case 'close':
            eventResult = new commonWebSockets.Event({currentTarget: this, srcElement: this, target: this, type: event, code: data[1], reason: data[2], wasClean: data[3]});
            if (typeof this.onclose === "function") {
                this.onclose.call(this, eventResult);
            }
            break;
        case 'message':
            eventResult = new commonWebSockets.Event({currentTarget: this, srcElement: this, target: this, type: event, data: data[1], ports: null, source: null, lastEventId: ""});
            if (typeof this.onmessage === "function") {
                this.onmessage.call(this,eventResult);
            }
            break;
        case 'error':
            eventResult = new commonWebSockets.Event({currentTarget: this, srcElement: this, target: this, type: event, error: data[1], filename: "", lineno: 0});
            if (typeof this.onerror === "function") {
                this.onerror.call(this,eventResult);
            }
            break;
        default: return;
    }
    var eventCallbacks = this._callbacks[event];
    for (var i=0;i<eventCallbacks.length;i++) {
        eventCallbacks[i].c.call(this, eventResult);
    }
};

/**
 * Attach an event to this webSocket
 * @param event {String} - Event Type ("message", "open", "close", "error")
 * @param callback {Function} - the function to run on the event
 * @param thisArg {Object} - the "this" to use for calling your function, defaults to this current webSocket "this"
 */
NativeWebSockets.prototype.on = function(event, callback, thisArg) {
    this.addEventListener(event, callback, thisArg);
};

/**
 * Detaches an event from this websocket
 * If no callback is provided all events are cleared of that type.
 * @param event {String} - Event to detach from
 * @param callback {Function} - the function you registered
 */
NativeWebSockets.prototype.off = function(event, callback) {
    this.removeEventListener(event, callback);
};

/**
 * Attach an event to this webSocket
 * @param event {String} - Event Type ("message", "open", "close", "error")
 * @param callback {Function} - the function to run on the event
 * @param thisArg {Object} - the "this" to use for calling your function, defaults to this current webSocket "this"
 */
NativeWebSockets.prototype.addEventListener = function(event, callback, thisArg) {
    if (!Array.isArray(this._callbacks[event])) {
        throw new Error("addEventListener passed an invalid event type " + event);
    }
    this._callbacks[event].push({c: callback, t: thisArg});
};

/**
 * Detaches an event from this webSocket
 * If no callback is provided all events are cleared of that type.
 * @param event {String} - Event to detach from
 * @param callback {Function} - the function you registered
 */
NativeWebSockets.prototype.removeEventListener = function(event, callback) {
    if (!Array.isArray(this._callbacks[event])) {
        throw new Error("Invalid event type in removeEventListener " + event);
    }
    if (callback) {
        var eventCallbacks = this._callbacks[event];
        for (var i=eventCallbacks.length-1;i>=0;i--) {
            if (eventCallbacks[i].c === callback) {
                eventCallbacks.slice(i, 1);
            }
        }
    } else {
        this._callbacks[event] = [];
    }

};

/**
 This opens or re-opens a webSocket.
 */
NativeWebSockets.prototype.open = function() {
    if (this._hasOpened) {
        // Browser WebSockets aren't allowed to re-open
        if (this._browser) {
            return;
        }

        if (this.state() >= 3) {
            this._socket.wrapper = null;
            this._socket = null;
            this._reCreate();
        } else {
            return;
        }
    }
    this._hasOpened = true;
    //noinspection JSUnresolvedFunction
    this._socket.connect();
};

/**
 * This closes your webSocket
 * @param code {Number} - The value to send as the close reason
 * @param message {String} - The message as to why you are closing
 */
NativeWebSockets.prototype.close = function(code, message) {
    if (arguments.length) {
       this._socket.close(code, message || "");
    } else {
       this._socket.close();
    }
};

/**
 * This sends a Text or Binary Message (Allows Buffering of messages if this is an advanced WebSocket)
 * @param message {string|Array|ArrayBuffer} - Message to send
 * @returns {boolean} - returns false if it is unable to send the message at this time, it will queue them up and try later...
 */
NativeWebSockets.prototype.send = function(message) {
    var state = this.state();

    // If we have a queue, we need to start processing it...
    if (this._queue.length && state === this.OPEN) {
        for (var i = 0; i < this._queue.length; i++) {
            this._send(this._queue[i]);
        }
        this._queue = [];
        if (this._queueRunner) {
            clearTimeout(this._queueRunner);
            this._queueRunner = null;
        }
    }

    // You shouldn't be sending null/undefined messages; but if you do -- we won't error out.
    if (message === null || message === undefined) {
        this._startQueueRunner();
        return false;
    }

    // If the socket isn't open, or we have a queue length; we are
    if (state !== this.OPEN || this._queue.length) {
        if (this._browser) {
            return false;
        }
        this._queue.push(message);
        this._startQueueRunner();
        return false;
    }

    this._send(message);
    return true;
};

/**
 * Internal function to start the Queue Runner timer
 * @private
 */
NativeWebSockets.prototype._startQueueRunner = function() {
    if (!this._queueRunner && this.state() !== this.OPEN && this._queue.length) {
        var self = this;
        this._queueRunner = setTimeout(function() {
            self._queueRunner = null;
            self.send(null);
        }, 250);
    }
};

/**
 * Internal function that actually sends the message
 * @param message {String|ArrayBuffer} - Message to send
 * @private
 */
NativeWebSockets.prototype._send = function(message) {
  if (message instanceof ArrayBuffer || message instanceof Uint8Array || Array.isArray(message)) {
      var view;
      if (message instanceof ArrayBuffer) {
         view = new Uint8Array(message);
      } else {
         view = message;
      }
      //noinspection JSUnresolvedFunction,JSUnresolvedVariable
      var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.class.getField("TYPE").get(null), view.length);
      for (var i=0;i<view.length;i++) {
          //noinspection JSUnresolvedFunction,JSUnresolvedVariable
          java.lang.reflect.Array.setByte(buffer, i, byte(view[i]));
      }
      this._socket.send(buffer);
  } else {
      this._socket.send(message);
  }

};

/**
 * Returns the state of the Connection
 * @returns {Number} - returns this.NOT_YET_CONNECTED, .CONNECTING, .OPEN, .CLOSING or .CLOSED
 */
NativeWebSockets.prototype.state = function() {
    //noinspection JSUnresolvedFunction
  switch (this._socket.getReadyState()) {
      case org.java_websocket.WebSocket.READYSTATE.NOT_YET_CONNECTED:
          return this.NOT_YET_CONNECTED;
      case org.java_websocket.WebSocket.READYSTATE.CONNECTING:
          return this.CONNECTING;
      case org.java_websocket.WebSocket.READYSTATE.OPEN:
          return this.OPEN;
      case org.java_websocket.WebSocket.READYSTATE.CLOSING:
          return this.CLOSING;
      case org.java_websocket .WebSocket.READYSTATE.CLOSED:
          return this.CLOSED;
      default:
          throw new Error("getReadyState returned invalid value");
  }
};

/**
 * Is the connection open
 * @returns {boolean} - true if the connection is open
 */
NativeWebSockets.prototype.isOpen = function() {
    return this._socket.isOpen();
};

/**
 * Is the connection closed
 * @returns {boolean} - true if the connection is closed
 */
NativeWebSockets.prototype.isClosed = function() {
    return this._socket.isClosed();
};

/**
 * Is the connection is in the process of closing
 * @returns {boolean} - true if closing
 */
NativeWebSockets.prototype.isClosing = function() {
    return this._socket.isClosing();
};

/**
 * Is the connection currently connecting
 * @returns {boolean} - true if connecting
 */
NativeWebSockets.prototype.isConnecting = function() {
    return this._socket.isConnecting();
};

/**
 * Returns the Remote address
 * @returns {String} - the address
 */
NativeWebSockets.prototype.getRemoteSocketAddress = function() {
    return this._socket.getRemoteSocketAddress();
};

/**
 * This returns the current protocol
 */
Object.defineProperty(NativeWebSockets.prototype, "protocol", {
    get: function () {
        return this._protocol;
    },
    enumerable: true,
    configurable: true
});

/**
 * This returns the current readyState
 */
Object.defineProperty(NativeWebSockets.prototype, "readyState", {
    get: function () {
        var s = this.state();
        // No such -1 in the web spec
        if (s === -1) { return 0; }
        return s;
    },
    enumerable: true
});

/**
 * This returns the URL you connected too
 */
Object.defineProperty(NativeWebSockets.prototype, "url", {
    get: function () {
        return this._url;
    },
    enumerable: true
});

/**
 * This returns the amount of data buffered
 */
Object.defineProperty(NativeWebSockets.prototype, "bufferedAmount", {
    get: function () {
        // Technically I should return the actual amount of data; but as an optimization we are just returning the number of entries
        // as this will allow the developer to know there is still data in the queue.
        return this._queue.length;
    },
    enumerable: true
});

/**
 * This returns any extensions running.
 */
Object.defineProperty(NativeWebSockets.prototype, "extensions", {
    get: function () {
        return "";
    },
    enumerable: true
});

/**
 * This returns true because it is on the ANDROID platform
 */
Object.defineProperty(NativeWebSockets.prototype, "android", {
    get: function () {
        return true;
    },
    enumerable: true
});

/**
 * This is a list standardized Close Codes
 * @type {Number}
 */
NativeWebSockets.CLOSE_CODE = {NORMAL: 1000, GOING_AWAY: 1001, PROTOCOL_ERROR: 1002, REFUSE: 1003, NOCODE: 1005, ABNORMAL_CLOSE:1006, NO_UTF8: 1007, POLICY_VALIDATION: 1008, TOOBIG: 1009, EXTENSION: 1010, UNEXPECTED_CONDITION: 1011, TLS_ERROR: 1015, NEVER_CONNECTED: -1, BUGGYCLOSE: -2, FLASHPOLICY: -3};

/**
 * This is the NOT_YET_CONNECTED value
 * @type {number}
 */
NativeWebSockets.prototype.NOT_YET_CONNECTED = -1;

/**
 * This is the CONNECTING value
 * @type {number}
 */
NativeWebSockets.prototype.CONNECTING =  0;

/**
 * This is the OPEN value
 * @type {number}
 */
NativeWebSockets.prototype.OPEN = 1;

/**
 * This is the CLOSING value
 * @type {number}
 */
NativeWebSockets.prototype.CLOSING = 2;

/**
 * This is the CLOSED value
 * @type {number}
 */
NativeWebSockets.prototype.CLOSED = 3;

module.exports = NativeWebSockets;


function UTF8ArrayToStr(data) {
    var result='', count=data.length;
    var i=0, c1, c2, c3;

    while(i < count) {
        c1 = data[i++];
        switch(c1 >> 4)
        {
            case 12: // 10xx xxxx
            case 13: // 110x xxxx
                c2 = (data[i++] & 0x3F);
                result += String.fromCharCode(((c1 & 0x1F) << 6) | c2);
                break;
            case 14: // 1110 xxxx
                c2 = (data[i++] & 0x3F) << 6;
                c3 = (data[i++] & 0x3F);
                result += String.fromCharCode(((c1 & 0x0F) << 12) | c2 | c3);
                break;
            default: // 0xxxxxxx
                result += String.fromCharCode(c1);
            break;

        }
    }

    return result;
}


/***/ }),

/***/ 583:
/*!*******************************************!*\
  !*** ./connect/connect-routing.module.ts ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! nativescript-angular/router */ 75);
var connect_component_1 = __webpack_require__(/*! ./connect.component */ 496);
var routes = [
    { path: "", component: connect_component_1.ConnectComponent }
];
var ConnectRoutingModule = (function () {
    function ConnectRoutingModule() {
    }
    ConnectRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], ConnectRoutingModule);
    return ConnectRoutingModule;
}());
exports.ConnectRoutingModule = ConnectRoutingModule;


/***/ }),

/***/ 584:
/*!*************************************!*\
  !*** ./connect/connect.services.ts ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var http_1 = __webpack_require__(/*! @angular/http */ 49);
var ApplicationSettings = __webpack_require__(/*! application-settings */ 318);
__webpack_require__(/*! rxjs/add/operator/map */ 319);
__webpack_require__(/*! rxjs/add/operator/do */ 320);
var ConnectService = (function () {
    function ConnectService(http) {
        this.http = http;
    }
    //-------------------------------- Appointment GET Request ----------------------------------//
    ConnectService.prototype.signature = function () {
        var headers = this.signatureHeader();
        return this.http.get("https://eotxmrelq8.execute-api.us-east-1.amazonaws.com/iot_production", { headers: headers })
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
    ConnectService.prototype.signatureHeader = function () {
        var headers = new http_1.Headers();
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    ConnectService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ConnectService);
    return ConnectService;
}());
exports.ConnectService = ConnectService;


/***/ }),

/***/ 585:
/*!**************************************************!*\
  !*** ../node_modules/nativescript-mqtt/index.ts ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(/*! ./common */ 586);
var MQTT = __webpack_require__(/*! ./mqttws31 */ 587);
var MQTTClient = (function () {
    function MQTTClient(options) {
        this.connectionSuccess = new common_1.EventHandler();
        this.connectionFailure = new common_1.EventHandler();
        this.connectionLost = new common_1.EventHandler();
        this.messageArrived = new common_1.EventHandler();
        /* options
          host: string
          port: int - default 80 | useSSL 443
          path: string - default empty
          useSSL: bool - default false
          clientId: string - default UUID
          retryOnDisconnect: bool - default false
        */
        this.connected = false;
        this.host = options.host || 'localhost';
        this.useSSL = options.useSSL || false;
        if (options.port)
            this.port = options.port;
        else
            this.port = this.useSSL ? 443 : 80;
        this.path = options.path || '';
        this.clientId = options.clientId || common_1.guid();
        this.retryOnDisconnect = options.retryOnDisconnect || false;
        this.mqttClient = new MQTT.Client(this.host, this.port, this.path, this.clientId);
        this.mqttClient.useSSL = this.useSSL;
    }
    ;
    Object.defineProperty(MQTTClient.prototype, "onConnectionSuccess", {
        //events for the MQTT Client
        get: function () { return this.connectionSuccess; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MQTTClient.prototype, "onConnectionFailure", {
        get: function () { return this.connectionFailure; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MQTTClient.prototype, "onConnectionLost", {
        get: function () { return this.connectionLost; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MQTTClient.prototype, "onMessageArrived", {
        get: function () { return this.messageArrived; },
        enumerable: true,
        configurable: true
    });
    MQTTClient.prototype.connect = function (username, password) {
        var _this = this;
        if (this.connected) {
            return;
        }
        ;
        var connectOptions = {
            userName: username,
            password: password,
            useSSL: this.useSSL,
            onSuccess: function () {
                _this.connectionSuccess.trigger();
                _this.connected = true;
            },
            onFailure: function (err) {
                _this.connectionFailure.trigger(err.message);
            }
        };
        this.mqttClient.onConnectionLost = function (err) {
            _this.connectionLost.trigger(err.errorMessage);
            _this.connected = false;
        };
        this.mqttClient.onMessageArrived = function (message) {
            _this.messageArrived.trigger(new common_1.Message(message));
        };
        this.mqttClient.connect(connectOptions);
    };
    MQTTClient.prototype.subscribe = function (topic) {
        this.mqttClient.subscribe(topic);
    };
    MQTTClient.prototype.unsubscribe = function (topic) {
        this.mqttClient.unsubscribe(topic);
    };
    MQTTClient.prototype.publish = function (message) {
        this.mqttClient.send(message);
    };
    return MQTTClient;
}());
exports.MQTTClient = MQTTClient;


/***/ }),

/***/ 586:
/*!***************************************************!*\
  !*** ../node_modules/nativescript-mqtt/common.ts ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventHandler = (function () {
    function EventHandler() {
        this.handlers = [];
    }
    EventHandler.prototype.on = function (handler) {
        this.handlers.push(handler);
    };
    EventHandler.prototype.off = function (handler) {
        this.handlers = this.handlers.filter(function (h) { return h !== handler; });
    };
    EventHandler.prototype.trigger = function (data) {
        this.handlers.slice(0).forEach(function (h) { return h(data); });
    };
    return EventHandler;
}());
exports.EventHandler = EventHandler;
var Message = (function () {
    function Message(mqttMessage) {
        this.payload = mqttMessage.payloadString || '';
        this.bytes = mqttMessage.payloadBytes || null;
        this.topic = mqttMessage.destinationName || '';
        this.qos = mqttMessage.qos || 0;
    }
    return Message;
}());
exports.Message = Message;
var guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};
exports.guid = guid;


/***/ }),

/***/ 587:
/*!*****************************************************!*\
  !*** ../node_modules/nativescript-mqtt/mqttws31.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*******************************************************************************
 * Copyright (c) 2013 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *    Andrew Banks - initial API and implementation and initial documentation
 *******************************************************************************/


// Only expose a single object name in the global namespace.
// Everything must go through this module. Global Paho.MQTT module
// only has a single public function, client, which returns
// a Paho.MQTT client object given connection details.

/**
 * Send and receive messages using web browsers.
 * <p>
 * This programming interface lets a JavaScript client application use the MQTT V3.1 or
 * V3.1.1 protocol to connect to an MQTT-supporting messaging server.
 *
 * The function supported includes:
 * <ol>
 * <li>Connecting to and disconnecting from a server. The server is identified by its host name and port number.
 * <li>Specifying options that relate to the communications link with the server,
 * for example the frequency of keep-alive heartbeats, and whether SSL/TLS is required.
 * <li>Subscribing to and receiving messages from MQTT Topics.
 * <li>Publishing messages to MQTT Topics.
 * </ol>
 * <p>
 * The API consists of two main objects:
 * <dl>
 * <dt><b>{@link Paho.MQTT.Client}</b></dt>
 * <dd>This contains methods that provide the functionality of the API,
 * including provision of callbacks that notify the application when a message
 * arrives from or is delivered to the messaging server,
 * or when the status of its connection to the messaging server changes.</dd>
 * <dt><b>{@link Paho.MQTT.Message}</b></dt>
 * <dd>This encapsulates the payload of the message along with various attributes
 * associated with its delivery, in particular the destination to which it has
 * been (or is about to be) sent.</dd>
 * </dl>
 * <p>
 * The programming interface validates parameters passed to it, and will throw
 * an Error containing an error message intended for developer use, if it detects
 * an error with any parameter.
 * <p>
 * Example:
 *
 * <code><pre>
client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("/World");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "/World";
  client.send(message);
};
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0)
	console.log("onConnectionLost:"+responseObject.errorMessage);
};
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  client.disconnect();
};
 * </pre></code>
 * @namespace Paho.MQTT
 */

//removing PAHO namespace as it is not needed.
// if (typeof Paho === "undefined") {
//     Paho = {};
// }

/*The next set of code is to run the PAHO MQTT Client inside of nativescript-MQTT */
//require WebSockets so we can make sure that it is available for communication
__webpack_require__(/*! nativescript-websockets */ 497);
//set the windows object as it does not exist here
let window = {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout
};
//create a map object for the localStorage
let localStorage = new Map();

MQTT = (function(global) {

    // Private variables below, these are only visible inside the function closure
    // which is used to define the module.

    var version = "@VERSION@";
    var buildLevel = "@BUILDLEVEL@";

    /**
     * Unique message type identifiers, with associated
     * associated integer values.
     * @private
     */
    var MESSAGE_TYPE = {
        CONNECT: 1,
        CONNACK: 2,
        PUBLISH: 3,
        PUBACK: 4,
        PUBREC: 5,
        PUBREL: 6,
        PUBCOMP: 7,
        SUBSCRIBE: 8,
        SUBACK: 9,
        UNSUBSCRIBE: 10,
        UNSUBACK: 11,
        PINGREQ: 12,
        PINGRESP: 13,
        DISCONNECT: 14
    };

    // Collection of utility methods used to simplify module code
    // and promote the DRY pattern.

    /**
     * Validate an object's parameter names to ensure they
     * match a list of expected variables name for this option
     * type. Used to ensure option object passed into the API don't
     * contain erroneous parameters.
     * @param {Object} obj - User options object
     * @param {Object} keys - valid keys and types that may exist in obj.
     * @throws {Error} Invalid option parameter found.
     * @private
     */
    var validate = function(obj, keys) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (keys.hasOwnProperty(key)) {
                    if (typeof obj[key] !== keys[key])
                        throw new Error(format(ERROR.INVALID_TYPE, [typeof obj[key], key]));
                } else {
                    var errorStr = "Unknown property, " + key + ". Valid properties are:";
                    for (var key in keys)
                        if (keys.hasOwnProperty(key))
                            errorStr = errorStr + " " + key;
                    throw new Error(errorStr);
                }
            }
        }
    };

    /**
     * Return a new function which runs the user function bound
     * to a fixed scope.
     * @param {function} User function
     * @param {object} Function scope
     * @return {function} User function bound to another scope
     * @private
     */
    var scope = function(f, scope) {
        return function() {
            return f.apply(scope, arguments);
        };
    };

    /**
     * Unique message type identifiers, with associated
     * associated integer values.
     * @private
     */
    var ERROR = {
        OK: {
            code: 0,
            text: "AMQJSC0000I OK."
        },
        CONNECT_TIMEOUT: {
            code: 1,
            text: "AMQJSC0001E Connect timed out."
        },
        SUBSCRIBE_TIMEOUT: {
            code: 2,
            text: "AMQJS0002E Subscribe timed out."
        },
        UNSUBSCRIBE_TIMEOUT: {
            code: 3,
            text: "AMQJS0003E Unsubscribe timed out."
        },
        PING_TIMEOUT: {
            code: 4,
            text: "AMQJS0004E Ping timed out."
        },
        INTERNAL_ERROR: {
            code: 5,
            text: "AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"
        },
        CONNACK_RETURNCODE: {
            code: 6,
            text: "AMQJS0006E Bad Connack return code:{0} {1}."
        },
        SOCKET_ERROR: {
            code: 7,
            text: "AMQJS0007E Socket error:{0}."
        },
        SOCKET_CLOSE: {
            code: 8,
            text: "AMQJS0008I Socket closed."
        },
        MALFORMED_UTF: {
            code: 9,
            text: "AMQJS0009E Malformed UTF data:{0} {1} {2}."
        },
        UNSUPPORTED: {
            code: 10,
            text: "AMQJS0010E {0} is not supported by this browser."
        },
        INVALID_STATE: {
            code: 11,
            text: "AMQJS0011E Invalid state {0}."
        },
        INVALID_TYPE: {
            code: 12,
            text: "AMQJS0012E Invalid type {0} for {1}."
        },
        INVALID_ARGUMENT: {
            code: 13,
            text: "AMQJS0013E Invalid argument {0} for {1}."
        },
        UNSUPPORTED_OPERATION: {
            code: 14,
            text: "AMQJS0014E Unsupported operation."
        },
        INVALID_STORED_DATA: {
            code: 15,
            text: "AMQJS0015E Invalid data in local storage key={0} value={1}."
        },
        INVALID_MQTT_MESSAGE_TYPE: {
            code: 16,
            text: "AMQJS0016E Invalid MQTT message type {0}."
        },
        MALFORMED_UNICODE: {
            code: 17,
            text: "AMQJS0017E Malformed Unicode string:{0} {1}."
        },
    };

    /** CONNACK RC Meaning. */
    var CONNACK_RC = {
        0: "Connection Accepted",
        1: "Connection Refused: unacceptable protocol version",
        2: "Connection Refused: identifier rejected",
        3: "Connection Refused: server unavailable",
        4: "Connection Refused: bad user name or password",
        5: "Connection Refused: not authorized"
    };

    /**
     * Format an error message text.
     * @private
     * @param {error} ERROR.KEY value above.
     * @param {substitutions} [array] substituted into the text.
     * @return the text with the substitutions made.
     */
    var format = function(error, substitutions) {
        var text = error.text;
        if (substitutions) {
            var field, start;
            for (var i = 0; i < substitutions.length; i++) {
                field = "{" + i + "}";
                start = text.indexOf(field);
                if (start > 0) {
                    var part1 = text.substring(0, start);
                    var part2 = text.substring(start + field.length);
                    text = part1 + substitutions[i] + part2;
                }
            }
        }
        return text;
    };

    //MQTT protocol and version          6    M    Q    I    s    d    p    3
    var MqttProtoIdentifierv3 = [0x00, 0x06, 0x4d, 0x51, 0x49, 0x73, 0x64, 0x70, 0x03];
    //MQTT proto/version for 311         4    M    Q    T    T    4
    var MqttProtoIdentifierv4 = [0x00, 0x04, 0x4d, 0x51, 0x54, 0x54, 0x04];

    /**
     * Construct an MQTT wire protocol message.
     * @param type MQTT packet type.
     * @param options optional wire message attributes.
     *
     * Optional properties
     *
     * messageIdentifier: message ID in the range [0..65535]
     * payloadMessage:	Application Message - PUBLISH only
     * connectStrings:	array of 0 or more Strings to be put into the CONNECT payload
     * topics:			array of strings (SUBSCRIBE, UNSUBSCRIBE)
     * requestQoS:		array of QoS values [0..2]
     *
     * "Flag" properties
     * cleanSession:	true if present / false if absent (CONNECT)
     * willMessage:  	true if present / false if absent (CONNECT)
     * isRetained:		true if present / false if absent (CONNECT)
     * userName:		true if present / false if absent (CONNECT)
     * password:		true if present / false if absent (CONNECT)
     * keepAliveInterval:	integer [0..65535]  (CONNECT)
     *
     * @private
     * @ignore
     */
    var WireMessage = function(type, options) {
        this.type = type;
        for (var name in options) {
            if (options.hasOwnProperty(name)) {
                this[name] = options[name];
            }
        }
    };

    WireMessage.prototype.encode = function() {
        // Compute the first byte of the fixed header
        var first = ((this.type & 0x0f) << 4);

        /*
         * Now calculate the length of the variable header + payload by adding up the lengths
         * of all the component parts
         */

        var remLength = 0;
        var topicStrLength = new Array();
        var destinationNameLength = 0;

        // if the message contains a messageIdentifier then we need two bytes for that
        if (this.messageIdentifier != undefined)
            remLength += 2;

        switch (this.type) {
            // If this a Connect then we need to include 12 bytes for its header
            case MESSAGE_TYPE.CONNECT:
                switch (this.mqttVersion) {
                    case 3:
                        remLength += MqttProtoIdentifierv3.length + 3;
                        break;
                    case 4:
                        remLength += MqttProtoIdentifierv4.length + 3;
                        break;
                }

                remLength += UTF8Length(this.clientId) + 2;
                if (this.willMessage != undefined) {
                    remLength += UTF8Length(this.willMessage.destinationName) + 2;
                    // Will message is always a string, sent as UTF-8 characters with a preceding length.
                    var willMessagePayloadBytes = this.willMessage.payloadBytes;
                    if (!(willMessagePayloadBytes instanceof Uint8Array))
                        willMessagePayloadBytes = new Uint8Array(payloadBytes);
                    remLength += willMessagePayloadBytes.byteLength + 2;
                }
                if (this.userName != undefined)
                    remLength += UTF8Length(this.userName) + 2;
                if (this.password != undefined)
                    remLength += UTF8Length(this.password) + 2;
                break;

                // Subscribe, Unsubscribe can both contain topic strings
            case MESSAGE_TYPE.SUBSCRIBE:
                first |= 0x02; // Qos = 1;
                for (var i = 0; i < this.topics.length; i++) {
                    topicStrLength[i] = UTF8Length(this.topics[i]);
                    remLength += topicStrLength[i] + 2;
                }
                remLength += this.requestedQos.length; // 1 byte for each topic's Qos
                // QoS on Subscribe only
                break;

            case MESSAGE_TYPE.UNSUBSCRIBE:
                first |= 0x02; // Qos = 1;
                for (var i = 0; i < this.topics.length; i++) {
                    topicStrLength[i] = UTF8Length(this.topics[i]);
                    remLength += topicStrLength[i] + 2;
                }
                break;

            case MESSAGE_TYPE.PUBREL:
                first |= 0x02; // Qos = 1;
                break;

            case MESSAGE_TYPE.PUBLISH:
                if (this.payloadMessage.duplicate) first |= 0x08;
                first = first |= (this.payloadMessage.qos << 1);
                if (this.payloadMessage.retained) first |= 0x01;
                destinationNameLength = UTF8Length(this.payloadMessage.destinationName);
                remLength += destinationNameLength + 2;
                var payloadBytes = this.payloadMessage.payloadBytes;
                remLength += payloadBytes.byteLength;
                if (payloadBytes instanceof ArrayBuffer)
                    payloadBytes = new Uint8Array(payloadBytes);
                else if (!(payloadBytes instanceof Uint8Array))
                    payloadBytes = new Uint8Array(payloadBytes.buffer);
                break;

            case MESSAGE_TYPE.DISCONNECT:
                break;

            default:
                ;
        }

        // Now we can allocate a buffer for the message

        var mbi = encodeMBI(remLength); // Convert the length to MQTT MBI format
        var pos = mbi.length + 1; // Offset of start of variable header
        var buffer = new ArrayBuffer(remLength + pos);
        var byteStream = new Uint8Array(buffer); // view it as a sequence of bytes

        //Write the fixed header into the buffer
        byteStream[0] = first;
        byteStream.set(mbi, 1);

        // If this is a PUBLISH then the variable header starts with a topic
        if (this.type == MESSAGE_TYPE.PUBLISH)
            pos = writeString(this.payloadMessage.destinationName, destinationNameLength, byteStream, pos);
        // If this is a CONNECT then the variable header contains the protocol name/version, flags and keepalive time

        else if (this.type == MESSAGE_TYPE.CONNECT) {
            switch (this.mqttVersion) {
                case 3:
                    byteStream.set(MqttProtoIdentifierv3, pos);
                    pos += MqttProtoIdentifierv3.length;
                    break;
                case 4:
                    byteStream.set(MqttProtoIdentifierv4, pos);
                    pos += MqttProtoIdentifierv4.length;
                    break;
            }
            var connectFlags = 0;
            if (this.cleanSession)
                connectFlags = 0x02;
            if (this.willMessage != undefined) {
                connectFlags |= 0x04;
                connectFlags |= (this.willMessage.qos << 3);
                if (this.willMessage.retained) {
                    connectFlags |= 0x20;
                }
            }
            if (this.userName != undefined)
                connectFlags |= 0x80;
            if (this.password != undefined)
                connectFlags |= 0x40;
            byteStream[pos++] = connectFlags;
            pos = writeUint16(this.keepAliveInterval, byteStream, pos);
        }

        // Output the messageIdentifier - if there is one
        if (this.messageIdentifier != undefined)
            pos = writeUint16(this.messageIdentifier, byteStream, pos);

        switch (this.type) {
            case MESSAGE_TYPE.CONNECT:
                pos = writeString(this.clientId, UTF8Length(this.clientId), byteStream, pos);
                if (this.willMessage != undefined) {
                    pos = writeString(this.willMessage.destinationName, UTF8Length(this.willMessage.destinationName), byteStream, pos);
                    pos = writeUint16(willMessagePayloadBytes.byteLength, byteStream, pos);
                    byteStream.set(willMessagePayloadBytes, pos);
                    pos += willMessagePayloadBytes.byteLength;

                }
                if (this.userName != undefined)
                    pos = writeString(this.userName, UTF8Length(this.userName), byteStream, pos);
                if (this.password != undefined)
                    pos = writeString(this.password, UTF8Length(this.password), byteStream, pos);
                break;

            case MESSAGE_TYPE.PUBLISH:
                // PUBLISH has a text or binary payload, if text do not add a 2 byte length field, just the UTF characters.
                byteStream.set(payloadBytes, pos);

                break;

                //    	    case MESSAGE_TYPE.PUBREC:
                //    	    case MESSAGE_TYPE.PUBREL:
                //    	    case MESSAGE_TYPE.PUBCOMP:
                //    	    	break;

            case MESSAGE_TYPE.SUBSCRIBE:
                // SUBSCRIBE has a list of topic strings and request QoS
                for (var i = 0; i < this.topics.length; i++) {
                    pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
                    byteStream[pos++] = this.requestedQos[i];
                }
                break;

            case MESSAGE_TYPE.UNSUBSCRIBE:
                // UNSUBSCRIBE has a list of topic strings
                for (var i = 0; i < this.topics.length; i++)
                    pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
                break;

            default:
                // Do nothing.
        }

        return buffer;
    }

    function decodeMessage(input, pos) {
        var startingPos = pos;
        var first = input[pos];
        var type = first >> 4;
        var messageInfo = first &= 0x0f;
        pos += 1;


        // Decode the remaining length (MBI format)

        var digit;
        var remLength = 0;
        var multiplier = 1;
        do {
            if (pos == input.length) {
                return [null, startingPos];
            }
            digit = input[pos++];
            remLength += ((digit & 0x7F) * multiplier);
            multiplier *= 128;
        } while ((digit & 0x80) != 0);

        var endPos = pos + remLength;
        if (endPos > input.length) {
            return [null, startingPos];
        }

        var wireMessage = new WireMessage(type);
        switch (type) {
            case MESSAGE_TYPE.CONNACK:
                var connectAcknowledgeFlags = input[pos++];
                if (connectAcknowledgeFlags & 0x01)
                    wireMessage.sessionPresent = true;
                wireMessage.returnCode = input[pos++];
                break;

            case MESSAGE_TYPE.PUBLISH:
                var qos = (messageInfo >> 1) & 0x03;

                var len = readUint16(input, pos);
                pos += 2;
                var topicName = parseUTF8(input, pos, len);
                pos += len;
                // If QoS 1 or 2 there will be a messageIdentifier
                if (qos > 0) {
                    wireMessage.messageIdentifier = readUint16(input, pos);
                    pos += 2;
                }

                var message = new MQTT.Message(input.subarray(pos, endPos));
                if ((messageInfo & 0x01) == 0x01)
                    message.retained = true;
                if ((messageInfo & 0x08) == 0x08)
                    message.duplicate = true;
                message.qos = qos;
                message.destinationName = topicName;
                wireMessage.payloadMessage = message;
                break;

            case MESSAGE_TYPE.PUBACK:
            case MESSAGE_TYPE.PUBREC:
            case MESSAGE_TYPE.PUBREL:
            case MESSAGE_TYPE.PUBCOMP:
            case MESSAGE_TYPE.UNSUBACK:
                wireMessage.messageIdentifier = readUint16(input, pos);
                break;

            case MESSAGE_TYPE.SUBACK:
                wireMessage.messageIdentifier = readUint16(input, pos);
                pos += 2;
                wireMessage.returnCode = input.subarray(pos, endPos);
                break;

            default:
                ;
        }

        return [wireMessage, endPos];
    }

    function writeUint16(input, buffer, offset) {
        buffer[offset++] = input >> 8; //MSB
        buffer[offset++] = input % 256; //LSB
        return offset;
    }

    function writeString(input, utf8Length, buffer, offset) {
        offset = writeUint16(utf8Length, buffer, offset);
        stringToUTF8(input, buffer, offset);
        return offset + utf8Length;
    }

    function readUint16(buffer, offset) {
        return 256 * buffer[offset] + buffer[offset + 1];
    }

    /**
     * Encodes an MQTT Multi-Byte Integer
     * @private
     */
    function encodeMBI(number) {
        var output = new Array(1);
        var numBytes = 0;

        do {
            var digit = number % 128;
            number = number >> 7;
            if (number > 0) {
                digit |= 0x80;
            }
            output[numBytes++] = digit;
        } while ((number > 0) && (numBytes < 4));

        return output;
    }

    /**
     * Takes a String and calculates its length in bytes when encoded in UTF8.
     * @private
     */
    function UTF8Length(input) {
        var output = 0;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode > 0x7FF) {
                // Surrogate pair means its a 4 byte character
                if (0xD800 <= charCode && charCode <= 0xDBFF) {
                    i++;
                    output++;
                }
                output += 3;
            } else if (charCode > 0x7F)
                output += 2;
            else
                output++;
        }
        return output;
    }

    /**
     * Takes a String and writes it into an array as UTF8 encoded bytes.
     * @private
     */
    function stringToUTF8(input, output, start) {
        var pos = start;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);

            // Check for a surrogate pair.
            if (0xD800 <= charCode && charCode <= 0xDBFF) {
                var lowCharCode = input.charCodeAt(++i);
                if (isNaN(lowCharCode)) {
                    throw new Error(format(ERROR.MALFORMED_UNICODE, [charCode, lowCharCode]));
                }
                charCode = ((charCode - 0xD800) << 10) + (lowCharCode - 0xDC00) + 0x10000;

            }

            if (charCode <= 0x7F) {
                output[pos++] = charCode;
            } else if (charCode <= 0x7FF) {
                output[pos++] = charCode >> 6 & 0x1F | 0xC0;
                output[pos++] = charCode & 0x3F | 0x80;
            } else if (charCode <= 0xFFFF) {
                output[pos++] = charCode >> 12 & 0x0F | 0xE0;
                output[pos++] = charCode >> 6 & 0x3F | 0x80;
                output[pos++] = charCode & 0x3F | 0x80;
            } else {
                output[pos++] = charCode >> 18 & 0x07 | 0xF0;
                output[pos++] = charCode >> 12 & 0x3F | 0x80;
                output[pos++] = charCode >> 6 & 0x3F | 0x80;
                output[pos++] = charCode & 0x3F | 0x80;
            };
        }
        return output;
    }

    function parseUTF8(input, offset, length) {
        var output = "";
        var utf16;
        var pos = offset;

        while (pos < offset + length) {
            var byte1 = input[pos++];
            if (byte1 < 128)
                utf16 = byte1;
            else {
                var byte2 = input[pos++] - 128;
                if (byte2 < 0)
                    throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), ""]));
                if (byte1 < 0xE0) // 2 byte character
                    utf16 = 64 * (byte1 - 0xC0) + byte2;
                else {
                    var byte3 = input[pos++] - 128;
                    if (byte3 < 0)
                        throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16)]));
                    if (byte1 < 0xF0) // 3 byte character
                        utf16 = 4096 * (byte1 - 0xE0) + 64 * byte2 + byte3;
                    else {
                        var byte4 = input[pos++] - 128;
                        if (byte4 < 0)
                            throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
                        if (byte1 < 0xF8) // 4 byte character
                            utf16 = 262144 * (byte1 - 0xF0) + 4096 * byte2 + 64 * byte3 + byte4;
                        else // longer encodings are not supported
                            throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
                    }
                }
            }

            if (utf16 > 0xFFFF) // 4 byte character - express as a surrogate pair
            {
                utf16 -= 0x10000;
                output += String.fromCharCode(0xD800 + (utf16 >> 10)); // lead character
                utf16 = 0xDC00 + (utf16 & 0x3FF); // trail character
            }
            output += String.fromCharCode(utf16);
        }
        return output;
    }

    /**
     * Repeat keepalive requests, monitor responses.
     * @ignore
     */
    var Pinger = function(client, window, keepAliveInterval) {
        this._client = client;
        this._window = window;
        this._keepAliveInterval = keepAliveInterval * 1000;
        this.isReset = false;

        var pingReq = new WireMessage(MESSAGE_TYPE.PINGREQ).encode();

        var doTimeout = function(pinger) {
            return function() {
                return doPing.apply(pinger);
            };
        };

        /** @ignore */
        var doPing = function() {
            if (!this.isReset) {
                this._client._trace("Pinger.doPing", "Timed out");
                this._client._disconnected(ERROR.PING_TIMEOUT.code, format(ERROR.PING_TIMEOUT));
            } else {
                this.isReset = false;
                this._client._trace("Pinger.doPing", "send PINGREQ");
                this._client.socket.send(pingReq);
                this.timeout = this._window.setTimeout(doTimeout(this), this._keepAliveInterval);
            }
        }

        this.reset = function() {
            this.isReset = true;
            this._window.clearTimeout(this.timeout);
            if (this._keepAliveInterval > 0)
                this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
        }

        this.cancel = function() {
            this._window.clearTimeout(this.timeout);
        }
    };

    /**
     * Monitor request completion.
     * @ignore
     */
    var Timeout = function(client, window, timeoutSeconds, action, args) {
        this._window = window;
        if (!timeoutSeconds)
            timeoutSeconds = 30;

        var doTimeout = function(action, client, args) {
            return function() {
                return action.apply(client, args);
            };
        };
        this.timeout = setTimeout(doTimeout(action, client, args), timeoutSeconds * 1000);

        this.cancel = function() {
            this._window.clearTimeout(this.timeout);
        }
    };

    /*
     * Internal implementation of the Websockets MQTT V3.1 client.
     *
     * @name Paho.MQTT.ClientImpl @constructor
     * @param {String} host the DNS nameof the webSocket host.
     * @param {Number} port the port number for that host.
     * @param {String} clientId the MQ client identifier.
     */
    var ClientImpl = function(uri, host, port, path, clientId) {
        /* REMOVING AS WE ARE NOT IN A BROWSER  --------

          // Check dependencies are satisfied in this browser.
          if (!("WebSocket" in global && global["WebSocket"] !== null)) {
              throw new Error(format(ERROR.UNSUPPORTED, ["WebSocket"]));
          }
          if (!("localStorage" in global && global["localStorage"] !== null)) {
              throw new Error(format(ERROR.UNSUPPORTED, ["localStorage"]));
          }
          if (!("ArrayBuffer" in global && global["ArrayBuffer"] !== null)) {
              throw new Error(format(ERROR.UNSUPPORTED, ["ArrayBuffer"]));
          }
          */
        this._trace("MQTT.Client", uri, host, port, path, clientId);

        this.host = host;
        this.port = port;
        this.path = path;
        this.uri = uri;
        this.clientId = clientId;

        // Local storagekeys are qualified with the following string.
        // The conditional inclusion of path in the key is for backward
        // compatibility to when the path was not configurable and assumed to
        // be /mqtt
        this._localKey = host + ":" + port + (path != "/mqtt" ? ":" + path : "") + ":" + clientId + ":";

        // Create private instance-only message queue
        // Internal queue of messages to be sent, in sending order.
        this._msg_queue = [];

        // Messages we have sent and are expecting a response for, indexed by their respective message ids.
        this._sentMessages = {};

        // Messages we have received and acknowleged and are expecting a confirm message for
        // indexed by their respective message ids.
        this._receivedMessages = {};

        // Internal list of callbacks to be executed when messages
        // have been successfully sent over web socket, e.g. disconnect
        // when it doesn't have to wait for ACK, just message is dispatched.
        this._notify_msg_sent = {};

        // Unique identifier for SEND messages, incrementing
        // counter as messages are sent.
        this._message_identifier = 1;

        // Used to determine the transmission sequence of stored sent messages.
        this._sequence = 0;


        // Load the local state, if any, from the saved version, only restore state relevant to this client.
        for (var key in localStorage)
            if (key.indexOf("Sent:" + this._localKey) == 0 || key.indexOf("Received:" + this._localKey) == 0)
                this.restore(key);
    };

    // Messaging Client public instance members.
    ClientImpl.prototype.host;
    ClientImpl.prototype.port;
    ClientImpl.prototype.path;
    ClientImpl.prototype.uri;
    ClientImpl.prototype.clientId;

    // Messaging Client private instance members.
    ClientImpl.prototype.socket;
    /* true once we have received an acknowledgement to a CONNECT packet. */
    ClientImpl.prototype.connected = false;
    /* The largest message identifier allowed, may not be larger than 2**16 but
     * if set smaller reduces the maximum number of outbound messages allowed.
     */
    ClientImpl.prototype.maxMessageIdentifier = 65536;
    ClientImpl.prototype.connectOptions;
    ClientImpl.prototype.hostIndex;
    ClientImpl.prototype.onConnectionLost;
    ClientImpl.prototype.onMessageDelivered;
    ClientImpl.prototype.onMessageArrived;
    ClientImpl.prototype.traceFunction;
    ClientImpl.prototype._msg_queue = null;
    ClientImpl.prototype._connectTimeout;
    /* The sendPinger monitors how long we allow before we send data to prove to the server that we are alive. */
    ClientImpl.prototype.sendPinger = null;
    /* The receivePinger monitors how long we allow before we require evidence that the server is alive. */
    ClientImpl.prototype.receivePinger = null;

    ClientImpl.prototype.receiveBuffer = null;

    ClientImpl.prototype._traceBuffer = null;
    ClientImpl.prototype._MAX_TRACE_ENTRIES = 100;

    ClientImpl.prototype.connect = function(connectOptions) {
        var connectOptionsMasked = this._traceMask(connectOptions, "password");
        this._trace("Client.connect", connectOptionsMasked, this.socket, this.connected);

        if (this.connected)
            throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));
        if (this.socket)
            throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));

        this.connectOptions = connectOptions;

        if (connectOptions.uris) {
            this.hostIndex = 0;
            this._doConnect(connectOptions.uris[0]);
        } else {
            this._doConnect(this.uri);
        }

    };

    ClientImpl.prototype.subscribe = function(filter, subscribeOptions) {
        this._trace("Client.subscribe", filter, subscribeOptions);

        if (!this.connected)
            throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

        var wireMessage = new WireMessage(MESSAGE_TYPE.SUBSCRIBE);
        wireMessage.topics = [filter];
        if (subscribeOptions.qos != undefined)
            wireMessage.requestedQos = [subscribeOptions.qos];
        else
            wireMessage.requestedQos = [0];

        if (subscribeOptions.onSuccess) {
            wireMessage.onSuccess = function(grantedQos) {
                subscribeOptions.onSuccess({
                    invocationContext: subscribeOptions.invocationContext,
                    grantedQos: grantedQos
                });
            };
        }

        if (subscribeOptions.onFailure) {
            wireMessage.onFailure = function(errorCode) {
                subscribeOptions.onFailure({
                    invocationContext: subscribeOptions.invocationContext,
                    errorCode: errorCode
                });
            };
        }

        if (subscribeOptions.timeout) {
            wireMessage.timeOut = new Timeout(this, window, subscribeOptions.timeout, subscribeOptions.onFailure, [{
                invocationContext: subscribeOptions.invocationContext,
                errorCode: ERROR.SUBSCRIBE_TIMEOUT.code,
                errorMessage: format(ERROR.SUBSCRIBE_TIMEOUT)
            }]);
        }

        // All subscriptions return a SUBACK.
        this._requires_ack(wireMessage);
        this._schedule_message(wireMessage);
    };

    /** @ignore */
    ClientImpl.prototype.unsubscribe = function(filter, unsubscribeOptions) {
        this._trace("Client.unsubscribe", filter, unsubscribeOptions);

        if (!this.connected)
            throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

        var wireMessage = new WireMessage(MESSAGE_TYPE.UNSUBSCRIBE);
        wireMessage.topics = [filter];

        if (unsubscribeOptions.onSuccess) {
            wireMessage.callback = function() {
                unsubscribeOptions.onSuccess({
                    invocationContext: unsubscribeOptions.invocationContext
                });
            };
        }
        if (unsubscribeOptions.timeout) {
            wireMessage.timeOut = new Timeout(this, window, unsubscribeOptions.timeout, unsubscribeOptions.onFailure, [{
                invocationContext: unsubscribeOptions.invocationContext,
                errorCode: ERROR.UNSUBSCRIBE_TIMEOUT.code,
                errorMessage: format(ERROR.UNSUBSCRIBE_TIMEOUT)
            }]);
        }

        // All unsubscribes return a SUBACK.
        this._requires_ack(wireMessage);
        this._schedule_message(wireMessage);
    };

    ClientImpl.prototype.send = function(message) {
        this._trace("Client.send", message);

        if (!this.connected)
            throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

        wireMessage = new WireMessage(MESSAGE_TYPE.PUBLISH);
        wireMessage.payloadMessage = message;

        if (message.qos > 0)
            this._requires_ack(wireMessage);
        else if (this.onMessageDelivered)
            this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage);
        this._schedule_message(wireMessage);
    };

    ClientImpl.prototype.disconnect = function() {
        this._trace("Client.disconnect");

        if (!this.socket)
            throw new Error(format(ERROR.INVALID_STATE, ["not connecting or connected"]));

        wireMessage = new WireMessage(MESSAGE_TYPE.DISCONNECT);

        // Run the disconnected call back as soon as the message has been sent,
        // in case of a failure later on in the disconnect processing.
        // as a consequence, the _disconected call back may be run several times.
        this._notify_msg_sent[wireMessage] = scope(this._disconnected, this);

        this._schedule_message(wireMessage);
    };

    ClientImpl.prototype.getTraceLog = function() {
        if (this._traceBuffer !== null) {
            this._trace("Client.getTraceLog", new Date());
            this._trace("Client.getTraceLog in flight messages", this._sentMessages.length);
            for (var key in this._sentMessages)
                this._trace("_sentMessages ", key, this._sentMessages[key]);
            for (var key in this._receivedMessages)
                this._trace("_receivedMessages ", key, this._receivedMessages[key]);

            return this._traceBuffer;
        }
    };

    ClientImpl.prototype.startTrace = function() {
        if (this._traceBuffer === null) {
            this._traceBuffer = [];
        }
        this._trace("Client.startTrace", new Date(), version);
    };

    ClientImpl.prototype.stopTrace = function() {
        delete this._traceBuffer;
    };

    ClientImpl.prototype._doConnect = function(wsurl) {
        // When the socket is open, this client will send the CONNECT WireMessage using the saved parameters.
        if (this.connectOptions.useSSL) {
            var uriParts = wsurl.split(":");
            uriParts[0] = "wss";
            wsurl = uriParts.join(":");
        }
        this.connected = false;
        if (this.connectOptions.mqttVersion < 4) {
            this.socket = new WebSocket(wsurl, ["mqttv3.1"]);
        } else {
            this.socket = new WebSocket(wsurl, ["mqtt"]);
        }
        this.socket.binaryType = 'arraybuffer';

        this.socket.onopen = scope(this._on_socket_open, this);
        this.socket.onmessage = scope(this._on_socket_message, this);
        this.socket.onerror = scope(this._on_socket_error, this);
        this.socket.onclose = scope(this._on_socket_close, this);

        this.sendPinger = new Pinger(this, window, this.connectOptions.keepAliveInterval);
        this.receivePinger = new Pinger(this, window, this.connectOptions.keepAliveInterval);

        this._connectTimeout = new Timeout(this, window, this.connectOptions.timeout, this._disconnected, [ERROR.CONNECT_TIMEOUT.code, format(ERROR.CONNECT_TIMEOUT)]);
    };


    // Schedule a new message to be sent over the WebSockets
    // connection. CONNECT messages cause WebSocket connection
    // to be started. All other messages are queued internally
    // until this has happened. When WS connection starts, process
    // all outstanding messages.
    ClientImpl.prototype._schedule_message = function(message) {
        this._msg_queue.push(message);
        // Process outstanding messages in the queue if we have an  open socket, and have received CONNACK.
        if (this.connected) {
            this._process_queue();
        }
    };

    ClientImpl.prototype.store = function(prefix, wireMessage) {
        var storedMessage = {
            type: wireMessage.type,
            messageIdentifier: wireMessage.messageIdentifier,
            version: 1
        };

        switch (wireMessage.type) {
            case MESSAGE_TYPE.PUBLISH:
                if (wireMessage.pubRecReceived)
                    storedMessage.pubRecReceived = true;

                // Convert the payload to a hex string.
                storedMessage.payloadMessage = {};
                var hex = "";
                var messageBytes = wireMessage.payloadMessage.payloadBytes;
                for (var i = 0; i < messageBytes.length; i++) {
                    if (messageBytes[i] <= 0xF)
                        hex = hex + "0" + messageBytes[i].toString(16);
                    else
                        hex = hex + messageBytes[i].toString(16);
                }
                storedMessage.payloadMessage.payloadHex = hex;

                storedMessage.payloadMessage.qos = wireMessage.payloadMessage.qos;
                storedMessage.payloadMessage.destinationName = wireMessage.payloadMessage.destinationName;
                if (wireMessage.payloadMessage.duplicate)
                    storedMessage.payloadMessage.duplicate = true;
                if (wireMessage.payloadMessage.retained)
                    storedMessage.payloadMessage.retained = true;

                // Add a sequence number to sent messages.
                if (prefix.indexOf("Sent:") == 0) {
                    if (wireMessage.sequence === undefined)
                        wireMessage.sequence = ++this._sequence;
                    storedMessage.sequence = wireMessage.sequence;
                }
                break;

            default:
                throw Error(format(ERROR.INVALID_STORED_DATA, [key, storedMessage]));
        }
        localStorage.setItem(prefix + this._localKey + wireMessage.messageIdentifier, JSON.stringify(storedMessage));
    };

    ClientImpl.prototype.restore = function(key) {
        var value = localStorage.getItem(key);
        var storedMessage = JSON.parse(value);

        var wireMessage = new WireMessage(storedMessage.type, storedMessage);

        switch (storedMessage.type) {
            case MESSAGE_TYPE.PUBLISH:
                // Replace the payload message with a Message object.
                var hex = storedMessage.payloadMessage.payloadHex;
                var buffer = new ArrayBuffer((hex.length) / 2);
                var byteStream = new Uint8Array(buffer);
                var i = 0;
                while (hex.length >= 2) {
                    var x = parseInt(hex.substring(0, 2), 16);
                    hex = hex.substring(2, hex.length);
                    byteStream[i++] = x;
                }
                var payloadMessage = new MQTT.Message(byteStream);

                payloadMessage.qos = storedMessage.payloadMessage.qos;
                payloadMessage.destinationName = storedMessage.payloadMessage.destinationName;
                if (storedMessage.payloadMessage.duplicate)
                    payloadMessage.duplicate = true;
                if (storedMessage.payloadMessage.retained)
                    payloadMessage.retained = true;
                wireMessage.payloadMessage = payloadMessage;

                break;

            default:
                throw Error(format(ERROR.INVALID_STORED_DATA, [key, value]));
        }

        if (key.indexOf("Sent:" + this._localKey) == 0) {
            wireMessage.payloadMessage.duplicate = true;
            this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
        } else if (key.indexOf("Received:" + this._localKey) == 0) {
            this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
        }
    };

    ClientImpl.prototype._process_queue = function() {
        var message = null;
        // Process messages in order they were added
        var fifo = this._msg_queue.reverse();

        // Send all queued messages down socket connection
        while ((message = fifo.pop())) {
            this._socket_send(message);
            // Notify listeners that message was successfully sent
            if (this._notify_msg_sent[message]) {
                this._notify_msg_sent[message]();
                delete this._notify_msg_sent[message];
            }
        }
    };

    /**
     * Expect an ACK response for this message. Add message to the set of in progress
     * messages and set an unused identifier in this message.
     * @ignore
     */
    ClientImpl.prototype._requires_ack = function(wireMessage) {
        var messageCount = Object.keys(this._sentMessages).length;
        if (messageCount > this.maxMessageIdentifier)
            throw Error("Too many messages:" + messageCount);

        while (this._sentMessages[this._message_identifier] !== undefined) {
            this._message_identifier++;
        }
        wireMessage.messageIdentifier = this._message_identifier;
        this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
        if (wireMessage.type === MESSAGE_TYPE.PUBLISH) {
            this.store("Sent:", wireMessage);
        }
        if (this._message_identifier === this.maxMessageIdentifier) {
            this._message_identifier = 1;
        }
    };

    /**
     * Called when the underlying websocket has been opened.
     * @ignore
     */
    ClientImpl.prototype._on_socket_open = function() {
        // Create the CONNECT message object.
        var wireMessage = new WireMessage(MESSAGE_TYPE.CONNECT, this.connectOptions);
        wireMessage.clientId = this.clientId;
        this._socket_send(wireMessage);
    };

    /**
     * Called when the underlying websocket has received a complete packet.
     * @ignore
     */
    ClientImpl.prototype._on_socket_message = function(event) {
        this._trace("Client._on_socket_message", event.data);
        // Reset the receive ping timer, we now have evidence the server is alive.
        this.receivePinger.reset();
        var messages = this._deframeMessages(event.data);
        for (var i = 0; i < messages.length; i += 1) {
            this._handleMessage(messages[i]);
        }
    }

    ClientImpl.prototype._deframeMessages = function(data) {
        var byteArray = new Uint8Array(data);
        if (this.receiveBuffer) {
            var newData = new Uint8Array(this.receiveBuffer.length + byteArray.length);
            newData.set(this.receiveBuffer);
            newData.set(byteArray, this.receiveBuffer.length);
            byteArray = newData;
            delete this.receiveBuffer;
        }
        try {
            var offset = 0;
            var messages = [];
            while (offset < byteArray.length) {
                var result = decodeMessage(byteArray, offset);
                var wireMessage = result[0];
                offset = result[1];
                if (wireMessage !== null) {
                    messages.push(wireMessage);
                } else {
                    break;
                }
            }
            if (offset < byteArray.length) {
                this.receiveBuffer = byteArray.subarray(offset);
            }
        } catch (error) {
            this._disconnected(ERROR.INTERNAL_ERROR.code, format(ERROR.INTERNAL_ERROR, [error.message, error.stack.toString()]));
            return;
        }
        return messages;
    }

    ClientImpl.prototype._handleMessage = function(wireMessage) {

        this._trace("Client._handleMessage", wireMessage);

        try {
            switch (wireMessage.type) {
                case MESSAGE_TYPE.CONNACK:
                    this._connectTimeout.cancel();

                    // If we have started using clean session then clear up the local state.
                    if (this.connectOptions.cleanSession) {
                        for (var key in this._sentMessages) {
                            var sentMessage = this._sentMessages[key];
                            localStorage.removeItem("Sent:" + this._localKey + sentMessage.messageIdentifier);
                        }
                        this._sentMessages = {};

                        for (var key in this._receivedMessages) {
                            var receivedMessage = this._receivedMessages[key];
                            localStorage.removeItem("Received:" + this._localKey + receivedMessage.messageIdentifier);
                        }
                        this._receivedMessages = {};
                    }
                    // Client connected and ready for business.
                    if (wireMessage.returnCode === 0) {
                        this.connected = true;
                        // Jump to the end of the list of uris and stop looking for a good host.
                        if (this.connectOptions.uris)
                            this.hostIndex = this.connectOptions.uris.length;
                    } else {
                        this._disconnected(ERROR.CONNACK_RETURNCODE.code, format(ERROR.CONNACK_RETURNCODE, [wireMessage.returnCode, CONNACK_RC[wireMessage.returnCode]]));
                        break;
                    }

                    // Resend messages.
                    var sequencedMessages = new Array();
                    for (var msgId in this._sentMessages) {
                        if (this._sentMessages.hasOwnProperty(msgId))
                            sequencedMessages.push(this._sentMessages[msgId]);
                    }

                    // Sort sentMessages into the original sent order.
                    var sequencedMessages = sequencedMessages.sort(function(a, b) {
                        return a.sequence - b.sequence;
                    });
                    for (var i = 0, len = sequencedMessages.length; i < len; i++) {
                        var sentMessage = sequencedMessages[i];
                        if (sentMessage.type == MESSAGE_TYPE.PUBLISH && sentMessage.pubRecReceived) {
                            var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {
                                messageIdentifier: sentMessage.messageIdentifier
                            });
                            this._schedule_message(pubRelMessage);
                        } else {
                            this._schedule_message(sentMessage);
                        };
                    }

                    // Execute the connectOptions.onSuccess callback if there is one.
                    if (this.connectOptions.onSuccess) {
                        this.connectOptions.onSuccess({
                            invocationContext: this.connectOptions.invocationContext
                        });
                    }

                    // Process all queued messages now that the connection is established.
                    this._process_queue();
                    break;

                case MESSAGE_TYPE.PUBLISH:
                    this._receivePublish(wireMessage);
                    break;

                case MESSAGE_TYPE.PUBACK:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    // If this is a re flow of a PUBACK after we have restarted receivedMessage will not exist.
                    if (sentMessage) {
                        delete this._sentMessages[wireMessage.messageIdentifier];
                        localStorage.removeItem("Sent:" + this._localKey + wireMessage.messageIdentifier);
                        if (this.onMessageDelivered)
                            this.onMessageDelivered(sentMessage.payloadMessage);
                    }
                    break;

                case MESSAGE_TYPE.PUBREC:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    // If this is a re flow of a PUBREC after we have restarted receivedMessage will not exist.
                    if (sentMessage) {
                        sentMessage.pubRecReceived = true;
                        var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {
                            messageIdentifier: wireMessage.messageIdentifier
                        });
                        this.store("Sent:", sentMessage);
                        this._schedule_message(pubRelMessage);
                    }
                    break;

                case MESSAGE_TYPE.PUBREL:
                    var receivedMessage = this._receivedMessages[wireMessage.messageIdentifier];
                    localStorage.removeItem("Received:" + this._localKey + wireMessage.messageIdentifier);
                    // If this is a re flow of a PUBREL after we have restarted receivedMessage will not exist.
                    if (receivedMessage) {
                        this._receiveMessage(receivedMessage);
                        delete this._receivedMessages[wireMessage.messageIdentifier];
                    }
                    // Always flow PubComp, we may have previously flowed PubComp but the server lost it and restarted.
                    var pubCompMessage = new WireMessage(MESSAGE_TYPE.PUBCOMP, {
                        messageIdentifier: wireMessage.messageIdentifier
                    });
                    this._schedule_message(pubCompMessage);
                    break;

                case MESSAGE_TYPE.PUBCOMP:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    delete this._sentMessages[wireMessage.messageIdentifier];
                    localStorage.removeItem("Sent:" + this._localKey + wireMessage.messageIdentifier);
                    if (this.onMessageDelivered)
                        this.onMessageDelivered(sentMessage.payloadMessage);
                    break;

                case MESSAGE_TYPE.SUBACK:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    if (sentMessage) {
                        if (sentMessage.timeOut)
                            sentMessage.timeOut.cancel();
                        // This will need to be fixed when we add multiple topic support
                        if (wireMessage.returnCode[0] === 0x80) {
                            if (sentMessage.onFailure) {
                                sentMessage.onFailure(wireMessage.returnCode);
                            }
                        } else if (sentMessage.onSuccess) {
                            sentMessage.onSuccess(wireMessage.returnCode);
                        }
                        delete this._sentMessages[wireMessage.messageIdentifier];
                    }
                    break;

                case MESSAGE_TYPE.UNSUBACK:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    if (sentMessage) {
                        if (sentMessage.timeOut)
                            sentMessage.timeOut.cancel();
                        if (sentMessage.callback) {
                            sentMessage.callback();
                        }
                        delete this._sentMessages[wireMessage.messageIdentifier];
                    }

                    break;

                case MESSAGE_TYPE.PINGRESP:
                    /* The sendPinger or receivePinger may have sent a ping, the receivePinger has already been reset. */
                    this.sendPinger.reset();
                    break;

                case MESSAGE_TYPE.DISCONNECT:
                    // Clients do not expect to receive disconnect packets.
                    this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code, format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
                    break;

                default:
                    this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code, format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
            };
        } catch (error) {
            this._disconnected(ERROR.INTERNAL_ERROR.code, format(ERROR.INTERNAL_ERROR, [error.message, error.stack.toString()]));
            return;
        }
    };

    /** @ignore */
    ClientImpl.prototype._on_socket_error = function(error) {
        this._disconnected(ERROR.SOCKET_ERROR.code, format(ERROR.SOCKET_ERROR, [error.data]));
    };

    /** @ignore */
    ClientImpl.prototype._on_socket_close = function() {
        this._disconnected(ERROR.SOCKET_CLOSE.code, format(ERROR.SOCKET_CLOSE));
    };

    /** @ignore */
    ClientImpl.prototype._socket_send = function(wireMessage) {

        if (wireMessage.type == 1) {
            var wireMessageMasked = this._traceMask(wireMessage, "password");
            this._trace("Client._socket_send", wireMessageMasked);
        } else this._trace("Client._socket_send", wireMessage);

        this.socket.send(wireMessage.encode());
        /* We have proved to the server we are alive. */
        this.sendPinger.reset();
    };

    /** @ignore */
    ClientImpl.prototype._receivePublish = function(wireMessage) {
        switch (wireMessage.payloadMessage.qos) {
            case "undefined":
            case 0:
                this._receiveMessage(wireMessage);
                break;

            case 1:
                var pubAckMessage = new WireMessage(MESSAGE_TYPE.PUBACK, {
                    messageIdentifier: wireMessage.messageIdentifier
                });
                this._schedule_message(pubAckMessage);
                this._receiveMessage(wireMessage);
                break;

            case 2:
                this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
                this.store("Received:", wireMessage);
                var pubRecMessage = new WireMessage(MESSAGE_TYPE.PUBREC, {
                    messageIdentifier: wireMessage.messageIdentifier
                });
                this._schedule_message(pubRecMessage);

                break;

            default:
                throw Error("Invaild qos=" + wireMmessage.payloadMessage.qos);
        };
    };

    /** @ignore */
    ClientImpl.prototype._receiveMessage = function(wireMessage) {
        if (this.onMessageArrived) {
            this.onMessageArrived(wireMessage.payloadMessage);
        }
    };

    /**
     * Client has disconnected either at its own request or because the server
     * or network disconnected it. Remove all non-durable state.
     * @param {errorCode} [number] the error number.
     * @param {errorText} [string] the error text.
     * @ignore
     */
    ClientImpl.prototype._disconnected = function(errorCode, errorText) {
        this._trace("Client._disconnected", errorCode, errorText);

        this.sendPinger.cancel();
        this.receivePinger.cancel();
        if (this._connectTimeout)
            this._connectTimeout.cancel();
        // Clear message buffers.
        this._msg_queue = [];
        this._notify_msg_sent = {};

        if (this.socket) {
            // Cancel all socket callbacks so that they cannot be driven again by this socket.
            this.socket.onopen = null;
            this.socket.onmessage = null;
            this.socket.onerror = null;
            this.socket.onclose = null;
            if (this.socket.readyState === 1)
                this.socket.close();
            delete this.socket;
        }

        if (this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length - 1) {
            // Try the next host.
            this.hostIndex++;
            this._doConnect(this.connectOptions.uris[this.hostIndex]);

        } else {

            if (errorCode === undefined) {
                errorCode = ERROR.OK.code;
                errorText = format(ERROR.OK);
            }

            // Run any application callbacks last as they may attempt to reconnect and hence create a new socket.
            if (this.connected) {
                this.connected = false;
                // Execute the connectionLostCallback if there is one, and we were connected.
                if (this.onConnectionLost)
                    this.onConnectionLost({
                        errorCode: errorCode,
                        errorMessage: errorText
                    });
            } else {
                // Otherwise we never had a connection, so indicate that the connect has failed.
                if (this.connectOptions.mqttVersion === 4 && this.connectOptions.mqttVersionExplicit === false) {
                    this._trace("Failed to connect V4, dropping back to V3")
                    this.connectOptions.mqttVersion = 3;
                    if (this.connectOptions.uris) {
                        this.hostIndex = 0;
                        this._doConnect(this.connectOptions.uris[0]);
                    } else {
                        this._doConnect(this.uri);
                    }
                } else if (this.connectOptions.onFailure) {
                    this.connectOptions.onFailure({
                        invocationContext: this.connectOptions.invocationContext,
                        errorCode: errorCode,
                        errorMessage: errorText
                    });
                }
            }
        }
    };

    /** @ignore */
    ClientImpl.prototype._trace = function() {
        // Pass trace message back to client's callback function
        if (this.traceFunction) {
            for (var i in arguments) {
                if (typeof arguments[i] !== "undefined")
                    arguments[i] = JSON.stringify(arguments[i]);
            }
            var record = Array.prototype.slice.call(arguments).join("");
            this.traceFunction({
                severity: "Debug",
                message: record
            });
        }

        //buffer style trace
        if (this._traceBuffer !== null) {
            for (var i = 0, max = arguments.length; i < max; i++) {
                if (this._traceBuffer.length == this._MAX_TRACE_ENTRIES) {
                    this._traceBuffer.shift();
                }
                if (i === 0) this._traceBuffer.push(arguments[i]);
                else if (typeof arguments[i] === "undefined") this._traceBuffer.push(arguments[i]);
                else this._traceBuffer.push("  " + JSON.stringify(arguments[i]));
            };
        };
    };

    /** @ignore */
    ClientImpl.prototype._traceMask = function(traceObject, masked) {
        var traceObjectMasked = {};
        for (var attr in traceObject) {
            if (traceObject.hasOwnProperty(attr)) {
                if (attr == masked)
                    traceObjectMasked[attr] = "******";
                else
                    traceObjectMasked[attr] = traceObject[attr];
            }
        }
        return traceObjectMasked;
    };

    // ------------------------------------------------------------------------
    // Public Programming interface.
    // ------------------------------------------------------------------------

    /**
     * The JavaScript application communicates to the server using a {@link Paho.MQTT.Client} object.
     * <p>
     * Most applications will create just one Client object and then call its connect() method,
     * however applications can create more than one Client object if they wish.
     * In this case the combination of host, port and clientId attributes must be different for each Client object.
     * <p>
     * The send, subscribe and unsubscribe methods are implemented as asynchronous JavaScript methods
     * (even though the underlying protocol exchange might be synchronous in nature).
     * This means they signal their completion by calling back to the application,
     * via Success or Failure callback functions provided by the application on the method in question.
     * Such callbacks are called at most once per method invocation and do not persist beyond the lifetime
     * of the script that made the invocation.
     * <p>
     * In contrast there are some callback functions, most notably <i>onMessageArrived</i>,
     * that are defined on the {@link Paho.MQTT.Client} object.
     * These may get called multiple times, and aren't directly related to specific method invocations made by the client.
     *
     * @name Paho.MQTT.Client
     *
     * @constructor
     *
     * @param {string} host - the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
     * @param {number} port - the port number to connect to - only required if host is not a URI
     * @param {string} path - the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
     * @param {string} clientId - the Messaging client identifier, between 1 and 23 characters in length.
     *
     * @property {string} host - <i>read only</i> the server's DNS hostname or dotted decimal IP address.
     * @property {number} port - <i>read only</i> the server's port.
     * @property {string} path - <i>read only</i> the server's path.
     * @property {string} clientId - <i>read only</i> used when connecting to the server.
     * @property {function} onConnectionLost - called when a connection has been lost.
     *                            after a connect() method has succeeded.
     *                            Establish the call back used when a connection has been lost. The connection may be
     *                            lost because the client initiates a disconnect or because the server or network
     *                            cause the client to be disconnected. The disconnect call back may be called without
     *                            the connectionComplete call back being invoked if, for example the client fails to
     *                            connect.
     *                            A single response object parameter is passed to the onConnectionLost callback containing the following fields:
     *                            <ol>
     *                            <li>errorCode
     *                            <li>errorMessage
     *                            </ol>
     * @property {function} onMessageDelivered called when a message has been delivered.
     *                            All processing that this Client will ever do has been completed. So, for example,
     *                            in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server
     *                            and the message has been removed from persistent storage before this callback is invoked.
     *                            Parameters passed to the onMessageDelivered callback are:
     *                            <ol>
     *                            <li>{@link Paho.MQTT.Message} that was delivered.
     *                            </ol>
     * @property {function} onMessageArrived called when a message has arrived in this Paho.MQTT.client.
     *                            Parameters passed to the onMessageArrived callback are:
     *                            <ol>
     *                            <li>{@link Paho.MQTT.Message} that has arrived.
     *                            </ol>
     */
    var Client = function(host, port, path, clientId) {

        var uri;

        if (typeof host !== "string")
            throw new Error(format(ERROR.INVALID_TYPE, [typeof host, "host"]));

        if (arguments.length == 2) {
            // host: must be full ws:// uri
            // port: clientId
            clientId = port;
            uri = host;
            var match = uri.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
            if (match) {
                host = match[4] || match[2];
                port = parseInt(match[7]);
                path = match[8];
            } else {
                throw new Error(format(ERROR.INVALID_ARGUMENT, [host, "host"]));
            }
        } else {
            if (arguments.length == 3) {
                clientId = path;
                path = "/mqtt";
            }
            if (typeof port !== "number" || port < 0)
                throw new Error(format(ERROR.INVALID_TYPE, [typeof port, "port"]));
            if (typeof path !== "string")
                throw new Error(format(ERROR.INVALID_TYPE, [typeof path, "path"]));

            var ipv6AddSBracket = (host.indexOf(":") != -1 && host.slice(0, 1) != "[" && host.slice(-1) != "]");
            uri = "ws://" + (ipv6AddSBracket ? "[" + host + "]" : host) + ":" + port + path;
        }

        var clientIdLength = 0;
        for (var i = 0; i < clientId.length; i++) {
            var charCode = clientId.charCodeAt(i);
            if (0xD800 <= charCode && charCode <= 0xDBFF) {
                i++; // Surrogate pair.
            }
            clientIdLength++;
        }
        if (typeof clientId !== "string" || clientIdLength > 65535)
            throw new Error(format(ERROR.INVALID_ARGUMENT, [clientId, "clientId"]));

        var client = new ClientImpl(uri, host, port, path, clientId);
        this._getHost = function() {
            return host;
        };
        this._setHost = function() {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
        };

        this._getPort = function() {
            return port;
        };
        this._setPort = function() {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
        };

        this._getPath = function() {
            return path;
        };
        this._setPath = function() {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
        };

        this._getURI = function() {
            return uri;
        };
        this._setURI = function() {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
        };

        this._getClientId = function() {
            return client.clientId;
        };
        this._setClientId = function() {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
        };

        this._getOnConnectionLost = function() {
            return client.onConnectionLost;
        };
        this._setOnConnectionLost = function(newOnConnectionLost) {
            if (typeof newOnConnectionLost === "function")
                client.onConnectionLost = newOnConnectionLost;
            else
                throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnectionLost, "onConnectionLost"]));
        };

        this._getOnMessageDelivered = function() {
            return client.onMessageDelivered;
        };
        this._setOnMessageDelivered = function(newOnMessageDelivered) {
            if (typeof newOnMessageDelivered === "function")
                client.onMessageDelivered = newOnMessageDelivered;
            else
                throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageDelivered, "onMessageDelivered"]));
        };

        this._getOnMessageArrived = function() {
            return client.onMessageArrived;
        };
        this._setOnMessageArrived = function(newOnMessageArrived) {
            if (typeof newOnMessageArrived === "function")
                client.onMessageArrived = newOnMessageArrived;
            else
                throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageArrived, "onMessageArrived"]));
        };

        this._getTrace = function() {
            return client.traceFunction;
        };
        this._setTrace = function(trace) {
            if (typeof trace === "function") {
                client.traceFunction = trace;
            } else {
                throw new Error(format(ERROR.INVALID_TYPE, [typeof trace, "onTrace"]));
            }
        };

        /**
         * Connect this Messaging client to its server.
         *
         * @name Paho.MQTT.Client#connect
         * @function
         * @param {Object} connectOptions - attributes used with the connection.
         * @param {number} connectOptions.timeout - If the connect has not succeeded within this
         *                    number of seconds, it is deemed to have failed.
         *                    The default is 30 seconds.
         * @param {string} connectOptions.userName - Authentication username for this connection.
         * @param {string} connectOptions.password - Authentication password for this connection.
         * @param {Paho.MQTT.Message} connectOptions.willMessage - sent by the server when the client
         *                    disconnects abnormally.
         * @param {Number} connectOptions.keepAliveInterval - the server disconnects this client if
         *                    there is no activity for this number of seconds.
         *                    The default value of 60 seconds is assumed if not set.
         * @param {boolean} connectOptions.cleanSession - if true(default) the client and server
         *                    persistent state is deleted on successful connect.
         * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
         * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
         * @param {function} connectOptions.onSuccess - called when the connect acknowledgement
         *                    has been received from the server.
         * A single response object parameter is passed to the onSuccess callback containing the following fields:
         * <ol>
         * <li>invocationContext as passed in to the onSuccess method in the connectOptions.
         * </ol>
         * @config {function} [onFailure] called when the connect request has failed or timed out.
         * A single response object parameter is passed to the onFailure callback containing the following fields:
         * <ol>
         * <li>invocationContext as passed in to the onFailure method in the connectOptions.
         * <li>errorCode a number indicating the nature of the error.
         * <li>errorMessage text describing the error.
         * </ol>
         * @config {Array} [hosts] If present this contains either a set of hostnames or fully qualified
         * WebSocket URIs (ws://example.com:1883/mqtt), that are tried in order in place
         * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
         * one of then succeeds.
         * @config {Array} [ports] If present the set of ports matching the hosts. If hosts contains URIs, this property
         * is not used.
         * @throws {InvalidState} if the client is not in disconnected state. The client must have received connectionLost
         * or disconnected before calling connect for a second or subsequent time.
         */
        this.connect = function(connectOptions) {
            connectOptions = connectOptions || {};
            validate(connectOptions, {
                timeout: "number",
                userName: "string",
                password: "string",
                willMessage: "object",
                keepAliveInterval: "number",
                cleanSession: "boolean",
                useSSL: "boolean",
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                hosts: "object",
                ports: "object",
                mqttVersion: "number"
            });

            // If no keep alive interval is set, assume 60 seconds.
            if (connectOptions.keepAliveInterval === undefined)
                connectOptions.keepAliveInterval = 60;

            if (connectOptions.mqttVersion > 4 || connectOptions.mqttVersion < 3) {
                throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.mqttVersion, "connectOptions.mqttVersion"]));
            }

            if (connectOptions.mqttVersion === undefined) {
                connectOptions.mqttVersionExplicit = false;
                connectOptions.mqttVersion = 4;
            } else {
                connectOptions.mqttVersionExplicit = true;
            }

            //Check that if password is set, so is username
            if (connectOptions.password === undefined && connectOptions.userName !== undefined)
                throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.password, "connectOptions.password"]))

            if (connectOptions.willMessage) {
                if (!(connectOptions.willMessage instanceof Message))
                    throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, "connectOptions.willMessage"]));
                // The will message must have a payload that can be represented as a string.
                // Cause the willMessage to throw an exception if this is not the case.
                connectOptions.willMessage.stringPayload;

                if (typeof connectOptions.willMessage.destinationName === "undefined")
                    throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.willMessage.destinationName, "connectOptions.willMessage.destinationName"]));
            }
            if (typeof connectOptions.cleanSession === "undefined")
                connectOptions.cleanSession = true;
            if (connectOptions.hosts) {

                if (!(connectOptions.hosts instanceof Array))
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
                if (connectOptions.hosts.length < 1)
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));

                var usingURIs = false;
                for (var i = 0; i < connectOptions.hosts.length; i++) {
                    if (typeof connectOptions.hosts[i] !== "string")
                        throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.hosts[i], "connectOptions.hosts[" + i + "]"]));
                    if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(connectOptions.hosts[i])) {
                        if (i == 0) {
                            usingURIs = true;
                        } else if (!usingURIs) {
                            throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts[" + i + "]"]));
                        }
                    } else if (usingURIs) {
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts[" + i + "]"]));
                    }
                }

                if (!usingURIs) {
                    if (!connectOptions.ports)
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
                    if (!(connectOptions.ports instanceof Array))
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
                    if (connectOptions.hosts.length != connectOptions.ports.length)
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));

                    connectOptions.uris = [];

                    for (var i = 0; i < connectOptions.hosts.length; i++) {
                        if (typeof connectOptions.ports[i] !== "number" || connectOptions.ports[i] < 0)
                            throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.ports[i], "connectOptions.ports[" + i + "]"]));
                        var host = connectOptions.hosts[i];
                        var port = connectOptions.ports[i];

                        var ipv6 = (host.indexOf(":") != -1);
                        uri = "ws://" + (ipv6 ? "[" + host + "]" : host) + ":" + port + path;
                        connectOptions.uris.push(uri);
                    }
                } else {
                    connectOptions.uris = connectOptions.hosts;
                }
            }

            client.connect(connectOptions);
        };

        /**
         * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
         *
         * @name Paho.MQTT.Client#subscribe
         * @function
         * @param {string} filter describing the destinations to receive messages from.
         * <br>
         * @param {object} subscribeOptions - used to control the subscription
         *
         * @param {number} subscribeOptions.qos - the maiximum qos of any publications sent
         *                                  as a result of making this subscription.
         * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback
         *                                  or onFailure callback.
         * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
         *                                  has been received from the server.
         *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
         *                                  <ol>
         *                                  <li>invocationContext if set in the subscribeOptions.
         *                                  </ol>
         * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
         *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
         *                                  <ol>
         *                                  <li>invocationContext - if set in the subscribeOptions.
         *                                  <li>errorCode - a number indicating the nature of the error.
         *                                  <li>errorMessage - text describing the error.
         *                                  </ol>
         * @param {number} subscribeOptions.timeout - which, if present, determines the number of
         *                                  seconds after which the onFailure calback is called.
         *                                  The presence of a timeout does not prevent the onSuccess
         *                                  callback from being called when the subscribe completes.
         * @throws {InvalidState} if the client is not in connected state.
         */
        this.subscribe = function(filter, subscribeOptions) {
            if (typeof filter !== "string")
                throw new Error("Invalid argument:" + filter);
            subscribeOptions = subscribeOptions || {};
            validate(subscribeOptions, {
                qos: "number",
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                timeout: "number"
            });
            if (subscribeOptions.timeout && !subscribeOptions.onFailure)
                throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
            if (typeof subscribeOptions.qos !== "undefined" && !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2))
                throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, "subscribeOptions.qos"]));
            client.subscribe(filter, subscribeOptions);
        };

        /**
         * Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
         *
         * @name Paho.MQTT.Client#unsubscribe
         * @function
         * @param {string} filter - describing the destinations to receive messages from.
         * @param {object} unsubscribeOptions - used to control the subscription
         * @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback
                                              or onFailure callback.
         * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
         *                                    A single response object parameter is passed to the
         *                                    onSuccess callback containing the following fields:
         *                                    <ol>
         *                                    <li>invocationContext - if set in the unsubscribeOptions.
         *                                    </ol>
         * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
         *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
         *                                    <ol>
         *                                    <li>invocationContext - if set in the unsubscribeOptions.
         *                                    <li>errorCode - a number indicating the nature of the error.
         *                                    <li>errorMessage - text describing the error.
         *                                    </ol>
         * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
         *                                    after which the onFailure callback is called. The presence of
         *                                    a timeout does not prevent the onSuccess callback from being
         *                                    called when the unsubscribe completes
         * @throws {InvalidState} if the client is not in connected state.
         */
        this.unsubscribe = function(filter, unsubscribeOptions) {
            if (typeof filter !== "string")
                throw new Error("Invalid argument:" + filter);
            unsubscribeOptions = unsubscribeOptions || {};
            validate(unsubscribeOptions, {
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                timeout: "number"
            });
            if (unsubscribeOptions.timeout && !unsubscribeOptions.onFailure)
                throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
            client.unsubscribe(filter, unsubscribeOptions);
        };

        /**
         * Send a message to the consumers of the destination in the Message.
         *
         * @name Paho.MQTT.Client#send
         * @function
         * @param {string|Paho.MQTT.Message} topic - <b>mandatory</b> The name of the destination to which the message is to be sent.
         * 					   - If it is the only parameter, used as Paho.MQTT.Message object.
         * @param {String|ArrayBuffer} payload - The message data to be sent.
         * @param {number} qos The Quality of Service used to deliver the message.
         * 		<dl>
         * 			<dt>0 Best effort (default).
         *     			<dt>1 At least once.
         *     			<dt>2 Exactly once.
         * 		</dl>
         * @param {Boolean} retained If true, the message is to be retained by the server and delivered
         *                     to both current and future subscriptions.
         *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
         *                     A received message has the retained boolean set to true if the message was published
         *                     with the retained boolean set to true
         *                     and the subscrption was made after the message has been published.
         * @throws {InvalidState} if the client is not connected.
         */
        this.send = function(topic, payload, qos, retained) {
            var message;

            if (arguments.length == 0) {
                throw new Error("Invalid argument." + "length");

            } else if (arguments.length == 1) {

                if (!(topic instanceof Message) && (typeof topic !== "string"))
                    throw new Error("Invalid argument:" + typeof topic);

                message = topic;
                if (typeof message.destinationName === "undefined")
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [message.destinationName, "Message.destinationName"]));
                client.send(message);

            } else {
                //parameter checking in Message object
                message = new Message(payload);
                message.destinationName = topic;
                if (arguments.length >= 3)
                    message.qos = qos;
                if (arguments.length >= 4)
                    message.retained = retained;
                client.send(message);
            }
        };

        /**
         * Normal disconnect of this Messaging client from its server.
         *
         * @name Paho.MQTT.Client#disconnect
         * @function
         * @throws {InvalidState} if the client is already disconnected.
         */
        this.disconnect = function() {
            client.disconnect();
        };

        /**
         * Get the contents of the trace log.
         *
         * @name Paho.MQTT.Client#getTraceLog
         * @function
         * @return {Object[]} tracebuffer containing the time ordered trace records.
         */
        this.getTraceLog = function() {
            return client.getTraceLog();
        }

        /**
         * Start tracing.
         *
         * @name Paho.MQTT.Client#startTrace
         * @function
         */
        this.startTrace = function() {
            client.startTrace();
        };

        /**
         * Stop tracing.
         *
         * @name Paho.MQTT.Client#stopTrace
         * @function
         */
        this.stopTrace = function() {
            client.stopTrace();
        };

        this.isConnected = function() {
            return client.connected;
        };
    };

    Client.prototype = {
        get host() {
            return this._getHost();
        },
        set host(newHost) {
            this._setHost(newHost);
        },

        get port() {
            return this._getPort();
        },
        set port(newPort) {
            this._setPort(newPort);
        },

        get path() {
            return this._getPath();
        },
        set path(newPath) {
            this._setPath(newPath);
        },

        get clientId() {
            return this._getClientId();
        },
        set clientId(newClientId) {
            this._setClientId(newClientId);
        },

        get onConnectionLost() {
            return this._getOnConnectionLost();
        },
        set onConnectionLost(newOnConnectionLost) {
            this._setOnConnectionLost(newOnConnectionLost);
        },

        get onMessageDelivered() {
            return this._getOnMessageDelivered();
        },
        set onMessageDelivered(newOnMessageDelivered) {
            this._setOnMessageDelivered(newOnMessageDelivered);
        },

        get onMessageArrived() {
            return this._getOnMessageArrived();
        },
        set onMessageArrived(newOnMessageArrived) {
            this._setOnMessageArrived(newOnMessageArrived);
        },

        get trace() {
            return this._getTrace();
        },
        set trace(newTraceFunction) {
            this._setTrace(newTraceFunction);
        }

    };

    /**
     * An application message, sent or received.
     * <p>
     * All attributes may be null, which implies the default values.
     *
     * @name Paho.MQTT.Message
     * @constructor
     * @param {String|ArrayBuffer} payload The message data to be sent.
     * <p>
     * @property {string} payloadString <i>read only</i> The payload as a string if the payload consists of valid UTF-8 characters.
     * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an ArrayBuffer.
     * <p>
     * @property {string} destinationName <b>mandatory</b> The name of the destination to which the message is to be sent
     *                    (for messages about to be sent) or the name of the destination from which the message has been received.
     *                    (for messages received by the onMessage function).
     * <p>
     * @property {number} qos The Quality of Service used to deliver the message.
     * <dl>
     *     <dt>0 Best effort (default).
     *     <dt>1 At least once.
     *     <dt>2 Exactly once.
     * </dl>
     * <p>
     * @property {Boolean} retained If true, the message is to be retained by the server and delivered
     *                     to both current and future subscriptions.
     *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
     *                     A received message has the retained boolean set to true if the message was published
     *                     with the retained boolean set to true
     *                     and the subscrption was made after the message has been published.
     * <p>
     * @property {Boolean} duplicate <i>read only</i> If true, this message might be a duplicate of one which has already been received.
     *                     This is only set on messages received from the server.
     *
     */
    var Message = function(newPayload) {
        var payload;
        if (typeof newPayload === "string" || newPayload instanceof ArrayBuffer || newPayload instanceof Int8Array || newPayload instanceof Uint8Array || newPayload instanceof Int16Array || newPayload instanceof Uint16Array || newPayload instanceof Int32Array || newPayload instanceof Uint32Array || newPayload instanceof Float32Array || newPayload instanceof Float64Array) {
            payload = newPayload;
        } else {
            throw (format(ERROR.INVALID_ARGUMENT, [newPayload, "newPayload"]));
        }

        this._getPayloadString = function() {
            if (typeof payload === "string")
                return payload;
            else
                return parseUTF8(payload, 0, payload.length);
        };

        this._getPayloadBytes = function() {
            if (typeof payload === "string") {
                var buffer = new ArrayBuffer(UTF8Length(payload));
                var byteStream = new Uint8Array(buffer);
                stringToUTF8(payload, byteStream, 0);

                return byteStream;
            } else {
                return payload;
            };
        };

        var destinationName = undefined;
        this._getDestinationName = function() {
            return destinationName;
        };
        this._setDestinationName = function(newDestinationName) {
            if (typeof newDestinationName === "string")
                destinationName = newDestinationName;
            else
                throw new Error(format(ERROR.INVALID_ARGUMENT, [newDestinationName, "newDestinationName"]));
        };

        var qos = 0;
        this._getQos = function() {
            return qos;
        };
        this._setQos = function(newQos) {
            if (newQos === 0 || newQos === 1 || newQos === 2)
                qos = newQos;
            else
                throw new Error("Invalid argument:" + newQos);
        };

        var retained = false;
        this._getRetained = function() {
            return retained;
        };
        this._setRetained = function(newRetained) {
            if (typeof newRetained === "boolean")
                retained = newRetained;
            else
                throw new Error(format(ERROR.INVALID_ARGUMENT, [newRetained, "newRetained"]));
        };

        var duplicate = false;
        this._getDuplicate = function() {
            return duplicate;
        };
        this._setDuplicate = function(newDuplicate) {
            duplicate = newDuplicate;
        };
    };

    Message.prototype = {
        get payloadString() {
            return this._getPayloadString();
        },
        get payloadBytes() {
            return this._getPayloadBytes();
        },

        get destinationName() {
            return this._getDestinationName();
        },
        set destinationName(newDestinationName) {
            this._setDestinationName(newDestinationName);
        },

        get qos() {
            return this._getQos();
        },
        set qos(newQos) {
            this._setQos(newQos);
        },

        get retained() {
            return this._getRetained();
        },
        set retained(newRetained) {
            this._setRetained(newRetained);
        },

        get duplicate() {
            return this._getDuplicate();
        },
        set duplicate(newDuplicate) {
            this._setDuplicate(newDuplicate);
        }
    };

    // Module contents.
    return {
        Client: Client,
        Message: Message
    };
})(window);

module.exports = MQTT;


/***/ }),

/***/ 588:
/*!********************************************************************!*\
  !*** ../node_modules/nativescript-websockets/websockets-common.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*****************************************************************************************
 * (c) 2015-2017, Master Technology
 * Licensed under the MIT license or contact me for a support, changes, enhancements,
 * and/or if you require a commercial licensing
 *
 * Any questions please feel free to email me or put a issue up on github
 *
 * Version 1.4.0                                             Nathan@master-technology.com
 ****************************************************************************************/


/* global require, module, global */

/**
 * This creates an "Browser" based Event for the Browser based WebSockets
 * @param values {Object} - Object list of additional key items
 * @constructor
 */
var BrowserWebSocketsEvent = function(values) {
    Object.defineProperty(this, "bubbles", {
        get: function () { return false; },
        enumerable: true
    });
    Object.defineProperty(this, "cancelBubble", {
        get: function () { return false; },
        enumerable: true
    });
    Object.defineProperty(this, "cancelable", {
        get: function () { return false; },
        enumerable: true
    });
    Object.defineProperty(this, "defaultPrevented", {
        get: function () { return false; },
        enumerable: true
    });
    Object.defineProperty(this, "eventPhase", {
        get: function () { return 0; },
        enumerable: true
    });
    Object.defineProperty(this, "path", {
        get: function () { return []; },
        enumerable: true
    });
    Object.defineProperty(this, "returnValue", {
        get: function () { return true; },
        enumerable: true
    });
    this.timeStamp = Date.now();
    Object.defineProperty(this, "timeStamp", { enumerable: true });

    for (var key in values) {
        if (values.hasOwnProperty(key)) {
            this[key] = values[key];
            Object.defineProperty(this, key, { enumerable: true });
        }
    }
};

//noinspection JSUnusedGlobalSymbols
/**
 * This is the dummy preventDefault Function
 * @returns {boolean}
 */
BrowserWebSocketsEvent.prototype.preventDefault = function() { return false; };

//noinspection JSUnusedGlobalSymbols
/**
 * This is the dummy stopImmediatePropagation event
 * @returns {boolean}
 */
BrowserWebSocketsEvent.prototype.stopImmediatePropagation = function() { return false;};

//noinspection JSUnusedGlobalSymbols
/**
 * This is the dummy stopPropagation event
 * @returns {boolean}
 */
BrowserWebSocketsEvent.prototype.stopPropagation = function() { return false; };

// Export the Event so that we can use it in the webSocket code
module.exports = {Event: BrowserWebSocketsEvent};

/**
 * This is the Browser Based WebSocket creation factory
 * @param url {string} - URL to connect to
 * @param protocols {Array|String} - Protocols supported
 * @returns {*} - WebSocket
 * @constructor
 */
var BrowserWebSockets = function(url, protocols) {
    var ws;
    var WS = __webpack_require__(/*! ./websockets */ 497);
    if (protocols === null || protocols === undefined) {
        ws =  new WS(url, {browser: true});
    } else {
        if (!Array.isArray(protocols)) {
            protocols = [protocols];
        }
        ws = new WS(url, {browser: true, protocols: protocols});
    }

    // Create the Browser based additional properties
    ws.binaryType = "arraybuffer";
    ws.onclose = null;
    ws.onerror = null;
    ws.onmessage = null;
    ws.onopen = null;

    // Switch notifiers
    ws._notify = ws._notifyBrowser;

    // To make the WS look like a normal Browser webSocket, we hide all the internal private variables
    // for some reason we have to hide the _notify on the prototype because of the above re-assignment of _notify = _notifyBrowser..
    //noinspection JSUnresolvedVariable
    Object.defineProperty(WS.prototype, "_notify", {enumerable: false});

    Object.defineProperty(ws, "_notify", {enumerable: false});
    Object.defineProperty(ws, "_callbacks", {enumerable: false});
    Object.defineProperty(ws, "_protocol", {enumerable: false});
    Object.defineProperty(ws, "_browser", {enumerable: false});
    Object.defineProperty(ws, "_socket", {enumerable: false});
    Object.defineProperty(ws, "_url", {enumerable: false});
    Object.defineProperty(ws, "_hasOpened", {enumerable: false});
    Object.defineProperty(ws, "_timeout", {enumerable: false});
    Object.defineProperty(ws, "_proxy", {enumerable: false});

    // We have to open this WS automatically, BUT we want this to fire after the rest of the users code does so that the user can attach his events
    setTimeout(function() {ws.open();}, 250);

    // Return the webSocket
    return ws;
};

/**
 * CONNECTING value
 * @type {number}
 */
BrowserWebSockets.CONNECTING = 0;

/**
 * OPEN value
 * @type {number}
 */
BrowserWebSockets.OPEN = 1;

/**
 * CLOSING value
 * @type {number}
 */
BrowserWebSockets.CLOSING = 2;

/**
 * CLOSED value
 * @type {number}
 */
BrowserWebSockets.CLOSED = 3;

// We attach to the GLOBAL object, so this is not available everywhere.
global.WebSocket = BrowserWebSockets;


/***/ }),

/***/ 589:
/*!*****************************!*\
  !*** ./connect/connect.css ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 590:
/*!****************************************!*\
  !*** ./connect/connect.component.html ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<GridLayout columns=\"*\" rows=\"*,9*\">\r\n        <StackLayout col=\"0\" row=\"0\" style=\"background-color: black\" >\r\n                <GridLayout columns=\"*,8*,*\" rows=\"*\">\r\n                                <StackLayout col=\"0\" row=\"0\">\r\n                                         <Label class=\"h2 fa\" text=\"&#xf060;\" (onTap)=\"onBack()\" style=\"horizontal-align: left; color: white; padding: 20 0 0 10 \"></Label>     \r\n                                </StackLayout>\r\n                                <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\r\n                                        <Label class=\"h2\" text=\"Connection\"  style=\" color: white; text-align: center\"></Label>                                                                                                                                                                             \r\n                                </StackLayout>\r\n                                <StackLayout col=\"2\" row=\"0\"></StackLayout>                                        \r\n                </GridLayout>                                        \r\n        </StackLayout>  \r\n        <GridLayout column=0 row=1 style=\"vertical-align: center\">\r\n                <Label class=\"h2\" text=\"Connect\"  (onTap)=\"connect()\" style=\" text-align: center\"></Label>                                                                                                                                                                                             \r\n        </GridLayout>        \r\n</GridLayout>"

/***/ })

});