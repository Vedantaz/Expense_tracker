import React from "react";
import { TextField } from "@mui/material";

const expenseAmount = ({ value, onChange }) => {
  return (
    <TextField
      label="Amount"
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      sx={{ marginBottom: 1 }}
    />
  );
};

export default expenseAmount;
