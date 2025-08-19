export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}