webpackJsonp([6],{

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

/***/ 314:
/*!***************************************************!*\
  !*** ./servicecategory/servicecategory.module.ts ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var nativescript_module_1 = __webpack_require__(/*! nativescript-angular/nativescript.module */ 165);
var selectservicemodal_1 = __webpack_require__(/*! ../selectservice/selectservicemodal */ 570);
var servicecategory_routing_module_1 = __webpack_require__(/*! ./servicecategory-routing.module */ 572);
var servicecategory_component_1 = __webpack_require__(/*! ./servicecategory.component */ 494);
var angular_1 = __webpack_require__(/*! nativescript-accordion/angular */ 575);
var ServicecategoryModule = (function () {
    function ServicecategoryModule() {
    }
    ServicecategoryModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                servicecategory_routing_module_1.ServicecategoryRoutingModule,
                angular_1.AccordionModule
            ],
            declarations: [
                servicecategory_component_1.ServicecategoryComponent,
                selectservicemodal_1.SelectServiceModalComponent
            ],
            entryComponents: [
                selectservicemodal_1.SelectServiceModalComponent
            ],
            bootstrap: [
                servicecategory_component_1.ServicecategoryComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], ServicecategoryModule);
    return ServicecategoryModule;
}());
exports.ServicecategoryModule = ServicecategoryModule;


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

/***/ 494:
/*!******************************************************!*\
  !*** ./servicecategory/servicecategory.component.ts ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var router_2 = __webpack_require__(/*! nativescript-angular/router */ 75);
var page_1 = __webpack_require__(/*! tns-core-modules/ui/page */ 20);
var dialogs_1 = __webpack_require__(/*! nativescript-angular/directives/dialogs */ 166);
var ApplicationSettings = __webpack_require__(/*! application-settings */ 318);
var selectservice_services_1 = __webpack_require__(/*! ../selectservice/selectservice.services */ 328);
var platform_1 = __webpack_require__(/*! tns-core-modules/platform */ 7);
var nativescript_fancyalert_1 = __webpack_require__(/*! nativescript-fancyalert */ 462);
var ServicecategoryComponent = (function () {
    function ServicecategoryComponent(router, route, _page, modal, vcRef, selectService, routerExtension) {
        var _this = this;
        this.router = router;
        this.route = route;
        this._page = _page;
        this.modal = modal;
        this.vcRef = vcRef;
        this.selectService = selectService;
        this.routerExtension = routerExtension;
        this.SwitchState = "OFF";
        this.vendorCategories = Array();
        this.totalCost = 0;
        this.vendorServices = Array();
        this.selectedServices = Array();
        this.isItemVisible = true;
        if (this.route.queryParams) {
            this.route.queryParams.subscribe(function (params) {
                _this.vendorCategories = JSON.parse(params["vendorCategories"]);
                _this.appointmentUUID = params["appointmentUUID"];
                _this.vendorID = params["vendorID"];
                _this.vehicleID = params["vehicleID"];
                _this.deliveryfee = params["deliveryfee"];
            });
        }
        this.items = this.arrayTransform(this.vendorCategories);
    }
    ServicecategoryComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
    };
    ServicecategoryComponent.prototype.arrayTransform = function (categories) {
        var array = categories;
        array.map(function (item) {
            item.services.map(function (x) {
                console.log("here", x);
                x["state"] = false;
            });
        });
        return array;
    };
    ServicecategoryComponent.prototype.listVisible = function () {
        this.isItemVisible = !this.isItemVisible;
    };
    ServicecategoryComponent.prototype.tapped = function (args, item, i) {
        var Switch = args.object;
        var index = i;
        item.state = !item.state;
        if (Switch.checked) {
            this.SwitchState = "ON";
            this.totalCost = this.totalCost + Math.round(item.base_price);
            console.log("index is : ", index);
            this.selectedServices.push(item);
            console.log("here", JSON.stringify(this.selectedServices));
        }
        else {
            this.SwitchState = "OFF";
            var del = this.selectedServices.findIndex(function (x) { return x.id == item.id; });
            this.totalCost = this.totalCost - Math.round(item.base_price);
            this.selectedServices.splice(del, 1);
            console.log("here", JSON.stringify(this.selectedServices));
        }
    };
    ServicecategoryComponent.prototype.onBack = function () {
        this.routerExtension.backToPreviousPage();
    };
    // public vendorCategoryTap(args, index, item) {
    //     console.log("Selected Vendor is : " + item.services.length + " . " + JSON.stringify(item))
    //     if (item.services.length > 0) {
    //         item.services.map((service) => {
    //             console.log("Services : ", JSON.stringify(service))
    //             this.vendorServices.push(service)
    //         })
    //         let options = {
    //             context: { vendorServices: JSON.stringify(this.vendorServices), vendorID: this.vendorID, vehicleID: this.vehicleID, appointmentUUID: this.appointmentUUID, deliveryfee: this.deliveryfee },
    //             height: 100,
    //             fullscreen: true,
    //             viewContainerRef: this.vcRef,
    //         };
    //         this.modal.showModal(SelectServiceModalComponent, options).then(response => {
    //             console.log("modal console : ", JSON.stringify(response))
    //             response.map((item) => {
    //                 console.log("Selected Services : ", JSON.stringify(item.id))
    //                 this.selectService.serviceSelection(item.id, this.appointmentUUID)
    //                 let servArray = ApplicationSettings.getString("servicesSelections")
    //                 console.log("service length  : ", ApplicationSettings.getString("servicesSelections"))
    //             })
    //         });
    //     }
    //     else {
    //         alert("No Services Available in this Category")
    //     }
    // }
    ServicecategoryComponent.prototype.proceedPickup = function () {
        var _this = this;
        if (this.selectedServices.length > 0) {
            this.selectedServices.map(function (item) {
                console.log("Selected Services : ", JSON.stringify(item.id));
                _this.selectService.serviceSelection(item.id, _this.appointmentUUID);
            });
            ApplicationSettings.setString("services", JSON.stringify(this.selectedServices));
            ApplicationSettings.setNumber("totalcost", this.totalCost);
            var navigationExtras = {
                queryParams: {
                    "services": ApplicationSettings.getString("services"),
                    "totalcost": ApplicationSettings.getNumber("totalcost"),
                    "vendorID": this.vendorID,
                    "vehicleID": this.vehicleID,
                    "appointmentUUID": this.appointmentUUID,
                    "deliveryfee": this.deliveryfee
                }
            };
            this.router.navigate(["pickup"], navigationExtras);
        }
        else {
            if (platform_1.isIOS) {
                nativescript_fancyalert_1.TNSFancyAlert.showAnimationType =
                    SCLAlertViewShowAnimation.SlideInFromBottom;
                nativescript_fancyalert_1.TNSFancyAlert.hideAnimationType =
                    SCLAlertViewHideAnimation.SlideOutToRight;
            }
            nativescript_fancyalert_1.TNSFancyAlert.showInfo("Select Service", "Atleast Select a Single Service to Proceed.", "Ok");
            if (platform_1.isIOS) {
                this.reset();
            }
        }
    };
    ServicecategoryComponent.prototype.reset = function () {
        setTimeout(function () {
            nativescript_fancyalert_1.TNSFancyAlert.showAnimationType = undefined;
            nativescript_fancyalert_1.TNSFancyAlert.hideAnimationType =
                nativescript_fancyalert_1.TNSFancyAlert.HIDE_ANIMATION_TYPES.SlideOutToBottom;
            nativescript_fancyalert_1.TNSFancyAlert.backgroundType = undefined;
            nativescript_fancyalert_1.TNSFancyAlert.soundURL = undefined;
        }, 1000);
    };
    ServicecategoryComponent = __decorate([
        core_1.Component({
            selector: "Servicecategory",
            /*duleId: module.i*/
            styles: [__webpack_require__(/*! ./servicecategory.css */ 573)],
            template: __webpack_require__(/*! ./servicecategory.component.html */ 574),
            providers: [selectservice_services_1.SelectService]
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, page_1.Page, dialogs_1.ModalDialogService, core_1.ViewContainerRef, selectservice_services_1.SelectService, router_2.RouterExtensions])
    ], ServicecategoryComponent);
    return ServicecategoryComponent;
}());
exports.ServicecategoryComponent = ServicecategoryComponent;


/***/ }),

/***/ 570:
/*!*********************************************!*\
  !*** ./selectservice/selectservicemodal.ts ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var dialogs_1 = __webpack_require__(/*! nativescript-angular/directives/dialogs */ 166);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var ApplicationSettings = __webpack_require__(/*! application-settings */ 318);
var SelectServiceModalComponent = (function () {
    function SelectServiceModalComponent(params, router, route) {
        this.params = params;
        this.router = router;
        this.route = route;
        this.SwitchState = "OFF";
        this.totalCost = ApplicationSettings.getNumber("totalcost");
        this.selectedServices = Array();
        this.state = false;
        this.frameworks = Array();
        this.frameworks = JSON.parse(params.context.vendorServices);
        this.vendorID = params.context.vendorID;
        this.vehicleID = params.context.vehicleID;
        this.appointmentUUID = params.context.appointmentUUID;
        this.deliveryfee = params.context.deliveryfee;
        console.log("constructor service : ", this.totalCost);
    }
    SelectServiceModalComponent.prototype.close = function (res) {
        this.params.closeCallback(this.totalCost);
    };
    SelectServiceModalComponent.prototype.submit = function (res) {
        ApplicationSettings.setString("services", JSON.stringify(this.selectedServices));
        ApplicationSettings.setNumber("totalcost", this.totalCost);
        // let navigationExtras: NavigationExtras = {
        //     queryParams: {
        //         "services": JSON.stringify(this.selectedServices),
        //         "totalcost": this.totalCost,
        //         "vendorID": this.vendorID,
        //         "vehicleID": this.vehicleID,
        //         "appointmentUUID": this.appointmentUUID,
        //         "deliveryfee": this.deliveryfee
        //     }
        // };
        this.params.closeCallback(this.selectedServices);
        // this.router.navigate(["pickup"], navigationExtras);
    };
    SelectServiceModalComponent.prototype.onCheck = function (args, item, index) {
        var Switch = args.object;
        if (Switch.checked) {
            this.SwitchState = "ON";
            this.totalCost = this.totalCost + Math.round(item.base_price);
            this.selectedServices.push(item);
        }
        else {
            this.SwitchState = "OFF";
            this.totalCost = this.totalCost - Math.round(item.base_price);
            console.log("index is : ", index);
            this.selectedServices.splice(index, 1);
        }
    };
    __decorate([
        core_1.ViewChild("CB1"),
        __metadata("design:type", core_1.ElementRef)
    ], SelectServiceModalComponent.prototype, "CheckBox", void 0);
    SelectServiceModalComponent = __decorate([
        core_1.Component({
            selector: "my-modal",
            template: __webpack_require__(/*! ./selectservicemodal.html */ 571),
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, router_1.Router, router_1.ActivatedRoute])
    ], SelectServiceModalComponent);
    return SelectServiceModalComponent;
}());
exports.SelectServiceModalComponent = SelectServiceModalComponent;


/***/ }),

/***/ 571:
/*!***********************************************!*\
  !*** ./selectservice/selectservicemodal.html ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<GridLayout columns=\"*\" rows=\"3*,5*,2*\" padding=\"10\" backgroundColor=\"#404040\">\n        <StackLayout col=0 row=0 >\n        </StackLayout>\n        <StackLayout col=0 row=1 borderColor=\"dodgerblue\" borderWidth=\"2\" borderRadius=\"10\" backgroundColor=\"white\">   \n           <GridLayout columns=\"*\" rows=\"*,6*,3*\"  >\n                <StackLayout col=0 row=0 style=\"vertical-align: center; horizontal-align: center; font-weight: bold;\">\n                    <Label class=\"h2\" text=\"Select Your Service\" color=\"black\"></Label>\n                </StackLayout>\n                <StackLayout col=0 row=1 style=\"border-bottom-width: 1; border-color: #404040\">       \n                    <ScrollView sdkExampleTitle sdkToggleNavButton>\n                                    <StackLayout >\n                                            <StackLayout  *ngFor=\"let item of frameworks; let i = index\" >\n                                                    <StackLayout orientation=\"horizontal\" padding=\"10\" >\n                                                            <GridLayout columns=\"6*,2*,2*\" rows=\"*\">\n                                                            <StackLayout  col=0 row=0 style=\"vertical-align: center;\">\n                                                            <Label textWrap=\"true\" [text]=\"item?.name\" style=\"color: black; padding-left:5; font-weight: bold;\"></Label> \n                                                            </StackLayout>\n                                                            <StackLayout col=1 row=0 style=\"horizontal-align: center; vertical-align: center;\" > \n                                                            <Label textWrap=\"true\" [text]=\"'$'+item?.base_price\" style=\"color: black; text-align: center; padding-left:5; font-weight: bold;\"></Label>                                                                        \n                                                            </StackLayout>\n                                                            <StackLayout col=2 row=0  style=\"horizontal-align: right;\">\n                                                            <Switch  checked=\"false\" (checkedChange)=\"onCheck($event, item, i)\" ></Switch>                                            \n                                                            </StackLayout>\n                                                            </GridLayout>\n                                                    </StackLayout>     \n                                            </StackLayout>\n                                    </StackLayout>\n                    </ScrollView>\n                </StackLayout>\n                <StackLayout col=0 row=2  style=\"vertical-align: center; horizontal-align: center; \" >\n                        <Label class=\"h3\" [text]=\"'Total = $'+ this.totalCost+ '+ tax &'\" color=\"black\" style=\"font-weight: bold;\"></Label>\n                        <Label class=\"h3\" text=\"Pickup Delivery Fee\" color=\"black\" style=\"font-weight: bold; padding-left: 5\"></Label>       \n                        <!-- <GridLayout columns=\"*\" rows=\"*,*\" >\n                                <StackLayout  col=0 row=0 style=\"vertical-align: center\" (tap)=\"onAgree()\">\n                                            <GridLayout columns=\"*,9*\" rows=\"*\"  (onTap)=\"onAgree()\">\n                                                    <StackLayout col=\"0\" row=\"0\" style=\"vertical-align: center\">\n                                                            <Label class=\"h3 fa\" text=\"&#xf14a;\" [color] = \"state ? 'green' : 'white'\" style=\"horizontal-align: center; font-weight: bold; border-width: 1; border-color: black; \"></Label>\n                                                    </StackLayout>\n                                                    <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\n                                                            <Label class=\"h3\" text=\"I agree to said terms chosen by creator of application\" textWrap=true color=\"black\" style=\" font-weight: bold; \"></Label>                                        \n                                                    </StackLayout>\n                                            </GridLayout>\n                                            <CheckBox #CB1 text=\"I agree to said terms chosen by creator of application\"  (tap)=\"onAgree()\" style=\" font-weight: bold; margin: 5\" checked=\"false\"></CheckBox>                                        \n                                </StackLayout>\n                                <StackLayout col=0 row=1 style=\"vertical-align: center; horizontal-align: center; \">\n                                        <Label class=\"h3\" [text]=\"'Total = $'+ this.totalCost+ '+ tax &'\" color=\"black\" style=\"font-weight: bold;\"></Label>\n                                        <Label class=\"h3\" text=\"Pickup Delivery Fee\" color=\"black\" style=\"font-weight: bold; padding-left: 5\"></Label>                                    \n                                </StackLayout>\n                        </GridLayout> -->\n                </StackLayout>\n           </GridLayout>\n        </StackLayout>\n        <StackLayout col=0 row=2 >\n                <GridLayout columns=\"*\" rows=\"5*,5*\" >\n                        <StackLayout col=0 row=0 >\n                                                       \n                        </StackLayout>\n                        <StackLayout col=0 row=1 >\n                                <GridLayout columns=\"*,*\" rows=\"*\" borderColor=\"#dadada\" borderWidth=\"2\" borderRadius=\"10\" backgroundColor=\"white\">\n                                        <StackLayout col=0 row=0  style=\" padding-top: 15%; border-right-width:2; border-color: #404040\">\n                                                <Label text=\"Cancel\" class=\"h2\" style=\" text-align: center;\" (tap)=\"close()\"></Label>                            \n                                        </StackLayout>\n                                        <StackLayout col=1 row=0  style=\"padding-top: 15%; \">\n                                                <Label text=\"Submit\" class=\"h2\" color=\"dodgerblue\" style=\" text-align: center;\" (tap)=\"submit()\" ></Label>                            \n                                        </StackLayout>\n                                    </GridLayout>\n                        </StackLayout>\n                    </GridLayout>\n        </StackLayout>\n    </GridLayout>"

/***/ }),

/***/ 572:
/*!***********************************************************!*\
  !*** ./servicecategory/servicecategory-routing.module.ts ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! nativescript-angular/router */ 75);
var servicecategory_component_1 = __webpack_require__(/*! ./servicecategory.component */ 494);
var routes = [
    { path: "", component: servicecategory_component_1.ServicecategoryComponent }
];
var ServicecategoryRoutingModule = (function () {
    function ServicecategoryRoutingModule() {
    }
    ServicecategoryRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], ServicecategoryRoutingModule);
    return ServicecategoryRoutingModule;
}());
exports.ServicecategoryRoutingModule = ServicecategoryRoutingModule;


/***/ }),

/***/ 573:
/*!*********************************************!*\
  !*** ./servicecategory/servicecategory.css ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 574:
/*!********************************************************!*\
  !*** ./servicecategory/servicecategory.component.html ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<GridLayout columns=\"*\" rows=\"*,7*,*,*\">\r\n        <StackLayout col=\"0\" row=\"0\" style=\"background-color: black\">\r\n                <GridLayout columns=\"*,8*,*\" rows=\"*\">\r\n                        <StackLayout col=\"0\" row=\"0\">\r\n                                <Label class=\"h2 fa\" text=\"&#xf053;\" (onTap)=\"onBack()\" style=\"horizontal-align: left; color: white; padding: 20 0 0 10 \"></Label>\r\n                        </StackLayout>\r\n                        <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\r\n                                <Label class=\"h2\" text=\"Service Categories\" style=\" color: white; text-align: center\"></Label>\r\n                        </StackLayout>\r\n                        <StackLayout col=\"2\" row=\"0\"></StackLayout>\r\n                </GridLayout>\r\n        </StackLayout>\r\n        <!-- <StackLayout col=\"0\" row=\"1\">\r\n                <ScrollView *ngFor=\"let item of vendorCategories; let i = index\" (onTap)=\"vendorCategoryTap($event, i, item)\" style=\"margin: 10\">\r\n                        <StackLayout  style=\"border-bottom-width:1; border-color:#606060; vertical-align: center\">\r\n                                <Label [text]=\"item?.name\" textWrap=\"true\" style=\"color: black; text-align: left; font-weight: bold; padding: 20; background-color: white\"></Label>\r\n                                <ScrollView *ngFor=\"let item of item.services; let i = index\" (onTap)=\"vendorCategoryTap($event, i, item)\" style=\"margin: 10\">\r\n                                                <StackLayout orientation=\"horizontal\" style=\"border-bottom-width:1; border-color:#606060; vertical-align: center\">\r\n                                                        <Label [text]=\"item?.name\" textWrap=\"true\" style=\"color: black; text-align: left; font-weight: bold; padding: 20; background-color: white\"></Label>\r\n                                                </StackLayout>\r\n                                        </ScrollView>\r\n                        </StackLayout>\r\n                </ScrollView>\r\n        </StackLayout> -->\r\n        <ListView col=\"0\" row=\"1\" [items]=\"items\" >\r\n                <ng-template let-item=\"item\" let-i=\"index\" let-odd=\"odd\" let-even=\"even\">\r\n                        <StackLayout style=\"border-bottom-width:1; border-color:#606060; vertical-align: center; margin: 10\">\r\n                                <Label [text]=\"item?.name +' '+'('+item.services.length+')'\" textWrap=\"true\" style=\"color: white; text-align: left; font-weight: bold; padding: 20; background-color: black\"></Label>\r\n                                <ScrollView [visibility]=\"isItemVisible ? 'visible' : 'collapsed'\" *ngFor=\"let item of item.services; let i = index\"  style=\"margin: 10\">\r\n                                        <GridLayout columns=\"6*,2*,2*\" rows=\"*\" style=\"margin: 0 10 10 0 \">\r\n                                                <StackLayout col=\"0\" row=\"0\">\r\n                                                        <Label [text]=\"item.name ? item.name : 'No Service'\" textWrap=\"true\"></Label>\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"1\" row=\"0\" style=\"margin: 5\">\r\n                                                        <Label [text]=\"'$'+item.base_price ? '$'+item.base_price : '0'\"></Label>\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"2\" row=\"0\">\r\n                                                        <Switch [checked]=\"item.state ? item.state : 'false'\" (checkedChange)=\"tapped($event, item, i)\"></Switch>\r\n                                                </StackLayout>\r\n                                        </GridLayout>\r\n                                </ScrollView>\r\n                        </StackLayout>\r\n                </ng-template>\r\n        </ListView>\r\n        <StackLayout col=\"0\" row=\"2\" (onTap)=\"proceedPickup()\" style=\"margin:10; background-color: dodgerblue; border-width: 1; border-radius: 50; vertical-align: center\">\r\n                <Label text=\"Proceed to Pickup\" style=\"padding: 10; text-align: center;\"></Label>\r\n        </StackLayout>\r\n        <StackLayout col=\"0\" row=\"3\" style=\"background-color: black\">\r\n                <GridLayout columns=\"*,8*,*\" rows=\"*\">\r\n                        <StackLayout col=\"0\" row=\"0\" style=\"vertical-align: center; margin-left: 10\">\r\n                                <Image src=\"res://cloud_icon\" style=\"horizontal-align: center\"></Image>\r\n                        </StackLayout>\r\n                        <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\r\n                                <Label class=\"h2\" text=\"Shyft Auto By Kloud DMS\" style=\" color: white; text-align: center;\"></Label>\r\n                        </StackLayout>\r\n                        <StackLayout col=\"2\" row=\"0\"></StackLayout>\r\n                </GridLayout>\r\n        </StackLayout>\r\n</GridLayout>\r\n\r\n<!-- \r\n<GridLayout columns=\"*\" rows=\"*,8*,*\">\r\n        <StackLayout col=\"0\" row=\"0\" style=\"background-color: black\">\r\n                <GridLayout columns=\"*,8*,*\" rows=\"*\">\r\n                        <StackLayout col=\"0\" row=\"0\">\r\n                                <Label class=\"h2 fa\" text=\"&#xf060;\" (onTap)=\"onBack()\" style=\"horizontal-align: left; color: white; padding: 20 0 0 10 \"></Label>\r\n                        </StackLayout>\r\n                        <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\r\n                                <Label class=\"h2\" text=\"Service Categories\" style=\" color: white; text-align: center\"></Label>\r\n                        </StackLayout>\r\n                        <StackLayout col=\"2\" row=\"0\"></StackLayout>\r\n                </GridLayout>\r\n        </StackLayout>\r\n        <StackLayout col=\"0\" row=\"1\">\r\n                <Accordion [items]=\"items\" headerTextBold=\"true\" headerTextColor=\"white\" headerColor=\"pink\" headerTextColor=\"blue\" allowMultiple=\"true\"\r\n                        selectedIndex=\"2\">\r\n\r\n                        <ng-template accordionHeaderTemplate let-item=\"item\" let-i=\"index\">\r\n                                <GridLayout backgroundColor=\"black\" columns=\"auto,*\">\r\n                                        <Label [text]=\"item.name\" style=\"color: white; padding: 10\"></Label>\r\n                                </GridLayout>\r\n                        </ng-template>\r\n\r\n                        <ng-template accordionItemTemplate let-item=\"item\" let-parent=\"parentIndex\" let-even=\"even\" let-child=\"childIndex\">\r\n                                <StackLayout style=\"padding: 10;\">\r\n                                        <GridLayout columns=\"6*,2*,2*\">\r\n                                                <StackLayout col=\"0\" row=\"0\">\r\n                                                        <Label [text]=\"item.name\" textWrap=\"true\"></Label>\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"1\" row=\"0\" style=\"margin: 5\">\r\n                                                        <Label [text]=\"'$'+item.base_price\"></Label>\r\n                                                </StackLayout>\r\n                                                <StackLayout col=\"2\" row=\"0\">\r\n                                                        <Switch [checked]=\"item.state\" (checkedChange)=\"tapped($event, item)\"></Switch>\r\n                                                </StackLayout>\r\n                                        </GridLayout>\r\n                                </StackLayout>\r\n                        </ng-template>\r\n                </Accordion>\r\n        </StackLayout>\r\n        <StackLayout col=\"0\" row=\"2\" (onTap)=\"proceedPickup()\" style=\"margin:10; background-color: dodgerblue; border-width: 1; border-radius: 50; vertical-align: center\">\r\n                <Label text=\"Proceed to Pickup\" style=\"padding: 10; text-align: center;\"></Label>\r\n        </StackLayout>\r\n\r\n</GridLayout> -->"

/***/ }),

/***/ 575:
/*!***************************************************************!*\
  !*** ../node_modules/nativescript-accordion/angular/index.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var element_registry_1 = __webpack_require__(/*! nativescript-angular/element-registry */ 29);
var observable_array_1 = __webpack_require__(/*! data/observable-array */ 36);
var observable_1 = __webpack_require__(/*! data/observable */ 22);
var lang_facade_1 = __webpack_require__(/*! nativescript-angular/lang-facade */ 41);
var NG_VIEW = "_ngViewRef";
var ITEMSLOADING = "itemsLoading";
var HEADERLOADING = "headerLoading";
var FOOTERLOADING = "footerLoading";
var STARTHEADERLOADING = "startHeaderLoading";
var STARTITEMLOADING = "startItemLoading";
var STARTFOOTERLOADING = "startFooterLoading";
function getItemViewRoot(viewRef, rootLocator) {
    if (rootLocator === void 0) { rootLocator = element_registry_1.getSingleViewRecursive; }
    return rootLocator(viewRef.rootNodes, 0);
}
exports.getItemViewRoot = getItemViewRoot;
element_registry_1.registerElement("Accordion", function () { return __webpack_require__(/*! ../ */ 576).Accordion; });
var AccordionHeaderDirective = (function () {
    function AccordionHeaderDirective(owner, templateRef) {
        this.owner = owner;
        this.templateRef = templateRef;
        owner.headerTemplate = templateRef;
    }
    return AccordionHeaderDirective;
}());
AccordionHeaderDirective = __decorate([
    core_1.Directive({
        selector: "[accordionHeaderTemplate]"
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return AccordionComponent; }))),
    __metadata("design:paramtypes", [AccordionComponent,
        core_1.TemplateRef])
], AccordionHeaderDirective);
exports.AccordionHeaderDirective = AccordionHeaderDirective;
var AccordionItemDirective = (function () {
    function AccordionItemDirective(owner, templateRef) {
        this.owner = owner;
        this.templateRef = templateRef;
        owner.itemTemplate = templateRef;
    }
    return AccordionItemDirective;
}());
AccordionItemDirective = __decorate([
    core_1.Directive({
        selector: "[accordionItemTemplate]"
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return AccordionComponent; }))),
    __metadata("design:paramtypes", [AccordionComponent,
        core_1.TemplateRef])
], AccordionItemDirective);
exports.AccordionItemDirective = AccordionItemDirective;
var AccordionFooterDirective = (function () {
    function AccordionFooterDirective(owner, templateRef) {
        this.owner = owner;
        this.templateRef = templateRef;
        owner.footerTemplate = templateRef;
    }
    return AccordionFooterDirective;
}());
AccordionFooterDirective = __decorate([
    core_1.Directive({
        selector: "[accordionFooterTemplate]"
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return AccordionComponent; }))),
    __metadata("design:paramtypes", [AccordionComponent,
        core_1.TemplateRef])
], AccordionFooterDirective);
exports.AccordionFooterDirective = AccordionFooterDirective;
var AccordionComponent = (function () {
    function AccordionComponent(el, _iterableDiffers, _cdr, loader) {
        this._iterableDiffers = _iterableDiffers;
        this._cdr = _cdr;
        this.loader = loader;
        this.accordion = el.nativeElement;
        this.accordion.on(HEADERLOADING, this.headerLoading, this);
        this.accordion.on(ITEMSLOADING, this.itemsLoading, this);
        this.accordion.on(FOOTERLOADING, this.footerLoading, this);
    }
    Object.defineProperty(AccordionComponent.prototype, "nativeElement", {
        get: function () {
            return this.accordion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            this._items = value;
            var needDiffer = true;
            if (value instanceof observable_array_1.ObservableArray) {
                needDiffer = false;
            }
            if (needDiffer && !this._differ && core_1.ɵisListLikeIterable(value)) {
                this._differ = this._iterableDiffers.find(this._items)
                    .create(this._cdr, function (_index, item) { return item; });
            }
            this.accordion.items = this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionComponent.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            this._selectedIndex = Number(value);
            if (this.viewInitialized) {
                this.accordion.selectedIndex = this._selectedIndex;
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionComponent.prototype.ngAfterViewInit = function () {
        this.viewInitialized = true;
        if (!lang_facade_1.isBlank(this._selectedIndex)) {
            this.accordion.selectedIndex = this._selectedIndex;
        }
    };
    AccordionComponent.prototype.headerLoading = function (args) {
        if (this.headerTemplate) {
            var data = this.accordion._getParentData(args.parentIndex);
            var viewRef = this.loader.createEmbeddedView(this.headerTemplate, new AccordionHeaderContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
            this.setupViewRefHeaderOrFooter(viewRef, data, args.parentIndex);
            this.detectChangesOnChild(viewRef, args.parentIndex);
        }
    };
    AccordionComponent.prototype.itemsLoading = function (args) {
        if (this.itemTemplate) {
            var data = observable_1.fromObject(this.accordion._getChildData(args.parentIndex, args.childIndex));
            var viewRef = this.loader.createEmbeddedView(this.itemTemplate, new AccordionItemContext(), args.childIndex);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
            this.setupViewRefItem(viewRef, data, args.parentIndex, args.childIndex);
            this.detectChangesOnChild(viewRef, args.parentIndex);
        }
    };
    AccordionComponent.prototype.footerLoading = function (args) {
        if (this.footerTemplate) {
            var data = this.accordion._getParentData(args.parentIndex);
            var viewRef = this.loader.createEmbeddedView(this.footerTemplate, new AccordionFooterContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
            this.setupViewRefHeaderOrFooter(viewRef, data, args.parentIndex);
            this.detectChangesOnChild(viewRef, args.parentIndex);
        }
    };
    AccordionComponent.prototype.setupViewRefHeaderOrFooter = function (viewRef, data, index) {
        if (lang_facade_1.isBlank(viewRef)) {
            return;
        }
        var context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.items = ((data && (typeof data.get === "function")) ? data.get("items") : data["items"]);
        context.index = index;
        context.even = (index % 2 === 0);
        context.odd = !context.even;
    };
    AccordionComponent.prototype.setupViewRefItem = function (viewRef, data, parentIndex, childIndex) {
        if (lang_facade_1.isBlank(viewRef)) {
            return;
        }
        var context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.index = childIndex;
        context.parentIndex = parentIndex;
        context.childIndex = childIndex;
        context.even = (childIndex % 2 === 0);
        context.odd = !context.even;
    };
    AccordionComponent.prototype.detectChangesOnChild = function (viewRef, index) {
        var childChangeDetector = viewRef;
        childChangeDetector.markForCheck();
        childChangeDetector.detectChanges();
    };
    AccordionComponent.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this._items);
            if (changes) {
                if (this.accordion) {
                    if (typeof this.accordion.refresh === "function") {
                        this.accordion.refresh();
                    }
                }
            }
        }
    };
    return AccordionComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AccordionComponent.prototype, "items", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Object])
], AccordionComponent.prototype, "selectedIndex", null);
AccordionComponent = __decorate([
    core_1.Component({
        selector: "Accordion",
        template: "",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.IterableDiffers,
        core_1.ChangeDetectorRef,
        core_1.ViewContainerRef])
], AccordionComponent);
exports.AccordionComponent = AccordionComponent;
var AccordionItemContext = (function () {
    function AccordionItemContext($implicit, item, parentIndex, childIndex, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.parentIndex = parentIndex;
        this.childIndex = childIndex;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
    return AccordionItemContext;
}());
exports.AccordionItemContext = AccordionItemContext;
var AccordionHeaderContext = (function () {
    function AccordionHeaderContext($implicit, item, items, parentindex, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.items = items;
        this.parentindex = parentindex;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
    return AccordionHeaderContext;
}());
exports.AccordionHeaderContext = AccordionHeaderContext;
var AccordionFooterContext = (function () {
    function AccordionFooterContext($implicit, item, items, parentindex, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.items = items;
        this.parentindex = parentindex;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
    return AccordionFooterContext;
}());
exports.AccordionFooterContext = AccordionFooterContext;
var AccordionModule = (function () {
    function AccordionModule() {
    }
    return AccordionModule;
}());
AccordionModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        declarations: [
            AccordionComponent,
            AccordionHeaderDirective,
            AccordionItemDirective,
            AccordionFooterDirective
        ],
        exports: [
            AccordionComponent,
            AccordionHeaderDirective,
            AccordionItemDirective,
            AccordionFooterDirective
        ]
    })
], AccordionModule);
exports.AccordionModule = AccordionModule;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 576:
/*!***********************************************************!*\
  !*** ../node_modules/nativescript-accordion/accordion.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./src/android/accordion */ 577));
//# sourceMappingURL=accordion.android.js.map

/***/ }),

/***/ 577:
/*!***********************************************************************!*\
  !*** ../node_modules/nativescript-accordion/src/android/accordion.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = __webpack_require__(/*! tns-core-modules/color */ 39);
var builder_1 = __webpack_require__(/*! tns-core-modules/ui/builder */ 52);
var types = __webpack_require__(/*! tns-core-modules/utils/types */ 13);
var utils = __webpack_require__(/*! tns-core-modules/utils/utils */ 10);
var common = __webpack_require__(/*! ../accordion.common */ 578);
var observable_1 = __webpack_require__(/*! tns-core-modules/data/observable */ 22);
var label_1 = __webpack_require__(/*! tns-core-modules/ui/label */ 40);
exports.ITEMSLOADING = "itemsLoading";
exports.HEADERLOADING = "headerLoading";
exports.FOOTERLOADING = "footerLoading";
exports.STARTHEADERLOADING = "startHeaderLoading";
exports.STARTITEMLOADING = "startItemLoading";
exports.STARTFOOTERLOADING = "startFooterLoading";
var NG_VIEW = "_ngViewRef";
global.moduleMerge(common, exports);
function notifyForItemAtIndex(owner, nativeView, view, eventName, parentIndex, childIndex) {
    var args = { eventName: eventName, object: owner, parentIndex: parentIndex, childIndex: childIndex, view: view, ios: undefined, android: nativeView };
    owner.notify(args);
    return args;
}
function notifyForHeaderOrFooterAtIndex(owner, nativeView, view, eventName, parentIndex) {
    var args = { eventName: eventName, object: owner, parentIndex: parentIndex, view: view, ios: undefined, android: nativeView };
    owner.notify(args);
    return args;
}
function notifyForHeaderOrFooterStartAtIndex(owner, eventName, parentIndex) {
    var args = { eventName: eventName, object: owner, parentIndex: parentIndex };
    owner.notify(args);
    return args;
}
function notifyForItemStartAtIndex(owner, eventName, parentIndex, childIndex) {
    var args = { eventName: eventName, object: owner, parentIndex: parentIndex, childIndex: childIndex };
    owner.notify(args);
    return args;
}
var Accordion = (function (_super) {
    __extends(Accordion, _super);
    function Accordion() {
        var _this = _super.call(this) || this;
        _this._previousGroup = -1;
        _this._views = [];
        _this.selectedIndexes = [];
        _this._itemsMap = new Map();
        _this._headerMap = new Map();
        _this._itemsMap = new Map();
        _this._expandedViews = new Map();
        return _this;
    }
    Accordion.prototype.headerTemplateUpdated = function (oldData, newData) {
    };
    Accordion.prototype.footerTemplateUpdated = function (oldData, newData) {
    };
    Accordion.prototype.templateUpdated = function (oldData, newData) {
    };
    Accordion.prototype.updateNativeItems = function (oldItems, newItems) {
        var _this = this;
        if (oldItems) {
            if (this._listAdapter) {
                this._listAdapter.notifyDataSetChanged();
            }
        }
        if (newItems) {
            if (Array.isArray(newItems)) {
                if (this._listAdapter) {
                    this._listAdapter.notifyDataSetChanged();
                }
            }
            else {
                if (newItems && newItems.on) {
                    newItems.on("change", function (args) {
                        if (_this._listAdapter) {
                            _this._listAdapter.notifyDataSetChanged();
                        }
                    });
                }
            }
        }
    };
    Object.defineProperty(Accordion.prototype, "android", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    Accordion.prototype.addToView = function (view) {
        this._addView(view);
    };
    Accordion.prototype.createNativeView = function () {
        var _this = this;
        this._android = new android.widget.ExpandableListView(utils.ad.getApplicationContext());
        var that = new WeakRef(this);
        if (this.separatorColor) {
            this._android.setDivider(new android.graphics.drawable.ColorDrawable(new color_1.Color(this.separatorColor).android));
            this._android.setDividerHeight(1);
        }
        this._android.setGroupIndicator(null);
        this._android.setOnGroupExpandListener(new android.widget.ExpandableListView.OnGroupExpandListener({
            onGroupExpand: function (groupPosition) {
                var owner = that.get();
                owner._expandedViews.set(groupPosition, true);
                owner.groupExpanded(groupPosition);
                if (!owner.allowMultiple) {
                    owner._selectedIndexUpdatedFromNative(groupPosition);
                    if ((owner._previousGroup != -1) && (groupPosition != owner._previousGroup)) {
                        owner.android.collapseGroup(owner._previousGroup);
                    }
                    owner._previousGroup = groupPosition;
                }
                owner.selectedIndexes.forEach(function (item, index, arr) {
                    if (item === groupPosition) {
                        owner.selectedIndexes.slice(index, 1);
                    }
                    if (index === arr.length) {
                        owner.selectedIndexes.push(groupPosition);
                    }
                });
            }
        }));
        this._android.setOnGroupCollapseListener(new android.widget.ExpandableListView.OnGroupCollapseListener({
            onGroupCollapse: function (groupPosition) {
                var owner = that.get();
                owner._expandedViews.set(groupPosition, false);
                var items = owner.selectedIndexes;
                owner.groupCollapsed(groupPosition);
                owner.selectedIndexes = owner.selectedIndexes.map(function (item) {
                    if (item != groupPosition) {
                        return item;
                    }
                });
            }
        }));
        this._listAdapter = new AccordionListAdapter(this);
        this._android.setAdapter(this._listAdapter);
        if (this.selectedIndexes) {
            this.selectedIndexes.forEach(function (item) {
                _this._android.expandGroup(item);
            });
        }
        return this._android;
    };
    Accordion.prototype.addItem = function (view) {
        this.items.push(view);
        this._addView(view);
        this._listAdapter.notifyDataSetChanged();
    };
    Accordion.prototype.refresh = function () {
        if (!this._android || !this._android.getExpandableListAdapter()) {
            return;
        }
        if (this._headerMap) {
            this._headerMap.forEach(function (view, id) {
                if (!(view.bindingContext instanceof observable_1.Observable)) {
                    view.bindingContext = null;
                }
            });
        }
        if (this._itemsMap) {
            this._itemsMap.forEach(function (view, id) {
                if (!(view.bindingContext instanceof observable_1.Observable)) {
                    view.bindingContext = null;
                }
            });
        }
        if (this._footerMap) {
            this._footerMap.forEach(function (view, id) {
                if (!(view.bindingContext instanceof observable_1.Observable)) {
                    view.bindingContext = null;
                }
            });
        }
        this._listAdapter.notifyDataSetChanged();
    };
    Accordion.prototype.updateNativeIndex = function (oldIndex, newIndex) {
        if (this._android) {
            if (newIndex >= 0) {
                this._android.expandGroup(newIndex);
            }
        }
    };
    Accordion.prototype._selectedIndexUpdatedFromNative = function (newIndex) {
        if (this.selectedIndex !== newIndex) {
            var old = this._previousGroup;
            common.selectedIndexProperty.nativeValueChange(this, newIndex);
        }
    };
    Accordion.prototype.groupExpanded = function (index) {
        this.notifyPropertyChange("groupExpanded", index);
    };
    Accordion.prototype.groupCollapsed = function (index) {
        this.notifyPropertyChange("groupCollapsed", index);
    };
    Accordion.prototype.expandItem = function (id) {
        if (id) {
            this._android.expandGroup(id);
        }
    };
    Accordion.prototype.isItemExpanded = function (id) {
        return this._android.isGroupExpanded(id);
    };
    return Accordion;
}(common.Accordion));
exports.Accordion = Accordion;
var AccordionListAdapter = (function (_super) {
    __extends(AccordionListAdapter, _super);
    function AccordionListAdapter(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    AccordionListAdapter.prototype.getChild = function (groupPosition, childPosition) {
        return null;
    };
    AccordionListAdapter.prototype.getGroup = function (groupPosition) {
        return null;
    };
    AccordionListAdapter.prototype.hasStableIds = function () {
        return true;
    };
    AccordionListAdapter.prototype.getGroupView = function (groupPosition, isExpanded, convertView, parent) {
        var owner = this.owner;
        var view = !types.isNullOrUndefined(owner.headerTemplate) ? builder_1.parse(owner.headerTemplate, this) : null;
        var _args = notifyForHeaderOrFooterAtIndex(owner, view ? view.nativeView : null, view, exports.HEADERLOADING, groupPosition);
        view = view || _args.view;
        if (view) {
            var data = owner._getParentData(groupPosition);
            view.bindingContext = observable_1.fromObject(data);
            if (!view.parent) {
                owner._addView(view);
            }
            owner._headerMap.set(groupPosition, view);
            return view.nativeView;
        }
        var header = new label_1.Label();
        header.text = owner._getParentData(groupPosition) ? owner._getParentData(groupPosition).headerText : "";
        if (owner.headerTextAlignment === "center") {
            header.nativeView.setTextAlignment(android.view.View.TEXT_ALIGNMENT_CENTER);
        }
        else if (owner.headerTextAlignment === "right") {
            header.android.setTextAlignment(android.view.View.TEXT_ALIGNMENT_VIEW_END);
        }
        else if (owner.headerTextAlignment === "left") {
            header.nativeView.setTextAlignment(android.view.View.TEXT_ALIGNMENT_VIEW_START);
        }
        if (owner.headerHeight) {
            header.nativeView.setHeight(owner.headerHeight);
        }
        if (owner.headerColor) {
            header.nativeView.setBackgroundColor(new color_1.Color(owner.headerColor).android);
        }
        if (owner.headerTextColor) {
            header.nativeView.setTextColor(new color_1.Color(owner.headerTextColor).android);
        }
        if (owner.headerTextSize) {
            header.nativeView.setTextSize(this.owner.headerTextSize);
        }
        owner._addView(header);
        owner._headerMap.set(groupPosition, header);
        return header;
    };
    AccordionListAdapter.prototype.getGroupCount = function () {
        return this.owner.items && this.owner.items.length ? this.owner.items.length : 0;
    };
    AccordionListAdapter.prototype.getGroupId = function (groupPosition) {
        return groupPosition;
    };
    AccordionListAdapter.prototype.getChildView = function (groupPosition, childPosition, isLastChild, convertView, parent) {
        var owner = this.owner;
        var prop = parseInt("" + (groupPosition + 1) + childPosition);
        var view = !types.isNullOrUndefined(owner.itemTemplate) ? builder_1.parse(owner.itemTemplate, this) : null;
        var _args = notifyForItemAtIndex(owner, view ? view.nativeView : null, view, exports.ITEMSLOADING, groupPosition, childPosition);
        view = view || _args.view;
        owner._itemsMap.set(prop, view);
        if (view) {
            var data = owner._getChildData(groupPosition, childPosition);
            view.bindingContext = observable_1.fromObject(data);
            if (!view.parent) {
                owner._addView(view);
            }
            return view.nativeView;
        }
        return null;
    };
    AccordionListAdapter.prototype.getChildId = function (groupPosition, childPosition) {
        return childPosition;
    };
    AccordionListAdapter.prototype.getChildrenCount = function (groupPosition) {
        var owner = this.owner;
        if (owner && owner.items && owner._getParentData(groupPosition)) {
            if (typeof owner._getParentData(groupPosition).get === "function") {
                return owner._getParentData(groupPosition).get('items').length;
            }
            else {
                return owner._getParentData(groupPosition)['items'].length;
            }
        }
        else {
            return 0;
        }
    };
    AccordionListAdapter.prototype.isChildSelectable = function (groupPosition, childPosition) {
        return true;
    };
    return AccordionListAdapter;
}(android.widget.BaseExpandableListAdapter));
exports.AccordionListAdapter = AccordionListAdapter;
//# sourceMappingURL=accordion.js.map

/***/ }),

/***/ 578:
/*!**********************************************************************!*\
  !*** ../node_modules/nativescript-accordion/src/accordion.common.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = __webpack_require__(/*! tns-core-modules/ui/core/view */ 0);
var view_2 = __webpack_require__(/*! tns-core-modules/ui/core/view */ 0);
var types = __webpack_require__(/*! utils/types */ 13);
var autoEffectiveRowHeight = -1;
var knownCollections;
(function (knownCollections) {
    knownCollections.items = "items";
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = "itemTemplate";
    knownTemplates.headerTemplate = "headerTemplate";
    knownTemplates.footerTemplate = "footerTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
var knownMultiTemplates;
(function (knownMultiTemplates) {
    knownMultiTemplates.itemTemplates = "itemTemplates";
})(knownMultiTemplates = exports.knownMultiTemplates || (exports.knownMultiTemplates = {}));
function onHeaderTemplateChanged(accordion, oldValue, newValue) {
    accordion.headerTemplateUpdated(oldValue, newValue);
}
function onItemTemplateChanged(accordion, oldValue, newValue) {
    accordion.templateUpdated(oldValue, newValue);
}
function onFooterTemplateChanged(accordion, oldValue, newValue) {
    accordion.footerTemplateUpdated(oldValue, newValue);
}
function onItemsChanged(accordion, oldValue, newValue) {
    accordion.updateNativeItems(oldValue, newValue);
}
function onSelectedIndexChanged(accordion, oldValue, newValue) {
    if (accordion && accordion.items && types.isNumber(newValue)) {
        accordion.updateNativeIndex(oldValue, newValue);
    }
}
var Accordion = (function (_super) {
    __extends(Accordion, _super);
    function Accordion() {
        var _this = _super.call(this) || this;
        _this._allowMultiple = false;
        _this._effectiveRowHeight = autoEffectiveRowHeight;
        return _this;
    }
    Accordion.prototype._getParentData = function (parentIndex) {
        var items = this.items;
        return items.getItem ? items.getItem(parentIndex) : items[parentIndex];
    };
    Accordion.prototype._getChildData = function (parentIndex, childIndex) {
        var items = this.items;
        return items.getItem ? items.getItem(parentIndex)['items'][childIndex] : items[parentIndex]['items'][childIndex];
    };
    Object.defineProperty(Accordion.prototype, "headerTextBold", {
        get: function () {
            return this.style.headerTextBold;
        },
        set: function (value) {
            this.style.headerTextBold = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "headerHeight", {
        get: function () {
            return this.style.headerHeight;
        },
        set: function (value) {
            this.style.headerHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "headerTextColor", {
        get: function () {
            return this.style.headerTextColor;
        },
        set: function (value) {
            this.style.headerTextColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "headerColor", {
        get: function () {
            return this.style.headerColor;
        },
        set: function (value) {
            this.style.headerColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "headerTextAlignment", {
        get: function () {
            return this.style.headerTextAlignment;
        },
        set: function (value) {
            this.style.headerTextAlignment = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "headerTextSize", {
        get: function () {
            return this.style.headerTextSize;
        },
        set: function (value) {
            this.style.headerTextSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "footerTextBold", {
        get: function () {
            return this.style.footerTextBold;
        },
        set: function (value) {
            this.style.footerTextBold = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "footerHeight", {
        get: function () {
            return this.style.footerHeight;
        },
        set: function (value) {
            this.style.footerHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "footerTextColor", {
        get: function () {
            return this.style.footerTextColor;
        },
        set: function (value) {
            this.style.footerTextColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "footerColor", {
        get: function () {
            return this.style.footerColor;
        },
        set: function (value) {
            this.style.footerColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "footerTextAlignment", {
        get: function () {
            return this.style.footerTextAlignment;
        },
        set: function (value) {
            this.style.footerTextAlignment = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "footerTextSize", {
        get: function () {
            return this.style.footerTextSize;
        },
        set: function (value) {
            this.style.footerTextSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "selectedIndexes", {
        get: function () {
            return this._selectedIndexes;
        },
        set: function (indexes) {
            this._selectedIndexes = indexes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "allowMultiple", {
        get: function () {
            return this._allowMultiple;
        },
        set: function (value) {
            this._allowMultiple = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "separatorColor", {
        get: function () {
            return this.style.separatorColor;
        },
        set: function (value) {
            this.style.separatorColor = value;
        },
        enumerable: true,
        configurable: true
    });
    return Accordion;
}(view_1.View));
Accordion.selectedIndexChangedEvent = "selectedIndexChanged";
exports.Accordion = Accordion;
exports.footerTextSizeProperty = new view_1.CssProperty({
    name: 'footerTextSize',
    cssName: 'footer-text-size',
    valueConverter: function (v) { return parseInt(v); }
});
exports.footerTextSizeProperty.register(view_1.Style);
exports.footerTextAlignmentProperty = new view_1.CssProperty({
    name: 'footerTextAlignment',
    cssName: 'footer-text-align'
});
exports.footerTextAlignmentProperty.register(view_1.Style);
exports.footerColorProperty = new view_1.CssProperty({
    name: 'footerColor',
    cssName: 'footer-color'
});
exports.footerColorProperty.register(view_1.Style);
exports.footerTextColorProperty = new view_1.CssProperty({
    name: 'footerTextColor',
    cssName: 'footer-text-color'
});
exports.footerTextColorProperty.register(view_1.Style);
exports.footerHeightProperty = new view_1.CssProperty({
    name: 'footerHeight',
    cssName: 'footer-height',
    valueConverter: function (v) { return parseInt(v); }
});
exports.footerHeightProperty.register(view_1.Style);
exports.footerTextBoldProperty = new view_1.CssProperty({
    name: 'footerTextBold',
    cssName: 'footer-text-bold',
    valueConverter: function (v) { return Boolean(v); }
});
exports.footerTextBoldProperty.register(view_1.Style);
exports.separatorColorProperty = new view_1.CssProperty({
    name: 'separatorColor',
    cssName: 'separator-color',
    valueConverter: function (v) { return String(v); }
});
exports.separatorColorProperty.register(view_1.Style);
exports.headerTextSizeProperty = new view_1.CssProperty({
    name: 'headerTextSize',
    cssName: 'header-text-size',
    valueConverter: function (v) { return parseInt(v); }
});
exports.headerTextSizeProperty.register(view_1.Style);
exports.headerTextAlignmentProperty = new view_1.CssProperty({
    name: 'headerTextAlignment',
    cssName: 'header-text-align'
});
exports.headerTextAlignmentProperty.register(view_1.Style);
exports.headerColorProperty = new view_1.CssProperty({
    name: 'headerColor',
    cssName: 'header-color'
});
exports.headerColorProperty.register(view_1.Style);
exports.headerTextColorProperty = new view_1.CssProperty({
    name: 'headerTextColor',
    cssName: 'header-text-color'
});
exports.headerTextColorProperty.register(view_1.Style);
exports.headerHeightProperty = new view_1.CssProperty({
    name: 'headerHeight',
    cssName: 'header-height',
    valueConverter: function (v) { return parseInt(v); }
});
exports.headerHeightProperty.register(view_1.Style);
exports.headerTextBoldProperty = new view_1.CssProperty({
    name: 'headerTextBold',
    cssName: 'header-text-bold',
    valueConverter: function (v) { return Boolean(v); }
});
exports.headerTextBoldProperty.register(view_1.Style);
exports.headerTemplateProperty = new view_2.Property({
    name: "headerTemplate",
    affectsLayout: true,
    valueChanged: onHeaderTemplateChanged
});
exports.headerTemplateProperty.register(Accordion);
exports.itemTemplateProperty = new view_2.Property({
    name: "itemTemplate",
    affectsLayout: true,
    valueChanged: onItemTemplateChanged
});
exports.itemTemplateProperty.register(Accordion);
exports.footerTemplateProperty = new view_2.Property({
    name: "footerTemplate",
    affectsLayout: true,
    valueChanged: onFooterTemplateChanged
});
exports.footerTemplateProperty.register(Accordion);
exports.itemsProperty = new view_2.Property({
    name: "items",
    affectsLayout: true,
    valueChanged: onItemsChanged
});
exports.itemsProperty.register(Accordion);
exports.selectedIndexProperty = new view_2.CoercibleProperty({
    name: "selectedIndex",
    defaultValue: -1,
    valueChanged: onSelectedIndexChanged,
    coerceValue: function (target, value) {
        var max = target.items ? target.items.length - 1 : 0;
        value = Math.min(value, max);
        value = Math.max(value, 0);
        return value;
    },
    valueConverter: function (v) { return parseInt(v); }
});
exports.selectedIndexProperty.register(Accordion);
//# sourceMappingURL=accordion.common.js.map

/***/ })

});