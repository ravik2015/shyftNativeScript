export interface UserProfileModel {
    id?: string;
    first_name?: string;
    last_name?: string;
    date_joined?: string;
    image?: string;
    /**
     * Role:  * Driver - Drives a fleet car or a customer car to/from the dealership and customer location  * Admin - Manages customer tickets  * Customer - Uses the mobile app to book and pay for  appointments
     */
    role?: UserProfileModel.RoleEnum;
}
export declare namespace UserProfileModel {
    enum RoleEnum {
        Driver,
        Admin,
        Customer,
    }
}
