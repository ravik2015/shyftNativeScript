"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var http_1 = require("nativescript-angular/http");
var core_2 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
// import { FuturedmsShyftApiClientModule, Configuration, AdminApi,  BASE_PATH } from '@klouddms/futuredms-shyft-api-client';
core_2.enableProdMode();
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                http_1.NativeScriptHttpModule,
                app_routing_module_1.AppRoutingModule
                // ,FuturedmsShyftApiClientModule.forRoot()        
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            // providers: [
            //     { provide: BASE_PATH, useValue: 'https://uat.futuredms.com/shyft-api' },        
            // ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Y7QUFFbEYsZ0ZBQThFO0FBQzlFLGtEQUFtRTtBQUNuRSxzQ0FBK0M7QUFDL0MsMkRBQXdEO0FBQ3hELGlEQUErQztBQUUvQyw2SEFBNkg7QUFFN0gscUJBQWMsRUFBRSxDQUFDO0FBc0JqQjtJQUFBO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBcEJyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLDZCQUFzQjtnQkFDdEIscUNBQWdCO2dCQUNoQixtREFBbUQ7YUFDdEQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7YUFDZjtZQUNELGVBQWU7WUFDZix1RkFBdUY7WUFDdkYsS0FBSztZQUNMLE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOU01vZHVsZUZhY3RvcnlMb2FkZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBlbmFibGVQcm9kTW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG4vLyBpbXBvcnQgeyBGdXR1cmVkbXNTaHlmdEFwaUNsaWVudE1vZHVsZSwgQ29uZmlndXJhdGlvbiwgQWRtaW5BcGksICBCQVNFX1BBVEggfSBmcm9tICdAa2xvdWRkbXMvZnV0dXJlZG1zLXNoeWZ0LWFwaS1jbGllbnQnO1xuXG5lbmFibGVQcm9kTW9kZSgpO1xuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlXG4gICAgICAgIC8vICxGdXR1cmVkbXNTaHlmdEFwaUNsaWVudE1vZHVsZS5mb3JSb290KCkgICAgICAgIFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudFxuICAgIF0sXG4gICAgLy8gcHJvdmlkZXJzOiBbXG4gICAgLy8gICAgIHsgcHJvdmlkZTogQkFTRV9QQVRILCB1c2VWYWx1ZTogJ2h0dHBzOi8vdWF0LmZ1dHVyZWRtcy5jb20vc2h5ZnQtYXBpJyB9LCAgICAgICAgXG4gICAgLy8gXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==