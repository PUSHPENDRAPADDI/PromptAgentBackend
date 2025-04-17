import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import './ManageAgent.css'

const ManageAgent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/fetchAllPromptForTable", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data, 'This is data');
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-blue">User Data Table</h2>
      <Table striped bordered hover responsive className="bluish-table">
        <thead className="table-dark">
          <tr>
            <th>Section Name</th>
            <th>Category Name</th>
            <th>Prompt Text</th>
            <th>Template Text</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.prompt_id}>
              <td>{user.section_name}</td>
              <td>{user.category_name}</td>
              <td>{user.prompt_text}</td>
              <td>{user.template_text}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageAgent;
