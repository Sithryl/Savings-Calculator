'use client';
import React, { useState } from 'react';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseCost, setExpenseCost] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  const handleExpenseCostChange = (e) => {
    setExpenseCost(e.target.value);
  };

  const addExpense = () => {
    if (expenseName && expenseCost) {
      const newExpense = {
        name: expenseName,
        cost: parseFloat(expenseCost),
      };

      const newExpenses = [...expenses, newExpense];
      setExpenses(newExpenses);

      const newTotalCost = totalCost + parseFloat(expenseCost);
      setTotalCost(newTotalCost);

      setExpenseName('');
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
        <label htmlFor="expense-name">Expense Name:</label>
        <input
          type="text"
          id="expense-name"
          value={expenseName}
          onChange={handleExpenseNameChange}
        />

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
            {expense.name}: ${expense.cost}
            <button onClick={() => removeExpense(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <div>Total Cost: ${totalCost}</div>
    </div>
  );
};

export default ExpenseTracker;

