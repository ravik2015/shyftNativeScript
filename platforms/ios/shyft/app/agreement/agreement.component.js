"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page");
var AgreementComponent = (function () {
    function AgreementComponent(router, routerExtensions, _page) {
        this.router = router;
        this.routerExtensions = routerExtensions;
        this._page = _page;
        this.agreement_text = "Lorem ipsum dofglor sit amet, consectfdetur adipidfgscing elit, send dfo eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Cras pulvinar mattis nunc sed blandit libero volutpat. Vulputate ut pharetra sit amet aliquam id diam. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Nisi quis eleifend quam adipiscing. Egestas fringilla phasellus faucibus scelerisque eleifend. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Et netus et malesuada fames ac turpis egestas. Interdum varius sit amet mattis. In nisl nisi scelerisque eu ultrices. Id velit ut tortor pretium viverra suspendisse. Donec adipiscing tristique risus nec feugiat in fermentum posuere urna. Consectetur libero id faucibus nisl tincidunt eget. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Nibh tellus molestie nunc non blandit massa enim. Nisi scelerisque eu ultrices vitae auctor. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Laoreet non curabitur gravida arcu ac tortor dignissim convallis. Faucibus in ornare quam viverra. Morbi leo urna molestie at elementum eu facilisis sed. Nullam ac tortor vitae purus faucibus. Cursus risus at ultrices mi tempus. Turpis tincidunt id aliquet risus feugiat in ante metus. Eget arcu dictum varius duis at consectetur. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Adipiscing enim eu turpis egestas pretium. Nam libero justo laoreet sit amet cursus sit. Tempus iaculis urna id volutpat. Suscipit adipiscing bibendum est ultricies integer quis. Mattis nunc sed blandit libero volutpat sed cras ornare. In nibh mauris cursus mattis molestie a iaculis. Vivamus arcu felis bibendum ut tristique et egestas quis ipsum.";
    }
    AgreementComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
    };
    AgreementComponent.prototype.onTap = function () {
        this.routerExtensions.navigate(["/addcustomer"], {
            transition: {
                name: "slideLeft",
            }
        });
    };
    AgreementComponent = __decorate([
        core_1.Component({
            selector: "Agreement",
            moduleId: module.id,
            styleUrls: ['agreement.css'],
            templateUrl: "./agreement.component.html"
        }),
        __metadata("design:paramtypes", [router_1.Router, router_2.RouterExtensions, page_1.Page])
    ], AgreementComponent);
    return AgreementComponent;
}());
exports.AgreementComponent = AgreementComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdyZWVtZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFncmVlbWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Y7QUFDbEYsMENBQXlDO0FBQ3pDLHNEQUErRDtBQUMvRCxpREFBaUY7QUFRakY7SUFLSSw0QkFBMkIsTUFBYyxFQUFVLGdCQUFrQyxFQUFVLEtBQVc7UUFBL0UsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBSG5HLG1CQUFjLEdBQUcsbTlEQUFtOUQsQ0FBQTtJQUszK0QsQ0FBQztJQUdELHFDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFFdEMsQ0FBQztJQUdELGtDQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDN0MsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxXQUFXO2FBQ3BCO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXRCUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDNUIsV0FBVyxFQUFFLDRCQUE0QjtTQUM1QyxDQUFDO3lDQU1xQyxlQUFNLEVBQTRCLHlCQUFnQixFQUFpQixXQUFJO09BTGpHLGtCQUFrQixDQXdCOUI7SUFBRCx5QkFBQztDQUFBLEFBeEJELElBd0JDO0FBeEJZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UsIFNob3duTW9kYWxseURhdGEsIE5hdmlnYXRlZERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIkFncmVlbWVudFwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHN0eWxlVXJsczogWydhZ3JlZW1lbnQuY3NzJ10sXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FncmVlbWVudC5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ3JlZW1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHB1YmxpYyBhZ3JlZW1lbnRfdGV4dCA9IFwiTG9yZW0gaXBzdW0gZG9mZ2xvciBzaXQgYW1ldCwgY29uc2VjdGZkZXR1ciBhZGlwaWRmZ3NjaW5nIGVsaXQsIHNlbmQgZGZvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuIFBlbGxlbnRlc3F1ZSBlbGl0IHVsbGFtY29ycGVyIGRpZ25pc3NpbSBjcmFzIHRpbmNpZHVudCBsb2JvcnRpcyBmZXVnaWF0IHZpdmFtdXMuIEVnZXN0YXMgcHJldGl1bSBhZW5lYW4gcGhhcmV0cmEgbWFnbmEgYWMgcGxhY2VyYXQgdmVzdGlidWx1bSBsZWN0dXMuIENyYXMgcHVsdmluYXIgbWF0dGlzIG51bmMgc2VkIGJsYW5kaXQgbGliZXJvIHZvbHV0cGF0LiBWdWxwdXRhdGUgdXQgcGhhcmV0cmEgc2l0IGFtZXQgYWxpcXVhbSBpZCBkaWFtLiBFdSBmZXVnaWF0IHByZXRpdW0gbmliaCBpcHN1bSBjb25zZXF1YXQgbmlzbCB2ZWwgcHJldGl1bS4gTmlzaSBxdWlzIGVsZWlmZW5kIHF1YW0gYWRpcGlzY2luZy4gRWdlc3RhcyBmcmluZ2lsbGEgcGhhc2VsbHVzIGZhdWNpYnVzIHNjZWxlcmlzcXVlIGVsZWlmZW5kLiBUdXJwaXMgbnVuYyBlZ2V0IGxvcmVtIGRvbG9yIHNlZCB2aXZlcnJhIGlwc3VtIG51bmMuIEV0IG5ldHVzIGV0IG1hbGVzdWFkYSBmYW1lcyBhYyB0dXJwaXMgZWdlc3Rhcy4gSW50ZXJkdW0gdmFyaXVzIHNpdCBhbWV0IG1hdHRpcy4gSW4gbmlzbCBuaXNpIHNjZWxlcmlzcXVlIGV1IHVsdHJpY2VzLiBJZCB2ZWxpdCB1dCB0b3J0b3IgcHJldGl1bSB2aXZlcnJhIHN1c3BlbmRpc3NlLiBEb25lYyBhZGlwaXNjaW5nIHRyaXN0aXF1ZSByaXN1cyBuZWMgZmV1Z2lhdCBpbiBmZXJtZW50dW0gcG9zdWVyZSB1cm5hLiBDb25zZWN0ZXR1ciBsaWJlcm8gaWQgZmF1Y2lidXMgbmlzbCB0aW5jaWR1bnQgZWdldC4gQmliZW5kdW0gdXQgdHJpc3RpcXVlIGV0IGVnZXN0YXMgcXVpcyBpcHN1bSBzdXNwZW5kaXNzZSB1bHRyaWNlcy4gTmlzaSBxdWlzIGVsZWlmZW5kIHF1YW0gYWRpcGlzY2luZyB2aXRhZSBwcm9pbiBzYWdpdHRpcyBuaXNsIHJob25jdXMuIE5pYmggdGVsbHVzIG1vbGVzdGllIG51bmMgbm9uIGJsYW5kaXQgbWFzc2EgZW5pbS4gTmlzaSBzY2VsZXJpc3F1ZSBldSB1bHRyaWNlcyB2aXRhZSBhdWN0b3IuIEJpYmVuZHVtIHV0IHRyaXN0aXF1ZSBldCBlZ2VzdGFzIHF1aXMgaXBzdW0gc3VzcGVuZGlzc2UgdWx0cmljZXMgZ3JhdmlkYS4gRWxlaWZlbmQgcXVhbSBhZGlwaXNjaW5nIHZpdGFlIHByb2luIHNhZ2l0dGlzIG5pc2wgcmhvbmN1cyBtYXR0aXMuIExhb3JlZXQgbm9uIGN1cmFiaXR1ciBncmF2aWRhIGFyY3UgYWMgdG9ydG9yIGRpZ25pc3NpbSBjb252YWxsaXMuIEZhdWNpYnVzIGluIG9ybmFyZSBxdWFtIHZpdmVycmEuIE1vcmJpIGxlbyB1cm5hIG1vbGVzdGllIGF0IGVsZW1lbnR1bSBldSBmYWNpbGlzaXMgc2VkLiBOdWxsYW0gYWMgdG9ydG9yIHZpdGFlIHB1cnVzIGZhdWNpYnVzLiBDdXJzdXMgcmlzdXMgYXQgdWx0cmljZXMgbWkgdGVtcHVzLiBUdXJwaXMgdGluY2lkdW50IGlkIGFsaXF1ZXQgcmlzdXMgZmV1Z2lhdCBpbiBhbnRlIG1ldHVzLiBFZ2V0IGFyY3UgZGljdHVtIHZhcml1cyBkdWlzIGF0IGNvbnNlY3RldHVyLiBNYWxlc3VhZGEgZmFtZXMgYWMgdHVycGlzIGVnZXN0YXMgaW50ZWdlciBlZ2V0IGFsaXF1ZXQgbmliaCBwcmFlc2VudC4gQWRpcGlzY2luZyBlbmltIGV1IHR1cnBpcyBlZ2VzdGFzIHByZXRpdW0uIE5hbSBsaWJlcm8ganVzdG8gbGFvcmVldCBzaXQgYW1ldCBjdXJzdXMgc2l0LiBUZW1wdXMgaWFjdWxpcyB1cm5hIGlkIHZvbHV0cGF0LiBTdXNjaXBpdCBhZGlwaXNjaW5nIGJpYmVuZHVtIGVzdCB1bHRyaWNpZXMgaW50ZWdlciBxdWlzLiBNYXR0aXMgbnVuYyBzZWQgYmxhbmRpdCBsaWJlcm8gdm9sdXRwYXQgc2VkIGNyYXMgb3JuYXJlLiBJbiBuaWJoIG1hdXJpcyBjdXJzdXMgbWF0dGlzIG1vbGVzdGllIGEgaWFjdWxpcy4gVml2YW11cyBhcmN1IGZlbGlzIGJpYmVuZHVtIHV0IHRyaXN0aXF1ZSBldCBlZ2VzdGFzIHF1aXMgaXBzdW0uXCJcclxuXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBfcGFnZTogUGFnZSkge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgb25UYXAoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9hZGRjdXN0b21lclwiXSwge1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlTGVmdFwiLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==