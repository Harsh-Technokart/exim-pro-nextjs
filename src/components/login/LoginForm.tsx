"use client";

import * as yup from "yup";

import { Box, Button, Checkbox, Link, Stack } from "@mui/joy";
import React, { useState } from "react";
import { Snackbar, TextInput } from "@/components";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { ISnackbar } from "@/interface";
import { handleErrorSnackbar } from "@/utils/errorHnadling";
import { login } from "@/api";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/stores";

function LoginForm() {
  const router = useRouter();
  const setSession = useSessionStore((state) => state.setSession);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showPasswordToggle = () => setPasswordVisible(!passwordVisible);
  const [snackbar, setSnackbar] = React.useState<ISnackbar>({
    open: false,
    message: "",
    status: "success",
  });

  const proceedHandler = async () => {
    setLoading(true);
    await login(formik.values).then((response) => {
      if (response.status) {
        setSession(response.data);
        setSnackbar({
          open: true,
          message: "Login Successful",
          status: "success",
        });
        router.push("/home/project-management");
      } else if (response.error) {
        handleErrorSnackbar(
          setLoading,
          setSnackbar,
          response.error,
          response.type
        );
      } else {
        setSnackbar({
          open: true,
          message: "Invalid Credentials",
          status: "danger",
        });
      }
    });
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: proceedHandler,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          required={true}
          value={formik.values.email}
          item={{
            label: "Email",
            name: "email",
            placeholder: "Email",
            type: "text",
          }}
          formik={formik}
        />
        <TextInput
          value={formik.values.password}
          item={{
            label: "Password",
            name: "password",
            placeholder: "Password",
            type: passwordVisible ? "text" : "password",
          }}
          endDecorator={
            passwordVisible ? (
              <Visibility onClick={showPasswordToggle} />
            ) : (
              <VisibilityOff onClick={showPasswordToggle} />
            )
          }
          required={true}
          formik={formik}
        />
        <Stack sx={{ gap: 4, mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Checkbox size="sm" label="Remember me" name="persistent" />
            <Link underline="always" level="title-sm" href="#">
              Forgot your password?
            </Link>
          </Box>
          <Button loading={loading} type="submit">
            Sign in
          </Button>
        </Stack>
        <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      </form>
    </div>
  );
}
export default LoginForm;
