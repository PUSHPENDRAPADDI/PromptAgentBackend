import React, { useState, useContext, useEffect } from 'react';
import './HumanInteractionModal.css';
import { FaMicrophone, FaCopy, FaPaperPlane } from 'react-icons/fa';
import { AgentContext } from '../context/AgentContext';
import { TerminalOutput } from "react-terminal-ui";
import HumanIntractionModal from './HumanInteractionModal';

const HumanIntraction = () => {
    const [input, setInput] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalInput, setModalInput] = useState(``);
    const [isTyping, setIsTyping] = useState(false);
    const { state, setState } = useContext(AgentContext);

    const handleSendMessage = async (input) => {
        if (input.trim() === '') return;
        const userMessage = { sender: 'user', text: input };
        const updatedConversation = [...state.chatConversation, userMessage];

        setState(prevState => ({
            ...prevState,
            chatConversation: updatedConversation
        }));
        setInput('');
        setIsTyping(true);
        const requestData = {
            textInputUser: input,
            PromtArrat: [{ label: input, prompt: input }]
        };

        const response = await generateResponse(requestData);

        if (response && response.result && response.result.length > 0) {
            const botMessage = {
                sender: 'bot',
                text: response.result[0].response_text
            };
            setModalInput(response.result[0].response_text);
            setIsOpenModal(true);
            setState(prevState => ({
                ...prevState,
                chatConversation: [...prevState.chatConversation, botMessage]
            }));
        } else {
            console.error('No valid response received.');
        }
        setIsTyping(false);
    };

    const parseContent = (data) => {
        return data
            .split("\n")
            .filter(line => line.trim() !== "")
            .map(line => {
                const text = line.trim().replace(/^#+\s*|-+\s*|\*+\s*/g, "");
                if (line.startsWith("### ")) {
                    return { type: "main", text };
                } else if (line.startsWith("#### ")) {
                    return { type: "subtopic", text };
                } else if (line.startsWith("##### ")) {
                    return { type: "sub-subtopic", text };
                } else if (line.startsWith("- ")) {
                    return { type: "list-item", text };
                } else {
                    return { type: "content", text };
                }
            });
    };

    const formatTerminalOutput = (parsedContent) => {
        return parsedContent.map((item, index) => {
            switch (item.type) {
                case "main":
                    return (
                        <TerminalOutput key={index} className="text-2xl font-bold text-blue-800">
                            {item.text}
                        </TerminalOutput>
                    );
                case "subtopic":
                    return (
                        <TerminalOutput key={index} className="text-xl font-semibold text-gray-800 ml-10">
                            {item.text}
                        </TerminalOutput>
                    );
                case "sub-subtopic":
                    return (
                        <TerminalOutput key={index} className="text-lg font-medium text-gray-700 ml-5">
                            {item.text}
                        </TerminalOutput>
                    );
                case "list-item":
                    return (
                        <TerminalOutput key={index} className="flex items-start text-gray-700">
                            <span className="ml-3">•</span>
                            {item.text}
                        </TerminalOutput>
                    );
                case "content":
                    return (
                        <TerminalOutput key={index} className="text-gray-600">
                            {item.text}
                        </TerminalOutput>
                    );
                default:
                    return null;
            }
        });
    };

    useEffect(() => {
        if (state.promptTemplate.length > 0 && input === '') {
            setInput(state.promptTemplate[0].template_text);
        }
    }, [state.promptTemplate, input]);

    const formatDataFor = (text) => {
        const parsedContent = parseContent(text);
        return formatTerminalOutput(parsedContent);
    };

    const generateResponse = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/generateResponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const handleSendMessageModal = async (modalInput) => {
        setIsOpenModal(false);
        handleSendMessage(modalInput);
    }

    return (
        <div className="chat-container">
            <div className="chat-content">
                <div className="chat-box">
                    {state.chatConversation.length > 0 ? (
                        <>
                            {state.chatConversation.map((message, index) => (
                                <div
                                    key={index}
                                    className={`message ${message.sender}`}
                                    style={{
                                        display: "flex",
                                        justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                                        margin: "4px 0",
                                    }}
                                >
                                    <div
                                        style={{
                                            maxWidth: "70%",
                                            backgroundColor: message.sender === "user" ? "rgb(0 123 255 / 21%)" : "rgb(189 193 196 / 21%)",
                                            color: message.sender === "user" ? "#000" : "#333",
                                            wordWrap: "break-word",
                                            whiteSpace: "normal",
                                            borderRadius: "10px",
                                            padding: "8px 12px",
                                            textAlign: "left",
                                        }}
                                    >
                                        {formatDataFor(message.text)}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="message bot typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="chat-empty">
                            <h1 className="text-color">How can we start you today?</h1>
                        </div>
                    )}
                </div>
                <div className="input-box">
                    <FaMicrophone size={24} color="#0078d4" />
                    <FaCopy onClick={() => setIsOpenModal(!isOpenModal)} size={24} color="#0078d4" />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="input-field"
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
                    />
                    <FaPaperPlane size={24} onClick={() => handleSendMessage(input)} color="#0078d4" />
                </div>
            </div>
            <HumanIntractionModal
                show={isOpenModal}
                modalInput={modalInput}
                setModalInput={setModalInput}
                setIsTyping={setIsTyping}
                handleSendMessageModal={handleSendMessageModal}
                handleClose={() => setIsOpenModal(!isOpenModal)}
            />
        </div>
    );
};

export default HumanIntraction;
