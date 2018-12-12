# nativescript-braintree

Braintree Payment NativeScript plugin for Android & iOS (9+). 

Detail information here: 
https://developers.braintreepayments.com/start/hello-client/android/v2
https://developers.braintreepayments.com/guides/paypal/client-side/ios/v4

You will need a Server to Generate a client token. You can follow here:
https://developers.braintreepayments.com/start/hello-server/php 

Note: Your app's package ID should be lowercase letters. If your package contains underscores, the underscores should be removed. Detail: https://developers.braintreepayments.com/guides/client-sdk/setup/android/v2#browser-switch-setup

For common issues check here first: https://github.com/jibon57/nativescript-braintree#common-issues

For iOS (Important)
===================
For Paypal & Venmo setup, must need to follow bellow (https://github.com/jibon57/nativescript-braintree/blob/master/README.md#2-ios-problem-with-paypal--venmo)

## Platforms
Android

iOS ( iOS 9+)

## Installation

```
tns plugin add nativescript-braintree
```

## Usage 
	
``` typescript
import { Braintree, BrainTreeOptions } from 'nativescript-braintree';
private braintree: Braintree;

let opts: BrainTreeOptions = {
    amount: "10.0",
    collectDeviceData: false,
    requestThreeDSecureVerification: false,
}

this.braintree = new Braintree();
let token = token; //Get the token from server. https://developers.braintreepayments.com/start/hello-server/php

this.braintree.startPayment(token, opts).then(() => {
    console.dir(this.braintree.output);
    alert(this.braintree.output.msg);
    // Now you have nonce. So you can push it to server :)
}).catch(() => {
    console.dir(this.braintree.output);
    alert(this.braintree.output.msg);
})
```

## Common Issues:

1) Error during build for Android

`Could not find com.android.support:design:26.0.0.`

Add following lines in your main `app.gradle` file.

``` typescript
allprojects {
    repositories {
        jcenter()
        maven {
            url 'https://maven.google.com'
        }
    }
}

```
ref: https://stackoverflow.com/questions/44500176/setting-up-gradle-for-api-26-android


`AAPT: No resource found that matches the given name: attr 'android:keyboardNavigationCluster'.`

Update sdk version and tools in gradle `compileSdkVersion 26` `buildToolsVersion "26.0.1"`

ref: https://stackoverflow.com/a/45310170/1281864

So my `app.gradle` looks like this (https://github.com/jibon57/nativescript-braintree/blob/master/demo/app/App_Resources/Android/app.gradle):

``` typescript
allprojects {
    repositories {
        jcenter()
        maven {
            url 'https://maven.google.com'
        }
    }
}
android {  
  defaultConfig {  
    generatedDensities = []
    applicationId = "com.yourcompany.yourapp" // this should be your app id
  }  
  aaptOptions {  
    additionalParameters "--no-version-vectors"  
  }
  compileSdkVersion 26
  buildToolsVersion "26.0.1"
} 

```
## 2) iOS problem with paypal & Venmo.

If you want to use Paypal & Venmo then you will need to edit your main "`Info.plist`" file to add `URL scheme` like this:

```
<key>CFBundleURLTypes</key>
<array>
	<dict>
		<key>CFBundleURLSchemes</key>
		<array>
			<string>org.nativescript.demo.payments</string>
		</array>
	</dict>
</array>

```
Here the string value should be same as your app id. The value can be anything like: com.yourcompany.app.payments or com.yourcompany.app.mypayment or anything else. But we will need this value bellow.

Now open your `app.ts` or `main.ts` (for Angular) file under `app` directory. If you are using webpack for angular then it will be "main.aot.ts". Add following lines before `application.start({ moduleName: "main-page" });` or `platformNativeScriptDynamic().bootstrapModule(AppModule);` or `platformNativeScript().bootstrapModuleFactory(AppModuleNgFactory);`

``` typescript
import * as app from "application";
declare var UIResponder, UIApplicationDelegate, BTAppSwitch;

if (app.ios) {

    class MyDelegate extends UIResponder {

        public static ObjCProtocols = [UIApplicationDelegate];

        applicationDidFinishLaunchingWithOptions(application, launchOptions): boolean {

            try {
                BTAppSwitch.setReturnURLScheme("org.nativescript.demo.payments"); // should be same as CFBundleURLSchemes value.
                return true;
            } catch (error) {
                console.log(error);
            }
            return false;
        }

        applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation) {

            try {
                if (url.scheme == "org.nativescript.demo.payments") {
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
```
Example: 

https://github.com/jibon57/nativescript-braintree/blob/master/demo/app/app.ts

https://github.com/jibon57/nativescript-braintree/blob/master/demo/app/App_Resources/iOS/Info.plist


ref: https://developers.braintreepayments.com/guides/paypal/client-side/ios/v4

## Credits

Special thanks to @Pip3r4o

## License

Apache License Version 2.0, January 2004
