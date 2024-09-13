const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');
const router = express.Router();

// Create a budget
router.post('/budget', authMiddleware, async (req, res) => {
    const { userId } = req.user;
    const { category, amount, startDate, endDate } = req.body;
  
    try {
      const newBudget = new Budget({
        userId,
        category,
        amount,
        startDate,
        endDate,
      });
    //   console.log("newBudget",newBudget)
      await newBudget.save();
      res.status(201).send('Budget created successfully');
    } catch (error) {
      res.status(400).send('Error creating budget: ' + error.message);
    }
  })

// Track an expense
router.post('/expense', authMiddleware, async (req, res) => {
    const { userId } = req.user;
    const { category, amount, date, description } = req.body;
  
    try {
      const newExpense = new Expense({
        userId,
        category,
        amount,
        date,
        description,
      });
      
      await newExpense.save();
      res.status(201).send('Expense tracked successfully');
    } catch (error) {
      res.status(400).send('Error tracking expense: ' + error.message);
    }
  });

// Get expenses by category and date range

router.get('/expenses/category', authMiddleware, async (req, res) => {
    const { userId } = req.user;
    const { category, startDate, endDate } = req.query;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid userId');
        }

        const expenses = await Expense.aggregate([
            { 
                $match: { 
                    userId: new mongoose.Types.ObjectId(userId),
                    category, 
                    date: { $gte: new Date(startDate), $lte: new Date(endDate) } 
                }
            },
            { 
                $group: { 
                    _id: '$category', 
                    totalSpent: { $sum: '$amount' }
                }
            }
        ]);

        res.json(expenses);
    } catch (error) {
        res.status(500).send('Error retrieving expenses: ' + error.message);
    }
});



// Get spending analysis (budget vs expenses)
router.get('/spending-analysis', authMiddleware, async (req, res) => {
    const { userId } = req.user;
  
    try {
      // Get all budgets for the user
      const budgets = await Budget.find({ userId });
      
      // Calculate total expenses per category
      const expenses = await Expense.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) }},  // Add 'new' keyword here
        { $group: { _id: '$category', totalSpent: { $sum: '$amount' }}},
    ]);
      // Map expenses to budgets
      const analysis = budgets.map(budget => {
        const expense = expenses.find(e => e._id === budget.category) || { totalSpent: 0 };
        const remainingBudget = budget.amount - expense.totalSpent;
        return {
          category: budget.category,
          budget: budget.amount,
          spent: expense.totalSpent,
          remaining: remainingBudget,
        };
      });
  
      res.json(analysis);
    } catch (error) {
      res.status(500).send('Error retrieving spending analysis: ' + error.message);
    }
  });

module.exports = router;
