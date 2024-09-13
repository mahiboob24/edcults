// src/components/TrackExpense.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TrackExpense = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleTrackExpense = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:5000/api/finance/expense', {
        category,
        amount,
        date,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Expense tracked successfully!');
    } catch (error) {
      toast.error(`Error tracking expense: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form className="track-expense-form" onSubmit={handleTrackExpense}>
      <input 
        type="text" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        placeholder="Category" 
        className="expense-input"
      />
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Amount" 
        className="expense-input"
      />
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
        className="expense-input"
      />
      <input 
        type="text" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
        className="expense-input"
      />
      <button type="submit" className="expense-button">Track Expense</button>
    </form>
  );
};

export default TrackExpense;
