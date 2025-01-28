// "use client";
import React from "react";
import styles from "@/app/login/login-page.module.css";
import { NavBar } from "@/components/login/NavBar";
import { LogoImage, LoginImage } from "@/components/login/LoginImage";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.page_wrapper}>
      <div className={styles.loginpage}>
        <div className={styles.logo_wrapper}>
          <LogoImage />
          <NavBar />
        </div>

        <div className={styles.login_form_wrapper}>
          <div className={styles.title}>
            <h3>Welcome to EXIM-PRO</h3>
            <p>Please enter your details</p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className={styles.login_image}>
        <LoginImage />
      </div>
    </div>
  );
}
