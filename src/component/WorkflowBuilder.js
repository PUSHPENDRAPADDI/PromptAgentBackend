import React, { useCallback, useContext, useEffect, useState, useMemo } from 'react';
import ReactFlow, {
    MiniMap, Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
    Handle,
    Position

} from 'react-flow-renderer';
import { AgentContext } from '../context/AgentContext';

const WorkflowBuilder = () => {
    const { state, setState, addNodeAndEdge } = useContext(AgentContext);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const onNodesChange = useCallback(
        (changes) => {
            setNodes((nds) => applyNodeChanges(changes, nds));
            setState((prevState) => ({
                ...prevState,
                initialNodes: applyNodeChanges(changes, prevState.initialNodes),
            }));

            setEdges((eds) => eds.map((edge) => ({ ...edge })));
        },
        []
    );
    const onEdgesChange = useCallback(
        (changes) => {
            setEdges((eds) => applyEdgeChanges(changes, eds));
            setState((prevState) => ({
                ...prevState,
                initialEdges: applyNodeChanges(changes, prevState.initialEdges),
            }));
        },
        []
    );

    const DecisionNode = ({ data }) => (
        <div
            className="relative flex items-center justify-center"
            style={{
                width: "120px",
                height: "120px",
                position: "relative",
            }}
        >
            {/* Diamond Shape as SVG */}
            <svg width="120" height="120" viewBox="0 0 100 100">
                <polygon points="50,0 100,50 50,100 0,50" fill="#FFD700" stroke="black" strokeWidth="2" />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="black" fontSize="12">
                    {data.label}
                </text>
            </svg>

            {/* Connection Dots (Handles) */}
            <Handle
                type="source"
                position={Position.Bottom}
                id="yes"
                style={{
                    position: "absolute",
                    bottom: "46%",
                    left: "0%",
                    background: "black",
                    width: "10px",
                    height: "10px",
                    zIndex: 10,
                }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="no"
                style={{
                    position: "absolute",
                    bottom: "45%",
                    left: "100%",
                    background: "black",
                    width: "10px",
                    height: "10px",
                    zIndex: 10,
                }}
            />
            <Handle
                type="target"
                position={Position.Top}
                style={{
                    position: "absolute",
                    top: "-10px",
                    left: "50%",
                    background: "black",
                    width: "10px",
                    height: "10px",
                    zIndex: 10,
                }}
            />
        </div>
    );





    const MergeNode = ({ data }) => (
        <div className="p-4 bg-blue-300 rounded-xl shadow-md text-center">
            {data.label}
            <Handle type="source" position={Position.Bottom} />
            <Handle type="target" position={Position.Top} />
        </div>
    );


    const ForkNode = ({ data }) => {
        const [outputCount, setOutputCount] = useState(data.outputs || 2); // Default 2 outputs

        const addOutputHandle = () => {
            setOutputCount((prev) => prev + 1);
        };

        return (
            <div className="p-4 bg-purple-300 rounded-xl shadow-md text-center relative">
                {/* Label */}
                <span>{data.label}</span>

                {/* ✅ Target Handle at the Top */}
                <Handle
                    type="target"
                    position={Position.Top}
                    style={{
                        background: "black",
                        width: "10px",
                        height: "10px",
                    }}
                />

                {/* ✅ Dynamic Output Handles */}
                <div className="relative flex justify-center mt-2">
                    {Array.from({ length: outputCount }).map((_, index) => {
                        const leftPosition = `${(index + 1) * (100 / (outputCount + 1))}%`;
                        return (
                            <Handle
                                key={`fork-output-${index}`}
                                type="source"
                                position={Position.Bottom}
                                id={`fork-${index}`}
                                style={{
                                    left: leftPosition,
                                    transform: "translateX(-50%)",
                                    background: "black",
                                    width: "10px",
                                    height: "10px",
                                }}
                            />
                        );
                    })}
                </div>

                {/* ✅ Add Button BELOW Handles */}

                <button
                    onClick={addOutputHandle}
                    className="mt-4 bg-white p-1 rounded-full shadow hover:bg-gray-200 transition flex items-center justify-center"
                    title="Add Output"
                >
                    ➕
                </button>
            </div>
        );
    };



    const JoinNode = ({ data }) => (
        <div className="p-4 bg-green-300 rounded-xl shadow-md text-center">
            {data.label}
            <Handle type="source" position={Position.Bottom} />
            <Handle type="target" position={Position.Top} id="join1" style={{ left: '30%' }} />
            <Handle type="target" position={Position.Top} id="join2" style={{ left: '70%' }} />
        </div>
    );


    const nodeTypes = useMemo(() => ({
        decisionNode: DecisionNode,
        mergeNode: MergeNode,
        forkNode: ForkNode,
        joinNode: JoinNode,
    }), []);

    // useEffect(() => {
    //     const updatedNodes = state.initialNodes.map((node) => {
    //         if (node.type === "decisionNode") {
    //             return {
    //                 ...node,
    //                 style: {
    //                     overflow: "visible",
    //                 },
    //             };
    //         } else if (node.type === "forkNode") {
    //             return {
    //                 ...node,
    //                 data: {
    //                     ...node.data,
    //                     outputs: node.data.outputs || 2,
    //                 },
    //                 style: {
    //                     overflow: "visible",
    //                     background: "#D8BFD8",
    //                     padding: "8px",
    //                     borderRadius: "8px",
    //                     textAlign: "center",
    //                 },
    //             };
    //         } else {
    //             return {
    //                 ...node,
    //                 style: {
    //                     width: "160px",
    //                     height: "32px",
    //                     borderRadius: "8px",
    //                     border: "1px solid #CBCBCB",
    //                     background: "#FFF",
    //                     overflow: "visible",
    //                 },
    //             };
    //         }
    //     });

    //     setEdges((prevEdges) =>
    //         prevEdges.map((edge) => ({
    //             ...edge,
    //             animated: true,
    //             type: "smoothstep",
    //             label: edge.sourceHandle || "next",
    //             style: {
    //                 stroke: "#000",
    //                 strokeWidth: 2,
    //             },
    //             markerEnd: {
    //                 type: MarkerType.ArrowClosed,
    //                 width: 20,
    //                 height: 20,
    //             },
    //         }))
    //     );
    //     setNodes(updatedNodes);
    //     // setState((prevState) => ({
    //     //     ...prevState,
    //     //     initialNodes: [...updatedNodes],
    //     //   }));
    // }, [state]);



    useEffect(() => {
        const updatedNodes = state.initialNodes.map((node) => {
            if (node.type === "decisionNode") {
                return {
                    ...node,
                    style: { overflow: "visible" },
                };
            } else if (node.type === "forkNode") {
                return {
                    ...node,
                    data: { ...node.data, outputs: node.data.outputs || 2 },
                    style: {
                        overflow: "visible",
                        background: "#D8BFD8",
                        padding: "8px",
                        borderRadius: "8px",
                        textAlign: "center",
                    },
                };
            } else {
                return {
                    ...node,
                    style: {
                        width: "160px",
                        height: "32px",
                        borderRadius: "8px",
                        border: "1px solid #CBCBCB",
                        background: "#FFF",
                        overflow: "visible",
                    },
                };
            }
        });
        let updateEdges = edges.map((edge) => ({
            ...edge,
            animated: true,
            type: "smoothstep",
            label: edge.sourceHandle || "next",
            style: { stroke: "#000", strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
        }))
        setEdges(updateEdges);
        // if (JSON.stringify(state.initialEdges) !== JSON.stringify(updateEdges)) {
        //     setState((prevState) => ({
        //         ...prevState,
        //         initialEdges: updateEdges,
        //     }));
        // }

        // Compare and update only if the nodes are different
        setNodes(updatedNodes);
        if (JSON.stringify(state.initialNodes) !== JSON.stringify(updatedNodes)) {
            setState((prevState) => ({
                ...prevState,
                initialNodes: updatedNodes,
            }));
        }
    }, [state]);

    const handleDrop = (event) => {
        event.preventDefault();
        const agent = JSON.parse(event.dataTransfer.getData('agent'));
        addNodeAndEdge(agent);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const onConnect = useCallback(
        (params) => {
            setEdges((prevEdges) => {
                const updatedEdges = [
                    ...prevEdges,
                    {
                        ...params,
                        animated: true,
                        type: "smoothstep",
                        label: params.sourceHandle,
                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                        },
                    },
                ];
                if (JSON.stringify(state.initialEdges) !== JSON.stringify(updatedEdges)) {
                    setState((prevState) => ({
                        ...prevState,
                        initialEdges: updatedEdges,
                    }));
                }
                return updatedEdges;
            });
        },
        [state.initialEdges, setState]
    );

    return (
        <div
            style={{ height: '70vh', width: '61vw', background: 'white' }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <ReactFlow
                nodes={state.initialNodes}
                edges={state.initialEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                defaultViewPort={{ x: 150, y: -75, zoom: 0.2 }}
            >
                <Background />
                <MiniMap />
                <Controls position="top-right" />
            </ReactFlow>
        </div >
    );
};

export default WorkflowBuilder;
