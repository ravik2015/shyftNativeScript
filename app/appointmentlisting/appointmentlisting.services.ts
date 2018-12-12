import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as ApplicationSettings from "application-settings";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import * as utils from '../shared/utils';
import { isAndroid, isIOS, device, screen } from "platform";

@Injectable()
export class AppointmentlistingService {

    private vehiclehistoryUrl = utils.baseurl + "appointment";
    private id_token;
    constructor(private http: Http) { }


    //-------------------------------- Appointment GET Request ----------------------------------//

    public vehiclehistory() {
        let headers = this.vehiclehistoryHeader();
        return this.http.get(this.vehiclehistoryUrl, { headers: headers })
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

    private vehiclehistoryHeader() {
        let headers = new Headers();
        // if (isIOS) {     
        //     this.id_token = localStorage.getItem("IOSToken")
        // }
        // else
        // {
        //     this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        // } 
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    }

}
