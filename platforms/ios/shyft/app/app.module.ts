import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NSModuleFactoryLoader } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { enableProdMode } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// import { FuturedmsShyftApiClientModule, Configuration, AdminApi,  BASE_PATH } from '@klouddms/futuredms-shyft-api-client';

enableProdMode();

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        AppRoutingModule
        // ,FuturedmsShyftApiClientModule.forRoot()        
    ],
    declarations: [
        AppComponent
    ],
    // providers: [
    //     { provide: BASE_PATH, useValue: 'https://uat.futuredms.com/shyft-api' },        
    // ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
