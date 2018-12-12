import { UserProfileModel } from './UserProfileModel';
export interface NewUserProfileModel extends UserProfileModel {
    email?: string;
    phone?: string;
    vendor?: string;
}
