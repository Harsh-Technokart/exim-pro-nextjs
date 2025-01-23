// "use client";

// import React from "react";
// import styles from "@/app/page.module.css";
// import { NavBar } from "../components/login/nav";
// import { LogoImage, LoginImage } from "../components/login/image";
// import { Snackbar } from "@/components";
// import { ISnackbar } from "@/interface";

// export default function LoginPageLayout({ children }: { children: React.ReactNode }) {
//   const [snackbar, setSnackbar] = React.useState<ISnackbar>({
//     open: false,
//     message: "",
//     status: "success",
//   });

//   return (
//     <div className={styles.page_wrapper}>
//       <div className={styles.login_form_wrapper}>
//         <div className={styles.logo_wrapper}>
//           <LogoImage />
//           <NavBar />
//         </div>
//         {children}
//       </div>
//       <div className={styles.login_image}>
//         <LoginImage />
//       </div>
//       <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
//     </div>
//   );
// }
