"use strict";
// import { Component, ElementRef, ViewChild, OnInit, Directive, ViewContainerRef, TemplateRef, Inject } from "@angular/core";
// import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
// import { Page } from "ui/page";
// import { Router, ActivatedRoute } from "@angular/router";
// import { Switch } from "ui/switch";
// import { WebView, LoadEventData } from "ui/web-view";
// import { ActivityIndicator } from "ui/activity-indicator";
// import * as ApplicationSettings from "application-settings";
// var http = require("http");
Object.defineProperty(exports, "__esModule", { value: true });
// @Component({
//     selector: "my-signupmodal",
//     templateUrl: "signupmodal.html",
// })
// export class SignupModalComponent implements OnInit {
//     public activityIndicator: ActivityIndicator;
//     public busy = true;
//     @ViewChild('webView') webView: ElementRef;
//     public webViewSrc: string = "https://shyft-auto.auth.us-east-1.amazoncognito.com/signup?response_type=code&client_id=4qf3c6o1kvo4ufph9jfujamiug&redirect_uri=shyftauto://auth-callback";
//     @ViewChild("myWebView") webViewRef: ElementRef;
//     @ViewChild("activityIndicator") ac: ElementRef;
//     public constructor(private params: ModalDialogParams, private _page: Page, private router: Router, private route: ActivatedRoute) {
//     }
//     ngOnInit(): void {
//         let webView: WebView = this.webView.nativeElement;
//         webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
//             let message;
//             if (!args.error) {
//                 console.log("Success from webView :", args.url)     
//                 let url = "www."+args.url                 
//                 let code = args.url.substr((args.url.search("code") + 5))
//                 if(url.search("code=") > 0){
//                     this.getToken(code)
//                 } 
//             } else {
//                 message = "Error loading " + args.error;
//                 this.close(args.url);
//             }
//             console.log("Message from webView : ", message)
//         });
//     }
//     private getToken(authcode) {
//         console.log("authcode is : ", authcode)
//         let form  = new FormData();
//         form.append('grant_type', "authorization_code");
//         form.append("client_id" , "4qf3c6o1kvo4ufph9jfujamiug");
//         form.append("code" , authcode);
//         form.append("redirect_uri" , "shyftauto://auth-callback");
//         console.log("Formdata is  : ", form)
//         http.request({
//             url: "https://shyft-auto.auth.us-east-1.amazoncognito.com/oauth2/token",
//             method: "POST",
//             headers: { 
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "Authorization" : "Basic NHFmM2M2bzFrdm80dWZwaDlqZnVqYW1pdWc6MXNoN3EwaDIzZmNwa2Y0NmdxbTM5ZGJnM2g2aGI1aGNjdHNocXRiaG1lNzA0Y2JtMzIxZw=="
//              },
//             content: form
//         }).then((response) => {
//             let tokens = JSON.stringify(response.content)
//             let tokens1 = JSON.stringify(response.content)            
//             let initial_refreshToken = tokens.substr((tokens.search("refresh_token") + 16))
//             let final_refreshToken = initial_refreshToken.substr(0, initial_refreshToken.indexOf('"'))                         
//             let initial_idToken = tokens1.substr((tokens1.search("id_token") + 11))
//             let final_idToken = initial_idToken.substr(0, initial_idToken.indexOf('"'))
//             console.log("id_token is : ", final_idToken)
//             ApplicationSettings.setString("TOKEN", JSON.stringify(final_idToken));
//             ApplicationSettings.setString("IOSToken", JSON.stringify(final_idToken));
//             ApplicationSettings.setString("RefreshToken", JSON.stringify(final_refreshToken));
//             // this.tokenRefresh(final_refreshToken)
//             this.close(final_idToken)      
//         }, (e) => {
//             console.log("Error occurred " + e);
//         });
//     }
//     // public tokenRefresh(refreshToken){
//     //     console.log("refresh token is : ", refreshToken)
//     //     let form  = new FormData();
//     //     form.append('grant_type', "refresh_token");
//     //     form.append("client_id" , "4qf3c6o1kvo4ufph9jfujamiug");
//     //     form.append("refresh_token" , refreshToken);
//     //     http.request({
//     //         url: "https://shyft-auto.auth.us-east-1.amazoncognito.com/oauth2/token",
//     //         method: "POST",
//     //         headers: { 
//     //             "Content-Type": "application/x-www-form-urlencoded",
//     //             "Authorization" : "Basic NHFmM2M2bzFrdm80dWZwaDlqZnVqYW1pdWc6MXNoN3EwaDIzZmNwa2Y0NmdxbTM5ZGJnM2g2aGI1aGNjdHNocXRiaG1lNzA0Y2JtMzIxZw=="
//     //          },
//     //         content: form
//     //     }).then((response) => {
//     //         console.log("refreshed tokens are : ", response.content)  
//     //         let tokens1 = JSON.stringify(response.content)                        
//     //         let initial_idToken = tokens1.substr((tokens1.search("id_token") + 11))
//     //         let final_idToken = initial_idToken.substr(0, initial_idToken.indexOf('"'))
//     //         console.log("id_token is : ", final_idToken)
//     //         // localStorage.setItem('IOSToken',final_idToken);                              
//     //         ApplicationSettings.setString("TOKEN", JSON.stringify(final_idToken));
//     //         ApplicationSettings.setString("IOSToken", JSON.stringify(final_idToken));
//     //         this.close(final_idToken)
//     //     }, (e) => {
//     //         console.log("Error occurred in refreshing tokens are : : " + e);
//     //     });
//     // }
//     public close(res: string) {
//         this.params.closeCallback(res);
//     }
//     public submit(res: string) {
//         this.params.closeCallback(res);
//         this.router.navigate(["licenceagreement"]);
//     }
//     public pageLoaded() {
//         this.busy = false;
//         console.log("STATE ----------> ", this.busy)
//     }
// }
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var web_view_1 = require("ui/web-view");
var ApplicationSettings = require("application-settings");
var platform_1 = require("platform");
var webViewModule = require('ui/web-view');
var http = require("http");
var SignupModalComponent = (function () {
    function SignupModalComponent(params, _page, router, route) {
        this.params = params;
        this._page = _page;
        this.router = router;
        this.route = route;
        this.busy = true;
        // public webViewSrc: string = "https://shyft-auto.auth.us-east-1.amazoncognito.com/signup?response_type=code&client_id=4qf3c6o1kvo4ufph9jfujamiug&redirect_uri=shyftauto://auth-callback";
        // public webViewSrc: string = "https://uat.futuredms.com/auth/home/mobilelogin";
        this.webViewSrc = "https://demo.getshyftauto.com/auth/home/register";
    }
    SignupModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        var webView = this.webView.nativeElement;
        // webView.on(WebView.loadStartedEvent, (args: LoadEventData) => {
        //     if (!args.error) {
        //         console.log("Success from WebView :", args.url, this.busy)     
        //         let url = "www."+args.url                 
        //         let code = args.url.substr((args.url.search("code") + 5))
        //         if(url.search("code=") > 0){
        //             this.busy = true;
        //             console.log("busy state : ", this.busy)
        //             this.getToken(code)
        //         }          
        //         else{
        //             this.busy = !this.busy;
        //         }   
        //     }
        //     else {
        //         console.log("Error from webView : ", args.error)                
        //   }});   
        webView.on(web_view_1.WebView.loadStartedEvent, function (args) {
            if (!args.error) {
                if (platform_1.isAndroid) {
                    webView.android.getSettings().setDomStorageEnabled(true);
                    webView.android.getSettings().setJavaScriptEnabled(true);
                    webView.android.getSettings().setDatabaseEnabled(true);
                    var url_1 = "www." + args.url;
                    console.log("Success from WebView : " + args.url);
                    if (url_1.search("id=") > 0) {
                        console.log("Success from WebView : " + url_1);
                        _this.id_token = url_1.substr((url_1.search("id") + 3));
                        console.log("Success from WebView : " + _this.id_token);
                        ApplicationSettings.setString("TOKEN", JSON.stringify(_this.id_token));
                        ApplicationSettings.setString("IOSToken", JSON.stringify(_this.id_token));
                    }
                    else if (url_1.search("refresh=") > 0) {
                        console.log(" Success from WebView : " + url_1);
                        var refresh_token = url_1.substr((url_1.search("refresh") + 8));
                        console.log(" Success from WebView : " + refresh_token);
                        ApplicationSettings.setString("RefreshToken", JSON.stringify(refresh_token));
                        _this.close(_this.id_token);
                    }
                    else {
                        _this.busy = !_this.busy;
                    }
                    webView.on(webViewModule.WebView.urlProperty, function (changeArgs) {
                        console.dir("WebView Result ", changeArgs);
                    });
                    if (localStorage) {
                        setTimeout(function () {
                            console.log("localstorage ittem : ", localStorage.getItem('klouddms'));
                        }, 16000);
                    }
                }
                var url = "www." + args.url;
                if (url.search("id=") > 0) {
                    console.log("Success from WebView : " + url);
                    _this.id_token = url.substr((url.search("id") + 3));
                    console.log("Success from WebView : " + _this.id_token);
                    ApplicationSettings.setString("TOKEN", JSON.stringify(_this.id_token));
                    ApplicationSettings.setString("IOSToken", JSON.stringify(_this.id_token));
                }
                else if (url.search("refresh=") > 0) {
                    console.log("Success from WebView : " + url);
                    var refresh_token = url.substr((url.search("refresh") + 8));
                    console.log("Success from WebView : " + refresh_token);
                    ApplicationSettings.setString("RefreshToken", JSON.stringify(refresh_token));
                    _this.close(_this.id_token);
                }
                else {
                    _this.busy = !_this.busy;
                }
            }
            else {
                console.log("Error from webView : ", args.error);
            }
        });
    };
    SignupModalComponent.prototype.getToken = function (authcode) {
        var _this = this;
        console.log("authcode is : ", authcode);
        var form = new FormData();
        form.append('grant_type', "authorization_code");
        form.append("client_id", "4qf3c6o1kvo4ufph9jfujamiug");
        form.append("code", authcode);
        form.append("redirect_uri", "shyftauto://auth-callback");
        console.log("Formdata is  : ", form);
        http.request({
            url: "https://shyft-auto.auth.us-east-1.amazoncognito.com/oauth2/token",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic NHFmM2M2bzFrdm80dWZwaDlqZnVqYW1pdWc6MXNoN3EwaDIzZmNwa2Y0NmdxbTM5ZGJnM2g2aGI1aGNjdHNocXRiaG1lNzA0Y2JtMzIxZw=="
            },
            content: form
        }).then(function (response) {
            var tokens = JSON.stringify(response.content);
            var tokens1 = JSON.stringify(response.content);
            var initial_refreshToken = tokens.substr((tokens.search("refresh_token") + 16));
            var final_refreshToken = initial_refreshToken.substr(0, initial_refreshToken.indexOf('"'));
            var initial_idToken = tokens1.substr((tokens1.search("id_token") + 11));
            var final_idToken = initial_idToken.substr(0, initial_idToken.indexOf('"'));
            console.log("id_token is : ", final_idToken);
            ApplicationSettings.setString("TOKEN", JSON.stringify(final_idToken));
            ApplicationSettings.setString("IOSToken", JSON.stringify(final_idToken));
            ApplicationSettings.setString("RefreshToken", JSON.stringify(final_refreshToken));
            _this.close(final_idToken);
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };
    SignupModalComponent.prototype.close = function (res) {
        this.params.closeCallback(res);
    };
    SignupModalComponent.prototype.submit = function (res) {
        this.params.closeCallback(res);
        this.router.navigate(["licenceagreement"]);
    };
    SignupModalComponent.prototype.pageLoaded = function () {
        // this.busy = false;
        console.log("STATE ---------------> ", this.busy);
    };
    __decorate([
        core_1.ViewChild('webView'),
        __metadata("design:type", core_1.ElementRef)
    ], SignupModalComponent.prototype, "webView", void 0);
    __decorate([
        core_1.ViewChild("activityIndicator"),
        __metadata("design:type", core_1.ElementRef)
    ], SignupModalComponent.prototype, "ac", void 0);
    SignupModalComponent = __decorate([
        core_1.Component({
            selector: "my-signupmodal",
            templateUrl: "signupmodal.html",
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, page_1.Page, router_1.Router, router_1.ActivatedRoute])
    ], SignupModalComponent);
    return SignupModalComponent;
}());
exports.SignupModalComponent = SignupModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwbW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWdudXBtb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsOEhBQThIO0FBQzlILCtFQUErRTtBQUMvRSxrQ0FBa0M7QUFDbEMsNERBQTREO0FBQzVELHNDQUFzQztBQUN0Qyx3REFBd0Q7QUFDeEQsNkRBQTZEO0FBQzdELCtEQUErRDtBQUMvRCw4QkFBOEI7O0FBRTlCLGVBQWU7QUFDZixrQ0FBa0M7QUFDbEMsdUNBQXVDO0FBQ3ZDLEtBQUs7QUFDTCx3REFBd0Q7QUFDeEQsbURBQW1EO0FBQ25ELDBCQUEwQjtBQUUxQixpREFBaUQ7QUFFakQsK0xBQStMO0FBRS9MLHNEQUFzRDtBQUN0RCxzREFBc0Q7QUFHdEQsMElBQTBJO0FBRTFJLFFBQVE7QUFFUix5QkFBeUI7QUFDekIsNkRBQTZEO0FBRTdELDJFQUEyRTtBQUMzRSwyQkFBMkI7QUFFM0IsaUNBQWlDO0FBQ2pDLHVFQUF1RTtBQUN2RSw2REFBNkQ7QUFDN0QsNEVBQTRFO0FBQzVFLCtDQUErQztBQUMvQywwQ0FBMEM7QUFDMUMscUJBQXFCO0FBQ3JCLHVCQUF1QjtBQUN2QiwyREFBMkQ7QUFDM0Qsd0NBQXdDO0FBQ3hDLGdCQUFnQjtBQUNoQiw4REFBOEQ7QUFFOUQsY0FBYztBQUNkLFFBQVE7QUFFUixtQ0FBbUM7QUFDbkMsa0RBQWtEO0FBQ2xELHNDQUFzQztBQUV0QywyREFBMkQ7QUFDM0QsbUVBQW1FO0FBQ25FLDBDQUEwQztBQUMxQyxxRUFBcUU7QUFFckUsK0NBQStDO0FBRS9DLHlCQUF5QjtBQUN6Qix1RkFBdUY7QUFDdkYsOEJBQThCO0FBQzlCLDBCQUEwQjtBQUMxQix1RUFBdUU7QUFDdkUseUpBQXlKO0FBQ3pKLGtCQUFrQjtBQUNsQiw0QkFBNEI7QUFFNUIsa0NBQWtDO0FBQ2xDLDREQUE0RDtBQUM1RCx5RUFBeUU7QUFDekUsOEZBQThGO0FBQzlGLGtJQUFrSTtBQUNsSSxzRkFBc0Y7QUFD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QUFDLFNBQVMsQ0FBQztrQ0FBVSxpQkFBVTt5REFBQztJQU1WO1FBQS9CLGdCQUFTLENBQUMsbUJBQW1CLENBQUM7a0NBQUssaUJBQVU7b0RBQUM7SUFYdEMsb0JBQW9CO1FBSmhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSxrQkFBa0I7U0FDbEMsQ0FBQzt5Q0FlcUMsMkJBQWlCLEVBQWlCLFdBQUksRUFBa0IsZUFBTSxFQUFpQix1QkFBYztPQWR2SCxvQkFBb0IsQ0F1S2hDO0lBQUQsMkJBQUM7Q0FBQSxBQXZLRCxJQXVLQztBQXZLWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgT25Jbml0LCBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIFRlbXBsYXRlUmVmLCBJbmplY3QgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuLy8gaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG4vLyBpbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbi8vIGltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG4vLyBpbXBvcnQgeyBTd2l0Y2ggfSBmcm9tIFwidWkvc3dpdGNoXCI7XG4vLyBpbXBvcnQgeyBXZWJWaWV3LCBMb2FkRXZlbnREYXRhIH0gZnJvbSBcInVpL3dlYi12aWV3XCI7XG4vLyBpbXBvcnQgeyBBY3Rpdml0eUluZGljYXRvciB9IGZyb20gXCJ1aS9hY3Rpdml0eS1pbmRpY2F0b3JcIjtcbi8vIGltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG4vLyB2YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG4vLyBAQ29tcG9uZW50KHtcbi8vICAgICBzZWxlY3RvcjogXCJteS1zaWdudXBtb2RhbFwiLFxuLy8gICAgIHRlbXBsYXRlVXJsOiBcInNpZ251cG1vZGFsLmh0bWxcIixcbi8vIH0pXG4vLyBleHBvcnQgY2xhc3MgU2lnbnVwTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuLy8gICAgIHB1YmxpYyBhY3Rpdml0eUluZGljYXRvcjogQWN0aXZpdHlJbmRpY2F0b3I7XG4vLyAgICAgcHVibGljIGJ1c3kgPSB0cnVlO1xuXG4vLyAgICAgQFZpZXdDaGlsZCgnd2ViVmlldycpIHdlYlZpZXc6IEVsZW1lbnRSZWY7XG4gICAgXG4vLyAgICAgcHVibGljIHdlYlZpZXdTcmM6IHN0cmluZyA9IFwiaHR0cHM6Ly9zaHlmdC1hdXRvLmF1dGgudXMtZWFzdC0xLmFtYXpvbmNvZ25pdG8uY29tL3NpZ251cD9yZXNwb25zZV90eXBlPWNvZGUmY2xpZW50X2lkPTRxZjNjNm8xa3ZvNHVmcGg5amZ1amFtaXVnJnJlZGlyZWN0X3VyaT1zaHlmdGF1dG86Ly9hdXRoLWNhbGxiYWNrXCI7XG5cbi8vICAgICBAVmlld0NoaWxkKFwibXlXZWJWaWV3XCIpIHdlYlZpZXdSZWY6IEVsZW1lbnRSZWY7XG4vLyAgICAgQFZpZXdDaGlsZChcImFjdGl2aXR5SW5kaWNhdG9yXCIpIGFjOiBFbGVtZW50UmVmO1xuXG5cbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLCBwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuXG4vLyAgICAgfVxuXG4vLyAgICAgbmdPbkluaXQoKTogdm9pZCB7XG4vLyAgICAgICAgIGxldCB3ZWJWaWV3OiBXZWJWaWV3ID0gdGhpcy53ZWJWaWV3Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIFxuLy8gICAgICAgICB3ZWJWaWV3Lm9uKFdlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsIChhcmdzOiBMb2FkRXZlbnREYXRhKSA9PiB7XG4vLyAgICAgICAgICAgICBsZXQgbWVzc2FnZTtcblxuLy8gICAgICAgICAgICAgaWYgKCFhcmdzLmVycm9yKSB7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzIGZyb20gd2ViVmlldyA6XCIsIGFyZ3MudXJsKSAgICAgXG4vLyAgICAgICAgICAgICAgICAgbGV0IHVybCA9IFwid3d3LlwiK2FyZ3MudXJsICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGFyZ3MudXJsLnN1YnN0cigoYXJncy51cmwuc2VhcmNoKFwiY29kZVwiKSArIDUpKVxuLy8gICAgICAgICAgICAgICAgIGlmKHVybC5zZWFyY2goXCJjb2RlPVwiKSA+IDApe1xuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRva2VuKGNvZGUpXG4vLyAgICAgICAgICAgICAgICAgfSBcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRXJyb3IgbG9hZGluZyBcIiArIGFyZ3MuZXJyb3I7XG4vLyAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZShhcmdzLnVybCk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2UgZnJvbSB3ZWJWaWV3IDogXCIsIG1lc3NhZ2UpXG5cbi8vICAgICAgICAgfSk7XG4vLyAgICAgfVxuXG4vLyAgICAgcHJpdmF0ZSBnZXRUb2tlbihhdXRoY29kZSkge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcImF1dGhjb2RlIGlzIDogXCIsIGF1dGhjb2RlKVxuLy8gICAgICAgICBsZXQgZm9ybSAgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgXG4vLyAgICAgICAgIGZvcm0uYXBwZW5kKCdncmFudF90eXBlJywgXCJhdXRob3JpemF0aW9uX2NvZGVcIik7XG4vLyAgICAgICAgIGZvcm0uYXBwZW5kKFwiY2xpZW50X2lkXCIgLCBcIjRxZjNjNm8xa3ZvNHVmcGg5amZ1amFtaXVnXCIpO1xuLy8gICAgICAgICBmb3JtLmFwcGVuZChcImNvZGVcIiAsIGF1dGhjb2RlKTtcbi8vICAgICAgICAgZm9ybS5hcHBlbmQoXCJyZWRpcmVjdF91cmlcIiAsIFwic2h5ZnRhdXRvOi8vYXV0aC1jYWxsYmFja1wiKTtcbiAgICAgICAgXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiRm9ybWRhdGEgaXMgIDogXCIsIGZvcm0pXG5cbi8vICAgICAgICAgaHR0cC5yZXF1ZXN0KHtcbi8vICAgICAgICAgICAgIHVybDogXCJodHRwczovL3NoeWZ0LWF1dG8uYXV0aC51cy1lYXN0LTEuYW1hem9uY29nbml0by5jb20vb2F1dGgyL3Rva2VuXCIsXG4vLyAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuLy8gICAgICAgICAgICAgaGVhZGVyczogeyBcbi8vICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiIDogXCJCYXNpYyBOSEZtTTJNMmJ6RnJkbTgwZFdad2FEbHFablZxWVcxcGRXYzZNWE5vTjNFd2FESXpabU53YTJZME5tZHhiVE01WkdKbk0yZzJhR0kxYUdOamRITm9jWFJpYUcxbE56QTBZMkp0TXpJeFp3PT1cIlxuLy8gICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICBjb250ZW50OiBmb3JtXG4gICAgXG4vLyAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4vLyAgICAgICAgICAgICBsZXQgdG9rZW5zID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuY29udGVudClcbi8vICAgICAgICAgICAgIGxldCB0b2tlbnMxID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuY29udGVudCkgICAgICAgICAgICBcbi8vICAgICAgICAgICAgIGxldCBpbml0aWFsX3JlZnJlc2hUb2tlbiA9IHRva2Vucy5zdWJzdHIoKHRva2Vucy5zZWFyY2goXCJyZWZyZXNoX3Rva2VuXCIpICsgMTYpKVxuLy8gICAgICAgICAgICAgbGV0IGZpbmFsX3JlZnJlc2hUb2tlbiA9IGluaXRpYWxfcmVmcmVzaFRva2VuLnN1YnN0cigwLCBpbml0aWFsX3JlZnJlc2hUb2tlbi5pbmRleE9mKCdcIicpKSAgICAgICAgICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgIGxldCBpbml0aWFsX2lkVG9rZW4gPSB0b2tlbnMxLnN1YnN0cigodG9rZW5zMS5zZWFyY2goXCJpZF90b2tlblwiKSArIDExKSlcbi8vICAgICAgICAgICAgIGxldCBmaW5hbF9pZFRva2VuID0gaW5pdGlhbF9pZFRva2VuLnN1YnN0cigwLCBpbml0aWFsX2lkVG9rZW4uaW5kZXhPZignXCInKSlcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWRfdG9rZW4gaXMgOiBcIiwgZmluYWxfaWRUb2tlbilcbi8vICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiVE9LRU5cIiwgSlNPTi5zdHJpbmdpZnkoZmluYWxfaWRUb2tlbikpO1xuLy8gICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJJT1NUb2tlblwiLCBKU09OLnN0cmluZ2lmeShmaW5hbF9pZFRva2VuKSk7XG4vLyAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIlJlZnJlc2hUb2tlblwiLCBKU09OLnN0cmluZ2lmeShmaW5hbF9yZWZyZXNoVG9rZW4pKTtcbi8vICAgICAgICAgICAgIC8vIHRoaXMudG9rZW5SZWZyZXNoKGZpbmFsX3JlZnJlc2hUb2tlbilcbi8vICAgICAgICAgICAgIHRoaXMuY2xvc2UoZmluYWxfaWRUb2tlbikgICAgICBcbi8vICAgICAgICAgfSwgKGUpID0+IHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb2NjdXJyZWQgXCIgKyBlKTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfVxuXG4vLyAgICAgLy8gcHVibGljIHRva2VuUmVmcmVzaChyZWZyZXNoVG9rZW4pe1xuLy8gICAgIC8vICAgICBjb25zb2xlLmxvZyhcInJlZnJlc2ggdG9rZW4gaXMgOiBcIiwgcmVmcmVzaFRva2VuKVxuLy8gICAgIC8vICAgICBsZXQgZm9ybSAgPSBuZXcgRm9ybURhdGEoKTtcbi8vICAgICAvLyAgICAgZm9ybS5hcHBlbmQoJ2dyYW50X3R5cGUnLCBcInJlZnJlc2hfdG9rZW5cIik7XG4vLyAgICAgLy8gICAgIGZvcm0uYXBwZW5kKFwiY2xpZW50X2lkXCIgLCBcIjRxZjNjNm8xa3ZvNHVmcGg5amZ1amFtaXVnXCIpO1xuLy8gICAgIC8vICAgICBmb3JtLmFwcGVuZChcInJlZnJlc2hfdG9rZW5cIiAsIHJlZnJlc2hUb2tlbik7XG4gICAgICAgIFxuLy8gICAgIC8vICAgICBodHRwLnJlcXVlc3Qoe1xuLy8gICAgIC8vICAgICAgICAgdXJsOiBcImh0dHBzOi8vc2h5ZnQtYXV0by5hdXRoLnVzLWVhc3QtMS5hbWF6b25jb2duaXRvLmNvbS9vYXV0aDIvdG9rZW5cIixcbi8vICAgICAvLyAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4vLyAgICAgLy8gICAgICAgICBoZWFkZXJzOiB7IFxuLy8gICAgIC8vICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4vLyAgICAgLy8gICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCIgOiBcIkJhc2ljIE5IRm1NMk0yYnpGcmRtODBkV1p3YURscVpuVnFZVzFwZFdjNk1YTm9OM0V3YURJelptTndhMlkwTm1keGJUTTVaR0puTTJnMmFHSTFhR05qZEhOb2NYUmlhRzFsTnpBMFkySnRNekl4Wnc9PVwiXG4vLyAgICAgLy8gICAgICAgICAgfSxcbi8vICAgICAvLyAgICAgICAgIGNvbnRlbnQ6IGZvcm1cbiAgICBcbi8vICAgICAvLyAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbi8vICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwicmVmcmVzaGVkIHRva2VucyBhcmUgOiBcIiwgcmVzcG9uc2UuY29udGVudCkgIFxuLy8gICAgIC8vICAgICAgICAgbGV0IHRva2VuczEgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5jb250ZW50KSAgICAgICAgICAgICAgICAgICAgICAgIFxuLy8gICAgIC8vICAgICAgICAgbGV0IGluaXRpYWxfaWRUb2tlbiA9IHRva2VuczEuc3Vic3RyKCh0b2tlbnMxLnNlYXJjaChcImlkX3Rva2VuXCIpICsgMTEpKVxuLy8gICAgIC8vICAgICAgICAgbGV0IGZpbmFsX2lkVG9rZW4gPSBpbml0aWFsX2lkVG9rZW4uc3Vic3RyKDAsIGluaXRpYWxfaWRUb2tlbi5pbmRleE9mKCdcIicpKVxuLy8gICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJpZF90b2tlbiBpcyA6IFwiLCBmaW5hbF9pZFRva2VuKVxuLy8gICAgIC8vICAgICAgICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0lPU1Rva2VuJyxmaW5hbF9pZFRva2VuKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbi8vICAgICAvLyAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiVE9LRU5cIiwgSlNPTi5zdHJpbmdpZnkoZmluYWxfaWRUb2tlbikpO1xuLy8gICAgIC8vICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJJT1NUb2tlblwiLCBKU09OLnN0cmluZ2lmeShmaW5hbF9pZFRva2VuKSk7XG4gICAgICAgICAgICBcbi8vICAgICAvLyAgICAgICAgIHRoaXMuY2xvc2UoZmluYWxfaWRUb2tlbilcbi8vICAgICAvLyAgICAgfSwgKGUpID0+IHtcbi8vICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb2NjdXJyZWQgaW4gcmVmcmVzaGluZyB0b2tlbnMgYXJlIDogOiBcIiArIGUpO1xuLy8gICAgIC8vICAgICB9KTtcbi8vICAgICAvLyB9XG5cblxuLy8gICAgIHB1YmxpYyBjbG9zZShyZXM6IHN0cmluZykge1xuLy8gICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlcyk7XG4vLyAgICAgfVxuXG4vLyAgICAgcHVibGljIHN1Ym1pdChyZXM6IHN0cmluZykge1xuLy8gICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlcyk7XG4vLyAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImxpY2VuY2VhZ3JlZW1lbnRcIl0pO1xuLy8gICAgIH1cblxuLy8gICAgIHB1YmxpYyBwYWdlTG9hZGVkKCkge1xuLy8gICAgICAgICB0aGlzLmJ1c3kgPSBmYWxzZTtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJTVEFURSAtLS0tLS0tLS0tPiBcIiwgdGhpcy5idXN5KVxuLy8gICAgIH1cbi8vIH1cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIE9uSW5pdCwgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBUZW1wbGF0ZVJlZiwgSW5qZWN0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSBcInVpL3N3aXRjaFwiO1xuaW1wb3J0IHsgV2ViVmlldywgTG9hZEV2ZW50RGF0YSB9IGZyb20gXCJ1aS93ZWItdmlld1wiO1xuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IEFjdGl2aXR5SW5kaWNhdG9yIH0gZnJvbSBcInVpL2FjdGl2aXR5LWluZGljYXRvclwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MsIGRldmljZSwgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5cbnZhciB3ZWJWaWV3TW9kdWxlID0gcmVxdWlyZSgndWkvd2ViLXZpZXcnKTtcblxudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibXktc2lnbnVwbW9kYWxcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJzaWdudXBtb2RhbC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIFNpZ251cE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgYWN0aXZpdHlJbmRpY2F0b3I6IEFjdGl2aXR5SW5kaWNhdG9yO1xuICAgIHB1YmxpYyBidXN5ID0gdHJ1ZTtcbiAgICBpZF90b2tlbjtcblxuICAgIEBWaWV3Q2hpbGQoJ3dlYlZpZXcnKSB3ZWJWaWV3OiBFbGVtZW50UmVmO1xuICAgIFxuICAgIC8vIHB1YmxpYyB3ZWJWaWV3U3JjOiBzdHJpbmcgPSBcImh0dHBzOi8vc2h5ZnQtYXV0by5hdXRoLnVzLWVhc3QtMS5hbWF6b25jb2duaXRvLmNvbS9zaWdudXA/cmVzcG9uc2VfdHlwZT1jb2RlJmNsaWVudF9pZD00cWYzYzZvMWt2bzR1ZnBoOWpmdWphbWl1ZyZyZWRpcmVjdF91cmk9c2h5ZnRhdXRvOi8vYXV0aC1jYWxsYmFja1wiO1xuICAgIC8vIHB1YmxpYyB3ZWJWaWV3U3JjOiBzdHJpbmcgPSBcImh0dHBzOi8vdWF0LmZ1dHVyZWRtcy5jb20vYXV0aC9ob21lL21vYmlsZWxvZ2luXCI7XG4gICAgcHVibGljIHdlYlZpZXdTcmM6IHN0cmluZyA9IFwiaHR0cHM6Ly9kZW1vLmdldHNoeWZ0YXV0by5jb20vYXV0aC9ob21lL3JlZ2lzdGVyXCI7XG4gICAgXG4gICAgQFZpZXdDaGlsZChcImFjdGl2aXR5SW5kaWNhdG9yXCIpIGFjOiBFbGVtZW50UmVmO1xuXG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLCBwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGxldCB3ZWJWaWV3OiBXZWJWaWV3ID0gdGhpcy53ZWJWaWV3Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIFxuICAgICAgICAvLyB3ZWJWaWV3Lm9uKFdlYlZpZXcubG9hZFN0YXJ0ZWRFdmVudCwgKGFyZ3M6IExvYWRFdmVudERhdGEpID0+IHtcbiAgICAgICAgLy8gICAgIGlmICghYXJncy5lcnJvcikge1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2VzcyBmcm9tIFdlYlZpZXcgOlwiLCBhcmdzLnVybCwgdGhpcy5idXN5KSAgICAgXG5cbiAgICAgICAgLy8gICAgICAgICBsZXQgdXJsID0gXCJ3d3cuXCIrYXJncy51cmwgICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgIGxldCBjb2RlID0gYXJncy51cmwuc3Vic3RyKChhcmdzLnVybC5zZWFyY2goXCJjb2RlXCIpICsgNSkpXG4gICAgICAgIC8vICAgICAgICAgaWYodXJsLnNlYXJjaChcImNvZGU9XCIpID4gMCl7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuYnVzeSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnVzeSBzdGF0ZSA6IFwiLCB0aGlzLmJ1c3kpXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW4oY29kZSlcbiAgICAgICAgLy8gICAgICAgICB9ICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgIGVsc2V7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuYnVzeSA9ICF0aGlzLmJ1c3k7XG4gICAgICAgIC8vICAgICAgICAgfSAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBmcm9tIHdlYlZpZXcgOiBcIiwgYXJncy5lcnJvcikgICAgICAgICAgICAgICAgXG4gICAgICAgIC8vICAgfX0pOyAgIFxuXG4gICAgICAgIHdlYlZpZXcub24oV2ViVmlldy5sb2FkU3RhcnRlZEV2ZW50LCAoYXJnczogTG9hZEV2ZW50RGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFhcmdzLmVycm9yKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHdlYlZpZXcuYW5kcm9pZC5nZXRTZXR0aW5ncygpLnNldERvbVN0b3JhZ2VFbmFibGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB3ZWJWaWV3LmFuZHJvaWQuZ2V0U2V0dGluZ3MoKS5zZXRKYXZhU2NyaXB0RW5hYmxlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgd2ViVmlldy5hbmRyb2lkLmdldFNldHRpbmdzKCkuc2V0RGF0YWJhc2VFbmFibGVkKHRydWUpOyBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBcInd3dy5cIiArIGFyZ3MudXJsXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2VzcyBmcm9tIFdlYlZpZXcgOiBcIiArIGFyZ3MudXJsKVxuICAgICAgICAgICAgICAgICAgICBpZiAodXJsLnNlYXJjaChcImlkPVwiKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2VzcyBmcm9tIFdlYlZpZXcgOiBcIiArIHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWRfdG9rZW4gPSB1cmwuc3Vic3RyKCh1cmwuc2VhcmNoKFwiaWRcIikgKyAzKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2VzcyBmcm9tIFdlYlZpZXcgOiBcIiArIHRoaXMuaWRfdG9rZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIlRPS0VOXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuaWRfdG9rZW4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiSU9TVG9rZW5cIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5pZF90b2tlbikpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsLnNlYXJjaChcInJlZnJlc2g9XCIpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIgU3VjY2VzcyBmcm9tIFdlYlZpZXcgOiBcIiArIHVybClcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlZnJlc2hfdG9rZW4gPSB1cmwuc3Vic3RyKCh1cmwuc2VhcmNoKFwicmVmcmVzaFwiKSArIDgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIgU3VjY2VzcyBmcm9tIFdlYlZpZXcgOiBcIiArIHJlZnJlc2hfdG9rZW4pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiUmVmcmVzaFRva2VuXCIsIEpTT04uc3RyaW5naWZ5KHJlZnJlc2hfdG9rZW4pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh0aGlzLmlkX3Rva2VuKVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c3kgPSAhdGhpcy5idXN5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdlYlZpZXcub24od2ViVmlld01vZHVsZS5XZWJWaWV3LnVybFByb3BlcnR5LCAoY2hhbmdlQXJncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoXCJXZWJWaWV3IFJlc3VsdCBcIiwgY2hhbmdlQXJncyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9jYWxzdG9yYWdlIGl0dGVtIDogXCIsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdrbG91ZGRtcycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTYwMDApXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gXCJ3d3cuXCIgKyBhcmdzLnVybFxuICAgICAgICAgICAgICAgIGlmICh1cmwuc2VhcmNoKFwiaWQ9XCIpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3MgZnJvbSBXZWJWaWV3IDogXCIgKyB1cmwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWRfdG9rZW4gPSB1cmwuc3Vic3RyKCh1cmwuc2VhcmNoKFwiaWRcIikgKyAzKSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzIGZyb20gV2ViVmlldyA6IFwiICsgdGhpcy5pZF90b2tlbilcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJUT0tFTlwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmlkX3Rva2VuKSk7XG4gICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiSU9TVG9rZW5cIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5pZF90b2tlbikpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybC5zZWFyY2goXCJyZWZyZXNoPVwiKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzIGZyb20gV2ViVmlldyA6IFwiICsgdXJsKVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWZyZXNoX3Rva2VuID0gdXJsLnN1YnN0cigodXJsLnNlYXJjaChcInJlZnJlc2hcIikgKyA4KSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzIGZyb20gV2ViVmlldyA6IFwiICsgcmVmcmVzaF90b2tlbilcblxuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIlJlZnJlc2hUb2tlblwiLCBKU09OLnN0cmluZ2lmeShyZWZyZXNoX3Rva2VuKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh0aGlzLmlkX3Rva2VuKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c3kgPSAhdGhpcy5idXN5O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBmcm9tIHdlYlZpZXcgOiBcIiwgYXJncy5lcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRva2VuKGF1dGhjb2RlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXV0aGNvZGUgaXMgOiBcIiwgYXV0aGNvZGUpXG4gICAgICAgIGxldCBmb3JtICA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBcbiAgICAgICAgZm9ybS5hcHBlbmQoJ2dyYW50X3R5cGUnLCBcImF1dGhvcml6YXRpb25fY29kZVwiKTtcbiAgICAgICAgZm9ybS5hcHBlbmQoXCJjbGllbnRfaWRcIiAsIFwiNHFmM2M2bzFrdm80dWZwaDlqZnVqYW1pdWdcIik7XG4gICAgICAgIGZvcm0uYXBwZW5kKFwiY29kZVwiICwgYXV0aGNvZGUpO1xuICAgICAgICBmb3JtLmFwcGVuZChcInJlZGlyZWN0X3VyaVwiICwgXCJzaHlmdGF1dG86Ly9hdXRoLWNhbGxiYWNrXCIpO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCJGb3JtZGF0YSBpcyAgOiBcIiwgZm9ybSlcblxuICAgICAgICBodHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vc2h5ZnQtYXV0by5hdXRoLnVzLWVhc3QtMS5hbWF6b25jb2duaXRvLmNvbS9vYXV0aDIvdG9rZW5cIixcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7IFxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCIgOiBcIkJhc2ljIE5IRm1NMk0yYnpGcmRtODBkV1p3YURscVpuVnFZVzFwZFdjNk1YTm9OM0V3YURJelptTndhMlkwTm1keGJUTTVaR0puTTJnMmFHSTFhR05qZEhOb2NYUmlhRzFsTnpBMFkySnRNekl4Wnc9PVwiXG4gICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGZvcm1cbiAgICBcbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCB0b2tlbnMgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5jb250ZW50KVxuICAgICAgICAgICAgbGV0IHRva2VuczEgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5jb250ZW50KSAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGluaXRpYWxfcmVmcmVzaFRva2VuID0gdG9rZW5zLnN1YnN0cigodG9rZW5zLnNlYXJjaChcInJlZnJlc2hfdG9rZW5cIikgKyAxNikpXG4gICAgICAgICAgICBsZXQgZmluYWxfcmVmcmVzaFRva2VuID0gaW5pdGlhbF9yZWZyZXNoVG9rZW4uc3Vic3RyKDAsIGluaXRpYWxfcmVmcmVzaFRva2VuLmluZGV4T2YoJ1wiJykpICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGluaXRpYWxfaWRUb2tlbiA9IHRva2VuczEuc3Vic3RyKCh0b2tlbnMxLnNlYXJjaChcImlkX3Rva2VuXCIpICsgMTEpKVxuICAgICAgICAgICAgbGV0IGZpbmFsX2lkVG9rZW4gPSBpbml0aWFsX2lkVG9rZW4uc3Vic3RyKDAsIGluaXRpYWxfaWRUb2tlbi5pbmRleE9mKCdcIicpKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZF90b2tlbiBpcyA6IFwiLCBmaW5hbF9pZFRva2VuKVxuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJUT0tFTlwiLCBKU09OLnN0cmluZ2lmeShmaW5hbF9pZFRva2VuKSk7XG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIklPU1Rva2VuXCIsIEpTT04uc3RyaW5naWZ5KGZpbmFsX2lkVG9rZW4pKTtcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiUmVmcmVzaFRva2VuXCIsIEpTT04uc3RyaW5naWZ5KGZpbmFsX3JlZnJlc2hUb2tlbikpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNsb3NlKGZpbmFsX2lkVG9rZW4pICAgICAgXG4gICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIG9jY3VycmVkIFwiICsgZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZShyZXM6IHN0cmluZykge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN1Ym1pdChyZXM6IHN0cmluZykge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlcyk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImxpY2VuY2VhZ3JlZW1lbnRcIl0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYWdlTG9hZGVkKCkge1xuICAgICAgICAvLyB0aGlzLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTVEFURSAtLS0tLS0tLS0tLS0tLS0+IFwiLCB0aGlzLmJ1c3kpXG4gICAgfVxufVxuXG5cblxuIl19