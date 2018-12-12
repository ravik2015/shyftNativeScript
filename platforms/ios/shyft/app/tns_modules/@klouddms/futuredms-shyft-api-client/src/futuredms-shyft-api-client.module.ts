/*Angular*/
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

/*App*/
/*communication with Futuredms-API Client shared_library*/
import { AdminApi, ClientApi, SimpleService, BackOfficeApi } from './api/api';


@NgModule({
    imports: [
        HttpModule,
        CommonModule,
    ],
    exports: [
    ],
    declarations: [
    ],
    providers: [
        
    ],
    entryComponents: [
    ]
})
export class FuturedmsShyftApiClientModule {
    // used FuturedmsShyftApiClientModule.forRoot() only in RootModule
    // it will make SimpleService singeltone all over the App
    // SimpleService was added for test purpose only, it is not part of the API

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FuturedmsShyftApiClientModule,
            providers: [ AdminApi, ClientApi, BackOfficeApi, SimpleService ]
        }
    }

 }
