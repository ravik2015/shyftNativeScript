"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var vendorlist_services_1 = require("./vendorlist.services");
var nativescript_geolocation_1 = require("nativescript-geolocation");
var dialogs_1 = require("ui/dialogs");
var angular2_uuid_1 = require("angular2-uuid");
var ApplicationSettings = require("application-settings");
var VendorlistComponent = (function () {
    function VendorlistComponent(router, route, _page, routerExtensions, vendorlistService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this._page = _page;
        this.routerExtensions = routerExtensions;
        this.vendorlistService = vendorlistService;
        this.Longitude = 0;
        this.Latitude = 0;
        this.vendorLoader = true;
        this.vendors = Array();
        nativescript_geolocation_1.enableLocationRequest(true);
        this.route.queryParams.subscribe(function (params) {
            console.log("Vehicle --------->" + params["vehicle"]);
            _this.vehicleID = params["vehicle"];
        });
        ApplicationSettings.setString("buttonstate", "true");
    }
    VendorlistComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        this.isLocationEnabled();
        this.getServiceStation();
        this.user = JSON.parse(ApplicationSettings.getString("user", "{}"));
    };
    VendorlistComponent.prototype.isLocationEnabled = function () {
        var isEnabledProperty = nativescript_geolocation_1.isEnabled();
        var message = "Not able to find Location please Enter Your Location";
        if (!isEnabledProperty) {
            console.log(message);
        }
        else {
            message = "Location services available";
            this.getLocationOnce();
        }
    };
    VendorlistComponent.prototype.getLocationOnce = function () {
        var _this = this;
        nativescript_geolocation_1.getCurrentLocation({
            desiredAccuracy: 50,
            timeout: 20000
        })
            .then(function (location) {
            console.log("Location received --------------------> " + JSON.stringify(location));
            _this.Longitude = location.longitude;
            _this.Latitude = location.latitude;
        }).catch(function (error) {
            console.log("Location error received: " + error);
        });
    };
    VendorlistComponent.prototype.getServiceStation = function () {
        var _this = this;
        this.vendorlistService.vendorGet()
            .subscribe(function (result) {
            result.map(function (item) {
                _this.vendorLoader = false;
                if (item) {
                    _this.vendors.push(item);
                    console.log("vendor --> ", JSON.stringify(item));
                }
                else {
                    var options = {
                        title: "Vendor Error",
                        message: "No Vendors Found",
                        okButtonText: "OK"
                    };
                    dialogs_1.alert(options).then(function () {
                        _this.router.navigate(["login"]);
                    });
                }
            });
        }, function (error) {
            console.log("Service Station's Get Error ---- >", error);
        });
    };
    VendorlistComponent.prototype.onServiceCentreTap = function (args) {
        this.selectedIndexService = args.index;
        var appointmentUUID = angular2_uuid_1.UUID.UUID();
        var tappedView = args.view, tappedService = tappedView.bindingContext;
        console.log("Selected Vendor is :  " + args.index + " . " + JSON.stringify(tappedService));
        this.vendor = tappedService.id;
        this.vendorLogo = tappedService.logo;
        ApplicationSettings.setString("deliveryfee", JSON.stringify(tappedService.deliveryPrice));
        ApplicationSettings.setString("vendorLogo", JSON.stringify(tappedService.logo));
        ApplicationSettings.setString("vendor", JSON.stringify(tappedService));
        ApplicationSettings.setString("appointmentid", JSON.stringify(appointmentUUID));
        ApplicationSettings.setString("vendorid", JSON.stringify(tappedService.id));
        ApplicationSettings.setString("vendorToCancel", JSON.stringify(tappedService.id));
        this.deliveryfee = JSON.stringify(tappedService.deliveryPrice);
        var navigationExtras = {
            queryParams: {
                "appointmentUUID": appointmentUUID,
                "vehicleID": this.vehicleID,
                "serviceID": this.vendor,
                "deliveryfee": this.deliveryfee,
            }
        };
        this.router.navigate(["selectservice"], navigationExtras);
    };
    VendorlistComponent.prototype.submit = function (res) {
    };
    VendorlistComponent.prototype.onPullToRefreshInitiated = function (args) {
        console.log(" ******** onPullToRefreshInitiated ********* ");
    };
    VendorlistComponent.prototype.close = function () {
        this.routerExtensions.backToPreviousPage();
    };
    VendorlistComponent = __decorate([
        core_1.Component({
            selector: "Vendorlist",
            moduleId: module.id,
            styleUrls: ['vendorlist.css'],
            templateUrl: "./vendorlist.component.html",
            providers: [vendorlist_services_1.VendorlistService]
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, page_1.Page, router_2.RouterExtensions, vendorlist_services_1.VendorlistService])
    ], VendorlistComponent);
    return VendorlistComponent;
}());
exports.VendorlistComponent = VendorlistComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVuZG9ybGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2ZW5kb3JsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RztBQUN6RyxnQ0FBK0I7QUFDL0IsMENBQTJFO0FBQzNFLHNEQUErRDtBQUMvRCw2REFBMEQ7QUFDMUQscUVBQW9IO0FBQ3BILHNDQUFtQztBQUNuQywrQ0FBcUM7QUFDckMsMERBQTREO0FBVTVEO0lBYUksNkJBQTJCLE1BQWMsRUFBVSxLQUFxQixFQUFVLEtBQVcsRUFBVSxnQkFBa0MsRUFBVSxpQkFBb0M7UUFBdkwsaUJBU0M7UUFUMEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBVmhMLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUduQixZQUFPLEdBQUcsS0FBSyxFQUFFLENBQUM7UUFLdEIsZ0RBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1lBQ3JELEtBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUV4RCxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLENB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LFNBQVM7Z0JBQzNCLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDeEIsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQ2xDO1NBQ0osQ0FBQztRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sb0NBQU0sR0FBYixVQUFjLEdBQVc7SUFJekIsQ0FBQztJQUVNLHNEQUF3QixHQUEvQixVQUFnQyxJQUFJO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLENBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBRUQsbUNBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUEvSFEsbUJBQW1CO1FBUC9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7WUFDN0IsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyx1Q0FBaUIsQ0FBQztTQUNqQyxDQUFDO3lDQWNxQyxlQUFNLEVBQWlCLHVCQUFjLEVBQWlCLFdBQUksRUFBNEIseUJBQWdCLEVBQTZCLHVDQUFpQjtPQWI5SyxtQkFBbUIsQ0FpSS9CO0lBQUQsMEJBQUM7Q0FBQSxBQWpJRCxJQWlJQztBQWpJWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgVmVuZG9ybGlzdFNlcnZpY2UgfSBmcm9tIFwiLi92ZW5kb3JsaXN0LnNlcnZpY2VzXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uLCBnZXRDdXJyZW50TG9jYXRpb24sIGlzRW5hYmxlZCwgZGlzdGFuY2UsIGVuYWJsZUxvY2F0aW9uUmVxdWVzdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcclxuaW1wb3J0IHsgYWxlcnQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnYW5ndWxhcjItdXVpZCc7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MsIGRldmljZSwgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIlZlbmRvcmxpc3RcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzdHlsZVVybHM6IFsndmVuZG9ybGlzdC5jc3MnXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdmVuZG9ybGlzdC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgcHJvdmlkZXJzOiBbVmVuZG9ybGlzdFNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWZW5kb3JsaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleFNlcnZpY2U6IG51bWJlcjtcclxuICAgIHB1YmxpYyBMb25naXR1ZGU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgTGF0aXR1ZGU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdmVuZG9yO1xyXG4gICAgcHVibGljIHZlbmRvckxvYWRlciA9IHRydWU7ICAgIFxyXG4gICAgcHVibGljIHVzZXI7XHJcbiAgICBwdWJsaWMgdmVoaWNsZUlEO1xyXG4gICAgcHJpdmF0ZSB2ZW5kb3JzID0gQXJyYXkoKTtcclxuICAgIHByaXZhdGUgZGVsaXZlcnlmZWU7XHJcbiAgICBwcml2YXRlIHZlbmRvckxvZ287XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgdmVuZG9ybGlzdFNlcnZpY2U6IFZlbmRvcmxpc3RTZXJ2aWNlKSB7XHJcbiAgICAgICAgZW5hYmxlTG9jYXRpb25SZXF1ZXN0KHRydWUpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZWhpY2xlIC0tLS0tLS0tLT5cIiArIHBhcmFtc1tcInZlaGljbGVcIl0pXHJcbiAgICAgICAgICAgIHRoaXMudmVoaWNsZUlEID0gcGFyYW1zW1widmVoaWNsZVwiXVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImJ1dHRvbnN0YXRlXCIsIFwidHJ1ZVwiKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlOyAgICAgIFxyXG4gICAgICAgIHRoaXMuaXNMb2NhdGlvbkVuYWJsZWQoKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2V0U2VydmljZVN0YXRpb24oKTtcclxuICBcclxuXHJcbiAgICAgICAgdGhpcy51c2VyID0gSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInVzZXJcIiwgXCJ7fVwiKSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNMb2NhdGlvbkVuYWJsZWQoKSB7XHJcbiAgICAgICAgbGV0IGlzRW5hYmxlZFByb3BlcnR5ID0gaXNFbmFibGVkKCk7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBcIk5vdCBhYmxlIHRvIGZpbmQgTG9jYXRpb24gcGxlYXNlIEVudGVyIFlvdXIgTG9jYXRpb25cIjtcclxuICAgICAgICBpZiAoIWlzRW5hYmxlZFByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkxvY2F0aW9uIHNlcnZpY2VzIGF2YWlsYWJsZVwiO1xyXG4gICAgICAgICAgICB0aGlzLmdldExvY2F0aW9uT25jZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TG9jYXRpb25PbmNlKCkge1xyXG4gICAgICAgIGdldEN1cnJlbnRMb2NhdGlvbihcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiA1MCxcclxuICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDIwMDAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9jYXRpb24gcmVjZWl2ZWQgLS0tLS0tLS0tLS0tLS0tLS0tLS0+IFwiICsgSlNPTi5zdHJpbmdpZnkobG9jYXRpb24pKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9jYXRpb24gZXJyb3IgcmVjZWl2ZWQ6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldFNlcnZpY2VTdGF0aW9uKCkge1xyXG4gICAgICAgIHRoaXMudmVuZG9ybGlzdFNlcnZpY2UudmVuZG9yR2V0KClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZlbmRvckxvYWRlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52ZW5kb3JzLnB1c2goaXRlbSk7ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmVuZG9yIC0tPiBcIiwgSlNPTi5zdHJpbmdpZnkoaXRlbSkpICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlZlbmRvciBFcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTm8gVmVuZG9ycyBGb3VuZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQob3B0aW9ucykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wibG9naW5cIl0pOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlcnZpY2UgU3RhdGlvbidzIEdldCBFcnJvciAtLS0tID5cIiwgZXJyb3IpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2VydmljZUNlbnRyZVRhcChhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4U2VydmljZSA9IGFyZ3MuaW5kZXg7XHJcbiAgICAgICAgbGV0IGFwcG9pbnRtZW50VVVJRCA9IFVVSUQuVVVJRCgpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IHRhcHBlZFZpZXcgPSBhcmdzLnZpZXcsXHJcbiAgICAgICAgICAgIHRhcHBlZFNlcnZpY2UgPSB0YXBwZWRWaWV3LmJpbmRpbmdDb250ZXh0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgVmVuZG9yIGlzIDogIFwiICsgYXJncy5pbmRleCArIFwiIC4gXCIgKyBKU09OLnN0cmluZ2lmeSh0YXBwZWRTZXJ2aWNlKSlcclxuICAgICAgICB0aGlzLnZlbmRvciA9IHRhcHBlZFNlcnZpY2UuaWRcclxuICAgICAgICB0aGlzLnZlbmRvckxvZ28gPSB0YXBwZWRTZXJ2aWNlLmxvZ29cclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImRlbGl2ZXJ5ZmVlXCIsSlNPTi5zdHJpbmdpZnkodGFwcGVkU2VydmljZS5kZWxpdmVyeVByaWNlKSlcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcInZlbmRvckxvZ29cIiwgSlNPTi5zdHJpbmdpZnkodGFwcGVkU2VydmljZS5sb2dvKSkgICAgICAgIFxyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwidmVuZG9yXCIsIEpTT04uc3RyaW5naWZ5KHRhcHBlZFNlcnZpY2UpKVxyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiYXBwb2ludG1lbnRpZFwiLCBKU09OLnN0cmluZ2lmeShhcHBvaW50bWVudFVVSUQpKVxyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwidmVuZG9yaWRcIiwgSlNPTi5zdHJpbmdpZnkodGFwcGVkU2VydmljZS5pZCkpIFxyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwidmVuZG9yVG9DYW5jZWxcIiwgSlNPTi5zdHJpbmdpZnkodGFwcGVkU2VydmljZS5pZCkpICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLmRlbGl2ZXJ5ZmVlID0gSlNPTi5zdHJpbmdpZnkodGFwcGVkU2VydmljZS5kZWxpdmVyeVByaWNlKVxyXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgXCJhcHBvaW50bWVudFVVSURcIjogYXBwb2ludG1lbnRVVUlELFxyXG4gICAgICAgICAgICAgICAgXCJ2ZWhpY2xlSURcIjogdGhpcy52ZWhpY2xlSUQsXHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VJRFwiOiB0aGlzLnZlbmRvcixcclxuICAgICAgICAgICAgICAgIFwiZGVsaXZlcnlmZWVcIjogdGhpcy5kZWxpdmVyeWZlZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInNlbGVjdHNlcnZpY2VcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdWJtaXQocmVzOiBzdHJpbmcpIHtcclxuICBcclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBvblB1bGxUb1JlZnJlc2hJbml0aWF0ZWQoYXJncyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIgKioqKioqKiogb25QdWxsVG9SZWZyZXNoSW5pdGlhdGVkICoqKioqKioqKiBcIilcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpe1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19