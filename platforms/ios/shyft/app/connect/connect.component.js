"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var connect_services_1 = require("./connect.services");
var nativescript_mqtt_1 = require("nativescript-mqtt");
var page_1 = require("ui/page");
var MQTT_TOPIC = 'futuredms/shyft-auto-dashboard';
var ConnectComponent = (function () {
    function ConnectComponent(router, _page, connectService, route, routerExtensions) {
        this.router = router;
        this._page = _page;
        this.connectService = connectService;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.route.queryParams.subscribe(function (params) {
        });
    }
    ConnectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._page.actionBarHidden = true;
        this.connectService.signature().subscribe(function (signedUrl) {
            console.log("Signature Service : ", signedUrl.url);
            _this.url = signedUrl.url;
            var mqtt_clientOptions = {
                host: _this.url,
                port: 433,
                path: "futuredms/shyft-auto-dashboard",
                useSSL: false
            };
            _this.client = new nativescript_mqtt_1.MQTTClient(mqtt_clientOptions);
            _this.setupHandlers();
        });
    };
    ConnectComponent.prototype.connect = function () {
        console.log("here in connect ");
        try {
            this.client.connect('username', 'password');
            // this.client.connect(this.url, { protocolId: 'MQTT',  protocolVersion: 3});
            this.setupHandlers();
        }
        catch (e) {
            console.log("Caught error: " + e);
        }
    };
    ConnectComponent.prototype.setupHandlers = function () {
        console.log("here in setupHandlers ");
        this.client.onConnectionFailure.on(function (err) {
            console.log("Connection failed: " + err);
        });
        this.client.onConnectionSuccess.on(function () {
            console.log("Connected successfully!");
            // this.subscribe();
        });
        this.client.onConnectionLost.on(function (err) {
            console.log("Connection lost: " + err);
        });
        this.client.onMessageArrived.on(function (message) {
            console.log("Message received: " + message.payload);
        });
    };
    ConnectComponent.prototype.subscribe = function () {
        try {
            this.client.subscribe(MQTT_TOPIC);
        }
        catch (e) {
            console.log("Caught error: " + e);
        }
    };
    ConnectComponent.prototype.onBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    ConnectComponent = __decorate([
        core_1.Component({
            selector: "Connect",
            moduleId: module.id,
            styleUrls: ['connect.css'],
            templateUrl: "./connect.component.html",
            providers: [connect_services_1.ConnectService]
        }),
        __metadata("design:paramtypes", [router_1.Router, page_1.Page, connect_services_1.ConnectService, router_1.ActivatedRoute, router_2.RouterExtensions])
    ], ConnectComponent);
    return ConnectComponent;
}());
exports.ConnectComponent = ConnectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRiwwQ0FBMkU7QUFDM0Usc0RBQStEO0FBRS9ELHVEQUFvRDtBQUNwRCx1REFBK0M7QUFHL0MsZ0NBQStCO0FBRy9CLElBQU0sVUFBVSxHQUFHLGdDQUFnQyxDQUFDO0FBVXBEO0lBSUksMEJBQTJCLE1BQWMsRUFBVSxLQUFXLEVBQVUsY0FBOEIsRUFBVSxLQUFxQixFQUFVLGdCQUFrQztRQUF0SixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM3SyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1FBRXZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLFNBQVM7WUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDbEQsS0FBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO1lBQ3pCLElBQU0sa0JBQWtCLEdBQVE7Z0JBQzVCLElBQUksRUFBRSxLQUFJLENBQUMsR0FBRztnQkFDZCxJQUFJLEVBQUUsR0FBRztnQkFDVCxJQUFJLEVBQUUsZ0NBQWdDO2dCQUN0QyxNQUFNLEVBQUUsS0FBSzthQUNoQixDQUFDO1lBQ0YsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDhCQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtZQUNoRCxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsa0NBQU8sR0FBUDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUMvQixJQUFHLENBQUM7WUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUMsVUFBVSxDQUFDLENBQUM7WUFFM0MsNkVBQTZFO1lBQzdFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUN4QixDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQztJQUNMLENBQUM7SUFFRCx3Q0FBYSxHQUFiO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1FBRXJDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLFVBQUMsR0FBRztZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3ZDLG9CQUFvQjtRQUN4QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFVBQUMsR0FBRztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsVUFBQyxPQUFnQjtZQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCxvQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7SUFDTCxDQUFDO0lBR0QsaUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUF6RVEsZ0JBQWdCO1FBUjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQzFCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMsaUNBQWMsQ0FBQztTQUM5QixDQUFDO3lDQU1xQyxlQUFNLEVBQWlCLFdBQUksRUFBMEIsaUNBQWMsRUFBaUIsdUJBQWMsRUFBNEIseUJBQWdCO09BSnhLLGdCQUFnQixDQTJFNUI7SUFBRCx1QkFBQztDQUFBLEFBM0VELElBMkVDO0FBM0VZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgQ29ubmVjdFNlcnZpY2UgfSBmcm9tIFwiLi9jb25uZWN0LnNlcnZpY2VzXCI7XHJcbmltcG9ydCB7IE1RVFRDbGllbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1xdHRcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbXF0dC9jb21tb25cIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFVVSUQgfSBmcm9tICdhbmd1bGFyMi11dWlkJztcclxuXHJcbmNvbnN0IE1RVFRfVE9QSUMgPSAnZnV0dXJlZG1zL3NoeWZ0LWF1dG8tZGFzaGJvYXJkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiQ29ubmVjdFwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHN0eWxlVXJsczogWydjb25uZWN0LmNzcyddLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jb25uZWN0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBwcm92aWRlcnM6IFtDb25uZWN0U2VydmljZV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25uZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGNsaWVudDtcclxuICAgIHVybDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBjb25uZWN0U2VydmljZTogQ29ubmVjdFNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcclxuICAgICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7ICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbm5lY3RTZXJ2aWNlLnNpZ25hdHVyZSgpLnN1YnNjcmliZShzaWduZWRVcmwgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNpZ25hdHVyZSBTZXJ2aWNlIDogXCIsIHNpZ25lZFVybC51cmwpXHJcbiAgICAgICAgICAgIHRoaXMudXJsID0gc2lnbmVkVXJsLnVybDtcclxuICAgICAgICAgICAgY29uc3QgbXF0dF9jbGllbnRPcHRpb25zOiBhbnkgPSB7XHJcbiAgICAgICAgICAgICAgICBob3N0OiB0aGlzLnVybCxcclxuICAgICAgICAgICAgICAgIHBvcnQ6IDQzMyxcclxuICAgICAgICAgICAgICAgIHBhdGg6IFwiZnV0dXJlZG1zL3NoeWZ0LWF1dG8tZGFzaGJvYXJkXCIsXHJcbiAgICAgICAgICAgICAgICB1c2VTU0w6IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gbmV3IE1RVFRDbGllbnQobXF0dF9jbGllbnRPcHRpb25zKVxyXG4gICAgICAgICAgICB0aGlzLnNldHVwSGFuZGxlcnMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJoZXJlIGluIGNvbm5lY3QgXCIpXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5jb25uZWN0KCd1c2VybmFtZScsJ3Bhc3N3b3JkJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB0aGlzLmNsaWVudC5jb25uZWN0KHRoaXMudXJsLCB7IHByb3RvY29sSWQ6ICdNUVRUJywgIHByb3RvY29sVmVyc2lvbjogM30pO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwSGFuZGxlcnMoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhdWdodCBlcnJvcjogXCIgKyBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXBIYW5kbGVycygpIDogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJoZXJlIGluIHNldHVwSGFuZGxlcnMgXCIpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jbGllbnQub25Db25uZWN0aW9uRmFpbHVyZS5vbigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBmYWlsZWQ6IFwiICsgZXJyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jbGllbnQub25Db25uZWN0aW9uU3VjY2Vzcy5vbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHN1Y2Nlc3NmdWxseSFcIik7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xpZW50Lm9uQ29ubmVjdGlvbkxvc3Qub24oKGVycikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gbG9zdDogXCIgKyBlcnIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNsaWVudC5vbk1lc3NhZ2VBcnJpdmVkLm9uKChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZSByZWNlaXZlZDogXCIgKyBtZXNzYWdlLnBheWxvYWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdWJzY3JpYmUoKSA6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LnN1YnNjcmliZShNUVRUX1RPUElDKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYXVnaHQgZXJyb3I6IFwiICsgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkJhY2soKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=