export declare enum UserRole {
    STUDENT = "student",
    TEACHER = "teacher",
    ADMIN = "admin"
}
export declare class CreateUserDTO {
    name: string;
    email: string;
    age: number;
    role?: UserRole;
    username?: string;
}
