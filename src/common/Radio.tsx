import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { FormikProps } from "formik";
import { FormControl } from "@mui/joy";

interface FormValues {
  Username: string;
  Email: string;
  Phone: string;
  Role: string;
}

interface SelectUserRadioProps {
  formik: FormikProps<FormValues>;
}

export default function SelectUserRadio({ formik }: SelectUserRadioProps) {
  const options = ["Admin", "User"];

  return (
    <FormControl>
      <FormLabel>
        Select User Role &nbsp; <span style={{ color: "red" }}>*</span>
      </FormLabel>
      <RadioGroup
        aria-label="platform"
        overlay
        name="Role"
        value={formik.values.Role}
        onChange={formik.handleChange}
        sx={{
          flexDirection: "row",
          gap: 2,
          [`& .${radioClasses.checked}`]: {
            [`& .${radioClasses.action}`]: {
              inset: -1,
              border: "3px solid",
              borderColor: "primary.500",
            },
          },
          [`& .${radioClasses.radio}`]: {
            display: "contents",
            "& > svg": {
              zIndex: 2,
              position: "absolute",
              top: "-8px",
              right: "-8px",
              bgcolor: "background.surface",
              borderRadius: "50%",
            },
          },
        }}
      >
        {options.map((role) => (
          <Sheet
            key={role}
            variant="outlined"
            sx={{
              borderRadius: "md",
              bgcolor: "background.body",
              boxShadow: "sm",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              p: 2,
              minWidth: 100,
              margin: "auto",
            }}
          >
            <Radio
              id={role}
              value={role}
              checked={formik.values.Role === role}
              checkedIcon={<CheckCircleRoundedIcon />}
            />
            <Avatar variant="soft" size="sm" />
            <FormLabel htmlFor={role} sx={{ textAlign: "center" }}>
              {role}
            </FormLabel>
          </Sheet>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
