import React from 'react';
import Header from '../component/Header';
import { ToastContainer } from 'react-bootstrap';
import WorkflowBuilder from '../component/WorkflowBuilder';
import PropertiesForPattern from '../component/PropertiesForPattern';
import PatternDesignSidebar from '../component/PatternDesignSidebar';
import PatternToolBar from '../component/PatternToolBar';
import ReziableTerminal from '../component/ResizableTerminal';

function LayoutForPatternDesign() {
    return (
        <div className="app-container">
            <ToastContainer position="top-right" autoClose={3000} />
            <Header headerName='Pattern Design' />
            <div className="layout-container">
                <div className="left-panel">
                    <PatternDesignSidebar
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
                        <ReziableTerminal />
                    </div>
                </div>
                <div className="right-panel">
                    <PatternToolBar />
                    <PropertiesForPattern
                        bottomHeading='Process Insurance'
                    />
                </div>
            </div>
        </div>
    )
}

export default LayoutForPatternDesign
