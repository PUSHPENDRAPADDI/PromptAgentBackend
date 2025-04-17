import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import './PropertiesForPattern.css';

const PropertiesForPattern = ({bottomHeading}) => {
  const [dbUrl, setDbUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dbType, setDbType] = useState('');

  const handleSubmit = () => {
    alert('Submitted properties!');
  };

  const handleDelete = () => {
    setDbUrl('');
    setUsername('');
    setPassword('');
    setDbType('');
    alert('Deleted properties!');
  };

  return (
    <div>
      <Container className="border-container">
        <h3 className="text-color">Properties</h3>
        <Form>
          <Form.Group controlId="db-url" className="mb-3">
            <Form.Label>DB Connection URL</Form.Label>
            <Form.Control
              type="text"
              value={dbUrl}
              onChange={(e) => setDbUrl(e.target.value)}
              placeholder="Enter DB Connection URL"
            />
          </Form.Group>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter User Name"
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </Form.Group>
          <Form.Group controlId="db-type" className="mb-3">
            <Form.Label>Database Type</Form.Label>
            <Form.Control
              type="text"
              value={dbType}
              onChange={(e) => setDbType(e.target.value)}
              placeholder="Enter Database Type"
            />
          </Form.Group>
          <Row className="mt-4">
            <Col className="d-flex justify-content-between">
              <Button variant="primary" onClick={handleSubmit}>Submit</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container className="mt-2 border-container">
        <h3 className="text-color">{bottomHeading}</h3>
        <Row className="mt-4">
          <Col className="d-flex justify-content-between">
            <Button variant="primary" onClick={handleSubmit}>Test</Button>
            <Button variant="primary" onClick={handleDelete}>Publish</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PropertiesForPattern;
