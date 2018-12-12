import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppointmentdataRoutingModule } from "./appointmentdata-routing.module";
import { AppointmentdataComponent } from "./appointmentdata.component";

@NgModule({
    imports: [
        NativeScriptModule,
        AppointmentdataRoutingModule
    ],
    declarations: [
        AppointmentdataComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppointmentdataModule { }
