import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
  groupExpensesByWeek,
  groupExpensesByMonth,
  groupExpensesByYear,
  calculateTotal,
} from '../../../store/utils/expenseUtils';

const ExpenseSummary = ({ expenses }) => {
  const [view, setView] = useState('monthly'); 

  const groupedExpenses =
    view === 'weekly'
      ? groupExpensesByWeek(expenses)
      : view === 'yearly'
      ? groupExpensesByYear(expenses)
      : groupExpensesByMonth(expenses);

  const totals = calculateTotal(groupedExpenses);

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', boxShadow: 3, borderRadius: 2 , marginBottom:2}}>

      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <Button
          variant={view === 'weekly' ? 'contained' : 'outlined'}
          onClick={() => setView('weekly')}
        >
          Weekly
        </Button>
        <Button
          variant={view === 'monthly' ? 'contained' : 'outlined'}
          onClick={() => setView('monthly')}
        >
          Monthly
        </Button>
        <Button
          variant={view === 'yearly' ? 'contained' : 'outlined'}
          onClick={() => setView('yearly')}
        >
          Yearly
        </Button>
      </Box>

      {/* Display summary */}
      <Box>
        <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {view.charAt(0).toUpperCase() + view.slice(1)} Expense Summary
        </Typography>

        {Object.keys(groupedExpenses).map((group) => (
          <Box
            key={group}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 2,
              marginBottom: 1,
              backgroundColor: 'white',
              boxShadow: 1,
              borderRadius: 1,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {group}
            </Typography>
            <Typography variant="body1" sx={{ color: 'green', fontWeight: 'bold' }}>
              ₹{totals[group]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExpenseSummary;
