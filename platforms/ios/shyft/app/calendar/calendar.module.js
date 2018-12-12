"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var nativescript_angular_1 = require("nativescript-angular");
var angular_1 = require("nativescript-pro-ui/calendar/angular");
var angular_2 = require("nativescript-pro-ui/listview/angular");
var calendar_routing_module_1 = require("./calendar-routing.module");
var calendar_component_1 = require("./calendar.component");
var calendar_pipe_1 = require("./calendar.pipe");
var selectservice_services_1 = require("../selectservice/selectservice.services");
var CalendarModule = (function () {
    function CalendarModule() {
    }
    CalendarModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                calendar_routing_module_1.CalendarRoutingModule,
                nativescript_angular_1.NativeScriptHttpModule,
                angular_1.NativeScriptUICalendarModule,
                angular_2.NativeScriptUIListViewModule
            ],
            declarations: [
                calendar_component_1.CalendarComponent,
                calendar_pipe_1.AvailableAppointment
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ],
            providers: [
                selectservice_services_1.SelectService
            ]
        })
    ], CalendarModule);
    return CalendarModule;
}());
exports.CalendarModule = CalendarModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FsZW5kYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELGdGQUE4RTtBQUM5RSw2REFBOEQ7QUFDOUQsZ0VBQW9GO0FBQ3BGLGdFQUFvRjtBQUNwRixxRUFBa0U7QUFDbEUsMkRBQXdEO0FBQ3hELGlEQUF1RDtBQUN2RCxrRkFBdUU7QUFxQnZFO0lBQUE7SUFBOEIsQ0FBQztJQUFsQixjQUFjO1FBbkIxQixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiwrQ0FBcUI7Z0JBQ3JCLDZDQUFzQjtnQkFDdEIsc0NBQTRCO2dCQUM1QixzQ0FBNEI7YUFDL0I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysc0NBQWlCO2dCQUNqQixvQ0FBb0I7YUFDdkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLHNDQUFhO2FBQ2hCO1NBQ0osQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQUEsQUFBL0IsSUFBK0I7QUFBbEIsd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlDYWxlbmRhck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL2NhbGVuZGFyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL2xpc3R2aWV3L2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ2FsZW5kYXJSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vY2FsZW5kYXItcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQ2FsZW5kYXJDb21wb25lbnR9IGZyb20gXCIuL2NhbGVuZGFyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBBdmFpbGFibGVBcHBvaW50bWVudCB9IGZyb20gJy4vY2FsZW5kYXIucGlwZSc7XHJcbmltcG9ydCB7IFNlbGVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vc2VsZWN0c2VydmljZS9zZWxlY3RzZXJ2aWNlLnNlcnZpY2VzXCJcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIENhbGVuZGFyUm91dGluZ01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJQ2FsZW5kYXJNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIENhbGVuZGFyQ29tcG9uZW50LFxyXG4gICAgICAgIEF2YWlsYWJsZUFwcG9pbnRtZW50XHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBTZWxlY3RTZXJ2aWNlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZHVsZSB7IH1cclxuIl19