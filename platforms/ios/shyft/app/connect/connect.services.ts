import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as ApplicationSettings from "application-settings";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import * as utils from '../shared/utils';
import { isAndroid, isIOS, device, screen } from "platform";

@Injectable()
export class ConnectService {
    private id_token;
    constructor(private http: Http) { }


    //-------------------------------- Appointment GET Request ----------------------------------//

    public signature() {
        let headers = this.signatureHeader();
        return this.http.get("https://eotxmrelq8.execute-api.us-east-1.amazonaws.com/iot_production", { headers: headers })
        .map(res => {
            // If request fails, throw an Error that will be caught
            if(res.status < 200 || res.status >= 300) {
              throw new Error('This request has failed ' + res.status);
            } 
            // If everything went fine, return the response
            else {
              return res.json();
            }
          });
    }

    private signatureHeader() {
        let headers = new Headers();
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    }

}
