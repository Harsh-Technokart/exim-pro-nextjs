/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Input, Textarea } from "@mui/joy";
import { FormControl, FormHelperText } from "@mui/joy";
import { FormikHandlers, FormikHelpers, FormikValues } from "formik";
import React, { useRef } from "react";

import { FormLabel } from "@mui/joy";
import { NumericFormat } from "react-number-format";
import { getAge } from "@/utilities";

interface FormikInputProps {
  item: {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    helpertext?: string;
  };
  formik: {
    setFieldValue: FormikHelpers<unknown>["setFieldValue"];
    handleBlur: FormikHandlers["handleBlur"];
    errors: FormikValues["errors"];
    touched: FormikValues["touched"];
  };
  value: any;
  commaSeperated?: boolean;
  textarea?: boolean;
  endDecorator?: React.ReactNode;
  startDecorator?: React.ReactNode;
  valueLength?: boolean;
  disabled?: boolean;
  uploadType?: string;
  readOnly?: boolean;
  required?: boolean;
}

const FormikInput: React.FC<FormikInputProps> = (props) => {
  const { name, type, placeholder, label, helpertext } = props.item;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);

  const handleSetFile = () => {
    const files = [...props.value, file];
    props.formik.setFieldValue(name, files);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = e;

    // For file inputs
    if (
      type === "file" &&
      target instanceof HTMLInputElement &&
      target.files &&
      target.files[0] &&
      props.uploadType === "single"
    ) {
      props.formik.setFieldValue(name, target.files[0]);
      return;
    }
    if (
      type === "file" &&
      target instanceof HTMLInputElement &&
      target.files &&
      target.files[0]
    ) {
      setFile(target.files[0]);
      return;
    }

    if (props.commaSeperated) {
      props.formik.setFieldValue(target.name, target.value.split(",").join(""));
    } else {
      props.formik.setFieldValue(target.name, target.value);
      if (target.name.includes("dateOfBirth")) {
        const split = target.name.split(".");
        props.formik.setFieldValue(
          `${split[0]}.${split[1]}.age`,
          getAge(target.value)
        );
      }
    }
    // For other inputs and textareas
  };

  return (
    <FormControl>
      {type === "file" && props.uploadType === "single" ? (
        <>
          <FormLabel>
            {label} &nbsp;
            <span style={{ color: "red" }}>
              {props.required === false ? "" : "*"}
            </span>
          </FormLabel>
          <Input
            size="sm"
            slotProps={{
              input: {
                ref: fileInputRef,
              },
            }}
            endDecorator={
              props.value ? (
                <Button onClick={() => fileInputRef.current?.click()}>
                  Replace
                </Button>
              ) : (
                <Button onClick={() => fileInputRef.current?.click()}>
                  Select
                </Button>
              )
            }
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={handleChange}
            onBlur={props.formik.handleBlur}
            sx={
              props.formik.errors[name] && props.formik.touched[name]
                ? { borderColor: "red" }
                : {}
            }
          />
        </>
      ) : type === "file" ? (
        <Input
          size="sm"
          disabled={props.disabled ? true : false}
          slotProps={{
            input: {
              ref: fileInputRef,
            },
          }}
          type={type}
          // ref={fileInputRef}
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
          endDecorator={
            <Button
              disabled={!file}
              onClick={handleSetFile}
              endDecorator={props.endDecorator}
            >
              Upload
            </Button>
          }
          onBlur={props.formik.handleBlur}
          // className={styles.text_input}
          sx={
            props.formik.errors[name] && props.formik.touched[name]
              ? { borderColor: "red" }
              : {}
          }
        />
      ) : props.commaSeperated === true ? (
        <>
          <FormLabel>
            {label}&nbsp;
            <span style={{ color: "red" }}>
              {props.required === false ? "" : "*"}
            </span>
          </FormLabel>

          <NumericFormat
            size="sm"
            value={props.value}
            name={name}
            onChange={handleChange}
            // placeholder={placeholder}
            allowLeadingZeros={false}
            thousandSeparator
            endDecorator={props.endDecorator}
            startDecorator={props.startDecorator}
            allowNegative={false}
            decimalScale={2}
            customInput={Input}
            thousandsGroupStyle={"lakh"}
            autoComplete="off"
            onBlur={props.formik.handleBlur}
            sx={
              props.formik.errors[name] && props.formik.touched[name]
                ? { borderColor: "red" }
                : {}
            }
            disabled={props.disabled === true ? true : false}
          />
        </>
      ) : props.textarea === true ? (
        <>
          <FormLabel>
            {label}&nbsp;
            <span style={{ color: "red" }}>
              {props.required === false ? "" : "*"}
            </span>
          </FormLabel>

          <Textarea
            disabled={props.disabled ? true : false}
            sx={
              props.formik.errors[name] && props.formik.touched[name]
                ? { borderColor: "red" }
                : {}
            }
            value={props.value}
            name={name}
            onBlur={props.formik.handleBlur}
            onChange={handleChange}
            minRows={2}
          />
        </>
      ) : (
        <>
          <FormLabel>
            {label}&nbsp;
            <span style={{ color: "red" }}>
              {props.required === false ? "" : "*"}
            </span>
          </FormLabel>

          <Input
            size="sm"
            value={props.value}
            type={type}
            readOnly={props.readOnly}
            // placeholder={placeholder}
            name={name}
            onChange={handleChange}
            endDecorator={props.endDecorator}
            onBlur={props.formik.handleBlur}
            // className={styles.text_input}
            sx={
              props.formik.errors[name] && props.formik.touched[name]
                ? { borderColor: "red" }
                : {}
            }
            disabled={props.disabled === true ? true : false}
          />
        </>
      )}

      {!(props.formik.errors[name] && props.formik.touched[name]) &&
      helpertext ? (
        <FormHelperText sx={{ color: "#828695" }}>{helpertext}</FormHelperText>
      ) : (
        ""
      )}
      {props.formik.errors[name] && props.formik.touched[name] && (
        <FormHelperText sx={{ color: "red" }}>
          {props.formik.errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormikInput;
