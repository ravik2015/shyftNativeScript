import { Pipe, PipeTransform } from "@angular/core";
import { flatMap } from "lodash/flatMap";
import * as _ from 'lodash'
import { uniqBy } from "lodash/uniqBy"
import { Observable } from "rxjs/Observable";
import * as ApplicationSettings from "application-settings";
import * as moment from 'moment';

@Pipe({name:'AvailableAppointment', pure:true})
export class AvailableAppointment implements PipeTransform {

    mapAppointmentsToSlots(bayNumber, appointments) {    
        console.log("bay number is : ",bayNumber)   
        console.log("appointments is : ",appointments)           
        appointments.forEach(x => this.mapToBay(bayNumber, x));
    }

    mapToBay(bayNumber, appointment) {
        for (let i = 0; i < bayNumber.length; i++) {
            const bay = bayNumber[i];
            //sideeffect will modify appointment and specific bay timeslots if successful 
            if (bay.tryMap(appointment)) return;
            else continue;
            
        }

        if (appointment.bayTimeSlot == null) 
            appointment["isOverBook"] = true;
    }

    getDuration(services: any[]) {
        console.log(JSON.stringify(services))
        let duration = 0;
        services.forEach(x => duration += x["service"]["duration"]);
        return duration;

    }

    slotDuration(slot: any) {
        //each slot is 15 minutes
        return slot.length * 15;
    }

    // reduceToAvailableSlots(bayNumber: any[], customerAppointment:any) {
    //     //get all intervals
    //     let totalAvailableHours = flatMap(bayNumber, bay => bay.availableHours);
        
    //     //filter out the non-empty and too short intervals
    //     let unfilteredArray = totalAvailableHours.filter(x => x.appointment == null && this.getDuration(customerAppointment["serviceSelections"])*.75 <= this.slotDuration(x));
        
    //     //return unique intervals across the bayNumber
    //     return uniqBy(unfilteredArray, x=> x.intervalId);
    // }

    reduceToAvailableSlots(bayNumber: any[], customerAppointment:any) {
        // console.log("Customer Appointment is : ", JSON.stringify(customerAppointment))
        let selectedService = []
        customerAppointment.serviceSelections.map((selected) => {
            selectedService.push(selected.service);
        })
        console.log("selected services are --> ", selectedService)
        ApplicationSettings.setString("selectedservice", JSON.stringify(selectedService))
        // get all intervals
        let totalAvailableHours = _.flatMap(bayNumber, bay => bay.availableHours);
        // console.log(" TotalAvailableHours :" ,JSON.stringify(totalAvailableHours));
        // filter out the non-empty and too short intervals
        let unfilteredArray = totalAvailableHours.filter(x => x.appointment == null || this.getDuration(customerAppointment["serviceSelections"])*.75 <= this.slotDuration(x));
        // console.log(" UnfilteredArray :", JSON.stringify(unfilteredArray));
        // return unique intervals across the bayNumber
        return _.uniqBy(unfilteredArray, x=> x.intervalId);
    }


    convertToMilliseconds(hour:number):number
    {
        //convert Hours to milliseconds
        //60 minutes  60 seconds  1000 milliseconds
        return hour*60*60*1000;
    }

    //entrypoint of execution
    //given a datatype that includes vendordata and a customer appointment in formation
    //return the list of available appointment time slots that can be booked that will provide at least 75% of the total capacity needed to get the job done.
    transform(value: AvailableAppointmentSeedDataModel) {        
        console.log("vendor is ---->",JSON.stringify(value.vendor))
        console.log("selected date is ---->",value.selectedDate)
        console.log("All Appointments is ---->",value.appointments)
        console.log("Current Appointment is ---->",value.customerAppointment)
        let vendor = value.vendor;
        let appointments = value.appointments;
        let numberOfBays = value.vendor["bayNumber"];
        let customerAppointment = value.customerAppointment;

        let startHour = this.convertToMilliseconds(vendor["startHour"]) + value.selectedDate.getTime();
        let endHour = this.convertToMilliseconds(vendor["endHour"]) + value.selectedDate.getTime();
        

        console.log("StartHour is - ----> ", startHour, "End Hour is - ---> ", endHour)
        let bayNumber:Bay[] = [];
        for (let i = 0; i < numberOfBays; i++) {
            bayNumber.push(new Bay(i,startHour, endHour));
        }

        this.mapAppointmentsToSlots(bayNumber, appointments);
        let times =  this.reduceToAvailableSlots(bayNumber, customerAppointment);
        let obj = [];
        times.map((item)=>{
            console.log(" saurabh chauhan ", item.label);
            obj.push(item.label)
        })
        return obj;
    }
}

//use this type of class to feed data into the pipe.  In the component that uses the pipe
// you can assemble this class there or in a rich datamodel that the component depends on (e.g. NgStore or some wrapper around rest services)
class AvailableAppointmentSeedDataModel
{

    getSelectedDate(): Date
    {
        return this.selectedDate;
    }

    setSelectedDate(selectedDate:Date)
    {
        this.selectedDate = selectedDate;
    }

    setAppointments(appointments:Observable<any[]>) {
        this.appointments = appointments;
    }

    getAppointments(): any {
        return this.appointments;
    }

    constructor(public vendor:Observable<any>, public appointments:Observable<any[]>, public customerAppointment: Observable<any>, public selectedDate: Date) {}

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
}

class TimeSlot {
    public intervalId: number;
    public label: number;
    public appointment: any;

    constructor(intervalId, label, appointment) {
        this.intervalId = intervalId;
        this.label = label;
        this.appointment = appointment;
    }

    setAppointment(appointment: any) {
        this.appointment = appointment;
    }

}

class Bay {

    public bayId: number;
    public availableHours: TimeSlot[];

    public startHour: number;
    public endHour: number;
    public hoursOpen: number;

    constructor(bayId, startHour, endHour) {
        this.bayId = bayId;
        this.startHour = startHour;
        this.endHour = endHour;
        this.hoursOpen = this.getHours(this.startHour, this.endHour);
        this.availableHours = this.getInitialHours(this.startHour, this.hoursOpen);
    }

    getHours(startHour, endHour): number {
        //sixty seconds for each minute of 60 minutes in 1 hour
        const dateConstantToConvertSecondsToHours = 60*60*1000;

        //endSecondsSinceSomeOldEpoch minus startSecondsSinceSomeOldEpoch = secondsOfDuration
        return (endHour - startHour) / dateConstantToConvertSecondsToHours;
    }
    

    getInitialHours(startHour, hoursOpen): any[] {
        const intervalsPerHour = 4;
        const intervalToMillisecondsOffset = 60/intervalsPerHour*60*1000;

        let ret = [];
        for (let i = 0; i < hoursOpen * intervalsPerHour; i++) {
            ret.push(new TimeSlot(i,moment( startHour + i * intervalToMillisecondsOffset).format("hh:mm a")  ,null ));
            // ret.push(new TimeSlot(i,startHour + i * intervalToMillisecondsOffset,null ));
            
        }       
        console.log("ret", JSON.stringify(ret))
        return ret;
    }

    tryMap(appointment) {
        console.log("***** availableHours *****", this.availableHours)
        appointment.datetime = new Date(this.startHour) 
        console.log("**** appointment.datetime is ****", appointment.datetime)
        const intervalId = this.getInterval(appointment.datetime);
        const bayTimeSlot = this.availableHours.filter(x => x.intervalId == intervalId)[0];

        let duration = 0;
        let flag = false;     
        
        appointment.serviceSelections.forEach(x => duration += x["service"]["duration"]);

        console.log("*******  intervalId is : ", intervalId )        
        console.log("********   bayTimeSlot is   ****** ", bayTimeSlot)
        
        if (bayTimeSlot.appointment == null)
        {
            let contiguousTimeSlots = this.getContiguousTimeSlotAtInterval(bayTimeSlot.intervalId, this.availableHours);
            
            console.log("contiguousTimeSlot", JSON.stringify(contiguousTimeSlots))
            //if the timeslot is not occupied and the contiguous block of timeslots is at least 75% of the duration of my selected services
            if (contiguousTimeSlots.length >= 15 &&  duration >= .75 ) {
                appointment.timeSlots = [];
                
                // for(let durationMap=0; durationMap <= duration || durationMap/15 <= contiguousTimeSlots.length; durationMap+=15)
                for(let durationMap=0; durationMap <= duration ; durationMap+=15)
                {
                    // contiguousTimeSlots[durationMap/15].appointment = appointment;
                    // appointment.timeSlots.push(contiguousTimeSlots[durationMap/15]);
                        console.log("durationMap: "+durationMap);
                        // contiguousTimeSlots[durationMap/15].appointment = appointment;
                        // appointment.timeSlots.push(contiguousTimeSlots[durationMap/15]);
                        let currentContiguousTimeSlot = contiguousTimeSlots[durationMap/15];
                        currentContiguousTimeSlot.appointment = appointment;
                        appointment.timeSlots.push(currentContiguousTimeSlot);
    
                }
                flag = true;
               //contiguousTimeSlots.forEach(x => x.appointment = appointment);
                //appointment.timeSlots = contiguousTimeSlots;
                
            }
        }
        return flag;
    }

    getNextTimeSlotIndex(i: number, contiguousBlocks: any[]) {
        // the next timeslot is the interval after the last interval of the contiguousBlock of this interval i
        let curr = contiguousBlocks[i];
        return curr[curr.length - 1]["intervalId"] + 1;
    }

    getInterval(time:number) {
        return (time-this.startHour) / 15;
    }

    getContiguousTimeSlotAtInterval(i: number, timeSlots: any[]) {
        let continuousBlocks = [];
        let j = i;
        while (j < timeSlots.length && timeSlots[j].appointment == null) {
            continuousBlocks.push(timeSlots[j++]);
        }
        return continuousBlocks;
    }
}