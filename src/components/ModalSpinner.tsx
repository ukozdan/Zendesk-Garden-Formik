import React from "react";
import { Modal } from "@zendeskgarden/react-modals";
import { Spinner } from "@zendeskgarden/react-loaders";
import { DEFAULT_THEME, PALETTE } from "@zendeskgarden/react-theming";
import { Row, Col } from "@zendeskgarden/react-grid";

const ModalSpinner = () => {
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  return (
    <Modal className="custom-modal" onClose={() => setModalIsVisible(false)}>
      <Row alignItems="center" style={{ marginBottom: DEFAULT_THEME.space.md }}>
        <Col textAlign="center">
          <Spinner size="64" color={PALETTE.white} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalSpinner;
