import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppointmentlistingRoutingModule } from "./appointmentlisting-routing.module";
import { AppointmentlistingComponent } from "./appointmentlisting.component";

@NgModule({
    imports: [
        NativeScriptModule,
        AppointmentlistingRoutingModule
    ],
    declarations: [
        AppointmentlistingComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppointmentlistingModule { }
