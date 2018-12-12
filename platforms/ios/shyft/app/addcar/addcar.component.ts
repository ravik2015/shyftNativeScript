import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, ShownModallyData, NavigatedData } from "tns-core-modules/ui/page";
import {session, Session, Task} from "nativescript-background-http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as ApplicationSettings from "application-settings";
import { TextView } from "ui/text-view";
import {Progress} from "ui/progress";
import { fromFileOrResource } from "image-source";
import * as imagepicker from "nativescript-imagepicker";
import { AddcarService } from "./addcar.services";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { MakeModalComponent } from "./makemodal";
import { ModelModalComponent } from "./modelmodal";
import { UUID } from 'angular2-uuid';
import { isAndroid, isIOS, device, screen } from "platform";
import {LoadingIndicator} from "nativescript-loading-indicator";


var platformModule = require("platform");
var imageSource = require("image-source");
var fs = require("file-system");
var permissions = require("nativescript-permissions");
var http = require("http");
var jwt_decode = require('jwt-decode');
var loader = new LoadingIndicator();

@Component({
    selector: "Addcar",
    moduleId: module.id,
    styleUrls: ['addcar.css'],
    templateUrl: "./addcar.component.html",
    providers: [AddcarService]

})
export class AddcarComponent implements OnInit {
    public password;
    public email;
    public newsession:Session;
    public request:any;
    public task:Task;    
    public fileURL 
    public fleetID = UUID.UUID();
    public imageID = UUID.UUID();
    public id_token;
    public awsUrl;
    public imageName = "Logo";
    public uploadState = false;
    public buttonState = true;  
    public   
    public fleet = {
        "id": this.fleetID,
        "make": "",
        "miles": "",
        "status": "Customer",
        "vin": "",
        "model": "",
        "year": "",
        "image": ""       
    }

    public modelsdata: Array<string>;
    
    constructor(private routerExtensions: RouterExtensions, private addcarService: AddcarService, private _page: Page, private _changeDetectionRef: ChangeDetectorRef, private modal: ModalDialogService, private vcRef: ViewContainerRef) {
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true; 
        this.modelsdata=[];
    }

    public makes(){
            let options = {
                context: {},
                height: 100,
                fullscreen: true,
                viewContainerRef: this.vcRef,
            };
    
            this.modal.showModal(MakeModalComponent, options).then(res => {    
                console.log("Resonse  is : ", res)
                this.fleet.make = res.Make_Name
                this.getModels(res.Make_ID) 
            });
        
    }
    
    private getModels(makeid){
        this.addcarService.getModels(makeid)
        .subscribe((result) => {
            console.log("getModels data", JSON.stringify(result))
            result.Results.map((item) => {
                this.modelsdata.push(item)
            })
        }, (error) => {
            console.log("getModels Error : ", error)
        });
    }

    public models(){
        let options = {
            context: {data: this.modelsdata},
            height: 100,
            fullscreen: true,
            viewContainerRef: this.vcRef,
        };

        this.modal.showModal(ModelModalComponent, options).then(res => {    
            console.log("Resonse  is : ", res)
            this.fleet.model = res.Model_Name
        });
        
    }


    submit() {
        if (this.fleet.make === "" ){
            alert("Vehicle Make is Mandatory ")
        }else if (this.fleet.model === "" ){
            alert("Vehicle Model is Mandatory ")
        } else if (this.fleet.year === "") {
            alert("Vehicle Year is Mandatory ")
        }
        else {
            loader.show()
            this.putAddcar()
        }
    }

    public putAddcar() {
        this.addcarService.addcarPut(this.fleet, this.fleetID)
            .subscribe((result) => {
                console.log("Add Car Success  : ", (JSON.stringify(result)))
                loader.hide();
              this.routerExtensions.navigate(["/carlist"], {clearHistory : true});              
            }, (error) => {
                console.log("Add Car Error : ", error)
                loader.hide();
              this.routerExtensions.navigate(["/carlist"], {clearHistory : true});
            });
    }

    public onBack(){
        this.routerExtensions.backToPreviousPage();        
    }

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

    upload(){
            loader.show();
            this.buttonState = false;            
            this.newsession = session("image-upload");
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
           this.task.on("progress", (e)=>{
                        console.log('current bytes : ',e.currentBytes,'total bytes : ', e.totalBytes)
            });
           this.task.on("error", this.logEvent);
           this.task.on("complete", (e)=>{
               this.logEvent(e);
               this.putAddcar()
               console.log("Upload Complete :  : ","fleet id : ", this.fleetID,"image id: ", this.imageID)               
        });
    }

    logEvent(e) {
            switch (e.eventName) {
                case "complete":
                    console.log("Upload Complete")
                    break;
                case "error":
                    alert("Upload Error :"+JSON.stringify(e))
                    console.log("Upload Error : "+JSON.stringify(e))
                    break;
            
                default:
                    break;
        }
    }
}

