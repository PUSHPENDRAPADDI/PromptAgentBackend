import React from 'react'
import DynamicAgentLibrary from './DynamicAgentLibrary';

const PatternDesignSidebar = () => {
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
            upAddButton={false}
            titleBottom="Pattern"
            buttonLabel="➕"
            modalFields={agentsModalFields}
            draggable={true}
            pattern={true}
            patternAddButton={true}
            topSearch={true}
            bottomSearch={true}
            fetchPatternUrl="http://localhost:5000/api/fetchAllComponents"
        />
    )
}

export default PatternDesignSidebar
