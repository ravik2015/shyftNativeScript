import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import * as ApplicationSettings from "application-settings";
import * as dialogs from "ui/dialogs";

@Component({
    selector: "Home",
    moduleId: module.id,
    styleUrls: ['home.css'],
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    public constructor(private router: Router, private route: ActivatedRoute) {

    }

    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }


    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    messageBox() {
        alert("Notification Area");
    }
    rightButton() {
        alert("Right Pressed");
    }
    add() {
        this.router.navigate(["addcar"]);
    }

    public intake() {
        this.router.navigate(["carlist"]);
    }

    public servicehistory() {
        this.router.navigate(["appointmentlisting"]);
    }
    public recalls() {
        this.router.navigate(["recalls"]);
    }

}
