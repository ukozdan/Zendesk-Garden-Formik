import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import IncidentForm from "./IncidentForm";

test("Incident form renders", () => {
  render(<IncidentForm />);
  expect(screen.getByTestId("incidentForm")).toHaveClass("incidentForm");
});
