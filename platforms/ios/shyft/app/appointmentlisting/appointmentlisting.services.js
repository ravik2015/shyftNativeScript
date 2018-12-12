"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ApplicationSettings = require("application-settings");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var utils = require("../shared/utils");
var AppointmentlistingService = (function () {
    function AppointmentlistingService(http) {
        this.http = http;
        this.vehiclehistoryUrl = utils.baseurl + "appointment";
    }
    //-------------------------------- Appointment GET Request ----------------------------------//
    AppointmentlistingService.prototype.vehiclehistory = function () {
        var headers = this.vehiclehistoryHeader();
        return this.http.get(this.vehiclehistoryUrl, { headers: headers })
            .map(function (res) {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                return res.json();
            }
        });
    };
    AppointmentlistingService.prototype.vehiclehistoryHeader = function () {
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
    AppointmentlistingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AppointmentlistingService);
    return AppointmentlistingService;
}());
exports.AppointmentlistingService = AppointmentlistingService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRsaXN0aW5nLnNlcnZpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwb2ludG1lbnRsaXN0aW5nLnNlcnZpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RTtBQUV4RSwwREFBNEQ7QUFDNUQsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBeUM7QUFJekM7SUFJSSxtQ0FBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFGdEIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7SUFFeEIsQ0FBQztJQUduQywrRkFBK0Y7SUFFeEYsa0RBQWMsR0FBckI7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2pFLEdBQUcsQ0FBQyxVQUFBLEdBQUc7WUFDSix1REFBdUQ7WUFDdkQsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxDQUFDO1lBRUQsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRU8sd0RBQW9CLEdBQTVCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixvQkFBb0I7UUFDcEIsdURBQXVEO1FBQ3ZELElBQUk7UUFDSixPQUFPO1FBQ1AsSUFBSTtRQUNKLDBGQUEwRjtRQUMxRixLQUFLO1FBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUV2RSxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUF0Q1EseUJBQXlCO1FBRHJDLGlCQUFVLEVBQUU7eUNBS2lCLFdBQUk7T0FKckIseUJBQXlCLENBd0NyQztJQUFELGdDQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7QUF4Q1ksOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi4vc2hhcmVkL3V0aWxzJztcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MsIGRldmljZSwgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcHBvaW50bWVudGxpc3RpbmdTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgdmVoaWNsZWhpc3RvcnlVcmwgPSB1dGlscy5iYXNldXJsICsgXCJhcHBvaW50bWVudFwiO1xuICAgIHByaXZhdGUgaWRfdG9rZW47XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cblxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBBcHBvaW50bWVudCBHRVQgUmVxdWVzdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICAgIHB1YmxpYyB2ZWhpY2xlaGlzdG9yeSgpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLnZlaGljbGVoaXN0b3J5SGVhZGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMudmVoaWNsZWhpc3RvcnlVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAubWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAvLyBJZiByZXF1ZXN0IGZhaWxzLCB0aHJvdyBhbiBFcnJvciB0aGF0IHdpbGwgYmUgY2F1Z2h0XG4gICAgICAgICAgICBpZihyZXMuc3RhdHVzIDwgMjAwIHx8IHJlcy5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyByZXF1ZXN0IGhhcyBmYWlsZWQgJyArIHJlcy5zdGF0dXMpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIC8vIElmIGV2ZXJ5dGhpbmcgd2VudCBmaW5lLCByZXR1cm4gdGhlIHJlc3BvbnNlXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2ZWhpY2xlaGlzdG9yeUhlYWRlcigpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICAvLyBpZiAoaXNJT1MpIHsgICAgIFxuICAgICAgICAvLyAgICAgdGhpcy5pZF90b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiSU9TVG9rZW5cIilcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHRoaXMuaWRfdG9rZW4gPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiVE9LRU5cIixcInt9XCIpKSAgICAgICAgICAgIFxuICAgICAgICAvLyB9IFxuICAgICAgICB0aGlzLmlkX3Rva2VuID0gSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIlRPS0VOXCIsXCJ7fVwiKSkgICAgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCB0aGlzLmlkX3Rva2VuKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG5cbn1cbiJdfQ==