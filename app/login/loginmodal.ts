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

import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { WebView, LoadEventData } from 'ui/web-view';
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Page } from "ui/page";
import { Router, ActivatedRoute } from "@angular/router";
import * as ApplicationSettings from "application-settings";

let webViewInterfaceModule = require('nativescript-webview-interface');



@Component({
    selector: "my-loginmodal",
    templateUrl: "loginmodal.html",
})
export class LoginModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('webView') webView: ElementRef;

  language: string;

  selectedLanguage: string;

  private id_token;
  private oLangWebViewInterface;
  private busy = true;
  constructor(private params: ModalDialogParams, private changeDetectorRef: ChangeDetectorRef, private _page: Page, private router: Router, private route: ActivatedRoute) {

  }

  ngAfterViewInit() {
    this.setupWebViewInterface();
  }

  ngOnDestroy() {
    // cleaning up references/listeners.
    this.oLangWebViewInterface.destroy();
    this.oLangWebViewInterface = null;
  }


  /**
   * Initializes webViewInterface for communication between webview and android/ios
   */
  private setupWebViewInterface() {
    let webView: WebView = this.webView.nativeElement;

    this.oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, 'https://demo.getshyftauto.com/auth-mobile/mobile-index.html');

    webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
      if (!args.error) {
        this.loadLanguagesInWebView();
      }
    });

    this.listenLangWebViewEvents();
  }


  private loadLanguagesInWebView() {
    this.oLangWebViewInterface.emit('tokenEvent');
  }

  /**
   * Handles any event/command emitted by language webview.
   */
  private listenLangWebViewEvents() {
    // handles language selectionChange event.
    
    this.oLangWebViewInterface.on('onload', (onload) => {
      console.log("webview onload console",onload)
    });


    this.oLangWebViewInterface.on('id_token', (id_token) => {
      console.log("id_token console",id_token)
      this.id_token = id_token;
      ApplicationSettings.setString("TOKEN", JSON.stringify(id_token));
      ApplicationSettings.setString("IOSToken", JSON.stringify(id_token));
    });

    this.oLangWebViewInterface.on('access_token', (access_token) => {
        console.log("access token console",access_token)
      });

      this.oLangWebViewInterface.on('refresh_token', (refresh_token) => {
        console.log("refresh token console",refresh_token)
                    ApplicationSettings.setString("RefreshToken", JSON.stringify(refresh_token));
                    this.close(this.id_token)
      });
  }

       public close(res: string) {
            this.params.closeCallback(res);
        }
    
        public submit(res: string) {
            this.params.closeCallback(res);
            this.router.navigate(["login"]);
        }
    
        public pageLoaded() {
            this.busy = false;
        }
}