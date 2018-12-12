import { Http, Headers } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as models from '../model/models';
import { Configuration } from '../configuration';
export declare class BackOfficeApi {
    protected http: Http;
    protected basePath: string;
    defaultHeaders: Headers;
    configuration: Configuration;
    constructor(http: Http, basePath: string, configuration: Configuration);
    /**
     *
     * Extends object by coping non-existing properties.
     * @param objA object to be extended
     * @param objB source object
     */
    private extendObj<T1, T2>(objA, objB);
    /**
     * Adding and updating vendors
     * adds or updates a vendor at the given id
     * @param fleetId the id of the fleet vehicle
     * @param fleetRequest adds or updates a vehicle in the fleet
     * @param authorization Authorization Header
     */
    fleetFleetIdPut(fleetId: string, fleetRequest: models.FleetModel, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
    /**
     * The vendor list allows the backoffice to manage shyft auto customers
     * Retrieves a list of Vendors
     * @param authorization Authorization Header
     */
    vendorGet(authorization?: string, extraHttpRequestParams?: any): Observable<Array<models.VendorSearchModel>>;
    /**
     * A vendor defines services in a service area
     * retrieves a vendor
     * @param vendorId the id of a vendor
     * @param authorization Authorization Header
     */
    vendorVendorIdGet(vendorId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.VendorSearchModel>;
    /**
     * Adding and updating vendors
     * adds or updates a vendor at the given id
     * @param vendorId the id of the vendor
     * @param vendorRequest vendor data
     * @param authorization Authorization Header
     */
    vendorVendorIdPut(vendorId: string, vendorRequest: models.VendorModel, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
    /**
     * Adding and updating vendors
     * adds or updates a vendor at the given id
     * @param vendorId the id of the vendor
     * @param authorization Authorization Header
     */
    vendorVendorIdServicesGet(vendorId: string, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
    /**
     * Remove Vendor Service
     *
     * @param vendorId the id of the vendor
     * @param vendorServiceId the id of the association between vendor and service
     * @param authorization Authorization Header
     */
    vendorVendorIdServicesVendorServiceIdDelete(vendorId: string, vendorServiceId: string, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
    /**
     * Retrieving Vendor Services
     *
     * @param vendorId the id of the vendor
     * @param vendorServiceId the id of the association between vendor and service
     * @param authorization Authorization Header
     */
    vendorVendorIdServicesVendorServiceIdGet(vendorId: string, vendorServiceId: string, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
    /**
     * Update Vendor Service
     *
     * @param vendorId the id of the vendor
     * @param vendorServiceId the id of the association between vendor and service
     * @param authorization Authorization Header
     */
    vendorVendorIdServicesVendorServiceIdPut(vendorId: string, vendorServiceId: string, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
    /**
     * Adding and updating vendors
     * adds or updates a vendor at the given id
     * @param fleetId the id of the fleet vehicle
     * @param fleetRequest adds or updates a vehicle in the fleet
     * @param authorization Authorization Header
     */
    fleetFleetIdPutWithHttpInfo(fleetId: string, fleetRequest: models.FleetModel, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * The vendor list allows the backoffice to manage shyft auto customers
     * Retrieves a list of Vendors
     * @param authorization Authorization Header
     */
    vendorGetWithHttpInfo(authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * A vendor defines services in a service area
     * retrieves a vendor
     * @param vendorId the id of a vendor
     * @param authorization Authorization Header
     */
    vendorVendorIdGetWithHttpInfo(vendorId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Adding and updating vendors
     * adds or updates a vendor at the given id
     * @param vendorId the id of the vendor
     * @param vendorRequest vendor data
     * @param authorization Authorization Header
     */
    vendorVendorIdPutWithHttpInfo(vendorId: string, vendorRequest: models.VendorModel, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Adding and updating vendors
     * adds or updates a vendor at the given id
     * @param vendorId the id of the vendor
     * @param authorization Authorization Header
     */
    vendorVendorIdServicesGetWithHttpInfo(vendorId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Remove Vendor Service
     *
     * @param vendorId the id of the vendor
     * @param vendorServiceId the id of the association between vendor and service
     * @param authorization Authorization Header
     */
    vendorVendorIdServicesVendorServiceIdDeleteWithHttpInfo(vendorId: string, vendorServiceId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Retrieving Vendor Services
     *
     * @param vendorId the id of the vendor
     * @param vendorServiceId the id of the association between vendor and service
     * @param authorization Authorization Header
     */
    vendorVendorIdServicesVendorServiceIdGetWithHttpInfo(vendorId: string, vendorServiceId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Update Vendor Service
     *
     * @param vendorId the id of the vendor
     * @param vendorServiceId the id of the association between vendor and service
     * @param authorization Authorization Header
     */
    vendorVendorIdServicesVendorServiceIdPutWithHttpInfo(vendorId: string, vendorServiceId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
}
