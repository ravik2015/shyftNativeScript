// import { Component, ElementRef, ViewChild, OnInit, Directive, ViewContainerRef, TemplateRef, Inject } from "@angular/core";
// import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
// import { Page } from "ui/page";
// import { Router, ActivatedRoute } from "@angular/router";
// import { Switch } from "ui/switch";
// import { WebView, LoadEventData } from "ui/web-view";
// import { ActivityIndicator } from "ui/activity-indicator";
// import * as ApplicationSettings from "application-settings";
// var http = require("http");

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

import { Component, ElementRef, ViewChild, OnInit, Directive, ViewContainerRef, TemplateRef, Inject } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Page } from "ui/page";
import { Router, ActivatedRoute } from "@angular/router";
import { Switch } from "ui/switch";
import { WebView, LoadEventData } from "ui/web-view";
import { EventData } from 'data/observable';
import { ActivityIndicator } from "ui/activity-indicator";
import * as ApplicationSettings from "application-settings";
import { isAndroid, isIOS, device, screen } from "platform";

var webViewModule = require('ui/web-view');

var http = require("http");

@Component({
    selector: "my-signupmodal",
    templateUrl: "signupmodal.html",
})
export class SignupModalComponent implements OnInit {
    public activityIndicator: ActivityIndicator;
    public busy = true;
    id_token;

    @ViewChild('webView') webView: ElementRef;
    
    // public webViewSrc: string = "https://shyft-auto.auth.us-east-1.amazoncognito.com/signup?response_type=code&client_id=4qf3c6o1kvo4ufph9jfujamiug&redirect_uri=shyftauto://auth-callback";
    // public webViewSrc: string = "https://uat.futuredms.com/auth/home/mobilelogin";
    public webViewSrc: string = "https://demo.getshyftauto.com/auth/home/register";
    
    @ViewChild("activityIndicator") ac: ElementRef;


    public constructor(private params: ModalDialogParams, private _page: Page, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        let webView: WebView = this.webView.nativeElement;
        
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

        webView.on(WebView.loadStartedEvent, (args: LoadEventData) => {
            if (!args.error) {

                if (isAndroid) {
                    webView.android.getSettings().setDomStorageEnabled(true);
                    webView.android.getSettings().setJavaScriptEnabled(true);
                    webView.android.getSettings().setDatabaseEnabled(true); 
                    
                    let url = "www." + args.url
                    console.log("Success from WebView : " + args.url)
                    if (url.search("id=") > 0) {
                        console.log("Success from WebView : " + url)
                        this.id_token = url.substr((url.search("id") + 3))
                        console.log("Success from WebView : " + this.id_token)
                        ApplicationSettings.setString("TOKEN", JSON.stringify(this.id_token));
                        ApplicationSettings.setString("IOSToken", JSON.stringify(this.id_token));

                    }
                    else if (url.search("refresh=") > 0) {
                        console.log(" Success from WebView : " + url)

                        let refresh_token = url.substr((url.search("refresh") + 8))
                        console.log(" Success from WebView : " + refresh_token)

                        ApplicationSettings.setString("RefreshToken", JSON.stringify(refresh_token));

                        this.close(this.id_token)

                    }
                    else {
                        this.busy = !this.busy;
                    }
                    webView.on(webViewModule.WebView.urlProperty, (changeArgs) => {
                        console.dir("WebView Result ", changeArgs);

                    });
                    if (localStorage) {
                        setTimeout(() => {
                            console.log("localstorage ittem : ", localStorage.getItem('klouddms'))
                        }, 16000)
                    }

                }
                let url = "www." + args.url
                if (url.search("id=") > 0) {
                    console.log("Success from WebView : " + url)
                    this.id_token = url.substr((url.search("id") + 3))
                    console.log("Success from WebView : " + this.id_token)
                    ApplicationSettings.setString("TOKEN", JSON.stringify(this.id_token));
                    ApplicationSettings.setString("IOSToken", JSON.stringify(this.id_token));

                }
                else if (url.search("refresh=") > 0) {
                    console.log("Success from WebView : " + url)

                    let refresh_token = url.substr((url.search("refresh") + 8))
                    console.log("Success from WebView : " + refresh_token)

                    ApplicationSettings.setString("RefreshToken", JSON.stringify(refresh_token));

                    this.close(this.id_token)

                }
                else {
                    this.busy = !this.busy;
                }

            }
            else {
                console.log("Error from webView : ", args.error)
            }
        });

    }

    private getToken(authcode) {
        console.log("authcode is : ", authcode)
        let form  = new FormData();
        
        form.append('grant_type', "authorization_code");
        form.append("client_id" , "4qf3c6o1kvo4ufph9jfujamiug");
        form.append("code" , authcode);
        form.append("redirect_uri" , "shyftauto://auth-callback");
        
        console.log("Formdata is  : ", form)

        http.request({
            url: "https://shyft-auto.auth.us-east-1.amazoncognito.com/oauth2/token",
            method: "POST",
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization" : "Basic NHFmM2M2bzFrdm80dWZwaDlqZnVqYW1pdWc6MXNoN3EwaDIzZmNwa2Y0NmdxbTM5ZGJnM2g2aGI1aGNjdHNocXRiaG1lNzA0Y2JtMzIxZw=="
             },
            content: form
    
        }).then((response) => {
            let tokens = JSON.stringify(response.content)
            let tokens1 = JSON.stringify(response.content)            
            let initial_refreshToken = tokens.substr((tokens.search("refresh_token") + 16))
            let final_refreshToken = initial_refreshToken.substr(0, initial_refreshToken.indexOf('"'))                         
            let initial_idToken = tokens1.substr((tokens1.search("id_token") + 11))
            let final_idToken = initial_idToken.substr(0, initial_idToken.indexOf('"'))
            console.log("id_token is : ", final_idToken)
            ApplicationSettings.setString("TOKEN", JSON.stringify(final_idToken));
            ApplicationSettings.setString("IOSToken", JSON.stringify(final_idToken));
            ApplicationSettings.setString("RefreshToken", JSON.stringify(final_refreshToken));
            
            this.close(final_idToken)      
        }, (e) => {
            console.log("Error occurred " + e);
        });
    }

    public close(res: string) {
        this.params.closeCallback(res);
    }

    public submit(res: string) {
        this.params.closeCallback(res);
        this.router.navigate(["licenceagreement"]);
    }

    public pageLoaded() {
        // this.busy = false;
        console.log("STATE ---------------> ", this.busy)
    }
}



