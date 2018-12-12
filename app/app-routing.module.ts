import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", loadChildren: "./login/login.module#LoginModule" },    
    { path: "carlist", loadChildren: "./carlist/carlist.module#CarlistModule" },    
    { path: "vendorlist", loadChildren: "./vendorlist/vendorlist.module#VendorlistModule" },    
    { path: "selectservice", loadChildren: "./selectservice/selectservice.module#SelectserviceModule" }, 
    { path: "addcar", loadChildren: "./addcar/addcar.module#AddcarModule" },        
    { path: "agreement", loadChildren: "./agreement/agreement.module#AgreementModule" },    
    { path: "recalls", loadChildren: "./recalls/recalls.module#RecallsModule" },    
    { path: "calendar", loadChildren: "./calendar/calendar.module#CalendarModule" },       
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "appointmentlisting", loadChildren: "./appointmentlisting/appointmentlisting.module#AppointmentlistingModule" },     
    { path: "appointmentdata", loadChildren: "./appointmentdata/appointmentdata.module#AppointmentdataModule" }, 
    { path: "addcustomer", loadChildren: "./addcustomer/addcustomer.module#AddcustomerModule" },
    { path: "pickup", loadChildren: "./pickup/pickup.module#PickupModule" },
    { path: "servicecategory", loadChildren: "./servicecategory/servicecategory.module#ServicecategoryModule" },
    { path: "status", loadChildren: "./status/status.module#StatusModule" },    
    { path: "connect", loadChildren: "./connect/connect.module#ConnectModule" },        
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
