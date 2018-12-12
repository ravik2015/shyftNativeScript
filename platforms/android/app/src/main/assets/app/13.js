webpackJsonp([13],{

/***/ 301:
/*!*******************************!*\
  !*** ./login/login.module.ts ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var common_1 = __webpack_require__(/*! nativescript-angular/common */ 77);
var login_routing_module_1 = __webpack_require__(/*! ./login-routing.module */ 498);
var login_component_1 = __webpack_require__(/*! ./login.component */ 474);
var loginmodal_1 = __webpack_require__(/*! ./loginmodal */ 475);
var signupmodal_1 = __webpack_require__(/*! ./signupmodal */ 476);
var LoginModule = (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                login_routing_module_1.LoginRoutingModule
            ],
            declarations: [
                login_component_1.LoginComponent,
                loginmodal_1.LoginModalComponent,
                signupmodal_1.SignupModalComponent
            ],
            entryComponents: [
                loginmodal_1.LoginModalComponent,
                signupmodal_1.SignupModalComponent
            ],
            bootstrap: [
                login_component_1.LoginComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], LoginModule);
    return LoginModule;
}());
exports.LoginModule = LoginModule;


/***/ }),

/***/ 318:
/*!*************************************************************************************!*\
  !*** ../node_modules/tns-core-modules/application-settings/application-settings.js ***!
  \*************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var common = __webpack_require__(/*! ./application-settings-common */ 321);
var application_1 = __webpack_require__(/*! ../application */ 5);
var sharedPreferences;
function ensureSharedPreferences() {
    if (!sharedPreferences) {
        sharedPreferences = application_1.getNativeApplication().getApplicationContext().getSharedPreferences("prefs.db", 0);
    }
}
function verify(key) {
    common.checkKey(key);
    ensureSharedPreferences();
}
function hasKey(key) {
    verify(key);
    return sharedPreferences.contains(key);
}
exports.hasKey = hasKey;
function getBoolean(key, defaultValue) {
    verify(key);
    if (hasKey(key)) {
        return sharedPreferences.getBoolean(key, false);
    }
    return defaultValue;
}
exports.getBoolean = getBoolean;
function getString(key, defaultValue) {
    verify(key);
    if (hasKey(key)) {
        return sharedPreferences.getString(key, "");
    }
    return defaultValue;
}
exports.getString = getString;
function getNumber(key, defaultValue) {
    verify(key);
    if (hasKey(key)) {
        return sharedPreferences.getFloat(key, float(0.0));
    }
    return defaultValue;
}
exports.getNumber = getNumber;
function setBoolean(key, value) {
    verify(key);
    common.ensureValidValue(value, "boolean");
    var editor = sharedPreferences.edit();
    editor.putBoolean(key, value);
    editor.apply();
}
exports.setBoolean = setBoolean;
function setString(key, value) {
    verify(key);
    common.ensureValidValue(value, "string");
    var editor = sharedPreferences.edit();
    editor.putString(key, value);
    editor.apply();
}
exports.setString = setString;
function setNumber(key, value) {
    verify(key);
    common.ensureValidValue(value, "number");
    var editor = sharedPreferences.edit();
    editor.putFloat(key, float(value));
    editor.apply();
}
exports.setNumber = setNumber;
function remove(key) {
    verify(key);
    var editor = sharedPreferences.edit();
    editor.remove(key);
    editor.apply();
}
exports.remove = remove;
function clear() {
    ensureSharedPreferences();
    sharedPreferences.edit().clear().apply();
}
exports.clear = clear;
exports.flush = function () {
    return sharedPreferences.edit().commit();
};
//# sourceMappingURL=application-settings.android.js.map

/***/ }),

/***/ 321:
/*!********************************************************************************************!*\
  !*** ../node_modules/tns-core-modules/application-settings/application-settings-common.js ***!
  \********************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.checkKey = function (key) {
    if (typeof key !== "string") {
        throw new Error("key: '" + key + "' must be a string");
    }
};
exports.ensureValidValue = function (value, valueType) {
    if (typeof value !== valueType) {
        throw new Error("value: '" + value + "' must be a " + valueType);
    }
};
//# sourceMappingURL=application-settings-common.js.map

/***/ }),

/***/ 454:
/*!***********************************************!*\
  !*** ../node_modules/jwt-decode/lib/index.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64_url_decode = __webpack_require__(/*! ./base64_url_decode */ 455);

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

module.exports = function (token,options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};

module.exports.InvalidTokenError = InvalidTokenError;


/***/ }),

/***/ 455:
/*!***********************************************************!*\
  !*** ../node_modules/jwt-decode/lib/base64_url_decode.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var atob = __webpack_require__(/*! ./atob */ 456);

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

module.exports = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};


/***/ }),

/***/ 456:
/*!**********************************************!*\
  !*** ../node_modules/jwt-decode/lib/atob.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;


/***/ }),

/***/ 474:
/*!**********************************!*\
  !*** ./login/login.component.ts ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var page_1 = __webpack_require__(/*! tns-core-modules/ui/page */ 20);
var dialogs_1 = __webpack_require__(/*! nativescript-angular/directives/dialogs */ 166);
var loginmodal_1 = __webpack_require__(/*! ./loginmodal */ 475);
var signupmodal_1 = __webpack_require__(/*! ./signupmodal */ 476);
var ApplicationSettings = __webpack_require__(/*! application-settings */ 318);
var platform_1 = __webpack_require__(/*! platform */ 7);
var app = __webpack_require__(/*! application */ 5);
// import { FuturedmsShyftApiClientModule, Configuration, AdminApi, ClientApi,  BASE_PATH } from '@klouddms/futuredms-shyft-api-client';
var jwt_decode = __webpack_require__(/*! jwt-decode */ 454);
var LoginComponent = (function () {
    function LoginComponent(router, route, _page, modal, vcRef) {
        this.router = router;
        this.route = route;
        this._page = _page;
        this.modal = modal;
        this.vcRef = vcRef;
        this.state = false;
        if (platform_1.isAndroid) {
            // prevent the soft keyboard from showing initially when textfields are present
            app.android.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
        }
        // console.log(" Vendorid : " + ApplicationSettings.getString("vendorid"), " appointmemtid : " + ApplicationSettings.getString("appointmentid"), " vehicle id : " + ApplicationSettings.getString("vehicleid"))
        // console.log(" Services : " + ApplicationSettings.getString("services"), " Total cost : " + ApplicationSettings.getNumber("totalcost"), " deliveryfee : " + ApplicationSettings.getString("deliveryfee"))
        // if (ApplicationSettings.getString("vehicleid") != undefined && ApplicationSettings.getString("vehicleid") != 'null') {
        //     if (ApplicationSettings.getString("vehicleid") != undefined && ApplicationSettings.getNumber("totalcost") > 0) {
        //         let navigationExtras: NavigationExtras = {
        //             queryParams: {
        //                 "services": ApplicationSettings.getString("services"),
        //                 "totalcost": ApplicationSettings.getNumber("totalcost"),
        //                 "vendorID": ApplicationSettings.getString("vendorid"),
        //                 "vehicleID": ApplicationSettings.getString("vehicleid"),
        //                 "appointmentUUID": ApplicationSettings.getString("appointmentid"),
        //                 "deliveryfee": ApplicationSettings.getString("deliveryfee")
        //             }
        //         };
        //         this.router.navigate(["pickup"], navigationExtras);
        //     }
        //     else if (ApplicationSettings.getString("vehicleid") != undefined && ApplicationSettings.getString("vendorid") != 'null') {
        //         let navigationExtras: NavigationExtras = {
        //             queryParams: {
        //                 "appointmentUUID": ApplicationSettings.getString("appointmentid"),
        //                 "vehicleID": ApplicationSettings.getString("vehicleid"),
        //                 "serviceID": ApplicationSettings.getString("vendorid"),
        //                 "deliveryfee": ApplicationSettings.getString("deliveryfee")
        //             }
        //         };
        //         this.router.navigate(["selectservice"], navigationExtras);
        //     }
        //     else if (ApplicationSettings.getString("vehicleid") != undefined && ApplicationSettings.getString("vehicleid") != 'null') {
        //         let navigationExtras: NavigationExtras = {
        //             queryParams: {
        //                 "vehicle": JSON.parse(ApplicationSettings.getString("vehicleid")),
        //             }
        //         };
        //         this.router.navigate(["vendorlist"], navigationExtras);
        //     }
        // }
    }
    LoginComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        // this.createAppointment()
        console.log("tokens", ApplicationSettings.getString("TOKEN", "{}"));
        this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
        var decoded = jwt_decode(this.id_token);
        ApplicationSettings.setString("user", JSON.stringify(decoded.given_name));
        ApplicationSettings.setString("email", JSON.stringify(decoded.email));
        console.log(" Decoded ID Token is : ", JSON.stringify(decoded));
        ApplicationSettings.setString("USER", JSON.stringify(decoded));
        this.username = decoded.given_name;
        if (this.username) {
            this.state = true;
        }
        else {
            this.state = false;
        }
    };
    // createAppointment(){   let uuid = UUID.UUID();        
    //     let date = new Date();
    //     let isoDate = date.toISOString();
    //     const appointmentModel = {
    //         "id": uuid,
    //         "datetime": isoDate,
    //         "status": "Pending",
    //         "vendor": "ceda87fc-b51e-11e7-aa7a-12c20b01dc5a"
    //     }
    //     console.log("Appointment Model is ", JSON.stringify(appointmentModel))
    //     let token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"))
    //     this.clientApi.appointmentAppointmentIdPut(uuid, appointmentModel,token.toString())
    //     .subscribe((result) => {
    //         console.log("Success  >"+ result)
    //     }, (error) => {
    //         console.log("Error  >"+ error)
    //     });
    //     console.log("Auth Token :::::", token.toString())
    //     this.adminApi.fleetGet("eyJraWQiOiJZbDJabG5OYjc5XC9FaFVXcFFsQjRpTGdaQjBybEJSeGRJNnhIcW41cG9QOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3Y2NjZjNkMi1hZDNkLTQ0NGQtYWRkYi0yZjhhY2MzNWVjYWYiLCJjb2duaXRvOmdyb3VwcyI6WyJjdXN0b21lciJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNUxVMjM2dERJIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6IjdjY2NmM2QyLWFkM2QtNDQ0ZC1hZGRiLTJmOGFjYzM1ZWNhZiIsImdpdmVuX25hbWUiOiJSYXZpIiwiYXVkIjoiNTFsdmtxdmdxMjI4Y2wzNzFtdmo0M2djYXIiLCJldmVudF9pZCI6IjUzZWEwMTY0LTI1ZDAtMTFlOC05MWFiLTQ1Y2ZjNGQ2OTk1MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTIwODQzNzMyLCJwaG9uZV9udW1iZXIiOiIrOTE5OTk3NDA3NDczIiwiZXhwIjoxNTIwODQ3MzMyLCJpYXQiOjE1MjA4NDM3MzIsImZhbWlseV9uYW1lIjoiS3VtYXIiLCJlbWFpbCI6InJhdml6QHlvcG1haWwuY29tIn0.Ya7WWBgNNdl9S7qVTQ44Gw3tSvxb922ZTtMMubbxnAp-pwiTm3ZbclCKinNVRdA5EZ2OA33D9RvwZ5WaHZbvUj0jpLdJz2G51wPgEbbpG5kNOOndkvGvTXT_S3hgpjtWdJwa0u9znlbjWMSonbLRJw0CNz51BTK50KkW0OitAdIlTvMqgDl-5TLVE0Uy3cujAXPSxInZ78mjR-ifr0Tgx1Q7UZf24H12LJGpSj8xmI3cHg-BHzVKnzoJb0nbqXynL01Htw915bbtO8RMfH3MFS0SwxH91kwbYwUsX81imXjwHhAQCoc2AvF_Ix_jN7a_9rt9drbXsiPELOBkR5Nv4g")
    //     .subscribe((result) => {
    //         console.log("Fleet Get Result : ", JSON.stringify(result))
    //     }, (error) => {
    //         console.log("Fleet Get Error : ", error)                
    //     }); 
    // }
    LoginComponent.prototype.login = function () {
        this.router.navigate(["/carlist"]);
    };
    LoginComponent.prototype.awsLogin = function () {
        var _this = this;
        ApplicationSettings.clear();
        this.loginstate = true;
        var options = {
            context: {},
            height: 100,
            fullscreen: true,
            viewContainerRef: this.vcRef,
        };
        this.modal.showModal(loginmodal_1.LoginModalComponent, options).then(function (res) {
            if (res == null) {
                _this.loginstate = false;
            }
            else {
                console.log("After login ---> ", res);
                _this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
                var deco = jwt_decode(_this.id_token);
                _this.username = deco.given_name;
                ApplicationSettings.setString("user", JSON.stringify(deco.given_name));
                _this.loginstate = false;
                _this.state = true;
            }
        });
    };
    LoginComponent.prototype.awsSignup = function () {
        var _this = this;
        // ApplicationSettings.setNumber("totalcost", 0)
        // ApplicationSettings.setString("vendorid", 'null')
        // ApplicationSettings.setString("vehicleid", 'null')
        // ApplicationSettings.setString("appointmentid", 'null')
        // ApplicationSettings.setString("deliveryfee", 'null')
        var options = {
            context: {},
            height: 100,
            fullscreen: true,
            viewContainerRef: this.vcRef,
        };
        this.modal.showModal(signupmodal_1.SignupModalComponent, options).then(function (res) {
            if (res == null) {
                _this.loginstate = false;
                alert("Signup Cancelled By User ...");
            }
            else {
                if (platform_1.isIOS) {
                    _this.id_token = JSON.parse(ApplicationSettings.getString("IOSToken", "{}"));
                }
                else {
                    _this.id_token = JSON.parse(ApplicationSettings.getString("TOKEN", "{}"));
                }
                var deco = jwt_decode(_this.id_token);
                ApplicationSettings.setString("USER", JSON.stringify(deco));
                _this.username = deco.given_name;
                ApplicationSettings.setString("user", JSON.stringify(deco.given_name));
                _this.loginstate = false;
                _this.state = true;
                _this.router.navigate(["agreement"]);
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "Login",
            /*duleId: module.i*/
            template: __webpack_require__(/*! ./login.component.html */ 503)
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, page_1.Page, dialogs_1.ModalDialogService, core_1.ViewContainerRef])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ 475:
/*!*****************************!*\
  !*** ./login/loginmodal.ts ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var web_view_1 = __webpack_require__(/*! ui/web-view */ 178);
var dialogs_1 = __webpack_require__(/*! nativescript-angular/directives/dialogs */ 166);
var page_1 = __webpack_require__(/*! ui/page */ 20);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var ApplicationSettings = __webpack_require__(/*! application-settings */ 318);
var webViewInterfaceModule = __webpack_require__(/*! nativescript-webview-interface */ 499);
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
            template: __webpack_require__(/*! ./loginmodal.html */ 501),
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, core_1.ChangeDetectorRef, page_1.Page, router_1.Router, router_1.ActivatedRoute])
    ], LoginModalComponent);
    return LoginModalComponent;
}());
exports.LoginModalComponent = LoginModalComponent;


/***/ }),

/***/ 476:
/*!******************************!*\
  !*** ./login/signupmodal.ts ***!
  \******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var dialogs_1 = __webpack_require__(/*! nativescript-angular/directives/dialogs */ 166);
var page_1 = __webpack_require__(/*! ui/page */ 20);
var router_1 = __webpack_require__(/*! @angular/router */ 21);
var web_view_1 = __webpack_require__(/*! ui/web-view */ 178);
var ApplicationSettings = __webpack_require__(/*! application-settings */ 318);
var platform_1 = __webpack_require__(/*! platform */ 7);
var webViewModule = __webpack_require__(/*! ui/web-view */ 178);
var http = __webpack_require__(/*! http */ 83);
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
            template: __webpack_require__(/*! ./signupmodal.html */ 502),
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, page_1.Page, router_1.Router, router_1.ActivatedRoute])
    ], SignupModalComponent);
    return SignupModalComponent;
}());
exports.SignupModalComponent = SignupModalComponent;


/***/ }),

/***/ 498:
/*!***************************************!*\
  !*** ./login/login-routing.module.ts ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ 1);
var router_1 = __webpack_require__(/*! nativescript-angular/router */ 75);
var login_component_1 = __webpack_require__(/*! ./login.component */ 474);
var routes = [
    { path: "", component: login_component_1.LoginComponent }
];
var LoginRoutingModule = (function () {
    function LoginRoutingModule() {
    }
    LoginRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], LoginRoutingModule);
    return LoginRoutingModule;
}());
exports.LoginRoutingModule = LoginRoutingModule;


/***/ }),

/***/ 499:
/*!***************************************************************!*\
  !*** ../node_modules/nativescript-webview-interface/index.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

 const common = __webpack_require__(/*! ./index-common */ 500);
 const platformModule = __webpack_require__(/*! platform */ 7);

 global.moduleMerge(common, exports);
 
 /**
  * Factory function to provide instance of Android JavascriptInterface.      
  */ 
 function getAndroidJSInterface(oWebViewInterface){
    var AndroidWebViewInterface = com.shripalsoni.natiescriptwebviewinterface.WebViewInterface.extend({
        /**
         * On call from webView to android, this function is called from handleEventFromWebView method of WebViewInerface class
         */
        onWebViewEvent: function(webViewId, eventName, jsonData){
            // getting webviewInterface object by webViewId from static map.
            var oWebViewInterface = getWebViewIntefaceObjByWebViewId(webViewId);
            oWebViewInterface._onWebViewEvent(eventName, jsonData);
        }
    });
    
    // creating androidWebViewInterface with unique web-view id.
    return new AndroidWebViewInterface(new java.lang.String(''+oWebViewInterface.id));
 }
 
 /**
  * Returns webViewInterface object mapped with the passed webViewId.
  */
 function getWebViewIntefaceObjByWebViewId(webViewId){
     return common.WebViewInterface.webViewInterfaceIdMap[webViewId];
 }
 
 /**
  * Android Specific WebViewInterface Class
  */
 var WebViewInterface = (function(_super){
    __extends(WebViewInterface, _super);
    
    function WebViewInterface(webView, src){
        _super.call(this, webView);
        this._initWebView(src); 
    }
    
    /**
     * Initializes webView for communication between android and webView.
     */
    WebViewInterface.prototype._initWebView = function(src){
        var _this = this;
        if(this.webView.isLoaded) {
            _this._setAndroidWebViewSettings(src);
        } else {
            var handlerRef = _this.webView.on('loaded', function(){
                _this._setAndroidWebViewSettings(src);
                _this.webView.off('loaded', handlerRef);
            });
        }
    };
    
    WebViewInterface.prototype._setAndroidWebViewSettings = function(src) {
        var oJSInterface =  getAndroidJSInterface(this);
        var androidSettings = this.webView.android.getSettings();
        androidSettings.setJavaScriptEnabled(true);
        this.webView.android.addJavascriptInterface(oJSInterface, 'androidWebViewInterface');

        // If src is provided, then setting it.
        // To make javascriptInterface available in web-view, it should be set before 
        // web-view's loadUrl method is called. So setting src after javascriptInterface is set.
        if(src){
            this.webView.src = src;
        }
    }

    /**
     * Executes event/command/jsFunction in webView.
     */
    WebViewInterface.prototype._executeJS = function(strJSFunction){
      if (platformModule.device.sdkVersion >= 19) {
        this.webView.android.evaluateJavascript(strJSFunction, null);
      }
      else {
        this.webView.android.loadUrl('javascript:'+strJSFunction);
      }
    };
    
    return WebViewInterface;
 })(common.WebViewInterface);
 
 exports.WebViewInterface = WebViewInterface;

/***/ }),

/***/ 500:
/*!**********************************************************************!*\
  !*** ../node_modules/nativescript-webview-interface/index-common.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Parses json string to object if valid.
 */
function parseJSON(data) {
    var oData;
    try {
        oData = JSON.parse(data);
    } catch (e) {
        return false;
    }
    return oData;
}

/**
 * WebViewInterface Class containing common functionalities for Android and iOS
 */
function WebViewInterface(webView) {
    /**
     * WebView to setup interface for
     */
    this.webView = webView;
    
    /**
     * Mapping of webView event/command and its native handler 
     */
    this.eventListenerMap = {};
    
    /**
     * Mapping of js call request id and its success handler. 
     * Based on this mapping, the registered success handler will be called 
     * on successful response from the js call
     */
    this.jsCallReqIdSuccessCallbackMap = {};
    
    /**
     * Mapping of js call request id and its error handler. 
     * Based on this mapping, the error handler will be called 
     * on error from the js call
     */
    this.jsCallReqIdErrorCallbackMap = {};
    
    /**
     * Web-view instance unique id to handle scenarios of multiple webview on single page.
     */
    this.id = ++WebViewInterface.cntWebViewId;
    
    /**
     * Maintaining mapping of webview instance and its id, to handle scenarios of multiple webview on single page.
     */
    WebViewInterface.webViewInterfaceIdMap[this.id] = this;
}

/**
 * Prepares call to a function in webView, which handles native event/command calls
 */
WebViewInterface.prototype._prepareEmitEventJSCall = function (eventName, data) {
    data = JSON.stringify(data);    // calling stringify for all types of data. Because if data is a string containing ", we need to escape that. Ref: https://github.com/shripalsoni04/nativescript-webview-interface/pull/6
    return 'window.nsWebViewInterface._onNativeEvent("' + eventName + '",' + data + ');'
};

/**
 * Prepares call to a function in webView, which calls the specified function in the webView
 */
WebViewInterface.prototype._prepareJSFunctionCall = function (functionName, arrArgs, successHandler, errorHandler) {
    arrArgs = arrArgs || [];
    
    // converts non array argument to array
    if (typeof arrArgs !== 'object' || arrArgs.length === void (0)) {
        arrArgs = [arrArgs];
    }
    var strArgs = JSON.stringify(arrArgs);
    // creating id with combination of web-view id and req id
    var reqId = '"'+this.id+'#'+ (++WebViewInterface.cntJSCallReqId)+'"';
    this.jsCallReqIdSuccessCallbackMap[reqId] = successHandler;
    this.jsCallReqIdErrorCallbackMap[reqId] = errorHandler;
    return 'window.nsWebViewInterface._callJSFunction(' + reqId + ',"' + functionName + '",' + strArgs + ');'
}

/**
 * Handles response/event/command from webView.
 */
WebViewInterface.prototype._onWebViewEvent = function (eventName, data) {
    var oData = parseJSON(data) || data;
    
    // in case of JS call result, eventName will be _jsCallResponse
    if (eventName === '_jsCallResponse') {
        var reqId = '"'+oData.reqId+'"';
        var callback;
        
        if(oData.isError){
            callback = this.jsCallReqIdErrorCallbackMap[reqId];
        }else{
            callback = this.jsCallReqIdSuccessCallbackMap[reqId];
        }
        
        if (callback) {
            callback(oData.response);
        }
    } else {
        var lstCallbacks = this.eventListenerMap[eventName] || [];
        for (var i = 0; i < lstCallbacks.length; i++) {
            var retnVal = lstCallbacks[i](oData);
            if (retnVal === false) {
                break;
            }
        }
    }
};

/**
 * Registers handler for event/command emitted from webview
 * @param   {string}    eventName - Any event name except reserved '_jsCallResponse'
 * @param   {function}  callback - Callback function to be executed on event/command receive.
 */
WebViewInterface.prototype.on = function (eventName, callback) {
    if(eventName === '_jsCallResponse'){
        throw new Error('_jsCallResponse eventName is reserved for internal use. You cannot attach listeners to it.');    
    }
    
    (this.eventListenerMap[eventName] || (this.eventListenerMap[eventName] = [])).push(callback);
};

/**
 * Deregisters handler for event/command emitted from webview
 * @param   {string}    eventName - Any event name except reserved '_jsCallResponse'
 * @param   {function}  callback - Callback function to be executed on event/command receive.
 **/
WebViewInterface.prototype.off = function (eventName, callback) {
    if(eventName === '_jsCallResponse'){
        throw new Error('_jsCallResponse eventName is reserved for internal use. You cannot deattach listeners to it.');
    }

    if (!this.eventListenerMap[eventName] || this.eventListenerMap[eventName].length === 0) {
      return;
    }

    if (callback) {
      this.eventListenerMap[eventName] = this.eventListenerMap[eventName].filter(function(oldCallback) {
        return oldCallback !== callback;
      });
    } else {
      delete this.eventListenerMap[eventName];
    }
};

/**
 * Emits event/command with payload to webView.
 * @param   {string}    eventName - Any event name
 * @param   {any}       data - Payload to send wiht event/command
 */
WebViewInterface.prototype.emit = function (eventName, data) {
    var strJSFunction = this._prepareEmitEventJSCall(eventName, data);
    this._executeJS(strJSFunction);
}

/**
 * Calls function in webView
 * @param   {string}    functionName - Function should be in global scope in webView
 * @param   {any[]}     args - Arguments of the function
 * @param   {function}  callback - Function to call on result from webView      
 */
WebViewInterface.prototype.callJSFunction = function (functionName, args, successHandler, errorHandler) {
    var strJSFunction = this._prepareJSFunctionCall(functionName, args, successHandler, errorHandler);
    this._executeJS(strJSFunction);
};

/**
 * Clears mappings of callbacks and webview.
 * This needs to be called in navigatedFrom event handler in page where webviewInterface plugin is used.
 */
WebViewInterface.prototype.destroy = function(){
    // call platform specific destroy function if available. Currently used only for iOS to remove loadStarted event listener.
    if(this._destroy) {
        this._destroy();
    }

    /**
     * 
     * Resetting src to blank. This needs to be done to avoid issue of communication stops working from webView to nativescript when 
     * page with webVeiw is opened on back button press on android.
     * This issue occurs because nativescript destroys the native webView element on navigation if cache is disabled, and when we navigate back
     * it recreates the native webView and attaches it to nativescript webView element. So we have to reinitiate this plugin with new webView instance.
     * Now, to make communication from webVeiw to nativescript work on android, 
     * androidJSInterface should be loaded before any request loads on webView. So if we don't reset src on nativescript webView, that src will start
     * loading as soon as the native webView is created and before we add androidJSInterface. This results in stoppage of communication from webView 
     * to nativescript when page is opened on back navigation.
     */
    if(this.webView) {
        this.webView.src = '';
    }

    this.eventListenerMap = null;
    this.jsCallReqIdSuccessCallbackMap = null;
    this.jsCallReqIdErrorCallbackMap = null;
    delete WebViewInterface.webViewInterfaceIdMap[this.id]; 
};

/**
 * Counter to create unique requestId for each JS call to webView.
 */
WebViewInterface.cntJSCallReqId = 0;
WebViewInterface.cntWebViewId = 0;
WebViewInterface.webViewInterfaceIdMap = {};

exports.WebViewInterface = WebViewInterface;
exports.parseJSON = parseJSON;

/***/ }),

/***/ 501:
/*!*******************************!*\
  !*** ./login/loginmodal.html ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<GridLayout columns=\"*\" rows=\"*,9*\">\n    <!-- <StackLayout column=0 row=0 style=\"border-bottom-width: 1; border-color: #dadada; background-color: black\">\n        <StackLayout >\n            <Label class=\"h2 fa\" text=\"&#xf060;\" (onTap)=\"close()\" style=\"horizontal-align: left; color: white; padding: 20 0 0 10 \"></Label>     \n        </StackLayout>   \n    </StackLayout>  -->\n    <StackLayout col=\"0\" row=\"0\" style=\"background-color: black\" >\n        <GridLayout columns=\"*,8*,*\" rows=\"*\">\n                        <StackLayout col=\"0\" row=\"0\">\n                                 <Label class=\"h2 fa\" text=\"&#xf060;\" (onTap)=\"close()\" style=\"horizontal-align: left; color: white; padding: 20 0 0 10 \"></Label>     \n                        </StackLayout>\n                        <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\n                                <Label class=\"h2\" text=\"Login\"  style=\" color: white; text-align: center\"></Label>                                                                                                                                                                             \n                        </StackLayout>\n                        <StackLayout col=\"2\" row=\"0\"></StackLayout>                                        \n        </GridLayout>                                        \n    </StackLayout>  \n    <GridLayout column=0 row=1 [visibility]=\"!this.busy ? 'visible' : 'collapsed'\" style=\"background-color: #909090; vertical-align: center\">\n            <WebView  #webView (loadFinished)=\"pageLoaded()\" #myWebView #webView [src]=\"webViewSrc\"></WebView>            \n    </GridLayout>        \n    <ActivityIndicator column=0 row=1   [busy]=\"busy\"  class=\"activity-indicator\"></ActivityIndicator>\n\n    <!-- <GridLayout column=0 row=1 style=\"background-color: #909090; vertical-align: center\">\n        <WebView  #webView (loadFinished)=\"pageLoaded()\" #myWebView #webView [src]=\"webViewSrc\"></WebView>            \n</GridLayout> -->\n    \n</GridLayout>"

/***/ }),

/***/ 502:
/*!********************************!*\
  !*** ./login/signupmodal.html ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<GridLayout columns=\"*\" rows=\"*,9*\">\n        <StackLayout col=\"0\" row=\"0\" style=\"background-color: black\" >\n            <GridLayout columns=\"*,8*,*\" rows=\"*\">\n                            <StackLayout col=\"0\" row=\"0\">\n                                     <Label class=\"h2 fa\" text=\"&#xf060;\" (onTap)=\"close()\" style=\"horizontal-align: left; color: white; padding: 20 0 0 10 \"></Label>     \n                            </StackLayout>\n                            <StackLayout col=\"1\" row=\"0\" style=\"vertical-align: center\">\n                                    <Label class=\"h2\" text=\"Sign Up\"  style=\" color: white; text-align: center\"></Label>                                                                                                                                                                             \n                            </StackLayout>\n                            <StackLayout col=\"2\" row=\"0\"></StackLayout>                                        \n            </GridLayout>                                        \n        </StackLayout> \n        <GridLayout column=0 row=1 [visibility]=\"!this.busy ? 'visible' : 'collapsed'\" style=\"background-color: #909090; vertical-align: center\">\n                <WebView  #webView (loadFinished)=\"pageLoaded()\" #myWebView #webView [src]=\"webViewSrc\"></WebView>                  \n        </GridLayout>        \n        <ActivityIndicator column=0 row=1   [busy]=\"busy\"  class=\"activity-indicator\"></ActivityIndicator>\n        \n    </GridLayout> "

/***/ }),

/***/ 503:
/*!************************************!*\
  !*** ./login/login.component.html ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<GridLayout cols=\"*\" rows=\"*,7*,2*\">\n    <StackLayout col=0 row=0>\n    </StackLayout>\n    <StackLayout col=0 row=1>\n            <GridLayout cols=\"*\" rows=\"4*,5*,*\">\n                    <StackLayout col=0 row=0>\n                            <GridLayout cols=\"*,*,*\" rows=\"*\">\n                                    <StackLayout col=0 row=0></StackLayout>\n                                    <StackLayout col=1 row=0>\n                                            <GridLayout cols=\"*\" rows=\"3*,4*,3*\" style=\"horizontal-align: center;\">\n                                                    <StackLayout col=0 row=0 style=\"horizontal-align: center; vertical-align: center;\">\n                                                            <Label class=\"h1\" text=\"Shyft\" style=\"text-align: center; horizontal-align: center;\"></Label>\n                                                    </StackLayout>\n                                                    <StackLayout col=0 row=1>\n                                                            <Image src=\"res://cloud_icon\"></Image>\n                                                    </StackLayout>\n                                                    <StackLayout col=0 row=2 style=\"horizontal-align: center; vertical-align: center;\">\n                                                            <Label class=\"h5\" text=\"By Kloud DMS\"></Label>\n                                                    </StackLayout>\n                                            </GridLayout>\n                                    </StackLayout>\n                                    <StackLayout col=2 row=0></StackLayout>\n                            </GridLayout>\n                    </StackLayout>\n                    <StackLayout col=0 row=1>\n                            <GridLayout cols=\"*\" rows=\"*,*\" >\n                                    <StackLayout col=0 row=0 style=\"vertical-align: center;\" [visibility]=\"!this.loginstate ? 'visible' : 'collapsed'\">\n                                            <StackLayout orientation=\"horizontal\">\n                                                    <Image [visibility]=\"this.state ? 'visible' : 'collapsed'\" src=\"res://logo_2\" style=\"height: 55; width: 55;margin-left: 15\"></Image>\n                                                    <Label class=\"h2\" [text]=\"this?.username\" textWrap=\"true\" style=\"padding-left: 15; vertical-align: center;\" (tap)=\"login()\"></Label>\n                                            </StackLayout>\n                                    </StackLayout>\n                                    <ActivityIndicator col=0 row=0 [busy]=\"loginstate\" class=\"activity-indicator\"></ActivityIndicator>                                                        \n                                    <StackLayout col=0 row=1>\n                                            <StackLayout orientation=\"horizontal\" >\n                                                    <Image src=\"res://add\" style=\"height: 55; width: 55;margin-left: 15\"></Image>\n                                                    <Label class=\"h2\" text=\"Login to another account\" textWrap=\"true\" style=\"padding-left: 15; vertical-align: center;\" (tap)=\"awsLogin()\"></Label>\n                                            </StackLayout>\n                                    </StackLayout>\n                            </GridLayout>\n\n                    </StackLayout>\n                    <StackLayout col=0 row=2>\n\n                    </StackLayout>\n            </GridLayout>\n    </StackLayout>\n    <StackLayout col=0 row=2 style=\"vertical-align: center;\">\n            <Button text=\"CREATE NEW SHYFT ACCOUNT\" style=\"padding: 20\" (tap)=\"awsSignup()\"></Button>\n    </StackLayout>\n</GridLayout>"

/***/ })

});