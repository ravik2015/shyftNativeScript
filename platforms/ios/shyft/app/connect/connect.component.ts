import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as moment from 'moment';
import { ConnectService } from "./connect.services";
import { MQTTClient } from "nativescript-mqtt";
import { Message } from "nativescript-mqtt/common";
import * as ApplicationSettings from "application-settings";
import { Page } from "ui/page";
import { UUID } from 'angular2-uuid';

const MQTT_TOPIC = 'futuredms/shyft-auto-dashboard';

@Component({
    selector: "Connect",
    moduleId: module.id,
    styleUrls: ['connect.css'],
    templateUrl: "./connect.component.html",
    providers: [ConnectService]
})

export class ConnectComponent implements OnInit {
    client;
    url;

    public constructor(private router: Router, private _page: Page, private connectService: ConnectService, private route: ActivatedRoute, private routerExtensions: RouterExtensions) {
        this.route.queryParams.subscribe(params => {

        });
    }

    ngOnInit() {
        this._page.actionBarHidden = true;        
        this.connectService.signature().subscribe(signedUrl => {
            console.log("Signature Service : ", signedUrl.url)
            this.url = signedUrl.url;
            const mqtt_clientOptions: any = {
                host: this.url,
                port: 433,
                path: "futuredms/shyft-auto-dashboard",
                useSSL: false
            };
            this.client = new MQTTClient(mqtt_clientOptions)
            this.setupHandlers();
        });
    }

    connect(){
        console.log("here in connect ")
        try{
            this.client.connect('username','password');
            
            // this.client.connect(this.url, { protocolId: 'MQTT',  protocolVersion: 3});
            this.setupHandlers()
        }
        catch (e) {
            console.log("Caught error: " + e);
        }
    }

    setupHandlers() : void {
        console.log("here in setupHandlers ")
        
        this.client.onConnectionFailure.on((err) => {
            console.log("Connection failed: " + err);
        });

        this.client.onConnectionSuccess.on(() => {
            console.log("Connected successfully!");
            // this.subscribe();
        });

        this.client.onConnectionLost.on((err) => {
            console.log("Connection lost: " + err);
        });

        this.client.onMessageArrived.on((message: Message) => {
            console.log("Message received: " + message.payload);
        });
    }


    subscribe() : void {
        try {
            this.client.subscribe(MQTT_TOPIC);
        }
        catch (e) {
            console.log("Caught error: " + e);
        }
    }


    onBack() {
        this.routerExtensions.backToPreviousPage();
    }

}
