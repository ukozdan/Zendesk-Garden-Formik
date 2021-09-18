import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
//import styled from "@emotion/styled";
import {
  Field,
  Textarea,
  Label,
  Hint,
  Input,
  Message
} from "@zendeskgarden/react-forms";
import { Alert, Title, Close } from "@zendeskgarden/react-notifications";
import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row as TableRow,
  Table
} from "@zendeskgarden/react-tables";
import {
  Modal,
  Header,
  Body as ModalBody,
  Footer,
  FooterItem,
  Close as ModalClose
} from "@zendeskgarden/react-modals";
import { Paragraph, Span, MD } from "@zendeskgarden/react-typography";
import { Main } from "@zendeskgarden/react-chrome";
import {
  ThemeProvider,
  DEFAULT_THEME,
  PALETTE
} from "@zendeskgarden/react-theming";
import styled from "styled-components";
import "@zendeskgarden/css-bedrock";
import { Row, Col } from "@zendeskgarden/react-grid";
import { Spinner } from "@zendeskgarden/react-loaders";
import { Button } from "@zendeskgarden/react-buttons";
import { Tag } from "@zendeskgarden/react-tags";
import { LG, XL, XXL, XXXL } from "@zendeskgarden/react-typography";
import "./styles.css";
// https://garden.zendesk.com/components/theme-object

const myTheme = {
  ...DEFAULT_THEME,
  borderRadii: {
    ...DEFAULT_THEME.borderRadii,
    md: "0"
  },
  colors: {
    ...DEFAULT_THEME.colors,
    primaryHue: "#004c76"
  }
};

const StyledHeading = styled.div`
  margin-bottom: ${(p) => {
    const hasTheme = Object.entries(p.theme).length !== 0;
    return hasTheme ? p.theme.space.lg : DEFAULT_THEME.space.lg;
  }};
  margin-top: ${(p) => {
    const hasTheme = Object.entries(p.theme).length !== 0;
    return hasTheme ? p.theme.space.lg : DEFAULT_THEME.space.lg;
  }};
`;

const MyTextInput = ({ label, hint, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <Field style={{ marginBottom: DEFAULT_THEME.space.md }}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
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

const MyTextArea = ({ label, hint, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Field style={{ marginBottom: DEFAULT_THEME.space.md }}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
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

// And now we can use these
const IncidentForm = () => {
  const scollToRef = useRef();
  const [spinnerIsVisible, setSpinnerIsVisible] = React.useState(false);
  const [alertIsVisible, setAlertIsVisible] = React.useState(false);
  const [createIncidentIsVisible, setCreateIncidentIsVisible] = React.useState(
    true
  );
  const [viewIncidentIsVisible, setViewIncidentIsVisible] = React.useState(
    false
  );
  const [updateIncidentIsVisible, setUpdateIncidentIsVisible] = React.useState(
    false
  );
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  return (
    <Main ref={scollToRef} style={{ padding: DEFAULT_THEME.space.md }}>
      <ThemeProvider theme={myTheme}>
        <StyledHeading>
          <XXXL tag="h1">H1 heading</XXXL>
        </StyledHeading>
        {/*<StyledHeading>
          <XL tag="h2">H2 heading</XL>
        </StyledHeading>*/}
        {/* Start: spinner */}
        {spinnerIsVisible ? (
          <Modal
            CssClass="custom-modal"
            onClose={() => setModalIsVisible(false)}
          >
            <Row
              alignItems="center"
              style={{ marginBottom: DEFAULT_THEME.space.md }}
            >
              <Col textAlign="center">
                <Spinner size="64" color={PALETTE.white} />
              </Col>
            </Row>
          </Modal>
        ) : (
          <></>
        )}
        {/* End: spinner */}
        {/* Start: alert */}
        {alertIsVisible ? (
          <Alert type="error" style={{ marginBottom: DEFAULT_THEME.space.md }}>
            <Title>Error</Title>
            Error message paragraph.
            <Close aria-label="Close Alert" />
          </Alert>
        ) : (
          <></>
        )}
        {/* End: alert */}
        <Formik
          initialValues={{
            incidentSummary: "",
            incidentDescription: "",
            update: "..."
          }}
          validationSchema={Yup.object({
            /* What is the input spec/regex? */
            incidentSummary: Yup.string()
              .max(255, "Must be 255 characters or less")
              .required("Required"),
            incidentDescription: Yup.string()
              .max(5120, "Must be 5120 characters or less")
              .required("Required"),
            update: Yup.string()
              .max(2048, "Must be 2048 characters or less")
              .required("Required")
          })}
          /* https://formik.org/docs/guides/form-submission#frequently-asked-questions */
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise((r) => setTimeout(r, 500));
            setSubmitting(false);
            //setAlertIsVisible(true);
            //scollToRef.current.scrollIntoView();
            setCreateIncidentIsVisible(false);
            //setModalIsVisible(true);
            //setSpinnerIsVisible(true);
            setViewIncidentIsVisible(true);
            setUpdateIncidentIsVisible(true);
          }}
        >
          <Form>
            {/* Start: createIncident */}
            {createIncidentIsVisible ? (
              <>
                <MyTextInput
                  label="Incident Summary"
                  name="incidentSummary"
                  type="text"
                  placeholder=""
                  hint="Hint text"
                />
                <MyTextArea
                  label="Incident Description"
                  name="incidentDescription"
                  type="textarea"
                  placeholder=""
                  hint="Hint text"
                  minRows={5}
                  maxRows={12}
                />
              </>
            ) : (
              <></>
            )}
            {/* End: createIncident */}
            {/* Start: viewIncident */}
            {viewIncidentIsVisible ? (
              <div
                style={{
                  overflowX: "auto",
                  marginBottom: DEFAULT_THEME.space.lg
                }}
              >
                <Table size="medium">
                  <Body>
                    <TableRow>
                      <Cell style={{ verticalAlign: "middle" }}>
                        <Tag size="large">
                          <MD isBold>#12345678</MD>
                        </Tag>
                      </Cell>
                      <Cell>
                        {/* Start: viewIncident */}
                        <Button
                          type="submit"
                          size="small"
                          isPrimary
                          isStretched
                        >
                          Update incident
                        </Button>
                        {/* End: viewIncident */}
                      </Cell>
                    </TableRow>
                    <TableRow>
                      <HeaderCell>
                        <MD isBold>Ivanti ticket status</MD>
                      </HeaderCell>
                      <Cell>Open</Cell>
                    </TableRow>
                    <TableRow>
                      <HeaderCell>
                        <MD isBold>Ivanti ticket summary</MD>
                      </HeaderCell>
                      <Cell>Row data</Cell>
                    </TableRow>
                    {/* Start: viewIncident */}
                    {/*{viewIncidentIsVisible ? (*/}
                    <TableRow>
                      <HeaderCell>
                        <MD isBold>Ivanti ticket priority</MD>
                      </HeaderCell>
                      <Cell>Row data</Cell>
                    </TableRow>
                    {/*}) : (
                      <></>
                    )}*/}
                    {/* End: viewIncident */}
                    <TableRow>
                      <HeaderCell>
                        <MD isBold>Created</MD>
                      </HeaderCell>
                      <Cell>
                        <time datetime="2017-02-14">2017-02-14</time>
                      </Cell>
                    </TableRow>
                    <TableRow>
                      <HeaderCell>
                        <MD isBold>Last update</MD>
                      </HeaderCell>
                      <Cell>
                        <time datetime="2017-02-14">2017-02-14</time>
                      </Cell>
                    </TableRow>
                    {/* Start: updateIncident */}
                    {updateIncidentIsVisible ? (
                      <TableRow>
                        <Cell colSpan="2">
                          <MyTextArea
                            label="Update"
                            name="update"
                            type="textarea"
                            placeholder=""
                            hint="Hint text"
                            minRows={5}
                            maxRows={12}
                          />
                        </Cell>
                      </TableRow>
                    ) : (
                      <></>
                    )}
                    {/* End: updateIncident */}
                  </Body>
                </Table>
              </div>
            ) : (
              <></>
            )}
            {/* End: viewIncident */}
            {/* Start: createIncident */}
            {createIncidentIsVisible || viewIncidentIsVisible ? (
              <Row style={{ marginBottom: DEFAULT_THEME.space.md }}>
                <Col textAlign="center">
                  <Button type="submit" isPrimary isStretched>
                    {createIncidentIsVisible
                      ? "Create incident"
                      : "Update incident"}
                  </Button>
                  {/*
                1. createIncident: "Create incident".
                2. updateIncident: "Update incident".
                */}
                </Col>
                <Col textAlign="center">
                  <Button type="reset" isDefault isStretched>
                    Cancel
                  </Button>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            {/* End: createIncident */}
          </Form>
        </Formik>
      </ThemeProvider>
    </Main>
  );
};

function App() {
  return <IncidentForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
