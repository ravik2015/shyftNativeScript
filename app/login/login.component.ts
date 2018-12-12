import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { Page, ShownModallyData, NavigatedData } from "tns-core-modules/ui/page";
import { setInterval, setTimeout, clearInterval } from "timer";
import { WebView, LoadEventData } from "ui/web-view";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { LoginModalComponent } from "./loginmodal";
import { SignupModalComponent } from "./signupmodal";
import * as ApplicationSettings from "application-settings";
import * as utils from "utils/utils";
import { UUID } from 'angular2-uuid';
import { confirm } from "ui/dialogs";
import { isAndroid, isIOS, device, screen } from "platform";
import * as app from 'application';
declare var NSURLCache;

// import { FuturedmsShyftApiClientModule, Configuration, AdminApi, ClientApi,  BASE_PATH } from '@klouddms/futuredms-shyft-api-client';

var jwt_decode = require('jwt-decode');

declare var android: any;

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

    public loginstate;
    public username;
    public state = false;
    public data;
    public token: string;
    public firstname;
    public lastname;
    public id_token;


    constructor(private router: Router, private route: ActivatedRoute, private _page: Page, private modal: ModalDialogService, private vcRef: ViewContainerRef) {
        if (isAndroid) {
            // prevent the soft keyboard from showing initially when textfields are present
            app.android.startActivity.getWindow().setSoftInputMode(
                android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
        }
        // console.log(" Vendorid : " + ApplicationSettings.getString("vendorid"), " appointmemtid : " + ApplicationSettings.getString("appointmentid"), " vehicle id : " + ApplicationSettings.getString("vehicleid"))
        // console.log(" Services : " + ApplicationSettings.getString("services"), " Total cost : " + ApplicationSettings.getNumber("totalcost"), " deliveryfee : " + ApplicationSettings.getString("deliveryfee"))
        // if (ApplicationSettings.getString("vehicleid") != undefined && ApplicationSettings.getString("vehicleid") != 'null') {
        //     if (ApplicationSettings.getString("vehicleid") != undefined && ApplicationSettings.getNumber("totalcost") > 0) {
        //         let navigationExtras: NavigationExtras = {
        //             queryParams: {
        //                 "services": ApplicationSettings.getString("services"),
        //                 "totalcost": ApplicationSettings.getNumber("totalcost"),
        //                 "vendorID": ApplicationSettings.getString("vendorid"),
        //                 "vehicleID": ApplicationSettings.getString("vehicleid"),
        //                 "appointmentUUID": ApplicationSettings.getString("appointmentid"),
        //                 "deliveryfee": ApplicationSettings.getString("deliveryfee")
        //             }
        //         };
        //         this.router.navigate(["pickup"], navigationExtras);
        //     }
        //     else if (ApplicationSettings.getString("vehicleid") != undefined && ApplicationSettings.getString("vendorid") != 'null') {
        //         let navigationExtras: NavigationExtras = {
        //             queryParams: {
        //                 "appointmentUUID": ApplicationSettings.getString("appointmentid"),
        //                 "vehicleID": ApplicationSettings.getString("vehicleid"),
        //                 "serviceID": ApplicationSettings.getString("vendorid"),
        //                 "deliveryfee": ApplicationSettings.getString("deliveryfee")
        //             }
        //         };
        //         this.router.navigate(["selectservice"], navigationExtras);
        //     }
        //     else if (ApplicationSettings.getString("vehicleid") != undefined && ApplicationSettings.getString("vehicleid") != 'null') {
        //         let navigationExtras: NavigationExtras = {
        //             queryParams: {
        //                 "vehicle": JSON.parse(ApplicationSettings.getString("vehicleid")),
        //             }
        //         };
        //         this.router.navigate(["vendorlist"], navigationExtras);
        //     }
        // }
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
        // this.createAppointment()
        console.log("tokens", ApplicationSettings.getString("TOKEN", "{}"))
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"))
        let decoded = jwt_decode(this.id_token);
        ApplicationSettings.setString("user", JSON.stringify(decoded.given_name));
        ApplicationSettings.setString("email", JSON.stringify(decoded.email));


        console.log(" Decoded ID Token is : ", JSON.stringify(decoded))
        ApplicationSettings.setString("USER", JSON.stringify(decoded));

        this.username = decoded.given_name
        if (this.username) {
            this.state = true;
        }
        else {
            this.state = false;
        }
    }


    // createAppointment(){   let uuid = UUID.UUID();        

    //     let date = new Date();
    //     let isoDate = date.toISOString();

    //     const appointmentModel = {
    //         "id": uuid,
    //         "datetime": isoDate,
    //         "status": "Pending",
    //         "vendor": "ceda87fc-b51e-11e7-aa7a-12c20b01dc5a"
    //     }
    //     console.log("Appointment Model is ", JSON.stringify(appointmentModel))
    //     let token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"))

    //     this.clientApi.appointmentAppointmentIdPut(uuid, appointmentModel,token.toString())
    //     .subscribe((result) => {
    //         console.log("Success  >"+ result)
    //     }, (error) => {
    //         console.log("Error  >"+ error)
    //     });

    //     console.log("Auth Token :::::", token.toString())
    //     this.adminApi.fleetGet("eyJraWQiOiJZbDJabG5OYjc5XC9FaFVXcFFsQjRpTGdaQjBybEJSeGRJNnhIcW41cG9QOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3Y2NjZjNkMi1hZDNkLTQ0NGQtYWRkYi0yZjhhY2MzNWVjYWYiLCJjb2duaXRvOmdyb3VwcyI6WyJjdXN0b21lciJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNUxVMjM2dERJIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6IjdjY2NmM2QyLWFkM2QtNDQ0ZC1hZGRiLTJmOGFjYzM1ZWNhZiIsImdpdmVuX25hbWUiOiJSYXZpIiwiYXVkIjoiNTFsdmtxdmdxMjI4Y2wzNzFtdmo0M2djYXIiLCJldmVudF9pZCI6IjUzZWEwMTY0LTI1ZDAtMTFlOC05MWFiLTQ1Y2ZjNGQ2OTk1MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTIwODQzNzMyLCJwaG9uZV9udW1iZXIiOiIrOTE5OTk3NDA3NDczIiwiZXhwIjoxNTIwODQ3MzMyLCJpYXQiOjE1MjA4NDM3MzIsImZhbWlseV9uYW1lIjoiS3VtYXIiLCJlbWFpbCI6InJhdml6QHlvcG1haWwuY29tIn0.Ya7WWBgNNdl9S7qVTQ44Gw3tSvxb922ZTtMMubbxnAp-pwiTm3ZbclCKinNVRdA5EZ2OA33D9RvwZ5WaHZbvUj0jpLdJz2G51wPgEbbpG5kNOOndkvGvTXT_S3hgpjtWdJwa0u9znlbjWMSonbLRJw0CNz51BTK50KkW0OitAdIlTvMqgDl-5TLVE0Uy3cujAXPSxInZ78mjR-ifr0Tgx1Q7UZf24H12LJGpSj8xmI3cHg-BHzVKnzoJb0nbqXynL01Htw915bbtO8RMfH3MFS0SwxH91kwbYwUsX81imXjwHhAQCoc2AvF_Ix_jN7a_9rt9drbXsiPELOBkR5Nv4g")
    //     .subscribe((result) => {
    //         console.log("Fleet Get Result : ", JSON.stringify(result))
    //     }, (error) => {
    //         console.log("Fleet Get Error : ", error)                
    //     }); 
    // }

    public login() {
        this.router.navigate(["/carlist"]);
    }

    public awsLogin() {
        ApplicationSettings.clear();
        this.loginstate = true;
        let options = {
            context: {},
            height: 100,
            fullscreen: true,
            viewContainerRef: this.vcRef,
        };

        this.modal.showModal(LoginModalComponent, options).then(res => {
            if (res == null) {
                this.loginstate = false
            }
            else {
                console.log("After login ---> ", res)

                this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"))
                let deco = jwt_decode(this.id_token);
                this.username = deco.given_name;
                ApplicationSettings.setString("user", JSON.stringify(deco.given_name))
                this.loginstate = false
                this.state = true;
            }
        });
    }

    public awsSignup() {
        // ApplicationSettings.setNumber("totalcost", 0)
        // ApplicationSettings.setString("vendorid", 'null')
        // ApplicationSettings.setString("vehicleid", 'null')
        // ApplicationSettings.setString("appointmentid", 'null')
        // ApplicationSettings.setString("deliveryfee", 'null')
        let options = {
            context: {},
            height: 100,
            fullscreen: true,
            viewContainerRef: this.vcRef,
        };

        this.modal.showModal(SignupModalComponent, options).then(res => {
            if (res == null) {
                this.loginstate = false
                alert("Signup Cancelled By User ...")
            }
            else {
                if (isIOS) {
                    this.id_token = JSON.parse(ApplicationSettings.getString("IOSToken", "{}"))
                }
                else {
                    this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"))
                }
                let deco = jwt_decode(this.id_token);
                ApplicationSettings.setString("USER", JSON.stringify(deco));
                this.username = deco.given_name;
                ApplicationSettings.setString("user", JSON.stringify(deco.given_name))
                this.loginstate = false
                this.state = true;
                this.router.navigate(["agreement"]);
            }
        });
    }

}
