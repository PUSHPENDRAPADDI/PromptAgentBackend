import React from 'react';
import { Modal } from 'react-bootstrap';
import Sections from './Sections';
import Categories from './Categories';
import Prompts from './Prompts';
import PromptTemplate from './PromptTemplate';
import './ModalForPrompt.css';
import './PromptLibrary.css'

const ModalForPrompt = ({ show, handleClose }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName="custom-modal"
        >
            <Modal.Header  closeButton className="blue-header">
                <Modal.Title centered>Prompt Library</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#272626', color: 'white' }}>
                <div className="main-content">
                    <Sections />
                    <Categories />
                    <Prompts />
                    <PromptTemplate />
                </div>
                <button onClick={handleClose} type="submit" variant="success" className='btn-modal' >
                    Submit
                </button>
            </Modal.Body>
        </Modal>
    );
};

export default ModalForPrompt;
