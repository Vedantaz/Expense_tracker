import React from "react";
import { TextField } from "@mui/material";

const expenseName = ({ value, onChange }) => {
  return (
    <TextField
      label="Expense Name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      sx={{ marginBottom: 1 }}
    />
  );
};

export default expenseName;
