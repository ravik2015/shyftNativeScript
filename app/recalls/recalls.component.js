"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var recalls_service_1 = require("./recalls.service");
var page_1 = require("tns-core-modules/ui/page");
var router_2 = require("nativescript-angular/router");
var RecallsComponent = (function () {
    function RecallsComponent(router, _page, recallsService, route, routerExtensions) {
        this.router = router;
        this._page = _page;
        this.recallsService = recallsService;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.datastate = true;
    }
    RecallsComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        this.getVehicle();
    };
    RecallsComponent.prototype.getVehicle = function () {
        var _this = this;
        this.recallsService.vehicle()
            .subscribe(function (result) {
            _this.datastate = false;
            console.log("Vehicle listing Get success ---->", JSON.stringify(result));
            _this.vehicle = result;
        }, function (error) {
            console.log("vehicle listing Error---->", error);
        });
    };
    RecallsComponent.prototype.itemTapped = function (args, data, index) {
        console.log(" Tapped From List------------------>" + index + JSON.stringify(data));
    };
    RecallsComponent.prototype.onBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    RecallsComponent = __decorate([
        core_1.Component({
            selector: "Recalls",
            moduleId: module.id,
            styleUrls: ['recalls.css'],
            templateUrl: "./recalls.component.html"
        }),
        __metadata("design:paramtypes", [router_1.Router, page_1.Page, recalls_service_1.RecallsService, router_1.ActivatedRoute, router_2.RouterExtensions])
    ], RecallsComponent);
    return RecallsComponent;
}());
exports.RecallsComponent = RecallsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjYWxscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWNhbGxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUEyRjtBQUMzRiwwQ0FBMkU7QUFDM0UscURBQW1EO0FBQ25ELGlEQUFpRjtBQUVqRixzREFBK0Q7QUFTL0Q7SUFJSSwwQkFBMkIsTUFBYyxFQUFVLEtBQVcsRUFBVSxjQUE4QixFQUFVLEtBQXFCLEVBQVUsZ0JBQWtDO1FBQXRKLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBRjFLLGNBQVMsR0FBRyxJQUFJLENBQUM7SUFJeEIsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxxQ0FBVSxHQUFqQjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUU7YUFDeEIsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNWLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1lBQ3hFLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzlCLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLHFDQUFVLEdBQWpCLFVBQWtCLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUdELGlDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBL0JRLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUMxQixXQUFXLEVBQUUsMEJBQTBCO1NBQzFDLENBQUM7eUNBS3FDLGVBQU0sRUFBaUIsV0FBSSxFQUEwQixnQ0FBYyxFQUFpQix1QkFBYyxFQUE0Qix5QkFBZ0I7T0FKeEssZ0JBQWdCLENBaUM1QjtJQUFELHVCQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7QUFqQ1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSZWNhbGxzU2VydmljZSB9IGZyb20gXCIuL3JlY2FsbHMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQYWdlLCBTaG93bk1vZGFsbHlEYXRhLCBOYXZpZ2F0ZWREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiUmVjYWxsc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHN0eWxlVXJsczogWydyZWNhbGxzLmNzcyddLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9yZWNhbGxzLmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIFJlY2FsbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHB1YmxpYyBkYXRhc3RhdGUgPSB0cnVlOyAgICBcclxuICAgIHB1YmxpYyB2ZWhpY2xlO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgcmVjYWxsc1NlcnZpY2U6IFJlY2FsbHNTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5nZXRWZWhpY2xlKCk7XHJcbiAgICB9ICBcclxuXHJcbiAgICBwdWJsaWMgZ2V0VmVoaWNsZSgpIHtcclxuICAgICAgICB0aGlzLnJlY2FsbHNTZXJ2aWNlLnZlaGljbGUoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFzdGF0ZSA9IGZhbHNlOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZlaGljbGUgbGlzdGluZyBHZXQgc3VjY2VzcyAtLS0tPlwiLCBKU09OLnN0cmluZ2lmeShyZXN1bHQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmVoaWNsZSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZlaGljbGUgbGlzdGluZyBFcnJvci0tLS0+XCIsIGVycm9yKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXRlbVRhcHBlZChhcmdzLCBkYXRhLCBpbmRleCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIFRhcHBlZCBGcm9tIExpc3QtLS0tLS0tLS0tLS0tLS0tLS0+XCIgKyBpbmRleCArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25CYWNrKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==