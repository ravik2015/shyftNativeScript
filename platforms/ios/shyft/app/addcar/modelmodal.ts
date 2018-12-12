import { Component, ElementRef, ViewChild, OnInit, Directive, ViewContainerRef, TemplateRef, Inject } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Page } from "ui/page";
import { Router, ActivatedRoute } from "@angular/router";
import { ActivityIndicator } from "ui/activity-indicator";
import { AddcarService } from "./addcar.services";
import * as ApplicationSettings from "application-settings";

@Component({
    selector: "my-modelmodal",
    templateUrl: "modelmodal.html",
    providers: [AddcarService]
})
export class ModelModalComponent implements OnInit {
    public modelData: Array<string>;
    public busy = true;

    public constructor(private params: ModalDialogParams, private _page: Page, private addcarService: AddcarService, private router: Router, private route: ActivatedRoute) {
        this.modelData = [];   
        this.modelData = params.context.data;     
    }


    ngOnInit(): void {
      
    }

    public onModelTap(args){
        let tappedView = args.view,
        tappedModel = tappedView.bindingContext;
        console.log("Selected Model :" + args.index + " . " + JSON.stringify(tappedModel))
        this.close(tappedModel)
    }

    public close(res: string) {
        this.params.closeCallback(res);
    }

}

