import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import * as app from "application";
declare var UIResponder, UIApplicationDelegate, BTAppSwitch;
import { AppModule } from "./app.module";
import * as ApplicationSettings from "application-settings";
import * as utils from '../app/shared/utils';


if (app.ios) {
    
    class MyDelegate extends UIResponder {

        public static ObjCProtocols = [UIApplicationDelegate];

        applicationDidFinishLaunchingWithOptions(application, launchOptions): boolean {

            try {

                BTAppSwitch.setReturnURLScheme("com.futuredms.shyft.payment");
                return true;

            } catch (error) {
                console.log(error);
            }

            return false;
        }

        applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation) {
            try {
                if (url.scheme == "com.futuredms.shyft.payment") {
                    BTAppSwitch.handleOpenURLSourceApplication(url, sourceApplication);
                    return true;
                }
                else if (url.scheme == "shyftauto") {                  
                    console.log("redirect url ","www."+url+".com" )
                    localStorage.setItem('TOKEN', "www."+url+".com");      
                    let res = localStorage.getItem("TOKEN")
                    let initial = res.substr((res.indexOf("=") + 1));
                    let final = initial.substr(0, initial.indexOf("&"));
                    localStorage.setItem('IOSToken',final);                              
                    BTAppSwitch.handleOpenURLSourceApplication(url, sourceApplication);                      
                    return true;
                }
            } catch (error) {
                console.log(error);
            }
            return false;
        }
    }

    app.ios.delegate = MyDelegate;
}

platformNativeScriptDynamic().bootstrapModule(AppModule);