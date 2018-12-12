import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { SelectserviceRoutingModule } from "./selectservice-routing.module";
import { SelectserviceComponent } from "./selectservice.component";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';


@NgModule({
    imports: [
        NativeScriptModule,
        SelectserviceRoutingModule,   
        TNSCheckBoxModule    
    ],
    declarations: [
        SelectserviceComponent,
    ],   
    bootstrap: [
        SelectserviceComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SelectserviceModule { }
