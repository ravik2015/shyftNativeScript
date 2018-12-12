"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
// import { Observable } from "rxjs/Rx";
require("rxjs/add/observable/of");
var angular2_uuid_1 = require("angular2-uuid");
var utils = require("../shared/utils");
var ApplicationSettings = require("application-settings");
var selectservice_services_1 = require("../selectservice/selectservice.services");
var CalendarService = (function () {
    function CalendarService(http, selectService) {
        this.http = http;
        this.selectService = selectService;
        this.customerAppointmentId = ApplicationSettings.getString("appointmentID", "{}");
        this.vendorId = JSON.parse(ApplicationSettings.getString('vendorid', "{}"));
        this.customerAppointmentUrl = utils.baseurl + "appointment/" + this.customerAppointmentId;
        this.customerVendorUrl = utils.baseurl + "vendor/" + this.vendorId;
        this.appointmentsUrl = utils.baseurl + "appointment";
        console.log("localStorage items : ", this.customerAppointmentId, this.vendorId, this.customerAppointmentUrl, this.customerVendorUrl, this.appointmentsUrl);
    }
    //-------------------------------- Appointment GET Request ----------------------------------//
    CalendarService.prototype.currentAppointment = function () {
        return this.selectService.createCustomerAppointment(angular2_uuid_1.UUID.UUID(), angular2_uuid_1.UUID.UUID());
    };
    CalendarService.prototype.currentAppointmentHeader = function () {
        var headers = new http_1.Headers();
        // if (isIOS) {     
        //     this.id_token = localStorage.getItem("IOSToken")
        // }
        // else
        // {
        //     this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        // } 
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    //-------------------------------- Vendor GET Request ----------------------------------//
    CalendarService.prototype.currentVendor = function () {
        var headers = this.currentVendorHeader();
        return this.http.get(this.customerVendorUrl, { headers: headers })
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                console.log("Got vendor data ");
                return res.json();
            }
        });
    };
    CalendarService.prototype.currentVendorHeader = function () {
        var headers = new http_1.Headers();
        // if (isIOS) {     
        //     this.id_token = localStorage.getItem("IOSToken")
        // }
        // else
        // {
        //     this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        // } 
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    //--------------------------------------- Appointments GET Request -------------------------------------------//
    CalendarService.prototype.appointments = function () {
        var headers = this.appointmentsHeader();
        return this.http.get(this.appointmentsUrl, { headers: headers })
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                console.log("Got appointment data ");
                return res.json();
            }
        });
    };
    CalendarService.prototype.appointmentsHeader = function () {
        var headers = new http_1.Headers();
        // if (isIOS) {     
        //     this.id_token = localStorage.getItem("IOSToken")
        // }
        // else
        // {
        //     this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        // } 
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    CalendarService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, selectservice_services_1.SelectService])
    ], CalendarService);
    return CalendarService;
}());
exports.CalendarService = CalendarService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxlbmRhci5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix3Q0FBd0M7QUFDeEMsa0NBQWdDO0FBRWhDLCtDQUFxQztBQUNyQyx1Q0FBeUM7QUFFekMsMERBQTREO0FBQzVELGtGQUF1RTtBQUd2RTtJQVFJLHlCQUFvQixJQUFVLEVBQVUsYUFBNkI7UUFBakQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQVA3RCwwQkFBcUIsR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzVFLGFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNyRSwyQkFBc0IsR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsR0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDbkYsc0JBQWlCLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxTQUFTLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM1RCxvQkFBZSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1FBS3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7SUFFOUosQ0FBQztJQUdGLCtGQUErRjtJQUV4Riw0Q0FBa0IsR0FBekI7UUFDTSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5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TSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sNENBQWtCLEdBQTFCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixvQkFBb0I7UUFDcEIsdURBQXVEO1FBQ3ZELElBQUk7UUFDSixPQUFPO1FBQ1AsSUFBSTtRQUNKLDBGQUEwRjtRQUMxRixLQUFLO1FBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUV2RSxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFuR0ksZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQVNpQixXQUFJLEVBQTBCLHNDQUFhO09BUjVELGVBQWUsQ0FxRzNCO0lBQUQsc0JBQUM7Q0FBQSxBQXJHRCxJQXFHQztBQXJHWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG4vLyBpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9vZic7XG5cbmltcG9ydCB7IFVVSUQgfSBmcm9tICdhbmd1bGFyMi11dWlkJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3NoYXJlZC91dGlscyc7XG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TLCBkZXZpY2UsIHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IFNlbGVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vc2VsZWN0c2VydmljZS9zZWxlY3RzZXJ2aWNlLnNlcnZpY2VzXCJcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBjdXN0b21lckFwcG9pbnRtZW50SWQgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcImFwcG9pbnRtZW50SURcIiwgXCJ7fVwiKSAgXG4gICAgcHJpdmF0ZSB2ZW5kb3JJZCA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ3ZlbmRvcmlkJyxcInt9XCIpKSAgICAgICAgICAgICAgICAgICAgXG4gICAgcHJpdmF0ZSBjdXN0b21lckFwcG9pbnRtZW50VXJsID0gdXRpbHMuYmFzZXVybCArIFwiYXBwb2ludG1lbnQvXCIrdGhpcy5jdXN0b21lckFwcG9pbnRtZW50SWQ7XG4gICAgcHJpdmF0ZSBjdXN0b21lclZlbmRvclVybCA9IHV0aWxzLmJhc2V1cmwgKyBcInZlbmRvci9cIit0aGlzLnZlbmRvcklkO1xuICAgIHByaXZhdGUgYXBwb2ludG1lbnRzVXJsID0gdXRpbHMuYmFzZXVybCArIFwiYXBwb2ludG1lbnRcIjtcblxuICAgIHByaXZhdGUgaWRfdG9rZW47XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIHNlbGVjdFNlcnZpY2UgOiBTZWxlY3RTZXJ2aWNlKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJsb2NhbFN0b3JhZ2UgaXRlbXMgOiBcIix0aGlzLmN1c3RvbWVyQXBwb2ludG1lbnRJZCAgLCB0aGlzLnZlbmRvcklkLCB0aGlzLmN1c3RvbWVyQXBwb2ludG1lbnRVcmwsIHRoaXMuY3VzdG9tZXJWZW5kb3JVcmwsIHRoaXMuYXBwb2ludG1lbnRzVXJsKVxuICAgICAgICBcbiAgICAgfVxuXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEFwcG9pbnRtZW50IEdFVCBSZXF1ZXN0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuXG4gICAgcHVibGljIGN1cnJlbnRBcHBvaW50bWVudCgpIHsgICAgICAgXG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0U2VydmljZS5jcmVhdGVDdXN0b21lckFwcG9pbnRtZW50KFVVSUQuVVVJRCgpLCBVVUlELlVVSUQoKSk7ICAgICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgY3VycmVudEFwcG9pbnRtZW50SGVhZGVyKCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIC8vIGlmIChpc0lPUykgeyAgICAgXG4gICAgICAgIC8vICAgICB0aGlzLmlkX3Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJJT1NUb2tlblwiKVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2VcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdGhpcy5pZF90b2tlbiA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJUT0tFTlwiLFwie31cIikpICAgICAgICAgICAgXG4gICAgICAgIC8vIH0gXG4gICAgICAgIHRoaXMuaWRfdG9rZW4gPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiVE9LRU5cIixcInt9XCIpKSAgICAgICAgICAgIFxuICAgICAgICBcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIHRoaXMuaWRfdG9rZW4pO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cblxuICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFZlbmRvciBHRVQgUmVxdWVzdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICAgICBwdWJsaWMgY3VycmVudFZlbmRvcigpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmN1cnJlbnRWZW5kb3JIZWFkZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5jdXN0b21lclZlbmRvclVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgIC5tYXAocmVzID0+IHtcbiAgICAgICAgICAgIGlmKHJlcy5zdGF0dXMgPCAyMDAgfHwgcmVzLnN0YXR1cyA+PSAzMDApIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHJlcXVlc3QgaGFzIGZhaWxlZCAnICsgcmVzLnN0YXR1cyk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3QgdmVuZG9yIGRhdGEgXCIpXG4gICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3VycmVudFZlbmRvckhlYWRlcigpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICAvLyBpZiAoaXNJT1MpIHsgICAgIFxuICAgICAgICAvLyAgICAgdGhpcy5pZF90b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiSU9TVG9rZW5cIilcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHRoaXMuaWRfdG9rZW4gPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiVE9LRU5cIixcInt9XCIpKSAgICAgICAgICAgIFxuICAgICAgICAvLyB9IFxuICAgICAgICB0aGlzLmlkX3Rva2VuID0gSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIlRPS0VOXCIsXCJ7fVwiKSkgICAgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCB0aGlzLmlkX3Rva2VuKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEFwcG9pbnRtZW50cyBHRVQgUmVxdWVzdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICAgICAgICBwdWJsaWMgYXBwb2ludG1lbnRzKCkge1xuICAgICAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmFwcG9pbnRtZW50c0hlYWRlcigpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5hcHBvaW50bWVudHNVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLm1hcChyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlcy5zdGF0dXMgPCAyMDAgfHwgcmVzLnN0YXR1cyA+PSAzMDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgcmVxdWVzdCBoYXMgZmFpbGVkICcgKyByZXMuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvdCBhcHBvaW50bWVudCBkYXRhIFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBhcHBvaW50bWVudHNIZWFkZXIoKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgICAgICAvLyBpZiAoaXNJT1MpIHsgICAgIFxuICAgICAgICAgICAgLy8gICAgIHRoaXMuaWRfdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIklPU1Rva2VuXCIpXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBlbHNlXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5pZF90b2tlbiA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJUT0tFTlwiLFwie31cIikpICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB9IFxuICAgICAgICAgICAgdGhpcy5pZF90b2tlbiA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJUT0tFTlwiLFwie31cIikpICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCB0aGlzLmlkX3Rva2VuKTtcbiAgICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgICAgICB9XG4gIFxufVxuXG4iXX0=