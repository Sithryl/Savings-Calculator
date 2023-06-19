'use client';
import React, { useState } from 'react';

const ExpenseTracker = () => {
  const commonExpenseCategories = [
    'Food Delivery',
    'Eating Out',
    'Subscriptions',
    'Entertainment',
    'Clothing',
    'Travel',
    'Online Shopping',
    'Other',
  ];

  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenseCost, setExpenseCost] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleExpenseCostChange = (e) => {
    setExpenseCost(e.target.value);
  };

  const addExpense = () => {
    if (selectedCategory && expenseCost) {
      const newExpense = {
        category: selectedCategory,
        cost: parseFloat(expenseCost),
      };

      const newExpenses = [...expenses, newExpense];
      setExpenses(newExpenses);

      const newTotalCost = totalCost + parseFloat(expenseCost);
      setTotalCost(newTotalCost);

      setSelectedCategory('');
      setExpenseCost('');
    }
  };

  const removeExpense = (index) => {
    const removedExpense = expenses[index];
    const updatedExpenses = expenses.filter((expense, i) => i !== index);
    setExpenses(updatedExpenses);

    const newTotalCost = totalCost - removedExpense.cost;
    setTotalCost(newTotalCost);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <label htmlFor="category-select">Expense Category:</label>
        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a Category</option>
          {commonExpenseCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="expense-cost">Expense Cost:</label>
        <input
          type="number"
          id="expense-cost"
          value={expenseCost}
          onChange={handleExpenseCostChange}
        />

        <button onClick={addExpense}>Add Expense</button>
      </div>

      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.category}: ${expense.cost}
            <button onClick={() => removeExpense(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <div>Total Cost: ${totalCost}</div>
    </div>
  );
};

export default ExpenseTracker;


