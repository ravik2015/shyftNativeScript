"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var angular_1 = require("nativescript-pro-ui/listview/angular");
var vendorlist_routing_module_1 = require("./vendorlist-routing.module");
var vendorlist_component_1 = require("./vendorlist.component");
var VendorlistModule = (function () {
    function VendorlistModule() {
    }
    VendorlistModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                vendorlist_routing_module_1.VendorlistRoutingModule,
                angular_1.NativeScriptUIListViewModule
            ],
            declarations: [
                vendorlist_component_1.VendorlistComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], VendorlistModule);
    return VendorlistModule;
}());
exports.VendorlistModule = VendorlistModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVuZG9ybGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2ZW5kb3JsaXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxnRkFBOEU7QUFDOUUsZ0VBQW9GO0FBQ3BGLHlFQUFzRTtBQUN0RSwrREFBNkQ7QUFlN0Q7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQWI1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQixtREFBdUI7Z0JBQ3ZCLHNDQUE0QjthQUMvQjtZQUNELFlBQVksRUFBRTtnQkFDViwwQ0FBbUI7YUFDdEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLGdCQUFnQixDQUFJO0lBQUQsdUJBQUM7Q0FBQSxBQUFqQyxJQUFpQztBQUFwQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9saXN0dmlldy9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IFZlbmRvcmxpc3RSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vdmVuZG9ybGlzdC1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBWZW5kb3JsaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vdmVuZG9ybGlzdC5jb21wb25lbnRcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIFZlbmRvcmxpc3RSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgICAgICAgXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgVmVuZG9ybGlzdENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWZW5kb3JsaXN0TW9kdWxlIHsgfVxyXG4iXX0=