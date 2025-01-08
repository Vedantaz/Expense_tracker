

import { List, Box, TextField, Button,  ListItem, IconButton, Typography, } from '@mui/material';
const DynamicLists = () =>{

    return (
        <List>
        {groupedExpenses[groupDate][category].map((expense) => (
          <React.Fragment key={`${expense.name}-${expense.date}-${expense.category}-${expense.originalIndex}`}>
            {editIndex === expense.originalIndex && (
              // Edit expense modal for the current expense
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
                  value={editIndex !== null ? format(date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
                  onChange={(e) => setDate(new Date(e.target.value))}
                  fullWidth
                  sx={{ marginBottom: 1 }}
                />
                <Button variant="contained" color="secondary" onClick={handleUpdateExpense}>
                  Update Expense
                </Button>
              </Box>
            )}
        
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                margin: 1,
                border: '2px solid #ddd',
                borderRadius: '8px',
              }}
            >
              {/* Expense Name and Date */}
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 2 }}>
                  {expense.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  (Last updated: {format(new Date(expense.date), 'dd MMM, yyyy')})
                </Typography>
              </Box>
        
              {/* Expense Amount */}
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="h7" sx={{ color: 'black', letterSpacing: '1px', fontWeight: 'bold' }}>
                  ₹{expense.amount}
                </Typography>
              </Box>
        
              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={() => handleEditExpense(expense.originalIndex)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleRemoveExpense(expense.originalIndex)} color="error">
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleImpToggle(expense.originalIndex)} color={expense.isImp ? 'warning' : 'default'}>
                  <StarIcon />
                </IconButton>
              </Box>
            </ListItem>
          </React.Fragment>
        ))}
        </List>
    )
   
}

export default DynamicLists;
