import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppointmentdataComponent } from "./appointmentdata.component";

const routes: Routes = [
    { path: "", component: AppointmentdataComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppointmentdataRoutingModule { }
