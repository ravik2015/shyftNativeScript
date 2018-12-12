import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { ConnectRoutingModule } from "./connect-routing.module";
import { ConnectComponent } from "./connect.component";

@NgModule({
    imports: [
        NativeScriptModule,
        ConnectRoutingModule
    ],
    declarations: [
        ConnectComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ConnectModule { }
