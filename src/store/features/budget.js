import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  totalBudget: 5000,
  currentBudget: 5000, // Remaining budget
};

const budgetManager = BudgetManager(initialState.totalBudget);

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE": {
      const updatedBudget = budgetManager.addExpense(action.payload.amount);
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        currentBudget: updatedBudget,
      };
    }

    case "RESET_BUDGET": {
      const updatedBudget = budgetManager.resetBudget(action.payload);
      return {
        ...state,
        totalBudget: action.payload,
        currentBudget: updatedBudget,
        expenses: [],
      };
    }

    default:
      return state;
  }
};

export default expenseReducer;
