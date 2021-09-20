import * as React from "react";
import { Alert, Title, Close } from "@zendeskgarden/react-notifications";
import { DEFAULT_THEME } from "@zendeskgarden/react-theming";

const FormLevelAlert = () => {
  return (
    <Alert type="success" style={{ marginBottom: DEFAULT_THEME.space.md }}>
      <Title>Success</Title>
      Success message paragraph.
      <Close aria-label="Close Alert" />
    </Alert>
  );
};

export default FormLevelAlert;
