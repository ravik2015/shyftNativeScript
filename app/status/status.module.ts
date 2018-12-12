import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { StatusRoutingModule } from "./status-routing.module";
import { StatusComponent } from "./status.component";

@NgModule({
    imports: [
        NativeScriptModule,
        StatusRoutingModule
    ],
    declarations: [
        StatusComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class StatusModule { }
