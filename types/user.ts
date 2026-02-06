export const UserRoles = ["courier", "pharmacy_staff", "pharmacy_super_admin", "pharmacy_apoteker"] as const
export type UserRole = typeof UserRoles[number]

// export interface User {
//     id: string;
//     email: string;
//     name?: string;
//     role?: UserRole;
//     phone?: string;
//     avatar?: string;
//     status: string
// }

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    status: "active" | "inactive";
    avatar: string;
    created_at: string;
    last_sign_in: string | null;
}

export interface CreateUserData {
    email: string
    password: string
    role?: string
    name: string
    phone?: string
    status?: "active" | "inactive"
    avatar?: string 
}
