import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import * as ApplicationSettings from "application-settings";
import { Observable } from "rxjs/Rx";
import * as utils from '../shared/utils';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { isAndroid, isIOS, device, screen } from "platform";


@Injectable()
export class CarlistService {
    private fleetGetUrl = utils.baseurl+"fleet";    
    private vendorGetUrl = utils.baseurl+"vendor";
    private id_token;
    constructor(private http: Http) { }

//-------------------- fleet GET Request -------------------------------//

    public fleetGet() {       
        let headers = this.fleetHeader();
        return this.http.get(this.fleetGetUrl, { headers: headers })
        .map(res => res.json());        
        // .map((res: Response) => {
        //     console.log("res", JSON.stringify(res))
        //     res.json()
            // if (res) {
            //     if (res.status === 204) {
            //         return [{ status: res.status, json: res }]
            //     }
            //     else if (res.status === 200) {
            //         return [{ status: res.status, json: res }]
            //     }
            // }
        // }).catch((error: any) => {
        //     if (error.status === 500) {
        //         return Observable.throw(new Error(error.status));
        //     }
        //     else if (error.status === 400) {
        //         return Observable.throw(new Error(error.status));
        //     }
        //     else if (error.status === 403) {
        //         return Observable.throw(new Error(error.status));
        //     }
        //     else if (error.status === 406) {
        //         return Observable.throw(new Error(error.status));
        //     }
    }

    private fleetHeader() {
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
