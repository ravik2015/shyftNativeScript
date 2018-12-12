import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ServicecategoryComponent } from "./servicecategory.component";

const routes: Routes = [
    { path: "", component: ServicecategoryComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ServicecategoryRoutingModule { }
