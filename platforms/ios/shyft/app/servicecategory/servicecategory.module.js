"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var selectservicemodal_1 = require("../selectservice/selectservicemodal");
var servicecategory_routing_module_1 = require("./servicecategory-routing.module");
var servicecategory_component_1 = require("./servicecategory.component");
var angular_1 = require("nativescript-accordion/angular");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZWNhdGVnb3J5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZpY2VjYXRlZ29yeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBRTlFLDBFQUFrRjtBQUNsRixtRkFBZ0Y7QUFDaEYseUVBQXVFO0FBQ3ZFLDBEQUFpRTtBQXNCakU7SUFBQTtJQUFxQyxDQUFDO0lBQXpCLHFCQUFxQjtRQXBCakMsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsNkRBQTRCO2dCQUM1Qix5QkFBZTthQUNsQjtZQUNELFlBQVksRUFBRTtnQkFDVixvREFBd0I7Z0JBQ3hCLGdEQUEyQjthQUM5QjtZQUNELGVBQWUsRUFBRTtnQkFDYixnREFBMkI7YUFDOUI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Asb0RBQXdCO2FBQzNCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxxQkFBcUIsQ0FBSTtJQUFELDRCQUFDO0NBQUEsQUFBdEMsSUFBc0M7QUFBekIsc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcbmltcG9ydCB7IFNlbGVjdFNlcnZpY2VNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuLi9zZWxlY3RzZXJ2aWNlL3NlbGVjdHNlcnZpY2Vtb2RhbFwiO1xyXG5pbXBvcnQgeyBTZXJ2aWNlY2F0ZWdvcnlSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vc2VydmljZWNhdGVnb3J5LXJvdXRpbmcubW9kdWxlXCI7XHJcbmltcG9ydCB7IFNlcnZpY2VjYXRlZ29yeUNvbXBvbmVudCB9IGZyb20gXCIuL3NlcnZpY2VjYXRlZ29yeS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQWNjb3JkaW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hY2NvcmRpb24vYW5ndWxhclwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgU2VydmljZWNhdGVnb3J5Um91dGluZ01vZHVsZSxcclxuICAgICAgICBBY2NvcmRpb25Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBTZXJ2aWNlY2F0ZWdvcnlDb21wb25lbnQsXHJcbiAgICAgICAgU2VsZWN0U2VydmljZU1vZGFsQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICAgICAgU2VsZWN0U2VydmljZU1vZGFsQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgU2VydmljZWNhdGVnb3J5Q29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VjYXRlZ29yeU1vZHVsZSB7IH1cclxuIl19