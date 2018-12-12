"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var angular_1 = require("nativescript-pro-ui/listview/angular");
var carlist_routing_module_1 = require("./carlist-routing.module");
var carlist_component_1 = require("./carlist.component");
var http_1 = require("nativescript-angular/http");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FybGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJsaXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxnRkFBOEU7QUFDOUUsZ0VBQW9GO0FBQ3BGLG1FQUFnRTtBQUNoRSx5REFBdUQ7QUFDdkQsa0RBQW1FO0FBZ0JuRTtJQUFBO0lBQTZCLENBQUM7SUFBakIsYUFBYTtRQWR6QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsNkJBQXNCO2dCQUN0Qix3Q0FBa0I7Z0JBQ2xCLDZDQUFvQjtnQkFDcEIsc0NBQTRCO2FBQy9CO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLG9DQUFnQjthQUNuQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBQSxBQUE5QixJQUE4QjtBQUFqQixzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL2xpc3R2aWV3L2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ2FybGlzdFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9jYXJsaXN0LXJvdXRpbmcubW9kdWxlXCI7XHJcbmltcG9ydCB7IENhcmxpc3RDb21wb25lbnQgfSBmcm9tIFwiLi9jYXJsaXN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgQ2FybGlzdFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIENhcmxpc3RDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FybGlzdE1vZHVsZSB7IH1cclxuIl19