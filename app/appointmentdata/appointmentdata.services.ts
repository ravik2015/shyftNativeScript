import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as ApplicationSettings from "application-settings";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import * as utils from '../shared/utils';
import { isAndroid, isIOS, device, screen } from "platform";

@Injectable()
export class AppointmentdataService {

}
