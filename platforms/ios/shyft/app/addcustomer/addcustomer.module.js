"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var addcustomer_routing_module_1 = require("./addcustomer-routing.module");
var addcustomer_component_1 = require("./addcustomer.component");
var forms_1 = require("nativescript-angular/forms");
var AddcustomerModule = (function () {
    function AddcustomerModule() {
    }
    AddcustomerModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                addcustomer_routing_module_1.AddcustomerRoutingModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                addcustomer_component_1.AddcustomerComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AddcustomerModule);
    return AddcustomerModule;
}());
exports.AddcustomerModule = AddcustomerModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkY3VzdG9tZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkY3VzdG9tZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELGdGQUE4RTtBQUM5RSwyRUFBd0U7QUFDeEUsaUVBQStEO0FBQy9ELG9EQUFxRTtBQWVyRTtJQUFBO0lBQWlDLENBQUM7SUFBckIsaUJBQWlCO1FBYjdCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLHFEQUF3QjtnQkFDeEIsK0JBQXVCO2FBQzFCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRDQUFvQjthQUN2QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csaUJBQWlCLENBQUk7SUFBRCx3QkFBQztDQUFBLEFBQWxDLElBQWtDO0FBQXJCLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQWRkY3VzdG9tZXJSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYWRkY3VzdG9tZXItcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQWRkY3VzdG9tZXJDb21wb25lbnQgfSBmcm9tIFwiLi9hZGRjdXN0b21lci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIEFkZGN1c3RvbWVyUm91dGluZ01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFkZGN1c3RvbWVyQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFkZGN1c3RvbWVyTW9kdWxlIHsgfVxyXG4iXX0=