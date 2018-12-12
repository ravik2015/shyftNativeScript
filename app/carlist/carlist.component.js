"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var carlist_services_1 = require("./carlist.services");
var ApplicationSettings = require("application-settings");
var platform_1 = require("platform");
var dialogs_1 = require("ui/dialogs");
var http = require("http");
var ScreenInfo = (function () {
    function ScreenInfo(heightDIPs, heightPixels, scale, widthDIPs, widthPixels) {
        this.heightDIPs = heightDIPs;
        this.heightPixels = heightPixels;
        this.scale = scale;
        this.widthDIPs = widthDIPs;
        this.widthPixels = widthPixels;
    }
    return ScreenInfo;
}());
var CarlistComponent = (function () {
    function CarlistComponent(router, route, _page, routerExtensions, carlistService) {
        this.router = router;
        this.route = route;
        this._page = _page;
        this.routerExtensions = routerExtensions;
        this.carlistService = carlistService;
        this.vehicles = Array();
        this.count = false;
        this.vehicleLoader = true;
        this.frameworks = Array();
        this.screenInformation = new ScreenInfo(platform_1.screen.mainScreen.heightDIPs, platform_1.screen.mainScreen.heightPixels, platform_1.screen.mainScreen.scale, platform_1.screen.mainScreen.widthDIPs, platform_1.screen.mainScreen.widthPixels);
        console.log("screen Info : ", JSON.stringify(this.screenInformation));
    }
    CarlistComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        this.getVehicle();
        this.user = JSON.parse(ApplicationSettings.getString("user", "{}"));
    };
    CarlistComponent.prototype.getVehicle = function () {
        var _this = this;
        this.carlistService.fleetGet()
            .subscribe(function (result) {
            console.log("Vehicle Get Result : ", JSON.stringify(result));
            if (result.status == 403) {
                console.log("Token Expired .. . . .");
                var refreshToken = JSON.parse(ApplicationSettings.getString("RefreshToken", "{}"));
                _this.tokenRefresh(refreshToken);
            }
            else if (result.length < 1) {
                _this.router.navigate(["addcar"]);
            }
            else {
                _this.vehicleLoader = false;
                _this.vehicles = result;
            }
        }, function (error) {
            dialogs_1.alert("Something went wrong .....");
            _this.router.navigate(["login"]);
            console.log("Vehicle Get Error :", error);
        });
    };
    CarlistComponent.prototype.tokenRefresh = function (refreshToken) {
        var _this = this;
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
            var tokens1 = JSON.stringify(response.content);
            var initial_idToken = tokens1.substr((tokens1.search("id_token") + 11));
            var final_idToken = initial_idToken.substr(0, initial_idToken.indexOf('"'));
            console.log("Id token is : ", final_idToken);
            ApplicationSettings.setString("TOKEN", JSON.stringify(final_idToken));
            ApplicationSettings.setString("IOSToken", JSON.stringify(final_idToken));
            _this.getVehicle();
        }, function (e) {
            console.log("Error occurred in refreshing tokens are : : " + e);
        });
    };
    CarlistComponent.prototype.onVehicleTap = function (args) {
        this.selectedIndexVehicle = args.index;
        var tappedView = args.view, tappedVehicle = tappedView.bindingContext;
        console.log("Selected Vehicle is : " + args.index + " . " + JSON.stringify(tappedVehicle));
        this.vehicle = JSON.stringify(tappedVehicle.id);
        ApplicationSettings.setString("vehicleid", JSON.stringify(tappedVehicle.id));
        var navigationExtras = {
            queryParams: {
                "vehicle": JSON.parse(this.vehicle),
            }
        };
        this.router.navigate(["vendorlist"], navigationExtras);
    };
    CarlistComponent.prototype.submit = function (res) {
        var navigationExtras = {
            queryParams: {}
        };
        this.router.navigate(["pickup"], navigationExtras);
    };
    CarlistComponent.prototype.close = function () {
        this.routerExtensions.back();
    };
    CarlistComponent.prototype.addCar = function () {
        this.router.navigate(["/addcar"]);
    };
    CarlistComponent = __decorate([
        core_1.Component({
            selector: "Carlist",
            moduleId: module.id,
            styleUrls: ['carlist.css'],
            templateUrl: "./carlist.component.html",
            providers: [carlist_services_1.CarlistService]
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, page_1.Page, router_2.RouterExtensions, carlist_services_1.CarlistService])
    ], CarlistComponent);
    return CarlistComponent;
}());
exports.CarlistComponent = CarlistComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FybGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RztBQUN6RyxnQ0FBK0I7QUFDL0IsMENBQTJFO0FBQzNFLHNEQUErRDtBQUcvRCx1REFBb0Q7QUFDcEQsMERBQTREO0FBQzVELHFDQUE0RDtBQUM1RCxzQ0FBbUM7QUFFbkMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTNCO0lBQ0ksb0JBQ1csVUFBa0IsRUFDbEIsWUFBb0IsRUFDcEIsS0FBYSxFQUNiLFNBQWlCLEVBQ2pCLFdBQW1CO1FBSm5CLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7SUFDMUIsQ0FBQztJQUNULGlCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFTRDtJQVlJLDBCQUEyQixNQUFjLEVBQVUsS0FBcUIsRUFBVSxLQUFXLEVBQVUsZ0JBQWtDLEVBQVUsY0FBOEI7UUFBdEosV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFUekssYUFBUSxHQUFHLEtBQUssRUFBRSxDQUFDO1FBR3BCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxrQkFBYSxHQUFHLElBQUksQ0FBQztRQUlwQixlQUFVLEdBQUcsS0FBSyxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksVUFBVSxDQUNuQyxpQkFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQzVC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SUFxSEM7QUFySFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgQ2FybGlzdFNlcnZpY2UgfSBmcm9tIFwiLi9jYXJsaXN0LnNlcnZpY2VzXCI7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MsIGRldmljZSwgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcblxyXG5jbGFzcyBTY3JlZW5JbmZvIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBoZWlnaHRESVBzOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIGhlaWdodFBpeGVsczogbnVtYmVyLFxyXG4gICAgICAgIHB1YmxpYyBzY2FsZTogbnVtYmVyLFxyXG4gICAgICAgIHB1YmxpYyB3aWR0aERJUHM6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgd2lkdGhQaXhlbHM6IG51bWJlclxyXG4gICAgKSB7IH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJDYXJsaXN0XCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc3R5bGVVcmxzOiBbJ2Nhcmxpc3QuY3NzJ10sXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2Nhcmxpc3QuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHByb3ZpZGVyczogW0Nhcmxpc3RTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FybGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwdWJsaWMgc2NyZWVuSW5mb3JtYXRpb246IFNjcmVlbkluZm87XHJcbiAgICBcclxuICAgIHByaXZhdGUgdmVoaWNsZXMgPSBBcnJheSgpO1xyXG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXhWZWhpY2xlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdmVoaWNsZTtcclxuICAgIHB1YmxpYyBjb3VudCA9IGZhbHNlO1xyXG4gICAgcHVibGljIHZlaGljbGVMb2FkZXIgPSB0cnVlO1xyXG4gICAgcHVibGljIHVzZXI7XHJcblxyXG5cclxuICAgIHByaXZhdGUgZnJhbWV3b3JrcyA9IEFycmF5KCk7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBjYXJsaXN0U2VydmljZTogQ2FybGlzdFNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLnNjcmVlbkluZm9ybWF0aW9uID0gbmV3IFNjcmVlbkluZm8oXHJcbiAgICAgICAgICAgIHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHMsXHJcbiAgICAgICAgICAgIHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodFBpeGVscyxcclxuICAgICAgICAgICAgc2NyZWVuLm1haW5TY3JlZW4uc2NhbGUsXHJcbiAgICAgICAgICAgIHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcyxcclxuICAgICAgICAgICAgc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhQaXhlbHMpO1xyXG4gICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzY3JlZW4gSW5mbyA6IFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNjcmVlbkluZm9ybWF0aW9uKSlcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpe1xyXG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTsgICAgICBcclxuICAgICAgICB0aGlzLmdldFZlaGljbGUoKTsgICBcclxuICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidXNlclwiLCBcInt9XCIpKSAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VmVoaWNsZSgpIHtcdFxyXG4gICAgICAgIHRoaXMuY2FybGlzdFNlcnZpY2UuZmxlZXRHZXQoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVoaWNsZSBHZXQgUmVzdWx0IDogXCIsIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5zdGF0dXMgPT0gNDAzKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRva2VuIEV4cGlyZWQgLi4gLiAuIC5cIilcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVmcmVzaFRva2VuID0gSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcIlJlZnJlc2hUb2tlblwiLFwie31cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlblJlZnJlc2gocmVmcmVzaFRva2VuKVxyXG4gICAgICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihyZXN1bHQubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiYWRkY2FyXCJdKVxyXG4gICAgICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlaGljbGVMb2FkZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlaGljbGVzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU29tZXRoaW5nIHdlbnQgd3JvbmcgLi4uLi5cIilcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImxvZ2luXCJdKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZlaGljbGUgR2V0IEVycm9yIDpcIiwgZXJyb3IpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2tlblJlZnJlc2gocmVmcmVzaFRva2VuKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlZnJlc2ggdG9rZW4gaXMgOiBcIiwgcmVmcmVzaFRva2VuKVxyXG4gICAgICAgIGxldCBmb3JtICA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kKCdncmFudF90eXBlJywgXCJyZWZyZXNoX3Rva2VuXCIpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kKFwiY2xpZW50X2lkXCIgLCBcIjRxZjNjNm8xa3ZvNHVmcGg5amZ1amFtaXVnXCIpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kKFwicmVmcmVzaF90b2tlblwiICwgcmVmcmVzaFRva2VuKTtcclxuICAgICAgICBcclxuICAgICAgICBodHRwLnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9zaHlmdC1hdXRvLmF1dGgudXMtZWFzdC0xLmFtYXpvbmNvZ25pdG8uY29tL29hdXRoMi90b2tlblwiLFxyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7IFxyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcclxuICAgICAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiIDogXCJCYXNpYyBOSEZtTTJNMmJ6RnJkbTgwZFdad2FEbHFablZxWVcxcGRXYzZNWE5vTjNFd2FESXpabU53YTJZME5tZHhiVE01WkdKbk0yZzJhR0kxYUdOamRITm9jWFJpYUcxbE56QTBZMkp0TXpJeFp3PT1cIlxyXG4gICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29udGVudDogZm9ybVxyXG4gICAgXHJcbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRva2VuczEgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5jb250ZW50KSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgaW5pdGlhbF9pZFRva2VuID0gdG9rZW5zMS5zdWJzdHIoKHRva2VuczEuc2VhcmNoKFwiaWRfdG9rZW5cIikgKyAxMSkpXHJcbiAgICAgICAgICAgIGxldCBmaW5hbF9pZFRva2VuID0gaW5pdGlhbF9pZFRva2VuLnN1YnN0cigwLCBpbml0aWFsX2lkVG9rZW4uaW5kZXhPZignXCInKSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJZCB0b2tlbiBpcyA6IFwiLCBmaW5hbF9pZFRva2VuKVxyXG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIlRPS0VOXCIsIEpTT04uc3RyaW5naWZ5KGZpbmFsX2lkVG9rZW4pKTtcclxuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJJT1NUb2tlblwiLCBKU09OLnN0cmluZ2lmeShmaW5hbF9pZFRva2VuKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VmVoaWNsZSgpXHJcbiAgICAgICAgfSwgKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBvY2N1cnJlZCBpbiByZWZyZXNoaW5nIHRva2VucyBhcmUgOiA6IFwiICsgZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBvblZlaGljbGVUYXAoYXJncykge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleFZlaGljbGUgPSBhcmdzLmluZGV4O1xyXG4gICAgICAgIGxldCB0YXBwZWRWaWV3ID0gYXJncy52aWV3LFxyXG4gICAgICAgIHRhcHBlZFZlaGljbGUgPSB0YXBwZWRWaWV3LmJpbmRpbmdDb250ZXh0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgVmVoaWNsZSBpcyA6IFwiICsgYXJncy5pbmRleCArIFwiIC4gXCIgKyBKU09OLnN0cmluZ2lmeSh0YXBwZWRWZWhpY2xlKSlcclxuICAgICAgICB0aGlzLnZlaGljbGUgPSBKU09OLnN0cmluZ2lmeSh0YXBwZWRWZWhpY2xlLmlkKVxyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwidmVoaWNsZWlkXCIsIEpTT04uc3RyaW5naWZ5KHRhcHBlZFZlaGljbGUuaWQpKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgXCJ2ZWhpY2xlXCI6IEpTT04ucGFyc2UodGhpcy52ZWhpY2xlKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInZlbmRvcmxpc3RcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3VibWl0KHJlczogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInBpY2t1cFwiXSwgbmF2aWdhdGlvbkV4dHJhcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNsb3NlKCl7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRDYXIoKXtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWRkY2FyXCJdKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==