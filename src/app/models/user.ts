import { Roles } from "./roles";

export interface User{
    uid: string;
    email: string;
    displayName?: string;
    roles: Roles;
    banned?: boolean;
    basket?: {
        dishID: string,
        quantity: number
    }[];
}