import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AdminApi, ClientApi, SimpleService, BackOfficeApi } from './api/api';
var FuturedmsShyftApiClientModule = /** @class */ (function () {
    function FuturedmsShyftApiClientModule() {
    }
    // used FuturedmsShyftApiClientModule.forRoot() only in RootModule
    // it will make SimpleService singeltone all over the App
    // SimpleService was added for test purpose only, it is not part of the API
    // used FuturedmsShyftApiClientModule.forRoot() only in RootModule
    // it will make SimpleService singeltone all over the App
    // SimpleService was added for test purpose only, it is not part of the API
    FuturedmsShyftApiClientModule.forRoot = 
    // used FuturedmsShyftApiClientModule.forRoot() only in RootModule
    // it will make SimpleService singeltone all over the App
    // SimpleService was added for test purpose only, it is not part of the API
    function () {
        return {
            ngModule: FuturedmsShyftApiClientModule,
            providers: [AdminApi, ClientApi, BackOfficeApi, SimpleService]
        };
    };
    FuturedmsShyftApiClientModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        HttpModule,
                        CommonModule,
                    ],
                    exports: [],
                    declarations: [],
                    providers: [],
                    entryComponents: []
                },] },
    ];
    /** @nocollapse */
    FuturedmsShyftApiClientModule.ctorParameters = function () { return []; };
    return FuturedmsShyftApiClientModule;
}());
export { FuturedmsShyftApiClientModule };
//# sourceMappingURL=futuredms-shyft-api-client.module.js.map