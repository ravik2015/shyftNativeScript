"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var pickup_services_1 = require("./pickup.services");
var nativescript_geolocation_1 = require("nativescript-geolocation");
var dialogs_1 = require("ui/dialogs");
var dialogs_2 = require("ui/dialogs");
var dialogs_3 = require("nativescript-angular/directives/dialogs");
var pickupmodal_1 = require("./pickupmodal");
var addressmodal_1 = require("./addressmodal");
var angular2_uuid_1 = require("angular2-uuid");
var element_registry_1 = require("nativescript-angular/element-registry");
var ApplicationSettings = require("application-settings");
var selectservice_services_1 = require("../selectservice/selectservice.services");
var nativescript_braintree_1 = require("nativescript-braintree");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
element_registry_1.registerElement("Mapbox", function () { return require("nativescript-mapbox").MapboxView; });
var http = require("http");
var PickupComponent = (function () {
    function PickupComponent(router, route, _page, pickupService, modal, vcRef, routerExtensions, selectService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this._page = _page;
        this.pickupService = pickupService;
        this.modal = modal;
        this.vcRef = vcRef;
        this.routerExtensions = routerExtensions;
        this.selectService = selectService;
        this.countries = [];
        this.index = 0;
        this.selectedIndex = 1;
        this.Longitude = 0;
        this.Latitude = 0;
        this.address = "Enter Your Pickup Location";
        this.text = "";
        this.state = true;
        this.selectedservices = Array();
        this.addressUUID = angular2_uuid_1.UUID.UUID();
        this.buttonState = true;
        this.locationState = true;
        this.pickupState = false;
        nativescript_geolocation_1.enableLocationRequest(true);
        this.route.queryParams.subscribe(function (params) {
            _this.selectedservices = JSON.parse(params["services"]);
            _this.totalcost = params["totalcost"];
            _this.vendorID = params["vendorID"];
            _this.vehicleID = params["vehicleID"];
            _this.appointmentUUID = params["appointmentUUID"];
            _this.deliveryfee = params["deliveryfee"];
            console.log("pickup component : ", JSON.parse(params["services"]), "total costy", params["totalcost"], "vehicleID", params["vehicleID"], "appointment id", params["appointmentUUID"], "delivery fee : ", params["deliveryfee"], "vendor id ", params["vendorID"]);
        });
    }
    PickupComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        this.isLocationEnabled();
        this.state = true;
        this.getClientToken();
    };
    PickupComponent.prototype.getClientToken = function () {
        var _this = this;
        http.getJSON("https://mw0njhx1al.execute-api.us-east-1.amazonaws.com/uat/payment?action=get-client-token").then(function (result) {
            console.log("client token response : ", result.response.result.clientToken);
            _this.buttonState = false;
            _this.clientToken = result.response.result.clientToken;
        }, function (e) {
            console.log("client token error --------->", JSON.stringify(e));
        });
    };
    PickupComponent.prototype.isLocationEnabled = function () {
        var isEnabledProperty = nativescript_geolocation_1.isEnabled();
        var message = "Not able to find Location please Enter Your Location";
        if (!isEnabledProperty) {
            console.log(message);
        }
        else {
            message = "Location services available";
            this.getLocationOnce();
        }
    };
    PickupComponent.prototype.extractData = function (data) {
        var _this = this;
        this.pickupService.getData(data)
            .subscribe(function (result) {
            console.log("extractData response : ", JSON.stringify(result));
            _this.address = result.results[0].formatted_address;
            _this.place_id = result.results[0].place_id;
            _this.getAddressInfo();
        }, function (error) {
            console.log(error);
        });
    };
    PickupComponent.prototype.getLocationOnce = function () {
        var _this = this;
        nativescript_geolocation_1.getCurrentLocation({
            desiredAccuracy: 50,
            timeout: 20000
        })
            .then(function (location) {
            console.log("Location received: " + location);
            _this.locationState = !_this.locationState;
            _this.extractData(location);
            _this.Longitude = location.longitude;
            _this.Latitude = location.latitude;
        }).catch(function (error) {
            console.log("Location error received: " + error);
            console.log("Not able to find Location please Enter Your Location");
        });
    };
    PickupComponent.prototype.pressed = function () {
        var _this = this;
        this.map.removeMarkers();
        var options = {
            context: { latitude: this.Latitude, longitude: this.Longitude, search: this.address },
            height: 100,
            fullscreen: true,
            viewContainerRef: this.vcRef,
        };
        this.modal.showModal(addressmodal_1.AddressModalComponent, options).then(function (res) {
            console.log("modal response " + res);
            _this.address = res;
            _this.pickupService.getModalLatLong(res)
                .subscribe(function (result) {
                console.log("modal address lat long  result : ", JSON.stringify(result));
                _this.place_id = result.results[0].place_id;
                _this.Latitude = result.results[0].geometry.location.lat;
                _this.Longitude = result.results[0].geometry.location.lng;
                _this.map.addMarkers([
                    {
                        lat: _this.Latitude,
                        lng: _this.Longitude,
                        title: _this.address,
                        subtitle: 'Really really nice location',
                    }
                ]);
                _this.map.setCenter({
                    lat: _this.Latitude,
                    lng: _this.Longitude,
                    animated: true // default true
                });
                _this.getAddressInfo();
            }, function (error) {
                console.log("Address Info Error ", error);
            });
        });
    };
    PickupComponent.prototype.onPickerLoaded = function (args) {
        var datePicker = args.object;
        var date = new Date();
        var twoWeekAgo = new Date();
        var afterTwoWeek = new Date();
        twoWeekAgo.setDate(twoWeekAgo.getDate() - 14);
        afterTwoWeek.setDate(afterTwoWeek.getDate() + 14);
        datePicker.year = date.getFullYear();
        datePicker.month = date.getMonth() + 1;
        datePicker.day = date.getDate();
        datePicker.minDate = twoWeekAgo;
        datePicker.maxDate = afterTwoWeek;
    };
    PickupComponent.prototype.onDateChanged = function (args) {
        console.log("New value: " + args.value);
        this.datepickerdate = args.value;
    };
    PickupComponent.prototype.onTimeChanged = function (args) {
        console.log("Time changed");
        console.log("New value: " + args.value);
        console.log("Old value: " + args.oldValue);
    };
    PickupComponent.prototype.onMapReady = function (args) {
        console.log("<---------------------- Map Ready ---------------------->", this.Latitude, this.Longitude);
        this.map = args.map;
        args.map.addMarkers([
            {
                lat: this.Latitude,
                lng: this.Longitude,
                title: 'Current Location',
                subtitle: 'Really really nice location',
            }
        ]);
    };
    PickupComponent.prototype.updateAppointment = function () {
        console.log("here update");
        this.pickupService.updateAppointment()
            .subscribe(function (result) {
            console.log("Appointment Update Success : ", (JSON.stringify(result)));
            ApplicationSettings.setNumber("totalcost", 0);
            ApplicationSettings.setString("vendorid", 'null');
            ApplicationSettings.setString("vehicleid", 'null');
            ApplicationSettings.setString("deliveryfee", 'null');
        }, function (error) {
            console.log("Appointment Update Error : ", error);
            ApplicationSettings.setNumber("totalcost", 0);
            ApplicationSettings.setString("vendorid", 'null');
            ApplicationSettings.setString("vehicleid", 'null');
            ApplicationSettings.setString("deliveryfee", 'null');
        });
    };
    PickupComponent.prototype.clearTextfieldFocus = function (args) {
        var layout = args.object;
        var myTextfield = layout.getViewById("myTextfield");
        myTextfield.android.clearFocus();
    };
    PickupComponent.prototype.getAddressInfo = function () {
        var _this = this;
        this.pickupService.getlatLong(this.place_id)
            .subscribe(function (result) {
            console.log("getAddressInfo result ---> ", result.result.geometry.location.lat);
            _this.Latitude = result.result.geometry.location.lat;
            _this.Longitude = result.result.geometry.location.lng;
            _this.address_lat = result.result.geometry.location.lat;
            _this.address_long = result.result.geometry.location.lng;
            _this.address_name = result.result.formatted_address;
            result.result.address_components.map(function (compo) {
                if (compo.types[0] == "administrative_area_level_2") {
                    _this.city = compo.long_name;
                }
                if (compo.types[0] == "administrative_area_level_1") {
                    _this.states = compo.long_name;
                }
                if (compo.types[0] == "postal_code") {
                    _this.zip = compo.long_name;
                    console.log("AddressUUID is : ", _this.addressUUID, "Address Lat :", _this.address_lat, "Address Long :", _this.address_long, "name :", _this.address_name);
                }
            });
            var location = {
                "id": _this.addressUUID,
                "name": _this.address_name,
                "latitude": _this.address_lat,
                "longitude": _this.address_long,
                "address": {
                    "addressLine1": _this.address_name,
                    "addressLine2": "",
                    "addressLine3": "",
                    "city": _this.city,
                    "state": _this.states,
                    "zip": _this.zip
                },
                "timestamp": new Date()
            };
            // localStorage.setItem("location", JSON.stringify(location))     
            ApplicationSettings.setString("location", JSON.stringify(location));
        }, function (error) {
            console.log("Address Info Error ", error);
        });
    };
    PickupComponent.prototype.addressPUT = function () {
        var _this = this;
        console.log("AddressUUID is L: ", this.addressUUID, "Address Lat---->", this.address_lat, "Address Long----->", this.address_long, "name----->", this.address_name);
        var location = {
            "id": this.addressUUID,
            "name": this.address_name,
            "latitude": this.address_lat,
            "longitude": this.address_long,
            "address": {
                "addressLine1": this.address_name,
                "addressLine2": "",
                "addressLine3": "",
                "city": this.city,
                "state": this.states,
                "zip": this.zip
            },
            "timestamp": new Date()
        };
        this.pickupService.locationAdd(location)
            .subscribe(function (result) {
            console.log("Location Add Success : ", (JSON.stringify(result)));
            _this.updateAppointment();
        }, function (error) {
            console.log("Location Add Error : ", error);
            _this.updateAppointment();
        });
    };
    PickupComponent.prototype.confirmPickup = function () {
        var _this = this;
        if (this.pickupState) {
            console.log("pickup state is : ", this.pickupState);
            var options = {
                context: { address: this.address, time: this.time, services: this.selectedservices, servicecost: this.totalcost, vehicle: this.vehicleID, vendor: this.vendorID, clientToken: this.clientToken, deliveryfee: this.deliveryfee },
                height: 100,
                fullscreen: true,
                viewContainerRef: this.vcRef,
            };
            this.modal.showModal(pickupmodal_1.PickupModalComponent, options).then(function (res) {
                console.log("Response is : ", res);
                if (res === "closed") {
                    return true;
                }
                else {
                    var opt = {
                        amount: (_this.totalcost).toString(),
                        collectDeviceData: true,
                        requestThreeDSecureVerification: false,
                    };
                    _this.braintree = new nativescript_braintree_1.Braintree();
                    _this.braintree.startPayment(_this.clientToken, opt).then(function (res) {
                        console.log("Payment Success : " + JSON.stringify(res));
                        _this.addressPUT();
                        nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Appointment!", "Appointment Created Successfully", "OK");
                        _this.routerExtensions.navigate(["/status"]);
                        // let options = {
                        //     title: "Payment Success",
                        //     message: "Your Payment has been Processed Successfully.",
                        //     okButtonText: "OK"
                        // };
                        // alert(options).then(() => {
                        //   this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });                                  
                        // });
                    }).catch(function (err) {
                        console.log("Payment Unsuccessfull :  " + err.msg);
                        var options = {
                            title: "Payment Unsuccessfull",
                            message: "You have Cancelled the payment process for this appointment please try again to proceed",
                            okButtonText: "OK"
                        };
                        dialogs_1.alert(options).then(function () {
                            _this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });
                        });
                    });
                }
            });
        }
        else {
            dialogs_1.alert("Please select Date and Time First");
        }
    };
    PickupComponent.prototype.scheduleNow = function () {
        var _this = this;
        this.pickupState = true;
        var options = {
            title: "Create Appointment",
            message: "Are you sure you want to Create Appointment With Current Date and Time?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel",
        };
        dialogs_2.confirm(options).then(function (result) {
            if (result === true) {
                var appointmentID = angular2_uuid_1.UUID.UUID();
                var vendorid = JSON.parse(ApplicationSettings.getString("vendorid", "{}"));
                var d = new Date();
                var date = d.toISOString();
                ApplicationSettings.setString("appointmentDate", JSON.stringify(d));
                console.log("final date is :", date, "and vendor is : ", JSON.parse(ApplicationSettings.getString("vendorid", "{}")));
                _this.selectService.createAppointment(appointmentID, vendorid, date);
                _this.confirmPickup();
            }
            else {
                console.log("****** Cancelled ****** ");
            }
        });
    };
    PickupComponent.prototype.futureDate = function () {
        this.pickupState = true;
        var navigationExtras = {
            queryParams: {
                "appointmentID": this.appointmentUUID,
                "vendorID": this.vendorID,
            }
        };
        this.router.navigate(["/calendar"], navigationExtras);
    };
    PickupComponent.prototype.onBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    __decorate([
        core_1.ViewChild("textField"),
        __metadata("design:type", core_1.ElementRef)
    ], PickupComponent.prototype, "textField", void 0);
    PickupComponent = __decorate([
        core_1.Component({
            selector: "Pickup",
            moduleId: module.id,
            styleUrls: ['pickup.css'],
            templateUrl: "./pickup.component.html",
            providers: [pickup_services_1.PickupService, selectservice_services_1.SelectService]
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, page_1.Page, pickup_services_1.PickupService, dialogs_3.ModalDialogService, core_1.ViewContainerRef, router_2.RouterExtensions, selectservice_services_1.SelectService])
    ], PickupComponent);
    return PickupComponent;
}());
exports.PickupComponent = PickupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBpY2t1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkY7QUFDM0YsMENBQTJFO0FBQzNFLHNEQUErRDtBQUcvRCxnQ0FBK0I7QUFDL0IscURBQWtEO0FBR2xELHFFQUFvSDtBQUdwSCxzQ0FBbUM7QUFHbkMsc0NBQXFDO0FBR3JDLG1FQUE2RTtBQUM3RSw2Q0FBcUQ7QUFDckQsK0NBQXVEO0FBQ3ZELCtDQUFxQztBQUNyQywwRUFBd0U7QUFDeEUsMERBQTREO0FBRTVELGtGQUF3RTtBQUN4RSxpRUFBc0Y7QUFFdEYsbUVBQTZFO0FBRzdFLGtDQUFlLENBQUMsUUFBUSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxVQUFVLEVBQXpDLENBQXlDLENBQUMsQ0FBQztBQUMzRSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFVM0I7SUF5Q0UseUJBQTJCLE1BQWMsRUFBVSxLQUFxQixFQUFVLEtBQVcsRUFBVSxhQUE0QixFQUFVLEtBQXlCLEVBQVUsS0FBdUIsRUFBVSxnQkFBa0MsRUFBVSxhQUE0QjtRQUF6UixpQkFZQztRQVowQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBcENqUixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsY0FBUyxHQUFXLENBQUMs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M0I7SUFBRCxzQkFBQztDQUFBLEFBdlpELElBdVpDO0FBdlpZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcywgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IERhdGVQaWNrZXIgfSBmcm9tIFwidWkvZGF0ZS1waWNrZXJcIjtcclxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgUGlja3VwU2VydmljZSB9IGZyb20gXCIuL3BpY2t1cC5zZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBNYXBib3hWaWV3QXBpLCBWaWV3cG9ydCBhcyBNYXBib3hWaWV3cG9ydCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbWFwYm94XCI7XHJcbmltcG9ydCB7IEFkZHJlc3NPcHRpb25zLCBEaXJlY3Rpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kaXJlY3Rpb25zXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uLCBnZXRDdXJyZW50TG9jYXRpb24sIGlzRW5hYmxlZCwgZGlzdGFuY2UsIGVuYWJsZUxvY2F0aW9uUmVxdWVzdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcclxuaW1wb3J0IHsgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0ICogYXMgZ2VzdHVyZXMgZnJvbSBcInVpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgY29uZmlybSB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBUb2tlbk1vZGVsIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvYXV0b2NvbXBsZXRlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGlja3VwTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9waWNrdXBtb2RhbFwiO1xyXG5pbXBvcnQgeyBBZGRyZXNzTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9hZGRyZXNzbW9kYWxcIjtcclxuaW1wb3J0IHsgVVVJRCB9IGZyb20gJ2FuZ3VsYXIyLXV1aWQnO1xyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TLCBkZXZpY2UsIHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlbGVjdHNlcnZpY2Uvc2VsZWN0c2VydmljZS5zZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBCcmFpbnRyZWUsIEJyYWluVHJlZU9wdGlvbnMsIEJyYWluVHJlZU91dHB1dCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1icmFpbnRyZWUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBUTlNGYW5jeUFsZXJ0LCBUTlNGYW5jeUFsZXJ0QnV0dG9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0XCI7XHJcblxyXG5cclxucmVnaXN0ZXJFbGVtZW50KFwiTWFwYm94XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbWFwYm94XCIpLk1hcGJveFZpZXcpO1xyXG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcIlBpY2t1cFwiLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc3R5bGVVcmxzOiBbJ3BpY2t1cC5jc3MnXSxcclxuICB0ZW1wbGF0ZVVybDogXCIuL3BpY2t1cC5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHByb3ZpZGVyczogW1BpY2t1cFNlcnZpY2UsIFNlbGVjdFNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaWNrdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwdWJsaWMgY2xpZW50VG9rZW47XHJcblxyXG4gIHByaXZhdGUgX2l0ZW1zOiBPYnNlcnZhYmxlQXJyYXk8VG9rZW5Nb2RlbD47XHJcbiAgcHJpdmF0ZSBjb3VudHJpZXMgPSBbXTtcclxuICBwdWJsaWMgaW5kZXg6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAxO1xyXG4gIHB1YmxpYyBMb25naXR1ZGU6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIExhdGl0dWRlOiBudW1iZXIgPSAwO1xyXG4gIHB1YmxpYyBhZGRyZXNzOiBzdHJpbmcgPSBcIkVudGVyIFlvdXIgUGlja3VwIExvY2F0aW9uXCI7XHJcbiAgcHVibGljIHRpbWU7XHJcbiAgcHVibGljIHRleHQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgcHVibGljIHN0YXRlID0gdHJ1ZTtcclxuICBwdWJsaWMgc2VsZWN0ZWRzZXJ2aWNlcyA9IEFycmF5KCk7XHJcbiAgcHJpdmF0ZSBkaXJlY3Rpb25zOiBEaXJlY3Rpb25zO1xyXG4gIHByaXZhdGUgbWFwOiBNYXBib3hWaWV3QXBpO1xyXG4gIHB1YmxpYyB0b3RhbGNvc3Q7XHJcbiAgcHVibGljIHZlbmRvcklEO1xyXG4gIHB1YmxpYyB2ZWhpY2xlSUQ7XHJcbiAgcHVibGljIGFwcG9pbnRtZW50VVVJRDtcclxuICBwdWJsaWMgYWRkcmVzc19sYXQ7XHJcbiAgcHVibGljIGFkZHJlc3NfbG9uZztcclxuICBwdWJsaWMgYWRkcmVzc19uYW1lO1xyXG4gIHB1YmxpYyBjaXR5O1xyXG4gIHB1YmxpYyBzdGF0ZXM7XHJcbiAgcHVibGljIHppcDtcclxuICBwdWJsaWMgcGxhY2VfaWQ7XHJcbiAgcHVibGljIGFkZHJlc3NVVUlEID0gVVVJRC5VVUlEKCk7XHJcbiAgcHVibGljIGlzb0RhdGU7XHJcbiAgcHVibGljIGRhdGVwaWNrZXJkYXRlO1xyXG4gIHB1YmxpYyBkYXRldGltZTtcclxuICBwdWJsaWMgaWRfdG9rZW47XHJcbiAgcHVibGljIGRlbGl2ZXJ5ZmVlO1xyXG4gIHB1YmxpYyBidXR0b25TdGF0ZSA9IHRydWU7XHJcbiAgcHJpdmF0ZSBicmFpbnRyZWU6IEJyYWludHJlZTtcclxuICBwcml2YXRlIGxvY2F0aW9uU3RhdGUgPSB0cnVlO1xyXG4gIHByaXZhdGUgcGlja3VwU3RhdGUgPSBmYWxzZTtcclxuICBcclxuICBAVmlld0NoaWxkKFwidGV4dEZpZWxkXCIpIHRleHRGaWVsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIHBpY2t1cFNlcnZpY2U6IFBpY2t1cFNlcnZpY2UsIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHNlbGVjdFNlcnZpY2U6IFNlbGVjdFNlcnZpY2UpIHtcclxuICAgIGVuYWJsZUxvY2F0aW9uUmVxdWVzdCh0cnVlKTtcclxuICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRzZXJ2aWNlcyA9IEpTT04ucGFyc2UocGFyYW1zW1wic2VydmljZXNcIl0pXHJcbiAgICAgIHRoaXMudG90YWxjb3N0ID0gcGFyYW1zW1widG90YWxjb3N0XCJdXHJcbiAgICAgIHRoaXMudmVuZG9ySUQgPSBwYXJhbXNbXCJ2ZW5kb3JJRFwiXVxyXG4gICAgICB0aGlzLnZlaGljbGVJRCA9IHBhcmFtc1tcInZlaGljbGVJRFwiXVxyXG4gICAgICB0aGlzLmFwcG9pbnRtZW50VVVJRCA9IHBhcmFtc1tcImFwcG9pbnRtZW50VVVJRFwiXVxyXG4gICAgICB0aGlzLmRlbGl2ZXJ5ZmVlID0gcGFyYW1zW1wiZGVsaXZlcnlmZWVcIl1cclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwicGlja3VwIGNvbXBvbmVudCA6IFwiLCBKU09OLnBhcnNlKHBhcmFtc1tcInNlcnZpY2VzXCJdKSwgXCJ0b3RhbCBjb3N0eVwiLCBwYXJhbXNbXCJ0b3RhbGNvc3RcIl0sIFwidmVoaWNsZUlEXCIsIHBhcmFtc1tcInZlaGljbGVJRFwiXSwgXCJhcHBvaW50bWVudCBpZFwiLCBwYXJhbXNbXCJhcHBvaW50bWVudFVVSURcIl0sIFwiZGVsaXZlcnkgZmVlIDogXCIsIHBhcmFtc1tcImRlbGl2ZXJ5ZmVlXCJdLCBcInZlbmRvciBpZCBcIiwgcGFyYW1zW1widmVuZG9ySURcIl0pXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgdGhpcy5pc0xvY2F0aW9uRW5hYmxlZCgpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHRydWU7XHJcbiAgICB0aGlzLmdldENsaWVudFRva2VuKClcclxuICB9XHJcblxyXG5cclxuICBwdWJsaWMgZ2V0Q2xpZW50VG9rZW4oKSB7XHJcbiAgICBodHRwLmdldEpTT04oXCJodHRwczovL213MG5qaHgxYWwuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vdWF0L3BheW1lbnQ/YWN0aW9uPWdldC1jbGllbnQtdG9rZW5cIikudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiY2xpZW50IHRva2VuIHJlc3BvbnNlIDogXCIsIHJlc3VsdC5yZXNwb25zZS5yZXN1bHQuY2xpZW50VG9rZW4pXHJcbiAgICAgIHRoaXMuYnV0dG9uU3RhdGUgPSBmYWxzZVxyXG4gICAgICB0aGlzLmNsaWVudFRva2VuID0gcmVzdWx0LnJlc3BvbnNlLnJlc3VsdC5jbGllbnRUb2tlbjtcclxuICAgIH0sIChlKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiY2xpZW50IHRva2VuIGVycm9yIC0tLS0tLS0tLT5cIiwgSlNPTi5zdHJpbmdpZnkoZSkpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG4gIHB1YmxpYyBpc0xvY2F0aW9uRW5hYmxlZCgpIHtcclxuICAgIGxldCBpc0VuYWJsZWRQcm9wZXJ0eSA9IGlzRW5hYmxlZCgpO1xyXG4gICAgbGV0IG1lc3NhZ2UgPSBcIk5vdCBhYmxlIHRvIGZpbmQgTG9jYXRpb24gcGxlYXNlIEVudGVyIFlvdXIgTG9jYXRpb25cIjtcclxuICAgIGlmICghaXNFbmFibGVkUHJvcGVydHkpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtZXNzYWdlID0gXCJMb2NhdGlvbiBzZXJ2aWNlcyBhdmFpbGFibGVcIjtcclxuICAgICAgdGhpcy5nZXRMb2NhdGlvbk9uY2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBleHRyYWN0RGF0YShkYXRhKSB7XHJcbiAgICB0aGlzLnBpY2t1cFNlcnZpY2UuZ2V0RGF0YShkYXRhKVxyXG4gICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImV4dHJhY3REYXRhIHJlc3BvbnNlIDogXCIsIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpXHJcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gcmVzdWx0LnJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5wbGFjZV9pZCA9IHJlc3VsdC5yZXN1bHRzWzBdLnBsYWNlX2lkO1xyXG4gICAgICAgIHRoaXMuZ2V0QWRkcmVzc0luZm8oKVxyXG4gICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExvY2F0aW9uT25jZSgpIHtcclxuICAgIGdldEN1cnJlbnRMb2NhdGlvbihcclxuICAgICAge1xyXG4gICAgICAgIGRlc2lyZWRBY2N1cmFjeTogNTAsXHJcbiAgICAgICAgdGltZW91dDogMjAwMDBcclxuICAgICAgfVxyXG4gICAgKVxyXG4gICAgICAudGhlbihsb2NhdGlvbiA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2NhdGlvbiByZWNlaXZlZDogXCIgKyBsb2NhdGlvbik7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvblN0YXRlID0gIXRoaXMubG9jYXRpb25TdGF0ZTtcclxuICAgICAgICB0aGlzLmV4dHJhY3REYXRhKGxvY2F0aW9uKTtcclxuICAgICAgICB0aGlzLkxvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZTtcclxuICAgICAgICB0aGlzLkxhdGl0dWRlID0gbG9jYXRpb24ubGF0aXR1ZGU7XHJcblxyXG5cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9jYXRpb24gZXJyb3IgcmVjZWl2ZWQ6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGFibGUgdG8gZmluZCBMb2NhdGlvbiBwbGVhc2UgRW50ZXIgWW91ciBMb2NhdGlvblwiKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuICBwdWJsaWMgcHJlc3NlZCgpIHtcclxuICAgIHRoaXMubWFwLnJlbW92ZU1hcmtlcnMoKTtcclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICBjb250ZXh0OiB7IGxhdGl0dWRlOiB0aGlzLkxhdGl0dWRlLCBsb25naXR1ZGU6IHRoaXMuTG9uZ2l0dWRlLCBzZWFyY2g6IHRoaXMuYWRkcmVzcyB9LFxyXG4gICAgICBoZWlnaHQ6IDEwMCxcclxuICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcclxuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoQWRkcmVzc01vZGFsQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibW9kYWwgcmVzcG9uc2UgXCIgKyByZXMpXHJcbiAgICAgIHRoaXMuYWRkcmVzcyA9IHJlcztcclxuICAgICAgdGhpcy5waWNrdXBTZXJ2aWNlLmdldE1vZGFsTGF0TG9uZyhyZXMpXHJcbiAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vZGFsIGFkZHJlc3MgbGF0IGxvbmcgIHJlc3VsdCA6IFwiLCBKU09OLnN0cmluZ2lmeShyZXN1bHQpKVxyXG4gICAgICAgICAgdGhpcy5wbGFjZV9pZCA9IHJlc3VsdC5yZXN1bHRzWzBdLnBsYWNlX2lkO1xyXG4gICAgICAgICAgdGhpcy5MYXRpdHVkZSA9IHJlc3VsdC5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdDtcclxuICAgICAgICAgIHRoaXMuTG9uZ2l0dWRlID0gcmVzdWx0LnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubG5nO1xyXG4gICAgICAgICAgdGhpcy5tYXAuYWRkTWFya2VycyhbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBsYXQ6IHRoaXMuTGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgbG5nOiB0aGlzLkxvbmdpdHVkZSxcclxuICAgICAgICAgICAgICB0aXRsZTogdGhpcy5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgIHN1YnRpdGxlOiAnUmVhbGx5IHJlYWxseSBuaWNlIGxvY2F0aW9uJyxcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLm1hcC5zZXRDZW50ZXIoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBsYXQ6IHRoaXMuTGF0aXR1ZGUsIC8vIG1hbmRhdG9yeVxyXG4gICAgICAgICAgICAgIGxuZzogdGhpcy5Mb25naXR1ZGUsIC8vIG1hbmRhdG9yeVxyXG4gICAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlIC8vIGRlZmF1bHQgdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICB0aGlzLmdldEFkZHJlc3NJbmZvKClcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRkcmVzcyBJbmZvIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uUGlja2VyTG9hZGVkKGFyZ3MpIHtcclxuICAgIGxldCBkYXRlUGlja2VyID0gPERhdGVQaWNrZXI+YXJncy5vYmplY3Q7XHJcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcclxuICAgIGxldCB0d29XZWVrQWdvID0gbmV3IERhdGUoKTtcclxuICAgIGxldCBhZnRlclR3b1dlZWsgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdHdvV2Vla0Fnby5zZXREYXRlKHR3b1dlZWtBZ28uZ2V0RGF0ZSgpIC0gMTQpO1xyXG4gICAgYWZ0ZXJUd29XZWVrLnNldERhdGUoYWZ0ZXJUd29XZWVrLmdldERhdGUoKSArIDE0KTtcclxuXHJcbiAgICBkYXRlUGlja2VyLnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBkYXRlUGlja2VyLm1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgIGRhdGVQaWNrZXIuZGF5ID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgICBkYXRlUGlja2VyLm1pbkRhdGUgPSB0d29XZWVrQWdvO1xyXG4gICAgZGF0ZVBpY2tlci5tYXhEYXRlID0gYWZ0ZXJUd29XZWVrO1xyXG5cclxuICB9XHJcblxyXG4gIG9uRGF0ZUNoYW5nZWQoYXJncykge1xyXG4gICAgY29uc29sZS5sb2coXCJOZXcgdmFsdWU6IFwiICsgYXJncy52YWx1ZSk7XHJcbiAgICB0aGlzLmRhdGVwaWNrZXJkYXRlID0gYXJncy52YWx1ZVxyXG4gIH1cclxuXHJcbiAgb25UaW1lQ2hhbmdlZChhcmdzKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlRpbWUgY2hhbmdlZFwiKTtcclxuICAgIGNvbnNvbGUubG9nKFwiTmV3IHZhbHVlOiBcIiArIGFyZ3MudmFsdWUpO1xyXG4gICAgY29uc29sZS5sb2coXCJPbGQgdmFsdWU6IFwiICsgYXJncy5vbGRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBvbk1hcFJlYWR5KGFyZ3MpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiPC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gTWFwIFJlYWR5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XCIsIHRoaXMuTGF0aXR1ZGUsIHRoaXMuTG9uZ2l0dWRlKVxyXG4gICAgdGhpcy5tYXAgPSBhcmdzLm1hcDtcclxuICAgIGFyZ3MubWFwLmFkZE1hcmtlcnMoW1xyXG4gICAgICB7XHJcbiAgICAgICAgbGF0OiB0aGlzLkxhdGl0dWRlLFxyXG4gICAgICAgIGxuZzogdGhpcy5Mb25naXR1ZGUsXHJcbiAgICAgICAgdGl0bGU6ICdDdXJyZW50IExvY2F0aW9uJyxcclxuICAgICAgICBzdWJ0aXRsZTogJ1JlYWxseSByZWFsbHkgbmljZSBsb2NhdGlvbicsXHJcbiAgICAgIH1dXHJcbiAgICApO1xyXG4gIH1cclxuXHJcblxyXG4gIHB1YmxpYyB1cGRhdGVBcHBvaW50bWVudCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiaGVyZSB1cGRhdGVcIilcclxuICAgIHRoaXMucGlja3VwU2VydmljZS51cGRhdGVBcHBvaW50bWVudCgpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXBwb2ludG1lbnQgVXBkYXRlIFN1Y2Nlc3MgOiBcIiwgKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpKVxyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0TnVtYmVyKFwidG90YWxjb3N0XCIsIDApXHJcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJ2ZW5kb3JpZFwiLCAnbnVsbCcpXHJcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJ2ZWhpY2xlaWRcIiwgJ251bGwnKVxyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiZGVsaXZlcnlmZWVcIiwgJ251bGwnKSAgICBcclxuICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBcHBvaW50bWVudCBVcGRhdGUgRXJyb3IgOiBcIiwgZXJyb3IpXHJcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXROdW1iZXIoXCJ0b3RhbGNvc3RcIiwgMClcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcInZlbmRvcmlkXCIsICdudWxsJylcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcInZlaGljbGVpZFwiLCAnbnVsbCcpXHJcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJkZWxpdmVyeWZlZVwiLCAnbnVsbCcpICAgICAgXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJUZXh0ZmllbGRGb2N1cyhhcmdzKSB7XHJcbiAgICB2YXIgbGF5b3V0ID0gYXJncy5vYmplY3Q7XHJcbiAgICB2YXIgbXlUZXh0ZmllbGQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJteVRleHRmaWVsZFwiKTtcclxuICAgIG15VGV4dGZpZWxkLmFuZHJvaWQuY2xlYXJGb2N1cygpO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBnZXRBZGRyZXNzSW5mbygpIHtcclxuICAgIHRoaXMucGlja3VwU2VydmljZS5nZXRsYXRMb25nKHRoaXMucGxhY2VfaWQpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0QWRkcmVzc0luZm8gcmVzdWx0IC0tLT4gXCIsIHJlc3VsdC5yZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24ubGF0KVxyXG4gICAgICAgIHRoaXMuTGF0aXR1ZGUgPSByZXN1bHQucmVzdWx0Lmdlb21ldHJ5LmxvY2F0aW9uLmxhdDtcclxuICAgICAgICB0aGlzLkxvbmdpdHVkZSA9IHJlc3VsdC5yZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24ubG5nO1xyXG4gICAgICAgIHRoaXMuYWRkcmVzc19sYXQgPSByZXN1bHQucmVzdWx0Lmdlb21ldHJ5LmxvY2F0aW9uLmxhdDtcclxuICAgICAgICB0aGlzLmFkZHJlc3NfbG9uZyA9IHJlc3VsdC5yZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24ubG5nO1xyXG4gICAgICAgIHRoaXMuYWRkcmVzc19uYW1lID0gcmVzdWx0LnJlc3VsdC5mb3JtYXR0ZWRfYWRkcmVzc1xyXG4gICAgICAgIHJlc3VsdC5yZXN1bHQuYWRkcmVzc19jb21wb25lbnRzLm1hcCgoY29tcG8pID0+IHtcclxuICAgICAgICAgIGlmIChjb21wby50eXBlc1swXSA9PSBcImFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMlwiKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNpdHkgPSBjb21wby5sb25nX25hbWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY29tcG8udHlwZXNbMF0gPT0gXCJhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzFcIikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlcyA9IGNvbXBvLmxvbmdfbmFtZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjb21wby50eXBlc1swXSA9PSBcInBvc3RhbF9jb2RlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy56aXAgPSBjb21wby5sb25nX25hbWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRkcmVzc1VVSUQgaXMgOiBcIiwgdGhpcy5hZGRyZXNzVVVJRCwgXCJBZGRyZXNzIExhdCA6XCIsIHRoaXMuYWRkcmVzc19sYXQsIFwiQWRkcmVzcyBMb25nIDpcIiwgdGhpcy5hZGRyZXNzX2xvbmcsIFwibmFtZSA6XCIsIHRoaXMuYWRkcmVzc19uYW1lKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCBsb2NhdGlvbiA9IHtcclxuICAgICAgICAgIFwiaWRcIjogdGhpcy5hZGRyZXNzVVVJRCxcclxuICAgICAgICAgIFwibmFtZVwiOiB0aGlzLmFkZHJlc3NfbmFtZSxcclxuICAgICAgICAgIFwibGF0aXR1ZGVcIjogdGhpcy5hZGRyZXNzX2xhdCxcclxuICAgICAgICAgIFwibG9uZ2l0dWRlXCI6IHRoaXMuYWRkcmVzc19sb25nLFxyXG4gICAgICAgICAgXCJhZGRyZXNzXCI6IHtcclxuICAgICAgICAgICAgXCJhZGRyZXNzTGluZTFcIjogdGhpcy5hZGRyZXNzX25hbWUsXHJcbiAgICAgICAgICAgIFwiYWRkcmVzc0xpbmUyXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwiYWRkcmVzc0xpbmUzXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwiY2l0eVwiOiB0aGlzLmNpdHksXHJcbiAgICAgICAgICAgIFwic3RhdGVcIjogdGhpcy5zdGF0ZXMsXHJcbiAgICAgICAgICAgIFwiemlwXCI6IHRoaXMuemlwXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJ0aW1lc3RhbXBcIjogbmV3IERhdGUoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsb2NhdGlvblwiLCBKU09OLnN0cmluZ2lmeShsb2NhdGlvbikpICAgICBcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImxvY2F0aW9uXCIsIEpTT04uc3RyaW5naWZ5KGxvY2F0aW9uKSlcclxuICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBZGRyZXNzIEluZm8gRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkcmVzc1BVVCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQWRkcmVzc1VVSUQgaXMgTDogXCIsIHRoaXMuYWRkcmVzc1VVSUQsIFwiQWRkcmVzcyBMYXQtLS0tPlwiLCB0aGlzLmFkZHJlc3NfbGF0LCBcIkFkZHJlc3MgTG9uZy0tLS0tPlwiLCB0aGlzLmFkZHJlc3NfbG9uZywgXCJuYW1lLS0tLS0+XCIsIHRoaXMuYWRkcmVzc19uYW1lKVxyXG4gICAgbGV0IGxvY2F0aW9uID0ge1xyXG4gICAgICBcImlkXCI6IHRoaXMuYWRkcmVzc1VVSUQsXHJcbiAgICAgIFwibmFtZVwiOiB0aGlzLmFkZHJlc3NfbmFtZSxcclxuICAgICAgXCJsYXRpdHVkZVwiOiB0aGlzLmFkZHJlc3NfbGF0LFxyXG4gICAgICBcImxvbmdpdHVkZVwiOiB0aGlzLmFkZHJlc3NfbG9uZyxcclxuICAgICAgXCJhZGRyZXNzXCI6IHtcclxuICAgICAgICBcImFkZHJlc3NMaW5lMVwiOiB0aGlzLmFkZHJlc3NfbmFtZSxcclxuICAgICAgICBcImFkZHJlc3NMaW5lMlwiOiBcIlwiLFxyXG4gICAgICAgIFwiYWRkcmVzc0xpbmUzXCI6IFwiXCIsXHJcbiAgICAgICAgXCJjaXR5XCI6IHRoaXMuY2l0eSxcclxuICAgICAgICBcInN0YXRlXCI6IHRoaXMuc3RhdGVzLFxyXG4gICAgICAgIFwiemlwXCI6IHRoaXMuemlwXHJcbiAgICAgIH0sXHJcbiAgICAgIFwidGltZXN0YW1wXCI6IG5ldyBEYXRlKClcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBpY2t1cFNlcnZpY2UubG9jYXRpb25BZGQobG9jYXRpb24pXHJcbiAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9jYXRpb24gQWRkIFN1Y2Nlc3MgOiBcIiwgKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpKVxyXG4gICAgICAgIHRoaXMudXBkYXRlQXBwb2ludG1lbnQoKVxyXG4gICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIEFkZCBFcnJvciA6IFwiLCBlcnJvcilcclxuICAgICAgICB0aGlzLnVwZGF0ZUFwcG9pbnRtZW50KClcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uZmlybVBpY2t1cCgpIHtcclxuICAgIGlmICh0aGlzLnBpY2t1cFN0YXRlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwicGlja3VwIHN0YXRlIGlzIDogXCIsIHRoaXMucGlja3VwU3RhdGUpXHJcbiAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgIGNvbnRleHQ6IHsgYWRkcmVzczogdGhpcy5hZGRyZXNzLCB0aW1lOiB0aGlzLnRpbWUsIHNlcnZpY2VzOiB0aGlzLnNlbGVjdGVkc2VydmljZXMsIHNlcnZpY2Vjb3N0OiB0aGlzLnRvdGFsY29zdCwgdmVoaWNsZTogdGhpcy52ZWhpY2xlSUQsIHZlbmRvcjogdGhpcy52ZW5kb3JJRCwgY2xpZW50VG9rZW46IHRoaXMuY2xpZW50VG9rZW4sIGRlbGl2ZXJ5ZmVlOiB0aGlzLmRlbGl2ZXJ5ZmVlIH0sXHJcbiAgICAgICAgaGVpZ2h0OiAxMDAsXHJcbiAgICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcclxuICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoUGlja3VwTW9kYWxDb21wb25lbnQsIG9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIGlzIDogXCIsIHJlcyk7XHJcbiAgICAgICAgaWYgKHJlcyA9PT0gXCJjbG9zZWRcIikge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgbGV0IG9wdDogQnJhaW5UcmVlT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgYW1vdW50OiAodGhpcy50b3RhbGNvc3QpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGNvbGxlY3REZXZpY2VEYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICByZXF1ZXN0VGhyZWVEU2VjdXJlVmVyaWZpY2F0aW9uOiBmYWxzZSxcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYnJhaW50cmVlID0gbmV3IEJyYWludHJlZSgpO1xyXG4gICAgICAgICAgdGhpcy5icmFpbnRyZWUuc3RhcnRQYXltZW50KHRoaXMuY2xpZW50VG9rZW4sIG9wdCkudGhlbigocmVzOiBCcmFpblRyZWVPdXRwdXQpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXltZW50IFN1Y2Nlc3MgOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZHJlc3NQVVQoKVxyXG4gICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dTdWNjZXNzKFxyXG4gICAgICAgICAgICAgIFwiQXBwb2ludG1lbnQhXCIsXHJcbiAgICAgICAgICAgICAgXCJBcHBvaW50bWVudCBDcmVhdGVkIFN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgICAgICAgICAgIFwiT0tcIlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3N0YXR1c1wiXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgLy8gICAgIHRpdGxlOiBcIlBheW1lbnQgU3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgbWVzc2FnZTogXCJZb3VyIFBheW1lbnQgaGFzIGJlZW4gUHJvY2Vzc2VkIFN1Y2Nlc3NmdWxseS5cIixcclxuICAgICAgICAgICAgLy8gICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIC8vIH07XHJcbiAgICAgICAgICAgIC8vIGFsZXJ0KG9wdGlvbnMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvc2VsZWN0c2VydmljZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgIH0pLmNhdGNoKChlcnI6IEJyYWluVHJlZU91dHB1dCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBheW1lbnQgVW5zdWNjZXNzZnVsbCA6ICBcIiArIGVyci5tc2cpO1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICB0aXRsZTogXCJQYXltZW50IFVuc3VjY2Vzc2Z1bGxcIixcclxuICAgICAgICAgICAgICBtZXNzYWdlOiBcIllvdSBoYXZlIENhbmNlbGxlZCB0aGUgcGF5bWVudCBwcm9jZXNzIGZvciB0aGlzIGFwcG9pbnRtZW50IHBsZWFzZSB0cnkgYWdhaW4gdG8gcHJvY2VlZFwiLFxyXG4gICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGFsZXJ0KG9wdGlvbnMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvc2VsZWN0c2VydmljZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwiUGxlYXNlIHNlbGVjdCBEYXRlIGFuZCBUaW1lIEZpcnN0XCIpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzY2hlZHVsZU5vdygpIHtcclxuICAgIHRoaXMucGlja3VwU3RhdGUgPSB0cnVlO1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHRpdGxlOiBcIkNyZWF0ZSBBcHBvaW50bWVudFwiLFxyXG4gICAgICBtZXNzYWdlOiBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBDcmVhdGUgQXBwb2ludG1lbnQgV2l0aCBDdXJyZW50IERhdGUgYW5kIFRpbWU/XCIsXHJcbiAgICAgIG9rQnV0dG9uVGV4dDogXCJZZXNcIixcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcclxuICAgIH07XHJcblxyXG4gICAgY29uZmlybShvcHRpb25zKS50aGVuKChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcclxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGxldCBhcHBvaW50bWVudElEID0gVVVJRC5VVUlEKClcclxuICAgICAgICBsZXQgdmVuZG9yaWQgPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidmVuZG9yaWRcIiwgXCJ7fVwiKSlcclxuICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBkLnRvSVNPU3RyaW5nKClcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImFwcG9pbnRtZW50RGF0ZVwiLCBKU09OLnN0cmluZ2lmeShkKSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZpbmFsIGRhdGUgaXMgOlwiLCBkYXRlLCBcImFuZCB2ZW5kb3IgaXMgOiBcIiwgSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInZlbmRvcmlkXCIsIFwie31cIikpKVxyXG4gICAgICAgIHRoaXMuc2VsZWN0U2VydmljZS5jcmVhdGVBcHBvaW50bWVudChhcHBvaW50bWVudElELCB2ZW5kb3JpZCwgZGF0ZSlcclxuICAgICAgICB0aGlzLmNvbmZpcm1QaWNrdXAoKVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiKioqKioqIENhbmNlbGxlZCAqKioqKiogXCIpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnV0dXJlRGF0ZSgpIHtcclxuICAgIHRoaXMucGlja3VwU3RhdGUgPSB0cnVlO1xyXG4gICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XHJcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgICAgXCJhcHBvaW50bWVudElEXCI6IHRoaXMuYXBwb2ludG1lbnRVVUlELFxyXG4gICAgICAgIFwidmVuZG9ySURcIjogdGhpcy52ZW5kb3JJRCxcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9jYWxlbmRhclwiXSwgbmF2aWdhdGlvbkV4dHJhcyk7XHJcbiAgfVxyXG5cclxuICBvbkJhY2soKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG4iXX0=