"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var appointmentlisting_services_1 = require("./appointmentlisting.services");
var router_2 = require("nativescript-angular/router");
var AppointmentlistingComponent = (function () {
    function AppointmentlistingComponent(router, _page, appointmentlistingService, route, routerExtensions) {
        this.router = router;
        this._page = _page;
        this.appointmentlistingService = appointmentlistingService;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.selectedAppointmentstate = false;
        this.appointmentState = true;
        this.isClassVisible = false;
        this.count = 0;
        this.datastate = true;
    }
    AppointmentlistingComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        this.getVehicleHistory();
    };
    AppointmentlistingComponent.prototype.getVehicleHistory = function () {
        var _this = this;
        this.appointmentlistingService.vehiclehistory()
            .subscribe(function (result) {
            _this.datastate = false;
            console.log("Vehiclehistory Get success ---- >", JSON.stringify(result));
            _this.appointments = result;
        }, function (error) {
            console.log("vehiclehistory Error ---- >", error);
        });
    };
    AppointmentlistingComponent.prototype.itemTapped = function (args, data, index) {
        console.log(" Tapped From List------------------>" + index + JSON.stringify(data));
        this.services = data.serviceSelections;
        var navigationExtras = {
            queryParams: {
                "appointmentdata": JSON.stringify(data),
            }
        };
        this.router.navigate(["appointmentdata"], navigationExtras);
    };
    AppointmentlistingComponent.prototype.onDataTap = function (args) {
        this.selectedAppointmentstate = false;
        this.appointmentState = true;
    };
    AppointmentlistingComponent.prototype.onBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    AppointmentlistingComponent = __decorate([
        core_1.Component({
            selector: "Appointmentlisting",
            moduleId: module.id,
            styleUrls: ['appointmentlisting.css'],
            templateUrl: "./appointmentlisting.component.html",
            providers: [appointmentlisting_services_1.AppointmentlistingService]
        }),
        __metadata("design:paramtypes", [router_1.Router, page_1.Page, appointmentlisting_services_1.AppointmentlistingService, router_1.ActivatedRoute, router_2.RouterExtensions])
    ], AppointmentlistingComponent);
    return AppointmentlistingComponent;
}());
exports.AppointmentlistingComponent = AppointmentlistingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRsaXN0aW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcG9pbnRtZW50bGlzdGluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkY7QUFDM0YsMENBQTJFO0FBQzNFLGdDQUErQjtBQUMvQiw2RUFBMEU7QUFFMUUsc0RBQStEO0FBVS9EO0lBV0kscUNBQTJCLE1BQWMsRUFBVSxLQUFXLEVBQVUseUJBQW9ELEVBQVUsS0FBcUIsRUFBVSxnQkFBa0M7UUFBNUssV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBTmhNLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGNBQVMsR0FBRyxJQUFJLENBQUM7SUFJeEIsQ0FBQztJQUVELDhDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUdNLHVEQUFpQixHQUF4QjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsRUFBRTthQUMxQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ1YsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7WUFDeEUsS0FBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFDbkMsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sZ0RBQVUsR0FBakIsVUFBa0IsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUN2QyxJQUFJLGdCQUFnQixHQUFxQjtZQUNyQyxXQUFXLEVBQUU7Z0JBQ1QsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDMUM7U0FDSixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVNLCtDQUFTLEdBQWhCLFVBQWlCLElBQUk7UUFDakIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFFRCw0Q0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQWxEUSwyQkFBMkI7UUFSdkMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ3JDLFdBQVcsRUFBRSxxQ0FBcUM7WUFDbEQsU0FBUyxFQUFFLENBQUMsdURBQXlCLENBQUM7U0FDekMsQ0FBQzt5Q0FhcUMsZUFBTSxFQUFpQixXQUFJLEVBQXFDLHVEQUF5QixFQUFpQix1QkFBYyxFQUE0Qix5QkFBZ0I7T0FYOUwsMkJBQTJCLENBb0R2QztJQUFELGtDQUFDO0NBQUEsQUFwREQsSUFvREM7QUFwRFksa0VBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcywgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBBcHBvaW50bWVudGxpc3RpbmdTZXJ2aWNlIH0gZnJvbSBcIi4vYXBwb2ludG1lbnRsaXN0aW5nLnNlcnZpY2VzXCI7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIkFwcG9pbnRtZW50bGlzdGluZ1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHN0eWxlVXJsczogWydhcHBvaW50bWVudGxpc3RpbmcuY3NzJ10sXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FwcG9pbnRtZW50bGlzdGluZy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgcHJvdmlkZXJzOiBbQXBwb2ludG1lbnRsaXN0aW5nU2VydmljZV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBvaW50bWVudGxpc3RpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHB1YmxpYyBhcHBvaW50bWVudHM7XHJcbiAgICBwdWJsaWMgaWQ7XHJcbiAgICBwdWJsaWMgc2VydmljZXM7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRBcHBvaW50bWVudHN0YXRlID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgYXBwb2ludG1lbnRTdGF0ZSA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNDbGFzc1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBjb3VudCA9IDA7XHJcbiAgICBwdWJsaWMgZGF0YXN0YXRlID0gdHJ1ZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBhcHBvaW50bWVudGxpc3RpbmdTZXJ2aWNlOiBBcHBvaW50bWVudGxpc3RpbmdTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5nZXRWZWhpY2xlSGlzdG9yeSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0VmVoaWNsZUhpc3RvcnkoKSB7XHJcbiAgICAgICAgdGhpcy5hcHBvaW50bWVudGxpc3RpbmdTZXJ2aWNlLnZlaGljbGVoaXN0b3J5KClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhc3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZlaGljbGVoaXN0b3J5IEdldCBzdWNjZXNzIC0tLS0gPlwiLCBKU09OLnN0cmluZ2lmeShyZXN1bHQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmVoaWNsZWhpc3RvcnkgRXJyb3IgLS0tLSA+XCIsIGVycm9yKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXRlbVRhcHBlZChhcmdzLCBkYXRhLCBpbmRleCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIFRhcHBlZCBGcm9tIExpc3QtLS0tLS0tLS0tLS0tLS0tLS0+XCIgKyBpbmRleCArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB0aGlzLnNlcnZpY2VzID0gZGF0YS5zZXJ2aWNlU2VsZWN0aW9ucztcclxuICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcclxuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIFwiYXBwb2ludG1lbnRkYXRhXCI6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJhcHBvaW50bWVudGRhdGFcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkRhdGFUYXAoYXJncykge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBcHBvaW50bWVudHN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hcHBvaW50bWVudFN0YXRlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJhY2soKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=