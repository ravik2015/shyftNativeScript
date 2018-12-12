webpackJsonp([3],{

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

/***/ 305:
/*!*********************************!*\
  !*** ./addcar/addcar.module.ts ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var nativescript_module_1 = __webpack_require__(/*! nativescript-angular/nativescript.module */ 165);
var forms_1 = __webpack_require__(/*! nativescript-angular/forms */ 172);
var addcar_routing_module_1 = __webpack_require__(/*! ./addcar-routing.module */ 518);
var addcar_component_1 = __webpack_require__(/*! ./addcar.component */ 480);
var makemodal_1 = __webpack_require__(/*! ./makemodal */ 481);
var modelmodal_1 = __webpack_require__(/*! ./modelmodal */ 482);
var AddcarModule = (function () {
    function AddcarModule() {
    }
    AddcarModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                addcar_routing_module_1.AddcarRoutingModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                addcar_component_1.AddcarComponent,
                makemodal_1.MakeModalComponent,
                modelmodal_1.ModelModalComponent
            ],
            entryComponents: [
                makemodal_1.MakeModalComponent,
                modelmodal_1.ModelModalComponent
            ],
            bootstrap: [
                addcar_component_1.AddcarComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AddcarModule);
    return AddcarModule;
}());
exports.AddcarModule = AddcarModule;


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

/***/ 454:
/*!***********************************************!*\
  !*** ../node_modules/jwt-decode/lib/index.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64_url_decode = __webpack_require__(/*! ./base64_url_decode */ 455);

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

module.exports = function (token,options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};

module.exports.InvalidTokenError = InvalidTokenError;


/***/ }),

/***/ 455:
/*!***********************************************************!*\
  !*** ../node_modules/jwt-decode/lib/base64_url_decode.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var atob = __webpack_require__(/*! ./atob */ 456);

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

module.exports = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};


/***/ }),

/***/ 456:
/*!**********************************************!*\
  !*** ../node_modules/jwt-decode/lib/atob.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;


/***/ }),

/***/ 470:
/*!***********************************!*\
  !*** ./addcar/addcar.services.ts ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var http_1 = __webpack_require__(/*! @angular/http */ 49);
__webpack_require__(/*! rxjs/add/operator/do */ 320);
__webpack_require__(/*! rxjs/add/operator/map */ 319);
var ApplicationSettings = __webpack_require__(/*! application-settings */ 318);
var AddcarService = (function () {
    function AddcarService(http) {
        this.http = http;
    }
    //-------------------- ADDCAR PUT Request -------------------------------//
    AddcarService.prototype.addcarPut = function (fleet, fleetID) {
        this.fleet = fleet;
        this.fleetID = fleetID;
        var addcarURL = "https://uat.futuredms.com/shyft-api/fleet/" + this.fleetID;
        console.log("Fleet Add Url is :  ", addcarURL, "body is :   ", JSON.stringify(this.fleet));
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        headers.append("Authorization", this.id_token);
        return this.http.put(addcarURL, fleet, { headers: headers });
    };
    //-------------------- getPresignUrl GET Request -------------------------------//
    AddcarService.prototype.presignUrl = function (imageID) {
        var headers = this.presignUrlHeader();
        var imageKey = imageID;
        var requestUrl = 'https://igzcbks18i.execute-api.us-east-1.amazonaws.com/production?url_prefix=vehicle/user/' + imageKey;
        console.log("request url is -->", requestUrl);
        console.log("Headers -->", JSON.stringify(headers));
        return this.http.get(requestUrl, { headers: headers })
            .map(function (res) {
            console.log("Response presignUrl is  ------> ", res.json());
            return res.json();
        });
    };
    AddcarService.prototype.presignUrlHeader = function () {
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        headers.append("Authorization", this.id_token);
        return headers;
    };
    AddcarService.prototype.makeGet = function () {
        var url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json";
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    AddcarService.prototype.getModels = function (makeid) {
        var url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/" + makeid + "?format=json";
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    AddcarService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AddcarService);
    return AddcarService;
}());
exports.AddcarService = AddcarService;


/***/ }),

/***/ 480:
/*!************************************!*\
  !*** ./addcar/addcar.component.ts ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! nativescript-angular/router */ 75);
var page_1 = __webpack_require__(/*! tns-core-modules/ui/page */ 20);
var nativescript_background_http_1 = __webpack_require__(/*! nativescript-background-http */ 519);
var addcar_services_1 = __webpack_require__(/*! ./addcar.services */ 470);
var dialogs_1 = __webpack_require__(/*! nativescript-angular/directives/dialogs */ 166);
var makemodal_1 = __webpack_require__(/*! ./makemodal */ 481);
var modelmodal_1 = __webpack_require__(/*! ./modelmodal */ 482);
var angular2_uuid_1 = __webpack_require__(/*! angular2-uuid */ 325);
var nativescript_loading_indicator_1 = __webpack_require__(/*! nativescript-loading-indicator */ 524);
var platformModule = __webpack_require__(/*! platform */ 7);
var imageSource = __webpack_require__(/*! image-source */ 42);
var fs = __webpack_require__(/*! file-system */ 6);
var permissions = __webpack_require__(/*! nativescript-permissions */ 327);
var http = __webpack_require__(/*! http */ 83);
var jwt_decode = __webpack_require__(/*! jwt-decode */ 454);
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var AddcarComponent = (function () {
    function AddcarComponent(routerExtensions, addcarService, _page, _changeDetectionRef, modal, vcRef) {
        this.routerExtensions = routerExtensions;
        this.addcarService = addcarService;
        this._page = _page;
        this._changeDetectionRef = _changeDetectionRef;
        this.modal = modal;
        this.vcRef = vcRef;
        this.fleetID = angular2_uuid_1.UUID.UUID();
        this.imageID = angular2_uuid_1.UUID.UUID();
        this.imageName = "Logo";
        this.uploadState = false;
        this.buttonState = true;
        this.fleet = {
            "id": this.fleetID,
            "make": "",
            "miles": "",
            "status": "Customer",
            "vin": "",
            "model": "",
            "year": "",
            "image": ""
        };
    }
    AddcarComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        this.modelsdata = [];
    };
    AddcarComponent.prototype.makes = function () {
        var _this = this;
        var options = {
            context: {},
            height: 100,
            fullscreen: true,
            viewContainerRef: this.vcRef,
        };
        this.modal.showModal(makemodal_1.MakeModalComponent, options).then(function (res) {
            console.log("Resonse  is : ", res);
            _this.fleet.make = res.Make_Name;
            _this.getModels(res.Make_ID);
        });
    };
    AddcarComponent.prototype.getModels = function (makeid) {
        var _this = this;
        this.addcarService.getModels(makeid)
            .subscribe(function (result) {
            console.log("getModels data", JSON.stringify(result));
            result.Results.map(function (item) {
                _this.modelsdata.push(item);
            });
        }, function (error) {
            console.log("getModels Error : ", error);
        });
    };
    AddcarComponent.prototype.models = function () {
        var _this = this;
        var options = {
            context: { data: this.modelsdata },
            height: 100,
            fullscreen: true,
            viewContainerRef: this.vcRef,
        };
        this.modal.showModal(modelmodal_1.ModelModalComponent, options).then(function (res) {
            console.log("Resonse  is : ", res);
            _this.fleet.model = res.Model_Name;
        });
    };
    AddcarComponent.prototype.submit = function () {
        if (this.fleet.make === "") {
            alert("Vehicle Make is Mandatory ");
        }
        else if (this.fleet.model === "") {
            alert("Vehicle Model is Mandatory ");
        }
        else if (this.fleet.year === "") {
            alert("Vehicle Year is Mandatory ");
        }
        else {
            loader.show();
            this.putAddcar();
        }
    };
    AddcarComponent.prototype.putAddcar = function () {
        var _this = this;
        this.addcarService.addcarPut(this.fleet, this.fleetID)
            .subscribe(function (result) {
            console.log("Add Car Success  : ", (JSON.stringify(result)));
            loader.hide();
            _this.routerExtensions.navigate(["/carlist"], { clearHistory: true });
        }, function (error) {
            console.log("Add Car Error : ", error);
            loader.hide();
            _this.routerExtensions.navigate(["/carlist"], { clearHistory: true });
        });
    };
    AddcarComponent.prototype.onBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    // public imageUpload($event){
    //     this.getPresignUrl()
    //         let context = imagepicker.create({
    //             mode: "single"
    //         });
    //         this.startSelection(context);
    // }
    // startSelection(context) {
    //         let _that = this;
    //         context
    //         .authorize()
    //         .then(() => {
    //             return context.present();
    //         })
    //         .then((selection) => {
    //             console.log("Selection done:");
    //             selection.forEach((selected) => {
    //             selected.getImage().then( (imagesource) => {
    //                 var localPath = null;
    //                 if (platformModule.device.os === "Android") {
    //                     this.fileURL = selected.android;
    //                 } else {
    //                     // selected_item.ios for iOS is PHAsset and not path - so we are creating own path
    //                     let folder = fs.knownFolders.documents();
    //                     let path = fs.path.join(folder.path, "Test.png");
    //                     let saved = imagesource.saveToFile(path, "png");
    //                     this.fileURL = path;
    //                 }
    //                 console.log("This file uri : ", this.fileURL)
    //                 this.uploadState = true;
    //             })
    //         });
    //         _that._changeDetectionRef.detectChanges();
    //         }).catch(function (e) {
    //             console.log(e);
    //         });
    // }
    // getPresignUrl() {
    //         this.addcarService.presignUrl(this.imageID)
    //         .subscribe((result) => {
    //                 console.log("Presign Url Result", result.url)
    //                 this.awsUrl = result.url;
    //                 this.uploadState=true;
    //         }, (error) => {
    //             console.log("Presign Url Get Error : ", error)
    //         });
    // }
    AddcarComponent.prototype.upload = function () {
        var _this = this;
        loader.show();
        this.buttonState = false;
        this.newsession = nativescript_background_http_1.session("image-upload");
        this.request = {
            url: this.awsUrl,
            method: "PUT",
            headers: {
                "Content-Type": 'image/jpeg',
                "File-Name": this.imageName
            },
            description: "{ 'uploading': " + this.imageName + " }"
        };
        this.task = this.newsession.uploadFile(this.fileURL, this.request);
        this.task.on("progress", function (e) {
            console.log('current bytes : ', e.currentBytes, 'total bytes : ', e.totalBytes);
        });
        this.task.on("error", this.logEvent);
        this.task.on("complete", function (e) {
            _this.logEvent(e);
            _this.putAddcar();
            console.log("Upload Complete :  : ", "fleet id : ", _this.fleetID, "image id: ", _this.imageID);
        });
    };
    AddcarComponent.prototype.logEvent = function (e) {
        switch (e.eventName) {
            case "complete":
                console.log("Upload Complete");
                break;
            case "error":
                alert("Upload Error :" + JSON.stringify(e));
                console.log("Upload Error : " + JSON.stringify(e));
                break;
            default:
                break;
        }
    };
    AddcarComponent = __decorate([
        core_1.Component({
            selector: "Addcar",
            /*duleId: module.i*/
            styles: [__webpack_require__(/*! ./addcar.css */ 526)],
            template: __webpack_require__(/*! ./addcar.component.html */ 527),
            providers: [addcar_services_1.AddcarService]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, addcar_services_1.AddcarService, page_1.Page, core_1.ChangeDetectorRef, dialogs_1.ModalDialogService, core_1.ViewContainerRef])
    ], AddcarComponent);
    return AddcarComponent;
}());
exports.AddcarComponent = AddcarComponent;


/***/ }),

/***/ 481:
/*!*****************************!*\
  !*** ./addcar/makemodal.ts ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var dialogs_1 = __webpack_require__(/*! nativescript-angular/directives/dialogs */ 166);
var page_1 = __webpack_require__(/*! ui/page */ 20);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var addcar_services_1 = __webpack_require__(/*! ./addcar.services */ 470);
var elementRegistryModule = __webpack_require__(/*! nativescript-angular/element-registry */ 29);
elementRegistryModule.registerElement("FilterSelect", function () { return __webpack_require__(/*! nativescript-filter-select */ 520).FilterSelect; });
var MakeModalComponent = (function () {
    function MakeModalComponent(params, _page, addcarService, router, route) {
        this.params = params;
        this._page = _page;
        this.addcarService = addcarService;
        this.router = router;
        this.route = route;
        this.busy = true;
        this.getMakes();
        this.makedata = [];
    }
    MakeModalComponent.prototype.getMakes = function () {
        var _this = this;
        this.addcarService.makeGet()
            .subscribe(function (result) {
            console.log("Got Makes data");
            result.Results.map(function (item) {
                _this.makedata.push(item);
            });
            _this.busy = false;
        }, function (error) {
            console.log("getMakes Error : ", error);
        });
    };
    MakeModalComponent.prototype.ngOnInit = function () {
    };
    MakeModalComponent.prototype.onMakeTap = function (args) {
        var tappedView = args.view, tappedVehicle = tappedView.bindingContext;
        console.log("Selected Make -> " + args.index + " . " + JSON.stringify(tappedVehicle));
        this.close(tappedVehicle);
    };
    MakeModalComponent.prototype.close = function (res) {
        this.params.closeCallback(res);
    };
    MakeModalComponent = __decorate([
        core_1.Component({
            selector: "my-makemodal",
            template: __webpack_require__(/*! ./makemodal.html */ 522),
            providers: [addcar_services_1.AddcarService]
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, page_1.Page, addcar_services_1.AddcarService, router_1.Router, router_1.ActivatedRoute])
    ], MakeModalComponent);
    return MakeModalComponent;
}());
exports.MakeModalComponent = MakeModalComponent;


/***/ }),

/***/ 482:
/*!******************************!*\
  !*** ./addcar/modelmodal.ts ***!
  \******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var dialogs_1 = __webpack_require__(/*! nativescript-angular/directives/dialogs */ 166);
var page_1 = __webpack_require__(/*! ui/page */ 20);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var addcar_services_1 = __webpack_require__(/*! ./addcar.services */ 470);
var ModelModalComponent = (function () {
    function ModelModalComponent(params, _page, addcarService, router, route) {
        this.params = params;
        this._page = _page;
        this.addcarService = addcarService;
        this.router = router;
        this.route = route;
        this.busy = true;
        this.modelData = [];
        this.modelData = params.context.data;
    }
    ModelModalComponent.prototype.ngOnInit = function () {
    };
    ModelModalComponent.prototype.onModelTap = function (args) {
        var tappedView = args.view, tappedModel = tappedView.bindingContext;
        console.log("Selected Model :" + args.index + " . " + JSON.stringify(tappedModel));
        this.close(tappedModel);
    };
    ModelModalComponent.prototype.close = function (res) {
        this.params.closeCallback(res);
    };
    ModelModalComponent = __decorate([
        core_1.Component({
            selector: "my-modelmodal",
            template: __webpack_require__(/*! ./modelmodal.html */ 523),
            providers: [addcar_services_1.AddcarService]
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, page_1.Page, addcar_services_1.AddcarService, router_1.Router, router_1.ActivatedRoute])
    ], ModelModalComponent);
    return ModelModalComponent;
}());
exports.ModelModalComponent = ModelModalComponent;


/***/ }),

/***/ 518:
/*!*****************************************!*\
  !*** ./addcar/addcar-routing.module.ts ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! nativescript-angular/router */ 75);
var addcar_component_1 = __webpack_require__(/*! ./addcar.component */ 480);
var routes = [
    { path: "", component: addcar_component_1.AddcarComponent }
];
var AddcarRoutingModule = (function () {
    function AddcarRoutingModule() {
    }
    AddcarRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AddcarRoutingModule);
    return AddcarRoutingModule;
}());
exports.AddcarRoutingModule = AddcarRoutingModule;


/***/ }),

/***/ 519:
/*!***********************************************************************!*\
  !*** ../node_modules/nativescript-background-http/background-http.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var application = __webpack_require__(/*! application */ 5);
var observable_1 = __webpack_require__(/*! data/observable */ 22);
var utils_1 = __webpack_require__(/*! utils/utils */ 10);
var fileSystemModule = __webpack_require__(/*! file-system */ 6);
net.gotev.uploadservice.UploadService.NAMESPACE = application.android.packageName;
var ProgressReceiver;
function initializeProgressReceiver() {
    if (ProgressReceiver) {
        return;
    }
    var ProgressReceiverImpl = net.gotev.uploadservice.UploadServiceBroadcastReceiver.extend({
        onProgress: function (context, uploadInfo) {
            var uploadId = uploadInfo.getUploadId();
            var task = Task.fromId(uploadId);
            var totalBytes = uploadInfo.getTotalBytes();
            var currentBytes = uploadInfo.getUploadedBytes();
            task.setTotalUpload(totalBytes);
            task.setUpload(currentBytes);
            task.setStatus("uploading");
            task.notify({ eventName: "progress", object: task, currentBytes: currentBytes, totalBytes: totalBytes });
        },
        onCancelled: function (context, uploadInfo) {
            var uploadId = uploadInfo.getUploadId();
            var task = Task.fromId(uploadId);
            task.setStatus("cancelled");
            task.notify({ eventName: "cancelled", object: task });
        },
        onError: function (context, uploadInfo, error) {
            var uploadId = uploadInfo.getUploadId();
            var task = Task.fromId(uploadId);
            task.setStatus("error");
            task.notify({ eventName: "error", object: task, error: error });
        },
        onCompleted: function (context, uploadInfo, serverResponse) {
            var uploadId = uploadInfo.getUploadId();
            var task = Task.fromId(uploadId);
            var totalUpload = uploadInfo.getTotalBytes();
            if (!totalUpload || !isFinite(totalUpload) || totalUpload <= 0) {
                totalUpload = 1;
            }
            task.setUpload(totalUpload);
            task.setTotalUpload(totalUpload);
            task.setStatus("complete");
            task.notify({ eventName: "progress", object: task, currentBytes: totalUpload, totalBytes: totalUpload });
            task.notify({ eventName: "responded", object: task, data: serverResponse.getBodyAsString() });
            task.notify({ eventName: "complete", object: task, response: serverResponse });
        }
    });
    ProgressReceiver = ProgressReceiverImpl;
}
var receiver;
function session(id) {
    if (!receiver) {
        var context = utils_1.ad.getApplicationContext();
        initializeProgressReceiver();
        receiver = new ProgressReceiver();
        receiver.register(context);
    }
    return new Session(id);
}
exports.session = session;
var ObservableBase = (function (_super) {
    __extends(ObservableBase, _super);
    function ObservableBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObservableBase.prototype.notifyPropertyChanged = function (propertyName, value) {
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: propertyName, value: value });
    };
    return ObservableBase;
}(observable_1.Observable));
var Session = (function () {
    function Session(id) {
        this._id = id;
    }
    Session.prototype.uploadFile = function (fileUri, options) {
        return Task.create(this, fileUri, options);
    };
    Session.prototype.multipartUpload = function (params, options) {
        return Task.createMultiPart(this, params, options);
    };
    Object.defineProperty(Session.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return Session;
}());
var Task = (function (_super) {
    __extends(Task, _super);
    function Task() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Task.create = function (session, file, options) {
        var task = new Task();
        task._session = session;
        task._id = session.id + "{" + ++Task.taskCount + "}";
        var context = application.android.context;
        var request = new net.gotev.uploadservice.BinaryUploadRequest(context, task._id, options.url);
        request.setFileToUpload(file);
        var displayNotificationProgress = typeof options.androidDisplayNotificationProgress === "boolean" ? options.androidDisplayNotificationProgress : true;
        if (displayNotificationProgress) {
            request.setNotificationConfig(new net.gotev.uploadservice.UploadNotificationConfig());
        }
        var autoDeleteAfterUpload = typeof options.androidAutoDeleteAfterUpload === "boolean" ? options.androidAutoDeleteAfterUpload : false;
        if (autoDeleteAfterUpload) {
            request.setAutoDeleteFilesAfterSuccessfulUpload(true);
        }
        var headers = options.headers;
        if (headers) {
            for (var header in headers) {
                var value = headers[header];
                if (value !== null && value !== void 0) {
                    request.addHeader(header, value.toString());
                }
            }
        }
        task.setDescription(options.description);
        request.setMethod(options.method ? options.method : "GET");
        task.setUpload(0);
        task.setTotalUpload(1);
        task.setStatus("pending");
        request.startUpload();
        Task.cache[task._id] = task;
        return task;
    };
    Task.createMultiPart = function (session, params, options) {
        var task = new Task();
        task._session = session;
        task._id = session.id + "{" + (++Task.taskCount) + "}";
        var context = application.android.context;
        var request = new net.gotev.uploadservice.MultipartUploadRequest(context, task._id, options.url);
        for (var i = 0; i < params.length; i++) {
            var curParam = params[i];
            if (typeof curParam.name === 'undefined') {
                throw new Error("You must have a `name` value");
            }
            if (curParam.filename) {
                var fileName = curParam.filename;
                if (fileName.startsWith("~/")) {
                    fileName = fileName.replace("~/", fileSystemModule.knownFolders.currentApp().path + "/");
                }
                var destFileName = curParam.destFilename || fileName.substring(fileName.lastIndexOf('/') + 1, fileName.length);
                request.addFileToUpload(fileName, curParam.name, destFileName, curParam.mimeType);
            }
            else {
                request.addParameter(params[i].name, params[i].value);
            }
        }
        var utf8 = options.utf8;
        if (utf8) {
            request.setUtf8Charset();
        }
        var displayNotificationProgress = typeof options.androidDisplayNotificationProgress === "boolean" ? options.androidDisplayNotificationProgress : true;
        if (displayNotificationProgress) {
            request.setNotificationConfig(new net.gotev.uploadservice.UploadNotificationConfig());
        }
        var headers = options.headers;
        if (headers) {
            for (var header in headers) {
                var value = headers[header];
                if (value !== null && value !== void 0) {
                    request.addHeader(header, value.toString());
                }
            }
        }
        task.setDescription(options.description);
        request.setMethod(options.method ? options.method : "GET");
        task.setUpload(0);
        task.setTotalUpload(1);
        task.setStatus("pending");
        request.startUpload();
        Task.cache[task._id] = task;
        return task;
    };
    Task.fromId = function (id) {
        return Task.cache[id];
    };
    Object.defineProperty(Task.prototype, "upload", {
        get: function () {
            return this._upload;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "totalUpload", {
        get: function () {
            return this._totalUpload;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "session", {
        get: function () {
            return this._session;
        },
        enumerable: true,
        configurable: true
    });
    Task.prototype.setTotalUpload = function (value) {
        this._totalUpload = value;
        this.notifyPropertyChanged("totalUpload", value);
    };
    Task.prototype.setUpload = function (value) {
        this._upload = value;
        this.notifyPropertyChanged("upload", value);
    };
    Task.prototype.setStatus = function (value) {
        this._status = value;
        this.notifyPropertyChanged("status", value);
    };
    Task.prototype.setDescription = function (value) {
        this._description = value;
        this.notifyPropertyChanged("description", value);
    };
    Task.prototype.cancel = function () {
        net.gotev.uploadservice.UploadService.stopUpload(this._id);
    };
    Task.taskCount = 0;
    Task.cache = {};
    return Task;
}(ObservableBase));


/***/ }),

/***/ 520:
/*!*******************************************************************!*\
  !*** ../node_modules/nativescript-filter-select/filter-select.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var filter_select_common_1 = __webpack_require__(/*! ./filter-select.common */ 521);
var FilterSelect = (function (_super) {
    __extends(FilterSelect, _super);
    function FilterSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FilterSelect;
}(filter_select_common_1.Common));
exports.FilterSelect = FilterSelect;
//# sourceMappingURL=filter-select.android.js.map

/***/ }),

/***/ 521:
/*!**************************************************************************!*\
  !*** ../node_modules/nativescript-filter-select/filter-select.common.js ***!
  \**************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = __webpack_require__(/*! tns-core-modules/data/observable */ 22);
var grid_layout_1 = __webpack_require__(/*! tns-core-modules/ui/layouts/grid-layout */ 86);
var stack_layout_1 = __webpack_require__(/*! tns-core-modules/ui/layouts/stack-layout */ 53);
var flexbox_layout_1 = __webpack_require__(/*! tns-core-modules/ui/layouts/flexbox-layout */ 183);
var observable_array_1 = __webpack_require__(/*! tns-core-modules/data/observable-array */ 36);
var label_1 = __webpack_require__(/*! tns-core-modules/ui/label */ 40);
var button_1 = __webpack_require__(/*! tns-core-modules/ui/button */ 89);
var search_bar_1 = __webpack_require__(/*! tns-core-modules/ui/search-bar */ 182);
var grid_layout_2 = __webpack_require__(/*! tns-core-modules/ui/layouts/grid-layout */ 86);
var list_view_1 = __webpack_require__(/*! tns-core-modules/ui/list-view */ 181);
var page_1 = __webpack_require__(/*! tns-core-modules/ui/page */ 20);
var frame = __webpack_require__(/*! tns-core-modules/ui/frame */ 9);
var platform_1 = __webpack_require__(/*! tns-core-modules/platform */ 7);
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

/***/ }),

/***/ 522:
/*!*******************************!*\
  !*** ./addcar/makemodal.html ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<GridLayout columns=\"*\" rows=\"*,9*\">\n                <StackLayout col=\"0\" row=\"0\" style=\"background-color: black\" >\n                    <GridLayout columns=\"2.5*,5*,2.5*\" rows=\"*\">\n                                    <StackLayout col=\"0\" row=\"0\">\n                                             <Label class=\"h2\" text=\"Close\" (onTap)=\"close()\" style=\"horizontal-align: left; color: white; padding: 20 0 10 20\"></Label>     \n                                    </StackLayout>\n                                    <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\n                                            <Label class=\"h2\" text=\"Makes\"  style=\" color: white; text-align: center\"></Label>                                                                                                                                                                             \n                                    </StackLayout>\n                                    <StackLayout col=\"2\" row=\"0\">\n                                               \n                                    </StackLayout>                                        \n                    </GridLayout>                                        \n                </StackLayout> \n                        <StackLayout col=\"0\" row=\"1\">\n                                <ListView  [visibility]=\"!this.busy ? 'visible' : 'collapsed'\" [items]=\"makedata\" (itemTap)=\"onMakeTap($event)\">\n                                        <ng-template tkListItemTemplate let-item=\"item\">\n                                        <StackLayout style=\"border-width: 1; border-color: #dadada\">\n                                                <Label [text]=\"item.Make_Name\" style=\"font-weight: bold; padding: 20; text-align: center\"></Label>\n                                        </StackLayout>\n                                        </ng-template>\n                                </ListView>\n                        </StackLayout>\n                <ActivityIndicator column=0 row=1   [busy]=\"busy\"  class=\"activity-indicator\"></ActivityIndicator>\n            </GridLayout>\n            \n            "

/***/ }),

/***/ 523:
/*!********************************!*\
  !*** ./addcar/modelmodal.html ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<GridLayout columns=\"*\" rows=\"*,9*\">\n        <StackLayout col=\"0\" row=\"0\" style=\"background-color: black\" >\n            <GridLayout columns=\"2*,6*,2*\" rows=\"*\">\n                            <StackLayout col=\"0\" row=\"0\">\n                                     <Label class=\"h2\" text=\"Close\" (onTap)=\"close()\" style=\"horizontal-align: left; color: white; padding: 20 0 10 20\"></Label>     \n                            </StackLayout>\n                            <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\n                                    <Label class=\"h2\" text=\"Models\"  style=\" color: white; text-align: center\"></Label>                                                                                                                                                                             \n                            </StackLayout>\n                            <StackLayout col=\"2\" row=\"0\"></StackLayout>                                        \n            </GridLayout>                                        \n        </StackLayout> \n                <ListView col=\"0\" row=\"1\" [items]=\"modelData\" (itemTap)=\"onModelTap($event)\">\n                        <ng-template tkListItemTemplate let-item=\"item\">\n                            <StackLayout style=\"border-width: 1; border-color: #dadada\">\n                                    <Label [text]=\"item.Model_Name\" style=\"font-weight: bold; padding: 20; text-align: center\"></Label>\n                            </StackLayout>\n                        </ng-template>\n                </ListView>\n    </GridLayout>\n    \n    "

/***/ }),

/***/ 524:
/*!***************************************************************************!*\
  !*** ../node_modules/nativescript-loading-indicator/loading-indicator.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Interfaces
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * LoadingIndicator
 * Uses: http://developer.android.com/intl/zh-tw/reference/android/app/ProgressDialog.html
 */
__export(__webpack_require__(/*! ./src/android/progress-dialog */ 525));


/***/ }),

/***/ 525:
/*!*************************************************************************************!*\
  !*** ../node_modules/nativescript-loading-indicator/src/android/progress-dialog.js ***!
  \*************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var application = __webpack_require__(/*! tns-core-modules/application */ 5);
var LoadingIndicator = /** @class */ (function () {
    function LoadingIndicator() {
    }
    LoadingIndicator.prototype.show = function (options) {
        var context = this._getContext();
        if (context) {
            if (typeof options === 'undefined')
                options = {};
            if (typeof this._progressDialog === 'undefined') {
                // Create
                var indeterminate = true;
                var cancelable = false;
                var cancelListener = null;
                if (options.android) {
                    if (options.android.indeterminate !== undefined)
                        indeterminate = options.android.indeterminate;
                    if (options.android.cancelable !== undefined)
                        cancelable = options.android.cancelable;
                    if (options.android.cancelListener && typeof options.android.cancelListener === 'function') {
                        cancelListener = this.createOnCancelListener(options.android.cancelListener);
                    }
                }
                this._progressDialog = android.app.ProgressDialog.show(context, "", options.message || "Loading", indeterminate, cancelable, cancelListener);
            }
            else if (this._progressDialog) {
                // options
                if (options.message && this._progressDialog.setMesssage)
                    this._progressDialog.setMesssage(options.message);
                if (options.progress)
                    this._progressDialog.setProgress(options.progress);
                // android specific
                if (options.android) {
                    if (options.android.indeterminate)
                        this._progressDialog.setIndeterminate(true);
                    if (options.android.max)
                        this._progressDialog.setMax(options.android.max);
                    if (options.android.progressNumberFormat)
                        this._progressDialog.setProgressNumberFormat(options.android.progressNumberFormat);
                    if (options.android.progressPercentFormat)
                        this._progressDialog.setProgressPercentFormat(options.android.progressPercentFormat);
                    if (options.android.progressStyle)
                        this._progressDialog.setProgressStyle(options.android.progressStyle);
                    if (options.android.secondaryProgress)
                        this._progressDialog.setSecondaryProgress(options.android.secondaryProgress);
                    if (options.android.cancelListener && typeof options.android.cancelListener === 'function') {
                        this._progressDialog.setOnCancelListener(this.createOnCancelListener(options.android.cancelListener));
                    }
                }
            }
            return this._progressDialog;
        }
    };
    LoadingIndicator.prototype.createOnCancelListener = function (cancelListener) {
        return new android.content.DialogInterface.OnCancelListener({
            onCancel: function (dialog) { return cancelListener(dialog); }
        });
    };
    LoadingIndicator.prototype.hide = function () {
        if (typeof this._progressDialog !== 'undefined') {
            this._progressDialog.hide();
            this._progressDialog.dismiss();
        }
        this._progressDialog = undefined;
    };
    LoadingIndicator.prototype._getContext = function () {
        return application.android.foregroundActivity;
    };
    return LoadingIndicator;
}());
exports.LoadingIndicator = LoadingIndicator;


/***/ }),

/***/ 526:
/*!***************************!*\
  !*** ./addcar/addcar.css ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 527:
/*!**************************************!*\
  !*** ./addcar/addcar.component.html ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<GridLayout columns=\"*\" rows=\"*,9*\">\r\n    <StackLayout col=\"0\" row=\"0\" style=\"background-color: black\">\r\n        <GridLayout columns=\"*,8*,*\" rows=\"*\">\r\n            <StackLayout col=\"0\" row=\"0\">\r\n                <Label class=\"h2 fa\" text=\"&#xf060;\" (onTap)=\"onBack()\" style=\"horizontal-align: left; color: white; padding: 20 0 0 10 \"></Label>\r\n            </StackLayout>\r\n            <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\r\n                <Label class=\"h2\" text=\"Add Vehicle\" style=\" color: white; text-align: center\"></Label>\r\n            </StackLayout>\r\n            <StackLayout col=\"2\" row=\"0\"></StackLayout>\r\n        </GridLayout>\r\n    </StackLayout>\r\n    <GridLayout column=0 row=1 style=\"vertical-align: center\">\r\n        <GridLayout class=\"page\" cols=\"*\" rows=\"8*,2*\">\r\n            <StackLayout col=0 row=0>\r\n                <GridLayout cols=\"*\" rows=\"*,*,*,*,*\" style=\"margin-top: 20\">\r\n                    <StackLayout col=0 row=0 style=\"padding-left: 20; padding-right: 20; vertical-align: center\">\r\n                        <Label text=\"Make :\" style=\"text-align: left;color: #606060\"></Label>\r\n                        <TextField [(ngModel)]=\"fleet.make\" (onTap)=\"makes()\" editable=false class=\"car_name\" autocorrect=\"false\" id=\"car_name\" hint=\"Select Make\"\r\n                            style=\" margin: 5 0 5 0; padding: 5; color: black; border-width: 1; border-color: #dadada; color:#808080\"></TextField>\r\n                    </StackLayout>\r\n                    <StackLayout col=0 row=1 style=\"padding-left: 20; padding-right: 20; vertical-align: center\">\r\n                        <Label text=\"Model :\" style=\"text-align: left;color: #606060\"></Label>\r\n                        <TextField [(ngModel)]=\"fleet.model\" (onTap)=\"models()\" editable=false class=\"model\" autocorrect=\"false\" id=\"model\" hint=\"Enter fleet model\"\r\n                            style=\"margin: 5 0 5 0; padding: 5; color: black; border-width: 1; border-color: #dadada; color:#808080\"></TextField>\r\n\r\n                    </StackLayout>\r\n                    <StackLayout col=0 row=2 style=\"padding-left: 20; padding-right: 20; vertical-align: center\">\r\n                        <Label text=\"Year :\" style=\"text-align: left;color: #606060\"></Label>\r\n                        <TextField [(ngModel)]=\"fleet.year\" keyboardType=\"phone\" class=\"year\" autocorrect=\"false\" id=\"year\" hint=\"Enter fleet year\" style=\" margin: 5 0 5 0; padding: 5; color: black; border-width: 1; border-color: #dadada; color:#808080\"></TextField>\r\n                    </StackLayout>\r\n                    <StackLayout col=0 row=3 style=\"padding-left: 20; padding-right: 20; vertical-align: center\">\r\n                        <Label text=\"Vin :\" style=\"text-align: left;color: #606060\"></Label>\r\n                        <TextField [(ngModel)]=\"fleet.vin\" class=\"vin_no\" autocorrect=\"false\" id=\"vin_no\" hint=\"Enter fleet vin\" style=\" margin: 5 0 5 0; padding: 5; color: black; border-width: 1; border-color: #dadada; color:#808080\"></TextField>\r\n                    </StackLayout>\r\n                    <StackLayout col=0 row=4 style=\"padding-left: 20; padding-right: 20; vertical-align: center\">\r\n                        <Label text=\"Miles :\" style=\"text-align: left;color: #606060\"></Label>\r\n                        <TextField [(ngModel)]=\"fleet.miles\" class=\"miles\" keyboardType=\"phone\" autocorrect=\"false\" id=\"miles\" hint=\"Enter fleet miles\" style=\" margin: 5 0 5 0; padding: 5; color: black; border-width: 1; border-color: #dadada; color:#808080\"></TextField>\r\n                    </StackLayout>\r\n                </GridLayout>\r\n            </StackLayout>\r\n            <StackLayout col=0 row=1>\r\n                <Button class=\"btn btn-primary btn-active\" id=\"button\" text=\"Submit\" style=\"padding: 5\" (tap)=\"submit($event)\"></Button>\r\n            </StackLayout>\r\n        </GridLayout>\r\n    </GridLayout>\r\n</GridLayout>"

/***/ })

});