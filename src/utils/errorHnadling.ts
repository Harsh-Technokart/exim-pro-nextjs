/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { IApiError, IValidationError } from "@/interface/error";
import {ISnackbar} from "@/interface"

const customErrorHandler = (
  error: AxiosError<{ error?: { message: string } }>
): AxiosResponse<any> => {
  console.log(
    "session status: ",
    error.response?.data?.error?.message === "Session not found" ||
      error.response?.data?.error?.message === "Please login to continue"
  );
  console.log("error received: ", error.response?.data);
  if (
    !window.location.pathname.includes("login") &&
    (error.response?.status === 403 || error.response?.status === 404) &&
    (error.response?.data?.error?.message === "Session not found" ||
      error.response?.data?.error?.message === "Please login to continue")
  ) {
    window.location.href = "/login";
  }
  if (!error.response) {
    throw error;
  }
  return error.response;
};

const handleErrorSnackbar = (
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setSnackbar: Dispatch<SetStateAction<ISnackbar>>,
  error: IApiError | IValidationError[],
  type?: string
) => {
  setIsLoading(false);

  if (Array.isArray(error) && type === "validationError") {
    setSnackbar({
      open: true,
      message: `${error[0].message}`,
      status: "danger",
    });
  } else if (!Array.isArray(error)) {
    setSnackbar({
      open: true,
      message: error.message,
      status: "danger",
    });
  }
};

export { customErrorHandler, handleErrorSnackbar };
