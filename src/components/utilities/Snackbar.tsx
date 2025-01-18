"use client";

import React, { Dispatch, SetStateAction } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/joy/Snackbar";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "@mui/joy";

export default function SnackbarComponent(props: {
  snackbar: {
    open: boolean;
    message: string;
    status: "danger" | "success" | "warning";
  };
  setSnackbar: Dispatch<
    SetStateAction<{
      open: boolean;
      message: string;
      status: "danger" | "success" | "warning";
    }>
  >;
}) {
  const handleClose = (
    _event: React.SyntheticEvent | Event | null,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    props.setSnackbar({
      open: false,
      message: props.snackbar.message,
      status: props.snackbar.status,
    });
  };

  return (
    <Snackbar
      variant="soft"
      size="sm"
      sx={{ py: 1, fontSize: 14 }}
      autoHideDuration={3000}
      color={props.snackbar.status}
      open={props.snackbar.open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      endDecorator={
        <IconButton
          onClick={handleClose}
          variant="plain"
          size="sm"
          color={props.snackbar.status}
        >
          <CloseRoundedIcon />
        </IconButton>
      }
    >
      {props.snackbar.message}
    </Snackbar>
  );
}
