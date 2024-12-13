import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import expenseReducer from './features/expenseSlice';
import employeeReducer from './features/employeeSlice';
import employeeAllocationReducer from './features/employeeAllocationSlice';
import searchReducer from './features/searchSlice';
import chartReducer from './features/chartSlice';


// redux persist
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root', // Key for localStorage
  storage, // Use the default storage (localStorage)
};

const persistedReducer = persistReducer(persistConfig, expenseReducer);

const store = configureStore({
  reducer: {
    counter: counterReducer,
    expenses:  persistedReducer,    // adding persist in it 
    employees: employeeReducer,
    employeeAllocation: employeeAllocationReducer,
    search: searchReducer,
    charts : chartReducer,
  },
  // Add serializableCheck middleware to allow non-serializable values
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], 
        ignoredPaths: ['register'],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export default store;