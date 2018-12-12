"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var ApplicationSettings = require("application-settings");
var moment = require("moment");
var pickup_services_1 = require("./pickup.services");
var PickupModalComponent = (function () {
    function PickupModalComponent(params, router, route, routerExtensions, pickupService) {
        this.params = params;
        this.router = router;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.pickupService = pickupService;
        this.firstSwitchState = "OFF";
        this.totalCost = 0;
        this.services = Array();
        this.time = moment(JSON.parse(ApplicationSettings.getString("appointmentDate", "{}"))).format("hh:mm a");
        this.totalcost = 58.93;
        this.todaysFee = 5.48;
        // this.getcurrentAppointment()
        this.address = params.context.address;
        this.frameworks = params.context.services;
        this.todaysFee = parseInt(params.context.deliveryfee);
        this.servicecost = parseInt(params.context.servicecost);
        this.totalcost = (this.servicecost) + (this.todaysFee);
        this.vendorID = params.context.vendor;
        this.vehicleID = params.context.vehicle;
        this.clientToken = params.context.clientToken;
    }
    PickupModalComponent.prototype.ngOnInit = function () {
    };
    PickupModalComponent.prototype.getcurrentAppointment = function () {
        this.pickupService.currentAppointmentGet()
            .subscribe(function (result) {
            console.log("getcurrentAppointment Get success ---- >", JSON.stringify(result));
        }, function (error) {
            console.log("getcurrentAppointment Error ---- >", error);
        });
    };
    PickupModalComponent.prototype.close = function () {
        var res = "closed";
        this.params.closeCallback(res);
    };
    PickupModalComponent.prototype.submit = function (res) {
        var appointmentdata = {
            "address": this.address,
            "time": this.time,
            "totalcost": this.totalcost,
            "todaysfee": this.todaysFee,
            "vendorid": this.vendorID,
            "vehicleid": this.vehicleID,
        };
        this.close();
        this.payment();
        ApplicationSettings.setString("APPOINTMENT", JSON.stringify(appointmentdata));
    };
    PickupModalComponent.prototype.onAgree = function () {
        console.log('checked prop value : ' + this.CheckBox.nativeElement.checked);
    };
    PickupModalComponent.prototype.payment = function () {
        if (this.CheckBox.nativeElement.checked) {
            this.params.closeCallback("payment");
        }
        else {
            alert("Please Check the agreement to proceed for Payment");
        }
    };
    __decorate([
        core_1.ViewChild("CB1"),
        __metadata("design:type", core_1.ElementRef)
    ], PickupModalComponent.prototype, "CheckBox", void 0);
    PickupModalComponent = __decorate([
        core_1.Component({
            selector: "my-pickupmodal",
            templateUrl: "pickupmodal.html",
            providers: [pickup_services_1.PickupService]
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, router_1.Router, router_1.ActivatedRoute, router_2.RouterExtensions, pickup_services_1.PickupService])
    ], PickupModalComponent);
    return PickupModalComponent;
}());
exports.PickupModalComponent = PickupModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwbW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaWNrdXBtb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUN6RSxtRUFBNEU7QUFDNUUsMENBQXlEO0FBRXpELHNEQUErRDtBQUMvRCwwREFBNEQ7QUFDNUQsK0JBQWlDO0FBQ2pDLHFEQUFrRDtBQVFsRDtJQWtCSSw4QkFBMkIsTUFBeUIsRUFBVSxNQUFjLEVBQVUsS0FBcUIsRUFBVSxnQkFBa0MsRUFBVSxhQUE0QjtRQUFsSyxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWZ0TCxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUlkLGFBQVEsR0FBRyxLQUFLLEVBQUUsQ0FBQztRQUVuQixTQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbkcsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBTXBCLCtCQUErQjtRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUE7SUFDakQsQ0FBQztJQUVELHVDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRU0sb0RBQXFCLEdBQTVCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRTthQUNyQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDdkYsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sb0NBQUssR0FBWjtRQUNJLElBQUksR0FBRyxHQUFDLFFBQVEsQ0FBQTtRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0scUNBQU0sR0FBYixVQUFjLEdBQVc7UUFDckIsSUFBSSxlQUFlLEdBQUc7WUFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDM0IsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDOUIsQ0FBQTtRQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUViLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNkLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFJRCxzQ0FBTyxHQUFQO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sc0NBQU8sR0FBZDtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUN2QyxDQUFDO1lBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELElBQUksQ0FBQSxDQUFDO1lBQ0QsS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUE7UUFDOUQsQ0FBQztJQUNMLENBQUM7SUE1RGlCO1FBQWpCLGdCQUFTLENBQUMsS0FBSyxDQUFDO2tDQUFXLGlCQUFVOzBEQUFDO0lBaEI5QixvQkFBb0I7UUFMaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLGtCQUFrQjtZQUMvQixTQUFTLEVBQUUsQ0FBQywrQkFBYSxDQUFDO1NBQzdCLENBQUM7eUNBbUJxQywyQkFBaUIsRUFBa0IsZUFBTSxFQUFpQix1QkFBYyxFQUE0Qix5QkFBZ0IsRUFBeUIsK0JBQWE7T0FsQnBMLG9CQUFvQixDQThFaEM7SUFBRCwyQkFBQztDQUFBLEFBOUVELElBOEVDO0FBOUVZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSBcInVpL3N3aXRjaFwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IFBpY2t1cFNlcnZpY2UgfSBmcm9tIFwiLi9waWNrdXAuc2VydmljZXNcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJteS1waWNrdXBtb2RhbFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcInBpY2t1cG1vZGFsLmh0bWxcIixcbiAgICBwcm92aWRlcnM6IFtQaWNrdXBTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBQaWNrdXBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgY2xpZW50VG9rZW47XG4gICAgcHVibGljIGZpcnN0U3dpdGNoU3RhdGUgPSBcIk9GRlwiO1xuICAgIHB1YmxpYyB0b3RhbENvc3QgPSAwO1xuICAgIHB1YmxpYyB2ZW5kb3JJRDtcbiAgICBwdWJsaWMgdmVoaWNsZUlEO1xuICAgIHB1YmxpYyBzdGF0dXM6IEJvb2xlYW47XG4gICAgcHVibGljIHNlcnZpY2VzID0gQXJyYXkoKTtcbiAgICBwdWJsaWMgYWRkcmVzcztcbiAgICBwdWJsaWMgdGltZSA9IG1vbWVudChKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiYXBwb2ludG1lbnREYXRlXCIsXCJ7fVwiKSkpLmZvcm1hdChcImhoOm1tIGFcIik7XG4gICAgcHVibGljIHNlcnZpY2Vjb3N0O1xuICAgIHB1YmxpYyB0b3RhbGNvc3QgPSA1OC45MztcbiAgICBwdWJsaWMgdG9kYXlzRmVlID0gNS40ODtcbiAgICBwdWJsaWMgZnJhbWV3b3JrcztcblxuICAgIEBWaWV3Q2hpbGQoXCJDQjFcIikgQ2hlY2tCb3g6IEVsZW1lbnRSZWY7XG4gICAgXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcywgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBwaWNrdXBTZXJ2aWNlOiBQaWNrdXBTZXJ2aWNlKSB7XG4gICAgICAgIC8vIHRoaXMuZ2V0Y3VycmVudEFwcG9pbnRtZW50KClcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gcGFyYW1zLmNvbnRleHQuYWRkcmVzcztcbiAgICAgICAgdGhpcy5mcmFtZXdvcmtzID0gcGFyYW1zLmNvbnRleHQuc2VydmljZXM7XG4gICAgICAgIHRoaXMudG9kYXlzRmVlID0gcGFyc2VJbnQocGFyYW1zLmNvbnRleHQuZGVsaXZlcnlmZWUpO1xuICAgICAgICB0aGlzLnNlcnZpY2Vjb3N0ID0gcGFyc2VJbnQocGFyYW1zLmNvbnRleHQuc2VydmljZWNvc3QpO1xuICAgICAgICB0aGlzLnRvdGFsY29zdCA9ICh0aGlzLnNlcnZpY2Vjb3N0KSArICh0aGlzLnRvZGF5c0ZlZSk7XG4gICAgICAgIHRoaXMudmVuZG9ySUQgPSBwYXJhbXMuY29udGV4dC52ZW5kb3I7XG4gICAgICAgIHRoaXMudmVoaWNsZUlEID0gcGFyYW1zLmNvbnRleHQudmVoaWNsZTtcbiAgICAgICAgdGhpcy5jbGllbnRUb2tlbiA9IHBhcmFtcy5jb250ZXh0LmNsaWVudFRva2VuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGdldGN1cnJlbnRBcHBvaW50bWVudCgpIHtcbiAgICAgICAgdGhpcy5waWNrdXBTZXJ2aWNlLmN1cnJlbnRBcHBvaW50bWVudEdldCgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRjdXJyZW50QXBwb2ludG1lbnQgR2V0IHN1Y2Nlc3MgLS0tLSA+XCIsIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldGN1cnJlbnRBcHBvaW50bWVudCBFcnJvciAtLS0tID5cIiwgZXJyb3IpXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgICAgIGxldCByZXM9XCJjbG9zZWRcIlxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN1Ym1pdChyZXM6IHN0cmluZykge1xuICAgICAgICBsZXQgYXBwb2ludG1lbnRkYXRhID0ge1xuICAgICAgICAgICAgXCJhZGRyZXNzXCI6IHRoaXMuYWRkcmVzcyxcbiAgICAgICAgICAgIFwidGltZVwiOiB0aGlzLnRpbWUsXG4gICAgICAgICAgICBcInRvdGFsY29zdFwiOiB0aGlzLnRvdGFsY29zdCxcbiAgICAgICAgICAgIFwidG9kYXlzZmVlXCI6IHRoaXMudG9kYXlzRmVlLFxuICAgICAgICAgICAgXCJ2ZW5kb3JpZFwiOiB0aGlzLnZlbmRvcklELFxuICAgICAgICAgICAgXCJ2ZWhpY2xlaWRcIjogdGhpcy52ZWhpY2xlSUQsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wYXltZW50KClcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJBUFBPSU5UTUVOVFwiLCBKU09OLnN0cmluZ2lmeShhcHBvaW50bWVudGRhdGEpKTtcbiAgICB9XG5cblxuXG4gICAgb25BZ3JlZSgpe1xuICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tlZCBwcm9wIHZhbHVlIDogJyArIHRoaXMuQ2hlY2tCb3gubmF0aXZlRWxlbWVudC5jaGVja2VkKTsgXG4gICAgfVxuXG4gICAgcHVibGljIHBheW1lbnQoKSB7XG4gICAgICAgIGlmKHRoaXMuQ2hlY2tCb3gubmF0aXZlRWxlbWVudC5jaGVja2VkKSAgXG4gICAgICAgIHtcbiAgICAgICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKFwicGF5bWVudFwiKTtcbiAgICAgICAgfSAgIFxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgQ2hlY2sgdGhlIGFncmVlbWVudCB0byBwcm9jZWVkIGZvciBQYXltZW50XCIpXG4gICAgICAgIH0gICBcbiAgICB9XG4gICAgXG59Il19