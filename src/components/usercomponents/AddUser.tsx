import React from "react";
import { Box, Modal, Typography, Stack, Button } from "@mui/joy";
import { TextInput } from "@/components";
import { useFormik } from "formik";
import SelectUserRadio from "@/common/Radio";
import * as yup from "yup";

export default function AddUser({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const formik = useFormik({
    initialValues: {
      Username: "",
      Email: "",
      Phone: "",
      Role: "",
    },
    validationSchema: yup.object().shape({
      Username: yup.string().required("Username is required"),
      Email: yup.string().email("Invalid email").required("Email is required"),
      Phone: yup
        .string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone is required"),
      Role: yup.string().required("Role is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      onClose();
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,

          borderRadius: 2,
        }}
      >
        <Typography level="h4" component="h2" mb={2}>
          Add New User
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextInput
            value={formik.values.Username}
            item={{
              label: "Username",
              name: "Username",
              placeholder: "Enter your username",
              type: "text",
            }}
            required={true}
            formik={formik}
          />

          <TextInput
            value={formik.values.Email}
            item={{
              label: "Email",
              name: "Email",
              placeholder: "Enter your email",
              type: "email",
            }}
            required={true}
            formik={formik}
          />

          <TextInput
            value={formik.values.Phone}
            item={{
              label: "Phone",
              name: "Phone",
              placeholder: "Enter your phone number",
              type: "text",
            }}
            required={true}
            formik={formik}
          />

          <SelectUserRadio formik={formik} />

          <Stack sx={{ gap: 4, mt: 2 }}>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
