import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { Page } from "ui/page";
import { AppointmentlistingService } from "./appointmentlisting.services";
import * as ApplicationSettings from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Appointmentlisting",
    moduleId: module.id,
    styleUrls: ['appointmentlisting.css'],
    templateUrl: "./appointmentlisting.component.html",
    providers: [AppointmentlistingService]
})

export class AppointmentlistingComponent implements OnInit {

    public appointments;
    public id;
    public services;
    public selectedAppointmentstate = false;
    public appointmentState = true;
    public isClassVisible = false;
    public count = 0;
    public datastate = true;

    public constructor(private router: Router, private _page: Page, private appointmentlistingService: AppointmentlistingService, private route: ActivatedRoute, private routerExtensions: RouterExtensions) {

    }

    ngOnInit(){
        this._page.actionBarHidden = true;        
        this.getVehicleHistory();
    }


    public getVehicleHistory() {
        this.appointmentlistingService.vehiclehistory()
            .subscribe((result) => {
                    this.datastate = false;
                    console.log("Vehiclehistory Get success ---- >", JSON.stringify(result))
                    this.appointments = result;
            }, (error) => {
                console.log("vehiclehistory Error ---- >", error)
            });
    }

    public itemTapped(args, data, index) {
        console.log(" Tapped From List------------------>" + index + JSON.stringify(data));
        this.services = data.serviceSelections;
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "appointmentdata": JSON.stringify(data),
            }
        };
        this.router.navigate(["appointmentdata"], navigationExtras);
    }

    public onDataTap(args) {
        this.selectedAppointmentstate = false;
        this.appointmentState = true;
    }

    onBack() {
        this.routerExtensions.backToPreviousPage();
    }

}
