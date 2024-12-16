export function BudgetManager(initialBudget) {
    let budget = initialBudget;
  
    return {
      getBudget: () => budget,
      addExpense: (amount) => {
        budget -= amount;
        return budget;
      },
      resetBudget: (newBudget) => {
        budget = newBudget;
        return budget;
      },
    };
}