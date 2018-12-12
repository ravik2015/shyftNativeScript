"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ApplicationSettings = require("application-settings");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var utils = require("../shared/utils");
var VendorlistService = (function () {
    function VendorlistService(http) {
        this.http = http;
        this.vendorGetUrl = utils.baseurl + "vendor";
    }
    VendorlistService.prototype.vendorGet = function () {
        var headers = this.vendorHeader();
        return this.http.get(this.vendorGetUrl, { headers: headers })
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                alert("Something went wrong");
                throw new Error('This request has failed ' + res.status);
            }
            else {
                return res.json();
            }
        });
    };
    VendorlistService.prototype.vendorHeader = function () {
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
    VendorlistService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], VendorlistService);
    return VendorlistService;
}());
exports.VendorlistService = VendorlistService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVuZG9ybGlzdC5zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZlbmRvcmxpc3Quc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdFO0FBRXhFLDBEQUE0RDtBQUU1RCxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLHVDQUF5QztBQU96QztJQU9JLDJCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUZ0QixpQkFBWSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUMsUUFBUSxDQUFDO0lBRVosQ0FBQztJQUU1QixxQ0FBUyxHQUFoQjtRQUVXLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUN4RCxHQUFHLENBQUMsVUFBQSxHQUFHO1lBQ0osRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0QsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ1osQ0FBQztJQUVPLHdDQUFZLEdBQXBCO1FBQ0ksb0JBQW9CO1FBQ3BCLHVEQUF1RDtRQUN2RCxnQkFBZ0I7UUFDaEIsT0FBTztRQUNQLElBQUk7UUFDSiwwRkFBMEY7UUFDMUYsSUFBSTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDdkUsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFyQ0EsaUJBQWlCO1FBRDdCLGlCQUFVLEVBQUU7eUNBUWlCLFdBQUk7T0FQckIsaUJBQWlCLENBd0M3QjtJQUFELHdCQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7QUF4Q1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi9zaGFyZWQvdXRpbHMnO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJ2FuZ3VsYXIyLXV1aWQnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TLCBkZXZpY2UsIHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWZW5kb3JsaXN0U2VydmljZSB7XG4gICAgcHVibGljIGlkX3Rva2VuO1xuICAgIHB1YmxpYyBzZXJ2aWNlSUQ7XG4gICAgcHVibGljIHZlbmRvcklEO1xuICAgIHB1YmxpYyBhcHBvaW50bWVudGlkO1xuICAgIHByaXZhdGUgdmVuZG9yR2V0VXJsID0gdXRpbHMuYmFzZXVybCtcInZlbmRvclwiO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XG5cbiAgICBwdWJsaWMgdmVuZG9yR2V0KCkge1xuXG4gICAgICAgICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMudmVuZG9ySGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy52ZW5kb3JHZXRVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgICAgICAgICAubWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuc3RhdHVzIDwgMjAwIHx8IHJlcy5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHJlcXVlc3QgaGFzIGZhaWxlZCAnICsgcmVzLnN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcHJpdmF0ZSB2ZW5kb3JIZWFkZXIoKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGlzSU9TKSB7ICAgICBcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5pZF90b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiSU9TVG9rZW5cIilcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5pZF90b2tlbiA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJUT0tFTlwiLFwie31cIikpICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIHRoaXMuaWRfdG9rZW4gPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiVE9LRU5cIixcInt9XCIpKSAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIHRoaXMuaWRfdG9rZW4pO1xuICAgICAgICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTsgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgICAgICAgICAgfVxuXG4gICBcbn1cbiJdfQ==