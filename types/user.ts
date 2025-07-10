export const UserRoles = ["courier", "pharmacy_staff", "pharmacy_super_admin"] as const
export type UserRole = typeof UserRoles[number]

export interface User {
    id: string;
    email: string;
    name?: string;
    role?: UserRole;
}