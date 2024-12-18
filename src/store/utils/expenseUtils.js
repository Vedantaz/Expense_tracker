import { startOfWeek, endOfWeek, format } from 'date-fns';


export const groupExpensesByWeek = (expenses) => {
    return expenses.reduce((groups, expense) => {
      const date = new Date(expense.date);
  
      // Calculate the start and end of the week
      const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Week starts on Monday
      const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  
      // Format the week range (e.g., "3rd Dec - 9th Dec")
      const weekKey = `${format(weekStart, "do")} - ${format(weekEnd, "do MMM, yyyy")}`;
  
      // Grouping logic
      if (!groups[weekKey]) groups[weekKey] = [];
      groups[weekKey].push(expense);
  
      return groups;
    }, {});
}

export const groupExpensesByMonth = (expenses) => {
  return expenses.reduce((groups, expense) => {
    const month = format(new Date(expense.date), 'MMMM yyyy'); 

    if (!groups[month]) groups[month] = [];
    groups[month].push(expense);

    return groups;
  }, {});
};

export const groupExpensesByYear = (expenses) => {
  return expenses.reduce((groups, expense) => {
    const year = format(new Date(expense.date), 'yyyy'); 

    if (!groups[year]) groups[year] = [];
    groups[year].push(expense);

    return groups;
  }, {});
};

export const calculateTotal = (groupedExpenses) => {
  const totals = {};
  for (const group in groupedExpenses) {
    totals[group] = groupedExpenses[group].reduce((sum, expense) => sum + Number(expense.amount), 0);
  }
  return totals;
};
