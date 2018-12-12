"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ApplicationSettings = require("application-settings");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var ConnectService = (function () {
    function ConnectService(http) {
        this.http = http;
    }
    //-------------------------------- Appointment GET Request ----------------------------------//
    ConnectService.prototype.signature = function () {
        var headers = this.signatureHeader();
        return this.http.get("https://eotxmrelq8.execute-api.us-east-1.amazonaws.com/iot_production", { headers: headers })
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
    ConnectService.prototype.signatureHeader = function () {
        var headers = new http_1.Headers();
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    ConnectService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ConnectService);
    return ConnectService;
}());
exports.ConnectService = ConnectService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbm5lY3Quc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdFO0FBRXhFLDBEQUE0RDtBQUM1RCxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBSzlCO0lBRUksd0JBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUksQ0FBQztJQUduQywrRkFBK0Y7SUFFeEYsa0NBQVMsR0FBaEI7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHVFQUF1RSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2xILEdBQUcsQ0FBQyxVQUFBLEdBQUc7WUFDSix1REFBdUQ7WUFDdkQsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxDQUFDO1lBRUQsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRU8sd0NBQWUsR0FBdkI7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFFdkUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBN0JRLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FHaUIsV0FBSTtPQUZyQixjQUFjLENBK0IxQjtJQUFELHFCQUFDO0NBQUEsQUEvQkQsSUErQkM7QUEvQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi9zaGFyZWQvdXRpbHMnO1xuaW1wb3J0IHsgaXNBbmRyb2lkLCBpc0lPUywgZGV2aWNlLCBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbm5lY3RTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGlkX3Rva2VuO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XG5cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQXBwb2ludG1lbnQgR0VUIFJlcXVlc3QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cbiAgICBwdWJsaWMgc2lnbmF0dXJlKCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuc2lnbmF0dXJlSGVhZGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFwiaHR0cHM6Ly9lb3R4bXJlbHE4LmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL2lvdF9wcm9kdWN0aW9uXCIsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAubWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAvLyBJZiByZXF1ZXN0IGZhaWxzLCB0aHJvdyBhbiBFcnJvciB0aGF0IHdpbGwgYmUgY2F1Z2h0XG4gICAgICAgICAgICBpZihyZXMuc3RhdHVzIDwgMjAwIHx8IHJlcy5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyByZXF1ZXN0IGhhcyBmYWlsZWQgJyArIHJlcy5zdGF0dXMpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIC8vIElmIGV2ZXJ5dGhpbmcgd2VudCBmaW5lLCByZXR1cm4gdGhlIHJlc3BvbnNlXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaWduYXR1cmVIZWFkZXIoKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgdGhpcy5pZF90b2tlbiA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJUT0tFTlwiLFwie31cIikpICAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgdGhpcy5pZF90b2tlbik7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfVxuXG59XG4iXX0=