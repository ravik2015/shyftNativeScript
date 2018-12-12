import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Observable as RxObservable } from "rxjs/Observable";
import { Observable } from "rxjs/Rx";
import { CarlistService } from "./carlist.services";
import * as ApplicationSettings from "application-settings";
import { isAndroid, isIOS, device, screen } from "platform";
import { alert } from "ui/dialogs";

var http = require("http");

class ScreenInfo {
    constructor(
        public heightDIPs: number,
        public heightPixels: number,
        public scale: number,
        public widthDIPs: number,
        public widthPixels: number
    ) { }
}

@Component({
    selector: "Carlist",
    moduleId: module.id,
    styleUrls: ['carlist.css'],
    templateUrl: "./carlist.component.html",
    providers: [CarlistService]
})
export class CarlistComponent implements OnInit {
    public screenInformation: ScreenInfo;
    
    private vehicles = Array();
    public selectedIndexVehicle: number;
    public vehicle;
    public count = false;
    public vehicleLoader = true;
    public user;


    private frameworks = Array();
    public constructor(private router: Router, private route: ActivatedRoute, private _page: Page, private routerExtensions: RouterExtensions, private carlistService: CarlistService) {
        this.screenInformation = new ScreenInfo(
            screen.mainScreen.heightDIPs,
            screen.mainScreen.heightPixels,
            screen.mainScreen.scale,
            screen.mainScreen.widthDIPs,
            screen.mainScreen.widthPixels);
    
        console.log("screen Info : ", JSON.stringify(this.screenInformation))
    }

    ngOnInit(){
        this._page.actionBarHidden = true;      
        this.getVehicle();   
        this.user = JSON.parse(ApplicationSettings.getString("user", "{}"))       
    }

    public getVehicle() {	
        this.carlistService.fleetGet()
            .subscribe((result) => {
                console.log("Vehicle Get Result : ", JSON.stringify(result))        
                if(result.status == 403){
                    console.log("Token Expired .. . . .")
                    let refreshToken = JSON.parse(ApplicationSettings.getString("RefreshToken","{}"))
                    this.tokenRefresh(refreshToken)
                }   
                else if(result.length < 1){
                    this.router.navigate(["addcar"])
                }   
                else{
                    this.vehicleLoader = false;
                    this.vehicles = result;
                }
            }, (error) => {
                alert("Something went wrong .....")
                this.router.navigate(["login"])
                
                console.log("Vehicle Get Error :", error)
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
            let tokens1 = JSON.stringify(response.content)                        
            let initial_idToken = tokens1.substr((tokens1.search("id_token") + 11))
            let final_idToken = initial_idToken.substr(0, initial_idToken.indexOf('"'))
            console.log("Id token is : ", final_idToken)
            ApplicationSettings.setString("TOKEN", JSON.stringify(final_idToken));
            ApplicationSettings.setString("IOSToken", JSON.stringify(final_idToken));
            this.getVehicle()
        }, (e) => {
            console.log("Error occurred in refreshing tokens are : : " + e);
        });
    }

    
    onVehicleTap(args) {
        this.selectedIndexVehicle = args.index;
        let tappedView = args.view,
        tappedVehicle = tappedView.bindingContext;
        console.log("Selected Vehicle is : " + args.index + " . " + JSON.stringify(tappedVehicle))
        this.vehicle = JSON.stringify(tappedVehicle.id)
        ApplicationSettings.setString("vehicleid", JSON.stringify(tappedVehicle.id))
        
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "vehicle": JSON.parse(this.vehicle),
            }
        };
            this.router.navigate(["vendorlist"], navigationExtras);
    }


    public submit(res: string) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
    
            }
        };
            this.router.navigate(["pickup"], navigationExtras);
    }


    close(){
        this.routerExtensions.back();
    }

    addCar(){
        this.router.navigate(["/addcar"])
    }
}
