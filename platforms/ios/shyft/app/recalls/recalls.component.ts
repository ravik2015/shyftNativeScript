
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { RecallsService } from "./recalls.service";
import { Page, ShownModallyData, NavigatedData } from "tns-core-modules/ui/page";
import * as ApplicationSettings from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    selector: "Recalls",
    moduleId: module.id,
    styleUrls: ['recalls.css'],
    templateUrl: "./recalls.component.html"
})
export class RecallsComponent implements OnInit {

    public datastate = true;    
    public vehicle;
    public constructor(private router: Router, private _page: Page, private recallsService: RecallsService, private route: ActivatedRoute, private routerExtensions: RouterExtensions) {

    }

    ngOnInit(){
        this._page.actionBarHidden = true;        
        this.getVehicle();
    }  

    public getVehicle() {
        this.recallsService.vehicle()
            .subscribe((result) => {
                    this.datastate = false;                
                    console.log("Vehicle listing Get success ---->", JSON.stringify(result))
                    this.vehicle = result;
            }, (error) => {
                console.log("vehicle listing Error---->", error)
            });
    }

    public itemTapped(args, data, index) {
        console.log(" Tapped From List------------------>" + index + JSON.stringify(data));
    }


    onBack() {
        this.routerExtensions.backToPreviousPage();
    }

}

