import * as React from "react";
import { Field, Input, Label, Hint, Message } from "@zendeskgarden/react-forms";
import { useField } from "formik";
import { DEFAULT_THEME } from "@zendeskgarden/react-theming";

const TextInput = ({ label, hint, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <Field style={{ marginBottom: DEFAULT_THEME.space.md }}>
      <Label>{label}</Label>
      <Hint>{hint}</Hint>
      <Input
        {...field}
        {...props}
        validation={meta.touched && meta.error ? "error" : null}
      />
      {meta.touched && meta.error ? (
        <Message validation="error">{meta.error}</Message>
      ) : null}
    </Field>
  );
};

export default TextInput;
