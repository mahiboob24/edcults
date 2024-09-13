// src/components/CreateBudget.js
import React, { useState } from 'react';
import '../style.css'
import axios from 'axios';
import { toast } from 'react-toastify';



const CreateBudget = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCreateBudget = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:5000/api/finance/budget', {  category, amount, startDate, endDate, }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Budget created successfully!');
    } catch (error) {
      toast.error(`Error creating budget: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleCreateBudget} className='create-budget-form'>
      <input 
        type="text" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        placeholder="Category" 
      />
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Amount" 
      />
      <input 
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)} 
      />
      <input 
        type="date" 
        value={endDate} 
        onChange={(e) => setEndDate(e.target.value)} 
      />
      <button type="submit">Create Budget</button>
    </form>
  );
};

export default CreateBudget;
