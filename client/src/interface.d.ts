export interface Auth {
    token: string
}

export interface Error {
     field: string
     message: string
}

interface AuthResponse {
    message?: string
    error?: Error
}
