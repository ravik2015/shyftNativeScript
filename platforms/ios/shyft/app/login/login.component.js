"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var loginmodal_1 = require("./loginmodal");
var signupmodal_1 = require("./signupmodal");
var ApplicationSettings = require("application-settings");
var platform_1 = require("platform");
var app = require("application");
// import { FuturedmsShyftApiClientModule, Configuration, AdminApi, ClientApi,  BASE_PATH } from '@klouddms/futuredms-shyft-api-client';
var jwt_decode = require('jwt-decode');
var LoginComponent = (function () {
    function LoginComponent(router, route, _page, modal, vcRef) {
        this.router = router;
        this.route = route;
        this._page = _page;
        this.modal = modal;
        this.vcRef = vcRef;
        this.state = false;
        if (platform_1.isAndroid) {
            // prevent the soft keyboard from showing initially when textfields are present
            app.android.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
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
    LoginComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        // this.createAppointment()
        console.log("tokens", ApplicationSettings.getString("TOKEN", "{}"));
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var decoded = jwt_decode(this.id_token);
        ApplicationSettings.setString("user", JSON.stringify(decoded.given_name));
        ApplicationSettings.setString("email", JSON.stringify(decoded.email));
        console.log(" Decoded ID Token is : ", JSON.stringify(decoded));
        ApplicationSettings.setString("USER", JSON.stringify(decoded));
        this.username = decoded.given_name;
        if (this.username) {
            this.state = true;
        }
        else {
            this.state = false;
        }
    };
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
    LoginComponent.prototype.login = function () {
        this.router.navigate(["/carlist"]);
    };
    LoginComponent.prototype.awsLogin = function () {
        var _this = this;
        ApplicationSettings.clear();
        this.loginstate = true;
        var options = {
            context: {},
            height: 100,
            fullscreen: true,
            viewContainerRef: this.vcRef,
        };
        this.modal.showModal(loginmodal_1.LoginModalComponent, options).then(function (res) {
            if (res == null) {
                _this.loginstate = false;
            }
            else {
                console.log("After login ---> ", res);
                _this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
                var deco = jwt_decode(_this.id_token);
                _this.username = deco.given_name;
                ApplicationSettings.setString("user", JSON.stringify(deco.given_name));
                _this.loginstate = false;
                _this.state = true;
            }
        });
    };
    LoginComponent.prototype.awsSignup = function () {
        var _this = this;
        // ApplicationSettings.setNumber("totalcost", 0)
        // ApplicationSettings.setString("vendorid", 'null')
        // ApplicationSettings.setString("vehicleid", 'null')
        // ApplicationSettings.setString("appointmentid", 'null')
        // ApplicationSettings.setString("deliveryfee", 'null')
        var options = {
            context: {},
            height: 100,
            fullscreen: true,
            viewContainerRef: this.vcRef,
        };
        this.modal.showModal(signupmodal_1.SignupModalComponent, options).then(function (res) {
            if (res == null) {
                _this.loginstate = false;
                alert("Signup Cancelled By User ...");
            }
            else {
                if (platform_1.isIOS) {
                    _this.id_token = JSON.parse(ApplicationSettings.getString("IOSToken", "{}"));
                }
                else {
                    _this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
                }
                var deco = jwt_decode(_this.id_token);
                ApplicationSettings.setString("USER", JSON.stringify(deco));
                _this.username = deco.given_name;
                ApplicationSettings.setString("user", JSON.stringify(deco.given_name));
                _this.loginstate = false;
                _this.state = true;
                _this.router.navigate(["agreement"]);
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "Login",
            moduleId: module.id,
            templateUrl: "./login.component.html"
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, page_1.Page, dialogs_1.ModalDialogService, core_1.ViewContainerRef])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLDBDQUEyRTtBQUMzRSxpREFBaUY7QUFHakYsbUVBQTZFO0FBQzdFLDJDQUFtRDtBQUNuRCw2Q0FBcUQ7QUFDckQsMERBQTREO0FBSTVELHFDQUE0RDtBQUM1RCxpQ0FBbUM7QUFHbkMsd0lBQXdJO0FBRXhJLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQVN2QztJQVlJLHdCQUFvQixNQUFjLEVBQVUsS0FBcUIsRUFBVSxLQUFXLEVBQVUsS0FBeUIsRUFBVSxLQUF1QjtRQUF0SSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQVJuSixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBU2pCLEVBQUUsQ0FBQyxDQUFDLG9CQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ1osK0VBQStFO1lBQy9FLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBQ0QsK01BQStNO1FBQy9NLDJNQUEyTTtRQUMzTSx5SEFBeUg7UUFDekgsdUhBQXVIO1FBQ3ZILHFEQUFxRDtRQUNyRCw2QkFBNkI7UUFDN0IseUVBQXlFO1FBQ3pFLDJFQUEyRTtRQUMzRSx5RUFBeUU7UUFDekUsMkVBQTJFO1FBQzNFLHFGQUFxRjtRQUNyRiw4RUFBOEU7UUFDOUUsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYiw4REFBOEQ7UUFDOUQsUUFBUTtR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YztRQUwxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0FhOEIsZUFBTSxFQUFpQix1QkFBYyxFQUFpQixXQUFJLEVBQWlCLDRCQUFrQixFQUFpQix1QkFBZ0I7T0FaakosY0FBYyxDQWdMMUI7SUFBRCxxQkFBQztDQUFBLEFBaExELElBZ0xDO0FBaExZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSwgU2hvd25Nb2RhbGx5RGF0YSwgTmF2aWdhdGVkRGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IHNldEludGVydmFsLCBzZXRUaW1lb3V0LCBjbGVhckludGVydmFsIH0gZnJvbSBcInRpbWVyXCI7XG5pbXBvcnQgeyBXZWJWaWV3LCBMb2FkRXZlbnREYXRhIH0gZnJvbSBcInVpL3dlYi12aWV3XCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vbG9naW5tb2RhbFwiO1xuaW1wb3J0IHsgU2lnbnVwTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9zaWdudXBtb2RhbFwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJ1dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJ2FuZ3VsYXIyLXV1aWQnO1xuaW1wb3J0IHsgY29uZmlybSB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TLCBkZXZpY2UsIHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gJ2FwcGxpY2F0aW9uJztcbmRlY2xhcmUgdmFyIE5TVVJMQ2FjaGU7XG5cbi8vIGltcG9ydCB7IEZ1dHVyZWRtc1NoeWZ0QXBpQ2xpZW50TW9kdWxlLCBDb25maWd1cmF0aW9uLCBBZG1pbkFwaSwgQ2xpZW50QXBpLCAgQkFTRV9QQVRIIH0gZnJvbSAnQGtsb3VkZG1zL2Z1dHVyZWRtcy1zaHlmdC1hcGktY2xpZW50JztcblxudmFyIGp3dF9kZWNvZGUgPSByZXF1aXJlKCdqd3QtZGVjb2RlJyk7XG5cbmRlY2xhcmUgdmFyIGFuZHJvaWQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiTG9naW5cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgbG9naW5zdGF0ZTtcbiAgICBwdWJsaWMgdXNlcm5hbWU7XG4gICAgcHVibGljIHN0YXRlID0gZmFsc2U7XG4gICAgcHVibGljIGRhdGE7XG4gICAgcHVibGljIHRva2VuOiBzdHJpbmc7XG4gICAgcHVibGljIGZpcnN0bmFtZTtcbiAgICBwdWJsaWMgbGFzdG5hbWU7XG4gICAgcHVibGljIGlkX3Rva2VuO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgdGhlIHNvZnQga2V5Ym9hcmQgZnJvbSBzaG93aW5nIGluaXRpYWxseSB3aGVuIHRleHRmaWVsZHMgYXJlIHByZXNlbnRcbiAgICAgICAgICAgIGFwcC5hbmRyb2lkLnN0YXJ0QWN0aXZpdHkuZ2V0V2luZG93KCkuc2V0U29mdElucHV0TW9kZShcbiAgICAgICAgICAgICAgICBhbmRyb2lkLnZpZXcuV2luZG93TWFuYWdlci5MYXlvdXRQYXJhbXMuU09GVF9JTlBVVF9TVEFURV9ISURERU4pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIFZlbmRvcmlkIDogXCIgKyBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInZlbmRvcmlkXCIpLCBcIiBhcHBvaW50bWVtdGlkIDogXCIgKyBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcImFwcG9pbnRtZW50aWRcIiksIFwiIHZlaGljbGUgaWQgOiBcIiArIEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidmVoaWNsZWlkXCIpKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBTZXJ2aWNlcyA6IFwiICsgQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJzZXJ2aWNlc1wiKSwgXCIgVG90YWwgY29zdCA6IFwiICsgQXBwbGljYXRpb25TZXR0aW5ncy5nZXROdW1iZXIoXCJ0b3RhbGNvc3RcIiksIFwiIGRlbGl2ZXJ5ZmVlIDogXCIgKyBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcImRlbGl2ZXJ5ZmVlXCIpKVxuICAgICAgICAvLyBpZiAoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJ2ZWhpY2xlaWRcIikgIT0gdW5kZWZpbmVkICYmIEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidmVoaWNsZWlkXCIpICE9ICdudWxsJykge1xuICAgICAgICAvLyAgICAgaWYgKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidmVoaWNsZWlkXCIpICE9IHVuZGVmaW5lZCAmJiBBcHBsaWNhdGlvblNldHRpbmdzLmdldE51bWJlcihcInRvdGFsY29zdFwiKSA+IDApIHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIFwic2VydmljZXNcIjogQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJzZXJ2aWNlc1wiKSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIFwidG90YWxjb3N0XCI6IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0TnVtYmVyKFwidG90YWxjb3N0XCIpLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgXCJ2ZW5kb3JJRFwiOiBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInZlbmRvcmlkXCIpLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgXCJ2ZWhpY2xlSURcIjogQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJ2ZWhpY2xlaWRcIiksXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBcImFwcG9pbnRtZW50VVVJRFwiOiBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcImFwcG9pbnRtZW50aWRcIiksXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBcImRlbGl2ZXJ5ZmVlXCI6IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiZGVsaXZlcnlmZWVcIilcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH07XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wicGlja3VwXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGVsc2UgaWYgKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidmVoaWNsZWlkXCIpICE9IHVuZGVmaW5lZCAmJiBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInZlbmRvcmlkXCIpICE9ICdudWxsJykge1xuICAgICAgICAvLyAgICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAvLyAgICAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgXCJhcHBvaW50bWVudFVVSURcIjogQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJhcHBvaW50bWVudGlkXCIpLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgXCJ2ZWhpY2xlSURcIjogQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJ2ZWhpY2xlaWRcIiksXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBcInNlcnZpY2VJRFwiOiBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInZlbmRvcmlkXCIpLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgXCJkZWxpdmVyeWZlZVwiOiBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcImRlbGl2ZXJ5ZmVlXCIpXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9O1xuICAgICAgICAvLyAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInNlbGVjdHNlcnZpY2VcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgZWxzZSBpZiAoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJ2ZWhpY2xlaWRcIikgIT0gdW5kZWZpbmVkICYmIEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidmVoaWNsZWlkXCIpICE9ICdudWxsJykge1xuICAgICAgICAvLyAgICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAvLyAgICAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgXCJ2ZWhpY2xlXCI6IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJ2ZWhpY2xlaWRcIikpLFxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ2ZW5kb3JsaXN0XCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMuY3JlYXRlQXBwb2ludG1lbnQoKVxuICAgICAgICBjb25zb2xlLmxvZyhcInRva2Vuc1wiLCBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIlRPS0VOXCIsIFwie31cIikpXG4gICAgICAgIHRoaXMuaWRfdG9rZW4gPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiVE9LRU5cIiwgXCJ7fVwiKSlcbiAgICAgICAgbGV0IGRlY29kZWQgPSBqd3RfZGVjb2RlKHRoaXMuaWRfdG9rZW4pO1xuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcInVzZXJcIiwgSlNPTi5zdHJpbmdpZnkoZGVjb2RlZC5naXZlbl9uYW1lKSk7XG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiZW1haWxcIiwgSlNPTi5zdHJpbmdpZnkoZGVjb2RlZC5lbWFpbCkpO1xuXG5cbiAgICAgICAgY29uc29sZS5sb2coXCIgRGVjb2RlZCBJRCBUb2tlbiBpcyA6IFwiLCBKU09OLnN0cmluZ2lmeShkZWNvZGVkKSlcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJVU0VSXCIsIEpTT04uc3RyaW5naWZ5KGRlY29kZWQpKTtcblxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gZGVjb2RlZC5naXZlbl9uYW1lXG4gICAgICAgIGlmICh0aGlzLnVzZXJuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gY3JlYXRlQXBwb2ludG1lbnQoKXsgICBsZXQgdXVpZCA9IFVVSUQuVVVJRCgpOyAgICAgICAgXG5cbiAgICAvLyAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIC8vICAgICBsZXQgaXNvRGF0ZSA9IGRhdGUudG9JU09TdHJpbmcoKTtcblxuICAgIC8vICAgICBjb25zdCBhcHBvaW50bWVudE1vZGVsID0ge1xuICAgIC8vICAgICAgICAgXCJpZFwiOiB1dWlkLFxuICAgIC8vICAgICAgICAgXCJkYXRldGltZVwiOiBpc29EYXRlLFxuICAgIC8vICAgICAgICAgXCJzdGF0dXNcIjogXCJQZW5kaW5nXCIsXG4gICAgLy8gICAgICAgICBcInZlbmRvclwiOiBcImNlZGE4N2ZjLWI1MWUtMTFlNy1hYTdhLTEyYzIwYjAxZGM1YVwiXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJBcHBvaW50bWVudCBNb2RlbCBpcyBcIiwgSlNPTi5zdHJpbmdpZnkoYXBwb2ludG1lbnRNb2RlbCkpXG4gICAgLy8gICAgIGxldCB0b2tlbiA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJUT0tFTlwiLCBcInt9XCIpKVxuXG4gICAgLy8gICAgIHRoaXMuY2xpZW50QXBpLmFwcG9pbnRtZW50QXBwb2ludG1lbnRJZFB1dCh1dWlkLCBhcHBvaW50bWVudE1vZGVsLHRva2VuLnRvU3RyaW5nKCkpXG4gICAgLy8gICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzICA+XCIrIHJlc3VsdClcbiAgICAvLyAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yICA+XCIrIGVycm9yKVxuICAgIC8vICAgICB9KTtcblxuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIkF1dGggVG9rZW4gOjo6OjpcIiwgdG9rZW4udG9TdHJpbmcoKSlcbiAgICAvLyAgICAgdGhpcy5hZG1pbkFwaS5mbGVldEdldChcImV5SnJhV1FpT2lKWmJESmFiRzVPWWpjNVhDOUZhRlZYY0ZGc1FqUnBUR2RhUWpCeWJFSlNlR1JKTm5oSWNXNDFjRzlRT0QwaUxDSmhiR2NpT2lKU1V6STFOaUo5LmV5SnpkV0lpT2lJM1kyTmpaak5rTWkxaFpETmtMVFEwTkdRdFlXUmtZaTB5WmpoaFkyTXpOV1ZqWVdZaUxDSmpiMmR1YVhSdk9tZHliM1Z3Y3lJNld5SmpkWE4wYjIxbGNpSmRMQ0psYldGcGJGOTJaWEpwWm1sbFpDSTZkSEoxWlN3aWFYTnpJam9pYUhSMGNITTZYQzljTDJOdloyNXBkRzh0YVdSd0xuVnpMV1ZoYzNRdE1TNWhiV0Y2YjI1aGQzTXVZMjl0WEM5MWN5MWxZWE4wTFRGZk5VeFZNak0yZEVSSklpd2ljR2h2Ym1WZmJuVnRZbVZ5WDNabGNtbG1hV1ZrSWpwbVlXeHpaU3dpWTI5bmJtbDBienAxYzJWeWJtRnRaU0k2SWpkalkyTm1NMlF5TFdGa00yUXRORFEwWkMxaFpHUmlMVEptT0dGall6TTFaV05oWmlJc0ltZHBkbVZ1WDI1aGJXVWlPaUpTWVhacElpd2lZWFZrSWpvaU5URnNkbXR4ZG1keE1qSTRZMnd6TnpGdGRtbzBNMmRqWVhJaUxDSmxkbVZ1ZEY5cFpDSTZJalV6WldFd01UWTBMVEkxWkRBdE1URmxPQzA1TVdGaUxUUTFZMlpqTkdRMk9UazFNQ0lzSW5SdmEyVnVYM1Z6WlNJNkltbGtJaXdpWVhWMGFGOTBhVzFsSWpveE5USXdPRFF6TnpNeUxDSndhRzl1WlY5dWRXMWlaWElpT2lJck9URTVPVGszTkRBM05EY3pJaXdpWlhod0lqb3hOVEl3T0RRM016TXlMQ0pwWVhRaU9qRTFNakE0TkRNM016SXNJbVpoYldsc2VWOXVZVzFsSWpvaVMzVnRZWElpTENKbGJXRnBiQ0k2SW5KaGRtbDZRSGx2Y0cxaGFXd3VZMjl0SW4wLllhN1dXQmdOTmRsOVM3cVZUUTQ0R3czdFN2eGI5MjJaVHRNTXViYnhuQXAtcHdpVG0zWmJjbENLaW5OVlJkQTVFWjJPQTMzRDlSdndaNVdhSFpidlVqMGpwTGRKejJHNTF3UGdFYmJwRzVrTk9PbmRrdkd2VFhUX1MzaGdwanRXZEp3YTB1OXpubGJqV01Tb25iTFJKdzBDTno1MUJUSzUwS2tXME9pdEFkSWxUdk1xZ0RsLTVUTFZFMFV5M2N1akFYUFN4SW5aNzhtalItaWZyMFRneDFRN1VaZjI0SDEyTEpHcFNqOHhtSTNjSGctQkh6Vktuem9KYjBuYnFYeW5MMDFIdHc5MTViYnRPOFJNZkgzTUZTMFN3eEg5MWt3Yll3VXNYODFpbVhqd0hoQVFDb2MyQXZGX0l4X2pON2FfOXJ0OWRyYlhzaVBFTE9Ca1I1TnY0Z1wiKVxuICAgIC8vICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiRmxlZXQgR2V0IFJlc3VsdCA6IFwiLCBKU09OLnN0cmluZ2lmeShyZXN1bHQpKVxuICAgIC8vICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiRmxlZXQgR2V0IEVycm9yIDogXCIsIGVycm9yKSAgICAgICAgICAgICAgICBcbiAgICAvLyAgICAgfSk7IFxuICAgIC8vIH1cblxuICAgIHB1YmxpYyBsb2dpbigpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2Nhcmxpc3RcIl0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhd3NMb2dpbigpIHtcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5jbGVhcigpO1xuICAgICAgICB0aGlzLmxvZ2luc3RhdGUgPSB0cnVlO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAsXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChMb2dpbk1vZGFsQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luc3RhdGUgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBZnRlciBsb2dpbiAtLS0+IFwiLCByZXMpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmlkX3Rva2VuID0gSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIlRPS0VOXCIsIFwie31cIikpXG4gICAgICAgICAgICAgICAgbGV0IGRlY28gPSBqd3RfZGVjb2RlKHRoaXMuaWRfdG9rZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMudXNlcm5hbWUgPSBkZWNvLmdpdmVuX25hbWU7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJ1c2VyXCIsIEpTT04uc3RyaW5naWZ5KGRlY28uZ2l2ZW5fbmFtZSkpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpbnN0YXRlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGF3c1NpZ251cCgpIHtcbiAgICAgICAgLy8gQXBwbGljYXRpb25TZXR0aW5ncy5zZXROdW1iZXIoXCJ0b3RhbGNvc3RcIiwgMClcbiAgICAgICAgLy8gQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJ2ZW5kb3JpZFwiLCAnbnVsbCcpXG4gICAgICAgIC8vIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwidmVoaWNsZWlkXCIsICdudWxsJylcbiAgICAgICAgLy8gQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJhcHBvaW50bWVudGlkXCIsICdudWxsJylcbiAgICAgICAgLy8gQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJkZWxpdmVyeWZlZVwiLCAnbnVsbCcpXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKFNpZ251cE1vZGFsQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luc3RhdGUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU2lnbnVwIENhbmNlbGxlZCBCeSBVc2VyIC4uLlwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzSU9TKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWRfdG9rZW4gPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiSU9TVG9rZW5cIiwgXCJ7fVwiKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWRfdG9rZW4gPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiVE9LRU5cIiwgXCJ7fVwiKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGRlY28gPSBqd3RfZGVjb2RlKHRoaXMuaWRfdG9rZW4pO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiVVNFUlwiLCBKU09OLnN0cmluZ2lmeShkZWNvKSk7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VybmFtZSA9IGRlY28uZ2l2ZW5fbmFtZTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcInVzZXJcIiwgSlNPTi5zdHJpbmdpZnkoZGVjby5naXZlbl9uYW1lKSlcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luc3RhdGUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImFncmVlbWVudFwiXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19