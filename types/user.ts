export const UserRoles = ["courier", "pharmacy_admin", "pharmacy_super_admin"] as const
export type UserRole = typeof UserRoles[number]

export interface User {
    id: number;
    name: string;
    email: string;
    role?: UserRole;
}