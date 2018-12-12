"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page");
var calendar_services_1 = require("./calendar.services");
var angular_1 = require("nativescript-pro-ui/calendar/angular");
var selectservice_services_1 = require("../selectservice/selectservice.services");
var ApplicationSettings = require("application-settings");
var angular2_uuid_1 = require("angular2-uuid");
var moment = require("moment");
var CalendarComponent = (function () {
    function CalendarComponent(calendarService, _page, routerExtensions, route, selectService) {
        this.calendarService = calendarService;
        this._page = _page;
        this.routerExtensions = routerExtensions;
        this.route = route;
        this.selectService = selectService;
        this.selected = false;
        this.selectedDate = new Date();
        this.busy = true;
        this.test = [{ "intervalId": 0, "label": "08:41:03 pm", "appointment": null }, { "intervalId": 1, "label": "08:56:03 pm", "appointment": null }, { "intervalId": 2, "label": "09:11:03 pm", "appointment": null }, { "intervalId": 3, "label": "09:26:03 pm", "appointment": null }, { "intervalId": 4, "label": "09:41:03 pm", "appointment": null }, { "intervalId": 5, "label": "09:56:03 pm", "appointment": null }, { "intervalId": 6, "label": "10:11:03 pm", "appointment": null }, { "intervalId": 7, "label": "10:26:03 pm", "appointment": null }, { "intervalId": 8, "label": "10:41:03 pm", "appointment": null }, { "intervalId": 9, "label": "10:56:03 pm", "appointment": null }, { "intervalId": 10, "label": "11:11:03 pm", "appointment": null }, { "intervalId": 11, "label": "11:26:03 pm", "appointment": null }, { "intervalId": 12, "label": "11:41:03 pm", "appointment": null }, { "intervalId": 13, "label": "11:56:03 pm", "appointment": null }, { "intervalId": 14, "label": "12:11:03 am", "appointment": null }, { "intervalId": 15, "label": "12:26:03 am", "appointment": null }, { "intervalId": 16, "label": "12:41:03 am", "appointment": null }, { "intervalId": 17, "label": "12:56:03 am", "appointment": null }, { "intervalId": 18, "label": "01:11:03 am", "appointment": null }, { "intervalId": 19, "label": "01:26:03 am", "appointment": null }, { "intervalId": 20, "label": "01:41:03 am", "appointment": null }, { "intervalId": 21, "label": "01:56:03 am", "appointment": null }, { "intervalId": 22, "label": "02:11:03 am", "appointment": null }, { "intervalId": 23, "label": "02:26:03 am", "appointment": null }, { "intervalId": 24, "label": "02:41:03 am", "appointment": null }, { "intervalId": 25, "label": "02:56:03 am", "appointment": null }, { "intervalId": 26, "label": "03:11:03 am", "appointment": null }, { "intervalId": 27, "label": "03:26:03 am", "appointment": null }, { "intervalId": 28, "label": "03:41:03 am", "appointment": null }, { "intervalId": 29, "label": "03:56:03 am", "appointment": null }, { "intervalId": 30, "label": "04:11:03 am", "appointment": null }, { "intervalId": 31, "label": "04:26:03 am", "appointment": null }, { "intervalId": 32, "label": "04:41:03 am", "appointment": null }, { "intervalId": 33, "label": "04:56:03 am", "appointment": null }, { "intervalId": 34, "label": "05:11:03 am", "appointment": null }, { "intervalId": 35, "label": "05:26:03 am", "appointment": null }];
    }
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._page.actionBarHidden = true;
        this.route.queryParams.subscribe(function (params) {
            _this.vendorID = params["vendorID"];
            _this.appointmentID = params["appointmentID"];
            console.log("calendar_component ", params["vendorID"], params["appointmentID"]);
            ApplicationSettings.setString('appointmentID', JSON.stringify(_this.appointmentID));
            ApplicationSettings.setString('vendorId', JSON.stringify(_this.vendorID));
        });
        this.getAppointments();
        this.getCurrentAppointment();
    };
    CalendarComponent.prototype.getCurrentAppointment = function () {
        var _this = this;
        this.calendarService.currentAppointment()
            .subscribe(function (result) {
            console.log("Current Appointment Get Success : ", JSON.stringify(result));
            _this.customerAppointment = result;
        }, function (error) {
            console.log("Current Appointment Error ---- >", error);
        });
    };
    CalendarComponent.prototype.getAppointments = function () {
        var _this = this;
        this.calendarService.appointments()
            .subscribe(function (result) {
            console.log("Appointments Get Success");
            _this.appointments = result;
            _this.getCurrentVendor();
        }, function (error) {
            console.log("Appointments Error ---- >", error);
        });
    };
    CalendarComponent.prototype.getCurrentVendor = function () {
        var _this = this;
        this.calendarService.currentVendor()
            .subscribe(function (result) {
            console.log("currentVendor Get success ");
            _this.vendor = result,
                // this.selectedDate.setHours(0,60,0,0);                       
                console.log("this.customerAppointment   : ", JSON.stringify(_this.customerAppointment));
            _this.customerAppointment.serviceSelections = JSON.parse(ApplicationSettings.getString("servicesSelections"));
            _this.availableAppointmentSeedDataModel = new AvailableAppointmentSeedDataModel(_this.vendor, _this.appointments, _this.customerAppointment, _this.selectedDate);
            _this.busy = false;
        }, function (error) {
            console.log("Current Vendor Error ---> ", error);
        });
    };
    CalendarComponent.prototype.onListItem = function (args) {
        var tappedView = args.view, tappedService = tappedView.bindingContext;
        console.log("Selected Vendor is --------->" + args.index + " . " + JSON.stringify(tappedService));
    };
    CalendarComponent.prototype.calendarLoaded = function (args) {
        var calendar = args.object;
        // let curretDate = new Date();
        // let currentHours = curretDate.getHours();
        // let currentMinutes = curretDate.getMinutes();
        // let currentSeconds = curretDate.getSeconds();
        this.date = moment(calendar.displayedDate).format("MMMM DD YYYY");
        // this.date.setHours(currentHours);
        // this.date.setMinutes(currentMinutes);
        // this.date.setSeconds(currentSeconds);     
        var month = calendar.displayedDate.getMonth();
        var year = calendar.displayedDate.getFullYear();
        var firstDay = new Date(calendar.displayedDate.getFullYear(), calendar.displayedDate.getMonth(), 1);
        var lastDay = new Date(calendar.displayedDate.getFullYear(), calendar.displayedDate.getMonth() + 1, 0);
        // calendar.maxDate = new Date(year, month, lastDay.getDate())
        calendar.minDate = new Date(year, month, calendar.displayedDate.getDate());
        calendar.maxDate = moment(calendar.minDate).add(14, 'd').toDate();
        console.log("Calendar Component first_day : ", firstDay + " last day : ", lastDay);
        console.log("Calendar Component calendar.maxDate : ", calendar.maxDate + " minDate : ", calendar.minDate);
    };
    CalendarComponent.prototype.onCancel = function () {
        this.routerExtensions.backToPreviousPage();
    };
    CalendarComponent.prototype.onApply = function () {
        var appointmentID = angular2_uuid_1.UUID.UUID();
        var vendorid = JSON.parse(ApplicationSettings.getString("vendorid", "{}"));
        ApplicationSettings.setString("appointmentDate", JSON.stringify(this.finaldate));
        console.log("final date is :", this.finaldate, "and vendor is : ", JSON.parse(ApplicationSettings.getString("vendorid", "{}")));
        this.selectService.createAppointment(appointmentID, vendorid, this.finaldate);
        this.routerExtensions.backToPreviousPage();
    };
    CalendarComponent.prototype.dateSelected = function (args) {
        var datePicker = args.object;
        console.log('date is  ===> ' + datePicker.selectedDate);
        // let curretDate = new Date();
        // let currentHours = curretDate.getHours();
        // let currentMinutes = curretDate.getMinutes();
        // let currentSeconds = curretDate.getSeconds();
        this.selectedDate = datePicker.selectedDate;
        // this.selectedDate.setHours(currentHours);
        // this.selectedDate.setMinutes(currentMinutes);
        // this.selectedDate.setSeconds(currentSeconds);
        console.log("selected date time is : ", this.selectedDate);
        this.availableAppointmentSeedDataModel = new AvailableAppointmentSeedDataModel(this.vendor, this.appointments, this.customerAppointment, this.selectedDate);
        this.date = moment(datePicker.selectedDate).format("MMMM DD YYYY");
        console.log("moment timestamp", moment(datePicker.selectedDate).unix());
    };
    // public onTimeTap(args){
    //     this.selectedIndex = args.index;
    //     let tappedView = args.view,
    //     tappedTime = tappedView.bindingContext;
    //     console.log("Selected Time is : " + args.index + " . " + tappedTime, "moment is awesome", moment(this.date+' '+tappedTime))
    //     let dates = moment(this.date+' '+tappedTime)
    //     this.finaldate = dates.toISOString()    
    // }
    CalendarComponent.prototype.onTimeTap = function (args, index) {
        var listtime = args.object;
        // this.listtime = Label.text;
        this.selectedIndex = index;
        // let tappedView = args.view,
        // tappedTime = tappedView.bindingContext;
        console.log("Selected Time is : moment is awesome : ", moment(this.date + ' ' + listtime.text), "and index is : ", args.index, "gshgjgjgs", index);
        var dates = moment(this.date + ' ' + listtime.text);
        this.finaldate = dates.toISOString();
    };
    __decorate([
        core_1.ViewChild("myCalendar"),
        __metadata("design:type", angular_1.RadCalendarComponent)
    ], CalendarComponent.prototype, "_calendar", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            selector: "Calendar",
            moduleId: module.id,
            styleUrls: ['calendar.css'],
            templateUrl: "./calendar.component.html",
            providers: [calendar_services_1.CalendarService]
        }),
        __metadata("design:paramtypes", [calendar_services_1.CalendarService, page_1.Page, router_2.RouterExtensions, router_1.ActivatedRoute, selectservice_services_1.SelectService])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
var AvailableAppointmentSeedDataModel = (function () {
    function AvailableAppointmentSeedDataModel(vendor, appointments, customerAppointment, selectedDate) {
        this.vendor = vendor;
        this.appointments = appointments;
        this.customerAppointment = customerAppointment;
        this.selectedDate = selectedDate;
    }
    AvailableAppointmentSeedDataModel.prototype.getAppointments = function () {
        return this.appointments;
    };
    AvailableAppointmentSeedDataModel.prototype.getVendor = function () {
        return this.vendor;
    };
    AvailableAppointmentSeedDataModel.prototype.getAppointment = function () {
        return this.customerAppointment;
    };
    AvailableAppointmentSeedDataModel.prototype.setAppointment = function (appointments) {
        this.appointments = appointments;
    };
    AvailableAppointmentSeedDataModel.prototype.getSelectedDate = function () {
        return this.selectedDate;
    };
    AvailableAppointmentSeedDataModel.prototype.setSelectedDate = function (selectedDate) {
        this.selectedDate = selectedDate;
    };
    return AvailableAppointmentSeedDataModel;
}());
// import { Component, ViewChild, ElementRef } from "@angular/core";
// import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
// import { RouterExtensions } from "nativescript-angular/router";
// import { Page, ShownModallyData, NavigatedData } from "tns-core-modules/ui/page";
// import { CalendarService } from "./calendar.services";
// import { RadCalendarComponent } from "nativescript-pro-ui/calendar/angular";
// import { RadCalendar, CalendarEvent, CalendarDayViewEventSelectedData } from "nativescript-pro-ui/calendar";
// import { TextField } from "ui/text-field";
// import { isAndroid, isIOS, device, screen } from "platform";
// import { ObservableArray } from "tns-core-modules/data/observable-array";
// import { Observable } from "rxjs/Observable";
// import { Label } from "ui/Label";
// import { SelectService } from "../selectservice/selectservice.services"
// import { UUID } from 'angular2-uuid';
// import { alert } from "ui/dialogs";
// import {Color} from "color";
// import { TokenModel } from "nativescript-pro-ui/autocomplete";
// import * as moment from 'moment';
// @Component({
//     selector: "Calendar",
//     moduleId: module.id,
//     styleUrls: ['calendar.css'],
//     templateUrl: "./calendar.component.html",
//     providers: [CalendarService]
// })
// export class CalendarComponent {
//     public time;
//     public date;
//     public selected = false;
//     public selectedIndex : number;
//     public vendorID;
//     public appointmentID;
//     public customerAppointment;
//     public appointments;
//     public vendor;
//     public availableAppointmentSeedDataModel;
//     public selectedDate = new Date();
//     public finaldate;
//     public VS;
//     private busy = true;
//     public test = [{"intervalId":0,"label":"08:41:03 pm","appointment":null},{"intervalId":1,"label":"08:56:03 pm","appointment":null},{"intervalId":2,"label":"09:11:03 pm","appointment":null},{"intervalId":3,"label":"09:26:03 pm","appointment":null},{"intervalId":4,"label":"09:41:03 pm","appointment":null},{"intervalId":5,"label":"09:56:03 pm","appointment":null},{"intervalId":6,"label":"10:11:03 pm","appointment":null},{"intervalId":7,"label":"10:26:03 pm","appointment":null},{"intervalId":8,"label":"10:41:03 pm","appointment":null},{"intervalId":9,"label":"10:56:03 pm","appointment":null},{"intervalId":10,"label":"11:11:03 pm","appointment":null},{"intervalId":11,"label":"11:26:03 pm","appointment":null},{"intervalId":12,"label":"11:41:03 pm","appointment":null},{"intervalId":13,"label":"11:56:03 pm","appointment":null},{"intervalId":14,"label":"12:11:03 am","appointment":null},{"intervalId":15,"label":"12:26:03 am","appointment":null},{"intervalId":16,"label":"12:41:03 am","appointment":null},{"intervalId":17,"label":"12:56:03 am","appointment":null},{"intervalId":18,"label":"01:11:03 am","appointment":null},{"intervalId":19,"label":"01:26:03 am","appointment":null},{"intervalId":20,"label":"01:41:03 am","appointment":null},{"intervalId":21,"label":"01:56:03 am","appointment":null},{"intervalId":22,"label":"02:11:03 am","appointment":null},{"intervalId":23,"label":"02:26:03 am","appointment":null},{"intervalId":24,"label":"02:41:03 am","appointment":null},{"intervalId":25,"label":"02:56:03 am","appointment":null},{"intervalId":26,"label":"03:11:03 am","appointment":null},{"intervalId":27,"label":"03:26:03 am","appointment":null},{"intervalId":28,"label":"03:41:03 am","appointment":null},{"intervalId":29,"label":"03:56:03 am","appointment":null},{"intervalId":30,"label":"04:11:03 am","appointment":null},{"intervalId":31,"label":"04:26:03 am","appointment":null},{"intervalId":32,"label":"04:41:03 am","appointment":null},{"intervalId":33,"label":"04:56:03 am","appointment":null},{"intervalId":34,"label":"05:11:03 am","appointment":null},{"intervalId":35,"label":"05:26:03 am","appointment":null}]
//     @ViewChild("myCalendar") _calendar: RadCalendarComponent;
//     @ViewChild("time") listtime: ElementRef;    
//     constructor(private calendarService: CalendarService, private _page: Page, private routerExtensions: RouterExtensions, private route: ActivatedRoute, private selectService: SelectService) {
//     }
//     ngOnInit() {
//         this._page.actionBarHidden = true;    
//         this.route.queryParams.subscribe(params => {
//             this.vendorID = params["vendorID"]
//             this.appointmentID = params["appointmentID"]
//             console.log("calendar component ", params["vendorID"], params["appointmentID"]) 
//             localStorage.setItem('appointmentID', this.appointmentID);   
//             localStorage.setItem('vendorId', this.vendorID);  
//           });
//           this.getAppointments();
//           this.getCurrentAppointment();
//     }
//     public getCurrentAppointment(){
//         this.calendarService.currentAppointment()
//         .subscribe((result) => {
//                     console.log("Current Appointment Get Success : ", JSON.stringify(result))
//                     this.customerAppointment = result;
//             }, (error) => {
//                 console.log("Current Appointment Error ---- >", error)
//             });
//     }
//     public getAppointments(){
//         this.calendarService.appointments()
//         .subscribe((result) => {
//                     console.log("Appointments Get Success")
//                     this.appointments = result;
//                     this.getCurrentVendor();
//             }, (error) => {
//                 console.log("Appointments Error ---- >", error)
//             });
//     }
//     public getCurrentVendor(){
//         this.calendarService.currentVendor()
//         .subscribe((result) => {
//                     console.log("currentVendor Get success ")
//                     this.vendor = result,
//                     // this.selectedDate.setHours(0,60,0,0);                       
//                     console.log("this.customerAppointment   : ", JSON.stringify(this.customerAppointment));
//                     this.customerAppointment.serviceSelections = JSON.parse(localStorage.getItem("servicesSelections")) ;       
//                     this.availableAppointmentSeedDataModel = new AvailableAppointmentSeedDataModel(this.vendor, this.appointments, this.customerAppointment, this.selectedDate)
//                     this.busy = false;          
//             }, (error) => {
//                 console.log("Current Vendor Error ---> ", error)
//             });
//     }
//     public onListItem(args){
//         let tappedView = args.view,
//             tappedService = tappedView.bindingContext;
//         console.log("Selected Vendor is --------->" + args.index + " . " + JSON.stringify(tappedService))
//     }
//     calendarLoaded(args){
//         let calendar = <RadCalendar>args.object;
//         this.date = moment(calendar.displayedDate).format("MMMM DD YYYY")        
//         let month = calendar.displayedDate.getMonth();
//         let year = calendar.displayedDate.getFullYear();        
//         let firstDay = new Date(calendar.displayedDate.getFullYear(), calendar.displayedDate.getMonth(), 1);
//         let lastDay = new Date(calendar.displayedDate.getFullYear(), calendar.displayedDate.getMonth() + 1, 0);            
//         calendar.maxDate = new Date(year, month, lastDay.getDate())
//         calendar.minDate = new Date(year, month, calendar.displayedDate.getDate())
//     }
//     onCancel() {
//         this.routerExtensions.back();
//     }
//     onApply() {
//         let appointmentID = UUID.UUID()
//         let vendorid = localStorage.getItem("vendorid")
//         localStorage.setItem("appointmentDate", this.finaldate)
//         console.log("final date is :", this.finaldate, "and vendor is : ", localStorage.getItem("vendorid"))
//         let options = {
//             title: "Create Appointment",
//             message: "Are you sure you want to create Appointment",
//             okButtonText: "OK"
//             };
//             alert(options).then(() => {
//                 this.selectService.createAppointment(appointmentID, vendorid, this.finaldate)
//                 this.routerExtensions.back();
//             });
//     }
//     public dateSelected(args) {
//         let datePicker = <RadCalendar>args.object;
//             console.log('date is  ===> ' + datePicker.selectedDate);
//             this.selectedDate = datePicker.selectedDate;
//             this.availableAppointmentSeedDataModel = new AvailableAppointmentSeedDataModel(this.vendor, this.appointments, this.customerAppointment, this.selectedDate)  
//             this.date = moment(datePicker.selectedDate).format("MMMM DD YYYY")
//             console.log("moment timestamp",moment(datePicker.selectedDate).unix())
//     }
//     public onTimeTap(args, index){
//         let listtime = <Label>args.object;
//         // this.listtime = Label.text;
//         this.selectedIndex = index;
//         // let tappedView = args.view,
//         // tappedTime = tappedView.bindingContext;
//         console.log("Selected Time is : moment is awesome : ", moment(this.date+' '+listtime.text), "and index is : ", args.index,"gshgjgjgs", index )
//         let dates = moment(this.date+' '+listtime.text)
//         this.finaldate = dates.toISOString()
//     }
//     rdlistloaded(args){
//         this.VS={backgroundColor: new Color(20,255,0,0)}
//     }
//     onItemLoading(args){
//         console.log("onItemLoading");
//         this.VS={backgroundColor: new Color(20,255,0,0)}
//         if(isIOS){
//             console.log(args.ios);
//             var newcolor = new Color(20,255,0,0);
//             args.ios.backgroundView.backgroundColor = newcolor.ios;
//         }
//     }
// }
// class AvailableAppointmentSeedDataModel
// {
//     getAppointments(): any {
//         return this.appointments;
//     }
//     constructor(public vendor:Observable<any>, public appointments:Observable<any[]>, public customerAppointment: Observable<any>, public selectedDate) {}
//     getVendor() 
//     {
//         return this.vendor;
//     }
//     getAppointment() 
//     {
//         return this.customerAppointment;
//     }
//     setAppointment(appointments: Observable<any[]>)
//     {
//         this.appointments = appointments;
//     }
//     getSelectedDate(): Date
//     {
//         return this.selectedDate;
//     }
//     setSelectedDate(selectedDate:Date)
//     {
//         this.selectedDate = selectedDate;
//     }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBQ2pFLDBDQUEyRTtBQUMzRSxzREFBK0Q7QUFDL0QsaURBQWlGO0FBQ2pGLHlEQUFzRDtBQUN0RCxnRUFBNEU7QUFPNUUsa0ZBQXdFO0FBQ3hFLDBEQUE0RDtBQUM1RCwrQ0FBcUM7QUFJckMsK0JBQWlDO0FBVWpDO0lBb0JJLDJCQUFvQixlQUFnQyxFQUFVLEtBQVcsRUFBVSxnQkFBa0MsRUFBVSxLQUFxQixFQUFVLGFBQTRCO1FBQXRLLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWhCbkwsYUFBUSxHQUFHLEtBQUssQ0FBQztRQVFqQixpQkFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFHekIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNiLFNBQUksR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMs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QiwyREFBMkQ7QUFDM0QsUUFBUTtBQUVSLDJCQUEyQjtBQUMzQix3Q0FBd0M7QUFDeEMsMkRBQTJEO0FBRTNELHFCQUFxQjtBQUNyQixxQ0FBcUM7QUFDckMsb0RBQW9EO0FBQ3BELHNFQUFzRTtBQUN0RSxZQUFZO0FBRVosUUFBUTtBQUVSLElBQUk7QUFFSiwwQ0FBMEM7QUFDMUMsSUFBSTtBQUNKLCtCQUErQjtBQUMvQixvQ0FBb0M7QUFDcEMsUUFBUTtBQUNSLDZKQUE2SjtBQUU3SixtQkFBbUI7QUFDbkIsUUFBUTtBQUNSLDhCQUE4QjtBQUM5QixRQUFRO0FBRVIsd0JBQXdCO0FBQ3hCLFFBQVE7QUFDUiwyQ0FBMkM7QUFDM0MsUUFBUTtBQUVSLHNEQUFzRDtBQUN0RCxRQUFRO0FBQ1IsNENBQTRDO0FBQzVDLFFBQVE7QUFFUiw4QkFBOEI7QUFDOUIsUUFBUTtBQUNSLG9DQUFvQztBQUNwQyxRQUFRO0FBRVIseUNBQXlDO0FBQ3pDLFFBQVE7QUFDUiw0Q0FBNEM7QUFDNUMsUUFBUTtBQUVSLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcywgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UsIFNob3duTW9kYWxseURhdGEsIE5hdmlnYXRlZERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcbmltcG9ydCB7IENhbGVuZGFyU2VydmljZSB9IGZyb20gXCIuL2NhbGVuZGFyLnNlcnZpY2VzXCI7XHJcbmltcG9ydCB7IFJhZENhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvY2FsZW5kYXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBSYWRDYWxlbmRhciwgQ2FsZW5kYXJFdmVudCwgQ2FsZW5kYXJEYXlWaWV3RXZlbnRTZWxlY3RlZERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9jYWxlbmRhclwiO1xyXG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gXCJ1aS9MYWJlbFwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TLCBkZXZpY2UsIHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgU2VsZWN0U2VydmljZSB9IGZyb20gXCIuLi9zZWxlY3RzZXJ2aWNlL3NlbGVjdHNlcnZpY2Uuc2VydmljZXNcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgVVVJRCB9IGZyb20gJ2FuZ3VsYXIyLXV1aWQnO1xyXG5pbXBvcnQgeyBhbGVydCB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcblxyXG5pbXBvcnQgeyBUb2tlbk1vZGVsIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvYXV0b2NvbXBsZXRlXCI7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiQ2FsZW5kYXJcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzdHlsZVVybHM6IFsnY2FsZW5kYXIuY3NzJ10sXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBwcm92aWRlcnM6IFtDYWxlbmRhclNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCB7XHJcblxyXG4gICAgcHVibGljIHRpbWU7XHJcbiAgICBwdWJsaWMgZGF0ZTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdmVuZG9ySUQ7XHJcbiAgICBwdWJsaWMgYXBwb2ludG1lbnRJRDtcclxuICAgIHB1YmxpYyBjdXN0b21lckFwcG9pbnRtZW50O1xyXG4gICAgcHVibGljIGFwcG9pbnRtZW50cztcclxuICAgIHB1YmxpYyB2ZW5kb3I7XHJcbiAgICBwdWJsaWMgYXZhaWxhYmxlQXBwb2ludG1lbnRTZWVkRGF0YU1vZGVsO1xyXG4gICAgcHVibGljIHNlbGVjdGVkRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBwdWJsaWMgZmluYWxkYXRlO1xyXG4gICAgcHVibGljIFZTO1xyXG4gICAgcHJpdmF0ZSBidXN5ID0gdHJ1ZTtcclxuICAgIHB1YmxpYyB0ZXN0ID0gW3tcImludGVydmFsSWRcIjowLFwibGFiZWxcIjpcIjA4OjQxOjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoxLFwibGFiZWxcIjpcIjA4OjU2OjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoyLFwibGFiZWxcIjpcIjA5OjExOjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjozLFwibGFiZWxcIjpcIjA5OjI2OjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjo0LFwibGFiZWxcIjpcIjA5OjQxOjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjo1LFwibGFiZWxcIjpcIjA5OjU2OjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjo2LFwibGFiZWxcIjpcIjEwOjExOjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjo3LFwibGFiZWxcIjpcIjEwOjI2OjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjo4LFwibGFiZWxcIjpcIjEwOjQxOjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjo5LFwibGFiZWxcIjpcIjEwOjU2OjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoxMCxcImxhYmVsXCI6XCIxMToxMTowMyBwbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MTEsXCJsYWJlbFwiOlwiMTE6MjY6MDMgcG1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjEyLFwibGFiZWxcIjpcIjExOjQxOjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoxMyxcImxhYmVsXCI6XCIxMTo1NjowMyBwbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MTQsXCJsYWJlbFwiOlwiMTI6MTE6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjE1LFwibGFiZWxcIjpcIjEyOjI2OjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoxNixcImxhYmVsXCI6XCIxMjo0MTowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MTcsXCJsYWJlbFwiOlwiMTI6NTY6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjE4LFwibGFiZWxcIjpcIjAxOjExOjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoxOSxcImxhYmVsXCI6XCIwMToyNjowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MjAsXCJsYWJlbFwiOlwiMDE6NDE6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjIxLFwibGFiZWxcIjpcIjAxOjU2OjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoyMixcImxhYmVsXCI6XCIwMjoxMTowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MjMsXCJsYWJlbFwiOlwiMDI6MjY6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjI0LFwibGFiZWxcIjpcIjAyOjQxOjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoyNSxcImxhYmVsXCI6XCIwMjo1NjowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MjYsXCJsYWJlbFwiOlwiMDM6MTE6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjI3LFwibGFiZWxcIjpcIjAzOjI2OjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoyOCxcImxhYmVsXCI6XCIwMzo0MTowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MjksXCJsYWJlbFwiOlwiMDM6NTY6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjMwLFwibGFiZWxcIjpcIjA0OjExOjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjozMSxcImxhYmVsXCI6XCIwNDoyNjowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MzIsXCJsYWJlbFwiOlwiMDQ6NDE6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjMzLFwibGFiZWxcIjpcIjA0OjU2OjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjozNCxcImxhYmVsXCI6XCIwNToxMTowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MzUsXCJsYWJlbFwiOlwiMDU6MjY6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH1dXHJcblxyXG4gICAgQFZpZXdDaGlsZChcIm15Q2FsZW5kYXJcIikgX2NhbGVuZGFyOiBSYWRDYWxlbmRhckNvbXBvbmVudDtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYWxlbmRhclNlcnZpY2U6IENhbGVuZGFyU2VydmljZSwgcHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBzZWxlY3RTZXJ2aWNlOiBTZWxlY3RTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTsgICAgXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgdGhpcy52ZW5kb3JJRCA9IHBhcmFtc1tcInZlbmRvcklEXCJdXHJcbiAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRJRCA9IHBhcmFtc1tcImFwcG9pbnRtZW50SURcIl1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYWxlbmRhcl9jb21wb25lbnQgXCIsIHBhcmFtc1tcInZlbmRvcklEXCJdLCBwYXJhbXNbXCJhcHBvaW50bWVudElEXCJdKSBcclxuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoJ2FwcG9pbnRtZW50SUQnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmFwcG9pbnRtZW50SUQpKTsgICBcclxuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoJ3ZlbmRvcklkJywgSlNPTi5zdHJpbmdpZnkodGhpcy52ZW5kb3JJRCkpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5nZXRBcHBvaW50bWVudHMoKTtcclxuICAgICAgICAgIHRoaXMuZ2V0Q3VycmVudEFwcG9pbnRtZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEN1cnJlbnRBcHBvaW50bWVudCgpe1xyXG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmN1cnJlbnRBcHBvaW50bWVudCgpXHJcbiAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDdXJyZW50IEFwcG9pbnRtZW50IEdldCBTdWNjZXNzIDogXCIsIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lckFwcG9pbnRtZW50ID0gcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgQXBwb2ludG1lbnQgRXJyb3IgLS0tLSA+XCIsIGVycm9yKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwb2ludG1lbnRzKCl7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UuYXBwb2ludG1lbnRzKClcclxuICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFwcG9pbnRtZW50cyBHZXQgU3VjY2Vzc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q3VycmVudFZlbmRvcigpO1xyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXBwb2ludG1lbnRzIEVycm9yIC0tLS0gPlwiLCBlcnJvcilcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldEN1cnJlbnRWZW5kb3IoKXtcclxuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5jdXJyZW50VmVuZG9yKClcclxuICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImN1cnJlbnRWZW5kb3IgR2V0IHN1Y2Nlc3MgXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52ZW5kb3IgPSByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZWxlY3RlZERhdGUuc2V0SG91cnMoMCw2MCwwLDApOyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLmN1c3RvbWVyQXBwb2ludG1lbnQgICA6IFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmN1c3RvbWVyQXBwb2ludG1lbnQpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyQXBwb2ludG1lbnQuc2VydmljZVNlbGVjdGlvbnMgPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwic2VydmljZXNTZWxlY3Rpb25zXCIpKSA7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlQXBwb2ludG1lbnRTZWVkRGF0YU1vZGVsID0gbmV3IEF2YWlsYWJsZUFwcG9pbnRtZW50U2VlZERhdGFNb2RlbCh0aGlzLnZlbmRvciwgdGhpcy5hcHBvaW50bWVudHMsIHRoaXMuY3VzdG9tZXJBcHBvaW50bWVudCwgdGhpcy5zZWxlY3RlZERhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXN5ID0gZmFsc2U7ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDdXJyZW50IFZlbmRvciBFcnJvciAtLS0+IFwiLCBlcnJvcilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uTGlzdEl0ZW0oYXJncyl7XHJcbiAgICAgICAgbGV0IHRhcHBlZFZpZXcgPSBhcmdzLnZpZXcsXHJcbiAgICAgICAgICAgIHRhcHBlZFNlcnZpY2UgPSB0YXBwZWRWaWV3LmJpbmRpbmdDb250ZXh0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgVmVuZG9yIGlzIC0tLS0tLS0tLT5cIiArIGFyZ3MuaW5kZXggKyBcIiAuIFwiICsgSlNPTi5zdHJpbmdpZnkodGFwcGVkU2VydmljZSkpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNhbGVuZGFyTG9hZGVkKGFyZ3Mpe1xyXG4gICAgICAgIGxldCBjYWxlbmRhciA9IDxSYWRDYWxlbmRhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICAvLyBsZXQgY3VycmV0RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgLy8gbGV0IGN1cnJlbnRIb3VycyA9IGN1cnJldERhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAvLyBsZXQgY3VycmVudE1pbnV0ZXMgPSBjdXJyZXREYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAvLyBsZXQgY3VycmVudFNlY29uZHMgPSBjdXJyZXREYXRlLmdldFNlY29uZHMoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGUgPSBtb21lbnQoY2FsZW5kYXIuZGlzcGxheWVkRGF0ZSkuZm9ybWF0KFwiTU1NTSBERCBZWVlZXCIpICAgXHJcbiAgICAgICAgLy8gdGhpcy5kYXRlLnNldEhvdXJzKGN1cnJlbnRIb3Vycyk7XHJcbiAgICAgICAgLy8gdGhpcy5kYXRlLnNldE1pbnV0ZXMoY3VycmVudE1pbnV0ZXMpO1xyXG4gICAgICAgIC8vIHRoaXMuZGF0ZS5zZXRTZWNvbmRzKGN1cnJlbnRTZWNvbmRzKTsgICAgIFxyXG4gICAgICAgIGxldCBtb250aCA9IGNhbGVuZGFyLmRpc3BsYXllZERhdGUuZ2V0TW9udGgoKTtcclxuICAgICAgICBsZXQgeWVhciA9IGNhbGVuZGFyLmRpc3BsYXllZERhdGUuZ2V0RnVsbFllYXIoKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBmaXJzdERheSA9IG5ldyBEYXRlKGNhbGVuZGFyLmRpc3BsYXllZERhdGUuZ2V0RnVsbFllYXIoKSwgY2FsZW5kYXIuZGlzcGxheWVkRGF0ZS5nZXRNb250aCgpLCAxKTtcclxuICAgICAgICBsZXQgbGFzdERheSA9IG5ldyBEYXRlKGNhbGVuZGFyLmRpc3BsYXllZERhdGUuZ2V0RnVsbFllYXIoKSwgY2FsZW5kYXIuZGlzcGxheWVkRGF0ZS5nZXRNb250aCgpICsgMSwgMCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2FsZW5kYXIubWF4RGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBsYXN0RGF5LmdldERhdGUoKSlcclxuICAgICAgICBjYWxlbmRhci5taW5EYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGNhbGVuZGFyLmRpc3BsYXllZERhdGUuZ2V0RGF0ZSgpKVxyXG4gICAgICAgIGNhbGVuZGFyLm1heERhdGUgPSBtb21lbnQoY2FsZW5kYXIubWluRGF0ZSkuYWRkKDE0LCdkJykudG9EYXRlKCkgICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbGVuZGFyIENvbXBvbmVudCBmaXJzdF9kYXkgOiBcIiwgZmlyc3REYXkgKyBcIiBsYXN0IGRheSA6IFwiLCBsYXN0RGF5ICk7ICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FsZW5kYXIgQ29tcG9uZW50IGNhbGVuZGFyLm1heERhdGUgOiBcIiwgY2FsZW5kYXIubWF4RGF0ZSArIFwiIG1pbkRhdGUgOiBcIiwgY2FsZW5kYXIubWluRGF0ZSApOyAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkNhbmNlbCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICBvbkFwcGx5KCkge1xyXG4gICAgICAgIGxldCBhcHBvaW50bWVudElEID0gVVVJRC5VVUlEKClcclxuICAgICAgICBsZXQgdmVuZG9yaWQgPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidmVuZG9yaWRcIiwgXCJ7fVwiKSlcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImFwcG9pbnRtZW50RGF0ZVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmZpbmFsZGF0ZSkpICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZpbmFsIGRhdGUgaXMgOlwiLCB0aGlzLmZpbmFsZGF0ZSwgXCJhbmQgdmVuZG9yIGlzIDogXCIsIEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJ2ZW5kb3JpZFwiLCBcInt9XCIpKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0U2VydmljZS5jcmVhdGVBcHBvaW50bWVudChhcHBvaW50bWVudElELCB2ZW5kb3JpZCwgdGhpcy5maW5hbGRhdGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICB9ICAgICAgICBcclxuXHJcbiAgICBwdWJsaWMgZGF0ZVNlbGVjdGVkKGFyZ3MpIHtcclxuICAgICAgICBsZXQgZGF0ZVBpY2tlciA9IDxSYWRDYWxlbmRhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGUgaXMgID09PT4gJyArIGRhdGVQaWNrZXIuc2VsZWN0ZWREYXRlKTtcclxuICAgICAgICAgICAgLy8gbGV0IGN1cnJldERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAvLyBsZXQgY3VycmVudEhvdXJzID0gY3VycmV0RGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICAvLyBsZXQgY3VycmVudE1pbnV0ZXMgPSBjdXJyZXREYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAgICAgLy8gbGV0IGN1cnJlbnRTZWNvbmRzID0gY3VycmV0RGF0ZS5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGVQaWNrZXIuc2VsZWN0ZWREYXRlO1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5zZWxlY3RlZERhdGUuc2V0SG91cnMoY3VycmVudEhvdXJzKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zZWxlY3RlZERhdGUuc2V0TWludXRlcyhjdXJyZW50TWludXRlcyk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2VsZWN0ZWREYXRlLnNldFNlY29uZHMoY3VycmVudFNlY29uZHMpO1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RlZCBkYXRlIHRpbWUgaXMgOiBcIiwgdGhpcy5zZWxlY3RlZERhdGUpXHJcbiAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlQXBwb2ludG1lbnRTZWVkRGF0YU1vZGVsID0gbmV3IEF2YWlsYWJsZUFwcG9pbnRtZW50U2VlZERhdGFNb2RlbCh0aGlzLnZlbmRvciwgdGhpcy5hcHBvaW50bWVudHMsIHRoaXMuY3VzdG9tZXJBcHBvaW50bWVudCwgdGhpcy5zZWxlY3RlZERhdGUpICBcclxuICAgICAgICAgICAgdGhpcy5kYXRlID0gbW9tZW50KGRhdGVQaWNrZXIuc2VsZWN0ZWREYXRlKS5mb3JtYXQoXCJNTU1NIEREIFlZWVlcIilcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb21lbnQgdGltZXN0YW1wXCIsbW9tZW50KGRhdGVQaWNrZXIuc2VsZWN0ZWREYXRlKS51bml4KCkpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIG9uVGltZVRhcChhcmdzKXtcclxuICAgIC8vICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBhcmdzLmluZGV4O1xyXG4gICAgLy8gICAgIGxldCB0YXBwZWRWaWV3ID0gYXJncy52aWV3LFxyXG4gICAgLy8gICAgIHRhcHBlZFRpbWUgPSB0YXBwZWRWaWV3LmJpbmRpbmdDb250ZXh0O1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgVGltZSBpcyA6IFwiICsgYXJncy5pbmRleCArIFwiIC4gXCIgKyB0YXBwZWRUaW1lLCBcIm1vbWVudCBpcyBhd2Vzb21lXCIsIG1vbWVudCh0aGlzLmRhdGUrJyAnK3RhcHBlZFRpbWUpKVxyXG4gICAgLy8gICAgIGxldCBkYXRlcyA9IG1vbWVudCh0aGlzLmRhdGUrJyAnK3RhcHBlZFRpbWUpXHJcbiAgICAvLyAgICAgdGhpcy5maW5hbGRhdGUgPSBkYXRlcy50b0lTT1N0cmluZygpICAgIFxyXG4gICAgLy8gfVxyXG5cclxuICAgIHB1YmxpYyBvblRpbWVUYXAoYXJncywgaW5kZXgpe1xyXG4gICAgICAgIGxldCBsaXN0dGltZSA9IDxMYWJlbD5hcmdzLm9iamVjdDtcclxuICAgICAgICAvLyB0aGlzLmxpc3R0aW1lID0gTGFiZWwudGV4dDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuICAgICAgICAvLyBsZXQgdGFwcGVkVmlldyA9IGFyZ3MudmlldyxcclxuICAgICAgICAvLyB0YXBwZWRUaW1lID0gdGFwcGVkVmlldy5iaW5kaW5nQ29udGV4dDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIFRpbWUgaXMgOiBtb21lbnQgaXMgYXdlc29tZSA6IFwiLCBtb21lbnQodGhpcy5kYXRlKycgJytsaXN0dGltZS50ZXh0KSwgXCJhbmQgaW5kZXggaXMgOiBcIiwgYXJncy5pbmRleCxcImdzaGdqZ2pnc1wiLCBpbmRleCApXHJcbiAgICAgICAgbGV0IGRhdGVzID0gbW9tZW50KHRoaXMuZGF0ZSsnICcrbGlzdHRpbWUudGV4dClcclxuICAgICAgICB0aGlzLmZpbmFsZGF0ZSA9IGRhdGVzLnRvSVNPU3RyaW5nKClcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQXZhaWxhYmxlQXBwb2ludG1lbnRTZWVkRGF0YU1vZGVsXHJcbntcclxuICAgIGdldEFwcG9pbnRtZW50cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFwcG9pbnRtZW50cztcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2ZW5kb3I6T2JzZXJ2YWJsZTxhbnk+LCBwdWJsaWMgYXBwb2ludG1lbnRzOk9ic2VydmFibGU8YW55W10+LCBwdWJsaWMgY3VzdG9tZXJBcHBvaW50bWVudDogT2JzZXJ2YWJsZTxhbnk+LCBwdWJsaWMgc2VsZWN0ZWREYXRlKSB7fVxyXG5cclxuICAgIGdldFZlbmRvcigpIFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZlbmRvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBcHBvaW50bWVudCgpIFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbWVyQXBwb2ludG1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QXBwb2ludG1lbnQoYXBwb2ludG1lbnRzOiBPYnNlcnZhYmxlPGFueVtdPilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFwcG9pbnRtZW50cyA9IGFwcG9pbnRtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RlZERhdGUoKTogRGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTZWxlY3RlZERhdGUoc2VsZWN0ZWREYXRlOkRhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBzZWxlY3RlZERhdGU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuLy8gaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG4vLyBpbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG4vLyBpbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG4vLyBpbXBvcnQgeyBQYWdlLCBTaG93bk1vZGFsbHlEYXRhLCBOYXZpZ2F0ZWREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG4vLyBpbXBvcnQgeyBDYWxlbmRhclNlcnZpY2UgfSBmcm9tIFwiLi9jYWxlbmRhci5zZXJ2aWNlc1wiO1xyXG4vLyBpbXBvcnQgeyBSYWRDYWxlbmRhckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL2NhbGVuZGFyL2FuZ3VsYXJcIjtcclxuLy8gaW1wb3J0IHsgUmFkQ2FsZW5kYXIsIENhbGVuZGFyRXZlbnQsIENhbGVuZGFyRGF5Vmlld0V2ZW50U2VsZWN0ZWREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvY2FsZW5kYXJcIjtcclxuLy8gaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuLy8gaW1wb3J0IHsgaXNBbmRyb2lkLCBpc0lPUywgZGV2aWNlLCBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuLy8gaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbi8vIGltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbi8vIGltcG9ydCB7IExhYmVsIH0gZnJvbSBcInVpL0xhYmVsXCI7XHJcbi8vIGltcG9ydCB7IFNlbGVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vc2VsZWN0c2VydmljZS9zZWxlY3RzZXJ2aWNlLnNlcnZpY2VzXCJcclxuLy8gaW1wb3J0IHsgVVVJRCB9IGZyb20gJ2FuZ3VsYXIyLXV1aWQnO1xyXG4vLyBpbXBvcnQgeyBhbGVydCB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbi8vIGltcG9ydCB7Q29sb3J9IGZyb20gXCJjb2xvclwiO1xyXG4vLyBpbXBvcnQgeyBUb2tlbk1vZGVsIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvYXV0b2NvbXBsZXRlXCI7XHJcbi8vIGltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuXHJcbi8vIEBDb21wb25lbnQoe1xyXG4vLyAgICAgc2VsZWN0b3I6IFwiQ2FsZW5kYXJcIixcclxuLy8gICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbi8vICAgICBzdHlsZVVybHM6IFsnY2FsZW5kYXIuY3NzJ10sXHJcbi8vICAgICB0ZW1wbGF0ZVVybDogXCIuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sXCIsXHJcbi8vICAgICBwcm92aWRlcnM6IFtDYWxlbmRhclNlcnZpY2VdXHJcbi8vIH0pXHJcbi8vIGV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCB7XHJcblxyXG4vLyAgICAgcHVibGljIHRpbWU7XHJcbi8vICAgICBwdWJsaWMgZGF0ZTtcclxuLy8gICAgIHB1YmxpYyBzZWxlY3RlZCA9IGZhbHNlO1xyXG4vLyAgICAgcHVibGljIHNlbGVjdGVkSW5kZXggOiBudW1iZXI7XHJcbi8vICAgICBwdWJsaWMgdmVuZG9ySUQ7XHJcbi8vICAgICBwdWJsaWMgYXBwb2ludG1lbnRJRDtcclxuLy8gICAgIHB1YmxpYyBjdXN0b21lckFwcG9pbnRtZW50O1xyXG4vLyAgICAgcHVibGljIGFwcG9pbnRtZW50cztcclxuLy8gICAgIHB1YmxpYyB2ZW5kb3I7XHJcbi8vICAgICBwdWJsaWMgYXZhaWxhYmxlQXBwb2ludG1lbnRTZWVkRGF0YU1vZGVsO1xyXG4vLyAgICAgcHVibGljIHNlbGVjdGVkRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbi8vICAgICBwdWJsaWMgZmluYWxkYXRlO1xyXG4vLyAgICAgcHVibGljIFZTO1xyXG4vLyAgICAgcHJpdmF0ZSBidXN5ID0gdHJ1ZTtcclxuLy8gICAgIHB1YmxpYyB0ZXN0ID0gW3tcImludGVydmFsSWRcIjowLFwibGFiZWxcIjpcIjA4OjQxOjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoxLFwibGFiZWxcIjpcIjA4OjU2OjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoyLFwibGFiZWxcIjpcIjA5OjExOjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjozLFwibGFiZWxcIjpcIjA5OjI2OjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjo0LFwibGFiZWxcIjpcIjA5OjQxOjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjo1LFwibGFiZWxcIjpcIjA5OjU2OjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjo2LFwibGFiZWxcIjpcIjEwOjExOjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjo3LFwibGFiZWxcIjpcIjEwOjI2OjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjo4LFwibGFiZWxcIjpcIjEwOjQxOjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjo5LFwibGFiZWxcIjpcIjEwOjU2OjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoxMCxcImxhYmVsXCI6XCIxMToxMTowMyBwbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MTEsXCJsYWJlbFwiOlwiMTE6MjY6MDMgcG1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjEyLFwibGFiZWxcIjpcIjExOjQxOjAzIHBtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoxMyxcImxhYmVsXCI6XCIxMTo1NjowMyBwbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MTQsXCJsYWJlbFwiOlwiMTI6MTE6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjE1LFwibGFiZWxcIjpcIjEyOjI2OjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoxNixcImxhYmVsXCI6XCIxMjo0MTowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MTcsXCJsYWJlbFwiOlwiMTI6NTY6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjE4LFwibGFiZWxcIjpcIjAxOjExOjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoxOSxcImxhYmVsXCI6XCIwMToyNjowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MjAsXCJsYWJlbFwiOlwiMDE6NDE6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjIxLFwibGFiZWxcIjpcIjAxOjU2OjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoyMixcImxhYmVsXCI6XCIwMjoxMTowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MjMsXCJsYWJlbFwiOlwiMDI6MjY6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjI0LFwibGFiZWxcIjpcIjAyOjQxOjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoyNSxcImxhYmVsXCI6XCIwMjo1NjowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MjYsXCJsYWJlbFwiOlwiMDM6MTE6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjI3LFwibGFiZWxcIjpcIjAzOjI2OjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjoyOCxcImxhYmVsXCI6XCIwMzo0MTowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MjksXCJsYWJlbFwiOlwiMDM6NTY6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjMwLFwibGFiZWxcIjpcIjA0OjExOjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjozMSxcImxhYmVsXCI6XCIwNDoyNjowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MzIsXCJsYWJlbFwiOlwiMDQ6NDE6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH0se1wiaW50ZXJ2YWxJZFwiOjMzLFwibGFiZWxcIjpcIjA0OjU2OjAzIGFtXCIsXCJhcHBvaW50bWVudFwiOm51bGx9LHtcImludGVydmFsSWRcIjozNCxcImxhYmVsXCI6XCIwNToxMTowMyBhbVwiLFwiYXBwb2ludG1lbnRcIjpudWxsfSx7XCJpbnRlcnZhbElkXCI6MzUsXCJsYWJlbFwiOlwiMDU6MjY6MDMgYW1cIixcImFwcG9pbnRtZW50XCI6bnVsbH1dXHJcblxyXG4vLyAgICAgQFZpZXdDaGlsZChcIm15Q2FsZW5kYXJcIikgX2NhbGVuZGFyOiBSYWRDYWxlbmRhckNvbXBvbmVudDtcclxuLy8gICAgIEBWaWV3Q2hpbGQoXCJ0aW1lXCIpIGxpc3R0aW1lOiBFbGVtZW50UmVmOyAgICBcclxuICAgIFxyXG4vLyAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYWxlbmRhclNlcnZpY2U6IENhbGVuZGFyU2VydmljZSwgcHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBzZWxlY3RTZXJ2aWNlOiBTZWxlY3RTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIFxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIG5nT25Jbml0KCkge1xyXG4vLyAgICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTsgICAgXHJcbi8vICAgICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuLy8gICAgICAgICAgICAgdGhpcy52ZW5kb3JJRCA9IHBhcmFtc1tcInZlbmRvcklEXCJdXHJcbi8vICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRJRCA9IHBhcmFtc1tcImFwcG9pbnRtZW50SURcIl1cclxuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYWxlbmRhciBjb21wb25lbnQgXCIsIHBhcmFtc1tcInZlbmRvcklEXCJdLCBwYXJhbXNbXCJhcHBvaW50bWVudElEXCJdKSBcclxuLy8gICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcG9pbnRtZW50SUQnLCB0aGlzLmFwcG9pbnRtZW50SUQpOyAgIFxyXG4vLyAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndmVuZG9ySWQnLCB0aGlzLnZlbmRvcklEKTsgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbi8vICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICAgIHRoaXMuZ2V0QXBwb2ludG1lbnRzKCk7XHJcbi8vICAgICAgICAgICB0aGlzLmdldEN1cnJlbnRBcHBvaW50bWVudCgpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBnZXRDdXJyZW50QXBwb2ludG1lbnQoKXtcclxuLy8gICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5jdXJyZW50QXBwb2ludG1lbnQoKVxyXG4vLyAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBBcHBvaW50bWVudCBHZXQgU3VjY2VzcyA6IFwiLCBKU09OLnN0cmluZ2lmeShyZXN1bHQpKVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJBcHBvaW50bWVudCA9IHJlc3VsdDtcclxuXHJcbi8vICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDdXJyZW50IEFwcG9pbnRtZW50IEVycm9yIC0tLS0gPlwiLCBlcnJvcilcclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHVibGljIGdldEFwcG9pbnRtZW50cygpe1xyXG4vLyAgICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmFwcG9pbnRtZW50cygpXHJcbi8vICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcHBvaW50bWVudHMgR2V0IFN1Y2Nlc3NcIilcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcG9pbnRtZW50cyA9IHJlc3VsdDtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEN1cnJlbnRWZW5kb3IoKTtcclxuLy8gICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFwcG9pbnRtZW50cyBFcnJvciAtLS0tID5cIiwgZXJyb3IpXHJcbiAgICAgICAgICAgICAgICBcclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICB9XHJcblxyXG5cclxuLy8gICAgIHB1YmxpYyBnZXRDdXJyZW50VmVuZG9yKCl7XHJcbi8vICAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UuY3VycmVudFZlbmRvcigpXHJcbi8vICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjdXJyZW50VmVuZG9yIEdldCBzdWNjZXNzIFwiKVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMudmVuZG9yID0gcmVzdWx0LFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2VsZWN0ZWREYXRlLnNldEhvdXJzKDAsNjAsMCwwKTsgICAgICAgICAgICAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5jdXN0b21lckFwcG9pbnRtZW50ICAgOiBcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5jdXN0b21lckFwcG9pbnRtZW50KSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lckFwcG9pbnRtZW50LnNlcnZpY2VTZWxlY3Rpb25zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNlcnZpY2VzU2VsZWN0aW9uc1wiKSkgOyAgICAgICBcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUFwcG9pbnRtZW50U2VlZERhdGFNb2RlbCA9IG5ldyBBdmFpbGFibGVBcHBvaW50bWVudFNlZWREYXRhTW9kZWwodGhpcy52ZW5kb3IsIHRoaXMuYXBwb2ludG1lbnRzLCB0aGlzLmN1c3RvbWVyQXBwb2ludG1lbnQsIHRoaXMuc2VsZWN0ZWREYXRlKVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlOyAgICAgICAgICBcclxuLy8gICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVmVuZG9yIEVycm9yIC0tLT4gXCIsIGVycm9yKVxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgb25MaXN0SXRlbShhcmdzKXtcclxuLy8gICAgICAgICBsZXQgdGFwcGVkVmlldyA9IGFyZ3MudmlldyxcclxuLy8gICAgICAgICAgICAgdGFwcGVkU2VydmljZSA9IHRhcHBlZFZpZXcuYmluZGluZ0NvbnRleHQ7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBWZW5kb3IgaXMgLS0tLS0tLS0tPlwiICsgYXJncy5pbmRleCArIFwiIC4gXCIgKyBKU09OLnN0cmluZ2lmeSh0YXBwZWRTZXJ2aWNlKSlcclxuLy8gICAgIH1cclxuICAgIFxyXG4vLyAgICAgY2FsZW5kYXJMb2FkZWQoYXJncyl7XHJcbi8vICAgICAgICAgbGV0IGNhbGVuZGFyID0gPFJhZENhbGVuZGFyPmFyZ3Mub2JqZWN0O1xyXG4vLyAgICAgICAgIHRoaXMuZGF0ZSA9IG1vbWVudChjYWxlbmRhci5kaXNwbGF5ZWREYXRlKS5mb3JtYXQoXCJNTU1NIEREIFlZWVlcIikgICAgICAgIFxyXG4vLyAgICAgICAgIGxldCBtb250aCA9IGNhbGVuZGFyLmRpc3BsYXllZERhdGUuZ2V0TW9udGgoKTtcclxuLy8gICAgICAgICBsZXQgeWVhciA9IGNhbGVuZGFyLmRpc3BsYXllZERhdGUuZ2V0RnVsbFllYXIoKTsgICAgICAgIFxyXG4vLyAgICAgICAgIGxldCBmaXJzdERheSA9IG5ldyBEYXRlKGNhbGVuZGFyLmRpc3BsYXllZERhdGUuZ2V0RnVsbFllYXIoKSwgY2FsZW5kYXIuZGlzcGxheWVkRGF0ZS5nZXRNb250aCgpLCAxKTtcclxuLy8gICAgICAgICBsZXQgbGFzdERheSA9IG5ldyBEYXRlKGNhbGVuZGFyLmRpc3BsYXllZERhdGUuZ2V0RnVsbFllYXIoKSwgY2FsZW5kYXIuZGlzcGxheWVkRGF0ZS5nZXRNb250aCgpICsgMSwgMCk7ICAgICAgICAgICAgXHJcbi8vICAgICAgICAgY2FsZW5kYXIubWF4RGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBsYXN0RGF5LmdldERhdGUoKSlcclxuLy8gICAgICAgICBjYWxlbmRhci5taW5EYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGNhbGVuZGFyLmRpc3BsYXllZERhdGUuZ2V0RGF0ZSgpKVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIG9uQ2FuY2VsKCkge1xyXG4vLyAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbi8vICAgICB9XHJcbiAgICAgXHJcbi8vICAgICBvbkFwcGx5KCkge1xyXG4vLyAgICAgICAgIGxldCBhcHBvaW50bWVudElEID0gVVVJRC5VVUlEKClcclxuLy8gICAgICAgICBsZXQgdmVuZG9yaWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInZlbmRvcmlkXCIpXHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhcHBvaW50bWVudERhdGVcIiwgdGhpcy5maW5hbGRhdGUpXHJcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJmaW5hbCBkYXRlIGlzIDpcIiwgdGhpcy5maW5hbGRhdGUsIFwiYW5kIHZlbmRvciBpcyA6IFwiLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInZlbmRvcmlkXCIpKVxyXG4vLyAgICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4vLyAgICAgICAgICAgICB0aXRsZTogXCJDcmVhdGUgQXBwb2ludG1lbnRcIixcclxuLy8gICAgICAgICAgICAgbWVzc2FnZTogXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY3JlYXRlIEFwcG9pbnRtZW50XCIsXHJcbi8vICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbi8vICAgICAgICAgICAgIH07XHJcbi8vICAgICAgICAgICAgIGFsZXJ0KG9wdGlvbnMpLnRoZW4oKCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RTZXJ2aWNlLmNyZWF0ZUFwcG9pbnRtZW50KGFwcG9pbnRtZW50SUQsIHZlbmRvcmlkLCB0aGlzLmZpbmFsZGF0ZSlcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBkYXRlU2VsZWN0ZWQoYXJncykge1xyXG4vLyAgICAgICAgIGxldCBkYXRlUGlja2VyID0gPFJhZENhbGVuZGFyPmFyZ3Mub2JqZWN0O1xyXG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0ZSBpcyAgPT09PiAnICsgZGF0ZVBpY2tlci5zZWxlY3RlZERhdGUpO1xyXG4vLyAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGVQaWNrZXIuc2VsZWN0ZWREYXRlO1xyXG4vLyAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUFwcG9pbnRtZW50U2VlZERhdGFNb2RlbCA9IG5ldyBBdmFpbGFibGVBcHBvaW50bWVudFNlZWREYXRhTW9kZWwodGhpcy52ZW5kb3IsIHRoaXMuYXBwb2ludG1lbnRzLCB0aGlzLmN1c3RvbWVyQXBwb2ludG1lbnQsIHRoaXMuc2VsZWN0ZWREYXRlKSAgXHJcbi8vICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG1vbWVudChkYXRlUGlja2VyLnNlbGVjdGVkRGF0ZSkuZm9ybWF0KFwiTU1NTSBERCBZWVlZXCIpXHJcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibW9tZW50IHRpbWVzdGFtcFwiLG1vbWVudChkYXRlUGlja2VyLnNlbGVjdGVkRGF0ZSkudW5peCgpKVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBvblRpbWVUYXAoYXJncywgaW5kZXgpe1xyXG4vLyAgICAgICAgIGxldCBsaXN0dGltZSA9IDxMYWJlbD5hcmdzLm9iamVjdDtcclxuLy8gICAgICAgICAvLyB0aGlzLmxpc3R0aW1lID0gTGFiZWwudGV4dDtcclxuLy8gICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuLy8gICAgICAgICAvLyBsZXQgdGFwcGVkVmlldyA9IGFyZ3MudmlldyxcclxuLy8gICAgICAgICAvLyB0YXBwZWRUaW1lID0gdGFwcGVkVmlldy5iaW5kaW5nQ29udGV4dDtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIFRpbWUgaXMgOiBtb21lbnQgaXMgYXdlc29tZSA6IFwiLCBtb21lbnQodGhpcy5kYXRlKycgJytsaXN0dGltZS50ZXh0KSwgXCJhbmQgaW5kZXggaXMgOiBcIiwgYXJncy5pbmRleCxcImdzaGdqZ2pnc1wiLCBpbmRleCApXHJcbi8vICAgICAgICAgbGV0IGRhdGVzID0gbW9tZW50KHRoaXMuZGF0ZSsnICcrbGlzdHRpbWUudGV4dClcclxuLy8gICAgICAgICB0aGlzLmZpbmFsZGF0ZSA9IGRhdGVzLnRvSVNPU3RyaW5nKClcclxuICAgICAgICBcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICByZGxpc3Rsb2FkZWQoYXJncyl7XHJcbi8vICAgICAgICAgdGhpcy5WUz17YmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoMjAsMjU1LDAsMCl9XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgb25JdGVtTG9hZGluZyhhcmdzKXtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIm9uSXRlbUxvYWRpbmdcIik7XHJcbi8vICAgICAgICAgdGhpcy5WUz17YmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoMjAsMjU1LDAsMCl9XHJcbiAgICAgICAgXHJcbi8vICAgICAgICAgaWYoaXNJT1Mpe1xyXG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcmdzLmlvcyk7XHJcbi8vICAgICAgICAgICAgIHZhciBuZXdjb2xvciA9IG5ldyBDb2xvcigyMCwyNTUsMCwwKTtcclxuLy8gICAgICAgICAgICAgYXJncy5pb3MuYmFja2dyb3VuZFZpZXcuYmFja2dyb3VuZENvbG9yID0gbmV3Y29sb3IuaW9zO1xyXG4vLyAgICAgICAgIH1cclxuIFxyXG4vLyAgICAgfVxyXG5cclxuLy8gfVxyXG5cclxuLy8gY2xhc3MgQXZhaWxhYmxlQXBwb2ludG1lbnRTZWVkRGF0YU1vZGVsXHJcbi8vIHtcclxuLy8gICAgIGdldEFwcG9pbnRtZW50cygpOiBhbnkge1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLmFwcG9pbnRtZW50cztcclxuLy8gICAgIH1cclxuLy8gICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2ZW5kb3I6T2JzZXJ2YWJsZTxhbnk+LCBwdWJsaWMgYXBwb2ludG1lbnRzOk9ic2VydmFibGU8YW55W10+LCBwdWJsaWMgY3VzdG9tZXJBcHBvaW50bWVudDogT2JzZXJ2YWJsZTxhbnk+LCBwdWJsaWMgc2VsZWN0ZWREYXRlKSB7fVxyXG5cclxuLy8gICAgIGdldFZlbmRvcigpIFxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLnZlbmRvcjtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBnZXRBcHBvaW50bWVudCgpIFxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLmN1c3RvbWVyQXBwb2ludG1lbnQ7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgc2V0QXBwb2ludG1lbnQoYXBwb2ludG1lbnRzOiBPYnNlcnZhYmxlPGFueVtdPilcclxuLy8gICAgIHtcclxuLy8gICAgICAgICB0aGlzLmFwcG9pbnRtZW50cyA9IGFwcG9pbnRtZW50cztcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBnZXRTZWxlY3RlZERhdGUoKTogRGF0ZVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRGF0ZTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBzZXRTZWxlY3RlZERhdGUoc2VsZWN0ZWREYXRlOkRhdGUpXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBzZWxlY3RlZERhdGU7XHJcbi8vICAgICB9XHJcblxyXG4vLyB9XHJcbiJdfQ==