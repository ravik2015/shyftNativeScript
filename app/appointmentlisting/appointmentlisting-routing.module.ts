import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppointmentlistingComponent } from "./appointmentlisting.component";

const routes: Routes = [
    { path: "", component: AppointmentlistingComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppointmentlistingRoutingModule { }
