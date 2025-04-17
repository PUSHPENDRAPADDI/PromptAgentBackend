import React, { useState } from 'react'
import Header from '../component/Header'
import { ToastContainer } from 'react-bootstrap'
import WorkflowBuilder from '../component/WorkflowBuilder';
import ResizableTerminal from '../component/ResizableTerminal';
import ComponentDesignSideBar from '../component/ComponentDesignSideBar';
import PropertiesForComponent from '../component/PropertiesForComponent';
import PatternToolBar from '../component/PatternToolBar';

function LayoutforComponent() {
  const [isAgentLibraryVisible, setIsAgentLibraryVisible] = useState(true);

  return (
    <div className="app-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <Header toggleAgentLibrary={() => setIsAgentLibraryVisible(!isAgentLibraryVisible)} headerName='Component' />
      <div className="layout-container">
        {isAgentLibraryVisible && (
          <div className="left-panel">
            <ComponentDesignSideBar
              onDragStart={(event, agent) =>
                event.dataTransfer.setData('application/json', JSON.stringify(agent))
              }
            />
          </div>
        )}
        <div className="center-panel">
          <div className="workflow-builder">
            <WorkflowBuilder />
          </div>
          <div className="resizable-terminal">
            <PatternToolBar />
            <ResizableTerminal />
          </div>
        </div>
        <div className="right-panel">
          <PropertiesForComponent />
        </div>
      </div>
    </div>
  )
}

export default LayoutforComponent
