// src/components/SpendingAnalysis.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SpendingAnalysis = () => {
  const [analysis, setAnalysis] = useState([]);

  useEffect(() => {
    const fetchSpendingAnalysis = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:5000/api/finance/spending-analysis', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAnalysis(response.data);
      } catch (error) {
        toast.error(`Error fetching spending analysis: ${error.response?.data?.message || error.message}`);
      }
    };

    fetchSpendingAnalysis();
  }, []);

  return (
    <div className="spending-analysis">
      <h2>Spending Analysis</h2>
      <ul>
        {analysis.map((item, index) => (
          <li key={index} className="spending-item">
            <strong>Category:</strong> {item.category} <br />
            <strong>Budget:</strong> {item.budget} <br />
            <strong>Spent:</strong> {item.spent} <br />
            <strong>Remaining:</strong> {item.remaining}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpendingAnalysis;
