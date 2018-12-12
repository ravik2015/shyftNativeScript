import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular";
import { PickupModalComponent } from "./pickupmodal";
import { AddressModalComponent } from "./addressmodal";
import { PickupRoutingModule } from "./pickup-routing.module";
import { PickupComponent } from "./pickup.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    imports: [
        NativeScriptModule,
        PickupRoutingModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule        
    ],
    declarations: [
        PickupComponent,
        PickupModalComponent,
        AddressModalComponent
    ],
    entryComponents: [
        PickupModalComponent,
        AddressModalComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    // providers: [
    //     {provide: Configuration, useClass: Configuration},
    //     {provide: BASE_PATH, useValue: '/shyft-api'},
    // ]
})
export class PickupModule { }
