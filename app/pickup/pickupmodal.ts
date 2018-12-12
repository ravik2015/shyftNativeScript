import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Router, ActivatedRoute } from "@angular/router";
import { Switch } from "ui/switch";
import { RouterExtensions } from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";
import * as moment from 'moment';
import { PickupService } from "./pickup.services";


@Component({
    selector: "my-pickupmodal",
    templateUrl: "pickupmodal.html",
    providers: [PickupService]
})
export class PickupModalComponent implements OnInit {

    public clientToken;
    public firstSwitchState = "OFF";
    public totalCost = 0;
    public vendorID;
    public vehicleID;
    public status: Boolean;
    public services = Array();
    public address;
    public time = moment(JSON.parse(ApplicationSettings.getString("appointmentDate","{}"))).format("hh:mm a");
    public servicecost;
    public totalcost = 58.93;
    public todaysFee = 5.48;
    public frameworks;

    @ViewChild("CB1") CheckBox: ElementRef;
    
    public constructor(private params: ModalDialogParams, private router: Router, private route: ActivatedRoute, private routerExtensions: RouterExtensions, private pickupService: PickupService) {
        // this.getcurrentAppointment()
        this.address = params.context.address;
        this.frameworks = params.context.services;
        this.todaysFee = parseInt(params.context.deliveryfee);
        this.servicecost = parseInt(params.context.servicecost);
        this.totalcost = (this.servicecost) + (this.todaysFee);
        this.vendorID = params.context.vendor;
        this.vehicleID = params.context.vehicle;
        this.clientToken = params.context.clientToken
    }

    ngOnInit() {
    }

    public getcurrentAppointment() {
        this.pickupService.currentAppointmentGet()
            .subscribe((result) => {
                    console.log("getcurrentAppointment Get success ---- >", JSON.stringify(result))
            }, (error) => {
                console.log("getcurrentAppointment Error ---- >", error)
            });
    }

    public close() {
        let res="closed"
        this.params.closeCallback(res);
    }

    public submit(res: string) {
        let appointmentdata = {
            "address": this.address,
            "time": this.time,
            "totalcost": this.totalcost,
            "todaysfee": this.todaysFee,
            "vendorid": this.vendorID,
            "vehicleid": this.vehicleID,
        }
        this.close();
        
        this.payment()
        ApplicationSettings.setString("APPOINTMENT", JSON.stringify(appointmentdata));
    }



    onAgree(){
        console.log('checked prop value : ' + this.CheckBox.nativeElement.checked); 
    }

    public payment() {
        if(this.CheckBox.nativeElement.checked)  
        {
             this.params.closeCallback("payment");
        }   
        else{
            alert("Please Check the agreement to proceed for Payment")
        }   
    }
    
}