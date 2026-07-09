export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export interface AuthResponse {
    token: string;
    userName: string;
    userEmail: string;
}

export interface User {
    name: string;
    email: string;
}