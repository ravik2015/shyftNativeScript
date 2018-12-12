import { Injectable } from '@angular/core';
// purpose of this service is t oshow that it will be singleton withing any app which
// will import it into app.module and will use .forRoot()
// SimpleService was added for test purpose only, it is not part of the API
var SimpleService = /** @class */ (function () {
    function SimpleService() {
        this.someData = " Just simple data which will be changed in different feature modules";
    }
    SimpleService.prototype.setSomeData = function (newValue) {
        this.someData = newValue;
    };
    SimpleService.prototype.getSomeData = function () {
        return this.someData;
    };
    SimpleService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SimpleService.ctorParameters = function () { return []; };
    return SimpleService;
}());
export { SimpleService };
//# sourceMappingURL=SimpleService.js.map