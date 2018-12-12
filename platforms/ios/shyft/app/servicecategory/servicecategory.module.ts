import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { SelectServiceModalComponent } from "../selectservice/selectservicemodal";
import { ServicecategoryRoutingModule } from "./servicecategory-routing.module";
import { ServicecategoryComponent } from "./servicecategory.component";
import { AccordionModule } from "nativescript-accordion/angular";

@NgModule({
    imports: [
        NativeScriptModule,
        ServicecategoryRoutingModule,
        AccordionModule
    ],
    declarations: [
        ServicecategoryComponent,
        SelectServiceModalComponent
    ],
    entryComponents: [
        SelectServiceModalComponent
    ],
    bootstrap: [
        ServicecategoryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ServicecategoryModule { }
