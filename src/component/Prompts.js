import React, { useContext, useEffect } from "react";
import { AgentContext } from "../context/AgentContext";

const Prompts = () => {
  const { setState, state } = useContext(AgentContext);


  const handleSelectedPrompt = (category) => {
    setState((prevState) => ({
      ...prevState,
      selectedPrompt : category
    }))
  }

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/api/fetchAllPromptforCategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category_id: state.selectedCategory.id
        })
      })
        .then((response) => response.json())
        .then((data) => {
          setState((prevState) => ({
            ...prevState,
            prompt: data,
          }));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    if (state.selectedCategory.id) {
      fetchData();
    }
  }, [state.selectedCategory.id, setState])

  return (
    <div className="prompt-box">
      <h2>Prompts</h2>
      {state.prompt.map(item => {
        return (
          <button onClick={()=> handleSelectedPrompt(item)} >{item.prompt_text}</button>
        )
      })}
    </div>
  );
};

export default Prompts;
