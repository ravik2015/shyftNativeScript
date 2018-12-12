"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("nativescript-angular/platform");
var app = require("application");
var app_module_1 = require("./app.module");
if (app.ios) {
    var MyDelegate = (function (_super) {
        __extends(MyDelegate, _super);
        function MyDelegate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
            try {
                BTAppSwitch.setReturnURLScheme("com.futuredms.shyft.payment");
                return true;
            }
            catch (error) {
                console.log(error);
            }
            return false;
        };
        MyDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = function (application, url, sourceApplication, annotation) {
            try {
                if (url.scheme == "com.futuredms.shyft.payment") {
                    BTAppSwitch.handleOpenURLSourceApplication(url, sourceApplication);
                    return true;
                }
                else if (url.scheme == "shyftauto") {
                    console.log("redirect url ", "www." + url + ".com");
                    localStorage.setItem('TOKEN', "www." + url + ".com");
                    var res = localStorage.getItem("TOKEN");
                    var initial = res.substr((res.indexOf("=") + 1));
                    var final = initial.substr(0, initial.indexOf("&"));
                    localStorage.setItem('IOSToken', final);
                    BTAppSwitch.handleOpenURLSourceApplication(url, sourceApplication);
                    return true;
                }
            }
            catch (error) {
                console.log(error);
            }
            return false;
        };
        MyDelegate.ObjCProtocols = [UIApplicationDelegate];
        return MyDelegate;
    }(UIResponder));
    app.ios.delegate = MyDelegate;
}
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwREFBNEU7QUFDNUUsaUNBQW1DO0FBRW5DLDJDQUF5QztBQUt6QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVWO1FBQXlCLDhCQUFXO1FBQXBDOztRQXVDQSxDQUFDO1FBbkNHLDZEQUF3QyxHQUF4QyxVQUF5QyxXQUFXLEVBQUUsYUFBYTtZQUUvRCxJQUFJLENBQUM7Z0JBRUQsV0FBVyxDQUFDLGtCQUFrQixDQUFDLDZCQUE2QixDQUFDLENBQUM7Z0JBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFaEIsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDO1lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsa0VBQTZDLEdBQTdDLFVBQThDLFdBQVcsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsVUFBVTtZQUN6RixJQUFJLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSw2QkFBNkIsQ0FBQyxDQUFDLENBQUM7b0JBQzlDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztvQkFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBQyxNQUFNLEdBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBRSxDQUFBO29CQUMvQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEdBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNqRCxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUN2QyxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QyxXQUFXLENBQUMsOEJBQThCLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7b0JBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7WUFDTCxDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFwQ2Esd0JBQWEsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFxQzFELGlCQUFDO0tBQUEsQUF2Q0QsQ0FBeUIsV0FBVyxHQXVDbkM7SUFFRCxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFDbEMsQ0FBQztBQUVELHNDQUEyQixFQUFFLENBQUMsZUFBZSxDQUFDLHNCQUFTLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBsYXRmb3JtTmF0aXZlU2NyaXB0RHluYW1pYyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9wbGF0Zm9ybVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuZGVjbGFyZSB2YXIgVUlSZXNwb25kZXIsIFVJQXBwbGljYXRpb25EZWxlZ2F0ZSwgQlRBcHBTd2l0Y2g7XG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tIFwiLi9hcHAubW9kdWxlXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi4vYXBwL3NoYXJlZC91dGlscyc7XG5cblxuaWYgKGFwcC5pb3MpIHtcbiAgICBcbiAgICBjbGFzcyBNeURlbGVnYXRlIGV4dGVuZHMgVUlSZXNwb25kZXIge1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgT2JqQ1Byb3RvY29scyA9IFtVSUFwcGxpY2F0aW9uRGVsZWdhdGVdO1xuXG4gICAgICAgIGFwcGxpY2F0aW9uRGlkRmluaXNoTGF1bmNoaW5nV2l0aE9wdGlvbnMoYXBwbGljYXRpb24sIGxhdW5jaE9wdGlvbnMpOiBib29sZWFuIHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIEJUQXBwU3dpdGNoLnNldFJldHVyblVSTFNjaGVtZShcImNvbS5mdXR1cmVkbXMuc2h5ZnQucGF5bWVudFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGxpY2F0aW9uT3BlblVSTFNvdXJjZUFwcGxpY2F0aW9uQW5ub3RhdGlvbihhcHBsaWNhdGlvbiwgdXJsLCBzb3VyY2VBcHBsaWNhdGlvbiwgYW5ub3RhdGlvbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAodXJsLnNjaGVtZSA9PSBcImNvbS5mdXR1cmVkbXMuc2h5ZnQucGF5bWVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIEJUQXBwU3dpdGNoLmhhbmRsZU9wZW5VUkxTb3VyY2VBcHBsaWNhdGlvbih1cmwsIHNvdXJjZUFwcGxpY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybC5zY2hlbWUgPT0gXCJzaHlmdGF1dG9cIikgeyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZGlyZWN0IHVybCBcIixcInd3dy5cIit1cmwrXCIuY29tXCIgKVxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVE9LRU4nLCBcInd3dy5cIit1cmwrXCIuY29tXCIpOyAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJUT0tFTlwiKVxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbCA9IHJlcy5zdWJzdHIoKHJlcy5pbmRleE9mKFwiPVwiKSArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmFsID0gaW5pdGlhbC5zdWJzdHIoMCwgaW5pdGlhbC5pbmRleE9mKFwiJlwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdJT1NUb2tlbicsZmluYWwpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBCVEFwcFN3aXRjaC5oYW5kbGVPcGVuVVJMU291cmNlQXBwbGljYXRpb24odXJsLCBzb3VyY2VBcHBsaWNhdGlvbik7ICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcC5pb3MuZGVsZWdhdGUgPSBNeURlbGVnYXRlO1xufVxuXG5wbGF0Zm9ybU5hdGl2ZVNjcmlwdER5bmFtaWMoKS5ib290c3RyYXBNb2R1bGUoQXBwTW9kdWxlKTsiXX0=