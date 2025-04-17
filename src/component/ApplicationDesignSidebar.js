import React from 'react'
import DynamicAgentLibrary from './DynamicAgentLibrary';

const ApplicationDesignSidebar = () => {
    const agentsModalFields = [
        { name: 'Text Type', label: 'Name', type: 'text' },
        { name: 'DB Used', label: 'Category', type: 'text' },
        { name: 'New Component', label: 'Prompt', type: 'text' },
    ];
    return (
        <DynamicAgentLibrary
            fetchUrl="null"
            createUrl="null"
            title="Pattern"
            upAddButton={false}
            titleBottom="Your Application"
            buttonLabel="➕"
            modalFields={agentsModalFields}
            draggable={true}
            pattern={true}
            patternAddButton={true}
            fetchPatternUrl="null"
        />
    )
}

export default ApplicationDesignSidebar
