import React, { useState } from 'react';
import { ToastContainer } from 'react-bootstrap';
import Header from '../component/Header';
import AgentLibrary from '../component/AgentLibrary';
import WorkflowBuilder from '../component/WorkflowBuilder';
import ResizableTerminal from '../component/ResizableTerminal';
import OpenAIExample from '../component/OpenAIExample';
import './Layout.css'
import PatternToolBar from '../component/PatternToolBar';

function Layout() {
    const [isAgentLibraryVisible, setIsAgentLibraryVisible] = useState(true);

    return (
        <div className="app-container">
            <ToastContainer position="top-right" autoClose={3000} />
            <Header toggleAgentLibrary={() => setIsAgentLibraryVisible(!isAgentLibraryVisible)} headerName={'Agent Builder'} />
            <div className="layout-container">
                {isAgentLibraryVisible && (
                    <div className="left-panel">
                        <AgentLibrary
                            onDragStart={(event, agent) =>
                                event.dataTransfer.setData('application/json', JSON.stringify(agent))
                            }
                        />
                    </div>
                )}
                <div className="center-panel">
                    <div className="workflow-builder">
                        <PatternToolBar />
                        <WorkflowBuilder />
                    </div>
                    <div className="resizable-terminal">
                        <ResizableTerminal />
                    </div>
                </div>
                <div className="right-panel">
                    <OpenAIExample />
                </div>
            </div>
        </div>
    )
}

export default Layout
