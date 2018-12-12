import { Component, ElementRef, ViewChild, OnInit, Directive, ViewContainerRef, TemplateRef, Inject } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Page } from "ui/page";
import { Router, ActivatedRoute } from "@angular/router";
import { ActivityIndicator } from "ui/activity-indicator";
import { AddcarService } from "./addcar.services";
import * as ApplicationSettings from "application-settings";
import * as elementRegistryModule from 'nativescript-angular/element-registry';
elementRegistryModule.registerElement("FilterSelect", () => require("nativescript-filter-select").FilterSelect);

@Component({
    selector: "my-makemodal",
    templateUrl: "makemodal.html",
    providers: [AddcarService]
})
export class MakeModalComponent implements OnInit {
    public makedata: Array<string>;
    public busy = true;
    
    public constructor(private params: ModalDialogParams, private _page: Page, private addcarService: AddcarService, private router: Router, private route: ActivatedRoute) {
        this.getMakes()
        this.makedata = [];        
    }

    private getMakes(){
        this.addcarService.makeGet()
        .subscribe((result) => {
            console.log("Got Makes data")
            result.Results.map((item) => {
                this.makedata.push(item)
            })
            this.busy=false;            
        }, (error) => {
            console.log("getMakes Error : ", error)
        });
    }

    ngOnInit(): void {
      
    }
    
    public onMakeTap(args){
        let tappedView = args.view,
        tappedVehicle = tappedView.bindingContext;
        console.log("Selected Make -> " + args.index + " . " + JSON.stringify(tappedVehicle))
        this.close(tappedVehicle)
    }

    public close(res: string) {
        this.params.closeCallback(res);
    }

}

