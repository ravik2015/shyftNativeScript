"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var ApplicationSettings = require("application-settings");
var AddcarService = (function () {
    function AddcarService(http) {
        this.http = http;
    }
    //-------------------- ADDCAR PUT Request -------------------------------//
    AddcarService.prototype.addcarPut = function (fleet, fleetID) {
        this.fleet = fleet;
        this.fleetID = fleetID;
        var addcarURL = "https://uat.futuredms.com/shyft-api/fleet/" + this.fleetID;
        console.log("Fleet Add Url is :  ", addcarURL, "body is :   ", JSON.stringify(this.fleet));
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        headers.append("Authorization", this.id_token);
        return this.http.put(addcarURL, fleet, { headers: headers });
    };
    //-------------------- getPresignUrl GET Request -------------------------------//
    AddcarService.prototype.presignUrl = function (imageID) {
        var headers = this.presignUrlHeader();
        var imageKey = imageID;
        var requestUrl = 'https://igzcbks18i.execute-api.us-east-1.amazonaws.com/production?url_prefix=vehicle/user/' + imageKey;
        console.log("request url is -->", requestUrl);
        console.log("Headers -->", JSON.stringify(headers));
        return this.http.get(requestUrl, { headers: headers })
            .map(function (res) {
            console.log("Response presignUrl is  ------> ", res.json());
            return res.json();
        });
    };
    AddcarService.prototype.presignUrlHeader = function () {
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var headers = new http_1.Headers();
        headers.append("Authorization", this.id_token);
        return headers;
    };
    AddcarService.prototype.makeGet = function () {
        var url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json";
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    AddcarService.prototype.getModels = function (makeid) {
        var url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/" + makeid + "?format=json";
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    AddcarService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AddcarService);
    return AddcarService;
}());
exports.AddcarService = AddcarService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkY2FyLnNlcnZpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkY2FyLnNlcnZpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RTtBQUV4RSxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLDBEQUE0RDtBQVE1RDtJQU1JLHVCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUFJLENBQUM7SUFFdkMsMkVBQTJFO0lBRWhFLGlDQUFTLEdBQWhCLFVBQWlCLEtBQUssRUFBQyxPQUFPO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksU0FBUyxHQUFHLDRDQUE0QyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLEVBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFMUYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUV2RSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUvQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ2xCLFNBQVMsRUFDUixLQUFLLEVBQ04sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQ3JCLENBQUE7SUFDSCxDQUFDO0lBSVgsa0ZBQWtGO0lBR3JFLGtDQUFVLEdBQWpCLFVBQWtCLE9BQU87UUFDbkIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDdEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksVUFBVSxHQUFHLDRGQUE0RixHQUFDLFFBQVEsQ0FBQTtRQUN0SCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3BELEdBQUcsQ0FBQyxVQUFDLEdBQUc7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7UUFBQyxDQUFDLENBQUMsQ0FBQTtJQUU5QixDQUFDO0lBRVMsd0NBQWdCLEdBQXhCO1FBRUksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUV2RSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRSwrQkFBTyxHQUFkO1FBQ0ksSUFBSSxHQUFHLEdBQUcsaUVBQWlFLENBQUE7UUFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUN4QixHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLGlDQUFTLEdBQWhCLFVBQWlCLE1BQU07UUFDbkIsSUFBSSxHQUFHLEdBQUcsNkRBQTZELEdBQUMsTUFBTSxHQUFDLGNBQWMsQ0FBQTtRQUM3RixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO2FBQ3hCLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBbEVRLGFBQWE7UUFEekIsaUJBQVUsRUFBRTt5Q0FPaUIsV0FBSTtPQU5yQixhQUFhLENBbUV6QjtJQUFELG9CQUFDO0NBQUEsQUFuRUQsSUFtRUM7QUFuRVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi9zaGFyZWQvdXRpbHMnO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJ2FuZ3VsYXIyLXV1aWQnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TLCBkZXZpY2UsIHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZGRjYXJTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBmbGVldElEO1xuICAgIHB1YmxpYyBmbGVldDtcbiAgICBwdWJsaWMgaWRfdG9rZW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tIEFERENBUiBQVVQgUmVxdWVzdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICAgIHB1YmxpYyBhZGRjYXJQdXQoZmxlZXQsZmxlZXRJRCkge1xuICAgICAgICAgICAgdGhpcy5mbGVldCA9IGZsZWV0XG4gICAgICAgICAgICB0aGlzLmZsZWV0SUQgPSBmbGVldElEXG4gICAgICAgICAgICBsZXQgYWRkY2FyVVJMID0gXCJodHRwczovL3VhdC5mdXR1cmVkbXMuY29tL3NoeWZ0LWFwaS9mbGVldC9cIit0aGlzLmZsZWV0SUQ7ICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZsZWV0IEFkZCBVcmwgaXMgOiAgXCIsIGFkZGNhclVSTCxcImJvZHkgaXMgOiAgIFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmZsZWV0KSk7XG5cbiAgICAgICAgICAgIHRoaXMuaWRfdG9rZW4gPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiVE9LRU5cIixcInt9XCIpKSAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgdGhpcy5pZF90b2tlbik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KFxuICAgICAgICAgICAgICBhZGRjYXJVUkwsXG4gICAgICAgICAgICAgICBmbGVldCxcbiAgICAgICAgICAgICAgeyBoZWFkZXJzOiBoZWFkZXJzIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIFxuICAgIFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tIGdldFByZXNpZ25VcmwgR0VUIFJlcXVlc3QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cblxuICAgICAgcHVibGljIHByZXNpZ25VcmwoaW1hZ2VJRCkgeyAgICAgICBcbiAgICAgICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5wcmVzaWduVXJsSGVhZGVyKCk7XG4gICAgICAgICAgICBsZXQgaW1hZ2VLZXkgPSBpbWFnZUlEXG4gICAgICAgICAgICBsZXQgcmVxdWVzdFVybCA9ICdodHRwczovL2lnemNia3MxOGkuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vcHJvZHVjdGlvbj91cmxfcHJlZml4PXZlaGljbGUvdXNlci8nK2ltYWdlS2V5XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcXVlc3QgdXJsIGlzIC0tPlwiLCByZXF1ZXN0VXJsKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIZWFkZXJzIC0tPlwiLCBKU09OLnN0cmluZ2lmeShoZWFkZXJzKSlcbiAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQocmVxdWVzdFVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAubWFwKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIHByZXNpZ25VcmwgaXMgIC0tLS0tLT4gXCIsIHJlcy5qc29uKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCkgfSlcbiAgICAgXG4gICAgICB9XG4gICAgXG4gICAgICAgIHByaXZhdGUgcHJlc2lnblVybEhlYWRlcigpIHtcbiAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaWRfdG9rZW4gPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiVE9LRU5cIixcInt9XCIpKSAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgdGhpcy5pZF90b2tlbik7XG4gICAgICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICAgICAgfSAgXG5cbiAgICBwdWJsaWMgbWFrZUdldCgpe1xuICAgICAgICBsZXQgdXJsID0gXCJodHRwczovL3ZwaWMubmh0c2EuZG90Lmdvdi9hcGkvdmVoaWNsZXMvR2V0QWxsTWFrZXM/Zm9ybWF0PWpzb25cIlxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpXG4gICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNb2RlbHMobWFrZWlkKXtcbiAgICAgICAgbGV0IHVybCA9IFwiaHR0cHM6Ly92cGljLm5odHNhLmRvdC5nb3YvYXBpL3ZlaGljbGVzL0dldE1vZGVsc0Zvck1ha2VJZC9cIittYWtlaWQrXCI/Zm9ybWF0PWpzb25cIlxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpXG4gICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xuICAgIH1cbn1cbiJdfQ==