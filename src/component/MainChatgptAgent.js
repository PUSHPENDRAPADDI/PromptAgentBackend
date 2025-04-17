import { Card, CardContent, TextField } from "@mui/material";
import React, { useState, useContext, useEffect } from 'react';
import { AgentContext } from '../context/AgentContext';
import ModalForAgentGallery from "./ModalForAgentGallery";

const agents = [
  { name: "HCC QnA", description: "An agent to query the HCC knowledge base." },
  { name: "Novant", description: "Novant bot for UI design." },
  { name: "Enterprise Knowledge Search", description: "Smart search engine for your organization's internal knowledge and documents." },
  { name: "Curated Code Search", description: "Advanced code search tool for finding validated code examples across repositories." },
  { name: "Productivity bot - ADO", description: "Azure DevOps bot for automated workflow management and notifications." },
  { name: "Documentation Generator", description: "Automated technical documentation creator from source code and APIs." },
  { name: "Copilot Prompt Assist", description: "Optimization tool for GitHub Copilot prompts and suggestions." },
  { name: "Sherpa Engineer", description: "AI guide for technical decisions and implementation best practices." },
];

export default function
  SherpaAgents() {
  const [search, setSearch] = useState("");
  const [totalAgent, setTotalAgent] = useState([]);
  const { state, setState } = useContext(AgentContext);
  const [show, setShow] = useState(false);
  const [agentDatails, setAgentDatails] = useState({})
  const handleClose = (agent) => {
    setAgentDatails(agent);
    setShow(!show);
  }

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/api/fetchAllAgents", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          setState((prevState) => ({
            ...prevState,
            agents: data,
          }));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };
    fetchData()
  }, []);

  useEffect(() => {
    if (state.agents.length > 0) {
      setTotalAgent(state.agents);
    }
  }, [state.agents]);

  const filteredAgents = state.agents.filter((agent) => agent.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ width: "1250px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#0D47A1", marginBottom: "10px" }}>Sherpa Agents</h1>
          <p style={{ color: "#1976D2", marginBottom: "20px" }}>Discover and select specialized AI agents to assist you with various tasks.</p>
          <TextField
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            style={{ width: "150px", height: "66px" }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "15px" }}>
          {filteredAgents.map((agent, index) => (
            <Card onClick={() => handleClose(agent)} key={index} sx={{ backgroundColor: "#272626", color:'white', padding: "16px", borderRadius: "10px", boxShadow: 3, border: "2px solid #007bff" }}>
              <CardContent>
                <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{agent.name}</h2>
                <p >{agent.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <ModalForAgentGallery show={show} handleClose={handleClose} agentDatails={agentDatails} />
    </div>
  );
}
