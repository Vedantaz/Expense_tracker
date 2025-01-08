import React, { useState } from 'react';
import {
  TextField, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';

import AddIcon from "@mui/icons-material/Add";

const ExpenseDialog = () => {

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogCategory, setDialogCategory] = useState('');
  const [dialogDate, setDialogDate] = useState('');
  const [dialogExpenseName, setDialogExpenseName] = useState('');
  const [dialogAmount, setDialogAmount] = useState('');

  const handleDialogOpen = (category, date) => {
    setDialogCategory(category);
    setDialogDate(date);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogCategory('');
    setDialogDate('');
    setDialogExpenseName('');
    setDialogAmount('');
  };

  const handleAddExpenseFromDialog = () => {
    if (dialogExpenseName && dialogAmount) {
      const formattedDate = format(new Date(dialogDate), 'dd MMM, yyyy');
      dispatch(
        Expenses({
          name: dialogExpenseName,
          amount: parseFloat(dialogAmount),
          date: formattedDate,
          category: dialogCategory,
        })
      );
      handleDialogClose();
    } else {
      alert('Please fill all fields!');
    }
  };

  return (
    <Box>  

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <TextField
            label="Expense Name"
            value={dialogExpenseName}
            onChange={(e) => setDialogExpenseName(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Amount"
            type="number"
            value={dialogAmount}
            onChange={(e) => setDialogAmount(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Date"
            value={dialogDate}
            disabled
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Category"
            value={dialogCategory}
            disabled
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddExpenseFromDialog} color="primary">
            <AddIcon/>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExpenseDialog;
