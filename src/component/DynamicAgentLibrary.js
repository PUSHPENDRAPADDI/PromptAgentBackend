import React, { useState, useEffect, useContext } from 'react';
import { AgentContext } from '../context/AgentContext';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import AgentModalCreate from './AgentModalCreate';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaCopy, FaTimes } from 'react-icons/fa';

const DynamicAgentLibrary = ({
    fetchUrl,
    createUrl,
    title = '',
    buttonLabel = '',
    modalFields,
    draggable = false,
    pattern = false,
    fetchPatternUrl = null,
    patternAddButton = false,
    upAddButton = false,
    titleBottom = false,
    topSearch = false,
    bottomSearch = false,
    deleteLibrary = false

}) => {
    const { setState, state } = useContext(AgentContext);
    const [formData, setFormData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (fetchUrl !== "null")
            fetchData();
    }, []);

    const fetchData = () => {
        fetch(fetchUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                setState((prevState) => ({
                    ...prevState,
                    agents: data,
                }));
                toast.success("Data loaded successfully! ✅", {
                    style:{ justifyContent:"space-between" },
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    className: "custom-toast",
                    closeButton: <FaTimes style={{ color: "red", fontSize: "16px", marginRight:"0px" }} />,
                    
                  });            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                toast.error('Failed to load data ❌');
            });
    };

    const openAgentGrid = (agent) => {
        if (agent.name === "Agents") {
            navigate('/agentEditor');
        } else if (agent.name === 'Manage Agent') {
            setState((prevState) => ({
                ...prevState,
                selectedAgentChat: agent.name,
            }));
        }
        else if (agent.name === 'Agent Gallery') {
            setState((prevState) => ({
                ...prevState,
                selectedAgentChat: agent.name,
            }));
        }
        else if (agent.name === 'Human Interaction') {
            setState((prevState) => ({
                ...prevState,
                selectedAgentChat: agent.name,
            }));
        }
        else {
            setState((prevState) => ({
                ...prevState,
                selectedAgentChat: "",
            }));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(createUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchData();
                return response.json();
            })
            .then((data) => {
                setFormData({});
                toast.success('Agent added successfully! ✅')
            })
            .catch((error) => {
                console.error('Error creating data:', error);
                toast.error('Failed to create data ❌');
            });
        setShowModal(false);
    };

    const filteredAgents = state.agents.filter((agent) =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="agents-panel">
            <div className='agent-boxes '>
                <div className='Button-Heading'>
                    <h4 className='text-color'>{title}</h4>
                    {upAddButton &&
                        <button type="button" className="btn" onClick={() => setShowModal(true)}>
                            {buttonLabel}
                        </button>
                    }
                </div>
                <div className='agent-search' style={{ height: "289px" }}>
                    {topSearch && <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search ..."
                        className="form-control rounded-pill mb-3 px-3"
                        style={{
                            border: '2px solid #007bff',
                            color: '#007bff',
                            outline: 'none',
                        }}
                    />}
                    {filteredAgents.map((agent) => (
                        <div
                            key={agent.id}
                            className="agent"
                            draggable={draggable}
                            onDragStart={
                                draggable
                                    ? (event) => event.dataTransfer.setData('agent', JSON.stringify(agent))
                                    : undefined
                            }
                            onClick={() => openAgentGrid(agent)}
                        >
                            {agent.name}
                        </div>
                    ))}
                </div>
            </div>
            {pattern && (
                <div className='agent-boxes'>
                    <div className='Button-Heading'>
                        <h4 className='text-color'>{titleBottom}</h4>
                        <button type="button" className="btn btn-outline-dark mb-3" onClick={() => setShowModal(true)}>
                            {buttonLabel}
                        </button>
                    </div>
                    <div className='agent-search'>
                        {bottomSearch &&
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search ..."
                                className="form-control rounded-pill mb-3 px-3"
                                style={{
                                    border: '2px solid #007bff',
                                    color: '#007bff',
                                    outline: 'none',
                                }}
                            />}
                        {!filteredAgents.map((agent) => (
                            <div
                                key={agent.id}
                                className="agent"
                                draggable={draggable}
                                onDragStart={
                                    draggable
                                        ? (event) => event.dataTransfer.setData('agent', JSON.stringify(agent))
                                        : undefined
                                }
                            >
                                {agent.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <AgentModalCreate
                show={showModal}
                handleClose={() => setShowModal(false)}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                fields={modalFields}
            />
        </div>
    );
};

DynamicAgentLibrary.propTypes = {
    fetchUrl: PropTypes.string.isRequired,
    createUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    buttonLabel: PropTypes.string,
    modalFields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        })
    ),
    draggable: PropTypes.bool,
};

export default DynamicAgentLibrary;
