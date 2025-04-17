import React from 'react'
import DynamicAgentLibrary from './DynamicAgentLibrary'

function ComponentDesignSideBar() {
    const agentsModalFields = [
        { name: 'Text Type', label: 'Name', type: 'text' },
        { name: 'DB Used', label: 'Category', type: 'text' },
        { name: 'New Component', label: 'Prompt', type: 'text' },
    ];
    return (
        <DynamicAgentLibrary
            fetchUrl="http://localhost:5000/api/fetchAllComponents"
            createUrl="http://localhost:5000/api/addNewAgent"
            title="Component"
            buttonLabel="➕"
            upAddButton={true}
            modalFields={agentsModalFields}
            draggable={true}
        />
    )
}

export default ComponentDesignSideBar
