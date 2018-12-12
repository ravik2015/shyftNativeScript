import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as ApplicationSettings from "application-settings";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import * as utils from '../shared/utils';
import { Observable } from "rxjs/Rx";
import { isAndroid, isIOS, device, screen } from "platform";

@Injectable()
export class AddcustomerService {

    public firstname;
    public lastname;    
    public id_token;
    constructor(private http: Http) { }

    public createUser(firstname, lastname){ 
        this.firstname = firstname;
        this.lastname = lastname;
        let user = JSON.parse(ApplicationSettings.getString("USER","{}"))        
        let user_id = user.sub;       
        let user_email = user.email;
        let user_phoneno = user.phone_number;
        let userCreateURL = 'https://uat.futuredms.com/shyft-api/user/' + user_id ;
        console.log("userid is : ",user_id,"useremail is : ",user_email,"userphone is : ",user_phoneno, "user create url is : ", userCreateURL)
      
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        
        let headers = new Headers();
        headers.append("Authorization", this.id_token);        
        let date = new Date();
        let isoDate = date.toISOString();
        
        return this.http.put(
            userCreateURL,
            {
                "id" : user_id,
                "first_name": this.firstname,
                "last_name": this.lastname,
                "date_joined": isoDate,                
                "role" : "Driver"
            },
            { headers: headers }
        )
        }
}
