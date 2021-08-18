export interface Error {
  message: string;
  field: string;
}

export interface GeneralResponse {
  message?: String;
  error?: Error;
}
