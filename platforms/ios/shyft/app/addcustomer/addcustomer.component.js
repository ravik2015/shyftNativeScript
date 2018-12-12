"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var addcustomer_services_1 = require("./addcustomer.services");
var ApplicationSettings = require("application-settings");
var page_1 = require("tns-core-modules/ui/page");
var jwt_decode = require('jwt-decode');
var http = require("http");
var AddcustomerComponent = (function () {
    function AddcustomerComponent(router, routerExtensions, _page, addcustomerService) {
        this.router = router;
        this.routerExtensions = routerExtensions;
        this._page = _page;
        this.addcustomerService = addcustomerService;
    }
    AddcustomerComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var decoded = jwt_decode(this.id_token);
        this.firstname = decoded.given_name;
        this.lastname = decoded.family_name;
    };
    AddcustomerComponent.prototype.createUser = function () {
        var _this = this;
        this.addcustomerService.createUser(this.firstname, this.lastname)
            .subscribe(function (result) {
            console.log("User Created Success------> ", (JSON.stringify(result)));
        }, function (error) {
            console.log("User Created Error ---- >", error);
            var refreshToken = JSON.parse(ApplicationSettings.getString("RefreshToken", "{}"));
            _this.tokenRefresh(refreshToken);
        });
    };
    AddcustomerComponent.prototype.tokenRefresh = function (refreshToken) {
        console.log("refresh token is : ", refreshToken);
        var form = new FormData();
        form.append('grant_type', "refresh_token");
        form.append("client_id", "4qf3c6o1kvo4ufph9jfujamiug");
        form.append("refresh_token", refreshToken);
        http.request({
            url: "https://shyft-auto.auth.us-east-1.amazoncognito.com/oauth2/token",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic NHFmM2M2bzFrdm80dWZwaDlqZnVqYW1pdWc6MXNoN3EwaDIzZmNwa2Y0NmdxbTM5ZGJnM2g2aGI1aGNjdHNocXRiaG1lNzA0Y2JtMzIxZw=="
            },
            content: form
        }).then(function (response) {
            console.log("refreshed tokens are : ", response.content);
            var tokens1 = JSON.stringify(response.content);
            var initial_idToken = tokens1.substr((tokens1.search("id_token") + 11));
            var final_idToken = initial_idToken.substr(0, initial_idToken.indexOf('"'));
            console.log("id_token is : ", final_idToken);
            ApplicationSettings.setString("TOKEN", JSON.stringify(final_idToken));
            ApplicationSettings.setString("IOSToken", JSON.stringify(final_idToken));
        }, function (e) {
            console.log("Error occurred in refreshing tokens are : : " + e);
        });
    };
    AddcustomerComponent.prototype.onTap = function () {
        this.createUser();
        if (!this.firstname || !this.lastname) {
            alert("Enter Firstname and Lastname to Proceed........");
        }
        else {
            console.log("User Registered with details ----> ", this.firstname, this.lastname);
            var navigationExtras = {
                queryParams: {
                    "firstname": this.firstname,
                    "lastname": this.lastname,
                }
            };
            this.routerExtensions.navigate(["/addcar"], navigationExtras);
        }
    };
    AddcustomerComponent = __decorate([
        core_1.Component({
            selector: "Addcustomer",
            moduleId: module.id,
            styleUrls: ['addcustomer.css'],
            templateUrl: "./addcustomer.component.html",
            providers: [addcustomer_services_1.AddcustomerService]
        }),
        __metadata("design:paramtypes", [router_1.Router, router_2.RouterExtensions, page_1.Page, addcustomer_services_1.AddcustomerService])
    ], AddcustomerComponent);
    return AddcustomerComponent;
}());
exports.AddcustomerComponent = AddcustomerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkY3VzdG9tZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkY3VzdG9tZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLDBDQUEyRTtBQUMzRSxzREFBK0Q7QUFDL0QsK0RBQTREO0FBQzVELDBEQUE0RDtBQUM1RCxpREFBaUY7QUFFakYsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQVUzQjtJQUlJLDhCQUEyQixNQUFjLEVBQVUsZ0JBQWtDLEVBQVUsS0FBVyxFQUFVLGtCQUFzQztRQUEvSCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQzFKLENBQUM7SUFFRCx1Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRWxDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7UUFFcEUsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBQzVDLENBQUM7SUFFTSx5Q0FBVSxHQUFqQjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7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QUFDLFNBQVM7b0JBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUTtpQkFDNUI7YUFDSixDQUFDO1lBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDbEUsQ0FBQztJQUNMLENBQUM7SUF4RVEsb0JBQW9CO1FBUmhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDOUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyx5Q0FBa0IsQ0FBQztTQUNsQyxDQUFDO3lDQU1xQyxlQUFNLEVBQTRCLHlCQUFnQixFQUFpQixXQUFJLEVBQThCLHlDQUFrQjtPQUpqSixvQkFBb0IsQ0F5RWhDO0lBQUQsMkJBQUM7Q0FBQSxBQXpFRCxJQXlFQztBQXpFWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQWRkY3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIi4vYWRkY3VzdG9tZXIuc2VydmljZXNcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSwgU2hvd25Nb2RhbGx5RGF0YSwgTmF2aWdhdGVkRGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgaXNBbmRyb2lkLCBpc0lPUywgZGV2aWNlLCBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcclxudmFyIGp3dF9kZWNvZGUgPSByZXF1aXJlKCdqd3QtZGVjb2RlJyk7XHJcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIkFkZGN1c3RvbWVyXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc3R5bGVVcmxzOiBbJ2FkZGN1c3RvbWVyLmNzcyddLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hZGRjdXN0b21lci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgcHJvdmlkZXJzOiBbQWRkY3VzdG9tZXJTZXJ2aWNlXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEFkZGN1c3RvbWVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHB1YmxpYyBmaXJzdG5hbWU7XHJcbiAgICBwdWJsaWMgbGFzdG5hbWU7XHJcbiAgICBwdWJsaWMgaWRfdG9rZW47XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIGFkZGN1c3RvbWVyU2VydmljZTogQWRkY3VzdG9tZXJTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmlkX3Rva2VuID0gSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIlRPS0VOXCIsIFwie31cIikpXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkZWNvZGVkID0gand0X2RlY29kZSh0aGlzLmlkX3Rva2VuKTtcclxuICAgICAgICAgICAgdGhpcy5maXJzdG5hbWUgPSBkZWNvZGVkLmdpdmVuX25hbWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdG5hbWUgPSBkZWNvZGVkLmZhbWlseV9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVVc2VyKCkge1xyXG4gICAgICAgIHRoaXMuYWRkY3VzdG9tZXJTZXJ2aWNlLmNyZWF0ZVVzZXIodGhpcy5maXJzdG5hbWUsIHRoaXMubGFzdG5hbWUpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIENyZWF0ZWQgU3VjY2Vzcy0tLS0tLT4gXCIsIChKU09OLnN0cmluZ2lmeShyZXN1bHQpKSlcclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgQ3JlYXRlZCBFcnJvciAtLS0tID5cIiwgZXJyb3IpXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVmcmVzaFRva2VuID0gSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIlJlZnJlc2hUb2tlblwiLFwie31cIikpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRva2VuUmVmcmVzaChyZWZyZXNoVG9rZW4pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2tlblJlZnJlc2gocmVmcmVzaFRva2VuKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVmcmVzaCB0b2tlbiBpcyA6IFwiLCByZWZyZXNoVG9rZW4pXHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSAgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uYXBwZW5kKCdncmFudF90eXBlJywgXCJyZWZyZXNoX3Rva2VuXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hcHBlbmQoXCJjbGllbnRfaWRcIiAsIFwiNHFmM2M2bzFrdm80dWZwaDlqZnVqYW1pdWdcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmFwcGVuZChcInJlZnJlc2hfdG9rZW5cIiAsIHJlZnJlc2hUb2tlbik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGh0dHAucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vc2h5ZnQtYXV0by5hdXRoLnVzLWVhc3QtMS5hbWF6b25jb2duaXRvLmNvbS9vYXV0aDIvdG9rZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiIDogXCJCYXNpYyBOSEZtTTJNMmJ6RnJkbTgwZFdad2FEbHFablZxWVcxcGRXYzZNWE5vTjNFd2FESXpabU53YTJZME5tZHhiVE01WkdKbk0yZzJhR0kxYUdOamRITm9jWFJpYUcxbE56QTBZMkp0TXpJeFp3PT1cIlxyXG4gICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGZvcm1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVmcmVzaGVkIHRva2VucyBhcmUgOiBcIiwgcmVzcG9uc2UuY29udGVudCkgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b2tlbnMxID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuY29udGVudCkgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbF9pZFRva2VuID0gdG9rZW5zMS5zdWJzdHIoKHRva2VuczEuc2VhcmNoKFwiaWRfdG9rZW5cIikgKyAxMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmFsX2lkVG9rZW4gPSBpbml0aWFsX2lkVG9rZW4uc3Vic3RyKDAsIGluaXRpYWxfaWRUb2tlbi5pbmRleE9mKCdcIicpKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWRfdG9rZW4gaXMgOiBcIiwgZmluYWxfaWRUb2tlbilcclxuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIlRPS0VOXCIsIEpTT04uc3RyaW5naWZ5KGZpbmFsX2lkVG9rZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIklPU1Rva2VuXCIsIEpTT04uc3RyaW5naWZ5KGZpbmFsX2lkVG9rZW4pKTtcclxuICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBvY2N1cnJlZCBpbiByZWZyZXNoaW5nIHRva2VucyBhcmUgOiA6IFwiICsgZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIG9uVGFwKCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVXNlcigpO1xyXG4gICAgICAgIGlmICghdGhpcy5maXJzdG5hbWUgfHwgIXRoaXMubGFzdG5hbWUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFbnRlciBGaXJzdG5hbWUgYW5kIExhc3RuYW1lIHRvIFByb2NlZWQuLi4uLi4uLlwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIFJlZ2lzdGVyZWQgd2l0aCBkZXRhaWxzIC0tLS0+IFwiLCB0aGlzLmZpcnN0bmFtZSwgdGhpcy5sYXN0bmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gICAgICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImZpcnN0bmFtZVwiOiB0aGlzLmZpcnN0bmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBcImxhc3RuYW1lXCI6IHRoaXMubGFzdG5hbWUsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvYWRkY2FyXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19