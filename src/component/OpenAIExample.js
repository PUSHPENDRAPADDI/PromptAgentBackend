import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { AgentContext } from '../context/AgentContext';
import HistoryComponent from './HistoryComponent';
import ModalForOpenAIExample from './ModalForOpenAIExample';
import HumanIntractionModal from './HumanInteractionModal';

const AgentsPanel = () => {
  const { state, setState } = useContext(AgentContext);
  const [inputText, setInputText] = useState('');
  const [show, setShow] = useState(false);
  const [resolveDecision, setResolveDecision] = useState(null);
  const [resolveValidation, setResolveValidation] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalInput, setModalInput] = useState(``);

  const handleClose = () => {
    setShow(false);
  }

  const handleResponses = async (requestDataArray) => {
    try {
      const responses = await Promise.all(
        requestDataArray.map(async (requestData) => {
          const response = await generarteResponse(requestData);
          if (response && response.result && response.result.length > 0) {
            const responseData = response.result[0];
            return responseData;
          } else {
            console.error(`No valid response for prompt: ${requestData.prompt}`);
            return null;
          }
        })
      );

      const validResponses = responses.filter(Boolean);
      setState((prevState) => ({
        ...prevState,
        response: [...prevState.response, ...validResponses],
      }));
    } catch (error) {
      console.error("Error processing requests:", error);
    }
  };

  const handleSendMessageModal = async (modalInput) => {
    setIsOpenModal(false);
    setInputText(modalInput);
  }

  const rearrangeNodes = (nodes, edges) => {
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    const visited = new Set();
    const result = [];
    function traverse(nodeId) {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      if (nodeMap.has(nodeId)) result.push(nodeMap.get(nodeId));
      const currentNode = nodeMap.get(nodeId);
      if (!currentNode) return;
      if (currentNode.type === "decisionNode" || currentNode.type === "forkNode") {
        edges.forEach(edge => {
          if (edge.source === nodeId) traverse(edge.target);
        });
      }
      edges.forEach(edge => {
        if (edge.source === nodeId) traverse(edge.target);
      });
    }
    const initialSource = edges[0].source;
    traverse(initialSource);
    return result;
  }

  const getUserDecision = () => {
    return new Promise((resolve) => {
      setShow(true);
      setResolveDecision(() => resolve);
    });
  };

  useEffect(() => {
    if (state.response) {
      setModalInput(state.response[0]?.response_text);
    }
  }, [state.response]);


  const getUserValidation = () => {
    return new Promise((resolve) => {
      setIsOpenModal(true);
      setResolveValidation(() => resolve);
    });
  };

  const enterInputPromt = async () => {
    if (!inputText) {
      return;
    }
    if (state.initialNodes.length === state.response.length) {
      setState((prevState) => ({
        ...prevState,
        disableGenerate: false,
      }));
    }
    else {
      setState((prevState) => ({
        ...prevState,
        disableGenerate: true,
      }));
    }

    let nodeMapping = state.initialNodes.map(node => ({
      type: node.type,
      id: node.id,
      prompt: node.data.prompt,
      label: node.data.label
    }))
    let labelArray = rearrangeNodes(nodeMapping, state.initialEdges);
    let currentInputText = inputText;
    try {
      for (let i = 0; i < labelArray.length; i++) {
        const prompt = labelArray[i];
        let requestData = {
          textInputUser: currentInputText,
          PromtArrat: [prompt]
        };
        if (prompt.type === 'forkNode') {
          let filteredSource = state.initialEdges.filter(item => item.source === prompt.id);
          const sourceIds = filteredSource.map(e => e.target);
          const filteredParallelNodes = labelArray.filter(n => sourceIds.includes(n.id));
          labelArray = labelArray.filter(n => !sourceIds.includes(n.id));
          const currentText = currentInputText;
          const requestData = filteredParallelNodes.map(node => ({
            textInputUser: currentText,
            PromtArrat: [node]
          }));
          handleResponses(requestData);
        } else if (prompt.type === 'validation') {
          const validation = await getUserValidation();
          continue;
        } else if (prompt.type === 'decisionNode') {
          const decision = await getUserDecision();
          let filteredNode;
          let filteredSource = state.initialEdges.filter(item => item.source === prompt.id);
          if (decision === "left") {
            filteredNode = labelArray.find(item => item.id === filteredSource[0]?.target);
            labelArray = labelArray.filter(item => item.id !== filteredSource[1]?.target);
          } else {
            filteredNode = labelArray.find(item => item.id === filteredSource[1]?.target);
            labelArray = labelArray.filter(item => item.id !== filteredSource[0]?.target);
          }
          requestData = {
            textInputUser: currentInputText,
            PromtArrat: [filteredNode]
          };
          continue;
        } else if (prompt.type === 'userStory') {
          const response = await generarteResponseForUserStory(requestData);
          if (response && response.result && response.result.length > 0) {
            const responseData = response.result[0];
            currentInputText = responseData.response_text;
            setState((prevState) => ({
              ...prevState,
              response: [...prevState.response, responseData],
            }));
          } else {
            console.error(`No valid response for prompt: ${prompt.prompt}`);
            break;
          }
        }
        else {
          const response = await generarteResponse(requestData);
          if (response && response.result && response.result.length > 0) {
            const responseData = response.result[0];
            currentInputText = responseData.response_text;
            setState((prevState) => ({
              ...prevState,
              response: [...prevState.response, responseData],
            }));
          } else {
            console.error(`No valid response for prompt: ${prompt.prompt}`);
            break;
          }
        }
        if (state.initialNodes.length === state.response.length) {
          setState((prevState) => ({
            ...prevState,
            disableGenerate: false,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            disableGenerate: true,
          }));
        }
      }
      setState((prevState) => ({
        ...prevState,
        disableGenerate: false,
      }));
    } catch (error) {
      console.error('Error processing prompts:', error);
    }
  };

  const handleModalValidation = (decision) => {
    setIsOpenModal(false);
    setModalInput(decision);
    if (resolveValidation) {
      resolveValidation(decision);
    }
  };

  const handleModalDecision = (decision) => {
    setShow(false);
    if (resolveDecision) {
      resolveDecision(decision);
    }
  };
  const generarteResponse = async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/api/generateResponse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching data for agent:`, error);
      return null;
    }
  };

  const generarteResponseForUserStory = async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/api/generateUserStory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching data for agent:`, error);
      return null;
    }
  };

  return (
    <div className="agents-panel2" style={{ padding: '20px' }}>
      <h4 style={{ color: '#fff' }}>Enter Prompt input</h4>
      <textarea
        rows="3"
        cols="25"
        placeholder="Enter Prompt input ..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{
          border: '2px solid #007BFF',
          backgroundColor: '#272626',
          color: 'white',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '16px',
          width: '100%'
        }}
      />
      <button
        onClick={enterInputPromt}
        disabled={state.disableGenerate || state.initialNodes.length === 0}
        type="button"
        className="btn btn-primary mt-2">
        🚀 Generate
      </button>
      <HistoryComponent />
      <ModalForOpenAIExample
        show={show}
        onClose={handleClose}
        onDecision={handleModalDecision}
      />
      <HumanIntractionModal
        show={isOpenModal}
        modalInput={modalInput}
        setModalInput={setModalInput}
        handleSendMessageModal={handleModalValidation}
        handleClose={() => setIsOpenModal(!isOpenModal)}
      />
    </div>
  );
};

export default AgentsPanel;