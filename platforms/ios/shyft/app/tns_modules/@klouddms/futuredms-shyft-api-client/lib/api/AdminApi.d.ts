import { Http, Headers } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as models from '../model/models';
import { Configuration } from '../configuration';
export declare class AdminApi {
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
     * Appointments include pickups
     * Retrieves the pickup data associated with an appointment
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdPickupGet(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.PickupSearchModel>;
    /**
     * Appointments include pickups
     * Updates the pickup data associated with an appointment
     * @param appointmentId The id of the appointment
     * @param pickupRequest The pickup model for update
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdPickupPut(appointmentId: string, pickupRequest: models.PickupModel, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
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
     * User makes an appointment
     * Returns the user of an appointment
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdUserGet(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.UserProfileModel>;
    /**
     * Appointments allow clients to schedule service
     * Retrieves a list of appointments
     * @param authorization Authorization Header
     * @param vendorId vendorId
     */
    appointmentGet(authorization?: string, vendorId?: string, extraHttpRequestParams?: any): Observable<Array<models.AppointmentSearchModel>>;
    /**
     *
     *
     * @param driverId the id of the driver
     * @param authorization Authorization Header
     * @param userId
     */
    driversDriverIdPut(driverId: string, authorization?: string, userId?: models.DriverProfile, extraHttpRequestParams?: any): Observable<{}>;
    /**
     *
     *
     * @param authorization Authorization Header
     */
    driversGet(authorization?: string, extraHttpRequestParams?: any): Observable<Array<models.NewUserProfileModel>>;
    /**
     *
     *
     * @param authorization Authorization Header
     */
    fleetGet(authorization?: string, extraHttpRequestParams?: any): Observable<Array<models.FleetSearchModel>>;
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
     * Services are categorized
     *
     * @param authorization Authorization Header
     */
    serviceCategoryGet(authorization?: string, extraHttpRequestParams?: any): Observable<Array<models.ServiceCategorySearchModel>>;
    /**
     *
     *
     * @param serviceCategoryId The id of the service category
     * @param authorization the authorization token
     */
    serviceCategoryServiceCategoryIdGet(serviceCategoryId: string, authorization?: string, extraHttpRequestParams?: any): Observable<models.ServiceCategorySearchModel>;
    /**
     *
     *
     * @param serviceCategoryId The id of the service category
     * @param serviceCategoryRequest Add or update service category data
     * @param authorization the authorization token
     */
    serviceCategoryServiceCategoryIdPut(serviceCategoryId: string, serviceCategoryRequest: models.ServiceCategoryModel, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
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
     * Services can be added to enhance a vendor&#39;s offering
     * Adds or updates a vendor&#39;s service
     * @param serviceId the id of the service
     * @param servicePayload The details of the service
     * @param authorization Authorization Header
     */
    serviceServiceIdPut(serviceId: string, servicePayload: models.ServiceModel, authorization?: string, extraHttpRequestParams?: any): Observable<{}>;
    /**
     * Users
     * Returns a list of users
     * @param authorization Authorization Header
     */
    userGet(authorization?: string, extraHttpRequestParams?: any): Observable<Array<models.UserProfileModel>>;
    /**
     * The user
     * Returns a user profile
     * @param newUserProfileRequest the request body
     * @param authorization Authorization Header
     */
    userPost(newUserProfileRequest: models.NewUserProfileModel, authorization?: string, extraHttpRequestParams?: any): Observable<models.UserProfileModel>;
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
    userUserIdPut(userId: string, userProfileRequest: models.NewUserProfileModel, authorization?: string, extraHttpRequestParams?: any): Observable<models.NewUserProfileModel>;
    /**
     *
     *
     * @param vendorId
     * @param vendorLocationRequest The location object of the vendor
     */
    vendorVendorIdLocationPut(vendorId: string, vendorLocationRequest: models.LocationModel, extraHttpRequestParams?: any): Observable<{}>;
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
     * Appointments include pickups
     * Retrieves the pickup data associated with an appointment
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdPickupGetWithHttpInfo(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Appointments include pickups
     * Updates the pickup data associated with an appointment
     * @param appointmentId The id of the appointment
     * @param pickupRequest The pickup model for update
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdPickupPutWithHttpInfo(appointmentId: string, pickupRequest: models.PickupModel, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
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
     * User makes an appointment
     * Returns the user of an appointment
     * @param appointmentId The id of the appointment
     * @param authorization Authorization Header
     */
    appointmentAppointmentIdUserGetWithHttpInfo(appointmentId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Appointments allow clients to schedule service
     * Retrieves a list of appointments
     * @param authorization Authorization Header
     * @param vendorId vendorId
     */
    appointmentGetWithHttpInfo(authorization?: string, vendorId?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     *
     *
     * @param driverId the id of the driver
     * @param authorization Authorization Header
     * @param userId
     */
    driversDriverIdPutWithHttpInfo(driverId: string, authorization?: string, userId?: models.DriverProfile, extraHttpRequestParams?: any): Observable<Response>;
    /**
     *
     *
     * @param authorization Authorization Header
     */
    driversGetWithHttpInfo(authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     *
     *
     * @param authorization Authorization Header
     */
    fleetGetWithHttpInfo(authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
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
     * Services are categorized
     *
     * @param authorization Authorization Header
     */
    serviceCategoryGetWithHttpInfo(authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     *
     *
     * @param serviceCategoryId The id of the service category
     * @param authorization the authorization token
     */
    serviceCategoryServiceCategoryIdGetWithHttpInfo(serviceCategoryId: string, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     *
     *
     * @param serviceCategoryId The id of the service category
     * @param serviceCategoryRequest Add or update service category data
     * @param authorization the authorization token
     */
    serviceCategoryServiceCategoryIdPutWithHttpInfo(serviceCategoryId: string, serviceCategoryRequest: models.ServiceCategoryModel, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
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
     * Services can be added to enhance a vendor&#39;s offering
     * Adds or updates a vendor&#39;s service
     * @param serviceId the id of the service
     * @param servicePayload The details of the service
     * @param authorization Authorization Header
     */
    serviceServiceIdPutWithHttpInfo(serviceId: string, servicePayload: models.ServiceModel, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * Users
     * Returns a list of users
     * @param authorization Authorization Header
     */
    userGetWithHttpInfo(authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     * The user
     * Returns a user profile
     * @param newUserProfileRequest the request body
     * @param authorization Authorization Header
     */
    userPostWithHttpInfo(newUserProfileRequest: models.NewUserProfileModel, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
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
    userUserIdPutWithHttpInfo(userId: string, userProfileRequest: models.NewUserProfileModel, authorization?: string, extraHttpRequestParams?: any): Observable<Response>;
    /**
     *
     *
     * @param vendorId
     * @param vendorLocationRequest The location object of the vendor
     */
    vendorVendorIdLocationPutWithHttpInfo(vendorId: string, vendorLocationRequest: models.LocationModel, extraHttpRequestParams?: any): Observable<Response>;
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
