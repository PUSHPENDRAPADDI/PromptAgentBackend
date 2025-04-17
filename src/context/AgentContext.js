import React, { createContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { dummyEdge, dummyNode } from '../PredefinedNodes';
export const AgentContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        agents: [
        ],
        initialNodes: [],
        initialEdges: [],
        executedLog: [],
        agentId: [],
        response: [],
        properties: {},
        sections: [],
        selectedSection: {},
        categories: [],
        selectedCategory: {},
        prompt: [],
        selectedPrompt: {},
        promptTemplate: [],
        chatConversation: [],
        selectedAgentChat: "",
        disableGenerate: false
    });

    const getNewNodePosition = (parentId, nodes) => {
        if (!parentId) {
            return { x: 0, y: 0 };
        }
        const parentNode = nodes.find(node => node.id === parentId);
        if (!parentNode) {
            return { x: 100, y: 100 };
        }
        const siblings = nodes.filter(node => node.parentId === parentId);
        const siblingCount = siblings.length;
        return {
            x: parentNode.position.x + (siblingCount * 200),
            y: parentNode.position.y + 150,
        };
    };


    const addNodeAndEdge = (agent, parentId = null) => {
        if (agent.category === "Predefined Nodes") {
            setState((prevState) => {
                return {
                    ...prevState,
                    initialNodes: dummyNode,
                    initialEdges: dummyEdge,
                };
            });
        } else {
            setState((prevState) => {
                const { initialNodes, initialEdges } = prevState;
                const positionMap = new Map();
                initialNodes.forEach(node => positionMap.set(node.id, { ...node.position }));
                const generateRandomId = () => Math.floor(Math.random() * 100000).toString();
                const newNodeId = state.initialNodes.some(item => item.id === agent.id.toString())
                    ? generateRandomId()
                    : agent.id.toString();

                // const newNodeId = agent.id.toString();
                const newPosition = getNewNodePosition(parentId, initialNodes);
                const newNode = {
                    id: newNodeId,
                    type: agent.inputType === "decisionNode"
                        ? "decisionNode"
                        : agent.inputType === "Fork"
                            ? "forkNode" :
                            agent.inputType === "validation"
                                ? "validation" :
                                agent.inputType === "userStory"
                                    ? "userStory"
                                    : "default",
                    data: {
                        label: agent.name,
                        prompt: agent.agent_prompt,
                        outputs: agent.outputs || 2,
                    },
                    position: newPosition,
                    parentId,
                };
                const newEdge = parentId
                    ? {
                        id: `e${parentId}-${newNodeId}`,
                        source: parentId.toString(),
                        target: newNodeId,
                        animated: true,
                        type: "smoothstep",
                    }
                    : null;
                const updatedNodes = initialNodes.map(node => ({
                    ...node,
                    position: positionMap.get(node.id) || node.position,
                }));
                return {
                    ...prevState,
                    initialNodes: [...updatedNodes, newNode],
                    initialEdges: newEdge ? [...initialEdges, newEdge] : initialEdges,
                };
            });
        }
    };

    return (
        <AgentContext.Provider value={{ state, setState, addNodeAndEdge }}>
            {children}
        </AgentContext.Provider>
    );
};
