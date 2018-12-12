"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var login_routing_module_1 = require("./login-routing.module");
var login_component_1 = require("./login.component");
var loginmodal_1 = require("./loginmodal");
var signupmodal_1 = require("./signupmodal");
var LoginModule = (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                login_routing_module_1.LoginRoutingModule
            ],
            declarations: [
                login_component_1.LoginComponent,
                loginmodal_1.LoginModalComponent,
                signupmodal_1.SignupModalComponent
            ],
            entryComponents: [
                loginmodal_1.LoginModalComponent,
                signupmodal_1.SignupModalComponent
            ],
            bootstrap: [
                login_component_1.LoginComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], LoginModule);
    return LoginModule;
}());
exports.LoginModule = LoginModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSwrREFBNEQ7QUFDNUQscURBQW1EO0FBQ25ELDJDQUFtRDtBQUNuRCw2Q0FBcUQ7QUF1QnJEO0lBQUE7SUFBMkIsQ0FBQztJQUFmLFdBQVc7UUFyQnZCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLHlDQUFrQjthQUNyQjtZQUNELFlBQVksRUFBRTtnQkFDVixnQ0FBYztnQkFDZCxnQ0FBbUI7Z0JBQ25CLGtDQUFvQjthQUN2QjtZQUNELGVBQWUsRUFBRTtnQkFDYixnQ0FBbUI7Z0JBQ25CLGtDQUFvQjthQUN2QjtZQUNELFNBQVMsRUFBRTtnQkFDUCxnQ0FBYzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csV0FBVyxDQUFJO0lBQUQsa0JBQUM7Q0FBQSxBQUE1QixJQUE0QjtBQUFmLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTG9naW5Sb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vbG9naW4tcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vbG9naW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vbG9naW5tb2RhbFwiO1xuaW1wb3J0IHsgU2lnbnVwTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9zaWdudXBtb2RhbFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgICAgICBMb2dpblJvdXRpbmdNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBMb2dpbkNvbXBvbmVudCxcbiAgICAgICAgTG9naW5Nb2RhbENvbXBvbmVudCxcbiAgICAgICAgU2lnbnVwTW9kYWxDb21wb25lbnRcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBMb2dpbk1vZGFsQ29tcG9uZW50LFxuICAgICAgICBTaWdudXBNb2RhbENvbXBvbmVudFxuICAgIF0sXG4gICAgYm9vdHN0cmFwOiBbXG4gICAgICAgIExvZ2luQ29tcG9uZW50XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luTW9kdWxlIHsgfVxuIl19