import React, { useContext, useEffect } from 'react';
import MainChatgptScreen from '../component/MainChatgptScreen';
import MainChatgptAgent from '../component/MainChatgptAgent';

import Header from '../component/Header';
import ChatgptDesignSidebar from '../component/ChatgptDesignSidebar'
import { AgentContext } from '../context/AgentContext';
import ManageAgent from '../component/ManageAgent';
import HumanIntraction from '../component/HumanInteraction';

function LayoutForChatgpt() {
    const { setState, state } = useContext(AgentContext);
    const tempData = [
        {
            "name": "Sherpa",
        },
        {
            "name": "Agents",
        },
        {
            "name": "Agent Gallery",
        },
        {
            "name": "Manage Agent",
        },
        {
            "name": "Human Interaction",
        },
        {
            "name": "Play Book",
        }
    ]

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            agents: tempData,
        }));
    }, [])

    const componentMap = {
        'Agents': <MainChatgptAgent />,
        'Manage Agent': <ManageAgent />,
        'Agent Gallery': <MainChatgptAgent />,
        'Human Interaction': <HumanIntraction />,
    };
    console.log("state.selectedAgentChat", state.selectedAgentChat);
    

    return (
        <div className="app-container">
            <Header headerName='Sherpa Assist' />
            <div className="layout-container">
                <div className="left-panel">
                    <ChatgptDesignSidebar
                        onDragStart={(event, agent) =>
                            event.dataTransfer.setData('application/json', JSON.stringify(agent))
                        }
                    />
                </div>
                {componentMap[state.selectedAgentChat] || <MainChatgptScreen />}
            </div>
        </div>
    )
}

export default LayoutForChatgpt
