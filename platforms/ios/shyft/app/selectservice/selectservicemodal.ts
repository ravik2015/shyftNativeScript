import { Component, ElementRef, ViewChild } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { Switch } from "ui/switch";
import * as ApplicationSettings from "application-settings";


@Component({
    selector: "my-modal",
    templateUrl: "selectservicemodal.html",
})
export class SelectServiceModalComponent {


    public SwitchState = "OFF";
    public totalCost =  ApplicationSettings.getNumber("totalcost");
    public appointmentUUID;
    public vendorID;
    public vehicleID;
    public status: Boolean;
    public selectedServices = Array();
    public state = false;
    public deliveryfee;

    @ViewChild("CB1") CheckBox: ElementRef;


    private frameworks = Array();
    public constructor(private params: ModalDialogParams, private router: Router, private route: ActivatedRoute) {      
        this.frameworks = JSON.parse(params.context.vendorServices);
        this.vendorID = params.context.vendorID;
        this.vehicleID = params.context.vehicleID;
        this.appointmentUUID = params.context.appointmentUUID;
        this.deliveryfee = params.context.deliveryfee;
        console.log("constructor service : ", this.totalCost)
    }

    public close(res: string) {
        this.params.closeCallback(this.totalCost);
    }

    public submit(res: string) {
        ApplicationSettings.setString("services", JSON.stringify(this.selectedServices))
        ApplicationSettings.setNumber("totalcost", this.totalCost)
        // let navigationExtras: NavigationExtras = {
        //     queryParams: {
        //         "services": JSON.stringify(this.selectedServices),
        //         "totalcost": this.totalCost,
        //         "vendorID": this.vendorID,
        //         "vehicleID": this.vehicleID,
        //         "appointmentUUID": this.appointmentUUID,
        //         "deliveryfee": this.deliveryfee
        //     }
        // };
        this.params.closeCallback(this.selectedServices);
        // this.router.navigate(["pickup"], navigationExtras);
    }

    public onCheck(args, item, index) {
        let Switch = <Switch>args.object;
        if (Switch.checked) {
            this.SwitchState = "ON";
            this.totalCost = this.totalCost + Math.round(item.base_price);
            this.selectedServices.push(item)
        } else {
            this.SwitchState = "OFF";
            this.totalCost = this.totalCost - Math.round(item.base_price);
            console.log("index is : ", index)
            this.selectedServices.splice(index,1)
        }
    }

}