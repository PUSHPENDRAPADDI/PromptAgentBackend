import React, { useContext, useEffect } from "react";
import { AgentContext } from "../context/AgentContext";

const Categories = () => {
  const { setState, state } = useContext(AgentContext);


  const handleSelectedSection = (category) => {
    setState((prevState) => ({
      ...prevState,
      selectedCategory: category
    }))
  }

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/api/fetchAllCategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_id: state.selectedSection.id
        })
      })
        .then((response) => response.json())
        .then((data) => {
          setState((prevState) => ({
            ...prevState,
            categories: data,
          }));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    if (state.selectedSection) {
      fetchData();
    }
  }, [state.selectedSection, setState])

  return (
    <div className="category-box">
      <h2>Categories</h2>
      {state.categories.map(item => {
        return (
          <button onClick={()=> handleSelectedSection(item)} >{item.name}</button>
        )
      })}
    </div>
  );
};

export default Categories;
