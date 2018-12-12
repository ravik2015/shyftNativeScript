import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
// import { Observable } from "rxjs/Rx";
import 'rxjs/add/observable/of';

import { UUID } from 'angular2-uuid';
import * as utils from '../shared/utils';
import { isAndroid, isIOS, device, screen } from "platform";
import * as ApplicationSettings from "application-settings";
import { SelectService } from "../selectservice/selectservice.services"

@Injectable()
export class CalendarService {
    private customerAppointmentId = ApplicationSettings.getString("appointmentID", "{}")  
    private vendorId = JSON.parse(ApplicationSettings.getString('vendorid',"{}"))                    
    private customerAppointmentUrl = utils.baseurl + "appointment/"+this.customerAppointmentId;
    private customerVendorUrl = utils.baseurl + "vendor/"+this.vendorId;
    private appointmentsUrl = utils.baseurl + "appointment";

    private id_token;
    constructor(private http: Http, private selectService : SelectService) {

        console.log("localStorage items : ",this.customerAppointmentId  , this.vendorId, this.customerAppointmentUrl, this.customerVendorUrl, this.appointmentsUrl)
        
     }


    //-------------------------------- Appointment GET Request ----------------------------------//

    public currentAppointment() {       
          return this.selectService.createCustomerAppointment(UUID.UUID(), UUID.UUID());          
    }

    private currentAppointmentHeader() {
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

     //-------------------------------- Vendor GET Request ----------------------------------//

     public currentVendor() {
        let headers = this.currentVendorHeader();
        return this.http.get(this.customerVendorUrl, { headers: headers })
        .map(res => {
            if(res.status < 200 || res.status >= 300) {
              throw new Error('This request has failed ' + res.status);
            } 
            else {
                console.log("Got vendor data ")
              return res.json();
            }
          });
    }

    private currentVendorHeader() {
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

//--------------------------------------- Appointments GET Request -------------------------------------------//

        public appointments() {
            let headers = this.appointmentsHeader();
            return this.http.get(this.appointmentsUrl, { headers: headers })
            .map(res => {
                if(res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
                } 
                else {
                    console.log("Got appointment data ")
                return res.json();
                }
            });
        }

        private appointmentsHeader() {
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

