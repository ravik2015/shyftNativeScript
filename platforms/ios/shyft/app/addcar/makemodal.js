"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var addcar_services_1 = require("./addcar.services");
var elementRegistryModule = require("nativescript-angular/element-registry");
elementRegistryModule.registerElement("FilterSelect", function () { return require("nativescript-filter-select").FilterSelect; });
var MakeModalComponent = (function () {
    function MakeModalComponent(params, _page, addcarService, router, route) {
        this.params = params;
        this._page = _page;
        this.addcarService = addcarService;
        this.router = router;
        this.route = route;
        this.busy = true;
        this.getMakes();
        this.makedata = [];
    }
    MakeModalComponent.prototype.getMakes = function () {
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
    MakeModalComponent.prototype.ngOnInit = function () {
    };
    MakeModalComponent.prototype.onMakeTap = function (args) {
        var tappedView = args.view, tappedVehicle = tappedView.bindingContext;
        console.log("Selected Make -> " + args.index + " . " + JSON.stringify(tappedVehicle));
        this.close(tappedVehicle);
    };
    MakeModalComponent.prototype.close = function (res) {
        this.params.closeCallback(res);
    };
    MakeModalComponent = __decorate([
        core_1.Component({
            selector: "my-makemodal",
            templateUrl: "makemodal.html",
            providers: [addcar_services_1.AddcarService]
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, page_1.Page, addcar_services_1.AddcarService, router_1.Router, router_1.ActivatedRoute])
    ], MakeModalComponent);
    return MakeModalComponent;
}());
exports.MakeModalComponent = MakeModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZW1vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFrZW1vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJIO0FBQzNILG1FQUE0RTtBQUM1RSxnQ0FBK0I7QUFDL0IsMENBQXlEO0FBRXpELHFEQUFrRDtBQUVsRCw2RUFBK0U7QUFDL0UscUJBQXFCLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsWUFBWSxFQUFsRCxDQUFrRCxDQUFDLENBQUM7QUFPaEg7SUFJSSw0QkFBMkIsTUFBeUIsRUFBVSxLQUFXLEVBQVUsYUFBNEIsRUFBVSxNQUFjLEVBQVUsS0FBcUI7UUFBM0ksV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFGL0osU0FBSSxHQUFHLElBQUksQ0FBQztRQUdmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxxQ0FBUSxHQUFoQjtRQUFBLGlCQVdDO1FBVkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7YUFDM0IsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtZQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7Z0JBQ3BCLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzVCLENBQUMsQ0FBQyxDQUFBO1lBQ0YsS0FBSSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQVEsR0FBUjtJQUVBLENBQUM7SUFFTSxzQ0FBUyxHQUFoQixVQUFpQixJQUFJO1FBQ2pCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQzFCLGFBQWEsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO1FBQ3JGLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUVNLGtDQUFLLEdBQVosVUFBYSxHQUFXO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFuQ1Esa0JBQWtCO1FBTDlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLFNBQVMsRUFBRSxDQUFDLCtCQUFhLENBQUM7U0FDN0IsQ0FBQzt5Q0FLcUMsMkJBQWlCLEVBQWlCLFdBQUksRUFBeUIsK0JBQWEsRUFBa0IsZUFBTSxFQUFpQix1QkFBYztPQUo3SixrQkFBa0IsQ0FxQzlCO0lBQUQseUJBQUM7Q0FBQSxBQXJDRCxJQXFDQztBQXJDWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgT25Jbml0LCBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIFRlbXBsYXRlUmVmLCBJbmplY3QgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBBY3Rpdml0eUluZGljYXRvciB9IGZyb20gXCJ1aS9hY3Rpdml0eS1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IEFkZGNhclNlcnZpY2UgfSBmcm9tIFwiLi9hZGRjYXIuc2VydmljZXNcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyBlbGVtZW50UmVnaXN0cnlNb2R1bGUgZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5lbGVtZW50UmVnaXN0cnlNb2R1bGUucmVnaXN0ZXJFbGVtZW50KFwiRmlsdGVyU2VsZWN0XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZmlsdGVyLXNlbGVjdFwiKS5GaWx0ZXJTZWxlY3QpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJteS1tYWtlbW9kYWxcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJtYWtlbW9kYWwuaHRtbFwiLFxuICAgIHByb3ZpZGVyczogW0FkZGNhclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE1ha2VNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIG1ha2VkYXRhOiBBcnJheTxzdHJpbmc+O1xuICAgIHB1YmxpYyBidXN5ID0gdHJ1ZTtcbiAgICBcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLCBwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIGFkZGNhclNlcnZpY2U6IEFkZGNhclNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgICAgIHRoaXMuZ2V0TWFrZXMoKVxuICAgICAgICB0aGlzLm1ha2VkYXRhID0gW107ICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1ha2VzKCl7XG4gICAgICAgIHRoaXMuYWRkY2FyU2VydmljZS5tYWtlR2V0KClcbiAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvdCBNYWtlcyBkYXRhXCIpXG4gICAgICAgICAgICByZXN1bHQuUmVzdWx0cy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1ha2VkYXRhLnB1c2goaXRlbSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmJ1c3k9ZmFsc2U7ICAgICAgICAgICAgXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRNYWtlcyBFcnJvciA6IFwiLCBlcnJvcilcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICBcbiAgICB9XG4gICAgXG4gICAgcHVibGljIG9uTWFrZVRhcChhcmdzKXtcbiAgICAgICAgbGV0IHRhcHBlZFZpZXcgPSBhcmdzLnZpZXcsXG4gICAgICAgIHRhcHBlZFZlaGljbGUgPSB0YXBwZWRWaWV3LmJpbmRpbmdDb250ZXh0O1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIE1ha2UgLT4gXCIgKyBhcmdzLmluZGV4ICsgXCIgLiBcIiArIEpTT04uc3RyaW5naWZ5KHRhcHBlZFZlaGljbGUpKVxuICAgICAgICB0aGlzLmNsb3NlKHRhcHBlZFZlaGljbGUpXG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKHJlczogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socmVzKTtcbiAgICB9XG5cbn1cblxuIl19