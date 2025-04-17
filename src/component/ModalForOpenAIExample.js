import React from "react";
import { Modal, Button } from "react-bootstrap";
import './ModalForOpenAIExample.css';

const ModalForOpenAIExample = ({ show, onClose, onDecision }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className="blue-header">
                <Modal.Title className="text-center w-100">
                    <span className="modal-title-text">Choose an Option</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:'#272626'}}>
                <div className="p-4 text-center">
                    <p className="modal-message" >Select either Left or Right to proceed.</p>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Button
                            onClick={() => {
                                onDecision("left");
                                onClose();
                            }}
                            variant="outline-primary"
                            className="rounded-pill px-4 py-2"
                        >
                            Cloud
                        </Button>
                        <Button
                            onClick={() => {
                                onDecision("right");
                                onClose();
                            }}
                            variant="outline-primary"
                            className="rounded-pill px-4 py-2"
                        >
                            On Premises
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalForOpenAIExample;
