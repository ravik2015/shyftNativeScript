import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { LoginModalComponent } from "./loginmodal";
import { SignupModalComponent } from "./signupmodal";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent,
        LoginModalComponent,
        SignupModalComponent
    ],
    entryComponents: [
        LoginModalComponent,
        SignupModalComponent
    ],
    bootstrap: [
        LoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
