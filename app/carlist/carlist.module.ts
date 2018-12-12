import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { CarlistRoutingModule } from "./carlist-routing.module";
import { CarlistComponent } from "./carlist.component";
import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    imports: [
        NativeScriptHttpModule,
        NativeScriptModule,
        CarlistRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        CarlistComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CarlistModule { }
