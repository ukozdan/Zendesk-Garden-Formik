import * as React from "react";
import {
  Field,
  Textarea,
  Label,
  Hint,
  Message
} from "@zendeskgarden/react-forms";
import { useField } from "formik";
import { DEFAULT_THEME } from "@zendeskgarden/react-theming";

const TextArea = ({ label, hint, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Field style={{ marginBottom: DEFAULT_THEME.space.md }}>
      <Label>{label}</Label>
      <Hint>{hint}</Hint>
      <Textarea
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

export default TextArea;
