webpackJsonp([9],{

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

/***/ 315:
/*!*********************************!*\
  !*** ./status/status.module.ts ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var nativescript_module_1 = __webpack_require__(/*! nativescript-angular/nativescript.module */ 165);
var status_routing_module_1 = __webpack_require__(/*! ./status-routing.module */ 579);
var status_component_1 = __webpack_require__(/*! ./status.component */ 495);
var StatusModule = (function () {
    function StatusModule() {
    }
    StatusModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                status_routing_module_1.StatusRoutingModule
            ],
            declarations: [
                status_component_1.StatusComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], StatusModule);
    return StatusModule;
}());
exports.StatusModule = StatusModule;


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

/***/ 462:
/*!*************************************************************!*\
  !*** ../node_modules/nativescript-fancyalert/fancyalert.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var app = __webpack_require__(/*! tns-core-modules/application */ 5);
__export(__webpack_require__(/*! ./common */ 463));
var PromptDialog = cn.refactor.lib.colordialog.PromptDialog;
var SUPPORTED_TYPESI;
(function (SUPPORTED_TYPESI) {
    SUPPORTED_TYPESI[SUPPORTED_TYPESI["INFO"] = 0] = "INFO";
    SUPPORTED_TYPESI[SUPPORTED_TYPESI["HELP"] = 1] = "HELP";
    SUPPORTED_TYPESI[SUPPORTED_TYPESI["WRONG"] = 2] = "WRONG";
    SUPPORTED_TYPESI[SUPPORTED_TYPESI["SUCCESS"] = 3] = "SUCCESS";
    SUPPORTED_TYPESI[SUPPORTED_TYPESI["WARNING"] = 4] = "WARNING";
})(SUPPORTED_TYPESI = exports.SUPPORTED_TYPESI || (exports.SUPPORTED_TYPESI = {}));
var TNSFancyAlert = (function () {
    function TNSFancyAlert() {
    }
    TNSFancyAlert.showSuccess = function (title, subTitle, closeBtnTitle) {
        return new Promise(function (resolve, reject) {
            var alert = new PromptDialog(app.android.currentContext);
            alert.setCanceledOnTouchOutside(TNSFancyAlert.shouldDismissOnTapOutside);
            alert.setDialogType(SUPPORTED_TYPESI.SUCCESS);
            alert.setTitleText(title || "Success!");
            alert.setContentText(subTitle || "");
            alert.setAnimationEnable(true);
            alert.setPositiveListener(closeBtnTitle || "Ok", new PromptDialog.OnPositiveListener({
                onClick: function (dialog) {
                    dialog.dismiss();
                    resolve();
                }
            }));
            alert.show();
        });
    };
    TNSFancyAlert.showError = function (title, subTitle, closeBtnTitle) {
        return new Promise(function (resolve, reject) {
            var alert = new PromptDialog(app.android.currentContext);
            alert.setCanceledOnTouchOutside(TNSFancyAlert.shouldDismissOnTapOutside);
            alert.setDialogType(SUPPORTED_TYPESI.WRONG);
            alert.setTitleText(title || "Error!");
            alert.setContentText(subTitle || "");
            alert.setAnimationEnable(true);
            alert.setPositiveListener(closeBtnTitle || "Ok", new PromptDialog.OnPositiveListener({
                onClick: function (dialog) {
                    dialog.dismiss();
                    resolve();
                }
            }));
            alert.show();
        });
    };
    TNSFancyAlert.showNotice = function (title, subTitle, closeBtnTitle) {
        return new Promise(function (resolve, reject) {
            var alert = new PromptDialog(app.android.currentContext);
            alert.setCanceledOnTouchOutside(TNSFancyAlert.shouldDismissOnTapOutside);
            alert.setDialogType(SUPPORTED_TYPESI.HELP);
            alert.setTitleText(title || "Notice");
            alert.setContentText(subTitle || "");
            alert.setAnimationEnable(true);
            alert.setPositiveListener(closeBtnTitle || "Ok", new PromptDialog.OnPositiveListener({
                onClick: function (dialog) {
                    dialog.dismiss();
                    resolve();
                }
            }));
            alert.show();
        });
    };
    TNSFancyAlert.showWarning = function (title, subTitle, closeBtnTitle) {
        return new Promise(function (resolve, reject) {
            var alert = new PromptDialog(app.android.currentContext);
            alert.setCanceledOnTouchOutside(TNSFancyAlert.shouldDismissOnTapOutside);
            alert.setDialogType(SUPPORTED_TYPESI.WARNING);
            alert.setTitleText(title || "Warning!");
            alert.setContentText(subTitle || "");
            alert.setAnimationEnable(true);
            alert.setPositiveListener(closeBtnTitle || "Ok", new PromptDialog.OnPositiveListener({
                onClick: function (dialog) {
                    dialog.dismiss();
                    resolve();
                }
            }));
            alert.show();
        });
    };
    TNSFancyAlert.showInfo = function (title, subTitle, closeBtnTitle) {
        return new Promise(function (resolve, reject) {
            var alert = new PromptDialog(app.android.currentContext);
            alert.setCanceledOnTouchOutside(TNSFancyAlert.shouldDismissOnTapOutside);
            alert.setDialogType(SUPPORTED_TYPESI.INFO);
            alert.setTitleText(title || "Info");
            alert.setContentText(subTitle || "");
            alert.setAnimationEnable(true);
            alert.setPositiveListener(closeBtnTitle || "Ok", new PromptDialog.OnPositiveListener({
                onClick: function (dialog) {
                    dialog.dismiss();
                    resolve();
                }
            }));
            alert.show();
        });
    };
    TNSFancyAlert.shouldDismissOnTapOutside = false;
    return TNSFancyAlert;
}());
exports.TNSFancyAlert = TNSFancyAlert;
//# sourceMappingURL=fancyalert.android.js.map

/***/ }),

/***/ 463:
/*!*********************************************************!*\
  !*** ../node_modules/nativescript-fancyalert/common.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TNSFancyAlertButton = (function () {
    function TNSFancyAlertButton(model) {
        if (model) {
            this.label = model.label;
            this.action = model.action;
        }
    }
    return TNSFancyAlertButton;
}());
exports.TNSFancyAlertButton = TNSFancyAlertButton;
//# sourceMappingURL=common.js.map

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

/***/ 495:
/*!************************************!*\
  !*** ./status/status.component.ts ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var router_2 = __webpack_require__(/*! nativescript-angular/router */ 75);
var status_services_1 = __webpack_require__(/*! ./status.services */ 580);
var ApplicationSettings = __webpack_require__(/*! application-settings */ 318);
var page_1 = __webpack_require__(/*! ui/page */ 20);
var Phone = __webpack_require__(/*! nativescript-phone */ 469);
var platform_1 = __webpack_require__(/*! tns-core-modules/platform */ 7);
var nativescript_fancyalert_1 = __webpack_require__(/*! nativescript-fancyalert */ 462);
var dialogs_1 = __webpack_require__(/*! ui/dialogs */ 84);
var StatusComponent = (function () {
    function StatusComponent(router, _page, statusService, route, routerExtensions) {
        this.router = router;
        this._page = _page;
        this.statusService = statusService;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.vendorAddress = Object();
        this.appointmentVisible = false;
        console.log("status appointment id ", ApplicationSettings.getString("deliveryfee"));
        this.route.queryParams.subscribe(function (params) {
        });
        if (platform_1.isIOS) {
            nativescript_fancyalert_1.TNSFancyAlert.hideAnimationType =
                nativescript_fancyalert_1.TNSFancyAlert.HIDE_ANIMATION_TYPES.SlideOutToBottom;
        }
        var vendor = JSON.parse(ApplicationSettings.getString("vendor"));
        this.vendorName = vendor.name;
        this.vendorEmail = vendor.email;
        this.vendorPhone = vendor.phoneNumber;
        this.vendorLogo = vendor.logo;
        this.vendorAddress = vendor.location.address;
        if (ApplicationSettings.getNumber("totalcost") > 0) {
            this.appointmentVisible = !this.appointmentVisible;
        }
    }
    StatusComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
    };
    StatusComponent.prototype.onBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    StatusComponent.prototype.dashboard = function () {
        this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });
    };
    StatusComponent.prototype.cancelAppointment = function () {
        var _this = this;
        console.log("***** Appointment Cancelled *****", ApplicationSettings.getString("appointmentid"));
        if (ApplicationSettings.getString("appointmentid") != 'null') {
            var options = {
                title: "Appointment",
                message: "Are you sure you want to Cancel this Appointment?",
                okButtonText: "Yes",
                cancelButtonText: "Cancel",
            };
            dialogs_1.confirm(options).then(function (result) {
                console.log(result);
                if (result === true) {
                    _this.statusService.cancelAppointment()
                        .subscribe(function (result) {
                        console.log("Appointment Cancel Success : ", (JSON.stringify(result)));
                        ApplicationSettings.setNumber("totalcost", 0);
                        ApplicationSettings.setString("vendorid", 'null');
                        ApplicationSettings.setString("vehicleid", 'null');
                        ApplicationSettings.setString("appointmentid", 'null');
                        ApplicationSettings.setString("deliveryfee", 'null');
                        _this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });
                    }, function (error) {
                        console.log("Appointment Cancel Error : ", error);
                        nativescript_fancyalert_1.TNSFancyAlert.showError("Appointment!", "Appointment Cancelled", "Ok");
                        ApplicationSettings.setNumber("totalcost", 0);
                        ApplicationSettings.setString("vendorid", 'null');
                        ApplicationSettings.setString("vehicleid", 'null');
                        ApplicationSettings.setString("appointmentid", 'null');
                        ApplicationSettings.setString("deliveryfee", 'null');
                        _this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });
                    });
                }
            });
        }
        else {
            if (platform_1.isIOS) {
                nativescript_fancyalert_1.TNSFancyAlert.showAnimationType =
                    SCLAlertViewShowAnimation.SlideInFromBottom;
                nativescript_fancyalert_1.TNSFancyAlert.hideAnimationType =
                    SCLAlertViewHideAnimation.SlideOutToRight;
            }
            nativescript_fancyalert_1.TNSFancyAlert.showInfo("Appointment", "You have no Current Appointment to be Cancelled.", "Ok");
            if (platform_1.isIOS) {
                this.reset();
            }
        }
    };
    StatusComponent.prototype.callDealer = function () {
        Phone.dial(this.vendorPhone, true);
    };
    StatusComponent.prototype.reset = function () {
        setTimeout(function () {
            nativescript_fancyalert_1.TNSFancyAlert.showAnimationType = undefined;
            nativescript_fancyalert_1.TNSFancyAlert.hideAnimationType =
                nativescript_fancyalert_1.TNSFancyAlert.HIDE_ANIMATION_TYPES.SlideOutToBottom;
            nativescript_fancyalert_1.TNSFancyAlert.backgroundType = undefined;
            nativescript_fancyalert_1.TNSFancyAlert.soundURL = undefined;
        }, 1000);
    };
    StatusComponent = __decorate([
        core_1.Component({
            selector: "Status",
            /*duleId: module.i*/
            styles: [__webpack_require__(/*! ./status.css */ 581)],
            template: __webpack_require__(/*! ./status.component.html */ 582),
            providers: [status_services_1.StatusService]
        }),
        __metadata("design:paramtypes", [router_1.Router, page_1.Page, status_services_1.StatusService, router_1.ActivatedRoute, router_2.RouterExtensions])
    ], StatusComponent);
    return StatusComponent;
}());
exports.StatusComponent = StatusComponent;


/***/ }),

/***/ 579:
/*!*****************************************!*\
  !*** ./status/status-routing.module.ts ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! nativescript-angular/router */ 75);
var status_component_1 = __webpack_require__(/*! ./status.component */ 495);
var routes = [
    { path: "", component: status_component_1.StatusComponent }
];
var StatusRoutingModule = (function () {
    function StatusRoutingModule() {
    }
    StatusRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], StatusRoutingModule);
    return StatusRoutingModule;
}());
exports.StatusRoutingModule = StatusRoutingModule;


/***/ }),

/***/ 580:
/*!***********************************!*\
  !*** ./status/status.services.ts ***!
  \***********************************/
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
var StatusService = (function () {
    function StatusService(http) {
        this.http = http;
    }
    StatusService.prototype.cancelAppointment = function () {
        console.log("local storage  Appointment id is : ", ApplicationSettings.getString("appointmentid"), " vendorid : ", JSON.parse(ApplicationSettings.getString("vendorid", "{}")));
        var appointmentid = JSON.parse(ApplicationSettings.getString("appointmentid"));
        var appointmentUpdateURL = "https://uat.futuredms.com/shyft-api/appointment/" + appointmentid;
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        var date = new Date();
        var isoDate = date.toISOString();
        var appointment = {
            "id": JSON.parse(ApplicationSettings.getString("appointmentid", "{}")),
            "datetime": JSON.parse(ApplicationSettings.getString("appointmentDate", "{}")),
            "status": "Cancelled",
            "vendor": JSON.parse(ApplicationSettings.getString("vendorToCancel", "{}"))
        };
        console.log("APpointment create url --> ", appointmentUpdateURL);
        console.log("Appointment PUT Data Testing : ", JSON.stringify(appointment));
        headers.append("Authorization", this.id_token);
        return this.http.put(appointmentUpdateURL, appointment, { headers: headers });
    };
    StatusService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], StatusService);
    return StatusService;
}());
exports.StatusService = StatusService;


/***/ }),

/***/ 581:
/*!***************************!*\
  !*** ./status/status.css ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 582:
/*!**************************************!*\
  !*** ./status/status.component.html ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<GridLayout columns=\"*\" rows=\"*,9*\">\r\n        <StackLayout col=\"0\" row=\"0\" style=\"background-color: black\">\r\n                <GridLayout columns=\"*,8*,*\" rows=\"*\">\r\n                        <StackLayout col=\"0\" row=\"0\">\r\n                                <!-- <Label class=\"h2 fa\" text=\"&#xf053;\" (onTap)=\"onBack()\" style=\"horizontal-align: left; color: white; padding: 20 0 0 10 \"></Label> -->\r\n                        </StackLayout>\r\n                        <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\r\n                                <Label class=\"h2\" text=\"Status Tracker\" style=\" color: white; text-align: center\"></Label>\r\n                        </StackLayout>\r\n                        <StackLayout col=\"2\" row=\"0\"></StackLayout>\r\n                </GridLayout>\r\n        </StackLayout>\r\n        <GridLayout column=0 row=1 columns=\"*\" rows=\"*,9*\">\r\n                <StackLayout col=\"0\" row=\"0\">\r\n                        <Image src=\"res://shyftlogo\"></Image>\r\n                </StackLayout>\r\n                <GridLayout col=\"0\" row=\"1\" columns=\"*\" rows=\"*,3*,4*,2*\">\r\n                        <StackLayout col=\"0\" row=\"0\" style=\"vertical-align: center; background-color: #170095; margin: 0 5 0 5;\">\r\n                                <Label text=\"SUCCESS! We are on the way.\" style=\"padding: 5; text-align: center; font-weight: bold; color: white;\"></Label>\r\n                        </StackLayout>\r\n                        <GridLayout col=\"0\" row=\"1\" columns=\"*\" rows=\"3*, 7*\" style=\"margin: 2; border-width: 2; border-color: #170095; \">\r\n                                <StackLayout col=\"0\" row=\"0\" style=\"vertical-align: center;\">\r\n                                        <Label text=\"Vehicle Tracking and Status\" style=\" text-align: center; font-weight: bold; color: black; background-color: white;\"></Label>\r\n                                </StackLayout>\r\n                                <GridLayout col=\"0\" row=\"1\" columns=\"*\" rows=\"5*,5*\">\r\n                                        <GridLayout col=\"0\" row=\"0\" columns=\"*,1.11*,1.11*,1.11*,1.33*,1.11*,1.11*,1.11*,*\" rows=\"*\" style=\"vertical-align: center\">\r\n                                                <StackLayout col=\"0\" row=\"0\">\r\n                                                        <Image src=\"res://line\" height=\"90%\" width=\"90%\"></Image>\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"1\" row=\"0\">\r\n                                                        <Image [visibility]=\"appointmentVisible ? 'visible' : 'collapsed'\" src=\"res://filledcircle\" height=\"90%\" width=\"90%\"></Image>\r\n                                                        <Image [visibility]=\"appointmentVisible ? 'collapsed' : 'visible'\" src=\"res://circle\" height=\"90%\" width=\"90%\"></Image>                                                        \r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"2\" row=\"0\">\r\n                                                        <Image [visibility]=\"appointmentVisible ? 'visible' : 'collapsed'\" src=\"res://statuscar\" height=\"90%\" width=\"90%\"></Image>\r\n                                                        <Image [visibility]=\"appointmentVisible ? 'collapsed' : 'visible'\" src=\"res://line\" height=\"90%\" width=\"90%\"></Image>                                                        \r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"3\" row=\"0\">\r\n                                                        <Image src=\"res://circle\" height=\"90%\" width=\"90%\"></Image>\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"4\" row=\"0\">\r\n                                                        <Image src=\"res://line\" height=\"90%\" width=\"90%\"></Image>\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"5\" row=\"0\">\r\n                                                        <Image src=\"res://circle\" height=\"90%\" width=\"90%\"></Image>\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"6\" row=\"0\">\r\n                                                        <Image src=\"res://line\" height=\"90%\" width=\"90%\"></Image>\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"7\" row=\"0\">\r\n                                                        <Image src=\"res://circle\" height=\"90%\" width=\"90%\"></Image>\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"8\" row=\"0\">\r\n                                                        <Image src=\"res://line\" height=\"90%\" width=\"90%\"></Image>\r\n                                                </StackLayout>\r\n                                        </GridLayout>\r\n                                        <GridLayout col=\"0\" row=\"2\" columns=\"2.5*,2.5*,2.5*,2.5*\" rows=\"*\">\r\n                                                <StackLayout col=\"0\" row=\"0\" style=\"vertical-align: center;\">\r\n                                                        <Label text=\"On The Way!\" textWrap=\"true\" style=\"font-size:14; text-align: center;\"></Label>\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center;\">\r\n                                                        <Label text=\"Vehicle in route to Dealership\" textWrap=\"true\" style=\"font-size:14; text-align: center;\"></Label>\r\n                                                        <!-- <Label text=\"Dealership\" style=\"font-size:14; text-align: center;\"></Label> -->\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"2\" row=\"0\" style=\"vertical-align: center;\">\r\n                                                        <Label text=\"Technician working on Vehicle\" textWrap=\"true\" style=\"font-size:14; text-align: center;\"></Label>\r\n                                                        <!-- <Label text=\"on Vehicle\" style=\" text-align: center;\"></Label> -->\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"3\" row=\"0\" style=\"vertical-align: center;\">\r\n                                                        <Label text=\"Vehicle Finished\" textWrap=\"true\" style=\"font-size:14; text-align: center;\"></Label>\r\n                                                </StackLayout>\r\n                                        </GridLayout>\r\n                                </GridLayout>\r\n                        </GridLayout>\r\n                        <GridLayout col=\"0\" row=\"2\" columns=\"*\" rows=\"3*,3*,4*\">\r\n                                <StackLayout column=\"0\" row=\"0\" style=\"vertical-align: center;\">\r\n                                        <Label text=\"Service Facility\" class=\"h2\" style=\" text-align: center; font-weight: bold;\"></Label>\r\n                                </StackLayout>\r\n                                <StackLayout column=\"0\" row=\"1\" style=\"horizontal-align: center\">\r\n                                        <Image [src]=\"'https://s3.amazonaws.com/img.futuredms.com/vendors/logos/'+vendorLogo\"></Image>\r\n                                </StackLayout>\r\n                                <GridLayout column=\"0\" row=\"2\" columns=\"2.5*,2.5*,2.5*,2.5*\" rows=\"*\">\r\n                                        <StackLayout col=\"0\" row=\"0\"></StackLayout>\r\n                                        <StackLayout col=\"1\" row=\"0\" (onTap)=\"callDealer()\" style=\"margin: 5 10 10 10\">\r\n                                                <Image src=\"res://telephone\" height=\"50%\" width=\"50%\"></Image>\r\n                                        </StackLayout>\r\n                                        <StackLayout col=\"2\" row=\"0\" style=\"margin: 5 10 10 10\">\r\n                                                <Image src=\"res://message\" height=\"50%\" width=\"50%\"></Image>\r\n                                        </StackLayout>\r\n                                        <StackLayout col=\"3\" row=\"0\"></StackLayout>\r\n                                </GridLayout>\r\n                        </GridLayout>\r\n                        <GridLayout col=\"0\" row=\"3\" columns=\"*\" rows=\"*,*\">\r\n                                <GridLayout col=\"0\" row=\"0\" (onTap)=\"dashboard()\" columns=\"2*,6*,2*\" rows=\"*\" style=\"background-color: black; margin: 10 10 5 10; border-width: 2; border-color: dodgerblue;\">\r\n                                        <StackLayout col=\"0\" row=\"1\" style=\"vertical-align: center; margin: 8\">\r\n                                                <Image src=\"res://house\" style=\"color: white; \"></Image>\r\n                                        </StackLayout>\r\n                                        <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center;\">\r\n                                                <Label text=\"Go Back To Dashboard\" style=\"color: white; text-align: center; font-weight: bold;\"></Label>\r\n                                        </StackLayout>\r\n                                        <StackLayout col=\"2\" row=\"0\" style=\"vertical-align: center;\">\r\n                                        </StackLayout>\r\n                                </GridLayout>\r\n                                <GridLayout col=\"0\" row=\"1\" columns=\"2*,6*,2*\" (onTap)=\"cancelAppointment()\" rows=\"*\" style=\"background-color: #F55A60; margin: 5 10 10 10; border-width: 2; border-color: dodgerblue\">\r\n                                        <StackLayout col=\"0\" row=\"1\" style=\"vertical-align: center; margin: 8\">\r\n                                                <Image src=\"res://cancel\" style=\"color: white; \"></Image>\r\n                                        </StackLayout>\r\n                                        <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center;\">\r\n                                                <Label text=\"Cancel Pickup\"  style=\"color: white; text-align: center; font-weight: bold;\"></Label>\r\n                                        </StackLayout>\r\n                                        <StackLayout col=\"2\" row=\"0\" style=\"vertical-align: center;\">\r\n                                        </StackLayout>\r\n                                </GridLayout>\r\n                        </GridLayout>\r\n                </GridLayout>\r\n        </GridLayout>\r\n</GridLayout>"

/***/ })

});