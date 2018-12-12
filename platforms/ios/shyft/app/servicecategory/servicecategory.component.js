"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var ApplicationSettings = require("application-settings");
var selectservice_services_1 = require("../selectservice/selectservice.services");
var platform_1 = require("tns-core-modules/platform");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var ServicecategoryComponent = (function () {
    function ServicecategoryComponent(router, route, _page, modal, vcRef, selectService, routerExtension) {
        var _this = this;
        this.router = router;
        this.route = route;
        this._page = _page;
        this.modal = modal;
        this.vcRef = vcRef;
        this.selectService = selectService;
        this.routerExtension = routerExtension;
        this.SwitchState = "OFF";
        this.vendorCategories = Array();
        this.totalCost = 0;
        this.vendorServices = Array();
        this.selectedServices = Array();
        this.isItemVisible = true;
        if (this.route.queryParams) {
            this.route.queryParams.subscribe(function (params) {
                _this.vendorCategories = JSON.parse(params["vendorCategories"]);
                _this.appointmentUUID = params["appointmentUUID"];
                _this.vendorID = params["vendorID"];
                _this.vehicleID = params["vehicleID"];
                _this.deliveryfee = params["deliveryfee"];
            });
        }
        this.items = this.arrayTransform(this.vendorCategories);
    }
    ServicecategoryComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
    };
    ServicecategoryComponent.prototype.arrayTransform = function (categories) {
        var array = categories;
        array.map(function (item) {
            item.services.map(function (x) {
                console.log("here", x);
                x["state"] = false;
            });
        });
        return array;
    };
    ServicecategoryComponent.prototype.listVisible = function () {
        this.isItemVisible = !this.isItemVisible;
    };
    ServicecategoryComponent.prototype.tapped = function (args, item, i) {
        var Switch = args.object;
        var index = i;
        item.state = !item.state;
        if (Switch.checked) {
            this.SwitchState = "ON";
            this.totalCost = this.totalCost + Math.round(item.base_price);
            console.log("index is : ", index);
            this.selectedServices.push(item);
            console.log("here", JSON.stringify(this.selectedServices));
        }
        else {
            this.SwitchState = "OFF";
            var del = this.selectedServices.findIndex(function (x) { return x.id == item.id; });
            this.totalCost = this.totalCost - Math.round(item.base_price);
            this.selectedServices.splice(del, 1);
            console.log("here", JSON.stringify(this.selectedServices));
        }
    };
    ServicecategoryComponent.prototype.onBack = function () {
        this.routerExtension.backToPreviousPage();
    };
    // public vendorCategoryTap(args, index, item) {
    //     console.log("Selected Vendor is : " + item.services.length + " . " + JSON.stringify(item))
    //     if (item.services.length > 0) {
    //         item.services.map((service) => {
    //             console.log("Services : ", JSON.stringify(service))
    //             this.vendorServices.push(service)
    //         })
    //         let options = {
    //             context: { vendorServices: JSON.stringify(this.vendorServices), vendorID: this.vendorID, vehicleID: this.vehicleID, appointmentUUID: this.appointmentUUID, deliveryfee: this.deliveryfee },
    //             height: 100,
    //             fullscreen: true,
    //             viewContainerRef: this.vcRef,
    //         };
    //         this.modal.showModal(SelectServiceModalComponent, options).then(response => {
    //             console.log("modal console : ", JSON.stringify(response))
    //             response.map((item) => {
    //                 console.log("Selected Services : ", JSON.stringify(item.id))
    //                 this.selectService.serviceSelection(item.id, this.appointmentUUID)
    //                 let servArray = ApplicationSettings.getString("servicesSelections")
    //                 console.log("service length  : ", ApplicationSettings.getString("servicesSelections"))
    //             })
    //         });
    //     }
    //     else {
    //         alert("No Services Available in this Category")
    //     }
    // }
    ServicecategoryComponent.prototype.proceedPickup = function () {
        var _this = this;
        if (this.selectedServices.length > 0) {
            this.selectedServices.map(function (item) {
                console.log("Selected Services : ", JSON.stringify(item.id));
                _this.selectService.serviceSelection(item.id, _this.appointmentUUID);
            });
            ApplicationSettings.setString("services", JSON.stringify(this.selectedServices));
            ApplicationSettings.setNumber("totalcost", this.totalCost);
            var navigationExtras = {
                queryParams: {
                    "services": ApplicationSettings.getString("services"),
                    "totalcost": ApplicationSettings.getNumber("totalcost"),
                    "vendorID": this.vendorID,
                    "vehicleID": this.vehicleID,
                    "appointmentUUID": this.appointmentUUID,
                    "deliveryfee": this.deliveryfee
                }
            };
            this.router.navigate(["pickup"], navigationExtras);
        }
        else {
            if (platform_1.isIOS) {
                nativescript_fancyalert_1.TNSFancyAlert.showAnimationType =
                    SCLAlertViewShowAnimation.SlideInFromBottom;
                nativescript_fancyalert_1.TNSFancyAlert.hideAnimationType =
                    SCLAlertViewHideAnimation.SlideOutToRight;
            }
            nativescript_fancyalert_1.TNSFancyAlert.showInfo("Select Service", "Atleast Select a Single Service to Proceed.", "Ok");
            if (platform_1.isIOS) {
                this.reset();
            }
        }
    };
    ServicecategoryComponent.prototype.reset = function () {
        setTimeout(function () {
            nativescript_fancyalert_1.TNSFancyAlert.showAnimationType = undefined;
            nativescript_fancyalert_1.TNSFancyAlert.hideAnimationType =
                nativescript_fancyalert_1.TNSFancyAlert.HIDE_ANIMATION_TYPES.SlideOutToBottom;
            nativescript_fancyalert_1.TNSFancyAlert.backgroundType = undefined;
            nativescript_fancyalert_1.TNSFancyAlert.soundURL = undefined;
        }, 1000);
    };
    ServicecategoryComponent = __decorate([
        core_1.Component({
            selector: "Servicecategory",
            moduleId: module.id,
            styleUrls: ['servicecategory.css'],
            templateUrl: "./servicecategory.component.html",
            providers: [selectservice_services_1.SelectService]
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, page_1.Page, dialogs_1.ModalDialogService, core_1.ViewContainerRef, selectservice_services_1.SelectService, router_2.RouterExtensions])
    ], ServicecategoryComponent);
    return ServicecategoryComponent;
}());
exports.ServicecategoryComponent = ServicecategoryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZWNhdGVnb3J5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZpY2VjYXRlZ29yeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0c7QUFDcEcsMENBQTJFO0FBQzNFLHNEQUErRDtBQUMvRCxpREFBaUY7QUFDakYsbUVBQTZFO0FBQzdFLDBEQUE0RDtBQUM1RCxrRkFBd0U7QUFJeEUsc0RBQTZEO0FBQzdELG1FQUE2RTtBQXFCN0U7SUFhSSxrQ0FBMkIsTUFBYyxFQUFVLEtBQXFCLEVBQVUsS0FBVyxFQUFVLEtBQXlCLEVBQVUsS0FBdUIsRUFBVSxhQUE0QixFQUFVLGVBQWlDO1FBQWxQLGlCQVlDO1FBWjBCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFYM08sZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDbkIscUJBQWdCLEdBQUcsS0FBSyxFQUFFLENBQUM7UUFLM0IsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLG1CQUFjLEdBQUcsS0FBSyxFQUFFLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsS0FBSyxFQUFFLENBQUM7UUFFM0Isa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFHeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07Z0JBQ25DLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxD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QVMsQ0FBQztRQUNyQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBekpNLHdCQUF3QjtRQVBwQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDbEMsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxTQUFTLEVBQUUsQ0FBQyxzQ0FBYSxDQUFDO1NBQzdCLENBQUM7eUNBY3FDLGVBQU0sRUFBaUIsdUJBQWMsRUFBaUIsV0FBSSxFQUFpQiw0QkFBa0IsRUFBaUIsdUJBQWdCLEVBQXlCLHNDQUFhLEVBQTJCLHlCQUFnQjtPQWJ6Tyx3QkFBd0IsQ0EwSnBDO0lBQUQsK0JBQUM7Q0FBQSxBQTFKRCxJQTBKQztBQTFKWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSwgU2hvd25Nb2RhbGx5RGF0YSwgTmF2aWdhdGVkRGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTZWxlY3RTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlbGVjdHNlcnZpY2Uvc2VsZWN0c2VydmljZS5zZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBTZWxlY3RTZXJ2aWNlTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi4vc2VsZWN0c2VydmljZS9zZWxlY3RzZXJ2aWNlbW9kYWxcIjtcclxuaW1wb3J0IHsgTGFiZWwgfSBmcm9tIFwidWkvTGFiZWxcIjtcclxuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSBcInVpL3N3aXRjaFwiO1xyXG5pbXBvcnQgeyBpc0lPUywgaXNBbmRyb2lkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCwgVE5TRmFuY3lBbGVydEJ1dHRvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG5cclxuZGVjbGFyZSB2YXIgTlNNdXRhYmxlQXR0cmlidXRlZFN0cmluZzogYW55LFxyXG5OU0ZvcmVncm91bmRDb2xvckF0dHJpYnV0ZU5hbWU6IGFueSxcclxuTlNDYXNlSW5zZW5zaXRpdmVTZWFyY2g6IGFueSxcclxuTlNVbmRlcmxpbmVTdHlsZVNpbmdsZTogYW55LFxyXG5VSVZpZXc6IGFueSxcclxuQ0dSZWN0TWFrZTogYW55LFxyXG5TQ0xBbGVydFZpZXdTaG93QW5pbWF0aW9uOiBhbnksXHJcblNDTEFsZXJ0Vmlld0hpZGVBbmltYXRpb246IGFueSxcclxuU0NMQWxlcnRWaWV3QmFja2dyb3VuZDogYW55LFxyXG5OU1N0cmluZzogYW55LFxyXG5OU1VuZGVybGluZVN0eWxlQXR0cmlidXRlTmFtZTogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJTZXJ2aWNlY2F0ZWdvcnlcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzdHlsZVVybHM6IFsnc2VydmljZWNhdGVnb3J5LmNzcyddLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZXJ2aWNlY2F0ZWdvcnkuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHByb3ZpZGVyczogW1NlbGVjdFNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlY2F0ZWdvcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHB1YmxpYyBTd2l0Y2hTdGF0ZSA9IFwiT0ZGXCI7XHJcbiAgICBwcml2YXRlIHZlbmRvckNhdGVnb3JpZXMgPSBBcnJheSgpO1xyXG4gICAgcHJpdmF0ZSBhcHBvaW50bWVudFVVSUQ7XHJcbiAgICBwdWJsaWMgdmVoaWNsZUlEO1xyXG4gICAgcHVibGljIHZlbmRvcklEO1xyXG4gICAgcHVibGljIGRlbGl2ZXJ5ZmVlO1xyXG4gICAgcHJpdmF0ZSB0b3RhbENvc3QgPSAwO1xyXG4gICAgcHJpdmF0ZSB2ZW5kb3JTZXJ2aWNlcyA9IEFycmF5KCk7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRTZXJ2aWNlcyA9IEFycmF5KCk7XHJcbiAgICBwdWJsaWMgaXRlbXM6IGFueVtdO1xyXG4gICAgcHVibGljIGlzSXRlbVZpc2libGUgPSB0cnVlO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgc2VsZWN0U2VydmljZTogU2VsZWN0U2VydmljZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb246IFJvdXRlckV4dGVuc2lvbnMpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucm91dGUucXVlcnlQYXJhbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVuZG9yQ2F0ZWdvcmllcyA9IEpTT04ucGFyc2UocGFyYW1zW1widmVuZG9yQ2F0ZWdvcmllc1wiXSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRVVUlEID0gcGFyYW1zW1wiYXBwb2ludG1lbnRVVUlEXCJdXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlbmRvcklEID0gcGFyYW1zW1widmVuZG9ySURcIl1cclxuICAgICAgICAgICAgICAgIHRoaXMudmVoaWNsZUlEID0gcGFyYW1zW1widmVoaWNsZUlEXCJdXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGl2ZXJ5ZmVlID0gcGFyYW1zW1wiZGVsaXZlcnlmZWVcIl1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmFycmF5VHJhbnNmb3JtKHRoaXMudmVuZG9yQ2F0ZWdvcmllcylcclxuICAgIH1cclxuXHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhcnJheVRyYW5zZm9ybShjYXRlZ29yaWVzKSB7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gY2F0ZWdvcmllcztcclxuICAgICAgICBhcnJheS5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5zZXJ2aWNlcy5tYXAoKHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVyZVwiLCB4KVxyXG4gICAgICAgICAgICAgICAgeFtcInN0YXRlXCJdID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0VmlzaWJsZSgpIHtcclxuICAgICAgICB0aGlzLmlzSXRlbVZpc2libGUgPSAhdGhpcy5pc0l0ZW1WaXNpYmxlXHJcbiAgICB9XHJcblxyXG4gICAgdGFwcGVkKGFyZ3MsIGl0ZW0sIGkpIHsgICBcclxuICAgICAgICBsZXQgU3dpdGNoID0gPFN3aXRjaD5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgaW5kZXggPSBpO1xyXG4gICAgICAgIGl0ZW0uc3RhdGUgPSAhaXRlbS5zdGF0ZTtcclxuICAgICAgICBpZiAoU3dpdGNoLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5Td2l0Y2hTdGF0ZSA9IFwiT05cIjtcclxuICAgICAgICAgICAgdGhpcy50b3RhbENvc3QgPSB0aGlzLnRvdGFsQ29zdCArIE1hdGgucm91bmQoaXRlbS5iYXNlX3ByaWNlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbmRleCBpcyA6IFwiLCBpbmRleClcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2VzLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZXJlXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuc2VsZWN0ZWRTZXJ2aWNlcykpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5Td2l0Y2hTdGF0ZSA9IFwiT0ZGXCI7XHJcbiAgICAgICAgICAgIGxldCBkZWwgPSB0aGlzLnNlbGVjdGVkU2VydmljZXMuZmluZEluZGV4KHggPT4geC5pZD09aXRlbS5pZCk7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxDb3N0ID0gdGhpcy50b3RhbENvc3QgLSBNYXRoLnJvdW5kKGl0ZW0uYmFzZV9wcmljZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlcy5zcGxpY2UoZGVsLCAxKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlcmVcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZFNlcnZpY2VzKSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQmFjaygpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbi5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gcHVibGljIHZlbmRvckNhdGVnb3J5VGFwKGFyZ3MsIGluZGV4LCBpdGVtKSB7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBWZW5kb3IgaXMgOiBcIiArIGl0ZW0uc2VydmljZXMubGVuZ3RoICsgXCIgLiBcIiArIEpTT04uc3RyaW5naWZ5KGl0ZW0pKVxyXG5cclxuICAgIC8vICAgICBpZiAoaXRlbS5zZXJ2aWNlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAvLyAgICAgICAgIGl0ZW0uc2VydmljZXMubWFwKChzZXJ2aWNlKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlcnZpY2VzIDogXCIsIEpTT04uc3RyaW5naWZ5KHNlcnZpY2UpKVxyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy52ZW5kb3JTZXJ2aWNlcy5wdXNoKHNlcnZpY2UpXHJcbiAgICAvLyAgICAgICAgIH0pXHJcblxyXG4gICAgLy8gICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnRleHQ6IHsgdmVuZG9yU2VydmljZXM6IEpTT04uc3RyaW5naWZ5KHRoaXMudmVuZG9yU2VydmljZXMpLCB2ZW5kb3JJRDogdGhpcy52ZW5kb3JJRCwgdmVoaWNsZUlEOiB0aGlzLnZlaGljbGVJRCwgYXBwb2ludG1lbnRVVUlEOiB0aGlzLmFwcG9pbnRtZW50VVVJRCwgZGVsaXZlcnlmZWU6IHRoaXMuZGVsaXZlcnlmZWUgfSxcclxuICAgIC8vICAgICAgICAgICAgIGhlaWdodDogMTAwLFxyXG4gICAgLy8gICAgICAgICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXHJcbiAgICAvLyAgICAgICAgIH07XHJcblxyXG4gICAgLy8gICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChTZWxlY3RTZXJ2aWNlTW9kYWxDb21wb25lbnQsIG9wdGlvbnMpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb2RhbCBjb25zb2xlIDogXCIsIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSlcclxuICAgIC8vICAgICAgICAgICAgIHJlc3BvbnNlLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgU2VydmljZXMgOiBcIiwgSlNPTi5zdHJpbmdpZnkoaXRlbS5pZCkpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RTZXJ2aWNlLnNlcnZpY2VTZWxlY3Rpb24oaXRlbS5pZCwgdGhpcy5hcHBvaW50bWVudFVVSUQpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHNlcnZBcnJheSA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwic2VydmljZXNTZWxlY3Rpb25zXCIpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXJ2aWNlIGxlbmd0aCAgOiBcIiwgQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJzZXJ2aWNlc1NlbGVjdGlvbnNcIikpXHJcbiAgICAvLyAgICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZSB7XHJcbiAgICAvLyAgICAgICAgIGFsZXJ0KFwiTm8gU2VydmljZXMgQXZhaWxhYmxlIGluIHRoaXMgQ2F0ZWdvcnlcIilcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIHByb2NlZWRQaWNrdXAoKSB7XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZFNlcnZpY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZXMubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgU2VydmljZXMgOiBcIiwgSlNPTi5zdHJpbmdpZnkoaXRlbS5pZCkpXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0U2VydmljZS5zZXJ2aWNlU2VsZWN0aW9uKGl0ZW0uaWQsIHRoaXMuYXBwb2ludG1lbnRVVUlEKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJzZXJ2aWNlc1wiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlbGVjdGVkU2VydmljZXMpKVxyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0TnVtYmVyKFwidG90YWxjb3N0XCIsIHRoaXMudG90YWxDb3N0KVxyXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlc1wiOiBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInNlcnZpY2VzXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbGNvc3RcIjogQXBwbGljYXRpb25TZXR0aW5ncy5nZXROdW1iZXIoXCJ0b3RhbGNvc3RcIiksXHJcbiAgICAgICAgICAgICAgICBcInZlbmRvcklEXCI6IHRoaXMudmVuZG9ySUQsXHJcbiAgICAgICAgICAgICAgICBcInZlaGljbGVJRFwiOiB0aGlzLnZlaGljbGVJRCxcclxuICAgICAgICAgICAgICAgIFwiYXBwb2ludG1lbnRVVUlEXCI6IHRoaXMuYXBwb2ludG1lbnRVVUlELFxyXG4gICAgICAgICAgICAgICAgXCJkZWxpdmVyeWZlZVwiOiB0aGlzLmRlbGl2ZXJ5ZmVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInBpY2t1cFwiXSwgbmF2aWdhdGlvbkV4dHJhcyk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIGlmIChpc0lPUykge1xyXG4gICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dBbmltYXRpb25UeXBlID1cclxuICAgICAgICAgICAgICBTQ0xBbGVydFZpZXdTaG93QW5pbWF0aW9uLlNsaWRlSW5Gcm9tQm90dG9tO1xyXG4gICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LmhpZGVBbmltYXRpb25UeXBlID1cclxuICAgICAgICAgICAgICBTQ0xBbGVydFZpZXdIaWRlQW5pbWF0aW9uLlNsaWRlT3V0VG9SaWdodDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0luZm8oXHJcbiAgICAgICAgICAgIFwiU2VsZWN0IFNlcnZpY2VcIixcclxuICAgICAgICAgICAgYEF0bGVhc3QgU2VsZWN0IGEgU2luZ2xlIFNlcnZpY2UgdG8gUHJvY2VlZC5gLFxyXG4gICAgICAgICAgICBcIk9rXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBpZiAoaXNJT1MpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93QW5pbWF0aW9uVHlwZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgIFROU0ZhbmN5QWxlcnQuaGlkZUFuaW1hdGlvblR5cGUgPVxyXG4gICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LkhJREVfQU5JTUFUSU9OX1RZUEVTLlNsaWRlT3V0VG9Cb3R0b207XHJcbiAgICAgICAgICBUTlNGYW5jeUFsZXJ0LmJhY2tncm91bmRUeXBlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgVE5TRmFuY3lBbGVydC5zb3VuZFVSTCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgfSAgICAgICAgXHJcbn1cclxuIl19