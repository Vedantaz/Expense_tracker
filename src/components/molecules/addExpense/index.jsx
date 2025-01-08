import React from "react";
import { Button, Box } from "@mui/material";

const addExpenseBtn = ({ onClick }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        sx={{ padding: "8px 16px", fontWeight: "bold" }}
      >
        Add
      </Button>
    </Box>
  );
};

export default addExpenseBtn;
