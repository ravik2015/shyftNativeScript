import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as ApplicationSettings from "application-settings";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import * as utils from '../shared/utils';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { isAndroid, isIOS, device, screen } from "platform";


@Injectable()
export class VendorlistService {
    public id_token;
    public serviceID;
    public vendorID;
    public appointmentid;
    private vendorGetUrl = utils.baseurl+"vendor";
    
    constructor(private http: Http) { }

    public vendorGet() {

               let headers = this.vendorHeader();
                return this.http.get(this.vendorGetUrl, { headers: headers })
                    .map(res => {
                        if(res.status < 200 || res.status >= 300) {
                            alert("Something went wrong");
                          throw new Error('This request has failed ' + res.status);
                        } 
                        else {
                          return res.json();
                        }
                      })
            }
        
            private vendorHeader() {
                // if (isIOS) {     
                //     this.id_token = localStorage.getItem("IOSToken")
                //             }
                // else
                // {
                //     this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
                // }
                this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))                            
                let headers = new Headers();
                headers.append("Authorization", this.id_token);
                headers.append("Content-Type", "application/json");        
                return headers;
            }

   
}
