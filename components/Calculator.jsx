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
  const [yearsToSave, setYearsToSave] = useState('');
  const [yearlyInterest, setYearlyInterest] = useState(10);
  const [calculationStarted, setCalculationStarted] = useState(false);
  const [finalAmount, setFinalAmount] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleExpenseCostChange = (e) => {
    setExpenseCost(e.target.value);
  };

  const handleYearsToSaveChange = (e) => {
    setYearsToSave(e.target.value);
  };

  const handleYearlyInterestChange = (e) => {
    setYearlyInterest(parseFloat(e.target.value));
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

  const startCalculation = () => {
    const calculatedFinalAmount = calculateFinalAmount();
    setFinalAmount(calculatedFinalAmount);
    setCalculationStarted(true);
  };

  const calculateFinalAmount = () => {
    if (yearsToSave && yearlyInterest) {
        const interestDecimal = yearlyInterest / 100;
    const monthlyInterestRate = Math.pow(1 + interestDecimal, 1 / 12) - 1;
    const numMonths = yearsToSave * 12;

    const futureValue = totalCost * ((Math.pow(1 + monthlyInterestRate, numMonths) - 1) / monthlyInterestRate);
    const totalExpenses = totalCost * numMonths;
    const finalAmount = futureValue - totalExpenses;

      return finalAmount.toFixed(2);
    }
    return '';
  };

  const resetCalculator = () => {
    setExpenses([]);
    setSelectedCategory('');
    setExpenseCost('');
    setTotalCost(0);
    setYearsToSave('');
    setYearlyInterest(10);
    setCalculationStarted(false);
    setFinalAmount('');
  };

  return (
    <div>
      <div className="flex flex-col w-full lg:flex-row h-auto">
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
      <h1 className='font-bold py-3 text-3xl text-center'>Start Saving!</h1>
      <div>
            <label className='p-4' htmlFor="category-select">Type of Expense:</label>
            
        <select className="select w-full max-w-xs" id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="" className=''>Select a Category</option>
          {commonExpenseCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
            <br />
        <label className='px-4' htmlFor="expense-cost">Cost Per Month:</label>
            <input
          className="input w-full max-w-xs"
          type="number"
          id="expense-cost"
          value={expenseCost}
          onChange={handleExpenseCostChange}
        />
        
            <div className='py-4'>
              <button className='btn btn-warning' onClick={addExpense}>Add Expense</button>
              </div>
      </div>

      <ul className=''>
        {expenses.map((expense, index) => (
          <li className='p-2' key={index}>
            {expense.category}: ${expense.cost}
            <button className='btn-xs btn-error ml-3' onClick={() => removeExpense(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <div className='py-4 font-bold text-xl'>Total Cost: ${totalCost}</div>

          <div>
          
        <label className='px-4' htmlFor="years-to-save">Years to Save:</label>
            <input
          className="input w-full max-w-xs"
          type="number"
          id="years-to-save"
          value={yearsToSave}
          onChange={handleYearsToSaveChange}
        />
      </div>
          
      <div>
        <label className='' htmlFor="yearly-interest">Yearly Interest (%):</label>
            <input
              className="input w-full max-w-xs"
          type="number"
          id="yearly-interest"
          value={yearlyInterest}
          onChange={handleYearlyInterestChange}
        />
      </div>
          <div className='py-4'>
          {!calculationStarted && (
            
        <button className='btn btn-warning' onClick={startCalculation} disabled={!yearsToSave || !yearlyInterest}>
          Start Calculation
        </button>
            )}
            </div>
          </div>
      </div>
      <br></br>
      <div className="divider lg:divider-horizontal"></div>

      <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
      {calculationStarted && (
          <div>
            <h1 className='text-center text-xl'>In {yearsToSave} years you could be saving:</h1>
          <div className='text-center text-2xl font-bold'>${finalAmount}</div>
        </div>
      )}
      
      {calculationStarted && (
        <button className='btn btn-warning' onClick={resetCalculator}>Reset Calculator</button>
      )}
      </div>
      </div>
  );
};

export default ExpenseTracker;


