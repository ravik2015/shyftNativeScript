"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var addcar_services_1 = require("./addcar.services");
var AddcarModalComponent = (function () {
    function AddcarModalComponent(params, _page, addcarService, router, route) {
        this.params = params;
        this._page = _page;
        this.addcarService = addcarService;
        this.router = router;
        this.route = route;
        this.busy = true;
        this.getMakes();
        this.makedata = [];
    }
    AddcarModalComponent.prototype.getMakes = function () {
        var _this = this;
        this.addcarService.makeGet()
            .subscribe(function (result) {
            console.log("Got Makes data");
            result.Results.map(function (item) {
                _this.makedata.push(item);
            });
            _this.busy = false;
        }, function (error) {
            console.log("getMakes Error : ", error);
        });
    };
    AddcarModalComponent.prototype.ngOnInit = function () {
    };
    AddcarModalComponent.prototype.onMakeTap = function (args) {
        var tappedView = args.view, tappedVehicle = tappedView.bindingContext;
        console.log("Selected Make : " + args.index + " . " + JSON.stringify(tappedVehicle));
        this.close(tappedVehicle);
    };
    AddcarModalComponent.prototype.close = function (res) {
        this.params.closeCallback(res);
    };
    AddcarModalComponent = __decorate([
        core_1.Component({
            selector: "my-addcarmodal",
            templateUrl: "addcarmodal.html",
            providers: [addcar_services_1.AddcarService]
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, page_1.Page, addcar_services_1.AddcarService, router_1.Router, router_1.ActivatedRoute])
    ], AddcarModalComponent);
    return AddcarModalComponent;
}());
exports.AddcarModalComponent = AddcarModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkY2FybW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRjYXJtb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEySDtBQUMzSCxtRUFBNEU7QUFDNUUsZ0NBQStCO0FBQy9CLDBDQUF5RDtBQUV6RCxxREFBa0Q7QUFRbEQ7SUFJSSw4QkFBMkIsTUFBeUIsRUFBVSxLQUFXLEVBQVUsYUFBNEIsRUFBVSxNQUFjLEVBQVUsS0FBcUI7UUFBM0ksV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFGL0osU0FBSSxHQUFHLElBQUksQ0FBQztRQUdmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyx1Q0FBUSxHQUFoQjtRQUFBLGlCQVdDO1FBVkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7YUFDM0IsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtZQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7Z0JBQ3BCLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzVCLENBQUMsQ0FBQyxDQUFBO1lBQ0YsS0FBSSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsdUNBQVEsR0FBUjtJQUVBLENBQUM7SUFFTSx3Q0FBUyxHQUFoQixVQUFpQixJQUFJO1FBQ2pCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQzFCLGFBQWEsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO1FBQ3BGLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUVNLG9DQUFLLEdBQVosVUFBYSxHQUFXO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFuQ1Esb0JBQW9CO1FBTGhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsU0FBUyxFQUFFLENBQUMsK0JBQWEsQ0FBQztTQUM3QixDQUFDO3lDQUtxQywyQkFBaUIsRUFBaUIsV0FBSSxFQUF5QiwrQkFBYSxFQUFrQixlQUFNLEVBQWlCLHVCQUFjO09BSjdKLG9CQUFvQixDQXFDaEM7SUFBRCwyQkFBQztDQUFBLEFBckNELElBcUNDO0FBckNZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkluaXQsIERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgVGVtcGxhdGVSZWYsIEluamVjdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEFjdGl2aXR5SW5kaWNhdG9yIH0gZnJvbSBcInVpL2FjdGl2aXR5LWluZGljYXRvclwiO1xuaW1wb3J0IHsgQWRkY2FyU2VydmljZSB9IGZyb20gXCIuL2FkZGNhci5zZXJ2aWNlc1wiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibXktYWRkY2FybW9kYWxcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJhZGRjYXJtb2RhbC5odG1sXCIsXG4gICAgcHJvdmlkZXJzOiBbQWRkY2FyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgQWRkY2FyTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBtYWtlZGF0YTogQXJyYXk8c3RyaW5nPjtcbiAgICBwdWJsaWMgYnVzeSA9IHRydWU7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLCBwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIGFkZGNhclNlcnZpY2U6IEFkZGNhclNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgICAgIHRoaXMuZ2V0TWFrZXMoKVxuICAgICAgICB0aGlzLm1ha2VkYXRhID0gW107ICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1ha2VzKCl7XG4gICAgICAgIHRoaXMuYWRkY2FyU2VydmljZS5tYWtlR2V0KClcbiAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvdCBNYWtlcyBkYXRhXCIpXG4gICAgICAgICAgICByZXN1bHQuUmVzdWx0cy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1ha2VkYXRhLnB1c2goaXRlbSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmJ1c3k9ZmFsc2U7ICAgICAgICAgICAgXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRNYWtlcyBFcnJvciA6IFwiLCBlcnJvcilcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgb25NYWtlVGFwKGFyZ3Mpe1xuICAgICAgICBsZXQgdGFwcGVkVmlldyA9IGFyZ3MudmlldyxcbiAgICAgICAgdGFwcGVkVmVoaWNsZSA9IHRhcHBlZFZpZXcuYmluZGluZ0NvbnRleHQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgTWFrZSA6IFwiICsgYXJncy5pbmRleCArIFwiIC4gXCIgKyBKU09OLnN0cmluZ2lmeSh0YXBwZWRWZWhpY2xlKSlcbiAgICAgICAgdGhpcy5jbG9zZSh0YXBwZWRWZWhpY2xlKVxuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZShyZXM6IHN0cmluZykge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlcyk7XG4gICAgfVxuXG59XG5cbiJdfQ==