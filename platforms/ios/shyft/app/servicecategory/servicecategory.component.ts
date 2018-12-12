import { Component, OnInit, Input, ChangeDetectionStrategy, ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, ShownModallyData, NavigatedData } from "tns-core-modules/ui/page";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import * as ApplicationSettings from "application-settings";
import { SelectService } from "../selectservice/selectservice.services";
import { SelectServiceModalComponent } from "../selectservice/selectservicemodal";
import { Label } from "ui/Label";
import { Switch } from "ui/switch";
import { isIOS, isAndroid } from "tns-core-modules/platform";
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";

declare var NSMutableAttributedString: any,
NSForegroundColorAttributeName: any,
NSCaseInsensitiveSearch: any,
NSUnderlineStyleSingle: any,
UIView: any,
CGRectMake: any,
SCLAlertViewShowAnimation: any,
SCLAlertViewHideAnimation: any,
SCLAlertViewBackground: any,
NSString: any,
NSUnderlineStyleAttributeName: any;

@Component({
    selector: "Servicecategory",
    moduleId: module.id,
    styleUrls: ['servicecategory.css'],
    templateUrl: "./servicecategory.component.html",
    providers: [SelectService]
})
export class ServicecategoryComponent implements OnInit {

    public SwitchState = "OFF";
    private vendorCategories = Array();
    private appointmentUUID;
    public vehicleID;
    public vendorID;
    public deliveryfee;
    private totalCost = 0;
    private vendorServices = Array();
    public selectedServices = Array();
    public items: any[];
    public isItemVisible = true;
    public constructor(private router: Router, private route: ActivatedRoute, private _page: Page, private modal: ModalDialogService, private vcRef: ViewContainerRef, private selectService: SelectService, private routerExtension: RouterExtensions) {

        if (this.route.queryParams) {
            this.route.queryParams.subscribe(params => {
                this.vendorCategories = JSON.parse(params["vendorCategories"])
                this.appointmentUUID = params["appointmentUUID"]
                this.vendorID = params["vendorID"]
                this.vehicleID = params["vehicleID"]
                this.deliveryfee = params["deliveryfee"]
            });
        }
        this.items = this.arrayTransform(this.vendorCategories)
    }


    ngOnInit(): void {
        this._page.actionBarHidden = true;

    }

    arrayTransform(categories) {
        let array = categories;
        array.map((item) => {
            item.services.map((x) => {
                console.log("here", x)
                x["state"] = false;

            })
        })

        return array;
    }

    listVisible() {
        this.isItemVisible = !this.isItemVisible
    }

    tapped(args, item, i) {   
        let Switch = <Switch>args.object;
        let index = i;
        item.state = !item.state;
        if (Switch.checked) {
            this.SwitchState = "ON";
            this.totalCost = this.totalCost + Math.round(item.base_price);
            console.log("index is : ", index)
            this.selectedServices.push(item)
            console.log("here", JSON.stringify(this.selectedServices))
        } else {
            this.SwitchState = "OFF";
            let del = this.selectedServices.findIndex(x => x.id==item.id);
            this.totalCost = this.totalCost - Math.round(item.base_price);
            this.selectedServices.splice(del, 1)
            console.log("here", JSON.stringify(this.selectedServices))
            
        }
    }

    onBack() {
        this.routerExtension.backToPreviousPage();
    }


    // public vendorCategoryTap(args, index, item) {
    //     console.log("Selected Vendor is : " + item.services.length + " . " + JSON.stringify(item))

    //     if (item.services.length > 0) {
    //         item.services.map((service) => {
    //             console.log("Services : ", JSON.stringify(service))
    //             this.vendorServices.push(service)
    //         })

    //         let options = {
    //             context: { vendorServices: JSON.stringify(this.vendorServices), vendorID: this.vendorID, vehicleID: this.vehicleID, appointmentUUID: this.appointmentUUID, deliveryfee: this.deliveryfee },
    //             height: 100,
    //             fullscreen: true,
    //             viewContainerRef: this.vcRef,
    //         };

    //         this.modal.showModal(SelectServiceModalComponent, options).then(response => {
    //             console.log("modal console : ", JSON.stringify(response))
    //             response.map((item) => {
    //                 console.log("Selected Services : ", JSON.stringify(item.id))
    //                 this.selectService.serviceSelection(item.id, this.appointmentUUID)
    //                 let servArray = ApplicationSettings.getString("servicesSelections")
    //                 console.log("service length  : ", ApplicationSettings.getString("servicesSelections"))
    //             })
    //         });
    //     }
    //     else {
    //         alert("No Services Available in this Category")
    //     }

    // }

    proceedPickup() {
        if(this.selectedServices.length > 0){
            this.selectedServices.map((item) => {
            console.log("Selected Services : ", JSON.stringify(item.id))
            this.selectService.serviceSelection(item.id, this.appointmentUUID)
        })
        ApplicationSettings.setString("services", JSON.stringify(this.selectedServices))
        ApplicationSettings.setNumber("totalcost", this.totalCost)
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "services": ApplicationSettings.getString("services"),
                "totalcost": ApplicationSettings.getNumber("totalcost"),
                "vendorID": this.vendorID,
                "vehicleID": this.vehicleID,
                "appointmentUUID": this.appointmentUUID,
                "deliveryfee": this.deliveryfee
            }
        };
        this.router.navigate(["pickup"], navigationExtras);
    }
    else{
        if (isIOS) {
            TNSFancyAlert.showAnimationType =
              SCLAlertViewShowAnimation.SlideInFromBottom;
            TNSFancyAlert.hideAnimationType =
              SCLAlertViewHideAnimation.SlideOutToRight;
          }
          TNSFancyAlert.showInfo(
            "Select Service",
            `Atleast Select a Single Service to Proceed.`,
            "Ok"
          );
          if (isIOS) {
            this.reset();
          }
    }
    }

    reset() {
        setTimeout(() => {
          TNSFancyAlert.showAnimationType = undefined;
          TNSFancyAlert.hideAnimationType =
            TNSFancyAlert.HIDE_ANIMATION_TYPES.SlideOutToBottom;
          TNSFancyAlert.backgroundType = undefined;
          TNSFancyAlert.soundURL = undefined;
        }, 1000);
      }        
}
