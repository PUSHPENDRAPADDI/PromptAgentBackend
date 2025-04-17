import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import DynamicAgentLibrary from './DynamicAgentLibrary';

const AgentLibrary = () => {
  const agentsModalFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'agent_prompt', label: 'Prompt', type: 'text' },
  ];

  return (
    <DynamicAgentLibrary
      fetchUrl="http://localhost:5000/api/fetchAllAgents"
      createUrl="http://localhost:5000/api/addNewAgent"
      title="Agent Library"
      buttonLabel="➕"
      modalFields={agentsModalFields}
      draggable={true}
      upAddButton={true}
      topSearch={true}
      deleteLibrary= {true}
    />
  )
};

export default AgentLibrary;
