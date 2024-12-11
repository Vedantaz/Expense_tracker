import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, removeExpense, updateExpense } from '../../../store/features/expenseSlice';
import Search from '../search'
import { TextField, Button, Box, List, ListItem, ListItemText, IconButton, Stack, Typography, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
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
  const [category, setCategory] = useState('');
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');

  const handleAddExpense = () => {

    if (!expenseName || !amount || !amountMax || !category) {
      alert('Please fill all fields including Max Amount!');
      return;
    }
    const currentDate = new Date().toISOString();
    
    const ratio = (parseFloat(amount) / parseFloat(amountMax)) * 100;
    if (parseFloat(amountMax) === 0) {
      alert('Max Amount cannot be zero!');
      return;
    }
    dispatch(addExpense({ name: expenseName, amount: parseFloat(amount), date: currentDate, category, ratio }));
    setExpenseName('');
    setAmount('');
    setAmountMax('');
    setCategory('');

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
    return expenses.reduce((acc, expense, originalIndex) => {
      const formattedDate = format(new Date(expense.date), 'dd MMM, yyyy');
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push({ ...expense, originalIndex });       // this is done to task reference to original Index of expenses array
      return acc;
    }, {});
  }

  const groupedExpenses = groupExpenses(expenses);

  const filterExpenses = expenses.filter(expense => {
    const withinAmount = ((!amountMin || expense.amount >= amountMin) && (!amountMax || expense.amount <= amountMax));
    const matchCategory = !category || expense.category === category;
    return withinAmount && matchCategory;
  })

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

      {/*  Category filter */}
      <FormControl component="fieldset" fullWidth sx={{ marginBottom: 1 }}>
        <RadioGroup
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          row>
          <FormControlLabel value="Food" control={<Radio />} label="Food" />
          <FormControlLabel value="Travel" control={<Radio />} label="Travel" />
          <FormControlLabel value="Casual" control={<Radio />} label="Casual" />
          <FormControlLabel value="Medicine" control={<Radio />} label="Medicine" />
        </RadioGroup>
      </FormControl>

      {/* Amount range filter */}

      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>

        <TextField
          label="Min amount" type="number" value={amountMin} onChange={(e) => { setAmountMin(e.target.value) }} />

        <TextField
          label="Max amount" type="number" value={amountMax} onChange={(e) => { setAmountMax(e.target.value) }} />
      </Stack>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddExpense}
        sx={{ marginBottom: 2 }}
      >
        Add Expense
      </Button>

      {/* existing code  */}
      {Object.keys(groupedExpenses).map((groupDate) => (
        <Box key={groupDate} sx={{ marginBottom: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            {format(new Date(groupDate), 'dd MMM, yyyy')}
          </Typography>
          <List>

            {groupedExpenses[groupDate].map((expense) => (
              <React.Fragment key={expense.originalIndex}>
                {editIndex === expense.originalIndex && (
                  <Box sx={{ marginBottom: 2, padding: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
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
                      onClick={handleUpdateExpense}>
                      Update Expense
                    </Button>
                  </Box>
                )}
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText
                    primary={expense.category}
                    secondary={`${expense.ratio}%`}
                  />
                  <ListItemText
                    primary={expense.name}
                    secondary={
                      <>
                        ₹{expense.amount}
                        <br />
                        (Last updated: {format(new Date(expense.date), 'dd MMM, yyyy')})
                      </>
                    }

                  />
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEditExpense(expense.originalIndex)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveExpense(expense.originalIndex)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </ListItem>
              </React.Fragment>
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
