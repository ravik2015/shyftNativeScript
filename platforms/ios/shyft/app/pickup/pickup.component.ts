import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";
import { Page } from "ui/page";
import { PickupService } from "./pickup.services";
import { MapboxViewApi, Viewport as MapboxViewport } from "nativescript-mapbox";
import { AddressOptions, Directions } from "nativescript-directions";
import { Location, getCurrentLocation, isEnabled, distance, enableLocationRequest } from "nativescript-geolocation";
import { SegmentedBarItem } from "ui/segmented-bar";
import { TextField } from "ui/text-field";
import { alert } from "ui/dialogs";
import * as gestures from "ui/gestures";
import * as dialogs from "ui/dialogs";
import { confirm } from "ui/dialogs";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TokenModel } from "nativescript-pro-ui/autocomplete";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { PickupModalComponent } from "./pickupmodal";
import { AddressModalComponent } from "./addressmodal";
import { UUID } from 'angular2-uuid';
import { registerElement } from "nativescript-angular/element-registry";
import * as ApplicationSettings from "application-settings";
import { isAndroid, isIOS, device, screen } from "platform";
import { SelectService } from "../selectservice/selectservice.services";
import { Braintree, BrainTreeOptions, BrainTreeOutput } from 'nativescript-braintree';
import { Observable } from "rxjs/Observable";
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";


registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
var http = require("http");


@Component({
  selector: "Pickup",
  moduleId: module.id,
  styleUrls: ['pickup.css'],
  templateUrl: "./pickup.component.html",
  providers: [PickupService, SelectService]
})
export class PickupComponent implements OnInit {

  public clientToken;

  private _items: ObservableArray<TokenModel>;
  private countries = [];
  public index: number = 0;
  public selectedIndex = 1;
  public Longitude: number = 0;
  public Latitude: number = 0;
  public address: string = "Enter Your Pickup Location";
  public time;
  public text: string = "";
  public state = true;
  public selectedservices = Array();
  private directions: Directions;
  private map: MapboxViewApi;
  public totalcost;
  public vendorID;
  public vehicleID;
  public appointmentUUID;
  public address_lat;
  public address_long;
  public address_name;
  public city;
  public states;
  public zip;
  public place_id;
  public addressUUID = UUID.UUID();
  public isoDate;
  public datepickerdate;
  public datetime;
  public id_token;
  public deliveryfee;
  public buttonState = true;
  private braintree: Braintree;
  private locationState = true;
  private pickupState = false;
  
  @ViewChild("textField") textField: ElementRef;

  public constructor(private router: Router, private route: ActivatedRoute, private _page: Page, private pickupService: PickupService, private modal: ModalDialogService, private vcRef: ViewContainerRef, private routerExtensions: RouterExtensions, private selectService: SelectService) {
    enableLocationRequest(true);
    this.route.queryParams.subscribe(params => {
      this.selectedservices = JSON.parse(params["services"])
      this.totalcost = params["totalcost"]
      this.vendorID = params["vendorID"]
      this.vehicleID = params["vehicleID"]
      this.appointmentUUID = params["appointmentUUID"]
      this.deliveryfee = params["deliveryfee"]

      console.log("pickup component : ", JSON.parse(params["services"]), "total costy", params["totalcost"], "vehicleID", params["vehicleID"], "appointment id", params["appointmentUUID"], "delivery fee : ", params["deliveryfee"], "vendor id ", params["vendorID"])
    });
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
    this.isLocationEnabled();
    this.state = true;
    this.getClientToken()
  }


  public getClientToken() {
    http.getJSON("https://mw0njhx1al.execute-api.us-east-1.amazonaws.com/uat/payment?action=get-client-token").then((result) => {
      console.log("client token response : ", result.response.result.clientToken)
      this.buttonState = false
      this.clientToken = result.response.result.clientToken;
    }, (e) => {
      console.log("client token error --------->", JSON.stringify(e))
    });
  }




  public isLocationEnabled() {
    let isEnabledProperty = isEnabled();
    let message = "Not able to find Location please Enter Your Location";
    if (!isEnabledProperty) {
      console.log(message);
    } else {
      message = "Location services available";
      this.getLocationOnce();
    }
  }


  extractData(data) {
    this.pickupService.getData(data)
      .subscribe((result) => {
        console.log("extractData response : ", JSON.stringify(result))
        this.address = result.results[0].formatted_address;
        this.place_id = result.results[0].place_id;
        this.getAddressInfo()
      }, (error) => {
        console.log(error);
      });
  }

  public getLocationOnce() {
    getCurrentLocation(
      {
        desiredAccuracy: 50,
        timeout: 20000
      }
    )
      .then(location => {
        console.log("Location received: " + location);
        this.locationState = !this.locationState;
        this.extractData(location);
        this.Longitude = location.longitude;
        this.Latitude = location.latitude;


      }).catch(error => {
        console.log("Location error received: " + error);
        console.log("Not able to find Location please Enter Your Location");
      });
  }




  public pressed() {
    this.map.removeMarkers();
    let options = {
      context: { latitude: this.Latitude, longitude: this.Longitude, search: this.address },
      height: 100,
      fullscreen: true,
      viewContainerRef: this.vcRef,
    };

    this.modal.showModal(AddressModalComponent, options).then(res => {
      console.log("modal response " + res)
      this.address = res;
      this.pickupService.getModalLatLong(res)
        .subscribe((result) => {
          console.log("modal address lat long  result : ", JSON.stringify(result))
          this.place_id = result.results[0].place_id;
          this.Latitude = result.results[0].geometry.location.lat;
          this.Longitude = result.results[0].geometry.location.lng;
          this.map.addMarkers([
            {
              lat: this.Latitude,
              lng: this.Longitude,
              title: this.address,
              subtitle: 'Really really nice location',
            }]
          );
          this.map.setCenter(
            {
              lat: this.Latitude, // mandatory
              lng: this.Longitude, // mandatory
              animated: true // default true
            }
          )
          this.getAddressInfo()
        }, (error) => {
          console.log("Address Info Error ", error);
        });
    });
  }

  onPickerLoaded(args) {
    let datePicker = <DatePicker>args.object;
    let date = new Date()
    let twoWeekAgo = new Date();
    let afterTwoWeek = new Date();
    twoWeekAgo.setDate(twoWeekAgo.getDate() - 14);
    afterTwoWeek.setDate(afterTwoWeek.getDate() + 14);

    datePicker.year = date.getFullYear();
    datePicker.month = date.getMonth() + 1;
    datePicker.day = date.getDate();
    datePicker.minDate = twoWeekAgo;
    datePicker.maxDate = afterTwoWeek;

  }

  onDateChanged(args) {
    console.log("New value: " + args.value);
    this.datepickerdate = args.value
  }

  onTimeChanged(args) {
    console.log("Time changed");
    console.log("New value: " + args.value);
    console.log("Old value: " + args.oldValue);
  }

  onMapReady(args) {
    console.log("<---------------------- Map Ready ---------------------->", this.Latitude, this.Longitude)
    this.map = args.map;
    args.map.addMarkers([
      {
        lat: this.Latitude,
        lng: this.Longitude,
        title: 'Current Location',
        subtitle: 'Really really nice location',
      }]
    );
  }


  public updateAppointment() {
    console.log("here update")
    this.pickupService.updateAppointment()
      .subscribe((result) => {
        console.log("Appointment Update Success : ", (JSON.stringify(result)))
        ApplicationSettings.setNumber("totalcost", 0)
        ApplicationSettings.setString("vendorid", 'null')
        ApplicationSettings.setString("vehicleid", 'null')
        ApplicationSettings.setString("deliveryfee", 'null')    
      }, (error) => {
        console.log("Appointment Update Error : ", error)
        ApplicationSettings.setNumber("totalcost", 0)
        ApplicationSettings.setString("vendorid", 'null')
        ApplicationSettings.setString("vehicleid", 'null')
        ApplicationSettings.setString("deliveryfee", 'null')      
      });
  }

  clearTextfieldFocus(args) {
    var layout = args.object;
    var myTextfield = layout.getViewById("myTextfield");
    myTextfield.android.clearFocus();
  }



  getAddressInfo() {
    this.pickupService.getlatLong(this.place_id)
      .subscribe((result) => {
        console.log("getAddressInfo result ---> ", result.result.geometry.location.lat)
        this.Latitude = result.result.geometry.location.lat;
        this.Longitude = result.result.geometry.location.lng;
        this.address_lat = result.result.geometry.location.lat;
        this.address_long = result.result.geometry.location.lng;
        this.address_name = result.result.formatted_address
        result.result.address_components.map((compo) => {
          if (compo.types[0] == "administrative_area_level_2") {

            this.city = compo.long_name;
          }
          if (compo.types[0] == "administrative_area_level_1") {
            this.states = compo.long_name;
          }
          if (compo.types[0] == "postal_code") {
            this.zip = compo.long_name;
            console.log("AddressUUID is : ", this.addressUUID, "Address Lat :", this.address_lat, "Address Long :", this.address_long, "name :", this.address_name)
          }
        })

        let location = {
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
        }

        // localStorage.setItem("location", JSON.stringify(location))     
        ApplicationSettings.setString("location", JSON.stringify(location))
      }, (error) => {
        console.log("Address Info Error ", error);
      });
  }

  public addressPUT() {
    console.log("AddressUUID is L: ", this.addressUUID, "Address Lat---->", this.address_lat, "Address Long----->", this.address_long, "name----->", this.address_name)
    let location = {
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
    }

    this.pickupService.locationAdd(location)
      .subscribe((result) => {
        console.log("Location Add Success : ", (JSON.stringify(result)))
        this.updateAppointment()
      }, (error) => {
        console.log("Location Add Error : ", error)
        this.updateAppointment()

      });
  }

  confirmPickup() {
    if (this.pickupState) {
      console.log("pickup state is : ", this.pickupState)
      let options = {
        context: { address: this.address, time: this.time, services: this.selectedservices, servicecost: this.totalcost, vehicle: this.vehicleID, vendor: this.vendorID, clientToken: this.clientToken, deliveryfee: this.deliveryfee },
        height: 100,
        fullscreen: true,
        viewContainerRef: this.vcRef,
      };

      this.modal.showModal(PickupModalComponent, options).then(res => {
        console.log("Response is : ", res);
        if (res === "closed") {
          return true;
        }
        else {
          let opt: BrainTreeOptions = {
            amount: (this.totalcost).toString(),
            collectDeviceData: true,
            requestThreeDSecureVerification: false,
          }
          this.braintree = new Braintree();
          this.braintree.startPayment(this.clientToken, opt).then((res: BrainTreeOutput) => {
            console.log("Payment Success : " + JSON.stringify(res));
            this.addressPUT()
            TNSFancyAlert.showSuccess(
              "Appointment!",
              "Appointment Created Successfully",
              "OK"
            );
            this.routerExtensions.navigate(["/status"]);

            // let options = {
            //     title: "Payment Success",
            //     message: "Your Payment has been Processed Successfully.",
            //     okButtonText: "OK"
            // };
            // alert(options).then(() => {
            //   this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });                                  
            // });
          }).catch((err: BrainTreeOutput) => {
            console.log("Payment Unsuccessfull :  " + err.msg);
            let options = {
              title: "Payment Unsuccessfull",
              message: "You have Cancelled the payment process for this appointment please try again to proceed",
              okButtonText: "OK"
            };
            alert(options).then(() => {
              this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });
            });
          })
        }
      });
    }
    else {
      alert("Please select Date and Time First")
    }
  }

  scheduleNow() {
    this.pickupState = true;
    let options = {
      title: "Create Appointment",
      message: "Are you sure you want to Create Appointment With Current Date and Time?",
      okButtonText: "Yes",
      cancelButtonText: "Cancel",
    };

    confirm(options).then((result: boolean) => {
      if (result === true) {
        let appointmentID = UUID.UUID()
        let vendorid = JSON.parse(ApplicationSettings.getString("vendorid", "{}"))
        let d = new Date();
        let date = d.toISOString()
        ApplicationSettings.setString("appointmentDate", JSON.stringify(d))
        console.log("final date is :", date, "and vendor is : ", JSON.parse(ApplicationSettings.getString("vendorid", "{}")))
        this.selectService.createAppointment(appointmentID, vendorid, date)
        this.confirmPickup()
      }
      else {
        console.log("****** Cancelled ****** ")
      }
    });
  }

  futureDate() {
    this.pickupState = true;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "appointmentID": this.appointmentUUID,
        "vendorID": this.vendorID,
      }
    };
    this.router.navigate(["/calendar"], navigationExtras);
  }

  onBack() {
    this.routerExtensions.backToPreviousPage();
  }


}


