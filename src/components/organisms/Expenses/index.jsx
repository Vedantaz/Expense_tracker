import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  removeExpense,
  updateExpense,
  markImp,
} from "../../../store/features/expenseSlice";
import Search from "../search";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  IconButton,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import { format } from "date-fns";
import ExpenseSummary from "../expenseSummary";
import AddIcon from "@mui/icons-material/Add";
import {
  groupExpensesByMonth,
  groupExpensesByWeek,
  groupExpensesByYear,
  calculateTotal,
} from "../../../store/utils/expenseUtils";
import categoryGroup from "../../molecules/categoryGroup";
import expenseDialog from "../../molecules/expenseDialog";

const Expenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const total = useSelector((state) => state.expenses.total);

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [editIndex, setEditIndex] = useState(null);
  const [editExpenseName, setEditExpenseName] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [category, setCategory] = useState("");

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDialogOpen = (category, date) => {
    console.log(category);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setExpenseName("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  const handleAddExpenseFromDialog = () => {
    if (!expenseName || !amount || !category) {
      alert("Please fill all fields!");
      return;
    }

    const formattedDate = format(new Date(date), "dd MMM, yyyy");
    dispatch(
      addExpense({
        name: expenseName,
        amount: parseFloat(amount),
        date: formattedDate,
        category: category,
      })
    );

    setExpenseName("");
    setAmount("");
    setCategory("");

    setOpenSnackbar(true);
  };

  const handleImpToggle = (expenseId) => {
    dispatch(markImp({ expenseId }));
  };
  const handleAddExpense = () => {
    if (!expenseName || !amount || !category) {
      alert("Please fill all fields!");
      return;
    }
    const currentDate = new Date();
    console.log(currentDate, currentDate.toISOString());

    const formattedDate = format(currentDate, "yyyy-MM-dd");

    dispatch(
      addExpense({
        name: expenseName,
        amount: parseFloat(amount),
        date: formattedDate,
        category: category,
      })
    );
    setExpenseName("");
    setAmount("");
    setCategory("");
    handleDialogClose();
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
      setEditExpenseName("");
      setEditAmount("");
      setDate(new Date());
      setCategory("");
    }
  };

  const groupExpenses = (expenses) => {
    return expenses.reduce((acc, expense, originalIndex) => {
      const formattedDate = format(new Date(expense.date), "yyyy-MM-dd");

      if (!acc[formattedDate]) {
        acc[formattedDate] = {};
      }

      if (!acc[formattedDate][expense.category]) {
        acc[formattedDate][expense.category] = [];
      }

      acc[formattedDate][expense.category].push({ ...expense, originalIndex }); // this is done to task reference to original Index of expenses array  along with categorizing acc to the each date.

      return acc;
    }, {});
  };

  const groupedExpenses = groupExpenses(expenses);

  const totalExpense = Object.keys(groupedExpenses).map((groupDate) => {
    const groupTotal = Object.values(groupedExpenses[groupDate])
      .flat()
      .reduce((sum, expense) => sum + expense.amount, 0);

    return { groupDate, total: groupTotal };
  });

  return (
    <Box sx={{ padding: 2, width: "100%" }}>
      {/* <categoryGroup
        expenseName={expenseName}
        setName={(e) => setExpenseName(e.target.value)}
        amount={amount}
        setAmt={(e) => setAmount(e.target.value)}
        category={category}
        setCat={(e) => setCategory(e.target.value)}
        handleadd={handleAddExpense}
      /> */}

      <Box
        sx={{
          backgroundColor: "#008B8B",
          color: "white",
          padding: 4,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Daily Expenses (Kharcha)
        </Typography>
        <Search sx={{ marginRight: 0 }} />
        <TextField
          label="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          fullWidth
          sx={{
            marginBottom: 1,
            "& label.Mui-focused": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "& input": {
                color: "white",
              },
            },
          }}
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          sx={{
            marginBottom: 1,
            "& label.Mui-focused": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "& input": {
                color: "white",
              },
            },
          }}
        />

        <FormControl
          component="fieldset"
          fullWidth
          sx={{
            marginBottom: 1,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            flexGrow: "1",
          }}
        >
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            row
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
              flexGrow: 1,
              "& .MuiFormControlLabel-label": {
                color: "white", // default label color
              },
              "& .Mui-checked + .MuiFormControlLabel-label": {
                color: "white", // label color when selected
              },
            }}
          >
            <FormControlLabel
              value="Food"
              control={
                <Radio
                  sx={{
                    color: "white", // default radio
                    "&.Mui-checked": {
                      color: "white", // checked radio
                    },
                  }}
                />
              }
              label="Food"
            />
            <FormControlLabel
              value="Travel"
              control={
                <Radio
                  sx={{
                    color: "white", // default radio
                    "&.Mui-checked": {
                      color: "white", // checked radio
                    },
                  }}
                />
              }
              label="Travel"
            />
            <FormControlLabel
              value="Casual"
              control={
                <Radio
                  sx={{
                    color: "white", // default radio
                    "&.Mui-checked": {
                      color: "white", // checked radio
                    },
                  }}
                />
              }
              label="Casual"
            />
            <FormControlLabel
              value="Medicine"
              control={
                <Radio
                  sx={{
                    color: "white", // default radio
                    "&.Mui-checked": {
                      color: "white", // checked radio
                    },
                  }}
                />
              }
              label="Medicine"
            />
          </RadioGroup>

          <Box sx={{ justifyContent: "center", alignItems: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddExpenseFromDialog}
              sx={{ padding: "8px 16px", fontWeight: "bold" }}
            >
              Add
            </Button>
          </Box>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Expense added
            </Alert>
          </Snackbar>
        </FormControl>
      </Box>

      <ExpenseSummary expenses={expenses} sx={{ padding: 2 }} />

      {Object.keys(groupedExpenses).map((groupDate) => {
        const groupTotal = Object.values(groupedExpenses[groupDate])
          .flat()
          .reduce((sum, expense) => sum + expense.amount, 0);

        return (
          <Box key={groupDate} sx={{ marginBottom: 2 }}>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                backgroundColor: "#f44336",
                width: "100%",
                padding: "16px",
                boxSizing: "border-box",
                borderRadius: "8px",
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {format(new Date(groupDate), "dd MMM, yyyy")}

              <Box
                sx={{
                  display: "inline-block",
                  marginLeft: 2,
                  padding: "5px 15px",
                  backgroundColor: "#ff7043",
                  color: "white",
                  borderRadius: "20px",
                  border: "2px solid white",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Expense :{" "}
                <span style={{ fontWeight: "bold", fontSize: 18 }}>
                  ₹{groupTotal}
                </span>
              </Box>
            </Typography>

            {Object.keys(groupedExpenses[groupDate]).map((category) => (
              <Box key={category} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    py: 1,
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "black" }}
                  >
                    {category}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleDialogOpen()}
                  >
                    <AddIcon />
                  </Button>
                </Box>
                <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                  <DialogTitle>Add Expense</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="Expense Name"
                      value={expenseName}
                      onChange={(e) => setExpenseName(e.target.value)}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      label="Amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />

                    <TextField
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    {/* radios selection btns in the dialog box */}
                    <RadioGroup
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      row
                      sx={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flexGrow: 1,
                      }}
                    >
                      <FormControlLabel
                        value="Food"
                        control={<Radio />}
                        label="Food"
                      />
                      <FormControlLabel
                        value="Travel"
                        control={<Radio />}
                        label="Travel"
                      />
                      <FormControlLabel
                        value="Casual"
                        control={<Radio />}
                        label="Casual"
                      />
                      <FormControlLabel
                        value="Medicine"
                        control={<Radio />}
                        label="Medicine"
                      />
                    </RadioGroup>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={handleAddExpense} color="primary">
                      <AddIcon />
                    </Button>
                  </DialogActions>
                </Dialog>

                {/* the expense details after the category wise data */}

                <List sx={{ p: 0, m: 0 }}>
                  {groupedExpenses[groupDate][category].map((expense) => (
                    <React.Fragment
                      key={`${expense.name}-${expense.date}-${expense.category}-${expense.originalIndex}`}
                    >
                      {editIndex === expense.originalIndex && (
                        // Edit expense modal for the current expense
                        <Box
                          sx={{
                            marginBottom: 2,
                            padding: 2,
                            backgroundColor: "#f5f5f5",
                            borderRadius: 1,
                          }}
                        >
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
                            value={
                              editIndex !== null
                                ? format(date, "yyyy-MM-dd")
                                : format(new Date(), "yyyy-MM-dd")
                            }
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

                      <ListItem
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",

                          padding: 2,
                          margin: "8px 0",
                          border: "2px solid #ddd",
                          borderRadius: "8px",
                        }}
                      >
                        <Box
                          sx={{
                            flex: 1,
                            display: "flex",
                            alignItems: "left",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", marginRight: 2 }}
                          >
                            {expense.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "gray" }}>
                            (Last updated:{" "}
                            {format(new Date(expense.date), "dd MMM, yyyy")})
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="h7"
                            sx={{
                              color: "black",
                              letterSpacing: "1px",
                              fontWeight: "bold",
                            }}
                          >
                            ₹{expense.amount}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                            onClick={() =>
                              handleEditExpense(expense.originalIndex)
                            }
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              handleRemoveExpense(expense.originalIndex)
                            }
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              handleImpToggle(expense.originalIndex)
                            }
                            color={expense.isImp ? "warning" : "default"}
                          >
                            <StarIcon />
                          </IconButton>
                        </Box>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        );
      })}

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total Expenses:
        <Box
          component="span"
          sx={{
            backgroundColor: "#000000ff",
            color: "white",
            fontWeight: "bold",
            padding: "4px 8px",
            borderRadius: "4px",
            display: "inline-block",
            marginLeft: 1,
            fontSize: "1.25rem",
            letterSpacing: "0.5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box
            component="span"
            sx={{
              color: "red",
              fontSize: "1.5rem",
              fontWeight: "bolder",
              marginRight: "4px",
            }}
          >
            ₹{total}
          </Box>
          / ₹5000
        </Box>
      </Typography>
    </Box>
  );
};

export default Expenses;
