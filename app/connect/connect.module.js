"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var connect_routing_module_1 = require("./connect-routing.module");
var connect_component_1 = require("./connect.component");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxnRkFBOEU7QUFDOUUsbUVBQWdFO0FBQ2hFLHlEQUF1RDtBQWN2RDtJQUFBO0lBQTZCLENBQUM7SUFBakIsYUFBYTtRQVp6QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiw2Q0FBb0I7YUFDdkI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysb0NBQWdCO2FBQ25CO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxhQUFhLENBQUk7SUFBRCxvQkFBQztDQUFBLEFBQTlCLElBQThCO0FBQWpCLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0Um91dGluZ01vZHVsZSB9IGZyb20gXCIuL2Nvbm5lY3Qtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQ29ubmVjdENvbXBvbmVudCB9IGZyb20gXCIuL2Nvbm5lY3QuY29tcG9uZW50XCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBDb25uZWN0Um91dGluZ01vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIENvbm5lY3RDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29ubmVjdE1vZHVsZSB7IH1cclxuIl19