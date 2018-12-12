import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { VendorlistRoutingModule } from "./vendorlist-routing.module";
import { VendorlistComponent } from "./vendorlist.component";

@NgModule({
    imports: [
        NativeScriptModule,
        VendorlistRoutingModule,
        NativeScriptUIListViewModule       
    ],
    declarations: [
        VendorlistComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class VendorlistModule { }
