"use strict";
// import { Component, ElementRef, ViewChild, OnInit, Directive, ViewContainerRef, TemplateRef, Inject, ChangeDetectorRef } from "@angular/core";
// import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
// import { Page } from "ui/page";
// import { Router, ActivatedRoute } from "@angular/router";
// import { Switch } from "ui/switch";
// import { WebView, LoadEventData } from "ui/web-view";
// import { EventData } from 'data/observable';
// import { ActivityIndicator } from "ui/activity-indicator";
// import * as ApplicationSettings from "application-settings";
// import { isAndroid, isIOS, device, screen } from "platform";
// let webViewInterfaceModule = require('nativescript-webview-interface');
// require("nativescript-localstorage");
Object.defineProperty(exports, "__esModule", { value: true });
// var webViewModule = require('ui/web-view');
// var http = require("http");
// @Component({
//     selector: "my-loginmodal",
//     templateUrl: "loginmodal.html",
// })
// export class LoginModalComponent implements OnInit {
//     public activityIndicator: ActivityIndicator;
//     public busy = true;
//     id_token;
//     private oWebViewInterface;
//     @ViewChild('webView') webView: ElementRef;
//     // public webViewSrc: string = "https://shyft-auto.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=4qf3c6o1kvo4ufph9jfujamiug&redirect_uri=shyftauto://auth-callback";
//     // public webViewSrc: string = "https://uat.futuredms.com/auth/home/mobilelogin";
//     public webViewSrc: string = "https://demo.getshyftauto.com/auth/home/login";
//     @ViewChild("activityIndicator") ac: ElementRef;
//     public constructor(private params: ModalDialogParams, private changeDetectorRef: ChangeDetectorRef, private _page: Page, private router: Router, private route: ActivatedRoute) {
//     }
//     ngOnInit(): void {
//         this.setupWebViewInterface()
//         let webView: WebView = this.webView.nativeElement;
//         // webView.on(webViewModule.WebView.urlProperty, (changeArgs) => {
//         //     console.dir("WebView Result ", changeArgs); 
//         //     // Do something with the URL here.
//         //     // E.g. extract the token and hide the WebView.
//         // });
//         // webView.on(WebView.loadStartedEvent, (args: LoadEventData) => {
//         //     if (!args.error) {
//         //         console.log("Success from WebView : "+ args.url)     
//         //         let url = "www."+args.url                 
//         //         let code = args.url.substr((args.url.search("code") + 5))
//         //         if(url.search("code=") > 0){
//         //             this.busy = true;
//         //             console.log("busy state : ", this.busy)
//         //             this.getToken(code)
//         //         }          
//         //         else{
//         //             this.busy = !this.busy;
//         //         }   
//         //     }
//         //     else {
//         //         console.log("Error from webView : ", args.error)                
//         //   }});   
//         // ************************* Working for new Login Screen **************************************//
//         // webView.on(WebView.loadStartedEvent, (args: LoadEventData) => {
//         //     if (!args.error) {
//         //         if (isAndroid) {
//         //             webView.android.getSettings().setDomStorageEnabled(true);
//         //             webView.android.getSettings().setJavaScriptEnabled(true);
//         //             webView.android.getSettings().setDatabaseEnabled(true);
//         //             let url = "www." + args.url
//         //             console.log(" Success from WebView : " + args.url)
//         //             if (url.search("id=") > 0) {
//         //                 console.log(" Success from WebView : " + url)
//         //                 this.id_token = url.substr((url.search("id") + 3))
//         //                 console.log(" Success from WebView : " + this.id_token)
//         //                 ApplicationSettings.setString("TOKEN", JSON.stringify(this.id_token));
//         //                 ApplicationSettings.setString("IOSToken", JSON.stringify(this.id_token));
//         //             }
//         //             else if (url.search("refresh=") > 0) {
//         //                 console.log("Success from WebView : " + url)
//         //                 let refresh_token = url.substr((url.search("refresh") + 8))
//         //                 console.log("Success from WebView : " + refresh_token)
//         //                 ApplicationSettings.setString("RefreshToken", JSON.stringify(refresh_token));
//         //                 this.close(this.id_token)
//         //             }
//         //             else {
//         //                 this.busy = !this.busy;
//         //             }
//         //             webView.on(webViewModule.WebView.urlProperty, (changeArgs) => {
//         //                 console.log("WebView Result : ", changeArgs);
//         //             });
//         //             if (localStorage) {
//         //                 setTimeout(() => {
//         //                     console.log("localstorage item : ", localStorage.getItem('klouddms'))
//         //                 }, 16000)
//         //             }
//         //         }
//         //         let url = "www." + args.url
//         //         if (url.search("id=") > 0) {
//         //             console.log(" Success from WebView : " + url)
//         //             this.id_token = url.substr((url.search("id") + 3))
//         //             console.log(" Success from WebView : " + this.id_token)
//         //             ApplicationSettings.setString("TOKEN", JSON.stringify(this.id_token));
//         //             ApplicationSettings.setString("IOSToken", JSON.stringify(this.id_token));
//         //         }
//         //         else if (url.search("refresh=") > 0) {
//         //             console.log(" Success from WebView : " + url)
//         //             let refresh_token = url.substr((url.search("refresh") + 8))
//         //             console.log(" Success from WebView : " + refresh_token)
//         //             ApplicationSettings.setString("RefreshToken", JSON.stringify(refresh_token));
//         //             this.close(this.id_token)
//         //         }
//         //         else {
//         //             this.busy = !this.busy;
//         //         }
//         //     }
//         //     else {
//         //         console.log("Error from webView : ", args.error)
//         //     }
//         // });
//     }
//     ngOnDestroy() {
//             // cleaning up references/listeners.
//         this.oWebViewInterface.destroy();
//         this.oWebViewInterface = null;
//     }
//     private setupWebViewInterface() {
//         console.log("******* setupWebViewInterface ******")
//         let webView: WebView = this.webView.nativeElement;
//         this.oWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, 'https://demo.getshyftauto.com/auth-mobile/mobile-index.html');
//         webView.on(WebView.loadStartedEvent, (args: LoadEventData) => {
//             if (!args.error) {
//                 if (isAndroid) {
//                     webView.android.getSettings().setDomStorageEnabled(true);
//                     webView.android.getSettings().setJavaScriptEnabled(true);
//                     webView.android.getSettings().setDatabaseEnabled(true);
//                 }
//                 console.log("Success from WebView - " + args.url)
//                 this.busy = false;
//                 // this.listenWebViewEvents();
//                 this.oWebViewInterface.on('onload', (onload)=>{
//                     console.log("onload  event : ", onload)
//                 });
//                     this.oWebViewInterface.emit('tokenEvent');                    
//             }
//         });
//         this.listenWebViewEvents()
//     }
//     private listenWebViewEvents() {
//         console.log(" ***** listenWebViewEvents ****")
//         this.oWebViewInterface.on('id_token', (id_token)=>{
//             console.log("id token event : ", id_token)
//                   this.changeDetectorRef.detectChanges();
//         });
//         this.oWebViewInterface.on('access_token', (access_token)=>{
//             console.log("access token event : ", access_token)   
//             this.changeDetectorRef.detectChanges();            
//         });
//         this.oWebViewInterface.on('refresh_token', (refresh_token)=>{
//             console.log("refresh token event : ", refresh_token)        
//             this.changeDetectorRef.detectChanges();            
//         });
//     }
//     private getToken(authcode) {
//         // console.log("authcode is : ", authcode)
//         let form = new FormData();
//         form.append('grant_type', "authorization_code");
//         form.append("client_id", "4qf3c6o1kvo4ufph9jfujamiug");
//         form.append("code", authcode);
//         form.append("redirect_uri", "shyftauto://auth-callback");
//         console.log(" Formdata is  : ", form)
//         http.request({
//             url: "https://shyft-auto.auth.us-east-1.amazoncognito.com/oauth2/token",
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "Authorization": "Basic NHFmM2M2bzFrdm80dWZwaDlqZnVqYW1pdWc6MXNoN3EwaDIzZmNwa2Y0NmdxbTM5ZGJnM2g2aGI1aGNjdHNocXRiaG1lNzA0Y2JtMzIxZw=="
//             },
//             content: form
//         }).then((response) => {
//             let tokens = JSON.stringify(response.content)
//             let tokens1 = JSON.stringify(response.content)
//             let initial_refreshToken = tokens.substr((tokens.search("refresh_token") + 16))
//             let final_refreshToken = initial_refreshToken.substr(0, initial_refreshToken.indexOf('"'))
//             let initial_idToken = tokens1.substr((tokens1.search("id_token") + 11))
//             let final_idToken = initial_idToken.substr(0, initial_idToken.indexOf('"'))
//             console.log("ID token is : ", final_idToken)
//             ApplicationSettings.setString("TOKEN", JSON.stringify(final_idToken));
//             ApplicationSettings.setString("IOSToken", JSON.stringify(final_idToken));
//             ApplicationSettings.setString("RefreshToken", JSON.stringify(final_refreshToken));
//             this.close(final_idToken)
//         }, (e) => {
//             console.log("Error occurred :" + e);
//         });
//     }
//     public close(res: string) {
//         this.params.closeCallback(res);
//     }
//     public submit(res: string) {
//         this.params.closeCallback(res);
//         this.router.navigate(["login"]);
//     }
//     public pageLoaded() {
//         // this.busy = false;
//         console.log("STATE ---------------> ", this.busy)
//     }
// }
var core_1 = require("@angular/core");
var web_view_1 = require("ui/web-view");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var ApplicationSettings = require("application-settings");
var webViewInterfaceModule = require('nativescript-webview-interface');
var LoginModalComponent = (function () {
    function LoginModalComponent(params, changeDetectorRef, _page, router, route) {
        this.params = params;
        this.changeDetectorRef = changeDetectorRef;
        this._page = _page;
        this.router = router;
        this.route = route;
        this.busy = true;
    }
    LoginModalComponent.prototype.ngAfterViewInit = function () {
        this.setupWebViewInterface();
    };
    LoginModalComponent.prototype.ngOnDestroy = function () {
        // cleaning up references/listeners.
        this.oLangWebViewInterface.destroy();
        this.oLangWebViewInterface = null;
    };
    /**
     * Initializes webViewInterface for communication between webview and android/ios
     */
    LoginModalComponent.prototype.setupWebViewInterface = function () {
        var _this = this;
        var webView = this.webView.nativeElement;
        this.oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, 'https://demo.getshyftauto.com/auth-mobile/mobile-index.html');
        webView.on(web_view_1.WebView.loadFinishedEvent, function (args) {
            if (!args.error) {
                _this.loadLanguagesInWebView();
            }
        });
        this.listenLangWebViewEvents();
    };
    LoginModalComponent.prototype.loadLanguagesInWebView = function () {
        this.oLangWebViewInterface.emit('tokenEvent');
    };
    /**
     * Handles any event/command emitted by language webview.
     */
    LoginModalComponent.prototype.listenLangWebViewEvents = function () {
        // handles language selectionChange event.
        var _this = this;
        this.oLangWebViewInterface.on('onload', function (onload) {
            console.log("webview onload console", onload);
        });
        this.oLangWebViewInterface.on('id_token', function (id_token) {
            console.log("id_token console", id_token);
            _this.id_token = id_token;
            ApplicationSettings.setString("TOKEN", JSON.stringify(id_token));
            ApplicationSettings.setString("IOSToken", JSON.stringify(id_token));
        });
        this.oLangWebViewInterface.on('access_token', function (access_token) {
            console.log("access token console", access_token);
        });
        this.oLangWebViewInterface.on('refresh_token', function (refresh_token) {
            console.log("refresh token console", refresh_token);
            ApplicationSettings.setString("RefreshToken", JSON.stringify(refresh_token));
            _this.close(_this.id_token);
        });
    };
    LoginModalComponent.prototype.close = function (res) {
        this.params.closeCallback(res);
    };
    LoginModalComponent.prototype.submit = function (res) {
        this.params.closeCallback(res);
        this.router.navigate(["login"]);
    };
    LoginModalComponent.prototype.pageLoaded = function () {
        this.busy = false;
    };
    __decorate([
        core_1.ViewChild('webView'),
        __metadata("design:type", core_1.ElementRef)
    ], LoginModalComponent.prototype, "webView", void 0);
    LoginModalComponent = __decorate([
        core_1.Component({
            selector: "my-loginmodal",
            templateUrl: "loginmodal.html",
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, core_1.ChangeDetectorRef, page_1.Page, router_1.Router, router_1.ActivatedRoute])
    ], LoginModalComponent);
    return LoginModalComponent;
}());
exports.LoginModalComponent = LoginModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2lubW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlKQUFpSjtBQUNqSiwrRUFBK0U7QUFDL0Usa0NBQWtDO0FBQ2xDLDREQUE0RDtBQUM1RCxzQ0FBc0M7QUFDdEMsd0RBQXdEO0FBQ3hELCtDQUErQztBQUMvQyw2REFBNkQ7QUFDN0QsK0RBQStEO0FBQy9ELCtEQUErRDtBQUMvRCwwRUFBMEU7QUFDMUUsd0NBQXdDOztBQUV4Qyw4Q0FBOEM7QUFFOUMsOEJBQThCO0FBRTlCLGVBQWU7QUFDZixpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQsbURBQW1EO0FBQ25ELDBCQUEwQjtBQUUxQixnQkFBZ0I7QUFFaEIsaUNBQWlDO0FBQ2pDLGlEQUFpRDtBQUVqRCxpTUFBaU07QUFDak0sd0ZBQXdGO0FBQ3hGLG1GQUFtRjtBQUVuRixzREFBc0Q7QUFHdEQsd0xBQXdMO0FBRXhMLFFBQVE7QUFFUix5QkFBeUI7QUFFekIsdUNBQXVDO0FBQ3ZDLDZEQUE2RDtBQUU3RCw2RUFBNkU7QUFDN0UsOERBQThEO0FBQzlELG9EQUFvRDtBQUNwRCxpRUFBaUU7QUFDakUsaUJBQWlCO0FBR2pCLDZFQUE2RTtBQUM3RSxvQ0FBb0M7QUFDcEMsMkVBQTJFO0FBRTNFLGdFQUFnRTtBQUNoRSwrRUFBK0U7QUFDL0Usa0RBQWtEO0FBQ2xELDJDQUEyQztBQUMzQyxpRUFBaUU7QUFDakUsNkNBQTZDO0FBQzdDLGlDQUFpQztBQUNqQywyQkFBMkI7QUFDM0IsaURBQWlEO0FBQ2pELDBCQUEwQjtBQUUxQixtQkFBbUI7QUFDbkIsd0JBQXdCO0FBQ3hCLHNGQUFzRjtBQUN0Rix1QkFBdUI7QUFFdkIsNkdBQTZHO0FBRTdHLDZFQUE2RTtBQUM3RSxvQ0FBb0M7QUFFcEMsc0NBQXNDO0FBQ3RDLG1GQUFtRjtBQUNuRixtRkFBbUY7QUFDbkYsaUZBQWlGO0FBRWpGLHFEQUFxRDtBQUNyRCw0RUFBNEU7QUFDNUUsc0RBQXNEO0FBQ3RELDJFQUEyRTtBQUMzRSxnRkFBZ0Y7QUFDaEYscUZBQXFGO0FBQ3JGLG9HQUFvRztBQUNwRyx1R0FBdUc7QUFFdkcsMkJBQTJCO0FBQzNCLGdFQUFnRTtBQUNoRSwwRUFBMEU7QUFFMUUseUZBQXlGO0FBQ3pGLG9GQUFvRjtBQUVwRiwyR0FBMkc7QUFFM0csdURBQXVEO0FBRXZELDJCQUEyQjtBQUMzQixnQ0FBZ0M7QUFDaEMscURBQXFEO0FBQ3JELDJCQUEyQjtBQUMzQix5RkFBeUY7QUFDekYsMkVBQTJFO0FBRTNFLDZCQUE2QjtBQUM3Qiw2Q0FBNkM7QUFDN0MsZ0RBQWdEO0FBQ2hELHVHQUF1RztBQUN2Ryx1Q0FBdUM7QUFDdkMsMkJBQTJCO0FBRTNCLHVCQUF1QjtBQUN2QixpREFBaUQ7QUFDakQsa0RBQWtEO0FBQ2xELHVFQUF1RTtBQUN2RSw0RUFBNEU7QUFDNUUsaUZBQWlGO0FBQ2pGLGdHQUFnRztBQUNoRyxtR0FBbUc7QUFFbkcsdUJBQXVCO0FBQ3ZCLDREQUE0RDtBQUM1RCx1RUFBdUU7QUFDdkUscUZBQXFGO0FBQ3JGLGlGQUFpRjtBQUNqRix1R0FBdUc7QUFDdkcsbURBQW1EO0FBQ25ELHVCQUF1QjtBQUN2Qiw0QkFBNEI7QUFDNUIsaURBQWlEO0FBQ2pELHVCQUF1QjtBQUV2QixtQkFBbUI7QUFDbkIsd0JBQXdCO0FBQ3hCLHNFQUFzRTtBQUN0RSxtQkFBbUI7QUFDbkIsaUJBQWlCO0FBRWpCLFFBQVE7QUFFUixzQkFBc0I7QUFDdEIsbURBQW1EO0FBQ25ELDRDQUE0QztBQUM1Qyx5Q0FBeUM7QUFDekMsUUFBUTtBQUdSLHdDQUF3QztBQUV4Qyw4REFBOEQ7QUFDOUQsNkRBQTZEO0FBRTdELHdKQUF3SjtBQUV4SiwwRUFBMEU7QUFFMUUsaUNBQWlDO0FBQ2pDLG1DQUFtQztBQUNuQyxnRkFBZ0Y7QUFDaEYsZ0ZBQWdGO0FBQ2hGLDhFQUE4RTtBQUM5RSxvQkFBb0I7QUFDcEIsb0VBQW9FO0FBQ3BFLHFDQUFxQztBQUNyQyxpREFBaUQ7QUFDakQsa0VBQWtFO0FBQ2xFLDhEQUE4RDtBQUM5RCxzQkFBc0I7QUFFdEIscUZBQXFGO0FBRXJGLGdCQUFnQjtBQUNoQixjQUFjO0FBQ2QscUNBQXFDO0FBQ3JDLFFBQVE7QUFFUixzQ0FBc0M7QUFDdEMseURBQXlEO0FBRXpELDhEQUE4RDtBQUM5RCx5REFBeUQ7QUFDekQsNERBQTREO0FBQzVELGNBQWM7QUFDZCxzRUFBc0U7QUFDdEUsb0VBQW9FO0FBQ3BFLGtFQUFrRTtBQUNsRSxjQUFjO0FBQ2Qsd0VBQXdFO0FBQ3hFLDJFQUEyRTtBQUMzRSxrRUFBa0U7QUFDbEUsY0FBYztBQUVkLFFBQVE7QUFFUixtQ0FBbUM7QUFDbkMscURBQXFEO0FBQ3JELHFDQUFxQztBQUVyQywyREFBMkQ7QUFDM0Qsa0VBQWtFO0FBQ2xFLHlDQUF5QztBQUN6QyxvRUFBb0U7QUFFcEUsZ0RBQWdEO0FBRWhELHlCQUF5QjtBQUN6Qix1RkFBdUY7QUFDdkYsOEJBQThCO0FBQzlCLHlCQUF5QjtBQUN6Qix1RUFBdUU7QUFDdkUsd0pBQXdKO0FBQ3hKLGlCQUFpQjtBQUNqQiw0QkFBNEI7QUFFNUIsa0NBQWtDO0FBQ2xDLDREQUE0RDtBQUM1RCw2REFBNkQ7QUFDN0QsOEZBQThGO0FBQzlGLHlHQUF5RztBQUN6RyxzRkFBc0Y7QUFDdEYsMEZBQTBGO0FBQzFGLDJEQUEyRDtBQUMzRCxxRkFBcUY7QUFDckYsd0ZBQXdGO0FBQ3hGLGlHQUFpRztBQUVqRyx3Q0FBd0M7QUFDeEMsc0JBQXNCO0FBQ3RCLG1EQUFtRDtBQUNuRCxjQUFjO0FBQ2QsUUFBUTtBQUVSLGtDQUFrQztBQUNsQywwQ0FBMEM7QUFDMUMsUUFBUTtBQUVSLG1DQUFtQztBQUNuQywwQ0FBMEM7QUFDMUMsMkNBQTJDO0FBQzNDLFFBQVE7QUFFUiw0QkFBNEI7QUFDNUIsZ0NBQWdDO0FBQ2hDLDREQUE0RDtBQUM1RCxRQUFRO0FBQ1IsSUFBSTtBQUVKLHNDQUE4RztBQUM5Ryx3Q0FBcUQ7QUFDckQsbUVBQTRFO0FBQzVFLGdDQUErQjtBQUMvQiwwQ0FBeUQ7QUFDekQsMERBQTREO0FBRTVELElBQUksc0JBQXNCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFRdkU7SUFVRSw2QkFBb0IsTUFBeUIsRUFBVSxpQkFBb0MsRUFBVSxLQUFXLEVBQVUsTUFBYyxFQUFVLEtBQXFCO1FBQW5KLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFEL0osU0FBSSxHQUFHLElBQUksQ0FBQztJQUdwQixDQUFDO0lBRUQsNkNBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCx5Q0FBVyxHQUFYO1FBQ0Usb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUFHRDs7T0FFRztJQUNLLG1EQUFxQixHQUE3QjtRQUFBLGlCQVlDO1FBWEMsSUFBSSxPQUFPLEdBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFFbEQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLDZEQUE2RCxDQUFDLENBQUM7UUFFakosT0FBTyxDQUFDLEVBQUUsQ0FBQyxrQkFBTyxDQUFDLGlCQUFpQixFQUFFLFVBQUMsSUFBbUI7WUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDaEMsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUdPLG9EQUFzQixHQUE5QjtRQUNFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOztPQUVHO0lBQ0sscURBQXVCLEdBQS9CO1FBQ0UsMENBQTBDO1FBRDVDLGlCQXdCQztRQXJCQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLE1BQU07WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBQyxNQUFNLENBQUMsQ0FBQTtRQUM5QyxDQUFDLENBQUMsQ0FBQztRQUdILElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQUMsUUFBUTtZQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3hDLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsVUFBQyxZQUFZO1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUMsWUFBWSxDQUFDLENBQUE7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFDLGFBQWE7WUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBQyxhQUFhLENBQUMsQ0FBQTtZQUN0QyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM3RSxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFVyxtQ0FBSyxHQUFaLFVBQWEsR0FBVztRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sb0NBQU0sR0FBYixVQUFjLEdBQVc7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSx3Q0FBVSxHQUFqQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUF0RmU7UUFBckIsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7a0NBQVUsaUJBQVU7d0RBQUM7SUFEL0IsbUJBQW1CO1FBSi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsaUJBQWlCO1NBQ2pDLENBQUM7eUNBVzRCLDJCQUFpQixFQUE2Qix3QkFBaUIsRUFBaUIsV0FBSSxFQUFrQixlQUFNLEVBQWlCLHVCQUFjO09BVjVKLG1CQUFtQixDQXdGL0I7SUFBRCwwQkFBQztDQUFBLEFBeEZELElBd0ZDO0FBeEZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkluaXQsIERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgVGVtcGxhdGVSZWYsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuLy8gaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG4vLyBpbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbi8vIGltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG4vLyBpbXBvcnQgeyBTd2l0Y2ggfSBmcm9tIFwidWkvc3dpdGNoXCI7XG4vLyBpbXBvcnQgeyBXZWJWaWV3LCBMb2FkRXZlbnREYXRhIH0gZnJvbSBcInVpL3dlYi12aWV3XCI7XG4vLyBpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuLy8gaW1wb3J0IHsgQWN0aXZpdHlJbmRpY2F0b3IgfSBmcm9tIFwidWkvYWN0aXZpdHktaW5kaWNhdG9yXCI7XG4vLyBpbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuLy8gaW1wb3J0IHsgaXNBbmRyb2lkLCBpc0lPUywgZGV2aWNlLCBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcbi8vIGxldCB3ZWJWaWV3SW50ZXJmYWNlTW9kdWxlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXdlYnZpZXctaW50ZXJmYWNlJyk7XG4vLyByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiKTtcblxuLy8gdmFyIHdlYlZpZXdNb2R1bGUgPSByZXF1aXJlKCd1aS93ZWItdmlldycpO1xuXG4vLyB2YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG4vLyBAQ29tcG9uZW50KHtcbi8vICAgICBzZWxlY3RvcjogXCJteS1sb2dpbm1vZGFsXCIsXG4vLyAgICAgdGVtcGxhdGVVcmw6IFwibG9naW5tb2RhbC5odG1sXCIsXG4vLyB9KVxuLy8gZXhwb3J0IGNsYXNzIExvZ2luTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuLy8gICAgIHB1YmxpYyBhY3Rpdml0eUluZGljYXRvcjogQWN0aXZpdHlJbmRpY2F0b3I7XG4vLyAgICAgcHVibGljIGJ1c3kgPSB0cnVlO1xuXG4vLyAgICAgaWRfdG9rZW47XG5cbi8vICAgICBwcml2YXRlIG9XZWJWaWV3SW50ZXJmYWNlO1xuLy8gICAgIEBWaWV3Q2hpbGQoJ3dlYlZpZXcnKSB3ZWJWaWV3OiBFbGVtZW50UmVmO1xuXG4vLyAgICAgLy8gcHVibGljIHdlYlZpZXdTcmM6IHN0cmluZyA9IFwiaHR0cHM6Ly9zaHlmdC1hdXRvLmF1dGgudXMtZWFzdC0xLmFtYXpvbmNvZ25pdG8uY29tL2xvZ2luP3Jlc3BvbnNlX3R5cGU9Y29kZSZjbGllbnRfaWQ9NHFmM2M2bzFrdm80dWZwaDlqZnVqYW1pdWcmcmVkaXJlY3RfdXJpPXNoeWZ0YXV0bzovL2F1dGgtY2FsbGJhY2tcIjtcbi8vICAgICAvLyBwdWJsaWMgd2ViVmlld1NyYzogc3RyaW5nID0gXCJodHRwczovL3VhdC5mdXR1cmVkbXMuY29tL2F1dGgvaG9tZS9tb2JpbGVsb2dpblwiO1xuLy8gICAgIHB1YmxpYyB3ZWJWaWV3U3JjOiBzdHJpbmcgPSBcImh0dHBzOi8vZGVtby5nZXRzaHlmdGF1dG8uY29tL2F1dGgvaG9tZS9sb2dpblwiO1xuXG4vLyAgICAgQFZpZXdDaGlsZChcImFjdGl2aXR5SW5kaWNhdG9yXCIpIGFjOiBFbGVtZW50UmVmO1xuXG5cbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLCBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcblxuLy8gICAgIH1cblxuLy8gICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4vLyAgICAgICAgIHRoaXMuc2V0dXBXZWJWaWV3SW50ZXJmYWNlKClcbi8vICAgICAgICAgbGV0IHdlYlZpZXc6IFdlYlZpZXcgPSB0aGlzLndlYlZpZXcubmF0aXZlRWxlbWVudDtcblxuLy8gICAgICAgICAvLyB3ZWJWaWV3Lm9uKHdlYlZpZXdNb2R1bGUuV2ViVmlldy51cmxQcm9wZXJ0eSwgKGNoYW5nZUFyZ3MpID0+IHtcbi8vICAgICAgICAgLy8gICAgIGNvbnNvbGUuZGlyKFwiV2ViVmlldyBSZXN1bHQgXCIsIGNoYW5nZUFyZ3MpOyBcbi8vICAgICAgICAgLy8gICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHRoZSBVUkwgaGVyZS5cbi8vICAgICAgICAgLy8gICAgIC8vIEUuZy4gZXh0cmFjdCB0aGUgdG9rZW4gYW5kIGhpZGUgdGhlIFdlYlZpZXcuXG4vLyAgICAgICAgIC8vIH0pO1xuXG5cbi8vICAgICAgICAgLy8gd2ViVmlldy5vbihXZWJWaWV3LmxvYWRTdGFydGVkRXZlbnQsIChhcmdzOiBMb2FkRXZlbnREYXRhKSA9PiB7XG4vLyAgICAgICAgIC8vICAgICBpZiAoIWFyZ3MuZXJyb3IpIHtcbi8vICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3MgZnJvbSBXZWJWaWV3IDogXCIrIGFyZ3MudXJsKSAgICAgXG5cbi8vICAgICAgICAgLy8gICAgICAgICBsZXQgdXJsID0gXCJ3d3cuXCIrYXJncy51cmwgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAvLyAgICAgICAgIGxldCBjb2RlID0gYXJncy51cmwuc3Vic3RyKChhcmdzLnVybC5zZWFyY2goXCJjb2RlXCIpICsgNSkpXG4vLyAgICAgICAgIC8vICAgICAgICAgaWYodXJsLnNlYXJjaChcImNvZGU9XCIpID4gMCl7XG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuYnVzeSA9IHRydWU7XG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnVzeSBzdGF0ZSA6IFwiLCB0aGlzLmJ1c3kpXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW4oY29kZSlcbi8vICAgICAgICAgLy8gICAgICAgICB9ICAgICAgICAgIFxuLy8gICAgICAgICAvLyAgICAgICAgIGVsc2V7XG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuYnVzeSA9ICF0aGlzLmJ1c3k7XG4vLyAgICAgICAgIC8vICAgICAgICAgfSAgIFxuXG4vLyAgICAgICAgIC8vICAgICB9XG4vLyAgICAgICAgIC8vICAgICBlbHNlIHtcbi8vICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGZyb20gd2ViVmlldyA6IFwiLCBhcmdzLmVycm9yKSAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgLy8gICB9fSk7ICAgXG5cbi8vICAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKiBXb3JraW5nIGZvciBuZXcgTG9naW4gU2NyZWVuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cblxuLy8gICAgICAgICAvLyB3ZWJWaWV3Lm9uKFdlYlZpZXcubG9hZFN0YXJ0ZWRFdmVudCwgKGFyZ3M6IExvYWRFdmVudERhdGEpID0+IHtcbi8vICAgICAgICAgLy8gICAgIGlmICghYXJncy5lcnJvcikge1xuXG4vLyAgICAgICAgIC8vICAgICAgICAgaWYgKGlzQW5kcm9pZCkge1xuLy8gICAgICAgICAvLyAgICAgICAgICAgICB3ZWJWaWV3LmFuZHJvaWQuZ2V0U2V0dGluZ3MoKS5zZXREb21TdG9yYWdlRW5hYmxlZCh0cnVlKTtcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgd2ViVmlldy5hbmRyb2lkLmdldFNldHRpbmdzKCkuc2V0SmF2YVNjcmlwdEVuYWJsZWQodHJ1ZSk7XG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIHdlYlZpZXcuYW5kcm9pZC5nZXRTZXR0aW5ncygpLnNldERhdGFiYXNlRW5hYmxlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIGxldCB1cmwgPSBcInd3dy5cIiArIGFyZ3MudXJsXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIFN1Y2Nlc3MgZnJvbSBXZWJWaWV3IDogXCIgKyBhcmdzLnVybClcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgaWYgKHVybC5zZWFyY2goXCJpZD1cIikgPiAwKSB7XG4vLyAgICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBTdWNjZXNzIGZyb20gV2ViVmlldyA6IFwiICsgdXJsKVxuLy8gICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5pZF90b2tlbiA9IHVybC5zdWJzdHIoKHVybC5zZWFyY2goXCJpZFwiKSArIDMpKVxuLy8gICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIgU3VjY2VzcyBmcm9tIFdlYlZpZXcgOiBcIiArIHRoaXMuaWRfdG9rZW4pXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIlRPS0VOXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuaWRfdG9rZW4pKTtcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiSU9TVG9rZW5cIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5pZF90b2tlbikpO1xuXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgLy8gICAgICAgICAgICAgZWxzZSBpZiAodXJsLnNlYXJjaChcInJlZnJlc2g9XCIpID4gMCkge1xuLy8gICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzIGZyb20gV2ViVmlldyA6IFwiICsgdXJsKVxuXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgcmVmcmVzaF90b2tlbiA9IHVybC5zdWJzdHIoKHVybC5zZWFyY2goXCJyZWZyZXNoXCIpICsgOCkpXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3MgZnJvbSBXZWJWaWV3IDogXCIgKyByZWZyZXNoX3Rva2VuKVxuXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIlJlZnJlc2hUb2tlblwiLCBKU09OLnN0cmluZ2lmeShyZWZyZXNoX3Rva2VuKSk7XG5cbi8vICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UodGhpcy5pZF90b2tlbilcblxuLy8gICAgICAgICAvLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIGVsc2Uge1xuLy8gICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5idXN5ID0gIXRoaXMuYnVzeTtcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAvLyAgICAgICAgICAgICB3ZWJWaWV3Lm9uKHdlYlZpZXdNb2R1bGUuV2ViVmlldy51cmxQcm9wZXJ0eSwgKGNoYW5nZUFyZ3MpID0+IHtcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2ViVmlldyBSZXN1bHQgOiBcIiwgY2hhbmdlQXJncyk7XG5cbi8vICAgICAgICAgLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UpIHtcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuLy8gICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9jYWxzdG9yYWdlIGl0ZW0gOiBcIiwgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2tsb3VkZG1zJykpXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9LCAxNjAwMClcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vICAgICAgICAgfVxuLy8gICAgICAgICAvLyAgICAgICAgIGxldCB1cmwgPSBcInd3dy5cIiArIGFyZ3MudXJsXG4vLyAgICAgICAgIC8vICAgICAgICAgaWYgKHVybC5zZWFyY2goXCJpZD1cIikgPiAwKSB7XG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIFN1Y2Nlc3MgZnJvbSBXZWJWaWV3IDogXCIgKyB1cmwpXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuaWRfdG9rZW4gPSB1cmwuc3Vic3RyKCh1cmwuc2VhcmNoKFwiaWRcIikgKyAzKSlcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCIgU3VjY2VzcyBmcm9tIFdlYlZpZXcgOiBcIiArIHRoaXMuaWRfdG9rZW4pXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiVE9LRU5cIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5pZF90b2tlbikpO1xuLy8gICAgICAgICAvLyAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIklPU1Rva2VuXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuaWRfdG9rZW4pKTtcblxuLy8gICAgICAgICAvLyAgICAgICAgIH1cbi8vICAgICAgICAgLy8gICAgICAgICBlbHNlIGlmICh1cmwuc2VhcmNoKFwicmVmcmVzaD1cIikgPiAwKSB7XG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIFN1Y2Nlc3MgZnJvbSBXZWJWaWV3IDogXCIgKyB1cmwpXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIGxldCByZWZyZXNoX3Rva2VuID0gdXJsLnN1YnN0cigodXJsLnNlYXJjaChcInJlZnJlc2hcIikgKyA4KSlcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCIgU3VjY2VzcyBmcm9tIFdlYlZpZXcgOiBcIiArIHJlZnJlc2hfdG9rZW4pXG4vLyAgICAgICAgIC8vICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiUmVmcmVzaFRva2VuXCIsIEpTT04uc3RyaW5naWZ5KHJlZnJlc2hfdG9rZW4pKTtcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5jbG9zZSh0aGlzLmlkX3Rva2VuKVxuLy8gICAgICAgICAvLyAgICAgICAgIH1cbi8vICAgICAgICAgLy8gICAgICAgICBlbHNlIHtcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5idXN5ID0gIXRoaXMuYnVzeTtcbi8vICAgICAgICAgLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gICAgIH1cbi8vICAgICAgICAgLy8gICAgIGVsc2Uge1xuLy8gICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZnJvbSB3ZWJWaWV3IDogXCIsIGFyZ3MuZXJyb3IpXG4vLyAgICAgICAgIC8vICAgICB9XG4vLyAgICAgICAgIC8vIH0pO1xuICAgICAgXG4vLyAgICAgfVxuICBcbi8vICAgICBuZ09uRGVzdHJveSgpIHtcbi8vICAgICAgICAgICAgIC8vIGNsZWFuaW5nIHVwIHJlZmVyZW5jZXMvbGlzdGVuZXJzLlxuLy8gICAgICAgICB0aGlzLm9XZWJWaWV3SW50ZXJmYWNlLmRlc3Ryb3koKTtcbi8vICAgICAgICAgdGhpcy5vV2ViVmlld0ludGVyZmFjZSA9IG51bGw7XG4vLyAgICAgfVxuXG4gICAgICAgIFxuLy8gICAgIHByaXZhdGUgc2V0dXBXZWJWaWV3SW50ZXJmYWNlKCkge1xuXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiKioqKioqKiBzZXR1cFdlYlZpZXdJbnRlcmZhY2UgKioqKioqXCIpXG4vLyAgICAgICAgIGxldCB3ZWJWaWV3OiBXZWJWaWV3ID0gdGhpcy53ZWJWaWV3Lm5hdGl2ZUVsZW1lbnQ7XG5cbi8vICAgICAgICAgdGhpcy5vV2ViVmlld0ludGVyZmFjZSA9IG5ldyB3ZWJWaWV3SW50ZXJmYWNlTW9kdWxlLldlYlZpZXdJbnRlcmZhY2Uod2ViVmlldywgJ2h0dHBzOi8vZGVtby5nZXRzaHlmdGF1dG8uY29tL2F1dGgtbW9iaWxlL21vYmlsZS1pbmRleC5odG1sJyk7XG5cbi8vICAgICAgICAgd2ViVmlldy5vbihXZWJWaWV3LmxvYWRTdGFydGVkRXZlbnQsIChhcmdzOiBMb2FkRXZlbnREYXRhKSA9PiB7XG5cbi8vICAgICAgICAgICAgIGlmICghYXJncy5lcnJvcikge1xuLy8gICAgICAgICAgICAgICAgIGlmIChpc0FuZHJvaWQpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgd2ViVmlldy5hbmRyb2lkLmdldFNldHRpbmdzKCkuc2V0RG9tU3RvcmFnZUVuYWJsZWQodHJ1ZSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIHdlYlZpZXcuYW5kcm9pZC5nZXRTZXR0aW5ncygpLnNldEphdmFTY3JpcHRFbmFibGVkKHRydWUpO1xuLy8gICAgICAgICAgICAgICAgICAgICB3ZWJWaWV3LmFuZHJvaWQuZ2V0U2V0dGluZ3MoKS5zZXREYXRhYmFzZUVuYWJsZWQodHJ1ZSk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2VzcyBmcm9tIFdlYlZpZXcgLSBcIiArIGFyZ3MudXJsKVxuLy8gICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuLy8gICAgICAgICAgICAgICAgIC8vIHRoaXMubGlzdGVuV2ViVmlld0V2ZW50cygpO1xuLy8gICAgICAgICAgICAgICAgIHRoaXMub1dlYlZpZXdJbnRlcmZhY2Uub24oJ29ubG9hZCcsIChvbmxvYWQpPT57XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25sb2FkICBldmVudCA6IFwiLCBvbmxvYWQpXG4vLyAgICAgICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5vV2ViVmlld0ludGVyZmFjZS5lbWl0KCd0b2tlbkV2ZW50Jyk7ICAgICAgICAgICAgICAgICAgICBcblxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9KTtcbi8vICAgICAgICAgdGhpcy5saXN0ZW5XZWJWaWV3RXZlbnRzKClcbi8vICAgICB9XG5cbi8vICAgICBwcml2YXRlIGxpc3RlbldlYlZpZXdFdmVudHMoKSB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiICoqKioqIGxpc3RlbldlYlZpZXdFdmVudHMgKioqKlwiKVxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5vV2ViVmlld0ludGVyZmFjZS5vbignaWRfdG9rZW4nLCAoaWRfdG9rZW4pPT57XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlkIHRva2VuIGV2ZW50IDogXCIsIGlkX3Rva2VuKVxuLy8gICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICB0aGlzLm9XZWJWaWV3SW50ZXJmYWNlLm9uKCdhY2Nlc3NfdG9rZW4nLCAoYWNjZXNzX3Rva2VuKT0+e1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY2Nlc3MgdG9rZW4gZXZlbnQgOiBcIiwgYWNjZXNzX3Rva2VuKSAgIFxuLy8gICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7ICAgICAgICAgICAgXG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICB0aGlzLm9XZWJWaWV3SW50ZXJmYWNlLm9uKCdyZWZyZXNoX3Rva2VuJywgKHJlZnJlc2hfdG9rZW4pPT57XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZnJlc2ggdG9rZW4gZXZlbnQgOiBcIiwgcmVmcmVzaF90b2tlbikgICAgICAgIFxuLy8gICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7ICAgICAgICAgICAgXG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgfVxuXG4vLyAgICAgcHJpdmF0ZSBnZXRUb2tlbihhdXRoY29kZSkge1xuLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhcImF1dGhjb2RlIGlzIDogXCIsIGF1dGhjb2RlKVxuLy8gICAgICAgICBsZXQgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4vLyAgICAgICAgIGZvcm0uYXBwZW5kKCdncmFudF90eXBlJywgXCJhdXRob3JpemF0aW9uX2NvZGVcIik7XG4vLyAgICAgICAgIGZvcm0uYXBwZW5kKFwiY2xpZW50X2lkXCIsIFwiNHFmM2M2bzFrdm80dWZwaDlqZnVqYW1pdWdcIik7XG4vLyAgICAgICAgIGZvcm0uYXBwZW5kKFwiY29kZVwiLCBhdXRoY29kZSk7XG4vLyAgICAgICAgIGZvcm0uYXBwZW5kKFwicmVkaXJlY3RfdXJpXCIsIFwic2h5ZnRhdXRvOi8vYXV0aC1jYWxsYmFja1wiKTtcblxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIiBGb3JtZGF0YSBpcyAgOiBcIiwgZm9ybSlcblxuLy8gICAgICAgICBodHRwLnJlcXVlc3Qoe1xuLy8gICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vc2h5ZnQtYXV0by5hdXRoLnVzLWVhc3QtMS5hbWF6b25jb2duaXRvLmNvbS9vYXV0aDIvdG9rZW5cIixcbi8vICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4vLyAgICAgICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbi8vICAgICAgICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBOSEZtTTJNMmJ6RnJkbTgwZFdad2FEbHFablZxWVcxcGRXYzZNWE5vTjNFd2FESXpabU53YTJZME5tZHhiVE01WkdKbk0yZzJhR0kxYUdOamRITm9jWFJpYUcxbE56QTBZMkp0TXpJeFp3PT1cIlxuLy8gICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgIGNvbnRlbnQ6IGZvcm1cblxuLy8gICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuLy8gICAgICAgICAgICAgbGV0IHRva2VucyA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmNvbnRlbnQpXG4vLyAgICAgICAgICAgICBsZXQgdG9rZW5zMSA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmNvbnRlbnQpXG4vLyAgICAgICAgICAgICBsZXQgaW5pdGlhbF9yZWZyZXNoVG9rZW4gPSB0b2tlbnMuc3Vic3RyKCh0b2tlbnMuc2VhcmNoKFwicmVmcmVzaF90b2tlblwiKSArIDE2KSlcbi8vICAgICAgICAgICAgIGxldCBmaW5hbF9yZWZyZXNoVG9rZW4gPSBpbml0aWFsX3JlZnJlc2hUb2tlbi5zdWJzdHIoMCwgaW5pdGlhbF9yZWZyZXNoVG9rZW4uaW5kZXhPZignXCInKSlcbi8vICAgICAgICAgICAgIGxldCBpbml0aWFsX2lkVG9rZW4gPSB0b2tlbnMxLnN1YnN0cigodG9rZW5zMS5zZWFyY2goXCJpZF90b2tlblwiKSArIDExKSlcbi8vICAgICAgICAgICAgIGxldCBmaW5hbF9pZFRva2VuID0gaW5pdGlhbF9pZFRva2VuLnN1YnN0cigwLCBpbml0aWFsX2lkVG9rZW4uaW5kZXhPZignXCInKSlcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSUQgdG9rZW4gaXMgOiBcIiwgZmluYWxfaWRUb2tlbilcbi8vICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiVE9LRU5cIiwgSlNPTi5zdHJpbmdpZnkoZmluYWxfaWRUb2tlbikpO1xuLy8gICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJJT1NUb2tlblwiLCBKU09OLnN0cmluZ2lmeShmaW5hbF9pZFRva2VuKSk7XG4vLyAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIlJlZnJlc2hUb2tlblwiLCBKU09OLnN0cmluZ2lmeShmaW5hbF9yZWZyZXNoVG9rZW4pKTtcblxuLy8gICAgICAgICAgICAgdGhpcy5jbG9zZShmaW5hbF9pZFRva2VuKVxuLy8gICAgICAgICB9LCAoZSkgPT4ge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBvY2N1cnJlZCA6XCIgKyBlKTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfVxuXG4vLyAgICAgcHVibGljIGNsb3NlKHJlczogc3RyaW5nKSB7XG4vLyAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socmVzKTtcbi8vICAgICB9XG5cbi8vICAgICBwdWJsaWMgc3VibWl0KHJlczogc3RyaW5nKSB7XG4vLyAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socmVzKTtcbi8vICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wibG9naW5cIl0pO1xuLy8gICAgIH1cblxuLy8gICAgIHB1YmxpYyBwYWdlTG9hZGVkKCkge1xuLy8gICAgICAgICAvLyB0aGlzLmJ1c3kgPSBmYWxzZTtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJTVEFURSAtLS0tLS0tLS0tLS0tLS0+IFwiLCB0aGlzLmJ1c3kpXG4vLyAgICAgfVxuLy8gfVxuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBXZWJWaWV3LCBMb2FkRXZlbnREYXRhIH0gZnJvbSAndWkvd2ViLXZpZXcnO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuXG5sZXQgd2ViVmlld0ludGVyZmFjZU1vZHVsZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC13ZWJ2aWV3LWludGVyZmFjZScpO1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibXktbG9naW5tb2RhbFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImxvZ2lubW9kYWwuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbk1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnd2ViVmlldycpIHdlYlZpZXc6IEVsZW1lbnRSZWY7XG5cbiAgbGFuZ3VhZ2U6IHN0cmluZztcblxuICBzZWxlY3RlZExhbmd1YWdlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBpZF90b2tlbjtcbiAgcHJpdmF0ZSBvTGFuZ1dlYlZpZXdJbnRlcmZhY2U7XG4gIHByaXZhdGUgYnVzeSA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcywgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnNldHVwV2ViVmlld0ludGVyZmFjZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gY2xlYW5pbmcgdXAgcmVmZXJlbmNlcy9saXN0ZW5lcnMuXG4gICAgdGhpcy5vTGFuZ1dlYlZpZXdJbnRlcmZhY2UuZGVzdHJveSgpO1xuICAgIHRoaXMub0xhbmdXZWJWaWV3SW50ZXJmYWNlID0gbnVsbDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHdlYlZpZXdJbnRlcmZhY2UgZm9yIGNvbW11bmljYXRpb24gYmV0d2VlbiB3ZWJ2aWV3IGFuZCBhbmRyb2lkL2lvc1xuICAgKi9cbiAgcHJpdmF0ZSBzZXR1cFdlYlZpZXdJbnRlcmZhY2UoKSB7XG4gICAgbGV0IHdlYlZpZXc6IFdlYlZpZXcgPSB0aGlzLndlYlZpZXcubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMub0xhbmdXZWJWaWV3SW50ZXJmYWNlID0gbmV3IHdlYlZpZXdJbnRlcmZhY2VNb2R1bGUuV2ViVmlld0ludGVyZmFjZSh3ZWJWaWV3LCAnaHR0cHM6Ly9kZW1vLmdldHNoeWZ0YXV0by5jb20vYXV0aC1tb2JpbGUvbW9iaWxlLWluZGV4Lmh0bWwnKTtcblxuICAgIHdlYlZpZXcub24oV2ViVmlldy5sb2FkRmluaXNoZWRFdmVudCwgKGFyZ3M6IExvYWRFdmVudERhdGEpID0+IHtcbiAgICAgIGlmICghYXJncy5lcnJvcikge1xuICAgICAgICB0aGlzLmxvYWRMYW5ndWFnZXNJbldlYlZpZXcoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubGlzdGVuTGFuZ1dlYlZpZXdFdmVudHMoKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBsb2FkTGFuZ3VhZ2VzSW5XZWJWaWV3KCkge1xuICAgIHRoaXMub0xhbmdXZWJWaWV3SW50ZXJmYWNlLmVtaXQoJ3Rva2VuRXZlbnQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFueSBldmVudC9jb21tYW5kIGVtaXR0ZWQgYnkgbGFuZ3VhZ2Ugd2Vidmlldy5cbiAgICovXG4gIHByaXZhdGUgbGlzdGVuTGFuZ1dlYlZpZXdFdmVudHMoKSB7XG4gICAgLy8gaGFuZGxlcyBsYW5ndWFnZSBzZWxlY3Rpb25DaGFuZ2UgZXZlbnQuXG4gICAgXG4gICAgdGhpcy5vTGFuZ1dlYlZpZXdJbnRlcmZhY2Uub24oJ29ubG9hZCcsIChvbmxvYWQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwid2VidmlldyBvbmxvYWQgY29uc29sZVwiLG9ubG9hZClcbiAgICB9KTtcblxuXG4gICAgdGhpcy5vTGFuZ1dlYlZpZXdJbnRlcmZhY2Uub24oJ2lkX3Rva2VuJywgKGlkX3Rva2VuKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImlkX3Rva2VuIGNvbnNvbGVcIixpZF90b2tlbilcbiAgICAgIHRoaXMuaWRfdG9rZW4gPSBpZF90b2tlbjtcbiAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiVE9LRU5cIiwgSlNPTi5zdHJpbmdpZnkoaWRfdG9rZW4pKTtcbiAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiSU9TVG9rZW5cIiwgSlNPTi5zdHJpbmdpZnkoaWRfdG9rZW4pKTtcbiAgICB9KTtcblxuICAgIHRoaXMub0xhbmdXZWJWaWV3SW50ZXJmYWNlLm9uKCdhY2Nlc3NfdG9rZW4nLCAoYWNjZXNzX3Rva2VuKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWNjZXNzIHRva2VuIGNvbnNvbGVcIixhY2Nlc3NfdG9rZW4pXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5vTGFuZ1dlYlZpZXdJbnRlcmZhY2Uub24oJ3JlZnJlc2hfdG9rZW4nLCAocmVmcmVzaF90b2tlbikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlZnJlc2ggdG9rZW4gY29uc29sZVwiLHJlZnJlc2hfdG9rZW4pXG4gICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiUmVmcmVzaFRva2VuXCIsIEpTT04uc3RyaW5naWZ5KHJlZnJlc2hfdG9rZW4pKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh0aGlzLmlkX3Rva2VuKVxuICAgICAgfSk7XG4gIH1cblxuICAgICAgIHB1YmxpYyBjbG9zZShyZXM6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhyZXMpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHB1YmxpYyBzdWJtaXQocmVzOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImxvZ2luXCJdKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBwdWJsaWMgcGFnZUxvYWRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgICAgICB9XG59Il19