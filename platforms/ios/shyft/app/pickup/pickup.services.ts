import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as ApplicationSettings from "application-settings";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { UUID } from 'angular2-uuid';
import { isAndroid, isIOS, device, screen } from "platform";
import * as utils from '../shared/utils';

@Injectable()
export class PickupService {

    public appointmentID;
    public addressUUID = UUID.UUID();
    private id_token;
    private currentAppointmentGetUrl = utils.baseurl + "appointment/"+JSON.parse(ApplicationSettings.getString("appointmentid","{}"));
    
    constructor(private http: Http) { }

    public getData(data) {
        let lat = data.latitude;
        let long = data.longitude;
        let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDyqz4svjh922aWBLWUmh0M94Y1J1nh2EM";
        return this.http.get(url)
            .map(res => res.json());

    }


    public getlatLong(address) {
        let url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+address+"&key=AIzaSyAkXRQsMcFS2pVwoa4tfNe4tBRb7jhemg0"
        return this.http.get(url)
        .map(res => res.json());
    }


    public getModalLatLong(address) {  
        console.log("here",address )  
        let encodedAddress = encodeURI(address)
        let headers = this.latlongHeader();
        let url = "https://maps.googleapis.com/maps/api/geocode/json?address="+encodedAddress+"&key=AIzaSyAkXRQsMcFS2pVwoa4tfNe4tBRb7jhemg0"
        return this.http.get(url, { headers: headers })
        .map((res: Response) => res.json());
    }
    
    private latlongHeader() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");        
        return headers;
    }  

    public getAddress(long, lat, text) {
        let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + text + "&language=en&key=AIzaSyDVHHTgO4zgOjwncPlCAs-PxC05wta3BJM";
        return this.http.get(url)
            .map(res => res.json());
    }

    public locationAdd(location) {
        this.appointmentID = JSON.parse(ApplicationSettings.getString("appointmentid","{}"))
        
        let locationAddURL = "https://uat.futuredms.com/shyft-api/appointment/" + this.appointmentID + "/location";

        console.log("locationlocation  : ", JSON.stringify(location), "location URL : ", locationAddURL);
        
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        
        let headers = new Headers();
        headers.append("Authorization", this.id_token);

        return this.http.put(
            locationAddURL,
            location,
            { headers: headers }
        )
          
    }



    public updateAppointment(){
        console.log("local storage  Appointment id is : ", ApplicationSettings.getString("appointmentid")," vendorid : ",JSON.parse(ApplicationSettings.getString("appointmentid","{}")))
        
        let appointmentid = JSON.parse(ApplicationSettings.getString("appointmentid"))
        
        let appointmentUpdateURL = "https://uat.futuredms.com/shyft-api/appointment/" + appointmentid;

        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        
        let headers = new Headers();
        let date = new Date();
        let isoDate = date.toISOString();
       let  appointment = {
            "id": JSON.parse(ApplicationSettings.getString("appointmentid","{}")),
            "datetime": JSON.parse(ApplicationSettings.getString("appointmentDate","{}")),
            "status": "Paid",
            "vendor": JSON.parse(ApplicationSettings.getString("vendorid","{}"))
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

     //-------------------------------- Appointment GET Request ----------------------------------//

     public currentAppointmentGet() {
        let headers = this.currentAppointmentGetHeader();
        return this.http.get(this.currentAppointmentGetUrl, { headers: headers })
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

    private currentAppointmentGetHeader() {
        let headers = new Headers();
         this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    }


}
