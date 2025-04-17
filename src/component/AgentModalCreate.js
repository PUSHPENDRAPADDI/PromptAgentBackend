import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AgentModalCreate = ({ show, handleClose, formData, handleChange, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Agent</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '55vh', overflowY: 'auto' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Agent Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Agent Prompt</Form.Label>
            <Form.Control
              as="textarea"
              name="agent_prompt"
              value={formData.agent_prompt}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Input Type</Form.Label>
            <Form.Control
              type="text"
              name="inputType"
              value={formData.inputType}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Output Type</Form.Label>
            <Form.Control
              type="text"
              name="outputType"
              value={formData.outputType}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Modal</Form.Label>
            <Form.Control
              type="text"
              name="modal"
              value={formData.modal}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Accuracy</Form.Label>
            <Form.Control
              type="text"
              name="accuracy"
              value={formData.accuracy}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Purpose</Form.Label>
            <Form.Control
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              ❌ Cancel
            </Button>
            <Button type="submit" variant="success">
              ✅ Save Agent
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AgentModalCreate;
