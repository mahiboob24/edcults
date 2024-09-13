const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true }, // Total budget for this category
  startDate: { type: Date, required: true }, // Budget start date
  endDate: { type: Date, required: true },   // Budget end date
});

module.exports = mongoose.model('Budget', budgetSchema);
