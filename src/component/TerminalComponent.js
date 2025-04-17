import React, { useContext, useState, useEffect } from "react";
import Terminal, { TerminalOutput } from "react-terminal-ui";
import { AgentContext } from "../context/AgentContext";
import { FaCopy, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const TerminalComponent = () => {
  const { state, setState } = useContext(AgentContext);
  const [terminalLines, setTerminalLines] = useState([]);
  const [copyData, setCopyData] = useState('');

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
            <TerminalOutput key={index} className="text-xl font-semibold text-gray-800">
              {item.text}
            </TerminalOutput>
          );
        case "sub-subtopic":
          return (
            <TerminalOutput key={index} className="text-lg font-medium text-gray-700">
              {item.text}
            </TerminalOutput>
          );
        case "list-item":
          return (
            <TerminalOutput key={index} className="flex items-start text-gray-700">
              <span className="mr-2">•</span>
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

  const handleClear = () => {
    setTerminalLines([]);
    setState((prevState) => ({
      ...prevState,
      initialNodes: [],
    }));
  }

  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(copyData)
        .then(() => {
          toast.success("Text copied to clipboard !", {
            style: { justifyContent: "space-between" },
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "custom-toast",
            closeButton: <FaTimes style={{ color: "red", fontSize: "16px", marginRight: "0px" }} />,
          });
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = copyData;
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert("Text copied to clipboard!");
      } catch (err) {
        console.error("Fallback: Failed to copy text", err);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  useEffect(() => {
    if (state.response && Array.isArray(state.response)) {
      const formattedResponses = state.response.flatMap((item) => {
        const parsedContent = parseContent(item.response_text);
        return formatTerminalOutput(parsedContent);
      });
      setCopyData(state.response.map(item => item.response_text).join(' '))
      setTerminalLines(formattedResponses);
    }
  }, [state.response]);

  return (
    <div className="terminal-container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <FaCopy size={24} color="#007bff" onClick={handleCopy} style={{ marginRight: '10px', cursor: "pointer" }} />
          <FaTimes size={24} color="red" onClick={handleClear} style={{ cursor: "pointer" }} />
        </div>
        <div>AI Agent Terminal</div>
        {state.disableGenerate ?
          <div className="typing-indicator">{state.response.length} of {state.initialNodes.length} response   <span></span><span></span><span></span></div> : <div> </div>}
      </div>
      <Terminal height="300px">
        {terminalLines}
      </Terminal>
    </div>
  );
};

export default TerminalComponent;
