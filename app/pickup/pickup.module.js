"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var nativescript_angular_1 = require("nativescript-angular");
var pickupmodal_1 = require("./pickupmodal");
var addressmodal_1 = require("./addressmodal");
var pickup_routing_module_1 = require("./pickup-routing.module");
var pickup_component_1 = require("./pickup.component");
var forms_1 = require("nativescript-angular/forms");
var PickupModule = (function () {
    function PickupModule() {
    }
    PickupModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                pickup_routing_module_1.PickupRoutingModule,
                nativescript_angular_1.NativeScriptHttpModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                pickup_component_1.PickupComponent,
                pickupmodal_1.PickupModalComponent,
                addressmodal_1.AddressModalComponent
            ],
            entryComponents: [
                pickupmodal_1.PickupModalComponent,
                addressmodal_1.AddressModalComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ],
        })
    ], PickupModule);
    return PickupModule;
}());
exports.PickupModule = PickupModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBpY2t1cC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZEQUE4RDtBQUM5RCw2Q0FBcUQ7QUFDckQsK0NBQXVEO0FBQ3ZELGlFQUE4RDtBQUM5RCx1REFBcUQ7QUFDckQsb0RBQXFFO0FBMEJyRTtJQUFBO0lBQTRCLENBQUM7SUFBaEIsWUFBWTtRQXhCeEIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsMkNBQW1CO2dCQUNuQiw2Q0FBc0I7Z0JBQ3RCLCtCQUF1QjthQUMxQjtZQUNELFlBQVksRUFBRTtnQkFDVixrQ0FBZTtnQkFDZixrQ0FBb0I7Z0JBQ3BCLG9DQUFxQjthQUN4QjtZQUNELGVBQWUsRUFBRTtnQkFDYixrQ0FBb0I7Z0JBQ3BCLG9DQUFxQjthQUN4QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FLSixDQUFDO09BQ1csWUFBWSxDQUFJO0lBQUQsbUJBQUM7Q0FBQSxBQUE3QixJQUE2QjtBQUFoQixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBQaWNrdXBNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuL3BpY2t1cG1vZGFsXCI7XHJcbmltcG9ydCB7IEFkZHJlc3NNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuL2FkZHJlc3Ntb2RhbFwiO1xyXG5pbXBvcnQgeyBQaWNrdXBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vcGlja3VwLXJvdXRpbmcubW9kdWxlXCI7XHJcbmltcG9ydCB7IFBpY2t1cENvbXBvbmVudCB9IGZyb20gXCIuL3BpY2t1cC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIFBpY2t1cFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSAgICAgICAgXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgUGlja3VwQ29tcG9uZW50LFxyXG4gICAgICAgIFBpY2t1cE1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIEFkZHJlc3NNb2RhbENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgICAgIFBpY2t1cE1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIEFkZHJlc3NNb2RhbENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdLFxyXG4gICAgLy8gcHJvdmlkZXJzOiBbXHJcbiAgICAvLyAgICAge3Byb3ZpZGU6IENvbmZpZ3VyYXRpb24sIHVzZUNsYXNzOiBDb25maWd1cmF0aW9ufSxcclxuICAgIC8vICAgICB7cHJvdmlkZTogQkFTRV9QQVRILCB1c2VWYWx1ZTogJy9zaHlmdC1hcGknfSxcclxuICAgIC8vIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBpY2t1cE1vZHVsZSB7IH1cclxuIl19