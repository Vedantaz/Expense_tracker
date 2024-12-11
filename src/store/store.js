import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import expenseReducer from './features/expenseSlice';
import employeeReducer from './features/employeeSlice';
import employeeAllocationReducer from './features/employeeAllocationSlice';
import searchReducer from './features/searchSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    expenses:  expenseReducer,
    employees: employeeReducer,
    employeeAllocation: employeeAllocationReducer,
    search: searchReducer,
  },
});

export default store;