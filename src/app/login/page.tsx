"use client";

import * as yup from "yup";

import { Box, Button, Checkbox, Link, Stack, IconButton } from "@mui/joy";
import { Snackbar, TextInput } from "@/components";
import { Visibility, VisibilityOff, DarkMode, LightMode } from "@mui/icons-material";

import { ISnackbar } from "@/interface";
import Image from "next/image";
import React from "react";
import styles from "./login-page.module.css";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/stores";
import { ThemeContext } from "@/context/ThemeContext";
import { handleErrorSnackbar } from "@/utils/errorHnadling";
import {login} from "@/app/api/login.api"

function LoginPage() {
  const router = useRouter();
  const setSession = useSessionStore((state) => state.setSession);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Access the ThemeContext
  const { mode, handleTheme } = React.useContext(ThemeContext);

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

  const proceedHandler = async () => {
    setLoading(true);
    login(formik.values).then((response) => {
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
      }
    });
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
          <Image src={"/orbglo-logo.png"} alt="logo" width="100" height="100" />
          <IconButton onClick={handleTheme} sx={{ position: "absolute", top: 16, right: 16 }}>
            {mode === "dark" ? <DarkMode /> : <LightMode />}
          </IconButton>
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
        <Image src={"/login.png"} alt="logo" width="800" height="500" />
      </div>
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </div>
  );
}

export default LoginPage;
// "use client";

// import * as React from "react";
// import * as yup from "yup";

// import { Box, Button, Checkbox, CssBaseline, Link, Stack } from "@mui/joy";
// import { CssVarsProvider, extendTheme, useColorScheme } from "@mui/joy/styles";
// import {
//   DarkModeRounded,
//   LightModeRounded,
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";
// import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
// import { TextInput } from "@/components";
// import Snackbars from "@/components/utilities/Snackbar"

// import { ISnackbar } from "@/interface";
// import Image from "next/image";
// import { handleErrorSnackbar } from "@/utils/errorHnadling";
// import { login } from "@/app/api/loginapi";
// import { useFormik } from "formik";
// import { useRouter } from "next/navigation";
// import { useSessionStore } from "@/stores";

// function ColorSchemeToggle(props: IconButtonProps) {
//   const { onClick, ...other } = props;
//   const { mode, setMode } = useColorScheme();
//   const [mounted, setMounted] = React.useState(false);

//   React.useEffect(() => setMounted(true), []);

//   return (
//     <IconButton
//       aria-label="toggle light/dark mode"
//       size="lg"
//       sx={{ width: 40, height: 40, borderRadius: 50 }}
//       variant="outlined"
//       disabled={!mounted}
//       onClick={(event) => {
//         setMode(mode === "light" ? "dark" : "light");
//         onClick?.(event);
//       }}
//       {...other}
//     >
//       {mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
//     </IconButton>
//   );
// }

// const customTheme = extendTheme();

// const LoginPage = () => {
//   const router = useRouter();
//   const setSession = useSessionStore((state) => state.setSession);
//   const [passwordVisible, setPasswordVisible] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);
//   const [snackbar, setSnackbar] = React.useState<ISnackbar>({
//     open: false,
//     message: "",
//     status: "success",
//   });

//   const formFields = {
//     email: {
//       label: "Email",
//       type: "text",
//       placeholder: "Email",
//       name: "email",
//     },
//     password: {
//       label: "Password",
//       type: passwordVisible ? "text" : "password",
//       placeholder: "Password",
//       name: "password",
//     },
//   };
//   const proceedHandler = async () => {
//     setLoading(true);
//     login(formik.values).then((response) => {
//       if (response.status) {
//         setSession(response.data);
//         setSnackbar({
//           open: true,
//           message: "Login Successful",
//           status: "success",
//         });
//         router.push("/home/project-management");
//       } else if (response.error) {
//         handleErrorSnackbar(
//           setLoading,
//           setSnackbar,
//           response.error,
//           response.type
//         );
//       }
//     });
//   };

//   const formik = useFormik({
//     initialValues: { email: "", password: "" },
//     validationSchema: yup.object().shape({
//       email: yup.string().required("Email is required"),
//       password: yup.string().required("Password is required"),
//     }),
//     onSubmit: proceedHandler,
//   });

//   const showPasswordToggle = () => {
//     setPasswordVisible((prevstate) => !prevstate);
//   };

//   return (
//     <CssVarsProvider theme={customTheme} disableTransitionOnChange>
//       <CssBaseline />
//       <Snackbars snackbar={snackbar} setSnackbar={setSnackbar} />
//       <Box
//         sx={(theme) => ({
//           width: { xs: "100%", md: "50vw" },
//           transition: "width var(--Transition-duration)",
//           transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
//           position: "relative",
//           zIndex: 1,
//           display: "flex",
//           justifyContent: "flex-end",
//           backgroundColor: "rgba(255 255 255 / 0.2)",
//           [theme.getColorSchemeSelector("dark")]: {
//             backgroundColor: "rgba(19 19 24 / 0.4)",
//           },
//         })}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             minHeight: "100dvh",
//             width: "100%",
//             px: 2,
//           }}
//         >
//           <Box
//             component="header"
//             sx={{
//               py: 3,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
//               <Image alt="logo" src={"/logo.svg"} width="100" height="100" />
//             </Box>
//             <ColorSchemeToggle />
//           </Box>
//           <Box
//             component="main"
//             sx={{
//               m: "auto",
//               py: 2,
//               pb: 5,
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               width: 400,
//               maxWidth: "100%",
//               borderRadius: "sm",
//               "& form": {
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2,
//               },
//               [`& .MuiFormLabel-asterisk`]: {
//                 visibility: "hidden",
//               },
//             }}
//           >
//             <Stack sx={{ gap: 4, mt: 2 }}>
//               <form onSubmit={formik.handleSubmit}>
//                 <TextInput
//                   required={true}
//                   value={formik.values.email}
//                   item={formFields.email}
//                   formik={formik}
//                 />
//                 <TextInput
//                   value={formik.values.password}
//                   item={formFields.password}
//                   endDecorator={
//                     passwordVisible ? (
//                       <Visibility onClick={showPasswordToggle} />
//                     ) : (
//                       <VisibilityOff onClick={showPasswordToggle} />
//                     )
//                   }
//                   required={true}
//                   formik={formik}
//                 />
//                 <Stack sx={{ gap: 4, mt: 2 }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Checkbox size="sm" label="Remember me" name="persistent" />
//                     <Link underline="always" level="title-sm" href="#">
//                       Forgot your password?
//                     </Link>
//                   </Box>
//                   <Button loading={loading} type="submit">
//                     Sign in
//                   </Button>
//                 </Stack>
//               </form>
//             </Stack>
//           </Box>
//         </Box>
//       </Box>
//       <Box
//         sx={(theme) => ({
//           height: "100%",
//           position: "fixed",
//           right: 0,
//           top: 0,
//           bottom: 0,
//           left: { xs: 0, md: "50vw" },
//           transition:
//             "background-image var(--Transition-duration), left var(--Transition-duration) !important",
//           transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
//           backgroundColor: "background.level1",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           backgroundImage: `url('/smLoginPage.png')`,
//           [theme.breakpoints.up("md")]: {
//             backgroundImage: `url('/login.png')`, // For md and above
//             left: "50vw",
//           },
//           [theme.getColorSchemeSelector("dark")]: {
//             backgroundImage: `url('/smLoginPage.png')`,
//             [theme.breakpoints.up("md")]: {
//               backgroundImage: `url('/login.png')`, // For md and above
//             },
//           },
//         })}
//       />
//     </CssVarsProvider>
//   );
// };

// export default LoginPage;
