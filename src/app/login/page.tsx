"use client";

import * as yup from "yup";

import { Box, Button, Checkbox, Link, Stack } from "@mui/joy";
import { Snackbar, TextInput } from "@/components";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { ISnackbar } from "@/interface";
import Image from "next/image";
import React from "react";
import styles from "./login-page.module.css";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/stores";

function LoginPage() {
  const router = useRouter();
  const setSession = useSessionStore((state) => state.setSession);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const showPasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [snackbar, setSnackbar] = React.useState<ISnackbar>({
    open: false,
    message: "",
    status: "success",
  });
  const formFields = {
    email: {
      label: "Email",
      type: "text",
      placeholder: "Email",
      name: "email",
    },
    password: {
      label: "Password",
      type: passwordVisible ? "text" : "password",
      placeholder: "Password",
      name: "password",
    },
  };

  const proceedHandler = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    console.log(values);
    setSession({
      userRole: "admin",
      name: "Admin",
      emailAddress: "admin@exim.com",
      _id: "62d0f0c8c9b4d9e6b0b3b1d1",
    });
    setSnackbar({
      open: true,
      message: "Login successful",
      status: "success",
    });
    router.push("/dashboard");
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
    <div className={styles.page_wrapper}>
      <div className={styles.login_form_wrapper}>
        <div className={styles.logo_wrapper}>
          <Image src={"/orbglo-logo.png"} alt="logo" width="75" height="75" />
        </div>
        <h3>Welcome to EXIM-PRO</h3>
        <p>Please enter your details</p>
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            required={true}
            value={formik.values.email}
            item={formFields.email}
            formik={formik}
          />
          <TextInput
            value={formik.values.password}
            item={formFields.password}
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
        </form>
      </div>
      <div className={styles.login_image}>
        <p>Please login to continue</p>
      </div>
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </div>
  );
}

export default LoginPage;
