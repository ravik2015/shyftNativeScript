webpackJsonp([15],{

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

/***/ 306:
/*!***************************************!*\
  !*** ./agreement/agreement.module.ts ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var nativescript_module_1 = __webpack_require__(/*! nativescript-angular/nativescript.module */ 165);
var agreement_routing_module_1 = __webpack_require__(/*! ./agreement-routing.module */ 528);
var agreement_component_1 = __webpack_require__(/*! ./agreement.component */ 483);
var AgreementModule = (function () {
    function AgreementModule() {
    }
    AgreementModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                agreement_routing_module_1.AgreementRoutingModule,
            ],
            declarations: [
                agreement_component_1.AgreementComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AgreementModule);
    return AgreementModule;
}());
exports.AgreementModule = AgreementModule;


/***/ }),

/***/ 483:
/*!******************************************!*\
  !*** ./agreement/agreement.component.ts ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var router_2 = __webpack_require__(/*! nativescript-angular/router */ 75);
var page_1 = __webpack_require__(/*! tns-core-modules/ui/page */ 20);
var AgreementComponent = (function () {
    function AgreementComponent(router, routerExtensions, _page) {
        this.router = router;
        this.routerExtensions = routerExtensions;
        this._page = _page;
        this.agreement_text = "Lorem ipsum dofglor sit amet, consectfdetur adipidfgscing elit, send dfo eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Cras pulvinar mattis nunc sed blandit libero volutpat. Vulputate ut pharetra sit amet aliquam id diam. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Nisi quis eleifend quam adipiscing. Egestas fringilla phasellus faucibus scelerisque eleifend. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Et netus et malesuada fames ac turpis egestas. Interdum varius sit amet mattis. In nisl nisi scelerisque eu ultrices. Id velit ut tortor pretium viverra suspendisse. Donec adipiscing tristique risus nec feugiat in fermentum posuere urna. Consectetur libero id faucibus nisl tincidunt eget. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Nibh tellus molestie nunc non blandit massa enim. Nisi scelerisque eu ultrices vitae auctor. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Laoreet non curabitur gravida arcu ac tortor dignissim convallis. Faucibus in ornare quam viverra. Morbi leo urna molestie at elementum eu facilisis sed. Nullam ac tortor vitae purus faucibus. Cursus risus at ultrices mi tempus. Turpis tincidunt id aliquet risus feugiat in ante metus. Eget arcu dictum varius duis at consectetur. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Adipiscing enim eu turpis egestas pretium. Nam libero justo laoreet sit amet cursus sit. Tempus iaculis urna id volutpat. Suscipit adipiscing bibendum est ultricies integer quis. Mattis nunc sed blandit libero volutpat sed cras ornare. In nibh mauris cursus mattis molestie a iaculis. Vivamus arcu felis bibendum ut tristique et egestas quis ipsum.";
    }
    AgreementComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
    };
    AgreementComponent.prototype.onTap = function () {
        this.routerExtensions.navigate(["/addcustomer"], {
            transition: {
                name: "slideLeft",
            }
        });
    };
    AgreementComponent = __decorate([
        core_1.Component({
            selector: "Agreement",
            /*duleId: module.i*/
            styles: [__webpack_require__(/*! ./agreement.css */ 529)],
            template: __webpack_require__(/*! ./agreement.component.html */ 530)
        }),
        __metadata("design:paramtypes", [router_1.Router, router_2.RouterExtensions, page_1.Page])
    ], AgreementComponent);
    return AgreementComponent;
}());
exports.AgreementComponent = AgreementComponent;


/***/ }),

/***/ 528:
/*!***********************************************!*\
  !*** ./agreement/agreement-routing.module.ts ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! nativescript-angular/router */ 75);
var agreement_component_1 = __webpack_require__(/*! ./agreement.component */ 483);
var routes = [
    { path: "", component: agreement_component_1.AgreementComponent }
];
var AgreementRoutingModule = (function () {
    function AgreementRoutingModule() {
    }
    AgreementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AgreementRoutingModule);
    return AgreementRoutingModule;
}());
exports.AgreementRoutingModule = AgreementRoutingModule;


/***/ }),

/***/ 529:
/*!*********************************!*\
  !*** ./agreement/agreement.css ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 530:
/*!********************************************!*\
  !*** ./agreement/agreement.component.html ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<GridLayout columns=\"*\" rows=\"*,8*,*\">\r\n        <StackLayout col=0 row=0 style=\"border-color: #CCCCCC; border-bottom-width: 2\">\r\n                <GridLayout columns=\"*\" rows=\"*,*\">\r\n                        <GridLayout col=\"0\" row=\"0\" columns=\"2*,6*,2*\" rows=\"*\" style=\"vertical-align: bottom\">\r\n                                <StackLayout col=0 row=0>\r\n                                        <Label text=\"&#xf111;\" class=\"h2 fa\" style=\"color: green; margin-top: 5;  text-align: right;\"></Label>\r\n                                </StackLayout>\r\n                                <StackLayout col=1 row=0>\r\n                                        <Label text=\"______________________________________\" class=\"fa\" style=\"text-align: center\"></Label>\r\n                                </StackLayout>\r\n                                <StackLayout col=2 row=0>\r\n                                        <Label text=\"&#xf111;\" class=\"h2 fa\" style=\"color: #CCCCCC; margin-top: 5;  text-align: left;\"></Label>\r\n                                </StackLayout>\r\n                        </GridLayout>\r\n                        <GridLayout col=\"0\" row=\"1\" columns=\"4*,2*,4*\" rows=\"*\">\r\n                                <StackLayout col=0 row=0>\r\n                                        <Label text=\"USER AGREEMENT\" style=\"color: black; text-align: center;\"></Label>\r\n                                </StackLayout>\r\n                                <StackLayout col=1 row=0></StackLayout>\r\n                                <StackLayout col=2 row=0>\r\n                                        <Label text=\"CREATE CUSTOMER\" style=\"color: black; text-align: center;\"></Label>\r\n                                </StackLayout>\r\n                        </GridLayout>\r\n                </GridLayout>\r\n        </StackLayout>\r\n        <StackLayout column=0 row=1 verticalAlignment=\"center\">\r\n                <Label text=\"Eula\" class=\"h2 label\" style=\"text-align: center\"></Label>\r\n                <TextView [text]=\"agreement_text\" editable=\"false\" style=\"padding: 3\"></TextView>\r\n        </StackLayout>\r\n        <StackLayout column=0 row=2 verticalAlignment=\"center\">\r\n                <Button class=\"btn btn-primary\" text=\"Continue\" style=\"background-color: dodgerblue\" (tap)=\"onTap($event)\"></Button>\r\n        </StackLayout>\r\n</GridLayout>"

/***/ })

});