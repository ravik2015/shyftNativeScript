import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { VendorlistService } from "./vendorlist.services";
import { Location, getCurrentLocation, isEnabled, distance, enableLocationRequest } from "nativescript-geolocation";
import { alert } from "ui/dialogs";
import { UUID } from 'angular2-uuid';
import * as ApplicationSettings from "application-settings";
import { isAndroid, isIOS, device, screen } from "platform";

@Component({
    selector: "Vendorlist",
    moduleId: module.id,
    styleUrls: ['vendorlist.css'],
    templateUrl: "./vendorlist.component.html",
    providers: [VendorlistService]
})
export class VendorlistComponent implements OnInit {

    public selectedIndexService: number;
    public Longitude: number = 0;
    public Latitude: number = 0;
    public vendor;
    public vendorLoader = true;    
    public user;
    public vehicleID;
    private vendors = Array();
    private deliveryfee;
    private vendorLogo;

    public constructor(private router: Router, private route: ActivatedRoute, private _page: Page, private routerExtensions: RouterExtensions, private vendorlistService: VendorlistService) {
        enableLocationRequest(true);        
        this.route.queryParams.subscribe(params => {
            console.log("Vehicle --------->" + params["vehicle"])
            this.vehicleID = params["vehicle"]
        });

        ApplicationSettings.setString("buttonstate", "true")
        
    }

    ngOnInit(){
        this._page.actionBarHidden = true;      
        this.isLocationEnabled();        
        this.getServiceStation();
  

        this.user = JSON.parse(ApplicationSettings.getString("user", "{}"))
    }

    public isLocationEnabled() {
        let isEnabledProperty = isEnabled();
        let message = "Not able to find Location please Enter Your Location";
        if (!isEnabledProperty) {
            console.log(message);
        } else {
            message = "Location services available";
            this.getLocationOnce();
        }
    }

    public getLocationOnce() {
        getCurrentLocation(
            {
                desiredAccuracy: 50,
                timeout: 20000
            }
        )
            .then(location => {
                console.log("Location received --------------------> " + JSON.stringify(location));
                this.Longitude = location.longitude;
                this.Latitude = location.latitude;


            }).catch(error => {
                console.log("Location error received: " + error);
            });
    }


    public getServiceStation() {
        this.vendorlistService.vendorGet()
            .subscribe((result) => {
                    result.map((item) => {
                        this.vendorLoader = false;
                        if(item)
                            {
                            this.vendors.push(item);              
                            console.log("vendor --> ", JSON.stringify(item))                 
                            }
                        else{
                            let options = {
                                title: "Vendor Error",
                                message: "No Vendors Found",
                                okButtonText: "OK"
                            };
                            alert(options).then(() => {
                                this.router.navigate(["login"]);                        
                            });
                        }
                    });
            }, (error) => {
                console.log("Service Station's Get Error ---- >", error)
            });
    }

    onServiceCentreTap(args) {
        this.selectedIndexService = args.index;
        let appointmentUUID = UUID.UUID();        
        let tappedView = args.view,
            tappedService = tappedView.bindingContext;
        console.log("Selected Vendor is :  " + args.index + " . " + JSON.stringify(tappedService))
        this.vendor = tappedService.id
        this.vendorLogo = tappedService.logo
        ApplicationSettings.setString("deliveryfee",JSON.stringify(tappedService.deliveryPrice))
        ApplicationSettings.setString("vendorLogo", JSON.stringify(tappedService.logo))        
        ApplicationSettings.setString("vendor", JSON.stringify(tappedService))
        ApplicationSettings.setString("appointmentid", JSON.stringify(appointmentUUID))
        ApplicationSettings.setString("vendorid", JSON.stringify(tappedService.id)) 
        ApplicationSettings.setString("vendorToCancel", JSON.stringify(tappedService.id))                    
        this.deliveryfee = JSON.stringify(tappedService.deliveryPrice)
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "appointmentUUID": appointmentUUID,
                "vehicleID": this.vehicleID,
                "serviceID": this.vendor,
                "deliveryfee": this.deliveryfee,
            }
        };
            this.router.navigate(["selectservice"], navigationExtras);
    }

    public submit(res: string) {
  
        

    }
    
    public onPullToRefreshInitiated(args){
        console.log(" ******** onPullToRefreshInitiated ********* ")
    }

    close(){
        this.routerExtensions.backToPreviousPage();
    }

}
