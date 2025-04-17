import React, { useContext, useEffect, useState } from "react";
import { AgentContext } from "../context/AgentContext";

const PromptTemplate = () => {
  const { setState, state } = useContext(AgentContext);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/api/fetchAllPromptTemplateForPrompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt_id: state.selectedPrompt.id
        })
      })
        .then((response) => response.json())
        .then((data) => {
          setState((prevState) => ({
            ...prevState,
            promptTemplate: [...data],
          }));
          setLines(data[0].template_text.split("\n"))
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    if (state.selectedPrompt.id) {
      fetchData();
    }
  }, [state.selectedPrompt.id, setState])

  return (
    <div className="prompt-template-box">
      <h2 className="text-color">Prompt Template</h2>
      {lines.map((line, index) => {
        if (line.startsWith("Context:") || line.startsWith("Task:") || line.startsWith("Example Input:") || line.startsWith("Expected Output:")) {
          return (
            <p key={index}>
              <strong>{line.split(":")[0]}:</strong> {line.split(":").slice(1).join(":").trim()}
            </p>
          );
        }
        return <p key={index}>{line}</p>;
    })}
    </div>
  );
};

export default PromptTemplate;
