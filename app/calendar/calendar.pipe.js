"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var ApplicationSettings = require("application-settings");
var moment = require("moment");
var AvailableAppointment = (function () {
    function AvailableAppointment() {
    }
    AvailableAppointment.prototype.mapAppointmentsToSlots = function (bayNumber, appointments) {
        var _this = this;
        console.log("bay number is : ", bayNumber);
        console.log("appointments is : ", appointments);
        appointments.forEach(function (x) { return _this.mapToBay(bayNumber, x); });
    };
    AvailableAppointment.prototype.mapToBay = function (bayNumber, appointment) {
        for (var i = 0; i < bayNumber.length; i++) {
            var bay = bayNumber[i];
            //sideeffect will modify appointment and specific bay timeslots if successful 
            if (bay.tryMap(appointment))
                return;
            else
                continue;
        }
        if (appointment.bayTimeSlot == null)
            appointment["isOverBook"] = true;
    };
    AvailableAppointment.prototype.getDuration = function (services) {
        console.log(JSON.stringify(services));
        var duration = 0;
        services.forEach(function (x) { return duration += x["service"]["duration"]; });
        return duration;
    };
    AvailableAppointment.prototype.slotDuration = function (slot) {
        //each slot is 15 minutes
        return slot.length * 15;
    };
    // reduceToAvailableSlots(bayNumber: any[], customerAppointment:any) {
    //     //get all intervals
    //     let totalAvailableHours = flatMap(bayNumber, bay => bay.availableHours);
    //     //filter out the non-empty and too short intervals
    //     let unfilteredArray = totalAvailableHours.filter(x => x.appointment == null && this.getDuration(customerAppointment["serviceSelections"])*.75 <= this.slotDuration(x));
    //     //return unique intervals across the bayNumber
    //     return uniqBy(unfilteredArray, x=> x.intervalId);
    // }
    AvailableAppointment.prototype.reduceToAvailableSlots = function (bayNumber, customerAppointment) {
        var _this = this;
        // console.log("Customer Appointment is : ", JSON.stringify(customerAppointment))
        var selectedService = [];
        customerAppointment.serviceSelections.map(function (selected) {
            selectedService.push(selected.service);
        });
        console.log("selected services are --> ", selectedService);
        ApplicationSettings.setString("selectedservice", JSON.stringify(selectedService));
        // get all intervals
        var totalAvailableHours = _.flatMap(bayNumber, function (bay) { return bay.availableHours; });
        // console.log(" TotalAvailableHours :" ,JSON.stringify(totalAvailableHours));
        // filter out the non-empty and too short intervals
        var unfilteredArray = totalAvailableHours.filter(function (x) { return x.appointment == null || _this.getDuration(customerAppointment["serviceSelections"]) * .75 <= _this.slotDuration(x); });
        // console.log(" UnfilteredArray :", JSON.stringify(unfilteredArray));
        // return unique intervals across the bayNumber
        return _.uniqBy(unfilteredArray, function (x) { return x.intervalId; });
    };
    AvailableAppointment.prototype.convertToMilliseconds = function (hour) {
        //convert Hours to milliseconds
        //60 minutes  60 seconds  1000 milliseconds
        return hour * 60 * 60 * 1000;
    };
    //entrypoint of execution
    //given a datatype that includes vendordata and a customer appointment in formation
    //return the list of available appointment time slots that can be booked that will provide at least 75% of the total capacity needed to get the job done.
    AvailableAppointment.prototype.transform = function (value) {
        console.log("vendor is ---->", JSON.stringify(value.vendor));
        console.log("selected date is ---->", value.selectedDate);
        console.log("All Appointments is ---->", value.appointments);
        console.log("Current Appointment is ---->", value.customerAppointment);
        var vendor = value.vendor;
        var appointments = value.appointments;
        var numberOfBays = value.vendor["bayNumber"];
        var customerAppointment = value.customerAppointment;
        var startHour = this.convertToMilliseconds(vendor["startHour"]) + value.selectedDate.getTime();
        var endHour = this.convertToMilliseconds(vendor["endHour"]) + value.selectedDate.getTime();
        console.log("StartHour is - ----> ", startHour, "End Hour is - ---> ", endHour);
        var bayNumber = [];
        for (var i = 0; i < numberOfBays; i++) {
            bayNumber.push(new Bay(i, startHour, endHour));
        }
        this.mapAppointmentsToSlots(bayNumber, appointments);
        var times = this.reduceToAvailableSlots(bayNumber, customerAppointment);
        var obj = [];
        times.map(function (item) {
            console.log(" saurabh chauhan ", item.label);
            obj.push(item.label);
        });
        return obj;
    };
    AvailableAppointment = __decorate([
        core_1.Pipe({ name: 'AvailableAppointment', pure: true })
    ], AvailableAppointment);
    return AvailableAppointment;
}());
exports.AvailableAppointment = AvailableAppointment;
//use this type of class to feed data into the pipe.  In the component that uses the pipe
// you can assemble this class there or in a rich datamodel that the component depends on (e.g. NgStore or some wrapper around rest services)
var AvailableAppointmentSeedDataModel = (function () {
    function AvailableAppointmentSeedDataModel(vendor, appointments, customerAppointment, selectedDate) {
        this.vendor = vendor;
        this.appointments = appointments;
        this.customerAppointment = customerAppointment;
        this.selectedDate = selectedDate;
    }
    AvailableAppointmentSeedDataModel.prototype.getSelectedDate = function () {
        return this.selectedDate;
    };
    AvailableAppointmentSeedDataModel.prototype.setSelectedDate = function (selectedDate) {
        this.selectedDate = selectedDate;
    };
    AvailableAppointmentSeedDataModel.prototype.setAppointments = function (appointments) {
        this.appointments = appointments;
    };
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
    return AvailableAppointmentSeedDataModel;
}());
var TimeSlot = (function () {
    function TimeSlot(intervalId, label, appointment) {
        this.intervalId = intervalId;
        this.label = label;
        this.appointment = appointment;
    }
    TimeSlot.prototype.setAppointment = function (appointment) {
        this.appointment = appointment;
    };
    return TimeSlot;
}());
var Bay = (function () {
    function Bay(bayId, startHour, endHour) {
        this.bayId = bayId;
        this.startHour = startHour;
        this.endHour = endHour;
        this.hoursOpen = this.getHours(this.startHour, this.endHour);
        this.availableHours = this.getInitialHours(this.startHour, this.hoursOpen);
    }
    Bay.prototype.getHours = function (startHour, endHour) {
        //sixty seconds for each minute of 60 minutes in 1 hour
        var dateConstantToConvertSecondsToHours = 60 * 60 * 1000;
        //endSecondsSinceSomeOldEpoch minus startSecondsSinceSomeOldEpoch = secondsOfDuration
        return (endHour - startHour) / dateConstantToConvertSecondsToHours;
    };
    Bay.prototype.getInitialHours = function (startHour, hoursOpen) {
        var intervalsPerHour = 4;
        var intervalToMillisecondsOffset = 60 / intervalsPerHour * 60 * 1000;
        var ret = [];
        for (var i = 0; i < hoursOpen * intervalsPerHour; i++) {
            ret.push(new TimeSlot(i, moment(startHour + i * intervalToMillisecondsOffset).format("hh:mm a"), null));
            // ret.push(new TimeSlot(i,startHour + i * intervalToMillisecondsOffset,null ));
        }
        console.log("ret", JSON.stringify(ret));
        return ret;
    };
    Bay.prototype.tryMap = function (appointment) {
        console.log("***** availableHours *****", this.availableHours);
        appointment.datetime = new Date(this.startHour);
        console.log("**** appointment.datetime is ****", appointment.datetime);
        var intervalId = this.getInterval(appointment.datetime);
        var bayTimeSlot = this.availableHours.filter(function (x) { return x.intervalId == intervalId; })[0];
        var duration = 0;
        var flag = false;
        appointment.serviceSelections.forEach(function (x) { return duration += x["service"]["duration"]; });
        console.log("*******  intervalId is : ", intervalId);
        console.log("********   bayTimeSlot is   ****** ", bayTimeSlot);
        if (bayTimeSlot.appointment == null) {
            var contiguousTimeSlots = this.getContiguousTimeSlotAtInterval(bayTimeSlot.intervalId, this.availableHours);
            console.log("contiguousTimeSlot", JSON.stringify(contiguousTimeSlots));
            //if the timeslot is not occupied and the contiguous block of timeslots is at least 75% of the duration of my selected services
            if (contiguousTimeSlots.length >= 15 && duration >= .75) {
                appointment.timeSlots = [];
                // for(let durationMap=0; durationMap <= duration || durationMap/15 <= contiguousTimeSlots.length; durationMap+=15)
                for (var durationMap = 0; durationMap <= duration; durationMap += 15) {
                    // contiguousTimeSlots[durationMap/15].appointment = appointment;
                    // appointment.timeSlots.push(contiguousTimeSlots[durationMap/15]);
                    console.log("durationMap: " + durationMap);
                    // contiguousTimeSlots[durationMap/15].appointment = appointment;
                    // appointment.timeSlots.push(contiguousTimeSlots[durationMap/15]);
                    var currentContiguousTimeSlot = contiguousTimeSlots[durationMap / 15];
                    currentContiguousTimeSlot.appointment = appointment;
                    appointment.timeSlots.push(currentContiguousTimeSlot);
                }
                flag = true;
                //contiguousTimeSlots.forEach(x => x.appointment = appointment);
                //appointment.timeSlots = contiguousTimeSlots;
            }
        }
        return flag;
    };
    Bay.prototype.getNextTimeSlotIndex = function (i, contiguousBlocks) {
        // the next timeslot is the interval after the last interval of the contiguousBlock of this interval i
        var curr = contiguousBlocks[i];
        return curr[curr.length - 1]["intervalId"] + 1;
    };
    Bay.prototype.getInterval = function (time) {
        return (time - this.startHour) / 15;
    };
    Bay.prototype.getContiguousTimeSlotAtInterval = function (i, timeSlots) {
        var continuousBlocks = [];
        var j = i;
        while (j < timeSlots.length && timeSlots[j].appointment == null) {
            continuousBlocks.push(timeSlots[j++]);
        }
        return continuousBlocks;
    };
    return Bay;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhbGVuZGFyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Q7QUFFcEQsMEJBQTJCO0FBRzNCLDBEQUE0RDtBQUM1RCwrQkFBaUM7QUFHakM7SUFBQTtJQXVHQSxDQUFDO0lBckdHLHFEQUFzQixHQUF0QixVQUF1QixTQUFTLEVBQUUsWUFBWTtRQUE5QyxpQkFJQztRQUhHLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUMsU0FBUyxDQUFDLENBQUE7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBQyxZQUFZLENBQUMsQ0FBQTtRQUM5QyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsdUNBQVEsR0FBUixVQUFTLFNBQVMsRUFBRSxXQUFXO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3hDLElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6Qiw4RUFBOEU7WUFDOUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDcEMsSUFBSTtnQkFBQyxRQUFRLENBQUM7UUFFbEIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDO1lBQ2hDLFdBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDekMsQ0FBQztJQUVELDBDQUFXLEdBQVgsVUFBWSxRQUFlO1FBQ3ZCLE9BQU8s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bXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGZsYXRNYXAgfSBmcm9tIFwibG9kYXNoL2ZsYXRNYXBcIjtcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHsgdW5pcUJ5IH0gZnJvbSBcImxvZGFzaC91bmlxQnlcIlxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuQFBpcGUoe25hbWU6J0F2YWlsYWJsZUFwcG9pbnRtZW50JywgcHVyZTp0cnVlfSlcbmV4cG9ydCBjbGFzcyBBdmFpbGFibGVBcHBvaW50bWVudCBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gICAgbWFwQXBwb2ludG1lbnRzVG9TbG90cyhiYXlOdW1iZXIsIGFwcG9pbnRtZW50cykgeyAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCJiYXkgbnVtYmVyIGlzIDogXCIsYmF5TnVtYmVyKSAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcImFwcG9pbnRtZW50cyBpcyA6IFwiLGFwcG9pbnRtZW50cykgICAgICAgICAgIFxuICAgICAgICBhcHBvaW50bWVudHMuZm9yRWFjaCh4ID0+IHRoaXMubWFwVG9CYXkoYmF5TnVtYmVyLCB4KSk7XG4gICAgfVxuXG4gICAgbWFwVG9CYXkoYmF5TnVtYmVyLCBhcHBvaW50bWVudCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJheU51bWJlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYmF5ID0gYmF5TnVtYmVyW2ldO1xuICAgICAgICAgICAgLy9zaWRlZWZmZWN0IHdpbGwgbW9kaWZ5IGFwcG9pbnRtZW50IGFuZCBzcGVjaWZpYyBiYXkgdGltZXNsb3RzIGlmIHN1Y2Nlc3NmdWwgXG4gICAgICAgICAgICBpZiAoYmF5LnRyeU1hcChhcHBvaW50bWVudCkpIHJldHVybjtcbiAgICAgICAgICAgIGVsc2UgY29udGludWU7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcHBvaW50bWVudC5iYXlUaW1lU2xvdCA9PSBudWxsKSBcbiAgICAgICAgICAgIGFwcG9pbnRtZW50W1wiaXNPdmVyQm9va1wiXSA9IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0RHVyYXRpb24oc2VydmljZXM6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHNlcnZpY2VzKSlcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gMDtcbiAgICAgICAgc2VydmljZXMuZm9yRWFjaCh4ID0+IGR1cmF0aW9uICs9IHhbXCJzZXJ2aWNlXCJdW1wiZHVyYXRpb25cIl0pO1xuICAgICAgICByZXR1cm4gZHVyYXRpb247XG5cbiAgICB9XG5cbiAgICBzbG90RHVyYXRpb24oc2xvdDogYW55KSB7XG4gICAgICAgIC8vZWFjaCBzbG90IGlzIDE1IG1pbnV0ZXNcbiAgICAgICAgcmV0dXJuIHNsb3QubGVuZ3RoICogMTU7XG4gICAgfVxuXG4gICAgLy8gcmVkdWNlVG9BdmFpbGFibGVTbG90cyhiYXlOdW1iZXI6IGFueVtdLCBjdXN0b21lckFwcG9pbnRtZW50OmFueSkge1xuICAgIC8vICAgICAvL2dldCBhbGwgaW50ZXJ2YWxzXG4gICAgLy8gICAgIGxldCB0b3RhbEF2YWlsYWJsZUhvdXJzID0gZmxhdE1hcChiYXlOdW1iZXIsIGJheSA9PiBiYXkuYXZhaWxhYmxlSG91cnMpO1xuICAgICAgICBcbiAgICAvLyAgICAgLy9maWx0ZXIgb3V0IHRoZSBub24tZW1wdHkgYW5kIHRvbyBzaG9ydCBpbnRlcnZhbHNcbiAgICAvLyAgICAgbGV0IHVuZmlsdGVyZWRBcnJheSA9IHRvdGFsQXZhaWxhYmxlSG91cnMuZmlsdGVyKHggPT4geC5hcHBvaW50bWVudCA9PSBudWxsICYmIHRoaXMuZ2V0RHVyYXRpb24oY3VzdG9tZXJBcHBvaW50bWVudFtcInNlcnZpY2VTZWxlY3Rpb25zXCJdKSouNzUgPD0gdGhpcy5zbG90RHVyYXRpb24oeCkpO1xuICAgICAgICBcbiAgICAvLyAgICAgLy9yZXR1cm4gdW5pcXVlIGludGVydmFscyBhY3Jvc3MgdGhlIGJheU51bWJlclxuICAgIC8vICAgICByZXR1cm4gdW5pcUJ5KHVuZmlsdGVyZWRBcnJheSwgeD0+IHguaW50ZXJ2YWxJZCk7XG4gICAgLy8gfVxuXG4gICAgcmVkdWNlVG9BdmFpbGFibGVTbG90cyhiYXlOdW1iZXI6IGFueVtdLCBjdXN0b21lckFwcG9pbnRtZW50OmFueSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1c3RvbWVyIEFwcG9pbnRtZW50IGlzIDogXCIsIEpTT04uc3RyaW5naWZ5KGN1c3RvbWVyQXBwb2ludG1lbnQpKVxuICAgICAgICBsZXQgc2VsZWN0ZWRTZXJ2aWNlID0gW11cbiAgICAgICAgY3VzdG9tZXJBcHBvaW50bWVudC5zZXJ2aWNlU2VsZWN0aW9ucy5tYXAoKHNlbGVjdGVkKSA9PiB7XG4gICAgICAgICAgICBzZWxlY3RlZFNlcnZpY2UucHVzaChzZWxlY3RlZC5zZXJ2aWNlKTtcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RlZCBzZXJ2aWNlcyBhcmUgLS0+IFwiLCBzZWxlY3RlZFNlcnZpY2UpXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwic2VsZWN0ZWRzZXJ2aWNlXCIsIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkU2VydmljZSkpXG4gICAgICAgIC8vIGdldCBhbGwgaW50ZXJ2YWxzXG4gICAgICAgIGxldCB0b3RhbEF2YWlsYWJsZUhvdXJzID0gXy5mbGF0TWFwKGJheU51bWJlciwgYmF5ID0+IGJheS5hdmFpbGFibGVIb3Vycyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIFRvdGFsQXZhaWxhYmxlSG91cnMgOlwiICxKU09OLnN0cmluZ2lmeSh0b3RhbEF2YWlsYWJsZUhvdXJzKSk7XG4gICAgICAgIC8vIGZpbHRlciBvdXQgdGhlIG5vbi1lbXB0eSBhbmQgdG9vIHNob3J0IGludGVydmFsc1xuICAgICAgICBsZXQgdW5maWx0ZXJlZEFycmF5ID0gdG90YWxBdmFpbGFibGVIb3Vycy5maWx0ZXIoeCA9PiB4LmFwcG9pbnRtZW50ID09IG51bGwgfHwgdGhpcy5nZXREdXJhdGlvbihjdXN0b21lckFwcG9pbnRtZW50W1wic2VydmljZVNlbGVjdGlvbnNcIl0pKi43NSA8PSB0aGlzLnNsb3REdXJhdGlvbih4KSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIFVuZmlsdGVyZWRBcnJheSA6XCIsIEpTT04uc3RyaW5naWZ5KHVuZmlsdGVyZWRBcnJheSkpO1xuICAgICAgICAvLyByZXR1cm4gdW5pcXVlIGludGVydmFscyBhY3Jvc3MgdGhlIGJheU51bWJlclxuICAgICAgICByZXR1cm4gXy51bmlxQnkodW5maWx0ZXJlZEFycmF5LCB4PT4geC5pbnRlcnZhbElkKTtcbiAgICB9XG5cblxuICAgIGNvbnZlcnRUb01pbGxpc2Vjb25kcyhob3VyOm51bWJlcik6bnVtYmVyXG4gICAge1xuICAgICAgICAvL2NvbnZlcnQgSG91cnMgdG8gbWlsbGlzZWNvbmRzXG4gICAgICAgIC8vNjAgbWludXRlcyAgNjAgc2Vjb25kcyAgMTAwMCBtaWxsaXNlY29uZHNcbiAgICAgICAgcmV0dXJuIGhvdXIqNjAqNjAqMTAwMDtcbiAgICB9XG5cbiAgICAvL2VudHJ5cG9pbnQgb2YgZXhlY3V0aW9uXG4gICAgLy9naXZlbiBhIGRhdGF0eXBlIHRoYXQgaW5jbHVkZXMgdmVuZG9yZGF0YSBhbmQgYSBjdXN0b21lciBhcHBvaW50bWVudCBpbiBmb3JtYXRpb25cbiAgICAvL3JldHVybiB0aGUgbGlzdCBvZiBhdmFpbGFibGUgYXBwb2ludG1lbnQgdGltZSBzbG90cyB0aGF0IGNhbiBiZSBib29rZWQgdGhhdCB3aWxsIHByb3ZpZGUgYXQgbGVhc3QgNzUlIG9mIHRoZSB0b3RhbCBjYXBhY2l0eSBuZWVkZWQgdG8gZ2V0IHRoZSBqb2IgZG9uZS5cbiAgICB0cmFuc2Zvcm0odmFsdWU6IEF2YWlsYWJsZUFwcG9pbnRtZW50U2VlZERhdGFNb2RlbCkgeyAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwidmVuZG9yIGlzIC0tLS0+XCIsSlNPTi5zdHJpbmdpZnkodmFsdWUudmVuZG9yKSlcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RlZCBkYXRlIGlzIC0tLS0+XCIsdmFsdWUuc2VsZWN0ZWREYXRlKVxuICAgICAgICBjb25zb2xlLmxvZyhcIkFsbCBBcHBvaW50bWVudHMgaXMgLS0tLT5cIix2YWx1ZS5hcHBvaW50bWVudHMpXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBBcHBvaW50bWVudCBpcyAtLS0tPlwiLHZhbHVlLmN1c3RvbWVyQXBwb2ludG1lbnQpXG4gICAgICAgIGxldCB2ZW5kb3IgPSB2YWx1ZS52ZW5kb3I7XG4gICAgICAgIGxldCBhcHBvaW50bWVudHMgPSB2YWx1ZS5hcHBvaW50bWVudHM7XG4gICAgICAgIGxldCBudW1iZXJPZkJheXMgPSB2YWx1ZS52ZW5kb3JbXCJiYXlOdW1iZXJcIl07XG4gICAgICAgIGxldCBjdXN0b21lckFwcG9pbnRtZW50ID0gdmFsdWUuY3VzdG9tZXJBcHBvaW50bWVudDtcblxuICAgICAgICBsZXQgc3RhcnRIb3VyID0gdGhpcy5jb252ZXJ0VG9NaWxsaXNlY29uZHModmVuZG9yW1wic3RhcnRIb3VyXCJdKSArIHZhbHVlLnNlbGVjdGVkRGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIGxldCBlbmRIb3VyID0gdGhpcy5jb252ZXJ0VG9NaWxsaXNlY29uZHModmVuZG9yW1wiZW5kSG91clwiXSkgKyB2YWx1ZS5zZWxlY3RlZERhdGUuZ2V0VGltZSgpO1xuICAgICAgICBcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXJ0SG91ciBpcyAtIC0tLS0+IFwiLCBzdGFydEhvdXIsIFwiRW5kIEhvdXIgaXMgLSAtLS0+IFwiLCBlbmRIb3VyKVxuICAgICAgICBsZXQgYmF5TnVtYmVyOkJheVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZCYXlzOyBpKyspIHtcbiAgICAgICAgICAgIGJheU51bWJlci5wdXNoKG5ldyBCYXkoaSxzdGFydEhvdXIsIGVuZEhvdXIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFwQXBwb2ludG1lbnRzVG9TbG90cyhiYXlOdW1iZXIsIGFwcG9pbnRtZW50cyk7XG4gICAgICAgIGxldCB0aW1lcyA9ICB0aGlzLnJlZHVjZVRvQXZhaWxhYmxlU2xvdHMoYmF5TnVtYmVyLCBjdXN0b21lckFwcG9pbnRtZW50KTtcbiAgICAgICAgbGV0IG9iaiA9IFtdO1xuICAgICAgICB0aW1lcy5tYXAoKGl0ZW0pPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBzYXVyYWJoIGNoYXVoYW4gXCIsIGl0ZW0ubGFiZWwpO1xuICAgICAgICAgICAgb2JqLnB1c2goaXRlbS5sYWJlbClcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG59XG5cbi8vdXNlIHRoaXMgdHlwZSBvZiBjbGFzcyB0byBmZWVkIGRhdGEgaW50byB0aGUgcGlwZS4gIEluIHRoZSBjb21wb25lbnQgdGhhdCB1c2VzIHRoZSBwaXBlXG4vLyB5b3UgY2FuIGFzc2VtYmxlIHRoaXMgY2xhc3MgdGhlcmUgb3IgaW4gYSByaWNoIGRhdGFtb2RlbCB0aGF0IHRoZSBjb21wb25lbnQgZGVwZW5kcyBvbiAoZS5nLiBOZ1N0b3JlIG9yIHNvbWUgd3JhcHBlciBhcm91bmQgcmVzdCBzZXJ2aWNlcylcbmNsYXNzIEF2YWlsYWJsZUFwcG9pbnRtZW50U2VlZERhdGFNb2RlbFxue1xuXG4gICAgZ2V0U2VsZWN0ZWREYXRlKCk6IERhdGVcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRGF0ZTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZERhdGUoc2VsZWN0ZWREYXRlOkRhdGUpXG4gICAge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHNlbGVjdGVkRGF0ZTtcbiAgICB9XG5cbiAgICBzZXRBcHBvaW50bWVudHMoYXBwb2ludG1lbnRzOk9ic2VydmFibGU8YW55W10+KSB7XG4gICAgICAgIHRoaXMuYXBwb2ludG1lbnRzID0gYXBwb2ludG1lbnRzO1xuICAgIH1cblxuICAgIGdldEFwcG9pbnRtZW50cygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBvaW50bWVudHM7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIHZlbmRvcjpPYnNlcnZhYmxlPGFueT4sIHB1YmxpYyBhcHBvaW50bWVudHM6T2JzZXJ2YWJsZTxhbnlbXT4sIHB1YmxpYyBjdXN0b21lckFwcG9pbnRtZW50OiBPYnNlcnZhYmxlPGFueT4sIHB1YmxpYyBzZWxlY3RlZERhdGU6IERhdGUpIHt9XG5cbiAgICBnZXRWZW5kb3IoKSBcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlbmRvcjtcbiAgICB9XG5cbiAgICBnZXRBcHBvaW50bWVudCgpIFxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tZXJBcHBvaW50bWVudDtcbiAgICB9XG5cbiAgICBzZXRBcHBvaW50bWVudChhcHBvaW50bWVudHM6IE9ic2VydmFibGU8YW55W10+KVxuICAgIHtcbiAgICAgICAgdGhpcy5hcHBvaW50bWVudHMgPSBhcHBvaW50bWVudHM7XG4gICAgfVxufVxuXG5jbGFzcyBUaW1lU2xvdCB7XG4gICAgcHVibGljIGludGVydmFsSWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgbGFiZWw6IG51bWJlcjtcbiAgICBwdWJsaWMgYXBwb2ludG1lbnQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGludGVydmFsSWQsIGxhYmVsLCBhcHBvaW50bWVudCkge1xuICAgICAgICB0aGlzLmludGVydmFsSWQgPSBpbnRlcnZhbElkO1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMuYXBwb2ludG1lbnQgPSBhcHBvaW50bWVudDtcbiAgICB9XG5cbiAgICBzZXRBcHBvaW50bWVudChhcHBvaW50bWVudDogYW55KSB7XG4gICAgICAgIHRoaXMuYXBwb2ludG1lbnQgPSBhcHBvaW50bWVudDtcbiAgICB9XG5cbn1cblxuY2xhc3MgQmF5IHtcblxuICAgIHB1YmxpYyBiYXlJZDogbnVtYmVyO1xuICAgIHB1YmxpYyBhdmFpbGFibGVIb3VyczogVGltZVNsb3RbXTtcblxuICAgIHB1YmxpYyBzdGFydEhvdXI6IG51bWJlcjtcbiAgICBwdWJsaWMgZW5kSG91cjogbnVtYmVyO1xuICAgIHB1YmxpYyBob3Vyc09wZW46IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGJheUlkLCBzdGFydEhvdXIsIGVuZEhvdXIpIHtcbiAgICAgICAgdGhpcy5iYXlJZCA9IGJheUlkO1xuICAgICAgICB0aGlzLnN0YXJ0SG91ciA9IHN0YXJ0SG91cjtcbiAgICAgICAgdGhpcy5lbmRIb3VyID0gZW5kSG91cjtcbiAgICAgICAgdGhpcy5ob3Vyc09wZW4gPSB0aGlzLmdldEhvdXJzKHRoaXMuc3RhcnRIb3VyLCB0aGlzLmVuZEhvdXIpO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUhvdXJzID0gdGhpcy5nZXRJbml0aWFsSG91cnModGhpcy5zdGFydEhvdXIsIHRoaXMuaG91cnNPcGVuKTtcbiAgICB9XG5cbiAgICBnZXRIb3VycyhzdGFydEhvdXIsIGVuZEhvdXIpOiBudW1iZXIge1xuICAgICAgICAvL3NpeHR5IHNlY29uZHMgZm9yIGVhY2ggbWludXRlIG9mIDYwIG1pbnV0ZXMgaW4gMSBob3VyXG4gICAgICAgIGNvbnN0IGRhdGVDb25zdGFudFRvQ29udmVydFNlY29uZHNUb0hvdXJzID0gNjAqNjAqMTAwMDtcblxuICAgICAgICAvL2VuZFNlY29uZHNTaW5jZVNvbWVPbGRFcG9jaCBtaW51cyBzdGFydFNlY29uZHNTaW5jZVNvbWVPbGRFcG9jaCA9IHNlY29uZHNPZkR1cmF0aW9uXG4gICAgICAgIHJldHVybiAoZW5kSG91ciAtIHN0YXJ0SG91cikgLyBkYXRlQ29uc3RhbnRUb0NvbnZlcnRTZWNvbmRzVG9Ib3VycztcbiAgICB9XG4gICAgXG5cbiAgICBnZXRJbml0aWFsSG91cnMoc3RhcnRIb3VyLCBob3Vyc09wZW4pOiBhbnlbXSB7XG4gICAgICAgIGNvbnN0IGludGVydmFsc1BlckhvdXIgPSA0O1xuICAgICAgICBjb25zdCBpbnRlcnZhbFRvTWlsbGlzZWNvbmRzT2Zmc2V0ID0gNjAvaW50ZXJ2YWxzUGVySG91cio2MCoxMDAwO1xuXG4gICAgICAgIGxldCByZXQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3Vyc09wZW4gKiBpbnRlcnZhbHNQZXJIb3VyOyBpKyspIHtcbiAgICAgICAgICAgIHJldC5wdXNoKG5ldyBUaW1lU2xvdChpLG1vbWVudCggc3RhcnRIb3VyICsgaSAqIGludGVydmFsVG9NaWxsaXNlY29uZHNPZmZzZXQpLmZvcm1hdChcImhoOm1tIGFcIikgICxudWxsICkpO1xuICAgICAgICAgICAgLy8gcmV0LnB1c2gobmV3IFRpbWVTbG90KGksc3RhcnRIb3VyICsgaSAqIGludGVydmFsVG9NaWxsaXNlY29uZHNPZmZzZXQsbnVsbCApKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9ICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcInJldFwiLCBKU09OLnN0cmluZ2lmeShyZXQpKVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIHRyeU1hcChhcHBvaW50bWVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIioqKioqIGF2YWlsYWJsZUhvdXJzICoqKioqXCIsIHRoaXMuYXZhaWxhYmxlSG91cnMpXG4gICAgICAgIGFwcG9pbnRtZW50LmRhdGV0aW1lID0gbmV3IERhdGUodGhpcy5zdGFydEhvdXIpIFxuICAgICAgICBjb25zb2xlLmxvZyhcIioqKiogYXBwb2ludG1lbnQuZGF0ZXRpbWUgaXMgKioqKlwiLCBhcHBvaW50bWVudC5kYXRldGltZSlcbiAgICAgICAgY29uc3QgaW50ZXJ2YWxJZCA9IHRoaXMuZ2V0SW50ZXJ2YWwoYXBwb2ludG1lbnQuZGF0ZXRpbWUpO1xuICAgICAgICBjb25zdCBiYXlUaW1lU2xvdCA9IHRoaXMuYXZhaWxhYmxlSG91cnMuZmlsdGVyKHggPT4geC5pbnRlcnZhbElkID09IGludGVydmFsSWQpWzBdO1xuXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IDA7XG4gICAgICAgIGxldCBmbGFnID0gZmFsc2U7ICAgICBcbiAgICAgICAgXG4gICAgICAgIGFwcG9pbnRtZW50LnNlcnZpY2VTZWxlY3Rpb25zLmZvckVhY2goeCA9PiBkdXJhdGlvbiArPSB4W1wic2VydmljZVwiXVtcImR1cmF0aW9uXCJdKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIioqKioqKiogIGludGVydmFsSWQgaXMgOiBcIiwgaW50ZXJ2YWxJZCApICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCIqKioqKioqKiAgIGJheVRpbWVTbG90IGlzICAgKioqKioqIFwiLCBiYXlUaW1lU2xvdClcbiAgICAgICAgXG4gICAgICAgIGlmIChiYXlUaW1lU2xvdC5hcHBvaW50bWVudCA9PSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgY29udGlndW91c1RpbWVTbG90cyA9IHRoaXMuZ2V0Q29udGlndW91c1RpbWVTbG90QXRJbnRlcnZhbChiYXlUaW1lU2xvdC5pbnRlcnZhbElkLCB0aGlzLmF2YWlsYWJsZUhvdXJzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb250aWd1b3VzVGltZVNsb3RcIiwgSlNPTi5zdHJpbmdpZnkoY29udGlndW91c1RpbWVTbG90cykpXG4gICAgICAgICAgICAvL2lmIHRoZSB0aW1lc2xvdCBpcyBub3Qgb2NjdXBpZWQgYW5kIHRoZSBjb250aWd1b3VzIGJsb2NrIG9mIHRpbWVzbG90cyBpcyBhdCBsZWFzdCA3NSUgb2YgdGhlIGR1cmF0aW9uIG9mIG15IHNlbGVjdGVkIHNlcnZpY2VzXG4gICAgICAgICAgICBpZiAoY29udGlndW91c1RpbWVTbG90cy5sZW5ndGggPj0gMTUgJiYgIGR1cmF0aW9uID49IC43NSApIHtcbiAgICAgICAgICAgICAgICBhcHBvaW50bWVudC50aW1lU2xvdHMgPSBbXTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBmb3IobGV0IGR1cmF0aW9uTWFwPTA7IGR1cmF0aW9uTWFwIDw9IGR1cmF0aW9uIHx8IGR1cmF0aW9uTWFwLzE1IDw9IGNvbnRpZ3VvdXNUaW1lU2xvdHMubGVuZ3RoOyBkdXJhdGlvbk1hcCs9MTUpXG4gICAgICAgICAgICAgICAgZm9yKGxldCBkdXJhdGlvbk1hcD0wOyBkdXJhdGlvbk1hcCA8PSBkdXJhdGlvbiA7IGR1cmF0aW9uTWFwKz0xNSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnRpZ3VvdXNUaW1lU2xvdHNbZHVyYXRpb25NYXAvMTVdLmFwcG9pbnRtZW50ID0gYXBwb2ludG1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFwcG9pbnRtZW50LnRpbWVTbG90cy5wdXNoKGNvbnRpZ3VvdXNUaW1lU2xvdHNbZHVyYXRpb25NYXAvMTVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZHVyYXRpb25NYXA6IFwiK2R1cmF0aW9uTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnRpZ3VvdXNUaW1lU2xvdHNbZHVyYXRpb25NYXAvMTVdLmFwcG9pbnRtZW50ID0gYXBwb2ludG1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhcHBvaW50bWVudC50aW1lU2xvdHMucHVzaChjb250aWd1b3VzVGltZVNsb3RzW2R1cmF0aW9uTWFwLzE1XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudENvbnRpZ3VvdXNUaW1lU2xvdCA9IGNvbnRpZ3VvdXNUaW1lU2xvdHNbZHVyYXRpb25NYXAvMTVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRpZ3VvdXNUaW1lU2xvdC5hcHBvaW50bWVudCA9IGFwcG9pbnRtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwb2ludG1lbnQudGltZVNsb3RzLnB1c2goY3VycmVudENvbnRpZ3VvdXNUaW1lU2xvdCk7XG4gICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgLy9jb250aWd1b3VzVGltZVNsb3RzLmZvckVhY2goeCA9PiB4LmFwcG9pbnRtZW50ID0gYXBwb2ludG1lbnQpO1xuICAgICAgICAgICAgICAgIC8vYXBwb2ludG1lbnQudGltZVNsb3RzID0gY29udGlndW91c1RpbWVTbG90cztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmxhZztcbiAgICB9XG5cbiAgICBnZXROZXh0VGltZVNsb3RJbmRleChpOiBudW1iZXIsIGNvbnRpZ3VvdXNCbG9ja3M6IGFueVtdKSB7XG4gICAgICAgIC8vIHRoZSBuZXh0IHRpbWVzbG90IGlzIHRoZSBpbnRlcnZhbCBhZnRlciB0aGUgbGFzdCBpbnRlcnZhbCBvZiB0aGUgY29udGlndW91c0Jsb2NrIG9mIHRoaXMgaW50ZXJ2YWwgaVxuICAgICAgICBsZXQgY3VyciA9IGNvbnRpZ3VvdXNCbG9ja3NbaV07XG4gICAgICAgIHJldHVybiBjdXJyW2N1cnIubGVuZ3RoIC0gMV1bXCJpbnRlcnZhbElkXCJdICsgMTtcbiAgICB9XG5cbiAgICBnZXRJbnRlcnZhbCh0aW1lOm51bWJlcikge1xuICAgICAgICByZXR1cm4gKHRpbWUtdGhpcy5zdGFydEhvdXIpIC8gMTU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGlndW91c1RpbWVTbG90QXRJbnRlcnZhbChpOiBudW1iZXIsIHRpbWVTbG90czogYW55W10pIHtcbiAgICAgICAgbGV0IGNvbnRpbnVvdXNCbG9ja3MgPSBbXTtcbiAgICAgICAgbGV0IGogPSBpO1xuICAgICAgICB3aGlsZSAoaiA8IHRpbWVTbG90cy5sZW5ndGggJiYgdGltZVNsb3RzW2pdLmFwcG9pbnRtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVvdXNCbG9ja3MucHVzaCh0aW1lU2xvdHNbaisrXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRpbnVvdXNCbG9ja3M7XG4gICAgfVxufSJdfQ==