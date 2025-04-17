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
            title=""
            upAddButton={false}
            topSearch ={false}
            titleBottom="Previous"
            buttonLabel=""
            modalFields={agentsModalFields}
            bottomSearch = {false}
            draggable={false}
            pattern={true}
            patternAddButton={false}
            fetchPatternUrl="null"
        />
    )
}

export default ApplicationDesignSidebar
