import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, ShownModallyData, NavigatedData } from "tns-core-modules/ui/page";

@Component({
    selector: "Agreement",
    moduleId: module.id,
    styleUrls: ['agreement.css'],
    templateUrl: "./agreement.component.html"
})
export class AgreementComponent implements OnInit {

    public agreement_text = "Lorem ipsum dofglor sit amet, consectfdetur adipidfgscing elit, send dfo eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Cras pulvinar mattis nunc sed blandit libero volutpat. Vulputate ut pharetra sit amet aliquam id diam. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Nisi quis eleifend quam adipiscing. Egestas fringilla phasellus faucibus scelerisque eleifend. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Et netus et malesuada fames ac turpis egestas. Interdum varius sit amet mattis. In nisl nisi scelerisque eu ultrices. Id velit ut tortor pretium viverra suspendisse. Donec adipiscing tristique risus nec feugiat in fermentum posuere urna. Consectetur libero id faucibus nisl tincidunt eget. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Nibh tellus molestie nunc non blandit massa enim. Nisi scelerisque eu ultrices vitae auctor. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Laoreet non curabitur gravida arcu ac tortor dignissim convallis. Faucibus in ornare quam viverra. Morbi leo urna molestie at elementum eu facilisis sed. Nullam ac tortor vitae purus faucibus. Cursus risus at ultrices mi tempus. Turpis tincidunt id aliquet risus feugiat in ante metus. Eget arcu dictum varius duis at consectetur. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Adipiscing enim eu turpis egestas pretium. Nam libero justo laoreet sit amet cursus sit. Tempus iaculis urna id volutpat. Suscipit adipiscing bibendum est ultricies integer quis. Mattis nunc sed blandit libero volutpat sed cras ornare. In nibh mauris cursus mattis molestie a iaculis. Vivamus arcu felis bibendum ut tristique et egestas quis ipsum."


    public constructor(private router: Router, private routerExtensions: RouterExtensions, private _page: Page) {

    }


    ngOnInit(): void {
        this._page.actionBarHidden = true;

    }


    onTap() {
        this.routerExtensions.navigate(["/addcustomer"], {
            transition: {
                name: "slideLeft",
            }
        });
    }

}
