"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var status_services_1 = require("./status.services");
var ApplicationSettings = require("application-settings");
var page_1 = require("ui/page");
var Phone = require("nativescript-phone");
var platform_1 = require("tns-core-modules/platform");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var dialogs_1 = require("ui/dialogs");
var StatusComponent = (function () {
    function StatusComponent(router, _page, statusService, route, routerExtensions) {
        this.router = router;
        this._page = _page;
        this.statusService = statusService;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.vendorAddress = Object();
        this.appointmentVisible = false;
        console.log("status appointment id ", ApplicationSettings.getString("deliveryfee"));
        this.route.queryParams.subscribe(function (params) {
        });
        if (platform_1.isIOS) {
            nativescript_fancyalert_1.TNSFancyAlert.hideAnimationType =
                nativescript_fancyalert_1.TNSFancyAlert.HIDE_ANIMATION_TYPES.SlideOutToBottom;
        }
        var vendor = JSON.parse(ApplicationSettings.getString("vendor"));
        this.vendorName = vendor.name;
        this.vendorEmail = vendor.email;
        this.vendorPhone = vendor.phoneNumber;
        this.vendorLogo = vendor.logo;
        this.vendorAddress = vendor.location.address;
        if (ApplicationSettings.getNumber("totalcost") > 0) {
            this.appointmentVisible = !this.appointmentVisible;
        }
    }
    StatusComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
    };
    StatusComponent.prototype.onBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    StatusComponent.prototype.dashboard = function () {
        this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });
    };
    StatusComponent.prototype.cancelAppointment = function () {
        var _this = this;
        console.log("***** Appointment Cancelled *****", ApplicationSettings.getString("appointmentid"));
        if (ApplicationSettings.getString("appointmentid") != 'null') {
            var options = {
                title: "Appointment",
                message: "Are you sure you want to Cancel this Appointment?",
                okButtonText: "Yes",
                cancelButtonText: "Cancel",
            };
            dialogs_1.confirm(options).then(function (result) {
                console.log(result);
                if (result === true) {
                    _this.statusService.cancelAppointment()
                        .subscribe(function (result) {
                        console.log("Appointment Cancel Success : ", (JSON.stringify(result)));
                        ApplicationSettings.setNumber("totalcost", 0);
                        ApplicationSettings.setString("vendorid", 'null');
                        ApplicationSettings.setString("vehicleid", 'null');
                        ApplicationSettings.setString("appointmentid", 'null');
                        ApplicationSettings.setString("deliveryfee", 'null');
                        _this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });
                    }, function (error) {
                        console.log("Appointment Cancel Error : ", error);
                        nativescript_fancyalert_1.TNSFancyAlert.showError("Appointment!", "Appointment Cancelled", "Ok");
                        ApplicationSettings.setNumber("totalcost", 0);
                        ApplicationSettings.setString("vendorid", 'null');
                        ApplicationSettings.setString("vehicleid", 'null');
                        ApplicationSettings.setString("appointmentid", 'null');
                        ApplicationSettings.setString("deliveryfee", 'null');
                        _this.routerExtensions.navigate(["/selectservice"], { clearHistory: true });
                    });
                }
            });
        }
        else {
            if (platform_1.isIOS) {
                nativescript_fancyalert_1.TNSFancyAlert.showAnimationType =
                    SCLAlertViewShowAnimation.SlideInFromBottom;
                nativescript_fancyalert_1.TNSFancyAlert.hideAnimationType =
                    SCLAlertViewHideAnimation.SlideOutToRight;
            }
            nativescript_fancyalert_1.TNSFancyAlert.showInfo("Appointment", "You have no Current Appointment to be Cancelled.", "Ok");
            if (platform_1.isIOS) {
                this.reset();
            }
        }
    };
    StatusComponent.prototype.callDealer = function () {
        Phone.dial(this.vendorPhone, true);
    };
    StatusComponent.prototype.reset = function () {
        setTimeout(function () {
            nativescript_fancyalert_1.TNSFancyAlert.showAnimationType = undefined;
            nativescript_fancyalert_1.TNSFancyAlert.hideAnimationType =
                nativescript_fancyalert_1.TNSFancyAlert.HIDE_ANIMATION_TYPES.SlideOutToBottom;
            nativescript_fancyalert_1.TNSFancyAlert.backgroundType = undefined;
            nativescript_fancyalert_1.TNSFancyAlert.soundURL = undefined;
        }, 1000);
    };
    StatusComponent = __decorate([
        core_1.Component({
            selector: "Status",
            moduleId: module.id,
            styleUrls: ['status.css'],
            templateUrl: "./status.component.html",
            providers: [status_services_1.StatusService]
        }),
        __metadata("design:paramtypes", [router_1.Router, page_1.Page, status_services_1.StatusService, router_1.ActivatedRoute, router_2.RouterExtensions])
    ], StatusComponent);
    return StatusComponent;
}());
exports.StatusComponent = StatusComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXR1cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkY7QUFDM0YsMENBQTJFO0FBQzNFLHNEQUErRDtBQUUvRCxxREFBa0Q7QUFDbEQsMERBQTREO0FBQzVELGdDQUErQjtBQUMvQiwwQ0FBNEM7QUFHNUMsc0RBQTZEO0FBQzdELG1FQUE2RTtBQUM3RSxzQ0FBcUM7QUFzQnJDO0lBU0kseUJBQTJCLE1BQWMsRUFBVSxLQUFXLEVBQVUsYUFBNEIsRUFBVSxLQUFxQixFQUFVLGdCQUFrQztRQUFwSixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBSHZLLGtCQUFhLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFDekIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBRy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7UUFDbkYsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsdUNBQWEsQ0FBQyxpQkFBaUI7Z0JBQzNCLHVDQUFhLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUM7UUFDNUQsQ0FBQztRQUVELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDaEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMs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QjtnQkFDM0IsdUNBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN4RCx1Q0FBYSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7WUFDekMsdUNBQWEsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3ZDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7SUFqSFEsZUFBZTtRQVIzQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN6QixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLCtCQUFhLENBQUM7U0FDN0IsQ0FBQzt5Q0FXcUMsZUFBTSxFQUFpQixXQUFJLEVBQXlCLCtCQUFhLEVBQWlCLHVCQUFjLEVBQTRCLHlCQUFnQjtPQVR0SyxlQUFlLENBbUgzQjtJQUFELHNCQUFDO0NBQUEsQUFuSEQsSUFtSEM7QUFuSFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCB7IFN0YXR1c1NlcnZpY2UgfSBmcm9tIFwiLi9zdGF0dXMuc2VydmljZXNcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCAqIGFzIFBob25lIGZyb20gJ25hdGl2ZXNjcmlwdC1waG9uZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xyXG5pbXBvcnQgeyBpc0lPUywgaXNBbmRyb2lkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCwgVE5TRmFuY3lBbGVydEJ1dHRvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG5pbXBvcnQgeyBjb25maXJtIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcbmRlY2xhcmUgdmFyIE5TTXV0YWJsZUF0dHJpYnV0ZWRTdHJpbmc6IGFueSxcclxuICAgIE5TRm9yZWdyb3VuZENvbG9yQXR0cmlidXRlTmFtZTogYW55LFxyXG4gICAgTlNDYXNlSW5zZW5zaXRpdmVTZWFyY2g6IGFueSxcclxuICAgIE5TVW5kZXJsaW5lU3R5bGVTaW5nbGU6IGFueSxcclxuICAgIFVJVmlldzogYW55LFxyXG4gICAgQ0dSZWN0TWFrZTogYW55LFxyXG4gICAgU0NMQWxlcnRWaWV3U2hvd0FuaW1hdGlvbjogYW55LFxyXG4gICAgU0NMQWxlcnRWaWV3SGlkZUFuaW1hdGlvbjogYW55LFxyXG4gICAgU0NMQWxlcnRWaWV3QmFja2dyb3VuZDogYW55LFxyXG4gICAgTlNTdHJpbmc6IGFueSxcclxuICAgIE5TVW5kZXJsaW5lU3R5bGVBdHRyaWJ1dGVOYW1lOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIlN0YXR1c1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHN0eWxlVXJsczogWydzdGF0dXMuY3NzJ10sXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3N0YXR1cy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgcHJvdmlkZXJzOiBbU3RhdHVzU2VydmljZV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0dXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHByaXZhdGUgdmVuZG9yTG9nbztcclxuICAgIHByaXZhdGUgdmVuZG9yTmFtZTtcclxuICAgIHByaXZhdGUgdmVuZG9yUGhvbmU7XHJcbiAgICBwcml2YXRlIHZlbmRvckVtYWlsO1xyXG4gICAgcHJpdmF0ZSB2ZW5kb3JBZGRyZXNzID0gT2JqZWN0KCk7XHJcbiAgICBwcml2YXRlIGFwcG9pbnRtZW50VmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIHN0YXR1c1NlcnZpY2U6IFN0YXR1c1NlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1cyBhcHBvaW50bWVudCBpZCBcIiwgQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJkZWxpdmVyeWZlZVwiKSlcclxuICAgICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpc0lPUykge1xyXG4gICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LmhpZGVBbmltYXRpb25UeXBlID1cclxuICAgICAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuSElERV9BTklNQVRJT05fVFlQRVMuU2xpZGVPdXRUb0JvdHRvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2ZW5kb3IgPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidmVuZG9yXCIpKVxyXG4gICAgICAgIHRoaXMudmVuZG9yTmFtZSA9IHZlbmRvci5uYW1lO1xyXG4gICAgICAgIHRoaXMudmVuZG9yRW1haWwgPSB2ZW5kb3IuZW1haWw7XHJcbiAgICAgICAgdGhpcy52ZW5kb3JQaG9uZSA9IHZlbmRvci5waG9uZU51bWJlcjtcclxuICAgICAgICB0aGlzLnZlbmRvckxvZ28gPSB2ZW5kb3IubG9nb1xyXG4gICAgICAgIHRoaXMudmVuZG9yQWRkcmVzcyA9IHZlbmRvci5sb2NhdGlvbi5hZGRyZXNzO1xyXG4gICAgICAgIGlmIChBcHBsaWNhdGlvblNldHRpbmdzLmdldE51bWJlcihcInRvdGFsY29zdFwiKSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBvaW50bWVudFZpc2libGUgPSAhdGhpcy5hcHBvaW50bWVudFZpc2libGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25CYWNrKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBkYXNoYm9hcmQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9zZWxlY3RzZXJ2aWNlXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FuY2VsQXBwb2ludG1lbnQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIqKioqKiBBcHBvaW50bWVudCBDYW5jZWxsZWQgKioqKipcIiwgQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJhcHBvaW50bWVudGlkXCIpKVxyXG4gICAgICAgIGlmIChBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcImFwcG9pbnRtZW50aWRcIikgIT0gJ251bGwnKSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQXBwb2ludG1lbnRcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIENhbmNlbCB0aGlzIEFwcG9pbnRtZW50P1wiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlllc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbmZpcm0ob3B0aW9ucykudGhlbigocmVzdWx0OiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzU2VydmljZS5jYW5jZWxBcHBvaW50bWVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcHBvaW50bWVudCBDYW5jZWwgU3VjY2VzcyA6IFwiLCAoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSkpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXROdW1iZXIoXCJ0b3RhbGNvc3RcIiwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwidmVuZG9yaWRcIiwgJ251bGwnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJ2ZWhpY2xlaWRcIiwgJ251bGwnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJhcHBvaW50bWVudGlkXCIsICdudWxsJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiZGVsaXZlcnlmZWVcIiwgJ251bGwnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9zZWxlY3RzZXJ2aWNlXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFwcG9pbnRtZW50IENhbmNlbCBFcnJvciA6IFwiLCBlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwb2ludG1lbnQhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBvaW50bWVudCBDYW5jZWxsZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk9rXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldE51bWJlcihcInRvdGFsY29zdFwiLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJ2ZW5kb3JpZFwiLCAnbnVsbCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcInZlaGljbGVpZFwiLCAnbnVsbCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImFwcG9pbnRtZW50aWRcIiwgJ251bGwnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJkZWxpdmVyeWZlZVwiLCAnbnVsbCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3NlbGVjdHNlcnZpY2VcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0FuaW1hdGlvblR5cGUgPVxyXG4gICAgICAgICAgICAgICAgICAgIFNDTEFsZXJ0Vmlld1Nob3dBbmltYXRpb24uU2xpZGVJbkZyb21Cb3R0b207XHJcbiAgICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LmhpZGVBbmltYXRpb25UeXBlID1cclxuICAgICAgICAgICAgICAgICAgICBTQ0xBbGVydFZpZXdIaWRlQW5pbWF0aW9uLlNsaWRlT3V0VG9SaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dJbmZvKFxyXG4gICAgICAgICAgICAgICAgXCJBcHBvaW50bWVudFwiLFxyXG4gICAgICAgICAgICAgICAgYFlvdSBoYXZlIG5vIEN1cnJlbnQgQXBwb2ludG1lbnQgdG8gYmUgQ2FuY2VsbGVkLmAsXHJcbiAgICAgICAgICAgICAgICBcIk9rXCJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKGlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNhbGxEZWFsZXIoKSB7XHJcbiAgICAgICAgUGhvbmUuZGlhbCh0aGlzLnZlbmRvclBob25lLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93QW5pbWF0aW9uVHlwZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5oaWRlQW5pbWF0aW9uVHlwZSA9XHJcbiAgICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LkhJREVfQU5JTUFUSU9OX1RZUEVTLlNsaWRlT3V0VG9Cb3R0b207XHJcbiAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuYmFja2dyb3VuZFR5cGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc291bmRVUkwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==