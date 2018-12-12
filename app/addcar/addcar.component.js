"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page");
var nativescript_background_http_1 = require("nativescript-background-http");
var addcar_services_1 = require("./addcar.services");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var makemodal_1 = require("./makemodal");
var modelmodal_1 = require("./modelmodal");
var angular2_uuid_1 = require("angular2-uuid");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var platformModule = require("platform");
var imageSource = require("image-source");
var fs = require("file-system");
var permissions = require("nativescript-permissions");
var http = require("http");
var jwt_decode = require('jwt-decode');
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var AddcarComponent = (function () {
    function AddcarComponent(routerExtensions, addcarService, _page, _changeDetectionRef, modal, vcRef) {
        this.routerExtensions = routerExtensions;
        this.addcarService = addcarService;
        this._page = _page;
        this._changeDetectionRef = _changeDetectionRef;
        this.modal = modal;
        this.vcRef = vcRef;
        this.fleetID = angular2_uuid_1.UUID.UUID();
        this.imageID = angular2_uuid_1.UUID.UUID();
        this.imageName = "Logo";
        this.uploadState = false;
        this.buttonState = true;
        this.fleet = {
            "id": this.fleetID,
            "make": "",
            "miles": "",
            "status": "Customer",
            "vin": "",
            "model": "",
            "year": "",
            "image": ""
        };
    }
    AddcarComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        this.modelsdata = [];
    };
    AddcarComponent.prototype.makes = function () {
        var _this = this;
        var options = {
            context: {},
            height: 100,
            fullscreen: true,
            viewContainerRef: this.vcRef,
        };
        this.modal.showModal(makemodal_1.MakeModalComponent, options).then(function (res) {
            console.log("Resonse  is : ", res);
            _this.fleet.make = res.Make_Name;
            _this.getModels(res.Make_ID);
        });
    };
    AddcarComponent.prototype.getModels = function (makeid) {
        var _this = this;
        this.addcarService.getModels(makeid)
            .subscribe(function (result) {
            console.log("getModels data", JSON.stringify(result));
            result.Results.map(function (item) {
                _this.modelsdata.push(item);
            });
        }, function (error) {
            console.log("getModels Error : ", error);
        });
    };
    AddcarComponent.prototype.models = function () {
        var _this = this;
        var options = {
            context: { data: this.modelsdata },
            height: 100,
            fullscreen: true,
            viewContainerRef: this.vcRef,
        };
        this.modal.showModal(modelmodal_1.ModelModalComponent, options).then(function (res) {
            console.log("Resonse  is : ", res);
            _this.fleet.model = res.Model_Name;
        });
    };
    AddcarComponent.prototype.submit = function () {
        if (this.fleet.make === "") {
            alert("Vehicle Make is Mandatory ");
        }
        else if (this.fleet.model === "") {
            alert("Vehicle Model is Mandatory ");
        }
        else if (this.fleet.year === "") {
            alert("Vehicle Year is Mandatory ");
        }
        else {
            loader.show();
            this.putAddcar();
        }
    };
    AddcarComponent.prototype.putAddcar = function () {
        var _this = this;
        this.addcarService.addcarPut(this.fleet, this.fleetID)
            .subscribe(function (result) {
            console.log("Add Car Success  : ", (JSON.stringify(result)));
            loader.hide();
            _this.routerExtensions.navigate(["/carlist"], { clearHistory: true });
        }, function (error) {
            console.log("Add Car Error : ", error);
            loader.hide();
            _this.routerExtensions.navigate(["/carlist"], { clearHistory: true });
        });
    };
    AddcarComponent.prototype.onBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    // public imageUpload($event){
    //     this.getPresignUrl()
    //         let context = imagepicker.create({
    //             mode: "single"
    //         });
    //         this.startSelection(context);
    // }
    // startSelection(context) {
    //         let _that = this;
    //         context
    //         .authorize()
    //         .then(() => {
    //             return context.present();
    //         })
    //         .then((selection) => {
    //             console.log("Selection done:");
    //             selection.forEach((selected) => {
    //             selected.getImage().then( (imagesource) => {
    //                 var localPath = null;
    //                 if (platformModule.device.os === "Android") {
    //                     this.fileURL = selected.android;
    //                 } else {
    //                     // selected_item.ios for iOS is PHAsset and not path - so we are creating own path
    //                     let folder = fs.knownFolders.documents();
    //                     let path = fs.path.join(folder.path, "Test.png");
    //                     let saved = imagesource.saveToFile(path, "png");
    //                     this.fileURL = path;
    //                 }
    //                 console.log("This file uri : ", this.fileURL)
    //                 this.uploadState = true;
    //             })
    //         });
    //         _that._changeDetectionRef.detectChanges();
    //         }).catch(function (e) {
    //             console.log(e);
    //         });
    // }
    // getPresignUrl() {
    //         this.addcarService.presignUrl(this.imageID)
    //         .subscribe((result) => {
    //                 console.log("Presign Url Result", result.url)
    //                 this.awsUrl = result.url;
    //                 this.uploadState=true;
    //         }, (error) => {
    //             console.log("Presign Url Get Error : ", error)
    //         });
    // }
    AddcarComponent.prototype.upload = function () {
        var _this = this;
        loader.show();
        this.buttonState = false;
        this.newsession = nativescript_background_http_1.session("image-upload");
        this.request = {
            url: this.awsUrl,
            method: "PUT",
            headers: {
                "Content-Type": 'image/jpeg',
                "File-Name": this.imageName
            },
            description: "{ 'uploading': " + this.imageName + " }"
        };
        this.task = this.newsession.uploadFile(this.fileURL, this.request);
        this.task.on("progress", function (e) {
            console.log('current bytes : ', e.currentBytes, 'total bytes : ', e.totalBytes);
        });
        this.task.on("error", this.logEvent);
        this.task.on("complete", function (e) {
            _this.logEvent(e);
            _this.putAddcar();
            console.log("Upload Complete :  : ", "fleet id : ", _this.fleetID, "image id: ", _this.imageID);
        });
    };
    AddcarComponent.prototype.logEvent = function (e) {
        switch (e.eventName) {
            case "complete":
                console.log("Upload Complete");
                break;
            case "error":
                alert("Upload Error :" + JSON.stringify(e));
                console.log("Upload Error : " + JSON.stringify(e));
                break;
            default:
                break;
        }
    };
    AddcarComponent = __decorate([
        core_1.Component({
            selector: "Addcar",
            moduleId: module.id,
            styleUrls: ['addcar.css'],
            templateUrl: "./addcar.component.html",
            providers: [addcar_services_1.AddcarService]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, addcar_services_1.AddcarService, page_1.Page, core_1.ChangeDetectorRef, dialogs_1.ModalDialogService, core_1.ViewContainerRef])
    ], AddcarComponent);
    return AddcarComponent;
}());
exports.AddcarComponent = AddcarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkY2FyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZGNhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBdUg7QUFDdkgsc0RBQStEO0FBQy9ELGlEQUFpRjtBQUNqRiw2RUFBb0U7QUFPcEUscURBQWtEO0FBQ2xELG1FQUE2RTtBQUM3RSx5Q0FBaUQ7QUFDakQsMkNBQW1EO0FBQ25ELCtDQUFxQztBQUVyQyxpRkFBZ0U7QUFHaEUsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3pDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMxQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDaEMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFVcEM7SUE0QkkseUJBQW9CLGdCQUFrQyxFQUFVLGFBQTRCLEVBQVUsS0FBVyxFQUFVLG1CQUFzQyxFQUFVLEtBQXlCLEVBQVUsS0FBdUI7UUFBak4scUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBckI5TixZQUFPLEdBQUcsb0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixZQUFPLEdBQUcsb0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztR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LEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDaEQsS0FBSyxDQUFDO1lBRVY7Z0JBQ0ksS0FBSyxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0lBN01RLGVBQWU7UUFSM0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDekIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxTQUFTLEVBQUUsQ0FBQywrQkFBYSxDQUFDO1NBRTdCLENBQUM7eUNBNkJ3Qyx5QkFBZ0IsRUFBeUIsK0JBQWEsRUFBaUIsV0FBSSxFQUErQix3QkFBaUIsRUFBaUIsNEJBQWtCLEVBQWlCLHVCQUFnQjtPQTVCNU4sZUFBZSxDQThNM0I7SUFBRCxzQkFBQztDQUFBLEFBOU1ELElBOE1DO0FBOU1ZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYWdlLCBTaG93bk1vZGFsbHlEYXRhLCBOYXZpZ2F0ZWREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQge3Nlc3Npb24sIFNlc3Npb24sIFRhc2t9IGZyb20gXCJuYXRpdmVzY3JpcHQtYmFja2dyb3VuZC1odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBUZXh0VmlldyB9IGZyb20gXCJ1aS90ZXh0LXZpZXdcIjtcclxuaW1wb3J0IHtQcm9ncmVzc30gZnJvbSBcInVpL3Byb2dyZXNzXCI7XHJcbmltcG9ydCB7IGZyb21GaWxlT3JSZXNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VwaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG5pbXBvcnQgeyBBZGRjYXJTZXJ2aWNlIH0gZnJvbSBcIi4vYWRkY2FyLnNlcnZpY2VzXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgTWFrZU1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vbWFrZW1vZGFsXCI7XHJcbmltcG9ydCB7IE1vZGVsTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RlbG1vZGFsXCI7XHJcbmltcG9ydCB7IFVVSUQgfSBmcm9tICdhbmd1bGFyMi11dWlkJztcclxuaW1wb3J0IHsgaXNBbmRyb2lkLCBpc0lPUywgZGV2aWNlLCBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XHJcblxyXG5cclxudmFyIHBsYXRmb3JtTW9kdWxlID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG52YXIgaW1hZ2VTb3VyY2UgPSByZXF1aXJlKFwiaW1hZ2Utc291cmNlXCIpO1xyXG52YXIgZnMgPSByZXF1aXJlKFwiZmlsZS1zeXN0ZW1cIik7XHJcbnZhciBwZXJtaXNzaW9ucyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGVybWlzc2lvbnNcIik7XHJcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcbnZhciBqd3RfZGVjb2RlID0gcmVxdWlyZSgnand0LWRlY29kZScpO1xyXG52YXIgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiQWRkY2FyXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc3R5bGVVcmxzOiBbJ2FkZGNhci5jc3MnXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYWRkY2FyLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBwcm92aWRlcnM6IFtBZGRjYXJTZXJ2aWNlXVxyXG5cclxufSlcclxuZXhwb3J0IGNsYXNzIEFkZGNhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwdWJsaWMgcGFzc3dvcmQ7XHJcbiAgICBwdWJsaWMgZW1haWw7XHJcbiAgICBwdWJsaWMgbmV3c2Vzc2lvbjpTZXNzaW9uO1xyXG4gICAgcHVibGljIHJlcXVlc3Q6YW55O1xyXG4gICAgcHVibGljIHRhc2s6VGFzazsgICAgXHJcbiAgICBwdWJsaWMgZmlsZVVSTCBcclxuICAgIHB1YmxpYyBmbGVldElEID0gVVVJRC5VVUlEKCk7XHJcbiAgICBwdWJsaWMgaW1hZ2VJRCA9IFVVSUQuVVVJRCgpO1xyXG4gICAgcHVibGljIGlkX3Rva2VuO1xyXG4gICAgcHVibGljIGF3c1VybDtcclxuICAgIHB1YmxpYyBpbWFnZU5hbWUgPSBcIkxvZ29cIjtcclxuICAgIHB1YmxpYyB1cGxvYWRTdGF0ZSA9IGZhbHNlO1xyXG4gICAgcHVibGljIGJ1dHRvblN0YXRlID0gdHJ1ZTsgIFxyXG4gICAgcHVibGljICAgXHJcbiAgICBwdWJsaWMgZmxlZXQgPSB7XHJcbiAgICAgICAgXCJpZFwiOiB0aGlzLmZsZWV0SUQsXHJcbiAgICAgICAgXCJtYWtlXCI6IFwiXCIsXHJcbiAgICAgICAgXCJtaWxlc1wiOiBcIlwiLFxyXG4gICAgICAgIFwic3RhdHVzXCI6IFwiQ3VzdG9tZXJcIixcclxuICAgICAgICBcInZpblwiOiBcIlwiLFxyXG4gICAgICAgIFwibW9kZWxcIjogXCJcIixcclxuICAgICAgICBcInllYXJcIjogXCJcIixcclxuICAgICAgICBcImltYWdlXCI6IFwiXCIgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vZGVsc2RhdGE6IEFycmF5PHN0cmluZz47XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBhZGRjYXJTZXJ2aWNlOiBBZGRjYXJTZXJ2aWNlLCBwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7IFxyXG4gICAgICAgIHRoaXMubW9kZWxzZGF0YT1bXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFrZXMoKXtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB7fSxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwLFxyXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoTWFrZU1vZGFsQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKHJlcyA9PiB7ICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXNvbnNlICBpcyA6IFwiLCByZXMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsZWV0Lm1ha2UgPSByZXMuTWFrZV9OYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1vZGVscyhyZXMuTWFrZV9JRCkgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGdldE1vZGVscyhtYWtlaWQpe1xyXG4gICAgICAgIHRoaXMuYWRkY2FyU2VydmljZS5nZXRNb2RlbHMobWFrZWlkKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldE1vZGVscyBkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpXHJcbiAgICAgICAgICAgIHJlc3VsdC5SZXN1bHRzLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbHNkYXRhLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRNb2RlbHMgRXJyb3IgOiBcIiwgZXJyb3IpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vZGVscygpe1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjb250ZXh0OiB7ZGF0YTogdGhpcy5tb2RlbHNkYXRhfSxcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAsXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoTW9kZWxNb2RhbENvbXBvbmVudCwgb3B0aW9ucykudGhlbihyZXMgPT4geyAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXNvbnNlICBpcyA6IFwiLCByZXMpXHJcbiAgICAgICAgICAgIHRoaXMuZmxlZXQubW9kZWwgPSByZXMuTW9kZWxfTmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdWJtaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmxlZXQubWFrZSA9PT0gXCJcIiApe1xyXG4gICAgICAgICAgICBhbGVydChcIlZlaGljbGUgTWFrZSBpcyBNYW5kYXRvcnkgXCIpXHJcbiAgICAgICAgfWVsc2UgaWYgKHRoaXMuZmxlZXQubW9kZWwgPT09IFwiXCIgKXtcclxuICAgICAgICAgICAgYWxlcnQoXCJWZWhpY2xlIE1vZGVsIGlzIE1hbmRhdG9yeSBcIilcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmxlZXQueWVhciA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBhbGVydChcIlZlaGljbGUgWWVhciBpcyBNYW5kYXRvcnkgXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsb2FkZXIuc2hvdygpXHJcbiAgICAgICAgICAgIHRoaXMucHV0QWRkY2FyKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHB1dEFkZGNhcigpIHtcclxuICAgICAgICB0aGlzLmFkZGNhclNlcnZpY2UuYWRkY2FyUHV0KHRoaXMuZmxlZXQsIHRoaXMuZmxlZXRJRClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFkZCBDYXIgU3VjY2VzcyAgOiBcIiwgKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpKVxyXG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2Nhcmxpc3RcIl0sIHtjbGVhckhpc3RvcnkgOiB0cnVlfSk7ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFkZCBDYXIgRXJyb3IgOiBcIiwgZXJyb3IpXHJcbiAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY2FybGlzdFwiXSwge2NsZWFySGlzdG9yeSA6IHRydWV9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQmFjaygpe1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBpbWFnZVVwbG9hZCgkZXZlbnQpe1xyXG4gICAgLy8gICAgIHRoaXMuZ2V0UHJlc2lnblVybCgpXHJcbiAgICAvLyAgICAgICAgIGxldCBjb250ZXh0ID0gaW1hZ2VwaWNrZXIuY3JlYXRlKHtcclxuICAgIC8vICAgICAgICAgICAgIG1vZGU6IFwic2luZ2xlXCJcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc3RhcnRTZWxlY3Rpb24oY29udGV4dCk7XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vIHN0YXJ0U2VsZWN0aW9uKGNvbnRleHQpIHtcclxuICAgIC8vICAgICAgICAgbGV0IF90aGF0ID0gdGhpcztcclxuICAgIFxyXG4gICAgLy8gICAgICAgICBjb250ZXh0XHJcbiAgICAvLyAgICAgICAgIC5hdXRob3JpemUoKVxyXG4gICAgLy8gICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5wcmVzZW50KCk7XHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgIC50aGVuKChzZWxlY3Rpb24pID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0aW9uIGRvbmU6XCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgc2VsZWN0aW9uLmZvckVhY2goKHNlbGVjdGVkKSA9PiB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgc2VsZWN0ZWQuZ2V0SW1hZ2UoKS50aGVuKCAoaW1hZ2Vzb3VyY2UpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB2YXIgbG9jYWxQYXRoID0gbnVsbDtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHBsYXRmb3JtTW9kdWxlLmRldmljZS5vcyA9PT0gXCJBbmRyb2lkXCIpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlVVJMID0gc2VsZWN0ZWQuYW5kcm9pZDtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3RlZF9pdGVtLmlvcyBmb3IgaU9TIGlzIFBIQXNzZXQgYW5kIG5vdCBwYXRoIC0gc28gd2UgYXJlIGNyZWF0aW5nIG93biBwYXRoXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCBwYXRoID0gZnMucGF0aC5qb2luKGZvbGRlci5wYXRoLCBcIlRlc3QucG5nXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgc2F2ZWQgPSBpbWFnZXNvdXJjZS5zYXZlVG9GaWxlKHBhdGgsIFwicG5nXCIpO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlVVJMID0gcGF0aDtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGZpbGUgdXJpIDogXCIsIHRoaXMuZmlsZVVSTClcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZFN0YXRlID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICBfdGhhdC5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIC8vICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGdldFByZXNpZ25VcmwoKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuYWRkY2FyU2VydmljZS5wcmVzaWduVXJsKHRoaXMuaW1hZ2VJRClcclxuICAgIC8vICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcmVzaWduIFVybCBSZXN1bHRcIiwgcmVzdWx0LnVybClcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLmF3c1VybCA9IHJlc3VsdC51cmw7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRTdGF0ZT10cnVlO1xyXG4gICAgLy8gICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJlc2lnbiBVcmwgR2V0IEVycm9yIDogXCIsIGVycm9yKVxyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICB1cGxvYWQoKXtcclxuICAgICAgICAgICAgbG9hZGVyLnNob3coKTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25TdGF0ZSA9IGZhbHNlOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm5ld3Nlc3Npb24gPSBzZXNzaW9uKFwiaW1hZ2UtdXBsb2FkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgICAgIHVybDogdGhpcy5hd3NVcmwsXHJcbiAgICAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiAnaW1hZ2UvanBlZycsICAgXHJcbiAgICAgICAgICAgICAgICAgIFwiRmlsZS1OYW1lXCI6IHRoaXMuaW1hZ2VOYW1lXHJcbiAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInsgJ3VwbG9hZGluZyc6IFwiICsgdGhpcy5pbWFnZU5hbWUgKyBcIiB9XCJcclxuICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICB0aGlzLnRhc2sgPSB0aGlzLm5ld3Nlc3Npb24udXBsb2FkRmlsZSh0aGlzLmZpbGVVUkwsIHRoaXMucmVxdWVzdCk7ICBcclxuICAgICAgICAgICB0aGlzLnRhc2sub24oXCJwcm9ncmVzc1wiLCAoZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2N1cnJlbnQgYnl0ZXMgOiAnLGUuY3VycmVudEJ5dGVzLCd0b3RhbCBieXRlcyA6ICcsIGUudG90YWxCeXRlcylcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgdGhpcy50YXNrLm9uKFwiZXJyb3JcIiwgdGhpcy5sb2dFdmVudCk7XHJcbiAgICAgICAgICAgdGhpcy50YXNrLm9uKFwiY29tcGxldGVcIiwgKGUpPT57XHJcbiAgICAgICAgICAgICAgIHRoaXMubG9nRXZlbnQoZSk7XHJcbiAgICAgICAgICAgICAgIHRoaXMucHV0QWRkY2FyKClcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGxvYWQgQ29tcGxldGUgOiAgOiBcIixcImZsZWV0IGlkIDogXCIsIHRoaXMuZmxlZXRJRCxcImltYWdlIGlkOiBcIiwgdGhpcy5pbWFnZUlEKSAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ0V2ZW50KGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChlLmV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGxvYWQgQ29tcGxldGVcIilcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJlcnJvclwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXBsb2FkIEVycm9yIDpcIitKU09OLnN0cmluZ2lmeShlKSlcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwbG9hZCBFcnJvciA6IFwiK0pTT04uc3RyaW5naWZ5KGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=