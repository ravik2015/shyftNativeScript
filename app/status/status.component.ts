import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as moment from 'moment';
import { StatusService } from "./status.services";
import * as ApplicationSettings from "application-settings";
import { Page } from "ui/page";
import * as Phone from 'nativescript-phone';
import { Observable } from "tns-core-modules/data/observable";
import { Color } from "tns-core-modules/color";
import { isIOS, isAndroid } from "tns-core-modules/platform";
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";
import { confirm } from "ui/dialogs";

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
    selector: "Status",
    moduleId: module.id,
    styleUrls: ['status.css'],
    templateUrl: "./status.component.html",
    providers: [StatusService]
})

export class StatusComponent implements OnInit {

    private vendorLogo;
    private vendorName;
    private vendorPhone;
    private vendorEmail;
    private vendorAddress = Object();
    private appointmentVisible = false;

    public constructor(private router: Router, private _page: Page, private statusService: StatusService, private route: ActivatedRoute, private routerExtensions: RouterExtensions) {
        console.log("status appointment id ", ApplicationSettings.getString("deliveryfee"))
        this.route.queryParams.subscribe(params => {
        });
        if (isIOS) {
            TNSFancyAlert.hideAnimationType =
                TNSFancyAlert.HIDE_ANIMATION_TYPES.SlideOutToBottom;
        }

        let vendor = JSON.parse(ApplicationSettings.getString("vendor"))
        this.vendorName = vendor.name;
        this.vendorEmail = vendor.email;
        this.vendorPhone = vendor.phoneNumber;
        this.vendorLogo = vendor.logo
        this.vendorAddress = vendor.location.address;
        if (ApplicationSettings.getNumber("totalcost") > 0) {
            this.appointmentVisible = !this.appointmentVisible;
        }
    }

    ngOnInit() {
        this._page.actionBarHidden = true;

    }

    onBack() {
        this.routerExtensions.backToPreviousPage();
    }

    dashboard() {
        this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });
    }

    public cancelAppointment() {
        console.log("***** Appointment Cancelled *****", ApplicationSettings.getString("appointmentid"))
        if (ApplicationSettings.getString("appointmentid") != 'null') {
            let options = {
                title: "Appointment",
                message: "Are you sure you want to Cancel this Appointment?",
                okButtonText: "Yes",
                cancelButtonText: "Cancel",
            };

            confirm(options).then((result: boolean) => {
                console.log(result);
                if (result === true) {
                    this.statusService.cancelAppointment()
                        .subscribe((result) => {
                            console.log("Appointment Cancel Success : ", (JSON.stringify(result)))

                            ApplicationSettings.setNumber("totalcost", 0)
                            ApplicationSettings.setString("vendorid", 'null')
                            ApplicationSettings.setString("vehicleid", 'null')
                            ApplicationSettings.setString("appointmentid", 'null')
                            ApplicationSettings.setString("deliveryfee", 'null')
                            this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });
                        }, (error) => {
                            console.log("Appointment Cancel Error : ", error)
                            TNSFancyAlert.showError(
                                "Appointment!",
                                "Appointment Cancelled",
                                "Ok"
                            );
                            ApplicationSettings.setNumber("totalcost", 0)
                            ApplicationSettings.setString("vendorid", 'null')
                            ApplicationSettings.setString("vehicleid", 'null')
                            ApplicationSettings.setString("appointmentid", 'null')
                            ApplicationSettings.setString("deliveryfee", 'null')
                            this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });
                        });
                }
            });
        }
        else {
            if (isIOS) {
                TNSFancyAlert.showAnimationType =
                    SCLAlertViewShowAnimation.SlideInFromBottom;
                TNSFancyAlert.hideAnimationType =
                    SCLAlertViewHideAnimation.SlideOutToRight;
            }
            TNSFancyAlert.showInfo(
                "Appointment",
                `You have no Current Appointment to be Cancelled.`,
                "Ok"
            );
            if (isIOS) {
                this.reset();
            }
        }
    }


    callDealer() {
        Phone.dial(this.vendorPhone, true);
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
