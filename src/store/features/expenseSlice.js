import { createSlice } from "@reduxjs/toolkit";

const totalE = (expenses) => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const saveExpenses = (expenses) =>{
    localStorage.setItem( 'expenses', JSON.stringify(expenses));
}

const loadExpenses = () => {
  const expenses = localStorage.getItem('expenses');
  return expenses
    ? JSON.parse(expenses).map((expense) => ({
        ...expense,
        category: expense.category || 'Uncategorized', // Default category if missing
        ratio : expense.ratio || 0,
      }))
    : [];
};

const initialState = {
    expenses : loadExpenses(),
    total:totalE(loadExpenses()),
}

const expenseSlice = createSlice({
    name:'expenses',
    initialState,
    reducers: {
        addExpense:(state, action)=>{

          const {name,amount, date, category, ratio, amountMax} = action.payload;
          
          const calculatedRatio = ratio || (amountMax ? (parseFloat(amount) / parseFloat(amountMax)) * 100 : 0);

            const newExpense = {
              name,
              amount,
              date: date || new Date().toISOString(),
              category : category || 'Uncategorized',
              ratio : calculatedRatio.toFixed(2),
            };
      
            const existingExpense = state.expenses.find(expense => expense.name === name);

            if(existingExpense){
                existingExpense.amount += amount;
            }else{
                state.expenses.push(newExpense);
            }
           
            saveExpenses(state.expenses);
            state.total = totalE(state.expenses);
        },

        removeExpense:(state, action)=>{
            const index = action.payload;
            const expenseToRemove = state.expenses[index];
            if(expenseToRemove){
                state.expenses.splice(index, 1);
                state.total = totalE(state.expenses);
            }
            saveExpenses(state.expenses);

        },
        updateExpense:(state, action) =>{
            
            const {index, updatedExpense, operation, amountMax} = action.payload; 
            const currentExpense = state.expenses[index];
            let diff = 0;

            switch (operation) {
                case 'add':
                    diff = updatedExpense.amount - currentExpense.amount;
                  break;
                case 'subtract':
                  diff = currentExpense.amount - updatedExpense.amount;
                  break;
                case 'multiply':
                  diff = (updatedExpense.amount * currentExpense.amount) - currentExpense.amount;
                  break;
                case 'divide':
                  if (updatedExpense.amount !== 0) {
                    diff = (currentExpense.amount / updatedExpense.amount) - currentExpense.amount;
                  }
                  break;
                default:
                  diff = updatedExpense.amount - currentExpense.amount;
                  break;
              }
              const recalculatedRatio = amountMax ? (updatedExpense.amount / amountMax) * 100 : 0;
            state.expenses[index] = {...updatedExpense, ratio: recalculatedRatio.toFixed(2)};
            state.total = totalE(state.expenses);

        },
        calculateTotal : (state) =>{
            state.total = totalE(state.expenses);
        }
    }
});

export const {calculateTotal, updateExpense, addExpense, removeExpense} = expenseSlice.actions;
export default expenseSlice.reducer;