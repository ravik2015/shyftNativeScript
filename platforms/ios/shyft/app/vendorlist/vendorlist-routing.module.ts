import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { VendorlistComponent } from "./vendorlist.component";

const routes: Routes = [
    { path: "", component: VendorlistComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class VendorlistRoutingModule { }
