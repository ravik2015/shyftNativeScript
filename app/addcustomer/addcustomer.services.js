"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ApplicationSettings = require("application-settings");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var AddcustomerService = (function () {
    function AddcustomerService(http) {
        this.http = http;
    }
    AddcustomerService.prototype.createUser = function (firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
        var user = JSON.parse(ApplicationSettings.getString("USER", "{}"));
        var user_id = user.sub;
        var user_email = user.email;
        var user_phoneno = user.phone_number;
        var userCreateURL = 'https://uat.futuredms.com/shyft-api/user/' + user_id;
        console.log("userid is : ", user_id, "useremail is : ", user_email, "userphone is : ", user_phoneno, "user create url is : ", userCreateURL);
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        headers.append("Authorization", this.id_token);
        var date = new Date();
        var isoDate = date.toISOString();
        return this.http.put(userCreateURL, {
            "id": user_id,
            "first_name": this.firstname,
            "last_name": this.lastname,
            "date_joined": isoDate,
            "role": "Driver"
        }, { headers: headers });
    };
    AddcustomerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AddcustomerService);
    return AddcustomerService;
}());
exports.AddcustomerService = AddcustomerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkY3VzdG9tZXIuc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRjdXN0b21lci5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBd0U7QUFFeEUsMERBQTREO0FBQzVELGlDQUErQjtBQUMvQixnQ0FBOEI7QUFNOUI7SUFLSSw0QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBRTVCLHVDQUFVLEdBQWpCLFVBQWtCLFNBQVMsRUFBRSxRQUFRO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQ2pFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3JDLElBQUksYUFBYSxHQUFHLDJDQUEyQyxHQUFHLE9BQU8sQ0FBRTtRQUMzRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsVUFBVSxFQUFDLGlCQUFpQixFQUFDLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUV2SSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBRXZFLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDNUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDaEIsYUFBYSxFQUNiO1lBQ0ksSUFBSSxFQUFHLE9BQU87WUFDZCxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDNUIsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQzFCLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLE1BQU0sRUFBRyxRQUFRO1NBQ3BCLEVBQ0QsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQ3ZCLENBQUE7SUFDRCxDQUFDO0lBbkNJLGtCQUFrQjtRQUQ5QixpQkFBVSxFQUFFO3lDQU1pQixXQUFJO09BTHJCLGtCQUFrQixDQW9DOUI7SUFBRCx5QkFBQztDQUFBLEFBcENELElBb0NDO0FBcENZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3NoYXJlZC91dGlscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MsIGRldmljZSwgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZGRjdXN0b21lclNlcnZpY2Uge1xuXG4gICAgcHVibGljIGZpcnN0bmFtZTtcbiAgICBwdWJsaWMgbGFzdG5hbWU7ICAgIFxuICAgIHB1YmxpYyBpZF90b2tlbjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxuXG4gICAgcHVibGljIGNyZWF0ZVVzZXIoZmlyc3RuYW1lLCBsYXN0bmFtZSl7IFxuICAgICAgICB0aGlzLmZpcnN0bmFtZSA9IGZpcnN0bmFtZTtcbiAgICAgICAgdGhpcy5sYXN0bmFtZSA9IGxhc3RuYW1lO1xuICAgICAgICBsZXQgdXNlciA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJVU0VSXCIsXCJ7fVwiKSkgICAgICAgIFxuICAgICAgICBsZXQgdXNlcl9pZCA9IHVzZXIuc3ViOyAgICAgICBcbiAgICAgICAgbGV0IHVzZXJfZW1haWwgPSB1c2VyLmVtYWlsO1xuICAgICAgICBsZXQgdXNlcl9waG9uZW5vID0gdXNlci5waG9uZV9udW1iZXI7XG4gICAgICAgIGxldCB1c2VyQ3JlYXRlVVJMID0gJ2h0dHBzOi8vdWF0LmZ1dHVyZWRtcy5jb20vc2h5ZnQtYXBpL3VzZXIvJyArIHVzZXJfaWQgO1xuICAgICAgICBjb25zb2xlLmxvZyhcInVzZXJpZCBpcyA6IFwiLHVzZXJfaWQsXCJ1c2VyZW1haWwgaXMgOiBcIix1c2VyX2VtYWlsLFwidXNlcnBob25lIGlzIDogXCIsdXNlcl9waG9uZW5vLCBcInVzZXIgY3JlYXRlIHVybCBpcyA6IFwiLCB1c2VyQ3JlYXRlVVJMKVxuICAgICAgXG4gICAgICAgIHRoaXMuaWRfdG9rZW4gPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiVE9LRU5cIixcInt9XCIpKSAgICAgICAgICAgIFxuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgdGhpcy5pZF90b2tlbik7ICAgICAgICBcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgaXNvRGF0ZSA9IGRhdGUudG9JU09TdHJpbmcoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KFxuICAgICAgICAgICAgdXNlckNyZWF0ZVVSTCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImlkXCIgOiB1c2VyX2lkLFxuICAgICAgICAgICAgICAgIFwiZmlyc3RfbmFtZVwiOiB0aGlzLmZpcnN0bmFtZSxcbiAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiB0aGlzLmxhc3RuYW1lLFxuICAgICAgICAgICAgICAgIFwiZGF0ZV9qb2luZWRcIjogaXNvRGF0ZSwgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXCJyb2xlXCIgOiBcIkRyaXZlclwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBoZWFkZXJzOiBoZWFkZXJzIH1cbiAgICAgICAgKVxuICAgICAgICB9XG59XG4iXX0=