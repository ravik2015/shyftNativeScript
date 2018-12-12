"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var ApplicationSettings = require("application-settings");
var utils = require("../shared/utils");
var CarlistService = (function () {
    function CarlistService(http) {
        this.http = http;
        this.fleetGetUrl = utils.baseurl + "fleet";
        this.vendorGetUrl = utils.baseurl + "vendor";
    }
    //-------------------- fleet GET Request -------------------------------//
    CarlistService.prototype.fleetGet = function () {
        var headers = this.fleetHeader();
        return this.http.get(this.fleetGetUrl, { headers: headers })
            .map(function (res) { return res.json(); });
        // .map((res: Response) => {
        //     console.log("res", JSON.stringify(res))
        //     res.json()
        // if (res) {
        //     if (res.status === 204) {
        //         return [{ status: res.status, json: res }]
        //     }
        //     else if (res.status === 200) {
        //         return [{ status: res.status, json: res }]
        //     }
        // }
        // }).catch((error: any) => {
        //     if (error.status === 500) {
        //         return Observable.throw(new Error(error.status));
        //     }
        //     else if (error.status === 400) {
        //         return Observable.throw(new Error(error.status));
        //     }
        //     else if (error.status === 403) {
        //         return Observable.throw(new Error(error.status));
        //     }
        //     else if (error.status === 406) {
        //         return Observable.throw(new Error(error.status));
        //     }
    };
    CarlistService.prototype.fleetHeader = function () {
        // if (isIOS) {     
        //     this.id_token = localStorage.getItem("IOSToken")
        //             }
        // else
        // {
        //     this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN","{}"))            
        // }        
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    CarlistService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CarlistService);
    return CarlistService;
}());
exports.CarlistService = CarlistService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FybGlzdC5zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmxpc3Quc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdFO0FBR3hFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFFOUIsMERBQTREO0FBRTVELHVDQUF5QztBQU96QztJQUlJLHdCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUh0QixnQkFBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUMsT0FBTyxDQUFDO1FBQ3BDLGlCQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBQyxRQUFRLENBQUM7SUFFWixDQUFDO0lBRXZDLDBFQUEwRTtJQUUvRCxpQ0FBUSxHQUFmO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQzNELEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztRQUN4Qiw0QkFBNEI7UUFDNUIsOENBQThDO1FBQzlDLGlCQUFpQjtRQUNiLGFBQWE7UUFDYixnQ0FBZ0M7UUFDaEMscURBQXFEO1FBQ3JELFFBQVE7UUFDUixxQ0FBcUM7UUFDckMscURBQXFEO1FBQ3JELFFBQVE7UUFDUixJQUFJO1FBQ1IsNkJBQTZCO1FBQzdCLGtDQUFrQztRQUNsQyw0REFBNEQ7UUFDNUQsUUFBUTtRQUNSLHVDQUF1QztRQUN2Qyw0REFBNEQ7UUFDNUQsUUFBUTtRQUNSLHVDQUF1QztRQUN2Qyw0REFBNEQ7UUFDNUQsUUFBUTtRQUNSLHVDQUF1QztRQUN2Qyw0REFBNEQ7UUFDNUQsUUFBUTtJQUNaLENBQUM7SUFFTyxvQ0FBVyxHQUFuQjtRQUNJLG9CQUFvQjtRQUNwQix1REFBdUQ7UUFDdkQsZ0JBQWdCO1FBQ2hCLE9BQU87UUFDUCxJQUFJO1FBQ0osMEZBQTBGO1FBQzFGLFlBQVk7UUFDWixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQ3ZFLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDNUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBbkRRLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FLaUIsV0FBSTtPQUpyQixjQUFjLENBb0QxQjtJQUFELHFCQUFDO0NBQUEsQUFwREQsSUFvREM7QUFwRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcblxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi4vc2hhcmVkL3V0aWxzJztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICdhbmd1bGFyMi11dWlkJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgaXNBbmRyb2lkLCBpc0lPUywgZGV2aWNlLCBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FybGlzdFNlcnZpY2Uge1xuICAgIHByaXZhdGUgZmxlZXRHZXRVcmwgPSB1dGlscy5iYXNldXJsK1wiZmxlZXRcIjsgICAgXG4gICAgcHJpdmF0ZSB2ZW5kb3JHZXRVcmwgPSB1dGlscy5iYXNldXJsK1widmVuZG9yXCI7XG4gICAgcHJpdmF0ZSBpZF90b2tlbjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tIGZsZWV0IEdFVCBSZXF1ZXN0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuXG4gICAgcHVibGljIGZsZWV0R2V0KCkgeyAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmZsZWV0SGVhZGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuZmxlZXRHZXRVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKTsgICAgICAgIFxuICAgICAgICAvLyAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcInJlc1wiLCBKU09OLnN0cmluZ2lmeShyZXMpKVxuICAgICAgICAvLyAgICAgcmVzLmpzb24oKVxuICAgICAgICAgICAgLy8gaWYgKHJlcykge1xuICAgICAgICAgICAgLy8gICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDQpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuIFt7IHN0YXR1czogcmVzLnN0YXR1cywganNvbjogcmVzIH1dXG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gICAgIGVsc2UgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gW3sgc3RhdHVzOiByZXMuc3RhdHVzLCBqc29uOiByZXMgfV1cbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIC8vIH0pLmNhdGNoKChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIC8vICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhuZXcgRXJyb3IoZXJyb3Iuc3RhdHVzKSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICBlbHNlIGlmIChlcnJvci5zdGF0dXMgPT09IDQwMCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KG5ldyBFcnJvcihlcnJvci5zdGF0dXMpKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGVsc2UgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3cobmV3IEVycm9yKGVycm9yLnN0YXR1cykpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgZWxzZSBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDYpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhuZXcgRXJyb3IoZXJyb3Iuc3RhdHVzKSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmbGVldEhlYWRlcigpIHtcbiAgICAgICAgLy8gaWYgKGlzSU9TKSB7ICAgICBcbiAgICAgICAgLy8gICAgIHRoaXMuaWRfdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIklPU1Rva2VuXCIpXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gZWxzZVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB0aGlzLmlkX3Rva2VuID0gSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIlRPS0VOXCIsXCJ7fVwiKSkgICAgICAgICAgICBcbiAgICAgICAgLy8gfSAgICAgICAgXG4gICAgICAgIHRoaXMuaWRfdG9rZW4gPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiVE9LRU5cIixcInt9XCIpKSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIHRoaXMuaWRfdG9rZW4pO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7ICAgICAgICBcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfSAgXG59XG4iXX0=