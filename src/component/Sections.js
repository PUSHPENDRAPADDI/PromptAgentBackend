import React, { useContext, useEffect } from "react";
import { AgentContext } from "../context/AgentContext";

const Sections = () => {
  const { setState, state } = useContext(AgentContext);

  const handleSelectedSection = (section) => {
    setState((prevState) => ({
      ...prevState,
      selectedSection: section
    }))
  }

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/api/fetchAllSection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          setState((prevState) => ({
            ...prevState,
            sections: data,
          }));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };
    fetchData();
  }, [])

  return (
    <div className="section-box">
      <h2>Sections</h2>
      {state.sections.map(item => {
        return (
          <button onClick={() => handleSelectedSection(item)}>{item.name}</button>
        )
      })}
    </div>
  );
};

export default Sections;
