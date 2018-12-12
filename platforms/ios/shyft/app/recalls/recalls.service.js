"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ApplicationSettings = require("application-settings");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var utils = require("../shared/utils");
var platform_1 = require("platform");
var RecallsService = (function () {
    function RecallsService(http) {
        this.http = http;
        this.vehiclelistingUrl = utils.baseurl + "fleet";
    }
    //-------------------------------- Appointment GET Request ----------------------------------//
    RecallsService.prototype.vehicle = function () {
        var headers = this.vehicleHeader();
        return this.http.get(this.vehiclelistingUrl, { headers: headers })
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
    RecallsService.prototype.vehicleHeader = function () {
        var id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        if (platform_1.isIOS) {
            this.id_token = localStorage.getItem("IOSToken");
        }
        else {
            this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        }
        headers.append("Authorization", this.id_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    RecallsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], RecallsService);
    return RecallsService;
}());
exports.RecallsService = RecallsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjYWxscy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVjYWxscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RTtBQUV4RSwwREFBNEQ7QUFDNUQsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBeUM7QUFDekMscUNBQTREO0FBRzVEO0lBSUksd0JBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBRnRCLHNCQUFpQixHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBRWxCLENBQUM7SUFHbkMsK0ZBQStGO0lBRXhGLGdDQUFPLEdBQWQ7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNqRSxHQUFHLENBQUMsVUFBQSxHQUFHO1lBQ0osdURBQXVEO1lBQ3ZELEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDekMsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0QsQ0FBQztZQUVELElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ1IsQ0FBQztJQUVPLHNDQUFhLEdBQXJCO1FBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDdkUsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQztZQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNwRCxDQUFDO1FBQ0QsSUFBSSxDQUNKLENBQUM7WUFDRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQzNFLENBQUM7UUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFyQ1EsY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQUtpQixXQUFJO09BSnJCLGNBQWMsQ0F1QzFCO0lBQUQscUJBQUM7Q0FBQSxBQXZDRCxJQXVDQztBQXZDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3NoYXJlZC91dGlscyc7XG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TLCBkZXZpY2UsIHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVjYWxsc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSB2ZWhpY2xlbGlzdGluZ1VybCA9IHV0aWxzLmJhc2V1cmwgKyBcImZsZWV0XCI7XG4gICAgcHJpdmF0ZSBpZF90b2tlbjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxuXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEFwcG9pbnRtZW50IEdFVCBSZXF1ZXN0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuXG4gICAgcHVibGljIHZlaGljbGUoKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy52ZWhpY2xlSGVhZGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMudmVoaWNsZWxpc3RpbmdVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAubWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAvLyBJZiByZXF1ZXN0IGZhaWxzLCB0aHJvdyBhbiBFcnJvciB0aGF0IHdpbGwgYmUgY2F1Z2h0XG4gICAgICAgICAgICBpZihyZXMuc3RhdHVzIDwgMjAwIHx8IHJlcy5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyByZXF1ZXN0IGhhcyBmYWlsZWQgJyArIHJlcy5zdGF0dXMpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIC8vIElmIGV2ZXJ5dGhpbmcgd2VudCBmaW5lLCByZXR1cm4gdGhlIHJlc3BvbnNlXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIHZlaGljbGVIZWFkZXIoKSB7XG4gICAgICAgIGxldCBpZF90b2tlbiA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJUT0tFTlwiLCBcInt9XCIpKVxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIGlmIChpc0lPUykgeyAgICAgXG4gICAgICAgICAgICB0aGlzLmlkX3Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJJT1NUb2tlblwiKVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pZF90b2tlbiA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJUT0tFTlwiLFwie31cIikpICAgICAgICAgICAgXG4gICAgICAgIH0gXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCB0aGlzLmlkX3Rva2VuKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG5cbn1cbiJdfQ==