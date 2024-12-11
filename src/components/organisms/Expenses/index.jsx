import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, removeExpense, updateExpense, calculateTotal } from '../../../store/features/expenseSlice';
import Search from '../search'
import { TextField, Button, Box, List, ListItem, ListItemText, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';

const Expenses = () => {

  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const total = useSelector((state) => state.expenses.total);

  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [editIndex, setEditIndex] = useState(null);
  const [editExpenseName, setEditExpenseName] = useState('');
  const [editAmount, setEditAmount] = useState('');


  const handleAddExpense = () => {
    if (expenseName && amount) {
      const currentDate = new Date().toISOString();
      dispatch(addExpense({ name: expenseName, amount: parseFloat(amount), date: currentDate }));
      setExpenseName('');
      setAmount('');
    }
  };

  const handleRemoveExpense = (index) => {
    dispatch(removeExpense(index));

  };

  const handleEditExpense = (index) => {
    setEditIndex(index);
    setEditExpenseName(expenses[index].name);
    setEditAmount(expenses[index].amount);
    setDate(new Date(expenses[index].date));
  };

  const handleUpdateExpense = () => {
    if (editExpenseName && editAmount) {
      const updatedExpense = {
        name: editExpenseName,
        amount: parseFloat(editAmount),
        date: date.toISOString(),
      };
      dispatch(updateExpense({ index: editIndex, updatedExpense }));
      setEditIndex(null);
      setEditExpenseName('');
      setEditAmount('');
      setDate(new Date());
    }

  };

  // grouping date wise expenses
  const groupExpenses = (expenses) => {
    return expenses.reduce((acc, expense) => {
      const formattedDate = format(new Date(expense.date), 'dd MMM, yyyy');

      if (!acc[formattedDate]) {
        // acc[formattedDate] = {expenses: [], total :0};
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(expense);

      // acc[formattedDate].total += expense.amount;

      return acc;
    }, {});
  }

  const groupedExpenses = groupExpenses(expenses);

  
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Daily Expenses (Kharcha)
      </Typography>
      <Search />
      <TextField
        label="Expense Name"
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}
        fullWidth
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        sx={{ marginBottom: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddExpense}
        sx={{ marginBottom: 2 }}
      >
        Add Expense
      </Button>

      {editIndex !== null && (
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Edit Expense Name"
            value={editExpenseName}
            onChange={(e) => setEditExpenseName(e.target.value)}
            fullWidth
            sx={{ marginBottom: 1 }}
          />
          <TextField
            label="Edit Amount"
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
            fullWidth
            sx={{ marginBottom: 1 }}
          />
          <TextField
            label="Edit Date"
            type="date"
            value={format(date, 'yyyy-MM-dd')} 
            onChange={(e) => setDate(new Date(e.target.value))}  
            fullWidth
            sx={{ marginBottom: 1 }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpdateExpense}
          >
            Update Expense
          </Button>
        </Box>
      )}

      {Object.keys(groupedExpenses).map((groupDate) => (
        <Box key={groupDate} sx={{ marginBottom: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            {format(new Date(groupDate), 'dd MMM, yyyy')}
          </Typography>
          <List>
            {groupedExpenses[groupDate].map((expense, index) => (
              <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText
                  primary={expense.name}
                  secondary={`₹${expense.amount} (Last updated: ${format(new Date(expense.date), 'dd MMM, yyyy')})`}
                />
                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => handleEditExpense(index)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveExpense(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total Expenses: ₹{total}
      </Typography>
    </Box>

  );
};

export default Expenses;
