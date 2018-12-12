import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AddcustomerRoutingModule } from "./addcustomer-routing.module";
import { AddcustomerComponent } from "./addcustomer.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    imports: [
        NativeScriptModule,
        AddcustomerRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AddcustomerComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddcustomerModule { }
