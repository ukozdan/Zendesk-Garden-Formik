import React, { useState, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
//import styled from "@emotion/styled";
import TextArea from "./TextArea";
import TextInput from "./TextInput";
import FormLevelAlert from "./FormLevelAlert";
import {
  Body,
  Cell,
  HeaderCell,
  Row as TableRow,
  Table
} from "@zendeskgarden/react-tables";
import { Main } from "@zendeskgarden/react-chrome";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import styled from "styled-components";
import "@zendeskgarden/css-bedrock";
import { Row, Col } from "@zendeskgarden/react-grid";
import ModalSpinner from "./ModalSpinner";
import { Button } from "@zendeskgarden/react-buttons";
import { Tag } from "@zendeskgarden/react-tags";
import {
  Paragraph,
  Span,
  MD,
  LG,
  XL,
  XXL,
  XXXL
} from "@zendeskgarden/react-typography";

const myTheme = {
  ...DEFAULT_THEME,
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
  /*margin-top: ${(p) => {
    const hasTheme = Object.entries(p.theme).length !== 0;
    return hasTheme ? p.theme.space.lg : DEFAULT_THEME.space.lg;
  }};*/
`;

const IncidentForm = () => {
  const scollToRef = useRef();
  const [modalSpinnerIsVisible, setModalSpinnerIsVisible] = React.useState(
    false
  );
  //const [spinnerIsVisible, setSpinnerIsVisible] = React.useState(false);
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
  return (
    <Main ref={scollToRef} style={{ padding: DEFAULT_THEME.space.md }}>
      <ThemeProvider theme={myTheme}>
        <StyledHeading>
          <XXL tag="h1">BTS Incident</XXL>
        </StyledHeading>

        {modalSpinnerIsVisible ? <ModalSpinner /> : <></>}

        {alertIsVisible ? <FormLevelAlert /> : <></>}
        {/* Investigate https://final-form.org/docs/final-form/getting-started */}
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
            scollToRef.current.scrollIntoView();
            setCreateIncidentIsVisible(false);
            setModalSpinnerIsVisible(true);
            setTimeout(function () {
              setModalSpinnerIsVisible(false);
              setAlertIsVisible(true);
              setViewIncidentIsVisible(true);
              setUpdateIncidentIsVisible(true);
            }, 3000);
          }}
        >
          <Form data-testid="incidentForm" className="incidentForm">
            {createIncidentIsVisible ? (
              <>
                <TextInput
                  label="Incident Summary"
                  name="incidentSummary"
                  type="text"
                  placeholder=""
                  hint="Hint text"
                />
                <TextArea
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
                        <Tag hue="#3A3A3A" size="large">
                          <LG>#12345678</LG>
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

                    <TableRow>
                      <HeaderCell>
                        <MD isBold>Created</MD>
                      </HeaderCell>
                      <Cell>
                        <time dateTime="2017-02-14">2017-02-14</time>
                      </Cell>
                    </TableRow>
                    <TableRow>
                      <HeaderCell>
                        <MD isBold>Last update</MD>
                      </HeaderCell>
                      <Cell>
                        <time dateTime="2017-02-14">2017-02-14</time>
                      </Cell>
                    </TableRow>

                    {updateIncidentIsVisible ? (
                      <TableRow>
                        <Cell colSpan={2}>
                          <TextArea
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
                  </Body>
                </Table>
              </div>
            ) : (
              <></>
            )}

            {createIncidentIsVisible || viewIncidentIsVisible ? (
              <Row style={{ marginBottom: DEFAULT_THEME.space.md }}>
                <Col textAlign="center">
                  <Button type="submit" isPrimary isStretched>
                    {createIncidentIsVisible
                      ? "Create incident"
                      : "Update incident"}
                  </Button>
                </Col>
                <Col textAlign="center">
                  <Button type="reset" isStretched>
                    Cancel
                  </Button>
                </Col>
              </Row>
            ) : (
              <></>
            )}
          </Form>
        </Formik>
      </ThemeProvider>
    </Main>
  );
};

export default IncidentForm;
