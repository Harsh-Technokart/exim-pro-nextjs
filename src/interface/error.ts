export interface IApiError {
    message: string;
  }
  
  export interface IValidationError {
    key: string;
    message: string;
  }
  
  export interface ISessionError {
      status: number;
  }
  