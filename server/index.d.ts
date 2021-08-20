export interface Error {
  message: string;
  field: string;
}

export interface GeneralResponse {
  message?: String;
  error?: Error;
}

interface UserResponse {
  token: string;
  userId: number
}

export interface LoginResponse {
  user?: UserResponse
  error?: Error
}
