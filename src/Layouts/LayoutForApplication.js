import React, { useContext, useEffect } from 'react';
import Header from '../component/Header';
import { ToastContainer } from 'react-bootstrap';
import WorkflowBuilder from '../component/WorkflowBuilder';
import PropertiesForPattern from '../component/PropertiesForPattern';
import PatternToolBar from '../component/PatternToolBar';
import ReziableTerminal from '../component/ResizableTerminal';
import ApplicationDesignSidebar from '../component/ApplicationDesignSidebar';
import { AgentContext } from '../context/AgentContext';

function LayoutForApplication() {
    const { setState, state } = useContext(AgentContext);
    const tempData = [
        {
            "name": "Application 1",
        },
        {
            "name": "Application 2",
        },
        {
            "name": "Application 3",
        }
    ]

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            agents: tempData,
        }));
    }, [])

    return (
        <div className="app-container">
            <ToastContainer position="top-right" autoClose={3000} />
            <Header headerName='Application Design' />
            <div className="layout-container">
                <div className="left-panel">
                    <ApplicationDesignSidebar
                        onDragStart={(event, agent) =>
                            event.dataTransfer.setData('application/json', JSON.stringify(agent))
                        }
                    />
                </div>
                <div className="center-panel">
                    <div className="workflow-builder">
                        <WorkflowBuilder />
                    </div>
                    <div className="resizable-terminal">
                        <PatternToolBar />
                        <ReziableTerminal />
                    </div>
                </div>
                <div className="right-panel">
                    <PropertiesForPattern
                        bottomHeading='Application 1'
                    />
                </div>
            </div>
        </div>
    )
}

export default LayoutForApplication
