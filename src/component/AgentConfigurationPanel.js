import React, { useState } from 'react';

const AgentConfigurationPanel = ({ selectedAgent }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Configure {selectedAgent.name}</h3>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Enter ${selectedAgent.name} details`}
      />
    </div>
  );
};

export default AgentConfigurationPanel;
