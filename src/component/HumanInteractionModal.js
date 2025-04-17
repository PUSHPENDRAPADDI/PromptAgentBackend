import React from 'react';
import { Modal } from 'react-bootstrap';
import {  FaMicrophone, FaPaperPlane } from 'react-icons/fa';
import './HumanInteractionModal.css';

const HumanIntractionModal = ({ show, handleClose, handleSendMessageModal, modalInput, setModalInput }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName=" ">
            <Modal.Header closeButton className="blue-header">
                <Modal.Title centered>Edit Your New Response</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column justify-content-between" style={{backgroundColor:'#272626'}}>
                <div className="input-box-HumanInteractionModal">
                    <FaMicrophone size={24} color="#0078d4" />
                    <textarea
                        type="text"
                        value={modalInput}
                        onChange={(e) => setModalInput(e.target.value)}
                        placeholder="Type a message..."
                        className="input-field"
                        style={{ height: "auto", minHeight: "500px", overflowY: "auto" }}
                    />
                    <FaPaperPlane size={24} onClick={() => handleSendMessageModal(modalInput)} color="#0078d4" />
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default HumanIntractionModal;
