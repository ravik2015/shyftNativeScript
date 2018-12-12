import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import * as ApplicationSettings from "application-settings";
import * as utils from '../shared/utils';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { isAndroid, isIOS, device, screen } from "platform";


@Injectable()
export class AddcarService {

    public fleetID;
    public fleet;
    public id_token;

    constructor(private http: Http) { }

//-------------------- ADDCAR PUT Request -------------------------------//

    public addcarPut(fleet,fleetID) {
            this.fleet = fleet
            this.fleetID = fleetID
            let addcarURL = "https://uat.futuredms.com/shyft-api/fleet/"+this.fleetID;    
            
            console.log("Fleet Add Url is :  ", addcarURL,"body is :   ", JSON.stringify(this.fleet));

            this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
            
            let headers = new Headers();
            headers.append("Authorization", this.id_token);
            
            return this.http.put(
              addcarURL,
               fleet,
              { headers: headers }
            )
          }
        
    

//-------------------- getPresignUrl GET Request -------------------------------//


      public presignUrl(imageID) {       
            let headers = this.presignUrlHeader();
            let imageKey = imageID
            let requestUrl = 'https://igzcbks18i.execute-api.us-east-1.amazonaws.com/production?url_prefix=vehicle/user/'+imageKey
            console.log("request url is -->", requestUrl)
            console.log("Headers -->", JSON.stringify(headers))
           return this.http.get(requestUrl, { headers: headers })
            .map((res) => {
                console.log("Response presignUrl is  ------> ", res.json())
                return res.json() })
     
      }
    
        private presignUrlHeader() {
       
            this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
            
            let headers = new Headers();
            headers.append("Authorization", this.id_token);
            return headers;
        }  

    public makeGet(){
        let url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json"
        return this.http.get(url)
        .map(res => res.json());
    }

    public getModels(makeid){
        let url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/"+makeid+"?format=json"
        return this.http.get(url)
        .map(res => res.json());
    }
}
