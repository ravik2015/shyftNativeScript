import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SelectserviceComponent } from "./selectservice.component";

const routes: Routes = [
    { path: "", component: SelectserviceComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SelectserviceRoutingModule { }
