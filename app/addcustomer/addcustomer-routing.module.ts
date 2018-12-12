import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AddcustomerComponent } from "./addcustomer.component";

const routes: Routes = [
    { path: "", component: AddcustomerComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AddcustomerRoutingModule { }
