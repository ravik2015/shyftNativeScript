import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { ObservableArray, ChangedData, ChangeType } from "tns-core-modules/data/observable-array";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { PickupService } from "./pickup.services";
import { Router, ActivatedRoute } from "@angular/router";
import { Switch } from "ui/switch";
import { TextField } from "ui/text-field";
import { TokenModel } from "nativescript-pro-ui/autocomplete";
import { RouterExtensions } from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";

@Component({
    selector: "my-addressmodal",
    templateUrl: "addressmodal.html",
    providers: [PickupService]    
})
export class AddressModalComponent{

    private _items: ObservableArray<TokenModel>;
    private countries = [];
    public address;
    public text;
    public lat;
    public long;

    @ViewChild("textField") textField: ElementRef;    

    constructor(private pickupService: PickupService, private params: ModalDialogParams,){
        this.initDataItems();
        this.lat = params.context.latitude;
        this.long = params.context.longitude;       
        this.address = params.context.search; 
    }

    get dataItems(): ObservableArray<TokenModel> {
        return this._items;
      }
    
      private initDataItems() {
        this._items = new ObservableArray<TokenModel>();
    
        for (var i = 0; i < this.countries.length; i++) {
          this._items.push(new TokenModel(this.countries[i], undefined));
        }
      }

    public onTextChange(args) {
        let textField = <TextField>args.object;
        this.text = textField.text;
        this.places();
      }

    public places(){
        this._items.length = 0;
        this.pickupService.getAddress(this.long, this.lat, this.text)
          .subscribe((result) => {
            result.predictions.map((item) => {
              console.log(JSON.stringify(item.description));                  
              this._items.push(new TokenModel(item.description, undefined));
            });
          }, (error) => {
            console.log(error);
          });    
        }
    
        public itemTapped(args, text) {
            this._items.length = 0;
            let textField = <TextField>this.textField.nativeElement;
            textField.dismissSoftInput();
            this.close(text.text)
          }
        
      public onBack(){
        console.log("address is ,", this.address)
        this.close(this.address)
      }

      public close(res: string) {
            this.params.closeCallback(res);
        }

      public pressed(){
        this.address = ""
      }
}






