"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var router_1 = require("@angular/router");
var ApplicationSettings = require("application-settings");
var SelectServiceModalComponent = (function () {
    function SelectServiceModalComponent(params, router, route) {
        this.params = params;
        this.router = router;
        this.route = route;
        this.SwitchState = "OFF";
        this.totalCost = ApplicationSettings.getNumber("totalcost");
        this.selectedServices = Array();
        this.state = false;
        this.frameworks = Array();
        this.frameworks = JSON.parse(params.context.vendorServices);
        this.vendorID = params.context.vendorID;
        this.vehicleID = params.context.vehicleID;
        this.appointmentUUID = params.context.appointmentUUID;
        this.deliveryfee = params.context.deliveryfee;
        console.log("constructor service : ", this.totalCost);
    }
    SelectServiceModalComponent.prototype.close = function (res) {
        this.params.closeCallback(this.totalCost);
    };
    SelectServiceModalComponent.prototype.submit = function (res) {
        ApplicationSettings.setString("services", JSON.stringify(this.selectedServices));
        ApplicationSettings.setNumber("totalcost", this.totalCost);
        // let navigationExtras: NavigationExtras = {
        //     queryParams: {
        //         "services": JSON.stringify(this.selectedServices),
        //         "totalcost": this.totalCost,
        //         "vendorID": this.vendorID,
        //         "vehicleID": this.vehicleID,
        //         "appointmentUUID": this.appointmentUUID,
        //         "deliveryfee": this.deliveryfee
        //     }
        // };
        this.params.closeCallback(this.selectedServices);
        // this.router.navigate(["pickup"], navigationExtras);
    };
    SelectServiceModalComponent.prototype.onCheck = function (args, item, index) {
        var Switch = args.object;
        if (Switch.checked) {
            this.SwitchState = "ON";
            this.totalCost = this.totalCost + Math.round(item.base_price);
            this.selectedServices.push(item);
        }
        else {
            this.SwitchState = "OFF";
            this.totalCost = this.totalCost - Math.round(item.base_price);
            console.log("index is : ", index);
            this.selectedServices.splice(index, 1);
        }
    };
    __decorate([
        core_1.ViewChild("CB1"),
        __metadata("design:type", core_1.ElementRef)
    ], SelectServiceModalComponent.prototype, "CheckBox", void 0);
    SelectServiceModalComponent = __decorate([
        core_1.Component({
            selector: "my-modal",
            templateUrl: "selectservicemodal.html",
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, router_1.Router, router_1.ActivatedRoute])
    ], SelectServiceModalComponent);
    return SelectServiceModalComponent;
}());
exports.SelectServiceModalComponent = SelectServiceModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0c2VydmljZW1vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0c2VydmljZW1vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBQ2pFLG1FQUE0RTtBQUM1RSwwQ0FBMkU7QUFFM0UsMERBQTREO0FBTzVEO0lBaUJJLHFDQUEyQixNQUF5QixFQUFVLE1BQWMsRUFBVSxLQUFxQjtRQUFoRixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQWRwRyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUksbUJBQW1CLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBS3hELHFCQUFnQixHQUFHLEtBQUssRUFBRSxDQUFDO1FBQzNCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFNYixlQUFVLEdBQUcsS0FBSyxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQzFDLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0lBRU0sMkNBQUssR0FBWixVQUFhLEdBQVc7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSw0Q0FBTSxHQUFiLFVBQWMsR0FBVztRQUNyQixtQkFBbUIsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQTtRQUNoRixtQkFBbUIsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUMxRCw2Q0FBNkM7UUFDN0MscUJBQXFCO1FBQ3JCLDZEQUE2RDtRQUM3RCx1Q0FBdUM7UUFDdkMscUNBQXFDO1FBQ3JDLHVDQUF1QztRQUN2QyxtREFBbUQ7UUFDbkQsMENBQTBDO1FBQzFDLFFBQVE7UUFDUixLQUFLO1FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakQsc0RBQXNEO0lBQzFELENBQUM7SUFFTSw2Q0FBTyxHQUFkLFVBQWUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLO1FBQzVCLElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDcEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3pDLENBQUM7SUFDTCxDQUFDO0lBOUNpQjtRQUFqQixnQkFBUyxDQUFDLEtBQUssQ0FBQztrQ0FBVyxpQkFBVTtpRUFBQztJQWI5QiwyQkFBMkI7UUFKdkMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSx5QkFBeUI7U0FDekMsQ0FBQzt5Q0FrQnFDLDJCQUFpQixFQUFrQixlQUFNLEVBQWlCLHVCQUFjO09BakJsRywyQkFBMkIsQ0E2RHZDO0lBQUQsa0NBQUM7Q0FBQSxBQTdERCxJQTZEQztBQTdEWSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBTd2l0Y2ggfSBmcm9tIFwidWkvc3dpdGNoXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm15LW1vZGFsXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwic2VsZWN0c2VydmljZW1vZGFsLmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0U2VydmljZU1vZGFsQ29tcG9uZW50IHtcblxuXG4gICAgcHVibGljIFN3aXRjaFN0YXRlID0gXCJPRkZcIjtcbiAgICBwdWJsaWMgdG90YWxDb3N0ID0gIEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0TnVtYmVyKFwidG90YWxjb3N0XCIpO1xuICAgIHB1YmxpYyBhcHBvaW50bWVudFVVSUQ7XG4gICAgcHVibGljIHZlbmRvcklEO1xuICAgIHB1YmxpYyB2ZWhpY2xlSUQ7XG4gICAgcHVibGljIHN0YXR1czogQm9vbGVhbjtcbiAgICBwdWJsaWMgc2VsZWN0ZWRTZXJ2aWNlcyA9IEFycmF5KCk7XG4gICAgcHVibGljIHN0YXRlID0gZmFsc2U7XG4gICAgcHVibGljIGRlbGl2ZXJ5ZmVlO1xuXG4gICAgQFZpZXdDaGlsZChcIkNCMVwiKSBDaGVja0JveDogRWxlbWVudFJlZjtcblxuXG4gICAgcHJpdmF0ZSBmcmFtZXdvcmtzID0gQXJyYXkoKTtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkgeyAgICAgIFxuICAgICAgICB0aGlzLmZyYW1ld29ya3MgPSBKU09OLnBhcnNlKHBhcmFtcy5jb250ZXh0LnZlbmRvclNlcnZpY2VzKTtcbiAgICAgICAgdGhpcy52ZW5kb3JJRCA9IHBhcmFtcy5jb250ZXh0LnZlbmRvcklEO1xuICAgICAgICB0aGlzLnZlaGljbGVJRCA9IHBhcmFtcy5jb250ZXh0LnZlaGljbGVJRDtcbiAgICAgICAgdGhpcy5hcHBvaW50bWVudFVVSUQgPSBwYXJhbXMuY29udGV4dC5hcHBvaW50bWVudFVVSUQ7XG4gICAgICAgIHRoaXMuZGVsaXZlcnlmZWUgPSBwYXJhbXMuY29udGV4dC5kZWxpdmVyeWZlZTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25zdHJ1Y3RvciBzZXJ2aWNlIDogXCIsIHRoaXMudG90YWxDb3N0KVxuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZShyZXM6IHN0cmluZykge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHRoaXMudG90YWxDb3N0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3VibWl0KHJlczogc3RyaW5nKSB7XG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwic2VydmljZXNcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZFNlcnZpY2VzKSlcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXROdW1iZXIoXCJ0b3RhbGNvc3RcIiwgdGhpcy50b3RhbENvc3QpXG4gICAgICAgIC8vIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAvLyAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgLy8gICAgICAgICBcInNlcnZpY2VzXCI6IEpTT04uc3RyaW5naWZ5KHRoaXMuc2VsZWN0ZWRTZXJ2aWNlcyksXG4gICAgICAgIC8vICAgICAgICAgXCJ0b3RhbGNvc3RcIjogdGhpcy50b3RhbENvc3QsXG4gICAgICAgIC8vICAgICAgICAgXCJ2ZW5kb3JJRFwiOiB0aGlzLnZlbmRvcklELFxuICAgICAgICAvLyAgICAgICAgIFwidmVoaWNsZUlEXCI6IHRoaXMudmVoaWNsZUlELFxuICAgICAgICAvLyAgICAgICAgIFwiYXBwb2ludG1lbnRVVUlEXCI6IHRoaXMuYXBwb2ludG1lbnRVVUlELFxuICAgICAgICAvLyAgICAgICAgIFwiZGVsaXZlcnlmZWVcIjogdGhpcy5kZWxpdmVyeWZlZVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9O1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWRTZXJ2aWNlcyk7XG4gICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInBpY2t1cFwiXSwgbmF2aWdhdGlvbkV4dHJhcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2hlY2soYXJncywgaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgbGV0IFN3aXRjaCA9IDxTd2l0Y2g+YXJncy5vYmplY3Q7XG4gICAgICAgIGlmIChTd2l0Y2guY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5Td2l0Y2hTdGF0ZSA9IFwiT05cIjtcbiAgICAgICAgICAgIHRoaXMudG90YWxDb3N0ID0gdGhpcy50b3RhbENvc3QgKyBNYXRoLnJvdW5kKGl0ZW0uYmFzZV9wcmljZSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZXMucHVzaChpdGVtKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5Td2l0Y2hTdGF0ZSA9IFwiT0ZGXCI7XG4gICAgICAgICAgICB0aGlzLnRvdGFsQ29zdCA9IHRoaXMudG90YWxDb3N0IC0gTWF0aC5yb3VuZChpdGVtLmJhc2VfcHJpY2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbmRleCBpcyA6IFwiLCBpbmRleClcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlcy5zcGxpY2UoaW5kZXgsMSlcbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==