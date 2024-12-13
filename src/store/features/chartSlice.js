import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: {},
  totalBudget: 1000,
};

const chartSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    setBudget: (state, action) => {
      state.totalBudget = action.payload;
    },
    addExpense: (state, action) => {
      const { category, amount } = action.payload;
      state.categories[category] = (state.categories[category] || 0) + amount;
    },
    resetExpenses: (state) => {
      state.categories = {};
    },
  },
});

export const { setBudget, addExpense, resetExpenses } = chartSlice.actions;
export default chartSlice.reducer; 