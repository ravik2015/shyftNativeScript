import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import * as platformModule from "tns-core-modules/platform";
import * as dialogs from "ui/dialogs";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { SelectServiceModalComponent } from "./selectservicemodal";
import { DrawerTransitionBase, SlideInOnTopTransition, SideDrawerLocation } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { SelectService } from "./selectservice.services";
import * as ApplicationSettings from "application-settings";
import { isAndroid, isIOS, device, screen } from "platform";
import * as Phone from 'nativescript-phone';
var platform = require("platform");
var application = require("application");


@Component({
    selector: "Selectservice",
    moduleId: module.id,
    styleUrls: ['selectservice.css'],
    templateUrl: "./selectservice.component.html",
    providers: [SelectService]

})
export class SelectserviceComponent implements OnInit {
    public state1 = true;
    public state2 = true;
    public state3 = true;
    public state4 = true;
    public state5 = true;
    public state6 = true;
    public state7 = true;
    public state8 = true;
    public servicesstate = true;
    public buttonstate = true;
    public appointmentUUID;
    public vehicleID;
    public vendorID;
    public deliveryfee;
    public vendorServices = Array();
    public selectedServices = Array();
    public user;
    public datastate = true;
    private vendorLogo;
    private vendorName;
    private vendorPhone;
    private vendorEmail;
    private vendorAddress = Object();
    private vendorCategories = Array();

    public constructor(private router: Router, private route: ActivatedRoute, private _page: Page, private modal: ModalDialogService, private vcRef: ViewContainerRef, private selectService: SelectService, private routerExtension: RouterExtensions) {

        if (this.route.queryParams) {
            this.route.queryParams.subscribe(params => {
                this.vendorID = params["serviceID"]
                this.vehicleID = params["vehicleID"]
                this.appointmentUUID = params["appointmentUUID"]
                this.deliveryfee = params["deliveryfee"]

            });
        }
        let vendor = JSON.parse(ApplicationSettings.getString("vendor"))
        this.vendorName = vendor.name;
        this.vendorEmail = vendor.email;
        this.vendorPhone = vendor.phoneNumber;
        this.vendorLogo = vendor.logo
        this.vendorAddress = vendor.location.address;
        this.user = JSON.parse(ApplicationSettings.getString("user", "{}"))
        if (this.vendorCategories.length > 0) {
            console.log("if", this.vendorCategories.length)
            this.buttonstate = true;
        }
        else {
            console.log("else", this.vendorCategories.length)
            this.buttonstate = false;
        }

    }

    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    ngOnInit(): void {
        this._page.actionBarHidden = true;
        this.getServiceStation();
        // this.createAppointment();

        this.user = JSON.parse(ApplicationSettings.getString("user", "{}"))
        ApplicationSettings.setString("vendorLogo", JSON.stringify(this.vendorLogo))
    }


    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }


    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }


    public getServiceStation() {
        this.selectService.servicesGet(this.vendorID)
            .subscribe((result) => {
                result.categories.map((category) => {
                    console.log("Category : ", JSON.stringify(category))
                    this.vendorCategories.push(category)
                    // category.services.map((service) => {
                    //     console.log("Services : ", JSON.stringify(service))        
                    //     this.vendorServices.push(service)                  
                    // })       
                    this.buttonstate = true;
                })
                this.datastate = false;
            }, (error) => {
                console.log("Vendor Details Get Error : ", error)
            });
    }

    public createAppointment() {
        this.selectService.createCustomerAppointment(this.appointmentUUID, this.vendorID)
    }


    vehicleHistory() {
        // this.state1 = !this.state1
        // setTimeout(() => {
        //     this.state1 = true;
        // }, 1000);
        // this.router.navigate(["appointmentlisting"]);
                this.router.navigate(["status"]);
    }

    vehicleService() {
                this.createAppointment();

        setTimeout(() => {
            this.state2 = true;
        }, 1000);
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "appointmentUUID": this.appointmentUUID,
                "vendorCategories": JSON.stringify(this.vendorCategories),
                "vendorID": this.vendorID,
                "vehicleID": this.vehicleID,
                "deliveryfee": this.deliveryfee
            }
        };
        this.router.navigate(["servicecategory"], navigationExtras);
    }

    vehicleHealth() {
        this.state3 = !this.state3
        setTimeout(() => {
            this.state3 = true;
        }, 1000);
    }

    checkForRecalls() {

    }

    valueInventory() {
        this.state5 = !this.state5
        setTimeout(() => {
            this.state5 = true;
        }, 1000);
    }

    warranties() {
        this.state6 = !this.state6
        setTimeout(() => {
            this.state6 = true;
        }, 1000);
    }

    navigation() {
        this.state7 = !this.state7
        setTimeout(() => {
            this.state7 = true;
        }, 1000);
    }

    priceVehicleRepairs() {
        this.state8 = !this.state8
        setTimeout(() => {
            this.state8 = true;
        }, 1000);
    }

    back() {
        this.routerExtension.back();
    }

    callDealer() {
        Phone.dial(this.vendorPhone, true);
    }

    scheduleService() {
        this.routerExtension.navigate(["/carlist"], { clearHistory: true });
    }
}