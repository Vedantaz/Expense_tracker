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

    if (!expenseName || !amount || !category) {
      alert('Please fill all fields including Max Amount!');
      return;
    }
    const currentDate = new Date().toISOString();

    // const ratio = (parseFloat(amount) / parseFloat(amountMax)) * 100;
    dispatch(addExpense({ name: expenseName, amount: parseFloat(amount), date: currentDate, category }));
    setExpenseName('');
    setAmount('');
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
    setCategory(expenses[index].category);

  };

  const handleUpdateExpense = () => {
    if (editExpenseName && editAmount) {
      const updatedExpense = {
        name: editExpenseName,
        amount: parseFloat(editAmount),
        date: date.toISOString(),
        category,

      };

      dispatch(updateExpense({ index: editIndex, updatedExpense }));
      setEditIndex(null);
      setEditExpenseName('');
      setEditAmount('');
      setDate(new Date());
      setCategory('');
    }
  };

  // grouping date wise expenses
  const groupExpenses = (expenses) => {
    return expenses.reduce((acc, expense, originalIndex) => {
      const formattedDate = format(new Date(expense.date), 'dd MMM, yyyy');

      // grouping by date
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }

      // Group by category within each date group
      if (!acc[formattedDate][expense.category]) {
        acc[formattedDate][expense.category] = [];
      }

      acc[formattedDate][expense.category].push({ ...expense, originalIndex });  // this is done to task reference to original Index of expenses array  alogn with categorizing acc to the each date.
      // acc[formattedDate].push({ ...expense, originalIndex });      
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
          <Typography variant="h6" sx={{ 
    marginBottom: 1, 
    backgroundColor: '#f44336',
    width: '100%',               
    padding: '8px',        
    boxSizing: 'border-box', borderRadius: '8px',  
  }}>
            {format(new Date(groupDate), 'dd MMM, yyyy')}
          </Typography>

          {/* Iterate over categories within each date group */}
          {Object.keys(groupedExpenses[groupDate]).map((category) => (
            <Box key={category} sx={{ marginBottom: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {category}
              </Typography>
              <List>
                {groupedExpenses[groupDate][category].map((expense) => (
                  <React.Fragment key={expense.originalIndex}>
                    {editIndex === expense.originalIndex && (


                      // edit box
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
                        <Button variant="contained" color="secondary" onClick={handleUpdateExpense}>
                          Update Expense
                        </Button>
                      </Box>
                    )}

                    <ListItem sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 2,
                      border: '2px solid #ddd', 
                    }}>
                      {/* Category Column */}
                      <Box sx={{ flex: 1, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 2 }}>
                          {expense.category}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                          (Last updated : {format(new Date(expense.date), 'dd MMM, yyyy')})
                        </Typography>
                      </Box>

                      {/* Value Column */}
                      <Box sx={{ flex: 1, display: 'flex', alignItems: 'left', flexDirection: 'column'}}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 2 }}>
                          {expense.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                          ₹{expense.amount}
                        </Typography>
                      </Box>

                      {/* Action Buttons Column */}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton onClick={() => handleEditExpense(expense.originalIndex)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleRemoveExpense(expense.originalIndex)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      ))}


      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total Expenses:
        <Box
          component="span"
          sx={{
            backgroundColor: 'blue',
            color: 'white',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'inline-block',
            marginLeft: 1,
            fontSize: '1.25rem',
            letterSpacing: '0.5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
          }} >
          ₹{total}
        </Box>
      </Typography>
    </Box >
  );
};

export default Expenses;
