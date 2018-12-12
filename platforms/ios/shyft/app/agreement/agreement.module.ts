import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AgreementRoutingModule } from "./agreement-routing.module";
import { AgreementComponent } from "./agreement.component";

@NgModule({
    imports: [
        NativeScriptModule,
        AgreementRoutingModule,
    ],
    declarations: [
        AgreementComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AgreementModule { }
