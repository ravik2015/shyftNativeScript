"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var selectservice_routing_module_1 = require("./selectservice-routing.module");
var selectservice_component_1 = require("./selectservice.component");
var angular_1 = require("nativescript-checkbox/angular");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0c2VydmljZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWxlY3RzZXJ2aWNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxnRkFBOEU7QUFDOUUsK0VBQTRFO0FBQzVFLHFFQUFtRTtBQUVuRSx5REFBa0U7QUFtQmxFO0lBQUE7SUFBbUMsQ0FBQztJQUF2QixtQkFBbUI7UUFoQi9CLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLHlEQUEwQjtnQkFDMUIsMkJBQWlCO2FBQ3BCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLGdEQUFzQjthQUN6QjtZQUNELFNBQVMsRUFBRTtnQkFDUCxnREFBc0I7YUFDekI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLG1CQUFtQixDQUFJO0lBQUQsMEJBQUM7Q0FBQSxBQUFwQyxJQUFvQztBQUF2QixrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IFNlbGVjdHNlcnZpY2VSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vc2VsZWN0c2VydmljZS1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RzZXJ2aWNlQ29tcG9uZW50IH0gZnJvbSBcIi4vc2VsZWN0c2VydmljZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBUTlNDaGVja0JveE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jaGVja2JveC9hbmd1bGFyJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBTZWxlY3RzZXJ2aWNlUm91dGluZ01vZHVsZSwgICBcclxuICAgICAgICBUTlNDaGVja0JveE1vZHVsZSAgICBcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBTZWxlY3RzZXJ2aWNlQ29tcG9uZW50LFxyXG4gICAgXSwgICBcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIFNlbGVjdHNlcnZpY2VDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VsZWN0c2VydmljZU1vZHVsZSB7IH1cclxuIl19