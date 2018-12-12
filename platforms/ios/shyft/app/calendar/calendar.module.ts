import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular";
import { NativeScriptUICalendarModule } from "nativescript-pro-ui/calendar/angular";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { CalendarRoutingModule } from "./calendar-routing.module";
import { CalendarComponent} from "./calendar.component";
import { AvailableAppointment } from './calendar.pipe';
import { SelectService } from "../selectservice/selectservice.services"

@NgModule({
    imports: [
        NativeScriptModule,
        CalendarRoutingModule,
        NativeScriptHttpModule,
        NativeScriptUICalendarModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        CalendarComponent,
        AvailableAppointment
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        SelectService
    ]
})
export class CalendarModule { }
