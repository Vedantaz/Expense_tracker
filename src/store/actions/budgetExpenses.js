export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    payload: expense,
  });
  
  export const resetBudget = (newBudget) => ({
    type: 'RESET_BUDGET',
    payload: newBudget,
  });
  