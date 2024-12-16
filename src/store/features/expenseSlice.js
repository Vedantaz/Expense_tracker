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
        category: expense.category || 'Uncategorized',
        ratio : expense.ratio,
      }))
    : [];
};

const initialState = {
    expenses : loadExpenses(),
    total:totalE(loadExpenses()),
    isImp : false,
}

const expenseSlice = createSlice({
    name:'expenses',
    initialState,
    reducers: {
        addExpense:(state, action)=>{

          const {name,amount, date, category} = action.payload;
          
            const newExpense = {
              name,
              amount,
              date: date || new Date().toISOString(),
              category : category || 'Uncategorized',
            };
      
            const existingExpense = state.expenses.find(expense => expense.name === name
                && expense.date.split('T')[0] === date 
                && expense.category === category

            );

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
              // const recalculatedRatio = amountMax ? (updatedExpense.amount / amountMax) * 100 : 0;
            state.expenses[index] = {...updatedExpense};
            state.total = totalE(state.expenses);
        },
        calculateTotal : (state) =>{
            state.total = totalE(state.expenses);
        },
        markImp : (state, action)=>{
          const {expenseId} = action.payload;
          const expense = state.expenses.find((exp) => exp.originalIndex === expenseId);
          if(expense){
            expense.isImp = !expense.isImp;

          }
        }
    }
});

export const {calculateTotal, updateExpense, addExpense, removeExpense, markImp} = expenseSlice.actions;
export default expenseSlice.reducer;