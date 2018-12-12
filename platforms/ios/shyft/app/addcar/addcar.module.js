"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var addcar_routing_module_1 = require("./addcar-routing.module");
var addcar_component_1 = require("./addcar.component");
var makemodal_1 = require("./makemodal");
var modelmodal_1 = require("./modelmodal");
var AddcarModule = (function () {
    function AddcarModule() {
    }
    AddcarModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                addcar_routing_module_1.AddcarRoutingModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                addcar_component_1.AddcarComponent,
                makemodal_1.MakeModalComponent,
                modelmodal_1.ModelModalComponent
            ],
            entryComponents: [
                makemodal_1.MakeModalComponent,
                modelmodal_1.ModelModalComponent
            ],
            bootstrap: [
                addcar_component_1.AddcarComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AddcarModule);
    return AddcarModule;
}());
exports.AddcarModule = AddcarModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkY2FyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZGNhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxpRUFBOEQ7QUFDOUQsdURBQXFEO0FBQ3JELHlDQUFnRDtBQUNoRCwyQ0FBa0Q7QUF3QmxEO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixZQUFZO1FBdEJ4QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiwyQ0FBbUI7Z0JBQ25CLCtCQUF1QjthQUMxQjtZQUNELFlBQVksRUFBRTtnQkFDVixrQ0FBZTtnQkFDZiw4QkFBa0I7Z0JBQ2xCLGdDQUFtQjthQUN0QjtZQUNELGVBQWUsRUFBRTtnQkFDYiw4QkFBa0I7Z0JBQ2xCLGdDQUFtQjthQUN0QjtZQUNELFNBQVMsRUFBRTtnQkFDUCxrQ0FBZTthQUNsQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csWUFBWSxDQUFJO0lBQUQsbUJBQUM7Q0FBQSxBQUE3QixJQUE2QjtBQUFoQixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgQWRkY2FyUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FkZGNhci1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBZGRjYXJDb21wb25lbnQgfSBmcm9tIFwiLi9hZGRjYXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1ha2VNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuL21ha2Vtb2RhbFwiXHJcbmltcG9ydCB7IE1vZGVsTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RlbG1vZGFsXCJcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIEFkZGNhclJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBZGRjYXJDb21wb25lbnQsXHJcbiAgICAgICAgTWFrZU1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGVsTW9kYWxDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgICAgICBNYWtlTW9kYWxDb21wb25lbnQsXHJcbiAgICAgICAgTW9kZWxNb2RhbENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFkZGNhckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGRjYXJNb2R1bGUgeyB9XHJcbiJdfQ==