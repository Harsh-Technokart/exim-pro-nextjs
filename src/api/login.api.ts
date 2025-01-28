import { IApiError, IValidationError } from "@/interface/error";
import axios, { AxiosResponse } from "axios";

import { customErrorHandler } from "@/utils/errorHnadling";
import { requestHeaders } from "@/utils/apiconfig.utilities";

export const login = async (data: {
  email: string;
  password: string;
}): Promise<{
  status: boolean;
  statusCode: number;
  data: {
    emailAddress: string;
    name: string;
    userRole: string;
    _id: string;
  };
  error?: IApiError | IValidationError;
  type?: "validationError";
}> => {
  const response: AxiosResponse<{
    status: boolean;
    statusCode: number;
    data: {
      emailAddress: string;
      name: string;
      userRole: string;
      _id: string;
    };
  }> = await axios
    .post(
      `${process.env.NEXT_PUBLIC_DEV_SERVER}/login`,
      {
        email_address: data.email,
        password: data.password,
      },
      requestHeaders
    )
    .catch((error) => {
      return customErrorHandler(error);
    });
  return response.data;
};

export const checkSession = async (): Promise<{
  status: boolean;
  statusCode: number;
  data: {
    emailAddress: string;
    name: string;
    userRole: string;
    _id: string;
  };
  error?: IApiError | IValidationError;
  type?: "validationError";
}> => {
  const response: AxiosResponse<{
    status: boolean;
    statusCode: number;
    data: {
      _id: string;
      emailAddress: string;
      name: string;
      userRole: string;
    };
  }> = await axios
    .get(`${process.env.NEXT_PUBLIC_DEV_SERVER}/auth/session`, requestHeaders)
    .catch((error) => {
      return customErrorHandler(error);
    });
  return response.data;
};

export const logout = async (): Promise<{
  status: boolean;
  statusCode: number;
  error?: IApiError | IValidationError;
  type?: "validationError";
}> => {
  const response: AxiosResponse<{
    status: boolean;
    statusCode: number;
  }> = await axios
    .delete(
      `${process.env.NEXT_PUBLIC_DEV_SERVER}/auth/session`,
      requestHeaders
    )
    .catch((error) => {
      return customErrorHandler(error);
    });
  return response.data;
};
