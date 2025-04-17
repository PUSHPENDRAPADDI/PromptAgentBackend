import React from 'react';
import { Modal } from 'react-bootstrap';


const ModalForHistory = ({ show, handleClose, agentDatails }) => {
    const dateFormat = 'en-US';
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

    const formatNotificationDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));

        if (diffDays > 7) {
            return date.toLocaleDateString(dateFormat, dateOptions);
        } else if (diffDays > 0) {
            return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
        } else if (diffHours > 0) {
            return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
        } else if (diffMinutes > 0) {
            return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
        } else {
            return 'Just now';
        }
    };
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton className="blue-header">
                <Modal.Title centered>Agent Datails</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#272626', color:'#fff'}}>
                <div className="">
                    <h2 style={{ color: "#1565C0", fontWeight: "bold" }}>{agentDatails?.name}</h2>
                    <p><strong>prompt_text:</strong> {agentDatails?.prompt_text}</p>
                    <p><strong>response_text:</strong> {(agentDatails?.response_text)?.slice(0, 100)}</p>
                    <p><strong>timestamp:</strong>{formatNotificationDate(agentDatails?.timestamp)}</p>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalForHistory;
