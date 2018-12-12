import { Http, Headers } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as models from '../model/models';
import { Configuration } from '../configuration';
export declare class ClientApi {
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
     * Appointments allow clients to schedule service.
     * Retrieves an appointment by id
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdGet(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.AppointmentSearchModel>;
    /**
     * The location of an appointment pickup
     * An appointment location
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdLocationGet(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.LocationModel>;
    /**
     * Appointments have a location for pickup
     * Post a location for an appointment
     * @param appointmentId The id of the appointment
     * @param appointmentLocationRequest The location of an appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdLocationPut(appointmentId: string, appointmentLocationRequest: models.LocationModel, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
    /**
     * Appointments include pickups
     * Retrieves the pickup data associated with an appointment
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdPickupGet(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.PickupSearchModel>;
    /**
     * Appointments allow clients to schedule service
     * Puts an appointment at id
     * @param appointmentId the id of the appointment
     * @param appointmentRequest the appointment being added to the system
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdPut(appointmentId: string, appointmentRequest: models.AppointmentModel, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
    /**
     * The appointment service selections
     * Returns the service selections of an appointment
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdServiceSelectionGet(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Array<models.ServiceSelectionSearchModel>>;
    /**
     * The appointment service selections
     * Returns the service selections of an appointment
     * @param appointmentId The id of the appointment
     * @param serviceSelectionId the id of the association between a user selected service and an appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdServiceSelectionServiceSelectionIdGet(appointmentId: string, serviceSelectionId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.ServiceSelectionSearchModel>;
    /**
     * The appointment service selections
     * Returns the service selections of an appointment
     * @param appointmentId The id of the appointment
     * @param serviceSelectionId the id of the association between a user selected service and an appointment
     * @param serviceSelection Model to send update the to the appointment&#39;s service selection
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdServiceSelectionServiceSelectionIdPut(appointmentId: string, serviceSelectionId: string, serviceSelection: models.ServiceSelectionModel, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
    /**
     * User makes an appointment
     * Returns the user of an appointment
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdUserGet(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.UserProfileModel>;
    /**
     * The vehicle of an appointment
     * Adds a vehicle to this appointment
     * @param appointmentId Appointment Id
     * @param appointmentVehicleRequest Appointment Vehicle Request
     * @param authorization Authorization header
     */
    appointmentAppointmentIdVehiclePut(appointmentId: string, appointmentVehicleRequest: models.AppointmentVehicleModel, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
    /**
     * Appointments allow clients to schedule service
     * Retrieves a list of appointments
     * @param authorization Authorization Header
     * @param vendorId vendorId
     */
    appointmentGet(authorization?: string, vendorId?: string, extraHttpRequestParams?: any): Observable<Array<models.AppointmentSearchModel>>;
    /**
     * The location of the pickup
     * Stores the coordinates and reverse lookup address where available
     * @param authorization Authorization Header
     */
    locationGet(authorization?: string, extraHttpRequestParams?: any): Observable<Array<models.LocationModel>>;
    /**
     * Users submit location data for pickups
     * Retrieves a location by id
     * @param locationId
     * @param authorization Authorization Header
     */
    locationLocationIdGet(locationId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.LocationModel>;
    /**
     * Drivers, Car Model and Color, and time of departure and eta are data returneed for pickups
     * Retrieves a list of pickups
     * @param authorization Authorization Header
     */
    pickupGet(authorization?: string, extraHttpRequestParams?: any): Observable<Array<models.PickupSearchModel>>;
    /**
     * Drivers, Car Model and Color, and time of departure and eta are data returned for pickups
     * Returns a pickup with the given id
     * @param pickupId
     * @param authorization Authorization Header
     */
    pickupPickupIdGet(pickupId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.PickupSearchModel>;
    /**
     * Services are specific jobs advertised for the conceirge pickup
     * Returns a list of services
     * @param authorization Authorization Header
     */
    serviceGet(authorization?: string, extraHttpRequestParams?: any): Observable<Array<models.ServiceModel>>;
    /**
     * Service Selections represent user selected service items
     * Returns an collection of service selections
     * @param authorization Authorization Header
     */
    serviceSelectionGet(authorization?: string, extraHttpRequestParams?: any): Observable<Array<models.ServiceSelectionSearchModel>>;
    /**
     * Service Selection represents a user selected service
     * Returns the selection with the given id
     * @param serviceSelectionId the id of the service selection (an association between an appointment and a service)
     * @param authorization Authorization Header
     */
    serviceSelectionServiceSelectionIdGet(serviceSelectionId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.ServiceSelectionSearchModel>;
    /**
     * Services are specific jobs advertised for the conceirge pickup
     * Returns a list of services
     * @param serviceId the id of the service
     * @param authorization Authorization Header
     */
    serviceServiceIdGet(serviceId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.ServiceModel>;
    /**
     * Users
     * Returns a list of users
     * @param authorization Authorization Header
     */
    userGet(authorization?: string, extraHttpRequestParams?: any): Observable<Array<models.UserProfileModel>>;
    /**
     * The user
     * Returns a user profile
     * @param userId the id of the user
     * @param authorization Authorization Header
     */
    userUserIdGet(userId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.UserProfileModel>;
    /**
     * The user
     * Returns a user profile
     * @param userId the id of the user
     * @param authorization Authorization Header
     */
    userUserIdPut(userId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.UserProfileModel>;
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
     * Appointments allow clients to schedule service.
     * Retrieves an appointment by id
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdGetWithHttpInfo(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * The location of an appointment pickup
     * An appointment location
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdLocationGetWithHttpInfo(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Appointments have a location for pickup
     * Post a location for an appointment
     * @param appointmentId The id of the appointment
     * @param appointmentLocationRequest The location of an appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdLocationPutWithHttpInfo(appointmentId: string, appointmentLocationRequest: models.LocationModel, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Appointments include pickups
     * Retrieves the pickup data associated with an appointment
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdPickupGetWithHttpInfo(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Appointments allow clients to schedule service
     * Puts an appointment at id
     * @param appointmentId the id of the appointment
     * @param appointmentRequest the appointment being added to the system
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdPutWithHttpInfo(appointmentId: string, appointmentRequest: models.AppointmentModel, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * The appointment service selections
     * Returns the service selections of an appointment
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdServiceSelectionGetWithHttpInfo(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * The appointment service selections
     * Returns the service selections of an appointment
     * @param appointmentId The id of the appointment
     * @param serviceSelectionId the id of the association between a user selected service and an appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdServiceSelectionServiceSelectionIdGetWithHttpInfo(appointmentId: string, serviceSelectionId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * The appointment service selections
     * Returns the service selections of an appointment
     * @param appointmentId The id of the appointment
     * @param serviceSelectionId the id of the association between a user selected service and an appointment
     * @param serviceSelection Model to send update the to the appointment&#39;s service selection
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdServiceSelectionServiceSelectionIdPutWithHttpInfo(appointmentId: string, serviceSelectionId: string, serviceSelection: models.ServiceSelectionModel, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * User makes an appointment
     * Returns the user of an appointment
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdUserGetWithHttpInfo(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * The vehicle of an appointment
     * Adds a vehicle to this appointment
     * @param appointmentId Appointment Id
     * @param appointmentVehicleRequest Appointment Vehicle Request
     * @param authorization Authorization header
     */
    appointmentAppointmentIdVehiclePutWithHttpInfo(appointmentId: string, appointmentVehicleRequest: models.AppointmentVehicleModel, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Appointments allow clients to schedule service
     * Retrieves a list of appointments
     * @param authorization Authorization Header
     * @param vendorId vendorId
     */
    appointmentGetWithHttpInfo(authorization?: string, vendorId?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * The location of the pickup
     * Stores the coordinates and reverse lookup address where available
     * @param authorization Authorization Header
     */
    locationGetWithHttpInfo(authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Users submit location data for pickups
     * Retrieves a location by id
     * @param locationId
     * @param authorization Authorization Header
     */
    locationLocationIdGetWithHttpInfo(locationId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Drivers, Car Model and Color, and time of departure and eta are data returneed for pickups
     * Retrieves a list of pickups
     * @param authorization Authorization Header
     */
    pickupGetWithHttpInfo(authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Drivers, Car Model and Color, and time of departure and eta are data returned for pickups
     * Returns a pickup with the given id
     * @param pickupId
     * @param authorization Authorization Header
     */
    pickupPickupIdGetWithHttpInfo(pickupId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Services are specific jobs advertised for the conceirge pickup
     * Returns a list of services
     * @param authorization Authorization Header
     */
    serviceGetWithHttpInfo(authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Service Selections represent user selected service items
     * Returns an collection of service selections
     * @param authorization Authorization Header
     */
    serviceSelectionGetWithHttpInfo(authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Service Selection represents a user selected service
     * Returns the selection with the given id
     * @param serviceSelectionId the id of the service selection (an association between an appointment and a service)
     * @param authorization Authorization Header
     */
    serviceSelectionServiceSelectionIdGetWithHttpInfo(serviceSelectionId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Services are specific jobs advertised for the conceirge pickup
     * Returns a list of services
     * @param serviceId the id of the service
     * @param authorization Authorization Header
     */
    serviceServiceIdGetWithHttpInfo(serviceId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Users
     * Returns a list of users
     * @param authorization Authorization Header
     */
    userGetWithHttpInfo(authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * The user
     * Returns a user profile
     * @param userId the id of the user
     * @param authorization Authorization Header
     */
    userUserIdGetWithHttpInfo(userId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * The user
     * Returns a user profile
     * @param userId the id of the user
     * @param authorization Authorization Header
     */
    userUserIdPutWithHttpInfo(userId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
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
