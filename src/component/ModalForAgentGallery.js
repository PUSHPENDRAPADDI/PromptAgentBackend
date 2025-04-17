import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalForAgentGallery = ({ show, handleClose, agentDatails }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title centered>Agent Datails</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <h2 style={{ color: "#1565C0", fontWeight: "bold" }}>{agentDatails?.name}</h2>
          <p><strong>Category:</strong> {agentDatails?.category}</p>
          <p><strong>Prompt:</strong> {agentDatails?.agent_prompt}</p>
          <p><strong>Input Type:</strong> {agentDatails?.inputType}</p>
          <p><strong>Output Type:</strong> {agentDatails?.outputType}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalForAgentGallery;
