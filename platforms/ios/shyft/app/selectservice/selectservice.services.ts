import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as ApplicationSettings from "application-settings";
import { Observable } from 'rxjs/Observable'
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import * as utils from '../shared/utils';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { isAndroid, isIOS, device, screen } from "platform";
import 'rxjs/add/observable/of';


@Injectable()
export class SelectService {
    public id_token;
    public serviceID;
    public vendorID;
    public appointmentid;
    public customerAppointment;
    public servicesSelections = Array();

    public test = Array();
    
    constructor(private http: Http) {
        let date = new Date();
        let isoDate = date.toISOString();
        this.customerAppointment = {
            "id": "",
            "datetime": isoDate,
            "status": "Pending",
            "vendor": ""
        }
     }
     

    //---------------------- Service GET Request ----------------------------//

    public servicesGet(ID) {
        this.vendorID = ID.replace(/["']/g, "")
        let ServiceGetUrl = utils.baseurl + "vendor/" + this.vendorID;
        let headers = this.servicesHeader();
        return this.http.get(ServiceGetUrl, { headers: headers })
        .map(res => {
            // If request fails, throw an Error that will be caught
            if(res.status < 200 || res.status >= 300) {
              throw new Error('This request has failed ' + res.status);
            } 
            // If everything went fine, return the response
            else {
              return res.json();
            }
          })
    }

    private servicesHeader() {
    
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        
        let headers = new Headers();
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    }

    createCustomerAppointment(uuid, vendorId){
        this.customerAppointment.id = uuid;
       this.customerAppointment.vendor = vendorId;
       console.log("uuid: ", uuid, "vendorId: ", " this.customerAppointment: ", JSON.stringify(this.customerAppointment) )
       return Observable.of(this.customerAppointment)
     }
     
    public createAppointment(uuid, vendorId, date) {
        console.log("appointmentid : ", uuid, "vendorid", vendorId, "date : ", date )
        ApplicationSettings.setString("appointmentid", JSON.stringify(uuid))
        this.appointmentid = uuid
        let appointmentCreateURL = "https://uat.futuredms.com/shyft-api/appointment/" + this.appointmentid;
        // if (isIOS) {     
        //     this.id_token = localStorage.getItem("IOSToken")
        //             }
        // else
        // {
        //     this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        // }
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        
        let headers = new Headers();
       let  appointment = {
            "id": this.appointmentid,
            "datetime": date,
            "status": "Pending",
            "vendor": vendorId
        };
        console.log("Appointment Create Url --> ",appointmentCreateURL)        
        console.log("Appointment PUT Data Testing-----> ", JSON.stringify(appointment));
        headers.append("Authorization", this.id_token);
        return this.http.put(
                    appointmentCreateURL,
                    appointment,
                    { headers: headers }
                )
        .subscribe((result) => {
                    console.log("Appointment Create Success : ", (JSON.stringify(result)))
                    let services = JSON.parse(ApplicationSettings.getString("servicesSelections"))
                    services.map((item) => {
                        console.log("Service parse are : ", JSON.stringify(item))
                            })
                        }, (error) => {
                            console.log("Appointment Create Error : ", error)
                            this.vehicleAdd()                    
                            let services = JSON.parse(ApplicationSettings.getString("servicesSelections"))
                            services.map((item) => {
                                console.log("service are",item.service)
                                this.serviceAdd(item.service)
                            })
                    });
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }

    serviceAdd(servicesId){
        let serviceid = UUID.UUID();        
        let serviceSelectionURL = "https://uat.futuredms.com/shyft-api/appointment/" + this.appointmentid + "/service-selection/" + serviceid;

        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        
        let headers = new Headers();
        headers.append("Authorization", this.id_token);;
        let serviceBody = {
            "id": serviceid,
            "status": "pending",
            "service": servicesId
        }        
        return this.http.put(
            serviceSelectionURL,
            serviceBody,
            { headers: headers }
        )
        .subscribe((result) => {
            console.log("Service added to Appointment : ", JSON.stringify(result))
        }, (error) => {
            console.log("Service add Error : ", error)
        });
    }


    addServiceSelectionIntoAppointment(servicesSelection){
        this.customerAppointment.serviceSelections = servicesSelection;
    }
    
    getCustomerAppointment() {
        return  Observable.of(this.customerAppointment)
    }

    addServiceSelection(serviceSelection) {
        this.servicesSelections.push(serviceSelection); 
        this.customerAppointment.serviceSelections.push(serviceSelection);       
    }

    getServicesSelections(){
        console.log("this.selectService.getServicesSelections()", this.servicesSelections)
        return this.servicesSelections;
    }

    public serviceSelection(serviceID, uuid) {
        this.serviceID = serviceID;
        this.appointmentid = uuid;
        let serviceid = UUID.UUID();
        let serviceBody = {
            "id": serviceid,
            "status": "pending",
            "service": this.serviceID
        }
        this.servicesSelections.push(serviceBody);
        this.customerAppointment.serviceSelections = this.servicesSelections; 
        ApplicationSettings.setString("servicesSelections",JSON.stringify(this.servicesSelections) )
       }

    public vehicleAdd( ) {
            let vehicleUUID = UUID.UUID();
            let vehicleaddURL = "https://uat.futuredms.com/shyft-api/appointment/" + this.appointmentid + "/vehicle";
            // if (isIOS) {     
            //     this.id_token = localStorage.getItem("IOSToken")
            //             }
            // else
            // {
            //     this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
            // }
            this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
            
            let headers = new Headers();
            let date = new Date();
            let isoDate = date.toISOString();
            console.log(" this is my iso date ------> ", isoDate)
            let  vehicleadd ={ 
                "id":vehicleUUID,
                "vehicleId":JSON.parse(ApplicationSettings.getString("vehicleid")),
                "miles":123
            }
            console.log("vehicleadd create url --> ",vehicleaddURL)        
            console.log("vehicleadd PUT Data Testing-----> ", JSON.stringify(vehicleadd));
            headers.append("Authorization", this.id_token);
            return this.http.put(
                        vehicleaddURL,
                        vehicleadd,
                        { headers: headers }
                    )
            .subscribe((result) => {
                console.log("Vehicle Add Success ------------> ", JSON.stringify(result))
            }, (error) => {
                console.log("Vehicle Add Error ------------>", error)
            });
        }
    
        
}
