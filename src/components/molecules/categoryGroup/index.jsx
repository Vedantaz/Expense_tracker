import React from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  TextField,
} from "@mui/material";

const categoryGroup = ({
  expenseName,
  setName,
  amount,
  setAmt,
  category,
  setCat,
  handleadd,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogClose, setDialogClose] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogClose(false);

  const handleAddExpense = () => {
    handleadd();
    handleDialogClose();
  };

  return (
    <Box
      sx={{
        backgroundColor: "#008B8B",
        padding: 4,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        marginBottom: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Daily Expenses (Kharcha)
      </Typography>
      <Search sx={{ marginRight: 0 }} />
      <TextField
        label="Expense Name"
        value={expenseName}
        onChange={setName}
        fullWidth
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={setAmt}
        fullWidth
        sx={{ marginBottom: 1 }}
      />

      <FormControl
        component="fieldset"
        fullWidth
        sx={{
          marginBottom: 1,
          // display: 'flex',
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          flexGrow: "1",
        }}
      >
        <RadioGroup
          value={category}
          onChange={setCat}
          row
          sx={{
            width: "100%",
            //  display: 'flex',
            alignItems: "center",
            justifyContent: "flex-start",
            flexGrow: 1,
          }}
        >
          <FormControlLabel value="Food" control={<Radio />} label="Food" />
          <FormControlLabel value="Travel" control={<Radio />} label="Travel" />
          <FormControlLabel value="Casual" control={<Radio />} label="Casual" />
          <FormControlLabel
            value="Medicine"
            control={<Radio />}
            label="Medicine"
          />
        </RadioGroup>

        <Box sx={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddExpense}
            sx={{ padding: "8px 16px", fontWeight: "bold" }}
          >
            Add
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default categoryGroup;
