import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { AddcustomerService } from "./addcustomer.services";
import * as ApplicationSettings from "application-settings";
import { Page, ShownModallyData, NavigatedData } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "platform";
var jwt_decode = require('jwt-decode');
var http = require("http");

@Component({
    selector: "Addcustomer",
    moduleId: module.id,
    styleUrls: ['addcustomer.css'],
    templateUrl: "./addcustomer.component.html",
    providers: [AddcustomerService]
})

export class AddcustomerComponent implements OnInit {
    public firstname;
    public lastname;
    public id_token;
    public constructor(private router: Router, private routerExtensions: RouterExtensions, private _page: Page, private addcustomerService: AddcustomerService) {
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;

        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"))
        
            let decoded = jwt_decode(this.id_token);
            this.firstname = decoded.given_name;
            this.lastname = decoded.family_name;
    }

    public createUser() {
        this.addcustomerService.createUser(this.firstname, this.lastname)
            .subscribe((result) => {
                console.log("User Created Success------> ", (JSON.stringify(result)))
            }, (error) => {
                console.log("User Created Error ---- >", error)
                let refreshToken = JSON.parse(ApplicationSettings.getString("RefreshToken","{}"))
                this.tokenRefresh(refreshToken)
            });
    }

    public tokenRefresh(refreshToken){
                console.log("refresh token is : ", refreshToken)
                let form  = new FormData();
                form.append('grant_type', "refresh_token");
                form.append("client_id" , "4qf3c6o1kvo4ufph9jfujamiug");
                form.append("refresh_token" , refreshToken);
                
                http.request({
                    url: "https://shyft-auto.auth.us-east-1.amazoncognito.com/oauth2/token",
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization" : "Basic NHFmM2M2bzFrdm80dWZwaDlqZnVqYW1pdWc6MXNoN3EwaDIzZmNwa2Y0NmdxbTM5ZGJnM2g2aGI1aGNjdHNocXRiaG1lNzA0Y2JtMzIxZw=="
                     },
                    content: form
            
                }).then((response) => {
                    console.log("refreshed tokens are : ", response.content)  
                    let tokens1 = JSON.stringify(response.content)                        
                    let initial_idToken = tokens1.substr((tokens1.search("id_token") + 11))
                    let final_idToken = initial_idToken.substr(0, initial_idToken.indexOf('"'))
                    console.log("id_token is : ", final_idToken)
                    ApplicationSettings.setString("TOKEN", JSON.stringify(final_idToken));
                    ApplicationSettings.setString("IOSToken", JSON.stringify(final_idToken));
                }, (e) => {
                    console.log("Error occurred in refreshing tokens are : : " + e);
                });
            }

    onTap() {
        this.createUser();
        if (!this.firstname || !this.lastname) {
            alert("Enter Firstname and Lastname to Proceed........")
        }
        else {
            console.log("User Registered with details ----> ", this.firstname, this.lastname);
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "firstname": this.firstname,
                    "lastname": this.lastname,
                }
            };
            this.routerExtensions.navigate(["/addcar"], navigationExtras);
        }
    }
}
