import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AddcarRoutingModule } from "./addcar-routing.module";
import { AddcarComponent } from "./addcar.component";
import { MakeModalComponent } from "./makemodal"
import { ModelModalComponent } from "./modelmodal"

@NgModule({
    imports: [
        NativeScriptModule,
        AddcarRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AddcarComponent,
        MakeModalComponent,
        ModelModalComponent
    ],
    entryComponents: [
        MakeModalComponent,
        ModelModalComponent
    ],
    bootstrap: [
        AddcarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddcarModule { }
