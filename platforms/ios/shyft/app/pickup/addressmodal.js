"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var pickup_services_1 = require("./pickup.services");
var autocomplete_1 = require("nativescript-pro-ui/autocomplete");
var AddressModalComponent = (function () {
    function AddressModalComponent(pickupService, params) {
        this.pickupService = pickupService;
        this.params = params;
        this.countries = [];
        this.initDataItems();
        this.lat = params.context.latitude;
        this.long = params.context.longitude;
        this.address = params.context.search;
    }
    Object.defineProperty(AddressModalComponent.prototype, "dataItems", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    AddressModalComponent.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        for (var i = 0; i < this.countries.length; i++) {
            this._items.push(new autocomplete_1.TokenModel(this.countries[i], undefined));
        }
    };
    AddressModalComponent.prototype.onTextChange = function (args) {
        var textField = args.object;
        this.text = textField.text;
        this.places();
    };
    AddressModalComponent.prototype.places = function () {
        var _this = this;
        this._items.length = 0;
        this.pickupService.getAddress(this.long, this.lat, this.text)
            .subscribe(function (result) {
            result.predictions.map(function (item) {
                console.log(JSON.stringify(item.description));
                _this._items.push(new autocomplete_1.TokenModel(item.description, undefined));
            });
        }, function (error) {
            console.log(error);
        });
    };
    AddressModalComponent.prototype.itemTapped = function (args, text) {
        this._items.length = 0;
        var textField = this.textField.nativeElement;
        textField.dismissSoftInput();
        this.close(text.text);
    };
    AddressModalComponent.prototype.onBack = function () {
        console.log("address is ,", this.address);
        this.close(this.address);
    };
    AddressModalComponent.prototype.close = function (res) {
        this.params.closeCallback(res);
    };
    AddressModalComponent.prototype.pressed = function () {
        this.address = "";
    };
    __decorate([
        core_1.ViewChild("textField"),
        __metadata("design:type", core_1.ElementRef)
    ], AddressModalComponent.prototype, "textField", void 0);
    AddressModalComponent = __decorate([
        core_1.Component({
            selector: "my-addressmodal",
            templateUrl: "addressmodal.html",
            providers: [pickup_services_1.PickupService]
        }),
        __metadata("design:paramtypes", [pickup_services_1.PickupService, dialogs_1.ModalDialogParams])
    ], AddressModalComponent);
    return AddressModalComponent;
}());
exports.AddressModalComponent = AddressModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc21vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkcmVzc21vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDJFQUFrRztBQUNsRyxtRUFBNEU7QUFDNUUscURBQWtEO0FBSWxELGlFQUE4RDtBQVM5RDtJQVdJLCtCQUFvQixhQUE0QixFQUFVLE1BQXlCO1FBQS9ELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFSM0UsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQVNuQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDekMsQ0FBQztJQUVELHNCQUFJLDRDQUFTO2FBQWI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUVPLDZDQUFhLEdBQXJCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFlLEVBQWMsQ0FBQztRQUVoRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDO0lBQ0gsQ0FBQztJQUVJLDRDQUFZLEdBQW5CLFVBQW9CLElBQUk7UUFDcEIsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFSSxzQ0FBTSxHQUFiO1FBQUEsaUJBV0s7UUFWRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDMUQsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNoQixNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDBDQUFVLEdBQWpCLFVBQWtCLElBQUksRUFBRSxJQUFJO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUN4RCxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRUUsc0NBQU0sR0FBYjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRU0scUNBQUssR0FBWixVQUFhLEdBQVc7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVJLHVDQUFPLEdBQWQ7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0lBMURxQjtRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBWSxpQkFBVTs0REFBQztJQVRyQyxxQkFBcUI7UUFMakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsV0FBVyxFQUFFLG1CQUFtQjtZQUNoQyxTQUFTLEVBQUUsQ0FBQywrQkFBYSxDQUFDO1NBQzdCLENBQUM7eUNBWXFDLCtCQUFhLEVBQWtCLDJCQUFpQjtPQVgxRSxxQkFBcUIsQ0FvRWpDO0lBQUQsNEJBQUM7Q0FBQSxBQXBFRCxJQW9FQztBQXBFWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSwgQ2hhbmdlZERhdGEsIENoYW5nZVR5cGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgUGlja3VwU2VydmljZSB9IGZyb20gXCIuL3BpY2t1cC5zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ1aS9zd2l0Y2hcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBUb2tlbk1vZGVsIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvYXV0b2NvbXBsZXRlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibXktYWRkcmVzc21vZGFsXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiYWRkcmVzc21vZGFsLmh0bWxcIixcbiAgICBwcm92aWRlcnM6IFtQaWNrdXBTZXJ2aWNlXSAgICBcbn0pXG5leHBvcnQgY2xhc3MgQWRkcmVzc01vZGFsQ29tcG9uZW50e1xuXG4gICAgcHJpdmF0ZSBfaXRlbXM6IE9ic2VydmFibGVBcnJheTxUb2tlbk1vZGVsPjtcbiAgICBwcml2YXRlIGNvdW50cmllcyA9IFtdO1xuICAgIHB1YmxpYyBhZGRyZXNzO1xuICAgIHB1YmxpYyB0ZXh0O1xuICAgIHB1YmxpYyBsYXQ7XG4gICAgcHVibGljIGxvbmc7XG5cbiAgICBAVmlld0NoaWxkKFwidGV4dEZpZWxkXCIpIHRleHRGaWVsZDogRWxlbWVudFJlZjsgICAgXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBpY2t1cFNlcnZpY2U6IFBpY2t1cFNlcnZpY2UsIHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcywpe1xuICAgICAgICB0aGlzLmluaXREYXRhSXRlbXMoKTtcbiAgICAgICAgdGhpcy5sYXQgPSBwYXJhbXMuY29udGV4dC5sYXRpdHVkZTtcbiAgICAgICAgdGhpcy5sb25nID0gcGFyYW1zLmNvbnRleHQubG9uZ2l0dWRlOyAgICAgICBcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gcGFyYW1zLmNvbnRleHQuc2VhcmNoOyBcbiAgICB9XG5cbiAgICBnZXQgZGF0YUl0ZW1zKCk6IE9ic2VydmFibGVBcnJheTxUb2tlbk1vZGVsPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgICAgIH1cbiAgICBcbiAgICAgIHByaXZhdGUgaW5pdERhdGFJdGVtcygpIHtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFRva2VuTW9kZWw+KCk7XG4gICAgXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb3VudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLl9pdGVtcy5wdXNoKG5ldyBUb2tlbk1vZGVsKHRoaXMuY291bnRyaWVzW2ldLCB1bmRlZmluZWQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgcHVibGljIG9uVGV4dENoYW5nZShhcmdzKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0RmllbGQudGV4dDtcbiAgICAgICAgdGhpcy5wbGFjZXMoKTtcbiAgICAgIH1cblxuICAgIHB1YmxpYyBwbGFjZXMoKXtcbiAgICAgICAgdGhpcy5faXRlbXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5waWNrdXBTZXJ2aWNlLmdldEFkZHJlc3ModGhpcy5sb25nLCB0aGlzLmxhdCwgdGhpcy50ZXh0KVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0LnByZWRpY3Rpb25zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShpdGVtLmRlc2NyaXB0aW9uKSk7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHRoaXMuX2l0ZW1zLnB1c2gobmV3IFRva2VuTW9kZWwoaXRlbS5kZXNjcmlwdGlvbiwgdW5kZWZpbmVkKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICB9KTsgICAgXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcHVibGljIGl0ZW1UYXBwZWQoYXJncywgdGV4dCkge1xuICAgICAgICAgICAgdGhpcy5faXRlbXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMudGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSh0ZXh0LnRleHQpXG4gICAgICAgICAgfVxuICAgICAgICBcbiAgICAgIHB1YmxpYyBvbkJhY2soKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJhZGRyZXNzIGlzICxcIiwgdGhpcy5hZGRyZXNzKVxuICAgICAgICB0aGlzLmNsb3NlKHRoaXMuYWRkcmVzcylcbiAgICAgIH1cblxuICAgICAgcHVibGljIGNsb3NlKHJlczogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlcyk7XG4gICAgICAgIH1cblxuICAgICAgcHVibGljIHByZXNzZWQoKXtcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gXCJcIlxuICAgICAgfVxufVxuXG5cblxuXG5cblxuIl19