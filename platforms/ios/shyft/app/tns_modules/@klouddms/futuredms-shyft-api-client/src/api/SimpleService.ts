import { Injectable } from '@angular/core';

// purpose of this service is t oshow that it will be singleton withing any app which
// will import it into app.module and will use .forRoot()
// SimpleService was added for test purpose only, it is not part of the API
@Injectable()
export class SimpleService {
    someData = " Just simple data which will be changed in different feature modules";

    setSomeData(newValue) {
        this.someData = newValue;
    }

    getSomeData() {
        return this.someData;
    }
}