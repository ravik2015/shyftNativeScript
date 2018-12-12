"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var addcar_services_1 = require("./addcar.services");
var ModelModalComponent = (function () {
    function ModelModalComponent(params, _page, addcarService, router, route) {
        this.params = params;
        this._page = _page;
        this.addcarService = addcarService;
        this.router = router;
        this.route = route;
        this.busy = true;
        this.modelData = [];
        this.modelData = params.context.data;
    }
    ModelModalComponent.prototype.ngOnInit = function () {
    };
    ModelModalComponent.prototype.onModelTap = function (args) {
        var tappedView = args.view, tappedModel = tappedView.bindingContext;
        console.log("Selected Model :" + args.index + " . " + JSON.stringify(tappedModel));
        this.close(tappedModel);
    };
    ModelModalComponent.prototype.close = function (res) {
        this.params.closeCallback(res);
    };
    ModelModalComponent = __decorate([
        core_1.Component({
            selector: "my-modelmodal",
            templateUrl: "modelmodal.html",
            providers: [addcar_services_1.AddcarService]
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, page_1.Page, addcar_services_1.AddcarService, router_1.Router, router_1.ActivatedRoute])
    ], ModelModalComponent);
    return ModelModalComponent;
}());
exports.ModelModalComponent = ModelModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxtb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vZGVsbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkg7QUFDM0gsbUVBQTRFO0FBQzVFLGdDQUErQjtBQUMvQiwwQ0FBeUQ7QUFFekQscURBQWtEO0FBUWxEO0lBSUksNkJBQTJCLE1BQXlCLEVBQVUsS0FBVyxFQUFVLGFBQTRCLEVBQVUsTUFBYyxFQUFVLEtBQXFCO1FBQTNJLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBRi9KLFNBQUksR0FBRyxJQUFJLENBQUM7UUFHZixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ3pDLENBQUM7SUFHRCxzQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVNLHdDQUFVLEdBQWpCLFVBQWtCLElBQUk7UUFDbEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksRUFDMUIsV0FBVyxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUM7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7UUFDbEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBRU0sbUNBQUssR0FBWixVQUFhLEdBQVc7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQXZCUSxtQkFBbUI7UUFML0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsU0FBUyxFQUFFLENBQUMsK0JBQWEsQ0FBQztTQUM3QixDQUFDO3lDQUtxQywyQkFBaUIsRUFBaUIsV0FBSSxFQUF5QiwrQkFBYSxFQUFrQixlQUFNLEVBQWlCLHVCQUFjO09BSjdKLG1CQUFtQixDQXlCL0I7SUFBRCwwQkFBQztDQUFBLEFBekJELElBeUJDO0FBekJZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkluaXQsIERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgVGVtcGxhdGVSZWYsIEluamVjdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEFjdGl2aXR5SW5kaWNhdG9yIH0gZnJvbSBcInVpL2FjdGl2aXR5LWluZGljYXRvclwiO1xuaW1wb3J0IHsgQWRkY2FyU2VydmljZSB9IGZyb20gXCIuL2FkZGNhci5zZXJ2aWNlc1wiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibXktbW9kZWxtb2RhbFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIm1vZGVsbW9kYWwuaHRtbFwiLFxuICAgIHByb3ZpZGVyczogW0FkZGNhclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGVsTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBtb2RlbERhdGE6IEFycmF5PHN0cmluZz47XG4gICAgcHVibGljIGJ1c3kgPSB0cnVlO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcywgcHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBhZGRjYXJTZXJ2aWNlOiBBZGRjYXJTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgICAgICB0aGlzLm1vZGVsRGF0YSA9IFtdOyAgIFxuICAgICAgICB0aGlzLm1vZGVsRGF0YSA9IHBhcmFtcy5jb250ZXh0LmRhdGE7ICAgICBcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIG9uTW9kZWxUYXAoYXJncyl7XG4gICAgICAgIGxldCB0YXBwZWRWaWV3ID0gYXJncy52aWV3LFxuICAgICAgICB0YXBwZWRNb2RlbCA9IHRhcHBlZFZpZXcuYmluZGluZ0NvbnRleHQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgTW9kZWwgOlwiICsgYXJncy5pbmRleCArIFwiIC4gXCIgKyBKU09OLnN0cmluZ2lmeSh0YXBwZWRNb2RlbCkpXG4gICAgICAgIHRoaXMuY2xvc2UodGFwcGVkTW9kZWwpXG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKHJlczogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socmVzKTtcbiAgICB9XG5cbn1cblxuIl19