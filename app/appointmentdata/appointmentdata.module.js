"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var appointmentdata_routing_module_1 = require("./appointmentdata-routing.module");
var appointmentdata_component_1 = require("./appointmentdata.component");
var AppointmentdataModule = (function () {
    function AppointmentdataModule() {
    }
    AppointmentdataModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                appointmentdata_routing_module_1.AppointmentdataRoutingModule
            ],
            declarations: [
                appointmentdata_component_1.AppointmentdataComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppointmentdataModule);
    return AppointmentdataModule;
}());
exports.AppointmentdataModule = AppointmentdataModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRkYXRhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcG9pbnRtZW50ZGF0YS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLG1GQUFnRjtBQUNoRix5RUFBdUU7QUFjdkU7SUFBQTtJQUFxQyxDQUFDO0lBQXpCLHFCQUFxQjtRQVpqQyxlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiw2REFBNEI7YUFDL0I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysb0RBQXdCO2FBQzNCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxxQkFBcUIsQ0FBSTtJQUFELDRCQUFDO0NBQUEsQUFBdEMsSUFBc0M7QUFBekIsc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBvaW50bWVudGRhdGFSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwb2ludG1lbnRkYXRhLXJvdXRpbmcubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFwcG9pbnRtZW50ZGF0YUNvbXBvbmVudCB9IGZyb20gXCIuL2FwcG9pbnRtZW50ZGF0YS5jb21wb25lbnRcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIEFwcG9pbnRtZW50ZGF0YVJvdXRpbmdNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBvaW50bWVudGRhdGFDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwb2ludG1lbnRkYXRhTW9kdWxlIHsgfVxyXG4iXX0=