export interface Auth {
  token: string;
  userId: number;
}

export interface Error {
  field: string;
  message: string;
}

interface AuthResponse {
  message?: string;
  error?: Error;
}
export interface LoginResponse {
  user?: Auth;
  error?: Error;
}
