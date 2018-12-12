import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as moment from 'moment';
import { AppointmentdataService } from "./appointmentdata.services";
import * as ApplicationSettings from "application-settings";
import { Page } from "ui/page";


@Component({
    selector: "Appointmentdata",
    moduleId: module.id,
    styleUrls: ['appointmentdata.css'],
    templateUrl: "./appointmentdata.component.html",
    providers: [AppointmentdataService]
})

export class AppointmentdataComponent implements OnInit {

    public appointments;
    public appointmentdata;
    public services;
    public todaysfee = 6.00;
    public totalservicecost;
    public totalspent;
    public servicestation = "Barber Hendrick Honda"
    public date;

    public constructor(private router: Router, private _page: Page, private appointmentdataService: AppointmentdataService, private route: ActivatedRoute, private routerExtensions: RouterExtensions) {
        this.route.queryParams.subscribe(params => {
            console.log('appointmentData -----> ' + JSON.parse(params["appointmentdata"]).vendor.name," and datetime is ",JSON.parse(params["appointmentdata"]).datetime )
            this.servicestation = JSON.parse(params["appointmentdata"]).vendor.name;
            this.date = moment(JSON.parse(params["appointmentdata"]).datetime).format("MMMM DD YYYY");
            
            this.appointmentdata = JSON.parse(params["appointmentdata"])
        });

    }

    ngOnInit() {
        this._page.actionBarHidden = true;                
        this.services = this.appointmentdata.serviceSelections;
        let price = 0;
        this.services.map((item) => {
            price = price + item.service.base_price;

        })
        this.totalservicecost = price;
        this.totalspent = (this.todaysfee) + (this.totalservicecost);
    }

    onBack() {
        this.routerExtensions.backToPreviousPage();
    }

}
