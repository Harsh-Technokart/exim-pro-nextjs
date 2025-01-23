
"use client";
import React from "react";
import styles from "@/app/login/login-page.module.css"; // Importing the CSS module
import { NavBar } from "@/components/login/nav";
import { LogoImage, LoginImage } from "@/components/login/image";
import LoginForm from "@/components/login/form";
import { Snackbar } from "@/components";
import { ISnackbar } from "@/interface";

export default function LoginPage() {
  const [snackbar, setSnackbar] = React.useState<ISnackbar>({
    open: false,
    message: "",
    status: "success",
  });

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.login_form_wrapper}>
        <div className={styles.logo_wrapper}>
          <LogoImage />
          <NavBar />
        </div>
        <h3>Welcome to EXIM-PRO</h3>
        <p>Please enter your details</p>
        <LoginForm />
      </div>
      <div className={styles.login_image}>
        <LoginImage />
      </div>
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </div>
  );
}
