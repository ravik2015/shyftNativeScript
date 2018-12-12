"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var selectservice_services_1 = require("./selectservice.services");
var ApplicationSettings = require("application-settings");
var Phone = require("nativescript-phone");
var platform = require("platform");
var application = require("application");
var SelectserviceComponent = (function () {
    function SelectserviceComponent(router, route, _page, modal, vcRef, selectService, routerExtension) {
        var _this = this;
        this.router = router;
        this.route = route;
        this._page = _page;
        this.modal = modal;
        this.vcRef = vcRef;
        this.selectService = selectService;
        this.routerExtension = routerExtension;
        this.state1 = true;
        this.state2 = true;
        this.state3 = true;
        this.state4 = true;
        this.state5 = true;
        this.state6 = true;
        this.state7 = true;
        this.state8 = true;
        this.servicesstate = true;
        this.buttonstate = true;
        this.vendorServices = Array();
        this.selectedServices = Array();
        this.datastate = true;
        this.vendorAddress = Object();
        this.vendorCategories = Array();
        if (this.route.queryParams) {
            this.route.queryParams.subscribe(function (params) {
                _this.vendorID = params["serviceID"];
                _this.vehicleID = params["vehicleID"];
                _this.appointmentUUID = params["appointmentUUID"];
                _this.deliveryfee = params["deliveryfee"];
            });
        }
        var vendor = JSON.parse(ApplicationSettings.getString("vendor"));
        this.vendorName = vendor.name;
        this.vendorEmail = vendor.email;
        this.vendorPhone = vendor.phoneNumber;
        this.vendorLogo = vendor.logo;
        this.vendorAddress = vendor.location.address;
        this.user = JSON.parse(ApplicationSettings.getString("user", "{}"));
        if (this.vendorCategories.length > 0) {
            console.log("if", this.vendorCategories.length);
            this.buttonstate = true;
        }
        else {
            console.log("else", this.vendorCategories.length);
            this.buttonstate = false;
        }
    }
    SelectserviceComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        this.getServiceStation();
        // this.createAppointment();
        this.user = JSON.parse(ApplicationSettings.getString("user", "{}"));
        ApplicationSettings.setString("vendorLogo", JSON.stringify(this.vendorLogo));
    };
    Object.defineProperty(SelectserviceComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    SelectserviceComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    SelectserviceComponent.prototype.getServiceStation = function () {
        var _this = this;
        this.selectService.servicesGet(this.vendorID)
            .subscribe(function (result) {
            result.categories.map(function (category) {
                console.log("Category : ", JSON.stringify(category));
                _this.vendorCategories.push(category);
                // category.services.map((service) => {
                //     console.log("Services : ", JSON.stringify(service))        
                //     this.vendorServices.push(service)                  
                // })       
                _this.buttonstate = true;
            });
            _this.datastate = false;
        }, function (error) {
            console.log("Vendor Details Get Error : ", error);
        });
    };
    SelectserviceComponent.prototype.createAppointment = function () {
        this.selectService.createCustomerAppointment(this.appointmentUUID, this.vendorID);
    };
    SelectserviceComponent.prototype.vehicleHistory = function () {
        // this.state1 = !this.state1
        // setTimeout(() => {
        //     this.state1 = true;
        // }, 1000);
        // this.router.navigate(["appointmentlisting"]);
        this.router.navigate(["status"]);
    };
    SelectserviceComponent.prototype.vehicleService = function () {
        var _this = this;
        this.createAppointment();
        setTimeout(function () {
            _this.state2 = true;
        }, 1000);
        var navigationExtras = {
            queryParams: {
                "appointmentUUID": this.appointmentUUID,
                "vendorCategories": JSON.stringify(this.vendorCategories),
                "vendorID": this.vendorID,
                "vehicleID": this.vehicleID,
                "deliveryfee": this.deliveryfee
            }
        };
        this.router.navigate(["servicecategory"], navigationExtras);
    };
    SelectserviceComponent.prototype.vehicleHealth = function () {
        var _this = this;
        this.state3 = !this.state3;
        setTimeout(function () {
            _this.state3 = true;
        }, 1000);
    };
    SelectserviceComponent.prototype.checkForRecalls = function () {
    };
    SelectserviceComponent.prototype.valueInventory = function () {
        var _this = this;
        this.state5 = !this.state5;
        setTimeout(function () {
            _this.state5 = true;
        }, 1000);
    };
    SelectserviceComponent.prototype.warranties = function () {
        var _this = this;
        this.state6 = !this.state6;
        setTimeout(function () {
            _this.state6 = true;
        }, 1000);
    };
    SelectserviceComponent.prototype.navigation = function () {
        var _this = this;
        this.state7 = !this.state7;
        setTimeout(function () {
            _this.state7 = true;
        }, 1000);
    };
    SelectserviceComponent.prototype.priceVehicleRepairs = function () {
        var _this = this;
        this.state8 = !this.state8;
        setTimeout(function () {
            _this.state8 = true;
        }, 1000);
    };
    SelectserviceComponent.prototype.back = function () {
        this.routerExtension.back();
    };
    SelectserviceComponent.prototype.callDealer = function () {
        Phone.dial(this.vendorPhone, true);
    };
    SelectserviceComponent.prototype.scheduleService = function () {
        this.routerExtension.navigate(["/carlist"], { clearHistory: true });
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], SelectserviceComponent.prototype, "drawerComponent", void 0);
    SelectserviceComponent = __decorate([
        core_1.Component({
            selector: "Selectservice",
            moduleId: module.id,
            styleUrls: ['selectservice.css'],
            templateUrl: "./selectservice.component.html",
            providers: [selectservice_services_1.SelectService]
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, page_1.Page, dialogs_1.ModalDialogService, core_1.ViewContainerRef, selectservice_services_1.SelectService, router_2.RouterExtensions])
    ], SelectserviceComponent);
    return SelectserviceComponent;
}());
exports.SelectserviceComponent = SelectserviceComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0c2VydmljZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWxlY3RzZXJ2aWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRTtBQUMvRSwwQ0FBMkU7QUFDM0Usc0RBQStEO0FBQy9ELGdDQUErQjtBQUcvQixtRUFBNkU7QUFHN0Usa0VBQWdGO0FBQ2hGLG1FQUF5RDtBQUN6RCwwREFBNEQ7QUFFNUQsMENBQTRDO0FBQzVDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFXekM7SUEwQkksZ0NBQTJCLE1BQWMsRUFBVSxLQUFxQixFQUFVLEtBQVcsRUFBVSxLQUF5QixFQUFVLEtBQXVCLEVBQVUsYUFBNEIsRUFBVSxlQUFpQztRQUFsUCxpQkEyQkM7UUEzQjBCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUF6QjNPLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsV0FBTSxHQUFHLElBQUksQ0FBQztRQUNkLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsV0FBTSxHQUFHLElBQUksQ0FBQztRQUNkLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2Qsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFLbkIsbUJBQWMsR0FBRyxLQUFL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SUFtTEM7QUFuTFksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgU2VsZWN0U2VydmljZU1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vc2VsZWN0c2VydmljZW1vZGFsXCI7XHJcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uLCBTaWRlRHJhd2VyTG9jYXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgU2VsZWN0U2VydmljZSB9IGZyb20gXCIuL3NlbGVjdHNlcnZpY2Uuc2VydmljZXNcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgaXNBbmRyb2lkLCBpc0lPUywgZGV2aWNlLCBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0ICogYXMgUGhvbmUgZnJvbSAnbmF0aXZlc2NyaXB0LXBob25lJztcclxudmFyIHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG52YXIgYXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJTZWxlY3RzZXJ2aWNlXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc3R5bGVVcmxzOiBbJ3NlbGVjdHNlcnZpY2UuY3NzJ10sXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NlbGVjdHNlcnZpY2UuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHByb3ZpZGVyczogW1NlbGVjdFNlcnZpY2VdXHJcblxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VsZWN0c2VydmljZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwdWJsaWMgc3RhdGUxID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBzdGF0ZTIgPSB0cnVlO1xyXG4gICAgcHVibGljIHN0YXRlMyA9IHRydWU7XHJcbiAgICBwdWJsaWMgc3RhdGU0ID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBzdGF0ZTUgPSB0cnVlO1xyXG4gICAgcHVibGljIHN0YXRlNiA9IHRydWU7XHJcbiAgICBwdWJsaWMgc3RhdGU3ID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBzdGF0ZTggPSB0cnVlO1xyXG4gICAgcHVibGljIHNlcnZpY2Vzc3RhdGUgPSB0cnVlO1xyXG4gICAgcHVibGljIGJ1dHRvbnN0YXRlID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBhcHBvaW50bWVudFVVSUQ7XHJcbiAgICBwdWJsaWMgdmVoaWNsZUlEO1xyXG4gICAgcHVibGljIHZlbmRvcklEO1xyXG4gICAgcHVibGljIGRlbGl2ZXJ5ZmVlO1xyXG4gICAgcHVibGljIHZlbmRvclNlcnZpY2VzID0gQXJyYXkoKTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFNlcnZpY2VzID0gQXJyYXkoKTtcclxuICAgIHB1YmxpYyB1c2VyO1xyXG4gICAgcHVibGljIGRhdGFzdGF0ZSA9IHRydWU7XHJcbiAgICBwcml2YXRlIHZlbmRvckxvZ287XHJcbiAgICBwcml2YXRlIHZlbmRvck5hbWU7XHJcbiAgICBwcml2YXRlIHZlbmRvclBob25lO1xyXG4gICAgcHJpdmF0ZSB2ZW5kb3JFbWFpbDtcclxuICAgIHByaXZhdGUgdmVuZG9yQWRkcmVzcyA9IE9iamVjdCgpO1xyXG4gICAgcHJpdmF0ZSB2ZW5kb3JDYXRlZ29yaWVzID0gQXJyYXkoKTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBzZWxlY3RTZXJ2aWNlOiBTZWxlY3RTZXJ2aWNlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbjogUm91dGVyRXh0ZW5zaW9ucykge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5yb3V0ZS5xdWVyeVBhcmFtcykge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZW5kb3JJRCA9IHBhcmFtc1tcInNlcnZpY2VJRFwiXVxyXG4gICAgICAgICAgICAgICAgdGhpcy52ZWhpY2xlSUQgPSBwYXJhbXNbXCJ2ZWhpY2xlSURcIl1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRVVUlEID0gcGFyYW1zW1wiYXBwb2ludG1lbnRVVUlEXCJdXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGl2ZXJ5ZmVlID0gcGFyYW1zW1wiZGVsaXZlcnlmZWVcIl1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmVuZG9yID0gSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInZlbmRvclwiKSlcclxuICAgICAgICB0aGlzLnZlbmRvck5hbWUgPSB2ZW5kb3IubmFtZTtcclxuICAgICAgICB0aGlzLnZlbmRvckVtYWlsID0gdmVuZG9yLmVtYWlsO1xyXG4gICAgICAgIHRoaXMudmVuZG9yUGhvbmUgPSB2ZW5kb3IucGhvbmVOdW1iZXI7XHJcbiAgICAgICAgdGhpcy52ZW5kb3JMb2dvID0gdmVuZG9yLmxvZ29cclxuICAgICAgICB0aGlzLnZlbmRvckFkZHJlc3MgPSB2ZW5kb3IubG9jYXRpb24uYWRkcmVzcztcclxuICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidXNlclwiLCBcInt9XCIpKVxyXG4gICAgICAgIGlmICh0aGlzLnZlbmRvckNhdGVnb3JpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlmXCIsIHRoaXMudmVuZG9yQ2F0ZWdvcmllcy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlbHNlXCIsIHRoaXMudmVuZG9yQ2F0ZWdvcmllcy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG5cclxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5nZXRTZXJ2aWNlU3RhdGlvbigpO1xyXG4gICAgICAgIC8vIHRoaXMuY3JlYXRlQXBwb2ludG1lbnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy51c2VyID0gSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInVzZXJcIiwgXCJ7fVwiKSlcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcInZlbmRvckxvZ29cIiwgSlNPTi5zdHJpbmdpZnkodGhpcy52ZW5kb3JMb2dvKSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2VydmljZVN0YXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RTZXJ2aWNlLnNlcnZpY2VzR2V0KHRoaXMudmVuZG9ySUQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmNhdGVnb3JpZXMubWFwKChjYXRlZ29yeSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgOiBcIiwgSlNPTi5zdHJpbmdpZnkoY2F0ZWdvcnkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmVuZG9yQ2F0ZWdvcmllcy5wdXNoKGNhdGVnb3J5KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhdGVnb3J5LnNlcnZpY2VzLm1hcCgoc2VydmljZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlNlcnZpY2VzIDogXCIsIEpTT04uc3RyaW5naWZ5KHNlcnZpY2UpKSAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMudmVuZG9yU2VydmljZXMucHVzaChzZXJ2aWNlKSAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uc3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YXN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZW5kb3IgRGV0YWlscyBHZXQgRXJyb3IgOiBcIiwgZXJyb3IpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVBcHBvaW50bWVudCgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdFNlcnZpY2UuY3JlYXRlQ3VzdG9tZXJBcHBvaW50bWVudCh0aGlzLmFwcG9pbnRtZW50VVVJRCwgdGhpcy52ZW5kb3JJRClcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmVoaWNsZUhpc3RvcnkoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5zdGF0ZTEgPSAhdGhpcy5zdGF0ZTFcclxuICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyAgICAgdGhpcy5zdGF0ZTEgPSB0cnVlO1xyXG4gICAgICAgIC8vIH0sIDEwMDApO1xyXG4gICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImFwcG9pbnRtZW50bGlzdGluZ1wiXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJzdGF0dXNcIl0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZlaGljbGVTZXJ2aWNlKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBcHBvaW50bWVudCgpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZTIgPSB0cnVlO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgXCJhcHBvaW50bWVudFVVSURcIjogdGhpcy5hcHBvaW50bWVudFVVSUQsXHJcbiAgICAgICAgICAgICAgICBcInZlbmRvckNhdGVnb3JpZXNcIjogSlNPTi5zdHJpbmdpZnkodGhpcy52ZW5kb3JDYXRlZ29yaWVzKSxcclxuICAgICAgICAgICAgICAgIFwidmVuZG9ySURcIjogdGhpcy52ZW5kb3JJRCxcclxuICAgICAgICAgICAgICAgIFwidmVoaWNsZUlEXCI6IHRoaXMudmVoaWNsZUlELFxyXG4gICAgICAgICAgICAgICAgXCJkZWxpdmVyeWZlZVwiOiB0aGlzLmRlbGl2ZXJ5ZmVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInNlcnZpY2VjYXRlZ29yeVwiXSwgbmF2aWdhdGlvbkV4dHJhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmVoaWNsZUhlYWx0aCgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlMyA9ICF0aGlzLnN0YXRlM1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlMyA9IHRydWU7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tGb3JSZWNhbGxzKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB2YWx1ZUludmVudG9yeSgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlNSA9ICF0aGlzLnN0YXRlNVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlNSA9IHRydWU7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2FycmFudGllcygpIHtcclxuICAgICAgICB0aGlzLnN0YXRlNiA9ICF0aGlzLnN0YXRlNlxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlNiA9IHRydWU7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdGlvbigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlNyA9ICF0aGlzLnN0YXRlN1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlNyA9IHRydWU7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpY2VWZWhpY2xlUmVwYWlycygpIHtcclxuICAgICAgICB0aGlzLnN0YXRlOCA9ICF0aGlzLnN0YXRlOFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlOCA9IHRydWU7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmFjaygpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbi5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbERlYWxlcigpIHtcclxuICAgICAgICBQaG9uZS5kaWFsKHRoaXMudmVuZG9yUGhvbmUsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNjaGVkdWxlU2VydmljZSgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbi5uYXZpZ2F0ZShbXCIvY2FybGlzdFwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICB9XHJcbn0iXX0=