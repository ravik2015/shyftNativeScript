import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { RecallsRoutingModule } from "./recalls-routing.module";
import { RecallsComponent } from "./recalls.component";


@NgModule({
    imports: [
        NativeScriptModule,
        RecallsRoutingModule
    ],
    declarations: [
        RecallsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RecallsModule { }
