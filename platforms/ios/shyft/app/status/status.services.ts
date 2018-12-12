import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as ApplicationSettings from "application-settings";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import * as utils from '../shared/utils';
import { isAndroid, isIOS, device, screen } from "platform";

@Injectable()
export class StatusService {
    public appointmentID;
    private id_token;
    
    constructor(private http: Http) { }

    public cancelAppointment(){
        console.log("local storage  Appointment id is : ", ApplicationSettings.getString("appointmentid")," vendorid : ",JSON.parse(ApplicationSettings.getString("vendorid","{}")))
        
        let appointmentid = JSON.parse(ApplicationSettings.getString("appointmentid"))
        
        let appointmentUpdateURL = "https://uat.futuredms.com/shyft-api/appointment/" + appointmentid;

        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        
        let headers = new Headers();
        let date = new Date();
        let isoDate = date.toISOString();
       let  appointment = {
            "id": JSON.parse(ApplicationSettings.getString("appointmentid","{}")),
            "datetime": JSON.parse(ApplicationSettings.getString("appointmentDate","{}")),
            "status": "Cancelled",
            "vendor": JSON.parse(ApplicationSettings.getString("vendorToCancel","{}"))
        };
        console.log("APpointment create url --> ",appointmentUpdateURL)        
        console.log("Appointment PUT Data Testing : ", JSON.stringify(appointment));
        headers.append("Authorization", this.id_token);
        return this.http.put(
                appointmentUpdateURL,
                    appointment,
                    { headers: headers }
                )
    }

}
