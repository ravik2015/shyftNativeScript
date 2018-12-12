import { Component, ViewChild, ElementRef } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, ShownModallyData, NavigatedData } from "tns-core-modules/ui/page";
import { CalendarService } from "./calendar.services";
import { RadCalendarComponent } from "nativescript-pro-ui/calendar/angular";
import { RadCalendar, CalendarEvent, CalendarDayViewEventSelectedData } from "nativescript-pro-ui/calendar";
import { Label } from "ui/Label";
import { TextField } from "ui/text-field";
import { isAndroid, isIOS, device, screen } from "platform";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Observable } from "rxjs/Observable";
import { SelectService } from "../selectservice/selectservice.services";
import * as ApplicationSettings from "application-settings";
import { UUID } from 'angular2-uuid';
import { alert } from "ui/dialogs";

import { TokenModel } from "nativescript-pro-ui/autocomplete";
import * as moment from 'moment';


@Component({
    selector: "Calendar",
    moduleId: module.id,
    styleUrls: ['calendar.css'],
    templateUrl: "./calendar.component.html",
    providers: [CalendarService]
})
export class CalendarComponent {

    public time;
    public date;
    public selected = false;
    public selectedIndex : number;
    public vendorID;
    public appointmentID;
    public customerAppointment;
    public appointments;
    public vendor;
    public availableAppointmentSeedDataModel;
    public selectedDate = new Date();
    public finaldate;
    public VS;
    private busy = true;
    public test = [{"intervalId":0,"label":"08:41:03 pm","appointment":null},{"intervalId":1,"label":"08:56:03 pm","appointment":null},{"intervalId":2,"label":"09:11:03 pm","appointment":null},{"intervalId":3,"label":"09:26:03 pm","appointment":null},{"intervalId":4,"label":"09:41:03 pm","appointment":null},{"intervalId":5,"label":"09:56:03 pm","appointment":null},{"intervalId":6,"label":"10:11:03 pm","appointment":null},{"intervalId":7,"label":"10:26:03 pm","appointment":null},{"intervalId":8,"label":"10:41:03 pm","appointment":null},{"intervalId":9,"label":"10:56:03 pm","appointment":null},{"intervalId":10,"label":"11:11:03 pm","appointment":null},{"intervalId":11,"label":"11:26:03 pm","appointment":null},{"intervalId":12,"label":"11:41:03 pm","appointment":null},{"intervalId":13,"label":"11:56:03 pm","appointment":null},{"intervalId":14,"label":"12:11:03 am","appointment":null},{"intervalId":15,"label":"12:26:03 am","appointment":null},{"intervalId":16,"label":"12:41:03 am","appointment":null},{"intervalId":17,"label":"12:56:03 am","appointment":null},{"intervalId":18,"label":"01:11:03 am","appointment":null},{"intervalId":19,"label":"01:26:03 am","appointment":null},{"intervalId":20,"label":"01:41:03 am","appointment":null},{"intervalId":21,"label":"01:56:03 am","appointment":null},{"intervalId":22,"label":"02:11:03 am","appointment":null},{"intervalId":23,"label":"02:26:03 am","appointment":null},{"intervalId":24,"label":"02:41:03 am","appointment":null},{"intervalId":25,"label":"02:56:03 am","appointment":null},{"intervalId":26,"label":"03:11:03 am","appointment":null},{"intervalId":27,"label":"03:26:03 am","appointment":null},{"intervalId":28,"label":"03:41:03 am","appointment":null},{"intervalId":29,"label":"03:56:03 am","appointment":null},{"intervalId":30,"label":"04:11:03 am","appointment":null},{"intervalId":31,"label":"04:26:03 am","appointment":null},{"intervalId":32,"label":"04:41:03 am","appointment":null},{"intervalId":33,"label":"04:56:03 am","appointment":null},{"intervalId":34,"label":"05:11:03 am","appointment":null},{"intervalId":35,"label":"05:26:03 am","appointment":null}]

    @ViewChild("myCalendar") _calendar: RadCalendarComponent;
    
    constructor(private calendarService: CalendarService, private _page: Page, private routerExtensions: RouterExtensions, private route: ActivatedRoute, private selectService: SelectService) {

        
    }

    ngOnInit() {
        this._page.actionBarHidden = true;    
        this.route.queryParams.subscribe(params => {
            this.vendorID = params["vendorID"]
            this.appointmentID = params["appointmentID"]
            console.log("calendar_component ", params["vendorID"], params["appointmentID"]) 
            ApplicationSettings.setString('appointmentID', JSON.stringify(this.appointmentID));   
            ApplicationSettings.setString('vendorId', JSON.stringify(this.vendorID));  
                           
            
          });
          this.getAppointments();
          this.getCurrentAppointment();
    }

    public getCurrentAppointment(){
        this.calendarService.currentAppointment()
        .subscribe((result) => {
                    console.log("Current Appointment Get Success : ", JSON.stringify(result))
                    this.customerAppointment = result;

            }, (error) => {
                console.log("Current Appointment Error ---- >", error)
            });
    }

    public getAppointments(){
        this.calendarService.appointments()
        .subscribe((result) => {
                    console.log("Appointments Get Success")
                    this.appointments = result;
                    this.getCurrentVendor();
            }, (error) => {
                console.log("Appointments Error ---- >", error)
                
            });
    }


    public getCurrentVendor(){
        this.calendarService.currentVendor()
        .subscribe((result) => {
                    console.log("currentVendor Get success ")
                    this.vendor = result,
                    // this.selectedDate.setHours(0,60,0,0);                       
                    console.log("this.customerAppointment   : ", JSON.stringify(this.customerAppointment));
                    this.customerAppointment.serviceSelections = JSON.parse(ApplicationSettings.getString("servicesSelections")) ;       
                    this.availableAppointmentSeedDataModel = new AvailableAppointmentSeedDataModel(this.vendor, this.appointments, this.customerAppointment, this.selectedDate)
                    this.busy = false;          
                      
            }, (error) => {
                console.log("Current Vendor Error ---> ", error)
            });
    }

    public onListItem(args){
        let tappedView = args.view,
            tappedService = tappedView.bindingContext;
        console.log("Selected Vendor is --------->" + args.index + " . " + JSON.stringify(tappedService))
    }
    
    calendarLoaded(args){
        let calendar = <RadCalendar>args.object;
        // let curretDate = new Date();
        // let currentHours = curretDate.getHours();
        // let currentMinutes = curretDate.getMinutes();
        // let currentSeconds = curretDate.getSeconds();
        
        this.date = moment(calendar.displayedDate).format("MMMM DD YYYY")   
        // this.date.setHours(currentHours);
        // this.date.setMinutes(currentMinutes);
        // this.date.setSeconds(currentSeconds);     
        let month = calendar.displayedDate.getMonth();
        let year = calendar.displayedDate.getFullYear();        
        let firstDay = new Date(calendar.displayedDate.getFullYear(), calendar.displayedDate.getMonth(), 1);
        let lastDay = new Date(calendar.displayedDate.getFullYear(), calendar.displayedDate.getMonth() + 1, 0);   
        
        
        // calendar.maxDate = new Date(year, month, lastDay.getDate())
        calendar.minDate = new Date(year, month, calendar.displayedDate.getDate())
        calendar.maxDate = moment(calendar.minDate).add(14,'d').toDate()        
        

        console.log("Calendar Component first_day : ", firstDay + " last day : ", lastDay );    
        console.log("Calendar Component calendar.maxDate : ", calendar.maxDate + " minDate : ", calendar.minDate );    
        
    }

    onCancel() {
        this.routerExtensions.backToPreviousPage();
    }
     
    onApply() {
        let appointmentID = UUID.UUID()
        let vendorid = JSON.parse(ApplicationSettings.getString("vendorid", "{}"))
        ApplicationSettings.setString("appointmentDate", JSON.stringify(this.finaldate))        
        console.log("final date is :", this.finaldate, "and vendor is : ", JSON.parse(ApplicationSettings.getString("vendorid", "{}")))
                this.selectService.createAppointment(appointmentID, vendorid, this.finaldate)
                this.routerExtensions.backToPreviousPage();
    }        

    public dateSelected(args) {
        let datePicker = <RadCalendar>args.object;
            console.log('date is  ===> ' + datePicker.selectedDate);
            // let curretDate = new Date();
            // let currentHours = curretDate.getHours();
            // let currentMinutes = curretDate.getMinutes();
            // let currentSeconds = curretDate.getSeconds();
            
            this.selectedDate = datePicker.selectedDate;

            // this.selectedDate.setHours(currentHours);
            // this.selectedDate.setMinutes(currentMinutes);
            // this.selectedDate.setSeconds(currentSeconds);
             console.log("selected date time is : ", this.selectedDate)
            this.availableAppointmentSeedDataModel = new AvailableAppointmentSeedDataModel(this.vendor, this.appointments, this.customerAppointment, this.selectedDate)  
            this.date = moment(datePicker.selectedDate).format("MMMM DD YYYY")
            console.log("moment timestamp",moment(datePicker.selectedDate).unix())
    }

    // public onTimeTap(args){
    //     this.selectedIndex = args.index;
    //     let tappedView = args.view,
    //     tappedTime = tappedView.bindingContext;
    //     console.log("Selected Time is : " + args.index + " . " + tappedTime, "moment is awesome", moment(this.date+' '+tappedTime))
    //     let dates = moment(this.date+' '+tappedTime)
    //     this.finaldate = dates.toISOString()    
    // }

    public onTimeTap(args, index){
        let listtime = <Label>args.object;
        // this.listtime = Label.text;
        this.selectedIndex = index;
        // let tappedView = args.view,
        // tappedTime = tappedView.bindingContext;
        console.log("Selected Time is : moment is awesome : ", moment(this.date+' '+listtime.text), "and index is : ", args.index,"gshgjgjgs", index )
        let dates = moment(this.date+' '+listtime.text)
        this.finaldate = dates.toISOString()
        
    }
}

class AvailableAppointmentSeedDataModel
{
    getAppointments(): any {
        return this.appointments;
    }
    constructor(public vendor:Observable<any>, public appointments:Observable<any[]>, public customerAppointment: Observable<any>, public selectedDate) {}

    getVendor() 
    {
        return this.vendor;
    }

    getAppointment() 
    {
        return this.customerAppointment;
    }

    setAppointment(appointments: Observable<any[]>)
    {
        this.appointments = appointments;
    }

    getSelectedDate(): Date
    {
        return this.selectedDate;
    }

    setSelectedDate(selectedDate:Date)
    {
        this.selectedDate = selectedDate;
    }

}


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
